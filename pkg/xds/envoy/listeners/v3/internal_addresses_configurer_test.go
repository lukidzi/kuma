package v3_test

import (
	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"

	"github.com/kumahq/kuma/pkg/core/xds"
	util_proto "github.com/kumahq/kuma/pkg/util/proto"
	"github.com/kumahq/kuma/pkg/xds/envoy"
	envoy_common "github.com/kumahq/kuma/pkg/xds/envoy"
	. "github.com/kumahq/kuma/pkg/xds/envoy/listeners"
)

var _ = Describe("InternalAddressesConfigurer", func() {
	It("should generate proper Envoy config", func() {
		listener, err := NewInboundListenerBuilder(envoy_common.APIV3, "127.0.0.1", 99, xds.SocketAddressProtocolTCP).
			Configure(FilterChain(NewFilterChainBuilder(envoy.APIV3, envoy.AnonymousResource).
				Configure(HttpConnectionManager("custom", false)).
				Configure(InternalAddresses(
					[]string{"10.0.0.0/8", "192.168.0.0/16", "172.16.0.0/12", "127.0.0.1/32", "fd00::/8", "::1/128"},
					true,
				)))).Build()

		Expect(err).ToNot(HaveOccurred())

		config, err := util_proto.ToYAML(listener)
		Expect(err).ToNot(HaveOccurred())
		Expect(config).To(MatchYAML(`
      name: inbound:127.0.0.1:99
      trafficDirection: INBOUND
      address:
        socketAddress:
          address: 127.0.0.1
          portValue: 99
      enableReusePort: false
      filterChains:
      - filters:
          - name: envoy.filters.network.http_connection_manager
            typedConfig:
              '@type': type.googleapis.com/envoy.extensions.filters.network.http_connection_manager.v3.HttpConnectionManager
              httpFilters:
                  - name: envoy.filters.http.router
                    typedConfig:
                      '@type': type.googleapis.com/envoy.extensions.filters.http.router.v3.Router
              internalAddressConfig:
                  cidrRanges:
                      - addressPrefix: 10.0.0.0
                        prefixLen: 8
                      - addressPrefix: 192.168.0.0
                        prefixLen: 16
                      - addressPrefix: 172.16.0.0
                        prefixLen: 12
                      - addressPrefix: 127.0.0.1
                        prefixLen: 32
                      - addressPrefix: 'fd00::'
                        prefixLen: 8
                      - addressPrefix: ::1
                        prefixLen: 128
                  unixSockets: true
              statPrefix: custom

`))
	})
})
