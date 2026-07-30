package k8s_test

import (
	"context"
	"fmt"

	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"
	"k8s.io/apimachinery/pkg/util/intstr"

	mesh_proto "github.com/kumahq/kuma/v3/api/mesh/v1alpha1"
	hostnamegenerator_api "github.com/kumahq/kuma/v3/pkg/core/resources/apis/hostnamegenerator/api/v1alpha1"
	meshservice_api "github.com/kumahq/kuma/v3/pkg/core/resources/apis/meshservice/api/v1alpha1"
	meshservice_k8s "github.com/kumahq/kuma/v3/pkg/core/resources/apis/meshservice/k8s/v1alpha1"
	"github.com/kumahq/kuma/v3/pkg/core/resources/store"
	"github.com/kumahq/kuma/v3/pkg/plugins/resources/k8s"
	mesh_k8s "github.com/kumahq/kuma/v3/pkg/plugins/resources/k8s/native/api/v1alpha1"
	k8s_registry "github.com/kumahq/kuma/v3/pkg/plugins/resources/k8s/native/pkg/registry"
	"github.com/kumahq/kuma/v3/pkg/util/pointer"
)

var _ = Describe("KubernetesStore owned fields", func() {
	const mesh = "default-mesh"

	var s store.ResourceStore
	var name string
	var counter int

	BeforeEach(func() {
		kubeTypes := k8s_registry.NewTypeRegistry()
		Expect(kubeTypes.RegisterObjectType(&mesh_proto.Mesh{}, &mesh_k8s.Mesh{})).To(Succeed())
		Expect(kubeTypes.RegisterObjectType(&meshservice_api.MeshService{}, &meshservice_k8s.MeshService{})).To(Succeed())
		Expect(kubeTypes.RegisterListType(&mesh_proto.Mesh{}, &mesh_k8s.MeshList{})).To(Succeed())
		Expect(kubeTypes.RegisterListType(&meshservice_api.MeshService{}, &meshservice_k8s.MeshServiceList{})).To(Succeed())

		s = &k8s.KubernetesStore{
			Client: k8sClient,
			Reader: k8sClient,
			Converter: &k8s.SimpleConverter{
				KubeFactory: &k8s.SimpleKubeFactory{KubeTypes: kubeTypes},
			},
			Scheme: k8sClientScheme,
		}
		counter++
		name = fmt.Sprintf("owned-%d.demo", counter)
	})

	port := func(number int32) meshservice_api.Port {
		return meshservice_api.Port{
			Port:        number,
			TargetPort:  pointer.To(intstr.FromInt32(number)),
			AppProtocol: "http",
		}
	}

	// createLegacy writes a MeshService the way a control plane without field ownership
	// did, so that every field is recorded as written by a plain update.
	createLegacy := func(ports ...meshservice_api.Port) *meshservice_api.MeshServiceResource {
		ms := &meshservice_api.MeshServiceResource{
			Spec:   &meshservice_api.MeshService{Ports: ports},
			Status: &meshservice_api.MeshServiceStatus{},
		}
		Expect(s.Create(context.Background(), ms, store.CreateByKey(name, mesh))).To(Succeed())
		return ms
	}

	get := func() *meshservice_api.MeshServiceResource {
		ms := meshservice_api.NewMeshServiceResource()
		Expect(s.Get(context.Background(), ms, store.GetByKey(name, mesh))).To(Succeed())
		return ms
	}

	It("should remove the entries of a merged list the owner no longer writes", func() {
		// given a MeshService with two ports written before the owner existed
		ms := createLegacy(port(80), port(443))

		// when the owner of the spec writes it without one of the ports
		ms.Spec.Ports = []meshservice_api.Port{port(80)}
		err := s.Update(context.Background(), ms, store.UpdateOwnedFields("kuma-kds-syncer", store.FieldSpec, store.FieldLabels))

		// then
		Expect(err).ToNot(HaveOccurred())
		Expect(get().Spec.Ports).To(Equal([]meshservice_api.Port{port(80)}))
	})

	It("should remove the entries written before the owner, whoever applied first", func() {
		// given a MeshService with two ports written before any owner existed
		ms := createLegacy(port(80), port(443))

		// and an owner of a single status field that applied first
		vips := get()
		vips.Status.VIPs = []meshservice_api.VIP{{IP: "10.0.0.1"}}
		Expect(s.Update(context.Background(), vips, store.UpdateOwnedFields("kuma-vip-allocator", "status.vips"))).To(Succeed())

		// when the owner of the spec writes it with a different set of ports
		ms.Spec.Ports = []meshservice_api.Port{port(81)}
		err := s.Update(context.Background(), ms, store.UpdateOwnedFields("kuma-kds-syncer", store.FieldSpec, store.FieldLabels))

		// then the ports it doesn't write are gone
		Expect(err).ToNot(HaveOccurred())
		stored := get()
		Expect(stored.Spec.Ports).To(Equal([]meshservice_api.Port{port(81)}))

		// and the field of the other owner is still there
		Expect(stored.Status.VIPs).To(Equal([]meshservice_api.VIP{{IP: "10.0.0.1"}}))
	})

	It("should keep the fields of the other owners", func() {
		// given
		ms := createLegacy(port(80))

		// when three owners write their own fields of the same resource
		vips := get()
		vips.Status.VIPs = []meshservice_api.VIP{{IP: "10.0.0.1"}}
		Expect(s.Update(context.Background(), vips, store.UpdateOwnedFields("kuma-vip-allocator", "status.vips"))).To(Succeed())

		addresses := get()
		addresses.Status.Addresses = []hostnamegenerator_api.Address{{Hostname: "svc.mesh.local"}}
		Expect(s.Update(context.Background(), addresses, store.UpdateOwnedFields("kuma-hostname-generator", "status.addresses"))).To(Succeed())

		// and the owner of the spec writes from a copy read before any of them
		ms.Spec.Ports = []meshservice_api.Port{port(81)}
		Expect(s.Update(context.Background(), ms, store.UpdateOwnedFields("kuma-kds-syncer", store.FieldSpec, store.FieldLabels))).To(Succeed())

		// then no write was lost
		stored := get()
		Expect(stored.Spec.Ports).To(Equal([]meshservice_api.Port{port(81)}))
		Expect(stored.Status.VIPs).To(Equal([]meshservice_api.VIP{{IP: "10.0.0.1"}}))
		Expect(stored.Status.Addresses).To(Equal([]hostnamegenerator_api.Address{{Hostname: "svc.mesh.local"}}))
	})

	It("should remove the labels the owner no longer writes and keep the rest", func() {
		// given
		ms := createLegacy(port(80))
		Expect(s.Update(context.Background(), ms,
			store.UpdateWithLabels(map[string]string{"a": "1", "b": "2"}),
			store.UpdateOwnedFields("kuma-kds-syncer", store.FieldSpec, store.FieldLabels),
		)).To(Succeed())

		// when the owner writes a label set without one of them
		ms = get()
		err := s.Update(context.Background(), ms,
			store.UpdateWithLabels(map[string]string{"a": "1"}),
			store.UpdateOwnedFields("kuma-kds-syncer", store.FieldSpec, store.FieldLabels),
		)

		// then
		Expect(err).ToNot(HaveOccurred())
		Expect(get().Meta.GetLabels()).ToNot(HaveKey("b"))
		Expect(get().Meta.GetLabels()).To(HaveKeyWithValue("a", "1"))
	})
})
