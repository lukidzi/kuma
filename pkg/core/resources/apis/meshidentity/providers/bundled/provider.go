package bundled

import (
	core_plugins "github.com/kumahq/kuma/pkg/core/plugins"
	"github.com/kumahq/kuma/pkg/core/resources/apis/meshidentity/providers"
)

const BundledProvider string = "bundled"

var _ core_plugins.IdentityProviderPlugin = &plugin{}

type plugin struct{}

func InitProvider() {
	core_plugins.Register(core_plugins.PluginName(BundledProvider), &plugin{})
}

func (p plugin) NewIdentityProvider(context core_plugins.PluginContext, config core_plugins.PluginConfig) (providers.IdentityProvider, error) {
	return NewBundledIdentityProvider(context.ResourceManager()), nil
}
