package meshidentity

import (
	"github.com/kumahq/kuma/pkg/core/plugins"
	"github.com/kumahq/kuma/pkg/core/resources/apis/meshidentity/api/v1alpha1"
	"github.com/kumahq/kuma/pkg/core/resources/apis/meshidentity/generator"
	"github.com/kumahq/kuma/pkg/core/resources/apis/meshidentity/providers/bundled"
)

func init() {
	plugins.Register(plugins.PluginName(v1alpha1.MeshIdentityResourceTypeDescriptor.KumactlArg), generator.NewPlugin())
}

var NameToModule = map[string]*plugins.PluginInitializer{
	"bundled": {InitFn: bundled.InitProvider, Initialized: false},
}
