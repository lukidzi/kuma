package v1alpha1

import (
	"slices"
	"strings"

	core_mesh "github.com/kumahq/kuma/pkg/core/resources/apis/mesh"
	api "github.com/kumahq/kuma/pkg/plugins/policies/meshhttproute/api/v1alpha1"
	plugin_gateway "github.com/kumahq/kuma/pkg/plugins/runtime/gateway"
	"github.com/kumahq/kuma/pkg/plugins/runtime/gateway/route"
	"github.com/kumahq/kuma/pkg/xds/envoy/tags"
)

func GenerateEnvoyRouteEntries(host plugin_gateway.GatewayHost, toRules []ToRouteRule) []route.Entry {
	var entries []route.Entry

	// Index the routes by their path. There are typically multiple
	// routes per path with additional matching criteria.
	exactEntries := map[string][]route.Entry{}
	prefixEntries := map[string][]route.Entry{}

	for _, rule := range toRules[0].Rules {
		var names []string
		for _, orig := range toRules[0].Origin {
			names = append(names, orig.GetName())
		}
		slices.Sort(names)
		entry := makeHttpRouteEntry(strings.Join(names, "_"), rule)

		// The rule matches if any of the matches is successful (it has OR
		// semantics). That means that we have to duplicate the route table
		// entry for each repeated match so that the rule can match any of
		// the criteria.
		for _, m := range rule.Matches {
			routeEntry := entry // Shallow copy.
			routeEntry.Match = makeRouteMatch(m)

			switch {
			case routeEntry.Match.ExactPath != "":
				exactEntries[routeEntry.Match.ExactPath] = append(exactEntries[routeEntry.Match.ExactPath], routeEntry)
			case routeEntry.Match.PrefixPath != "":
				prefixEntries[routeEntry.Match.PrefixPath] = append(prefixEntries[routeEntry.Match.PrefixPath], routeEntry)
			default:
				entries = append(entries, routeEntry)
			}
		}
	}

	return plugin_gateway.HandlePrefixMatchesAndPopulatePolicies(host, exactEntries, prefixEntries, entries)
}

func makeHttpRouteEntry(name string, rule api.Rule) route.Entry {
	entry := route.Entry{
		Route: name,
	}

	for _, b := range *rule.Default.BackendRefs {
		dest, ok := tags.FromTargetRef(b.TargetRef)
		if !ok {
			// This should be caught by validation
			continue
		}
		target := route.Destination{
			Destination:   dest,
			Weight:        uint32(*b.Weight),
			Policies:      nil,
			RouteProtocol: core_mesh.ProtocolHTTP,
		}

		entry.Action.Forward = append(entry.Action.Forward, target)
	}

	return entry
}

func makeRouteMatch(ruleMatch api.Match) route.Match {
	match := route.Match{}

	if p := ruleMatch.Path; p != nil {
		switch p.Type {
		case api.Exact:
			match.ExactPath = p.Value
		case api.PathPrefix:
			match.PrefixPath = p.Value
		case api.RegularExpression:
			match.RegexPath = p.Value
		}
	} else {
		// Envoy routes require a path match, so if the route
		// didn't specify, we match any path so that the additional
		// match criteria will be applied.
		match.PrefixPath = "/"
	}

	return match
}
