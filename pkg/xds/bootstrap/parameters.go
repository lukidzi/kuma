package bootstrap

import (
	"time"

	mesh_proto "github.com/kumahq/kuma/api/mesh/v1alpha1"
	"github.com/kumahq/kuma/pkg/xds/bootstrap/types"
)

type KumaDpBootstrap struct {
	AggregateMetricsConfig []AggregateMetricsConfig
	NetworkingConfig       NetworkingConfig
}

type NetworkingConfig struct {
	IsUsingTransparentProxy bool
	CorefileTemplate        []byte
	Address                 string
}

type AggregateMetricsConfig struct {
	Name    string
	Path    string
	Address string
	Port    uint32
}

type configParameters struct {
	Id                          string
	Service                     string
	AdminAddress                string
	AdminPort                   uint32
	ReadinessPort               uint32
	AppProbeProxyEnabled        bool
	AdminAccessLogPath          string
	XdsHost                     string
	XdsPort                     uint32
	XdsConnectTimeout           time.Duration
	Workdir                     string
	MetricsCertPath             string
	MetricsKeyPath              string
	DataplaneToken              string
	DataplaneTokenPath          string
	DataplaneResource           string
	CertBytes                   []byte
	Version                     *mesh_proto.Version
	HdsEnabled                  bool
	DynamicMetadata             map[string]string
	DNSPort                     uint32
	ProxyType                   string
	Features                    []string
	IsGatewayDataplane          bool
	Resources                   types.ProxyResources
	SystemCaPath                string
	XdsTransportProtocolVariant types.XdsMode
}
