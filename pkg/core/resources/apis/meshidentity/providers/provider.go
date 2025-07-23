package providers

import (
	"fmt"

	core_mesh "github.com/kumahq/kuma/pkg/core/resources/apis/mesh"
	"github.com/kumahq/kuma/pkg/core/resources/apis/meshidentity/api/v1alpha1"
)

// func init() {
// 	plugins.Register(plugins.PluginName(v1alpha1.BundledType), )
// }

type IdentityProviderManager struct {
	providers map[v1alpha1.ProviderType]IdentityProvider
}

func NewIdentityProviderManager(providers map[v1alpha1.ProviderType]IdentityProvider) IdentityProviderManager {
	return IdentityProviderManager{
		providers: providers,
	}
}

func (i *IdentityProviderManager) GetWorkloadIdentity(dataplane *core_mesh.DataplaneResource, identities []*v1alpha1.MeshIdentityResource) (*Identity, error) {
	identity, found := v1alpha1.Matched(dataplane.Meta.GetLabels(), identities)
	if !found {
		return nil, nil
	}

	provider, found := i.providers[identity.Provider.Type]
	if !found {
		return nil, fmt.Errorf("identity provider %s not found", identity.Provider.Type)
	}

	return provider.GenerateIdentity(dataplane, identity)
}
