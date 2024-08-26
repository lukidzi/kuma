package meshexternalservice

import (
	"encoding/base64"
	"fmt"
	"time"

	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"
	"github.com/onsi/gomega/types"

	common_api "github.com/kumahq/kuma/api/common/v1alpha1"
	"github.com/kumahq/kuma/pkg/core/resources/apis/meshexternalservice/api/v1alpha1"
	meshexternalservice_api "github.com/kumahq/kuma/pkg/core/resources/apis/meshexternalservice/api/v1alpha1"
	meshcircuitbreaker_api "github.com/kumahq/kuma/pkg/plugins/policies/meshcircuitbreaker/api/v1alpha1"
	meshretry_api "github.com/kumahq/kuma/pkg/plugins/policies/meshretry/api/v1alpha1"
	meshtimeout_api "github.com/kumahq/kuma/pkg/plugins/policies/meshtimeout/api/v1alpha1"
	test_model "github.com/kumahq/kuma/pkg/test/resources/model"
	"github.com/kumahq/kuma/pkg/util/pointer"
	. "github.com/kumahq/kuma/test/framework"
	"github.com/kumahq/kuma/test/framework/client"
	"github.com/kumahq/kuma/test/framework/envs/universal"
)

func MeshExternalService() {
	meshNameNoDefaults := "mesh-external-service-no-default-policy"
	meshDefaulMtlsOn := func(meshName string) InstallFunc {
		return YamlUniversal(fmt.Sprintf(`
type: Mesh
name: "%s"
mtls:
  enabledBackend: ca-1
  backends:
  - name: ca-1
    type: builtin
networking:
  outbound:
    passthrough: false
routing:
  zoneEgress: true
`, meshName))
	}

	meshExternalService := func(service, host, meshName string, port int, tls bool, caCert []byte) *v1alpha1.MeshExternalServiceResource {
		mes := &v1alpha1.MeshExternalServiceResource{
			Meta: &test_model.ResourceMeta{
				Mesh: meshName,
				Name: service,
				Labels: map[string]string{
					"kuma.io/origin": "zone",
				},
			},
			Spec: &v1alpha1.MeshExternalService{
				Match: v1alpha1.Match{
					Type:     pointer.To(v1alpha1.HostnameGeneratorType),
					Port:     80,
					Protocol: v1alpha1.HttpProtocol,
				},
				Endpoints: []v1alpha1.Endpoint{{
					Address: host,
					Port:    pointer.To(v1alpha1.Port(port)),
				}},
			},
			Status: &v1alpha1.MeshExternalServiceStatus{},
		}

		if tls {
			mes.Spec.Tls = &v1alpha1.Tls{
				Enabled: true,
				Verification: &v1alpha1.Verification{
					CaCert: &common_api.DataSource{Inline: &caCert},
				},
			}
		}

		return mes
	}

	var esHttpContainerName string
	var esHttpsContainerName string
	var esHttp2ContainerName string

	BeforeAll(func() {
		esHttpName := "mes-http"
		esHttpsName := "mes-https"
		esHttp2Name := "mes-http-2"

		esHttpContainerName = fmt.Sprintf("%s_%s", universal.Cluster.Name(), esHttpName)
		esHttpsContainerName = fmt.Sprintf("%s_%s", universal.Cluster.Name(), esHttpsName)
		esHttp2ContainerName = fmt.Sprintf("%s_%s", universal.Cluster.Name(), esHttp2Name)

		err := NewClusterSetup().
			Install(meshDefaulMtlsOn(meshNameNoDefaults)).
			Install(TestServerExternalServiceUniversal(esHttpName, 80, false, WithDockerContainerName(esHttpContainerName))).
			Install(TestServerExternalServiceUniversal(esHttpsName, 443, true, WithDockerContainerName(esHttpsContainerName))).
			Install(TestServerExternalServiceUniversal(esHttp2Name, 81, false, WithDockerContainerName(esHttp2ContainerName))).
			Install(DemoClientUniversal("mes-demo-client-no-defaults", meshNameNoDefaults, WithTransparentProxy(true))).
			Setup(universal.Cluster)
		Expect(err).ToNot(HaveOccurred())
	})

	AfterEachFailure(func() {
		DebugUniversal(universal.Cluster, meshNameNoDefaults)
	})

	BeforeEach(func(){
		Expect(DeleteMeshResources(universal.Cluster, meshNameNoDefaults,
			meshretry_api.MeshRetryResourceTypeDescriptor,
			meshtimeout_api.MeshTimeoutResourceTypeDescriptor,
			meshcircuitbreaker_api.MeshCircuitBreakerResourceTypeDescriptor,
		)).To(Succeed())
	})

	E2EAfterAll(func() {
		Expect(universal.Cluster.DeleteMeshApps(meshNameNoDefaults)).To(Succeed())
		Expect(universal.Cluster.DeleteMesh(meshNameNoDefaults)).To(Succeed())
	})

	checkSuccessfulRequest := func(url, clientName string, matcher types.GomegaMatcher) {
		Eventually(func(g Gomega) {
			stdout, _, err := client.CollectResponse(
				universal.Cluster, clientName, url,
				client.WithVerbose(),
			)
			g.Expect(err).ToNot(HaveOccurred())
			g.Expect(stdout).To(ContainSubstring("HTTP/1.1 200 OK"))
			g.Expect(stdout).To(matcher)
		}, "30s", "500ms").WithOffset(1).Should(Succeed())
	}

	contextFor := func(name, meshName, clientName string) {
		Context(name, func() {
			It("should route to mesh-external-service", func() {
				err := universal.Cluster.Install(ResourceUniversal(meshExternalService("ext-srv-1", esHttpContainerName, meshName, 80, false, nil)))
				Expect(err).ToNot(HaveOccurred())

				checkSuccessfulRequest("ext-srv-1.extsvc.mesh.local", clientName, And(
					Not(ContainSubstring("HTTPS")),
					// Should rewrite host header
					ContainSubstring(fmt.Sprintf(`"Host":["%s"]`, esHttpContainerName)),
				))
			})

			It("should route to mesh-external-service with same hostname but different ports", func() {
				err := universal.Cluster.Install(ResourceUniversal(meshExternalService("ext-srv-1", esHttpContainerName, meshName, 80, false, nil)))
				Expect(err).ToNot(HaveOccurred())

				err = universal.Cluster.Install(ResourceUniversal(meshExternalService("ext-srv-2", esHttp2ContainerName, meshName, 81, false, nil)))
				Expect(err).ToNot(HaveOccurred())

				// when access the first external service with .mesh
				checkSuccessfulRequest("ext-srv-1.extsvc.mesh.local", clientName,
					And(Not(ContainSubstring("HTTPS")), ContainSubstring("mes-http")))

				checkSuccessfulRequest("ext-srv-2.extsvc.mesh.local", clientName,
					And(Not(ContainSubstring("HTTPS")), ContainSubstring("mes-http-2")))
			})

			It("should route to mesh-external-service over tls", func() {
				// when set invalid certificate
				otherCert := "LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSURMRENDQWhTZ0F3SUJBZ0lRSGRQaHhPZlhnV3VOeG9GbFYvRXdxVEFOQmdrcWhraUc5dzBCQVFzRkFEQVAKTVEwd0N3WURWUVFERXdScmRXMWhNQjRYRFRJd01Ea3hOakV5TWpnME5Gb1hEVE13TURreE5ERXlNamcwTkZvdwpEekVOTUFzR0ExVUVBeE1FYTNWdFlUQ0NBU0l3RFFZSktvWklodmNOQVFFQkJRQURnZ0VQQURDQ0FRb0NnZ0VCCkFPWkdiV2hTbFFTUnhGTnQ1cC8yV0NLRnlIWjNDdXdOZ3lMRVA3blM0Wlh5a3hzRmJZU3VWM2JJZ0Y3YlQvdXEKYTVRaXJlK0M2MGd1aEZicExjUGgyWjZVZmdJZDY5R2xRekhNVlljbUxHalZRdXlBdDRGTU1rVGZWRWw1STRPYQorMml0M0J2aWhWa0toVXo4eTVSUjVLYnFKZkdwNFoyMEZoNmZ0dG9DRmJlT0RtdkJzWUpGbVVRUytpZm95TVkvClAzUjAzU3U3ZzVpSXZuejd0bWt5ZG9OQzhuR1JEemRENUM4Zkp2clZJMVVYNkpSR3lMS3Q0NW9RWHQxbXhLMTAKNUthTjJ6TlYyV3RIc2FKcDlid3JQSCtKaVpHZVp5dnVoNVV3ckxkSENtcUs3c205VG9kR3p0VVpZMFZ6QWM0cQprWVZpWFk4Z1VqZk5tK2NRclBPMWtOOENBd0VBQWFPQmd6Q0JnREFPQmdOVkhROEJBZjhFQkFNQ0FxUXdIUVlEClZSMGxCQll3RkFZSUt3WUJCUVVIQXdFR0NDc0dBUVVGQndNQk1BOEdBMVVkRXdFQi93UUZNQU1CQWY4d0hRWUQKVlIwT0JCWUVGR01EQlBQaUJGSjNtdjJvQTlDVHFqZW1GVFYyTUI4R0ExVWRFUVFZTUJhQ0NXeHZZMkZzYUc5egpkSUlKYkc5allXeG9iM04wTUEwR0NTcUdTSWIzRFFFQkN3VUFBNElCQVFDLzE3UXdlT3BHZGIxTUVCSjhYUEc3CjNzSy91dG9XTFgxdGpmOFN1MURnYTZDRFQvZVRXSFpyV1JmODFLT1ZZMDdkbGU1U1JJREsxUWhmYkdHdEZQK1QKdlprcm9vdXNJOVVTMmFDV2xrZUNaV0dUbnF2TG1Eb091anFhZ0RvS1JSdWs0bVFkdE5Ob254aUwvd1p0VEZLaQorMWlOalVWYkxXaURYZEJMeG9SSVZkTE96cWIvTU54d0VsVXlhVERBa29wUXlPV2FURGtZUHJHbWFXamNzZlBHCmFPS293MHplK3pIVkZxVEhiam5DcUVWM2huc1V5UlV3c0JsbjkrakRKWGd3Wk0vdE1sVkpyWkNoMFNsZTlZNVoKTU9CMGZDZjZzVE1OUlRHZzVMcGw2dUlZTS81SU5wbUhWTW8zbjdNQlNucEVEQVVTMmJmL3VvNWdJaXE2WENkcAotLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0tCg=="
				caCert, _ := base64.StdEncoding.DecodeString(otherCert)
				err := universal.Cluster.Install(ResourceUniversal(meshExternalService("ext-srv-tls", esHttpsContainerName, meshName, 443, true, caCert)))
				Expect(err).ToNot(HaveOccurred())

				// then accessing the secured external service fails
				Eventually(func(g Gomega) {
					response, err := client.CollectFailure(universal.Cluster, clientName, "http://ext-srv-tls.extsvc.mesh.local")
					g.Expect(err).ToNot(HaveOccurred())
					g.Expect(response.ResponseCode).To(Equal(503))
				}, "30s", "1s").MustPassRepeatedly(5).Should(Succeed())

				// when set proper certificate
				cert, _, err := universal.Cluster.Exec("", "", "mes-https", "cat /certs/cert.pem")
				Expect(err).ToNot(HaveOccurred())
				Expect(cert).ToNot(BeEmpty())

				err = universal.Cluster.Install(ResourceUniversal(meshExternalService("ext-srv-tls", esHttpsContainerName, meshName, 443, true, []byte(cert))))
				Expect(err).ToNot(HaveOccurred())

				// then accessing the secured external service succeeds
				checkSuccessfulRequest("http://ext-srv-tls.extsvc.mesh.local", clientName, Not(ContainSubstring("HTTPS")))
			})
		})
	}

	Context("MeshExternalService with MeshRetry", func() {
		E2EAfterEach(func() {
			Expect(DeleteMeshResources(universal.Cluster, meshNameNoDefaults,
				meshretry_api.MeshRetryResourceTypeDescriptor,
				meshexternalservice_api.MeshExternalServiceResourceTypeDescriptor,
			)).To(Succeed())
		})

		It("should retry on error", func() {
			meshExternalService := fmt.Sprintf(`
type: MeshExternalService
name: mes-retry
mesh: %s
labels:
  kuma.io/origin: zone
spec:
  match:
    type: HostnameGenerator
    port: 80
    protocol: http
  endpoints:
    - address: %s
      port: 80
    - address: %s
      port: 80
`, meshNameNoDefaults, esHttpsContainerName, esHttpContainerName)

			meshRetryPolicy := fmt.Sprintf(`
type: MeshRetry
mesh: %s
name: meshretry-mes-policy
spec:
  targetRef:
    kind: Mesh
  to:
    - targetRef:
        kind: MeshExternalService
        name: mes-retry
      default:
        http:
          numRetries: 5
          retryOn:
            - "5xx"
`, meshNameNoDefaults)
			Expect(universal.Cluster.Install(YamlUniversal(meshExternalService))).To(Succeed())

			// we have 2 endpoints, one http and another https so some requests should fail
			By("Check some errors happen")
			Eventually(func(g Gomega) {
				response, err := client.CollectFailure(
					universal.Cluster, "mes-demo-client-no-defaults", "mes-retry.extsvc.mesh.local",
					client.NoFail(),
				)

				g.Expect(err).ToNot(HaveOccurred())
				g.Expect(response.ResponseCode).To(Equal(503))
			}, "30s", "100ms").Should(Succeed())

			By("Apply a MeshRetry policy")
			Expect(universal.Cluster.Install(YamlUniversal(meshRetryPolicy))).To(Succeed())

			By("Eventually all requests succeed consistently")
			Eventually(func(g Gomega) {
				_, err := client.CollectEchoResponse(
					universal.Cluster, "mes-demo-client-no-defaults", "mes-retry.extsvc.mesh.local",
				)
				g.Expect(err).ToNot(HaveOccurred())
			}, "1m", "1s", MustPassRepeatedly(5)).Should(Succeed())
		})
	})

	Context("MeshExternalService with MeshTimeout", func() {
		E2EAfterEach(func() {
			Expect(DeleteMeshResources(universal.Cluster, meshNameNoDefaults,
				meshtimeout_api.MeshTimeoutResourceTypeDescriptor,
				meshexternalservice_api.MeshExternalServiceResourceTypeDescriptor,
			)).To(Succeed())
		})

		It("should target real MeshExternalService resource", func() {
			meshExternalService := fmt.Sprintf(`
type: MeshExternalService
name: mes-timeout
mesh: %s
spec:
  match:
    type: HostnameGenerator
    port: 80
    protocol: http
  endpoints:
    - address: %s
      port: 80
`, meshNameNoDefaults, esHttpContainerName)
			timeoutConfig := fmt.Sprintf(`
type: MeshTimeout
name: timeout-for-mes
mesh: %s
spec:
  targetRef:
    kind: Mesh
  to:
    - targetRef:
        kind: MeshExternalService
        name: mes-timeout
      default:
        idleTimeout: 20s
        http:
          requestTimeout: 2s
          maxStreamDuration: 20s`, meshNameNoDefaults)

			Expect(universal.Cluster.Install(YamlUniversal(meshExternalService))).To(Succeed())

			// given no MeshTimeout
			By("request should pass with the delay")
			Eventually(func(g Gomega) {
				start := time.Now()
				_, err := client.CollectEchoResponse(
					universal.Cluster, "mes-demo-client-no-defaults", "mes-timeout.extsvc.mesh.local",
					client.WithHeader("x-set-response-delay-ms", "5000"),
					client.WithMaxTime(10),
				)
				g.Expect(err).ToNot(HaveOccurred())
				g.Expect(time.Since(start)).To(BeNumerically(">", time.Second*5))
			}, "30s", "1s").Should(Succeed())

			// when timeout applied
			Expect(universal.Cluster.Install(YamlUniversal(timeoutConfig))).To(Succeed())

			// then should timeout after 5 seconds
			Eventually(func(g Gomega) {
				response, err := client.CollectFailure(
					universal.Cluster, "mes-demo-client-no-defaults", "mes-timeout.extsvc.mesh.local",
					client.WithHeader("x-set-response-delay-ms", "5000"),
					client.WithMaxTime(10),
				)
				g.Expect(err).ToNot(HaveOccurred())
				g.Expect(response.ResponseCode).To(Equal(504))
			}, "30s", "1s", MustPassRepeatedly(3)).Should(Succeed())
		})
	})

	contextFor("without default policies", meshNameNoDefaults, "mes-demo-client-no-defaults")
}
