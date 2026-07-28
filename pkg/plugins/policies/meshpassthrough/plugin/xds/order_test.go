package xds_test

import (
	"fmt"

	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"
	"sigs.k8s.io/yaml"

	api "github.com/kumahq/kuma/v3/pkg/plugins/policies/meshpassthrough/api/v1alpha1"
	plugin_xds "github.com/kumahq/kuma/v3/pkg/plugins/policies/meshpassthrough/plugin/xds"
	"github.com/kumahq/kuma/v3/pkg/test/matchers"
	"github.com/kumahq/kuma/v3/pkg/util/pointer"
)

var _ = Describe("Match order", func() {
	type validTestCase struct {
		conf          api.Conf
		orderedGolden string
	}
	DescribeTable("should generate proper order",
		func(given validTestCase) {
			// when
			orderedFilterChainMatches, _ := plugin_xds.GetOrderedMatchers(given.conf)

			yaml, err := yaml.Marshal(orderedFilterChainMatches)
			// then
			Expect(err).ToNot(HaveOccurred())
			Expect(yaml).To(matchers.MatchGoldenYAML(fmt.Sprintf("testdata/%s", given.orderedGolden)))
		},
		Entry("many different protocols", validTestCase{
			conf: api.Conf{
				AppendMatch: &[]api.Match{
					{
						Type:     api.MatchType("Domain"),
						Value:    "api.example.com",
						Port:     pointer.To[uint32](443),
						Protocol: api.ProtocolType("tls"),
					},
					{
						Type:     api.MatchType("Domain"),
						Value:    "api.example.com",
						Protocol: api.ProtocolType("tls"),
					},
					{
						Type:     api.MatchType("Domain"),
						Value:    "example.com",
						Port:     pointer.To[uint32](443),
						Protocol: api.ProtocolType("tls"),
					},
					{
						Type:     api.MatchType("Domain"),
						Value:    "*.example.com",
						Port:     pointer.To[uint32](443),
						Protocol: api.ProtocolType("tls"),
					},
					{
						Type:     api.MatchType("Domain"),
						Value:    "example.com",
						Port:     pointer.To[uint32](8080),
						Protocol: api.ProtocolType("http"),
					},
					{
						Type:     api.MatchType("Domain"),
						Value:    "other.com",
						Port:     pointer.To[uint32](8080),
						Protocol: api.ProtocolType("http"),
					},
					{
						Type:     api.MatchType("Domain"),
						Value:    "anotherhttp.com",
						Port:     pointer.To[uint32](8080),
						Protocol: api.ProtocolType("http"),
					},
					{
						Type:     api.MatchType("Domain"),
						Value:    "http2.com",
						Port:     pointer.To[uint32](9000),
						Protocol: api.ProtocolType("http"),
					},
					{
						Type:     api.MatchType("Domain"),
						Value:    "grpc.com",
						Port:     pointer.To[uint32](9001),
						Protocol: api.ProtocolType("http"),
					},
					{
						Type:     api.MatchType("Domain"),
						Value:    "*.example.com",
						Protocol: api.ProtocolType("http"),
					},
					{
						Type:     api.MatchType("Domain"),
						Value:    "*.example.com",
						Protocol: api.ProtocolType("tls"),
					},
					{
						Type:     api.MatchType("IP"),
						Value:    "10.42.0.8",
						Protocol: api.ProtocolType("http"),
					},
					{
						Type:     api.MatchType("IP"),
						Value:    "192.168.19.1",
						Protocol: api.ProtocolType("tls"),
					},
					{
						Type:     api.MatchType("IP"),
						Value:    "192.168.0.1",
						Port:     pointer.To[uint32](9091),
						Protocol: api.ProtocolType("tcp"),
					},
					{
						Type:     api.MatchType("Domain"),
						Value:    "otherexample.com",
						Protocol: api.ProtocolType("http"),
					},
					{
						Type:     api.MatchType("CIDR"),
						Value:    "192.168.0.1/24",
						Protocol: api.ProtocolType("tcp"),
					},
					{
						Type:     api.MatchType("CIDR"),
						Value:    "192.168.1.1/30",
						Protocol: api.ProtocolType("tcp"),
					},
					{
						Type:     api.MatchType("CIDR"),
						Value:    "192.168.2.1/30",
						Protocol: api.ProtocolType("tcp"),
					},
					{
						Type:     api.MatchType("CIDR"),
						Value:    "192.168.0.1/30",
						Protocol: api.ProtocolType("tcp"),
					},
					{
						Type:     api.MatchType("CIDR"),
						Value:    "240.0.0.0/4",
						Protocol: api.ProtocolType("http"),
					},
					{
						Type:     api.MatchType("CIDR"),
						Value:    "172.18.0.0/16",
						Protocol: api.ProtocolType("http"),
					},
					{
						Type:     api.MatchType("IP"),
						Value:    "b6e5:a45e:70ae:e77f:d24e:5023:375d:20a6",
						Protocol: api.ProtocolType("tls"),
					},
					{
						Type:     api.MatchType("IP"),
						Value:    "9942:9abf:d0e0:f2da:2290:333b:e590:f497",
						Port:     pointer.To[uint32](9091),
						Protocol: api.ProtocolType("tcp"),
					},
					{
						Type:     api.MatchType("CIDR"),
						Value:    "b0ce:f616:4e74:28f7:427c:b969:8016:6344/64",
						Protocol: api.ProtocolType("tcp"),
					},
					{
						Type:     api.MatchType("CIDR"),
						Value:    "b0ce:f616:4e74:28f7:427c:b969:8016:6344/96",
						Protocol: api.ProtocolType("tcp"),
					},
				},
			},
			orderedGolden: "ordered.golden.yaml",
		}),
		Entry("different protocols on the same port but only one L7", validTestCase{
			conf: api.Conf{
				AppendMatch: &[]api.Match{
					{
						Type:     api.MatchType("Domain"),
						Value:    "api.example.com",
						Port:     pointer.To[uint32](443),
						Protocol: api.ProtocolType("tls"),
					},
					{
						Type:     api.MatchType("Domain"),
						Value:    "api.example.com",
						Port:     pointer.To[uint32](443),
						Protocol: api.ProtocolType("http"),
					},
					{
						Type:     api.MatchType("IP"),
						Value:    "127.0.0.1",
						Port:     pointer.To[uint32](443),
						Protocol: api.ProtocolType("tcp"),
					},
					{
						Type:     api.MatchType("Domain"),
						Value:    "api.example.com",
						Port:     pointer.To[uint32](9090),
						Protocol: api.ProtocolType("tls"),
					},
					{
						Type:     api.MatchType("Domain"),
						Value:    "api.example.com",
						Port:     pointer.To[uint32](9090),
						Protocol: api.ProtocolType("http2"),
					},
					{
						Type:     api.MatchType("IP"),
						Value:    "127.0.0.1",
						Port:     pointer.To[uint32](9090),
						Protocol: api.ProtocolType("tcp"),
					},
					{
						Type:     api.MatchType("Domain"),
						Value:    "api.example.com",
						Port:     pointer.To[uint32](9091),
						Protocol: api.ProtocolType("tls"),
					},
					{
						Type:     api.MatchType("Domain"),
						Value:    "api.example.com",
						Port:     pointer.To[uint32](9091),
						Protocol: api.ProtocolType("grpc"),
					},
					{
						Type:     api.MatchType("IP"),
						Value:    "127.0.0.1",
						Port:     pointer.To[uint32](9091),
						Protocol: api.ProtocolType("tcp"),
					},
					{
						Type:     api.MatchType("IP"),
						Value:    "127.0.0.1",
						Protocol: api.ProtocolType("tcp"),
					},
					{
						Type:     api.MatchType("Domain"),
						Value:    "httpbin.com",
						Port:     pointer.To[uint32](80),
						Protocol: api.ProtocolType("http"),
					},
					{
						Type:     api.MatchType("IP"),
						Value:    "10.22.22.1",
						Protocol: api.ProtocolType("http"),
					},
				},
			},
			orderedGolden: "ordered-diff-protocols.golden.yaml",
		}),
	)
	type invalidTestCase struct {
		conf     api.Conf
		warnings []string
	}
	DescribeTable("should skip matches producing conflicting filter chains",
		func(given invalidTestCase) {
			// when
			matchers, warnings := plugin_xds.GetOrderedMatchers(given.conf)

			// then
			Expect(warnings).To(Equal(given.warnings))
			// and conflicting matches are not generated
			Expect(matchers).ToNot(BeEmpty())
		},
		Entry("many different protocols", invalidTestCase{
			conf: api.Conf{
				AppendMatch: &[]api.Match{
					{
						Type:     api.MatchType("Domain"),
						Value:    "example.com",
						Port:     pointer.To[uint32](8080),
						Protocol: api.ProtocolType("http"),
					},
					{
						Type:     api.MatchType("Domain"),
						Value:    "another.com",
						Port:     pointer.To[uint32](8080),
						Protocol: api.ProtocolType("http2"),
					},
					{
						Type:     api.MatchType("Domain"),
						Value:    "other.com",
						Port:     pointer.To[uint32](8080),
						Protocol: api.ProtocolType("tcp"),
					},
					{
						Type:     api.MatchType("Domain"),
						Value:    "anotherhttp.com",
						Port:     pointer.To[uint32](9001),
						Protocol: api.ProtocolType("http"),
					},
					{
						Type:     api.MatchType("Domain"),
						Value:    "http2.com",
						Port:     pointer.To[uint32](9001),
						Protocol: api.ProtocolType("http2"),
					},
					{
						Type:     api.MatchType("Domain"),
						Value:    "grpc.com",
						Port:     pointer.To[uint32](9001),
						Protocol: api.ProtocolType("grpc"),
					},
				},
			},
			warnings: []string{
				`ignoring match http2 for "another.com", it conflicts with match http for "example.com" because both apply to the same destination and port`,
				`ignoring match http2 for "http2.com", it conflicts with match http for "anotherhttp.com" because both apply to the same destination and port`,
				`ignoring match grpc for "grpc.com", it conflicts with match http for "anotherhttp.com" because both apply to the same destination and port`,
			},
		}),
		Entry("the same domain on a specific port and on all ports", invalidTestCase{
			conf: api.Conf{
				AppendMatch: &[]api.Match{
					{
						Type:     api.MatchType("Domain"),
						Value:    "datadog.datadog.svc.cluster.local",
						Port:     pointer.To[uint32](4317),
						Protocol: api.ProtocolType("grpc"),
					},
					{
						Type:     api.MatchType("Domain"),
						Value:    "datadog.datadog.svc.cluster.local",
						Protocol: api.ProtocolType("http"),
					},
				},
			},
			warnings: []string{
				`ignoring match http for "datadog.datadog.svc.cluster.local", it conflicts with match grpc for "datadog.datadog.svc.cluster.local" because both apply to the same destination and port`,
			},
		}),
		Entry("tcp and mysql on the same address", invalidTestCase{
			conf: api.Conf{
				AppendMatch: &[]api.Match{
					{
						Type:     api.MatchType("IP"),
						Value:    "172.12.2.2",
						Protocol: api.ProtocolType("tcp"),
					},
					{
						Type:     api.MatchType("IP"),
						Value:    "172.12.2.2",
						Port:     pointer.To[uint32](3306),
						Protocol: api.ProtocolType("mysql"),
					},
				},
			},
			warnings: []string{
				`ignoring match mysql for "172.12.2.2", it conflicts with match tcp for "172.12.2.2" because both apply to the same destination and port`,
			},
		}),
	)
})
