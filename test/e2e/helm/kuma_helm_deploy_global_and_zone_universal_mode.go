package helm

import (
	"fmt"
	"strings"
	"time"

	"github.com/gruntwork-io/terratest/modules/random"
	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"

	"github.com/kumahq/kuma/pkg/config/core"
	. "github.com/kumahq/kuma/test/framework"
	"github.com/kumahq/kuma/test/framework/deployments/postgres"
)

func GlobalAndZoneInUniversalModeWithHelmChart() {
	var globalCluster, zoneCluster Cluster
	var global, zone ControlPlane

	BeforeAll(func() {
		var err error
		globalCluster = NewK8sCluster(NewTestingT(), Kuma1, Silent).
			WithTimeout(6 * time.Second).
			WithRetries(60)
		zoneCluster = NewK8sCluster(NewTestingT(), Kuma2, Silent).
			WithTimeout(6 * time.Second).
			WithRetries(60)

		releaseName := fmt.Sprintf(
			"kuma-%s",
			strings.ToLower(random.UniqueId()),
		)

		err = NewClusterSetup().
			Install(Namespace(Config.KumaNamespace)).
			Install(postgres.Install(Kuma1,
				postgres.WithK8sNamespace(Config.KumaNamespace),
				postgres.WithUsername("mesh"),
				postgres.WithPassword("mesh"),
				postgres.WithDatabase("mesh"),
				postgres.WithPrimaryName("postgres"),
			)).
			Install(YamlK8s(fmt.Sprintf(`
apiVersion: v1
kind: Secret
metadata:
  name: postgres
  namespace: %s
type: Opaque
stringData:
  password: "mesh"
`, Config.KumaNamespace))).
			Setup(zoneCluster)
		Expect(err).ToNot(HaveOccurred())
		Expect(WaitPodsAvailableWithLabel(Config.KumaNamespace, "app.kubernetes.io/name", "postgresql")(zoneCluster)).To(Succeed())

		global = globalCluster.GetKuma()
		Expect(global).ToNot(BeNil())

		err = NewClusterSetup().
			Install(Kuma(core.Global,
				WithInstallationMode(HelmInstallationMode),
				WithHelmReleaseName(releaseName),
			)).
			Setup(globalCluster)
		Expect(err).ToNot(HaveOccurred())

		err = NewClusterSetup().
			Install(Kuma(core.Zone,
				// it's required because we check if Kuma is ready,
				// and we use "kubectl get mesh" which is not available in universal mode
				WithSkipDefaultMesh(true),
				WithInstallationMode(HelmInstallationMode),
				WithHelmReleaseName(releaseName),
				WithCPReplicas(2),
				WithGlobalAddress(global.GetKDSInsecureServerAddress()),
				WithHelmOpt("controlPlane.environment", "universal"),
				WithHelmOpt("controlPlane.zone", "zone-1"),
				WithHelmOpt("controlPlane.envVars.KUMA_MULTIZONE_GLOBAL_KDS_TLS_ENABLED", "false"),
				WithHelmOpt("controlPlane.envVars.KUMA_STORE_POSTGRES_HOST", "postgres-release-postgresql"),
				WithHelmOpt("controlPlane.envVars.KUMA_STORE_POSTGRES_PORT", "5432"),
				WithHelmOpt("controlPlane.envVars.KUMA_STORE_POSTGRES_USER", "mesh"),
				WithHelmOpt("controlPlane.envVars.KUMA_STORE_POSTGRES_DB_NAME", "mesh"),
				WithHelmOpt("controlPlane.secrets.postgresPassword.Secret", "postgres"),
				WithHelmOpt("controlPlane.secrets.postgresPassword.Key", "password"),
				WithHelmOpt("controlPlane.secrets.postgresPassword.Env", "KUMA_STORE_POSTGRES_PASSWORD"),
			)).
			Install(MeshUniversal("default")).
			Setup(globalCluster)
		Expect(err).ToNot(HaveOccurred())

		zone = zoneCluster.GetKuma()
		Expect(zone).ToNot(BeNil())
	})

	E2EAfterAll(func() {
		Expect(zoneCluster.DeleteNamespace(TestNamespace)).To(Succeed())
		Expect(globalCluster.DeleteKuma()).To(Succeed())
		Expect(zoneCluster.DeleteKuma()).To(Succeed())
		Expect(globalCluster.DismissCluster()).To(Succeed())
		Expect(zoneCluster.DismissCluster()).To(Succeed())
	})

	It("should deploy Zone and Global on 2 clusters", func() {
		// mesh is synced to zone
		Eventually(func() string {
			output, err := zoneCluster.GetKumactlOptions().RunKumactlAndGetOutput("get", "meshes")
			Expect(err).ToNot(HaveOccurred())
			return output
		}, "5s", "500ms").Should(ContainSubstring("default"))
	})
}
