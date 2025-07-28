package generator

import (
	"bytes"
	"sort"

	envoy_core "github.com/envoyproxy/go-control-plane/envoy/config/core/v3"
	envoy_auth "github.com/envoyproxy/go-control-plane/envoy/extensions/transport_sockets/tls/v3"
	"google.golang.org/protobuf/types/known/anypb"

	"github.com/kumahq/kuma/pkg/core"
	core_plugins "github.com/kumahq/kuma/pkg/core/plugins"
	meshidentity_api "github.com/kumahq/kuma/pkg/core/resources/apis/meshidentity/api/v1alpha1"
	meshtrust_api "github.com/kumahq/kuma/pkg/core/resources/apis/meshtrust/api/v1alpha1"
	core_xds "github.com/kumahq/kuma/pkg/core/xds"
	xds_context "github.com/kumahq/kuma/pkg/xds/context"
)

const OriginWorkloadIdentity = "identity"

var _ core_plugins.CoreResourcePlugin = &plugin{}

type plugin struct{}

func NewPlugin() core_plugins.CoreResourcePlugin {
	return &plugin{}
}

func (p *plugin) Apply(rs *core_xds.ResourceSet, xdsCtx xds_context.Context, proxy *core_xds.Proxy) error {
	core.Log.Info("APPLY IN GENERATOR")
	if proxy.Identity == nil {
		return nil
	}
	core.Log.Info("proxy", "proxy", proxy.Identity)
	switch proxy.Identity.Type {
	case string(meshidentity_api.BundledType):
		workloadIdentity := &envoy_auth.Secret{
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
		rs.Add(&core_xds.Resource{
			Name:     workloadIdentity.Name,
			Origin:   OriginWorkloadIdentity,
			Resource: workloadIdentity,
		})
	}
	trustByDomain := map[string][]*meshtrust_api.MeshTrustResource{}
	for _, trust := range xdsCtx.Mesh.Resources.MeshTrusts().Items {
		trustByDomain[trust.Spec.TrustDomain] = append(trustByDomain[trust.Spec.TrustDomain], trust)
	}
	configTrustDomains := []*envoy_auth.SPIFFECertValidatorConfig_TrustDomain{}
	for domain, trusts := range trustByDomain {
		cas := [][]byte{}
		for _, trust := range trusts {
			for _, ca := range trust.Spec.CABundles {
				cas = append(cas, []byte(ca.Pem.Value))
			}
		}
		configTrustDomains = append(configTrustDomains, &envoy_auth.SPIFFECertValidatorConfig_TrustDomain{
			Name: domain,
			TrustBundle: &envoy_core.DataSource{
				Specifier: &envoy_core.DataSource_InlineBytes{
					InlineBytes: bytes.Join(cas, []byte("\n")),
				},
			},
		})

		// Order by trustdomain name to return in consistent order
		sort.Slice(configTrustDomains, func(i, j int) bool {
			return configTrustDomains[i].Name < configTrustDomains[j].Name
		})

		typedConfig, err := anypb.New(&envoy_auth.SPIFFECertValidatorConfig{
			TrustDomains: configTrustDomains,
		})
		if err != nil {
			return err
		}
		ca := &envoy_auth.Secret{
			Name: "system_identity_ca",
			Type: &envoy_auth.Secret_ValidationContext{
				ValidationContext: &envoy_auth.CertificateValidationContext{
					CustomValidatorConfig: &envoy_core.TypedExtensionConfig{
						Name:        "envoy.tls.cert_validator.spiffe",
						TypedConfig: typedConfig,
					},
				},
			},
		}
		rs.Add(&core_xds.Resource{
			Name:     ca.Name,
			Origin:   OriginWorkloadIdentity,
			Resource: ca,
		})
	}

	return nil
}
