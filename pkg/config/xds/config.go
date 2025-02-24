package xds

import (
	"time"

	"github.com/pkg/errors"
	"k8s.io/utils/net"

	"github.com/kumahq/kuma/pkg/config"
	config_types "github.com/kumahq/kuma/pkg/config/types"
)

var _ config.Config = &XdsServerConfig{}

// Envoy XDS server configuration
type XdsServerConfig struct {
	config.BaseConfig

	// Interval for re-generating configuration for Dataplanes connected to the Control Plane
	DataplaneConfigurationRefreshInterval config_types.Duration `json:"dataplaneConfigurationRefreshInterval" envconfig:"kuma_xds_server_dataplane_configuration_refresh_interval"`
	// Interval for flushing status of Dataplanes connected to the Control Plane
	DataplaneStatusFlushInterval config_types.Duration `json:"dataplaneStatusFlushInterval" envconfig:"kuma_xds_server_dataplane_status_flush_interval"`
	// DataplaneDeregistrationDelay is a delay between proxy terminating a connection and the CP trying to deregister the proxy.
	// It is used only in universal mode when you use direct lifecycle.
	// Setting this setting to 0s disables the delay.
	// Disabling this may cause race conditions that one instance of CP removes proxy object
	// while proxy is connected to another instance of the CP.
	DataplaneDeregistrationDelay config_types.Duration `json:"dataplaneDeregistrationDelay" envconfig:"kuma_xds_dataplane_deregistration_delay"`
	// Backoff that is executed when Control Plane is sending the response that was previously rejected by Dataplane
	NACKBackoff config_types.Duration `json:"nackBackoff" envconfig:"kuma_xds_server_nack_backoff"`
}

func (x *XdsServerConfig) Validate() error {
	if x.DataplaneConfigurationRefreshInterval.Duration <= 0 {
		return errors.New("DataplaneConfigurationRefreshInterval must be positive")
	}
	if x.DataplaneStatusFlushInterval.Duration <= 0 {
		return errors.New("DataplaneStatusFlushInterval must be positive")
	}
	return nil
}

func DefaultXdsServerConfig() *XdsServerConfig {
	return &XdsServerConfig{
		DataplaneConfigurationRefreshInterval: config_types.Duration{Duration: 1 * time.Second},
		DataplaneStatusFlushInterval:          config_types.Duration{Duration: 10 * time.Second},
		DataplaneDeregistrationDelay:          config_types.Duration{Duration: 10 * time.Second},
		NACKBackoff:                           config_types.Duration{Duration: 5 * time.Second},
	}
}

type Proxy struct {
	// Gateway holds data plane wide configuration for MeshGateway proxies
	Gateway Gateway `json:"gateway"`
	// InternalAddresses
	InternalAddresses InternalAddresses `json:"internalAddresses"`
}

type InternalAddresses struct {
	config.BaseConfig
	Disabled bool `json:"disabled" envconfig:"kuma_proxy_internal_addresses_disabled"`
	CIDRs []string `json:"cidrs" envconfig:"kuma_proxy_internal_addresses_cidrs"`
}

type Gateway struct {
	GlobalDownstreamMaxConnections uint64 `json:"globalDownstreamMaxConnections" envconfig:"kuma_proxy_gateway_global_downstream_max_connections"`
}

var _ config.Config = &InternalAddresses{}

func (x *InternalAddresses) Validate() error {
	if len(x.CIDRs) == 0 {
		return nil
	}
	_, err := net.ParseCIDRs(x.CIDRs)
	if err != nil {
		return err
	}
	return nil
}


func DefaultProxyConfig() Proxy {
	return Proxy{
		Gateway: Gateway{
			GlobalDownstreamMaxConnections: 50000,
		},
		InternalAddresses: InternalAddresses{
			Disabled: false,
			// https://datatracker.ietf.org/doc/html/rfc1918#section-3
			CIDRs: []string{
				"10.0.0.0/8",
				"172.16.0.0/12",
				"192.168.0.0/16",
				"127.0.0.1/32",
				"::1/128",
			},
		},
	}
}
