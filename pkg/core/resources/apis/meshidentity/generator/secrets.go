package generator

import (
	"bytes"

	envoy_core "github.com/envoyproxy/go-control-plane/envoy/config/core/v3"
	envoy_auth "github.com/envoyproxy/go-control-plane/envoy/extensions/transport_sockets/tls/v3"

	"github.com/kumahq/kuma/pkg/core"
	core_plugins "github.com/kumahq/kuma/pkg/core/plugins"
	core_xds "github.com/kumahq/kuma/pkg/core/xds"
)

const OriginWorkloadIdentity = "identity"

var _ core_plugins.CoreResourcePlugin = &plugin{}

type plugin struct{}

func NewPlugin() core_plugins.CoreResourcePlugin {
	return &plugin{}
}

func (p *plugin) Apply(rs *core_xds.ResourceSet, proxy *core_xds.Proxy) error {
	core.Log.Info("APPLY IN GENERATOR")
	if proxy.Identity == nil {
		return nil
	}
	var workloadIdentity *envoy_auth.Secret
	switch proxy.Identity.Type {
	case core_xds.BundledProviderType:
		workloadIdentity = &envoy_auth.Secret{
			Name: proxy.Identity.SecretName,
			Type: &envoy_auth.Secret_TlsCertificate{
				TlsCertificate: &envoy_auth.TlsCertificate{
					CertificateChain: &envoy_core.DataSource{
						Specifier: &envoy_core.DataSource_InlineBytes{
							InlineBytes: bytes.Join([][]byte{proxy.Identity.Cert}, []byte("\n")),
						},
					},
					PrivateKey: &envoy_core.DataSource{
						Specifier: &envoy_core.DataSource_InlineBytes{
							InlineBytes: proxy.Identity.PrivateKey,
						},
					},
				},
			},
		}
	}
	ca := &envoy_auth.Secret{
		Name: "system_identity_ca",
		Type: &envoy_auth.Secret_ValidationContext{
			ValidationContext: &envoy_auth.CertificateValidationContext{
				TrustedCa: &envoy_core.DataSource{
					Specifier: &envoy_core.DataSource_InlineBytes{
						InlineBytes: bytes.Join([][]byte{proxy.Identity.CA}, []byte("\n")),
					},
				},
			},
		},
	}
	rs.Add(&core_xds.Resource{
		Name:     workloadIdentity.Name,
		Origin:   OriginWorkloadIdentity,
		Resource: workloadIdentity,
	})

	rs.Add(&core_xds.Resource{
		Name:     ca.Name,
		Origin:   OriginWorkloadIdentity,
		Resource: ca,
	})
	core.Log.Info("Secret", "secret", workloadIdentity, "ca", ca)
	return nil
}
