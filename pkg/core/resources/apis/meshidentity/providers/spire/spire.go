package bundled

import (
	"context"
	"time"

	corev3 "github.com/envoyproxy/go-control-plane/envoy/config/core/v3"
	envoy_endpoint "github.com/envoyproxy/go-control-plane/envoy/config/endpoint/v3"
	envoy_tls "github.com/envoyproxy/go-control-plane/envoy/extensions/transport_sockets/tls/v3"

	"github.com/kumahq/kuma/pkg/core/kri"
	meshidentity_api "github.com/kumahq/kuma/pkg/core/resources/apis/meshidentity/api/v1alpha1"
	"github.com/kumahq/kuma/pkg/core/resources/apis/meshidentity/providers"
	"github.com/kumahq/kuma/pkg/core/resources/model"
	"github.com/kumahq/kuma/pkg/core/xds"
	bldrs_cluster "github.com/kumahq/kuma/pkg/envoy/builders/cluster"
	bldrs_common "github.com/kumahq/kuma/pkg/envoy/builders/common"
	bldrs_core "github.com/kumahq/kuma/pkg/envoy/builders/core"
	bldrs_tls "github.com/kumahq/kuma/pkg/envoy/builders/tls"
	"github.com/kumahq/kuma/pkg/util/pointer"
	"github.com/kumahq/kuma/pkg/xds/generator/system_names"
	"github.com/spiffe/go-spiffe/v2/spiffeid"
)

const (
	OriginIdentitySpire                 = "IdentitySpire"
	SystemResourceNameSpireAgentCluster = "system_identity_sds-spire-agent"
)

var _ providers.IdentityProvider = &spireIdentityProvider{}

type spireIdentityProvider struct {
	mountPath string
}

func NewSpireIdentityProvider(mountPath string) providers.IdentityProvider {
	return &spireIdentityProvider{
		mountPath: mountPath,
	}
}

func (b *spireIdentityProvider) Validate(ctx context.Context, identity *meshidentity_api.MeshIdentityResource) error {
	return nil
}

func (b *spireIdentityProvider) Initialize(ctx context.Context, identity *meshidentity_api.MeshIdentityResource, trustDomain string) error {
	return nil
}

// All certificates configuration is handled by the Spire
func (b *spireIdentityProvider) GetRootCA(ctx context.Context, identity *meshidentity_api.MeshIdentityResource, mesh string) ([]byte, error) {
	return nil, nil
}

func (b *spireIdentityProvider) CreateIdentity(ctx context.Context, identity *meshidentity_api.MeshIdentityResource, meta model.ResourceMeta, trustDomain string) (*xds.WorkloadIdentity, error) {
	spiffeID, err := identity.Spec.GetSpiffeID(trustDomain, meta)
	if err != nil {
		return nil, err
	}
	id, err := spiffeid.FromString(spiffeID)
	if err != nil {
		return nil, err
	}
	identifier := kri.From(identity, "")
	resources, err := additionalResources(b.mountPath, pointer.DerefOr(identity.Spec.Provider.Spire.Agent.Timeout.Duration, 1*time.Second)))
	if err != nil {
		return nil, err
	}

	return &xds.WorkloadIdentity{
		KRI:                        identifier,
		Type:                       string(meshidentity_api.SpireType),
		KeyPair:                    nil,
		IdentitySourceConfigurer:   sourceConfigurer(id.String()),
		ValidationSourceConfigurer: sourceConfigurer(system_names.SystemResourceNameCABundle),
		AdditionalResources:        resources,
	}, nil
}

// we need to create a cluster for spire agent
func additionalResources(mountPath string, timeout time.Duration) ([]*xds.Resource, error) {
	resources := []*xds.Resource{}
	resource, err := bldrs_cluster.NewCluster().
		Configure(bldrs_cluster.ConnectTimeout(timeout)).
		Configure(bldrs_cluster.Endpoints(SystemResourceNameSpireAgentCluster, []*envoy_endpoint.LocalityLbEndpoints{
			{
				LbEndpoints: []*envoy_endpoint.LbEndpoint{
					&envoy_endpoint.LbEndpoint{
						HostIdentifier: &envoy_endpoint.LbEndpoint_Endpoint{
							Endpoint: &envoy_endpoint.Endpoint{
								Address: &corev3.Address{
									Address: &corev3.Address_Pipe{
										Pipe: &corev3.Pipe{
											Path: mountPath,
										},
									},
								},
							},
						},
					},
				},
			},
		})).Build()

	if err != nil {
		return nil, err
	}
	resources = append(resources, &xds.Resource{
		Name:     SystemResourceNameSpireAgentCluster,
		Origin:   OriginIdentitySpire,
		Resource: resource,
	})
	return resources, nil
}

func sourceConfigurer(secretName string) func() bldrs_common.Configurer[envoy_tls.SdsSecretConfig] {
	return func() bldrs_common.Configurer[envoy_tls.SdsSecretConfig] {
		return bldrs_tls.SdsSecretConfigSource(
			secretName,
			bldrs_core.NewConfigSource().Configure(bldrs_core.ApiConfigSource(SystemResourceNameSpireAgentCluster)),
		)
	}
}
