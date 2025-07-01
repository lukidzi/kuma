package generator

import (
	"context"

	core_xds "github.com/kumahq/kuma/pkg/core/xds"
	xds_context "github.com/kumahq/kuma/pkg/xds/context"
	generator_core "github.com/kumahq/kuma/pkg/xds/generator/core"
)

type Generator struct{}

var _ generator_core.ResourceGenerator = Generator{}

func (g Generator) Generate(
	ctx context.Context,
	_ *core_xds.ResourceSet,
	xdsCtx xds_context.Context,
	proxy *core_xds.Proxy,
) (*core_xds.ResourceSet, error) {
	resources := core_xds.NewResourceSet()
	// Matching
	// Sort identities;
    //    1. Has the most labels
	//    2. Has the name alphabetic
	//    3. Has the creation time
	// 1. Check which Identities matches this specific dataplane
	// first match should be the chosen one

	// take the identity and call.CreateIdentity
	// set secrettracker
	// 

	// registers providers in one place
	// take DPP labels and do matches
	// selector.Matches()
	// sel := v1alpha1.MeshIdentity{}
	// selector, err := metav1.LabelSelectorAsSelector(sel.Selector.Dataplane)
	// if err != nil {
	// 	return nil, err
	// }
	// generate certs
	// set names of secrets generated in generator but based on values set by provider in
	// in proxy.SecretsTracker
	// set provider to proxy since we need to configure cluster and listener context, or type so we can call the code that configure TLS context
	// based on values from secrettracker
	//
	//
	// set also provider to have a function to call
	// set also CAs to meshtrust bundle in secrettracker but in component of meshtrust
	return resources, nil
}
