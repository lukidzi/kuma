package meshidentity

import (
	"fmt"
	"time"

	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"

	"github.com/kumahq/kuma/api/mesh/v1alpha1"
	"github.com/kumahq/kuma/pkg/plugins/runtime/k8s/metadata"
	"github.com/kumahq/kuma/pkg/test/resources/samples"
	. "github.com/kumahq/kuma/test/framework"
	"github.com/kumahq/kuma/test/framework/client"
	"github.com/kumahq/kuma/test/framework/deployments/democlient"
	"github.com/kumahq/kuma/test/framework/deployments/spire"
	"github.com/kumahq/kuma/test/framework/deployments/testserver"
	"github.com/kumahq/kuma/test/framework/envs/kubernetes"
)

func Spire() {
	meshName := "meshidentity-spire"
	namespace := "meshidentity-spire"
	spireNamespace := "spire-system"
	trustDomain := "default.local-zone.mesh.local"

	workflowRegistration := fmt.Sprintf(`
apiVersion: spire.spiffe.io/v1alpha1
kind: ClusterSPIFFEID
metadata:
  name: spire-registration
spec:
  spiffeIDTemplate: "spiffe://{{ .TrustDomain }}/ns/{{ .PodMeta.Namespace }}/sa/{{ .PodSpec.ServiceAccountName }}"
  podSelector:
    matchLabels:
      k8s.kuma.io/spire-support: "true"
  workloadSelectorTemplates:
    - "k8s:ns:%s"
`, namespace)

	BeforeAll(func() {
		err := NewClusterSetup().
			Install(YamlK8s(samples.MeshDefaultBuilder().WithName(meshName).WithMeshServicesEnabled(v1alpha1.Mesh_MeshServices_Exclusive).KubeYaml())).
			Install(MeshTrafficPermissionAllowAllKubernetes(meshName)).
			Install(NamespaceWithSidecarInjection(namespace)).
			Install(Namespace(spireNamespace)).
			Install(spire.Install(
				spire.WithName("spire"),
				spire.WithNamespace(spireNamespace),
				spire.WithTrustDomain(trustDomain),
			)).
			Install(YamlK8s(workflowRegistration)).
			Setup(kubernetes.Cluster)

			// create cluster registration
			// deploy service with an annotation
		Expect(err).ToNot(HaveOccurred())
	})

	AfterEachFailure(func() {
		DebugKube(kubernetes.Cluster, meshName, namespace)
	})

	E2EAfterEach(func() {
	})

	E2EAfterAll(func() {
		Expect(kubernetes.Cluster.TriggerDeleteNamespace(namespace)).To(Succeed())
		Expect(kubernetes.Cluster.DeleteMesh(meshName)).To(Succeed())
	})

	It("should use MeshHTTPRoute if no TrafficRoutes are present", func() {
		// when
		yaml := fmt.Sprintf(`
apiVersion: kuma.io/v1alpha1
kind: MeshIdentity
metadata:
  name: identity-spire
  namespace: %s
  labels:
    kuma.io/mesh: %s
spec:
  selector:
    dataplane:
      matchLabels: {}
  spiffeID:
    trustDomain: %s
    path: "/ns/{{ .Namespace }}/sa/{{ .ServiceAccount }}"
  provider:
    type: Spire
    spire: {}
`, Config.KumaNamespace, meshName, trustDomain)
		Expect(NewClusterSetup().
			Install(YamlK8s(yaml)).
			Install(testserver.Install(
				testserver.WithName("test-server"),
				testserver.WithMesh(meshName),
				testserver.WithNamespace(namespace),
				testserver.WithEchoArgs("echo", "instance", "test-server-spire"),
				testserver.WithPodAnnotations(map[string]string{
					metadata.KumaSpireSupport: "true",
				}),
			)).
			Install(democlient.Install(
				democlient.WithNamespace(namespace),
				democlient.WithMesh(meshName),
				democlient.WithPodAnnotations(map[string]string{
					metadata.KumaSpireSupport: "true",
				}),
			)).
			Setup(kubernetes.Cluster)).To(Succeed())
				time.Sleep(1*time.Hour)
		Eventually(func(g Gomega) {
			resp, err := client.CollectEchoResponse(kubernetes.Cluster, "demo-client", fmt.Sprintf("test-server.%s", namespace), client.FromKubernetesPod(namespace, "demo-client"))
			g.Expect(err).ToNot(HaveOccurred())
			g.Expect(resp.Instance).To(Equal("test-server-spire"))
		}, "30s", "1s").Should(Succeed())

	})

}
