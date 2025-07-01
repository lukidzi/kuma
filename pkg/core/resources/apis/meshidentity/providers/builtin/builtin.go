package builtin

import (
	"github.com/kumahq/kuma/pkg/core/resources/apis/meshidentity/providers"
	"github.com/kumahq/kuma/pkg/core/resources/manager"
)

type builtinProvider struct {
	secretManager manager.ResourceManager
}

func NewBuiltinProvider(secretManager manager.ResourceManager) providers.Provider {
	return &builtinProvider{
		secretManager: secretManager,
	}
}

var _ providers.Provider = &builtinProvider{}

func (b *builtinProvider) GetUpstreamTLSContext(identity string, destIdentities []string) {

}

func (b *builtinProvider) GetDownstreamTLSContext(trustDomains []string) {

}
func (b *builtinProvider) CreateIdentity() {

}

// 1. controller which detect creation of MeshIdentity create CA
// 2. Provider needs to create identity and set resource set,
