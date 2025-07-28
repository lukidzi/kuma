package providers

import (
	"context"
	"fmt"

	"github.com/kumahq/kuma/pkg/core"
	core_mesh "github.com/kumahq/kuma/pkg/core/resources/apis/mesh"
	meshidentity_api "github.com/kumahq/kuma/pkg/core/resources/apis/meshidentity/api/v1alpha1"
)


type IdentityProviderManager struct {
	providers IdentityProviders
	zone      string
}

func NewIdentityProviderManager(providers IdentityProviders, zone string) IdentityProviderManager {
	return IdentityProviderManager{
		providers: providers,
		zone:      zone,
	}
}

func (i *IdentityProviderManager) SelectedIdentity(dataplane *core_mesh.DataplaneResource, identities []*meshidentity_api.MeshIdentityResource) *meshidentity_api.MeshIdentityResource {
	identity, found := meshidentity_api.Matched(dataplane.Meta.GetLabels(), identities)
	if !found {
		return nil
	}
	return identity
}

func (i *IdentityProviderManager) GetWorkloadIdentity(ctx context.Context, dataplane *core_mesh.DataplaneResource, identity *meshidentity_api.MeshIdentityResource) (*WorkloadIdentity, error) {
	if identity == nil {
		return nil, nil
	}
	core.Log.Info("identity.Status.TrustDomain", "identity.Status.TrustDomain", identity)
	if identity.Status.TrustDomain == "" {
		// log to wait for trustDomain to be set
		return nil, nil
	}

	provider, found := i.providers[string(identity.Spec.Provider.Type)]
	if !found {
		return nil, fmt.Errorf("identity provider %s not found", identity.Spec.Provider.Type)
	}

	pair, err := provider.GetCAKeyPair(ctx, identity.Spec.Provider, dataplane.Meta.GetMesh())
	if err != nil {
		return nil, err
	}
	// core.Log.Info("spiffeID", "spiffeID", spiffeID)
	workloadIdentity, err := provider.CreateIdentity(pair, identity, dataplane.Meta)
	if err != nil {
		return nil, err
	}
	return workloadIdentity, nil
}
