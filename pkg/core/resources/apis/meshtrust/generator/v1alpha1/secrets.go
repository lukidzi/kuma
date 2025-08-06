package v1alpha1

import (
	"bytes"
	"sort"

	envoy_auth "github.com/envoyproxy/go-control-plane/envoy/extensions/transport_sockets/tls/v3"
	"google.golang.org/protobuf/types/known/anypb"

	core_plugins "github.com/kumahq/kuma/pkg/core/plugins"
	meshidentity_api "github.com/kumahq/kuma/pkg/core/resources/apis/meshidentity/api/v1alpha1"
	core_xds "github.com/kumahq/kuma/pkg/core/xds"
	bldrs_auth "github.com/kumahq/kuma/pkg/envoy/builders/auth"
	bldrs_core "github.com/kumahq/kuma/pkg/envoy/builders/core"
	xds_context "github.com/kumahq/kuma/pkg/xds/context"
	"github.com/kumahq/kuma/pkg/xds/generator/system_names"
)

const OriginWorkloadIdentity = "trust"

var _ core_plugins.CoreResourcePlugin = &plugin{}

type plugin struct{}

func NewPlugin() core_plugins.CoreResourcePlugin {
	return &plugin{}
}

func (p *plugin) Generate(rs *core_xds.ResourceSet, xdsCtx xds_context.Context, proxy *core_xds.Proxy) error {
	if proxy.WorkloadIdentity == nil {
		return nil
	}
	// add identity secret
	switch proxy.WorkloadIdentity.Type {
	case string(meshidentity_api.BundledType):
		// add validation context secret
		if len(xdsCtx.Mesh.TrustsByTrustDomain) > 0 {
			config, err := validationCtx(xdsCtx, proxy)
			if err != nil {
				return err
			}
			rs.Add(&core_xds.Resource{
				Name:     config.Name,
				Origin:   OriginWorkloadIdentity,
				Resource: config,
			})
		}
	// Spire configures everything by SDS so we cannot add here anything
	case string(meshidentity_api.SpireType):
		return nil
	}
	return nil
}

func validationCtx(xdsCtx xds_context.Context, proxy *core_xds.Proxy) (*envoy_auth.Secret, error) {
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
		Configure(bldrs_auth.Name(system_names.SystemResourceNameCABundle)).
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
