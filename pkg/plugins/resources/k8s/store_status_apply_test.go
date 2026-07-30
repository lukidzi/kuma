package k8s_test

import (
	"context"
	"strings"
	"time"

	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"
	kube_meta "k8s.io/apimachinery/pkg/apis/meta/v1"
	kube_client "sigs.k8s.io/controller-runtime/pkg/client"

	mesh_proto "github.com/kumahq/kuma/v3/api/mesh/v1alpha1"
	core_meta "github.com/kumahq/kuma/v3/pkg/core/metadata"
	meshservice_api "github.com/kumahq/kuma/v3/pkg/core/resources/apis/meshservice/api/v1alpha1"
	meshservice_k8s "github.com/kumahq/kuma/v3/pkg/core/resources/apis/meshservice/k8s/v1alpha1"
	"github.com/kumahq/kuma/v3/pkg/core/resources/store"
	"github.com/kumahq/kuma/v3/pkg/plugins/resources/k8s"
	mesh_k8s "github.com/kumahq/kuma/v3/pkg/plugins/resources/k8s/native/api/v1alpha1"
	k8s_registry "github.com/kumahq/kuma/v3/pkg/plugins/resources/k8s/native/pkg/registry"
)

var _ = Describe("KubernetesStore status apply", func() {
	const mesh = "default-mesh"
	const name = "status-apply.demo"
	const owner = "kuma-vip-allocator"

	var s store.ResourceStore
	var ctx context.Context

	BeforeEach(func() {
		ctx = context.Background()

		kubeTypes := k8s_registry.NewTypeRegistry()
		Expect(kubeTypes.RegisterObjectType(&mesh_proto.Mesh{}, &mesh_k8s.Mesh{})).To(Succeed())
		Expect(kubeTypes.RegisterObjectType(&meshservice_api.MeshService{}, &meshservice_k8s.MeshService{})).To(Succeed())
		Expect(kubeTypes.RegisterListType(&meshservice_api.MeshService{}, &meshservice_k8s.MeshServiceList{})).To(Succeed())

		s = &k8s.KubernetesStore{
			Client: k8sClient,
			Converter: &k8s.SimpleConverter{
				KubeFactory: &k8s.SimpleKubeFactory{KubeTypes: kubeTypes},
			},
			Scheme: k8sClientScheme,
		}

		created := &meshservice_api.MeshServiceResource{
			Spec:   &meshservice_api.MeshService{},
			Status: &meshservice_api.MeshServiceStatus{},
		}
		Expect(s.Create(ctx, created, store.CreateByKey(name, mesh), store.CreatedAt(time.Now()))).To(Succeed())
	})

	AfterEach(func() {
		res := meshservice_api.NewMeshServiceResource()
		if err := s.Get(ctx, res, store.GetByKey(name, mesh)); err == nil {
			Expect(s.Delete(ctx, res, store.DeleteByKey(name, mesh))).To(Succeed())
		}
	})

	// get returns an independent copy, so each caller holds its own version and
	// one caller's write does not silently refresh another's.
	get := func() *meshservice_api.MeshServiceResource {
		res := meshservice_api.NewMeshServiceResource()
		Expect(s.Get(ctx, res, store.GetByKey(name, mesh))).To(Succeed())
		return res
	}

	// bumpSpec stands in for the KDS syncer: a different owner replacing spec and
	// labels, which moves the resource version everyone else is holding.
	bumpSpec := func() {
		fresh := get()
		fresh.Spec.Ports = []meshservice_api.Port{{Port: 8080, AppProtocol: core_meta.ProtocolTCP}}
		Expect(s.Update(ctx, fresh)).To(Succeed())
	}

	// managedFieldsOf reads the ownership ledger the API server maintains, which
	// is the whole point of applying rather than replacing.
	managedFieldsOf := func(manager string) []kube_meta.ManagedFieldsEntry {
		obj := &meshservice_k8s.MeshService{}
		key := kube_client.ObjectKey{Namespace: "demo", Name: strings.TrimSuffix(name, ".demo")}
		Expect(k8sClient.Get(ctx, key, obj)).To(Succeed())
		var out []kube_meta.ManagedFieldsEntry
		for _, entry := range obj.GetManagedFields() {
			if entry.Manager == manager {
				out = append(out, entry)
			}
		}
		return out
	}

	It("rejects a whole-object write once another owner has written", func() {
		// given a copy read before the concurrent write
		stale := get()

		// when another owner moves the version on
		bumpSpec()

		// and the stale copy writes its own status
		stale.Status.VIPs = []meshservice_api.VIP{{IP: "241.0.0.61"}}
		err := s.Update(ctx, stale)

		// then the write is rejected even though the two touch disjoint fields.
		// This is the behavior that tears the KDS stream down.
		Expect(err).To(HaveOccurred())
		Expect(store.IsConflict(err)).To(BeTrue())
	})

	It("accepts a status apply from a stale copy", func() {
		// given a copy read before the concurrent write
		stale := get()

		// when another owner moves the version on
		bumpSpec()

		// and the stale copy applies only its status
		stale.Status.VIPs = []meshservice_api.VIP{{IP: "241.0.0.61"}}

		// then the write lands: an apply sends no resource version, so there is
		// no precondition over fields this owner does not own
		Expect(s.Update(ctx, stale, store.UpdateWithStatusOwner(owner))).To(Succeed())
	})

	It("leaves the concurrent spec write intact", func() {
		stale := get()
		bumpSpec()

		stale.Status.VIPs = []meshservice_api.VIP{{IP: "241.0.0.61"}}
		Expect(s.Update(ctx, stale, store.UpdateWithStatusOwner(owner))).To(Succeed())

		// the status landed and the spec written by the other owner survived,
		// which a whole-object write from a stale copy would have reverted
		after := get()
		Expect(after.Status.VIPs).To(HaveLen(1))
		Expect(after.Status.VIPs[0].IP).To(Equal("241.0.0.61"))
		Expect(after.Spec.Ports).To(HaveLen(1))
		Expect(after.Spec.Ports[0].Port).To(Equal(int32(8080)))
	})

	It("records ownership of status only, never of spec", func() {
		res := get()
		res.Status.VIPs = []meshservice_api.VIP{{IP: "241.0.0.61"}}
		Expect(s.Update(ctx, res, store.UpdateWithStatusOwner(owner))).To(Succeed())

		entries := managedFieldsOf(owner)
		Expect(entries).To(HaveLen(1))
		Expect(entries[0].Operation).To(Equal(kube_meta.ManagedFieldsOperationApply))

		// The apply body carries identity and status and nothing else, so the
		// ledger must show this owner managing status and staying out of spec.
		// Sending the whole object instead would claim spec here and put the
		// allocator in a permanent dispute with the component that owns it.
		Expect(entries[0].FieldsV1).ToNot(BeNil())
		fields := entries[0].FieldsV1.GetRawString()
		Expect(fields).To(ContainSubstring("f:status"))
		Expect(fields).To(ContainSubstring("f:vips"))
		Expect(fields).ToNot(ContainSubstring("f:spec"))
	})
})
