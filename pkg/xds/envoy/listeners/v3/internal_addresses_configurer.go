package v3

import (
	"k8s.io/utils/net"

	envoy_core "github.com/envoyproxy/go-control-plane/envoy/config/core/v3"
	envoy_listener "github.com/envoyproxy/go-control-plane/envoy/config/listener/v3"
	envoy_hcm "github.com/envoyproxy/go-control-plane/envoy/extensions/filters/network/http_connection_manager/v3"
	"github.com/kumahq/kuma/pkg/util/proto"
)

type InternalAddressesConfigurer struct {
	Cidrs              []string
	UnixSocketInternal bool
}

var _ FilterChainConfigurer = &InternalAddressesConfigurer{}

func (g *InternalAddressesConfigurer) Configure(filterChain *envoy_listener.FilterChain) error {
	return UpdateHTTPConnectionManager(filterChain, func(manager *envoy_hcm.HttpConnectionManager) error {
		ranges := []*envoy_core.CidrRange{}
		cidrNets, err := net.ParseCIDRs(g.Cidrs)
		if err != nil {
			return err
		}
		for _, cidr := range cidrNets {
			mask, _ := cidr.Mask.Size()
			ranges = append(ranges, &envoy_core.CidrRange{
				AddressPrefix: cidr.IP.String(),
				PrefixLen:     proto.UInt32(uint32(mask)),
			})
		}

		manager.InternalAddressConfig = &envoy_hcm.HttpConnectionManager_InternalAddressConfig{
			UnixSockets: g.UnixSocketInternal,
			CidrRanges:  ranges,
		}
		return nil
	})
}
