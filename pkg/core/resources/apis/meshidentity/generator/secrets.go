package generator

import (
	"bytes"
	"sort"

	envoy_auth "github.com/envoyproxy/go-control-plane/envoy/extensions/transport_sockets/tls/v3"
	"github.com/kumahq/kuma/pkg/core"
	core_plugins "github.com/kumahq/kuma/pkg/core/plugins"
	meshidentity_api "github.com/kumahq/kuma/pkg/core/resources/apis/meshidentity/api/v1alpha1"
	"github.com/kumahq/kuma/pkg/core/system_names"
	core_xds "github.com/kumahq/kuma/pkg/core/xds"
	bldrs_auth "github.com/kumahq/kuma/pkg/envoy/builders/auth"
	bldrs_core "github.com/kumahq/kuma/pkg/envoy/builders/core"
	xds_context "github.com/kumahq/kuma/pkg/xds/context"
	"google.golang.org/protobuf/types/known/anypb"
)

var SystemResourceNameCABundle = system_names.MustBeSystemName(system_names.Join("trust", "bundle"))

const OriginWorkloadIdentity = "identity"

var _ core_plugins.CoreResourcePlugin = &plugin{}

type plugin struct{}

func NewPlugin() core_plugins.CoreResourcePlugin {
	return &plugin{}
}

func (p *plugin) Apply(rs *core_xds.ResourceSet, xdsCtx xds_context.Context, proxy *core_xds.Proxy) error {
	core.Log.Info("APPLY IN GENERATOR")
	if proxy.WorkloadIdentity == nil {
		return nil
	}
	core.Log.Info("proxy", "proxy", proxy.WorkloadIdentity)
	// add identity secret
	switch proxy.WorkloadIdentity.Type {
	// TODO: how we can do it more dynamic so we can easily add plugin code in parent project
	case string(meshidentity_api.BundledType):
		identitySecret, err := identitySecret(proxy)
		if err != nil {
			return err
		}
		rs.Add(&core_xds.Resource{
			Name:     identitySecret.Name,
			Origin:   OriginWorkloadIdentity,
			Resource: identitySecret,
		})
	}
	// add validation context secret
	if len(xdsCtx.Mesh.TrustsByTrustDomain) > 0 {
		config, err := validationCtx(xdsCtx)
		if err != nil {
			return err
		}
		rs.Add(&core_xds.Resource{
			Name:     config.Name,
			Origin:   OriginWorkloadIdentity,
			Resource: config,
		})
	}

	return nil
}

func validationCtx(xdsCtx xds_context.Context) (*envoy_auth.Secret, error) {
	validatorsPerTrustDomain := []*envoy_auth.SPIFFECertValidatorConfig_TrustDomain{}
	for domain, trusts := range xdsCtx.Mesh.TrustsByTrustDomain {
		// concatenate multiple CAs
		allCAs := [][]byte{}
		for _, trust := range trusts {
			for _, ca := range trust.CABundles {
				allCAs = append(allCAs, []byte(ca.Pem.Value))
			}
		}
		concatenatedCA := bytes.Join(allCAs, []byte("\n"))
		validator, err := bldrs_auth.NewSPIFFECertValidator().
			Configure(
				bldrs_auth.TrustDomainBundle(domain,
					bldrs_core.NewDataSource().Configure(bldrs_core.InlineBytes(concatenatedCA)))).Build()
		if err != nil {
			return nil, err
		}
		validatorsPerTrustDomain = append(validatorsPerTrustDomain, validator)
	}
	// Order by trustdomain name to return in consistent order
	sort.Slice(validatorsPerTrustDomain, func(i, j int) bool {
		return validatorsPerTrustDomain[i].Name < validatorsPerTrustDomain[j].Name
	})

	typedConfig, err := anypb.New(&envoy_auth.SPIFFECertValidatorConfig{
		TrustDomains: validatorsPerTrustDomain,
	})
	if err != nil {
		return nil, err
	}
	ca, err := bldrs_auth.NewSecret().
		Configure(bldrs_auth.Name(SystemResourceNameCABundle)).
		Configure(bldrs_auth.ValidationContext(
			bldrs_auth.NewValidationContext().
				Configure(
					bldrs_auth.CertificateValidationContext(
						bldrs_auth.NewCertificateValidationContext().
							Configure(bldrs_auth.SpiffeCustomValidator(typedConfig)))))).Build()
	if err != nil {
		return nil, err
	}
	return ca, nil
}

func identitySecret(proxy *core_xds.Proxy) (*envoy_auth.Secret, error) {
	identitySecret, err := bldrs_auth.NewSecret().
		Configure(bldrs_auth.Name(proxy.WorkloadIdentity.SecretName)).
		Configure(bldrs_auth.TlsCertificate(
			bldrs_auth.NewTlsCertificate().
				Configure(bldrs_auth.CertificateChain(
					bldrs_core.NewDataSource().
						Configure(bldrs_core.InlineBytes(bytes.Join([][]byte{proxy.WorkloadIdentity.Cert}, []byte("\n")))))).
				Configure(bldrs_auth.PrivateKey(
					bldrs_core.NewDataSource().
						Configure(bldrs_core.InlineBytes(proxy.WorkloadIdentity.PrivateKey)))))).Build()
	if err != nil {
		return nil, err
	}
	return identitySecret, nil
}
