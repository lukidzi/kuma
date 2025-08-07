package providers_test

import (
	"context"
	"time"

	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"

	"github.com/kumahq/kuma/api/common/v1alpha1"
	"github.com/kumahq/kuma/pkg/core"
	"github.com/kumahq/kuma/pkg/core/kri"
	core_mesh "github.com/kumahq/kuma/pkg/core/resources/apis/mesh"
	meshidentity_api "github.com/kumahq/kuma/pkg/core/resources/apis/meshidentity/api/v1alpha1"
	"github.com/kumahq/kuma/pkg/core/resources/apis/meshidentity/providers"
	"github.com/kumahq/kuma/pkg/core/resources/apis/meshidentity/providers/bundled"
	"github.com/kumahq/kuma/pkg/core/resources/manager"
	"github.com/kumahq/kuma/pkg/core/resources/model"
	core_store "github.com/kumahq/kuma/pkg/core/resources/store"
	"github.com/kumahq/kuma/pkg/core/secrets/cipher"
	secret_manager "github.com/kumahq/kuma/pkg/core/secrets/manager"
	"github.com/kumahq/kuma/pkg/core/secrets/store"
	"github.com/kumahq/kuma/pkg/core/xds"
	"github.com/kumahq/kuma/pkg/events"
	core_metrics "github.com/kumahq/kuma/pkg/metrics"
	"github.com/kumahq/kuma/pkg/plugins/resources/memory"
	"github.com/kumahq/kuma/pkg/test/resources/builders"
)

var _ = Describe("MeshIdentity providers", func() {
	var secretManager manager.ResourceManager
	var resourceManager manager.ResourceManager
	var mesh *core_mesh.MeshResource
	var metrics core_metrics.Metrics
	var eventBus events.EventBus
	var idenManager providers.IdentityProviderManager
	var bundledProvider providers.IdentityProvider

	now := time.Now()

	BeforeEach(func() {
		core.Now = func() time.Time {
			return now
		}
		memoryStore := memory.NewStore()
		resourceManager = manager.NewResourceManager(memoryStore)
		secretManager = secret_manager.NewSecretManager(store.NewSecretStore(memoryStore), cipher.None(), nil, false)
		mesh = core_mesh.NewMeshResource()
		// Since mesh is the owner of secrets we can't operate on secrets without having the mesh in the store
		err := resourceManager.Create(context.Background(), mesh, core_store.CreateByKey(model.DefaultMesh, model.NoMesh))
		Expect(err).ToNot(HaveOccurred())

		metrics, err = core_metrics.NewMetrics("")
		Expect(err).ToNot(HaveOccurred())

		eventBus, err = events.NewEventBus(10, metrics)
		Expect(err).ToNot(HaveOccurred())

		bundledProvider, err = bundled.NewBundledIdentityProvider(secretManager, secretManager, metrics)
		Expect(err).ToNot(HaveOccurred())

		idenManager = providers.NewIdentityProviderManager(providers.IdentityProviders{
			"Bundled": bundledProvider,
		}, eventBus, "default")
	})

	AfterEach(func() {
		core.Now = time.Now
	})
	type testCase struct {
		dpp                  *core_mesh.DataplaneResource
		meshIdentities       []*meshidentity_api.MeshIdentityResource
		expectedIdentityName string
	}
	DescribeTable("SelectIdentity",
		func(given testCase) {
			// when
			identity := idenManager.SelectedIdentity(given.dpp, given.meshIdentities)

			// then
			Expect(identity.Meta.GetName()).To(Equal(given.expectedIdentityName))
		},
		Entry("select the most specific identity", testCase{
			dpp: builders.Dataplane().WithLabels(map[string]string{
				"app": "test-app",
			}).AddInboundHttpOfService("test-app").Build(),
			meshIdentities: []*meshidentity_api.MeshIdentityResource{
				builders.MeshIdentity().WithName("not-matching-1").WithSelector(&v1alpha1.LabelSelector{
					MatchLabels: &map[string]string{
						"app":     "test-app",
						"version": "v1",
					},
				}).Build(),
				builders.MeshIdentity().WithName("matching-all").WithSelector(&v1alpha1.LabelSelector{
					MatchLabels: &map[string]string{},
				}).Build(),
				builders.MeshIdentity().WithName("matching-specific").WithSelector(&v1alpha1.LabelSelector{
					MatchLabels: &map[string]string{
						"app": "test-app",
					},
				}).Build(),
			},
			expectedIdentityName: "matching-specific",
		}),
		Entry("select the most specific identity with 2 tags", testCase{
			dpp: builders.Dataplane().WithLabels(map[string]string{
				"app":     "test-app",
				"version": "v1",
			}).AddInboundHttpOfService("test-app").Build(),
			meshIdentities: []*meshidentity_api.MeshIdentityResource{
				builders.MeshIdentity().WithName("matching-1").WithSelector(&v1alpha1.LabelSelector{
					MatchLabels: &map[string]string{
						"app":     "test-app",
						"version": "v1",
					},
				}).Build(),
				builders.MeshIdentity().WithName("matching-all").WithSelector(&v1alpha1.LabelSelector{
					MatchLabels: &map[string]string{},
				}).Build(),
				builders.MeshIdentity().WithName("matching-specific").WithSelector(&v1alpha1.LabelSelector{
					MatchLabels: &map[string]string{
						"app": "test-app",
					},
				}).Build(),
			},
			expectedIdentityName: "matching-1",
		}),
		Entry("select matching all", testCase{
			dpp: builders.Dataplane().WithLabels(map[string]string{
				"app":     "demo-app",
				"version": "v1",
			}).AddInboundHttpOfService("demo-app").Build(),
			meshIdentities: []*meshidentity_api.MeshIdentityResource{
				builders.MeshIdentity().WithName("matching-1").WithSelector(&v1alpha1.LabelSelector{
					MatchLabels: &map[string]string{
						"app":     "test-app",
						"version": "v1",
					},
				}).Build(),
				builders.MeshIdentity().WithName("matching-all").WithSelector(&v1alpha1.LabelSelector{
					MatchLabels: &map[string]string{},
				}).Build(),
				builders.MeshIdentity().WithName("matching-specific").WithSelector(&v1alpha1.LabelSelector{
					MatchLabels: &map[string]string{
						"app": "test-app",
					},
				}).Build(),
			},
			expectedIdentityName: "matching-all",
		}),
	)
	It("should get Identity", func() {
		// given
		createIdentityListener := eventBus.Subscribe(func(event events.Event) bool {
			switch event.(type) {
			case events.WorkloadIdentityChangedEvent:
				return true
			default:
				return false
			}
		})
		defer createIdentityListener.Close()

		dpp := builders.Dataplane().WithLabels(map[string]string{
			"app":                         "test-app",
			"k8s.kuma.io/service-account": "default",
			"k8s.kuma.io/namespace":       "namespace-demo",
		}).AddInboundHttpOfService("test-app").Build()
		meshIdentity := builders.MeshIdentity().WithBundledAutoGenerated().WithInitializedStatus().Build()
		Expect(resourceManager.Create(context.Background(), meshIdentity, core_store.CreateBy(model.MetaToResourceKey(meshIdentity.GetMeta())))).ToNot(HaveOccurred())
		Expect(bundledProvider.Initialize(context.Background(), meshIdentity, mesh.Meta.GetName())).ToNot(HaveOccurred())

		// when
		identity, err := idenManager.GetWorkloadIdentity(context.Background(), &xds.Proxy{
			Dataplane: dpp,
			Metadata:  &xds.DataplaneMetadata{},
		}, meshIdentity)

		// then
		Expect(err).ToNot(HaveOccurred())
		Expect(identity).ToNot(BeNil())

		Expect(identity.KRI).To(Equal(kri.From(meshIdentity)))
		Expect(identity.ExpirationTime).To(Equal(identity.GenerationTime.Add(99 * time.Minute)))

		Eventually(createIdentityListener.Recv(), 5*time.Second).Should(Receive(Equal(events.WorkloadIdentityChangedEvent{
			ResourceKey:    model.MetaToResourceKey(dpp.GetMeta()),
			Operation:      events.Create,
			GenerationTime: identity.GenerationTime,
			ExpirationTime: identity.ExpirationTime,
			Origin:         identity.KRI,
		})))
	})

	It("should not get Identity", func() {
		// given
		createIdentityListener := eventBus.Subscribe(func(event events.Event) bool {
			switch event.(type) {
			case events.WorkloadIdentityChangedEvent:
				return true
			default:
				return false
			}
		})
		defer createIdentityListener.Close()

		dpp := builders.Dataplane().WithLabels(map[string]string{
			"app":                         "test-app",
			"k8s.kuma.io/service-account": "default",
			"k8s.kuma.io/namespace":       "namespace-demo",
		}).AddInboundHttpOfService("test-app").Build()

		// when
		identity, err := idenManager.GetWorkloadIdentity(context.Background(), &xds.Proxy{
			Dataplane: dpp,
			Metadata:  &xds.DataplaneMetadata{},
		}, nil)

		// then
		Expect(err).ToNot(HaveOccurred())
		Expect(identity).To(BeNil())

		Eventually(createIdentityListener.Recv(), 5*time.Second).Should(Receive(Equal(events.WorkloadIdentityChangedEvent{
			ResourceKey: model.MetaToResourceKey(dpp.GetMeta()),
			Operation:   events.Delete,
		})))
	})
})
