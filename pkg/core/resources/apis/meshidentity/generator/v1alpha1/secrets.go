package v1alpha1

import (
	"bytes"

	envoy_auth "github.com/envoyproxy/go-control-plane/envoy/extensions/transport_sockets/tls/v3"

	core_plugins "github.com/kumahq/kuma/pkg/core/plugins"
	meshidentity_api "github.com/kumahq/kuma/pkg/core/resources/apis/meshidentity/api/v1alpha1"
	core_xds "github.com/kumahq/kuma/pkg/core/xds"
	bldrs_auth "github.com/kumahq/kuma/pkg/envoy/builders/auth"
	bldrs_core "github.com/kumahq/kuma/pkg/envoy/builders/core"
	"github.com/kumahq/kuma/pkg/util/pointer"
	xds_context "github.com/kumahq/kuma/pkg/xds/context"
)

const OriginWorkloadIdentity = "identity"

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
	return nil
}

func identitySecret(proxy *core_xds.Proxy) (*envoy_auth.Secret, error) {
	identitySecret, err := bldrs_auth.NewSecret().
		Configure(bldrs_auth.Name(pointer.DerefOr(proxy.WorkloadIdentity.IdentitySecretName, proxy.WorkloadIdentity.KRI.String()))).
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
