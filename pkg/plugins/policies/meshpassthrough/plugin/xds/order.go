package xds

import (
	"fmt"
	"maps"
	"slices"
	"sort"
	"strings"

	"github.com/asaskevich/govalidator"

	core_meta "github.com/kumahq/kuma/v3/pkg/core/metadata"
	api "github.com/kumahq/kuma/v3/pkg/plugins/policies/meshpassthrough/api/v1alpha1"
	"github.com/kumahq/kuma/v3/pkg/util/pointer"
)

type MatchType int

const (
	WildcardDomain MatchType = iota + 1
	Domain
	CIDR
	CIDRV6
	IP
	IPV6
)

// l7Protocols produce identical Envoy filter chain matchers, so only one of them
// can be configured on a given port. More than one makes Envoy reject the listener.
var l7Protocols = []core_meta.Protocol{core_meta.ProtocolHTTP, core_meta.ProtocolHTTP2, core_meta.ProtocolGRPC}

var protocolOrder = map[core_meta.Protocol]int{
	core_meta.ProtocolTLS:   0,
	core_meta.ProtocolTCP:   1,
	core_meta.ProtocolHTTP:  2,
	core_meta.ProtocolHTTP2: 3,
	core_meta.ProtocolGRPC:  4,
}

type Route struct {
	Value     string
	MatchType MatchType
}

type Matcher struct {
	Protocol  core_meta.Protocol
	Port      uint32
	MatchType MatchType
	Value     string
}

type FilterChainMatch struct {
	Protocol  core_meta.Protocol
	Port      uint32
	MatchType MatchType
	Value     string
	Routes    []Route
}

// GetOrderedMatchers builds filter chain matchers for the given configuration. Matches
// that would result in a listener rejected by Envoy are dropped and returned as warnings,
// so a single incorrect match doesn't invalidate the whole passthrough listener.
func GetOrderedMatchers(conf api.Conf) ([]FilterChainMatch, []string) {
	builder := newChainBuilder()
	for _, match := range pointer.Deref(conf.AppendMatch) {
		builder.addMatch(match)
	}
	builder.expandPortlessMatchers()
	return builder.orderedMatches(), builder.warnings.sorted()
}

// chainBuilder turns matches into filter chains. The first match claims the chain it
// resolves to, a later match either merges into it (an L7 domain becoming another route)
// or is dropped with a warning when it would duplicate the chain's Envoy matcher.
type chainBuilder struct {
	warnings *warnings
	owners   map[chainKey]Matcher
	ports    map[uint32]bool
	chains   map[Matcher]map[Route]bool
}

func newChainBuilder() *chainBuilder {
	return &chainBuilder{
		warnings: newWarnings(),
		owners:   map[chainKey]Matcher{},
		ports:    map[uint32]bool{},
		chains:   map[Matcher]map[Route]bool{},
	}
}

func (b *chainBuilder) addMatch(match api.Match) {
	protocol := core_meta.ParseProtocol(string(match.Protocol))
	matchType, isWildcardDomain := getMatchType(match, protocol)
	matcher := Matcher{
		Protocol:  protocol,
		Port:      pointer.DerefOr[uint32](match.Port, 0),
		MatchType: matchType,
	}
	// L7 domains share one filter chain per port and become virtual host routes
	isL7Domain := slices.Contains(l7Protocols, protocol) && matchType == Domain
	if !isL7Domain {
		matcher.Value = match.Value
	}
	if !b.claim(matcher, match.Value) {
		return
	}
	b.ports[matcher.Port] = true
	routes := map[Route]bool{}
	if isL7Domain {
		routeMatchType := Domain
		if isWildcardDomain {
			routeMatchType = WildcardDomain
		}
		routes[Route{Value: match.Value, MatchType: routeMatchType}] = true
	}
	mergeChain(b.chains, matcher, routes)
}

// claim registers the matcher as the owner of the filter chain it resolves to. A chain
// claimed by another matcher accepts no further ones, whatever this matcher adds has to
// go through the owner.
func (b *chainBuilder) claim(matcher Matcher, value string) bool {
	key := newChainKey(matcher)
	owner, found := b.owners[key]
	if !found {
		b.owners[key] = matcher
		return true
	}
	if owner == matcher {
		return true
	}
	if owner.Protocol != matcher.Protocol {
		b.warnings.add(fmt.Sprintf(
			"ignoring match %q with protocol %s, protocol %s is already configured for %s on %s, %s",
			value, matcher.Protocol, owner.Protocol, key.describe(), describePort(matcher.Port), key.conflictReason(),
		))
	} else {
		b.warnings.add(fmt.Sprintf(
			"ignoring match %q with protocol %s, match %q already defines a filter chain for %s on %s",
			value, matcher.Protocol, owner.Value, key.describe(), describePort(matcher.Port),
		))
	}
	return false
}

// Envoy first checks the port when performing matching. If there is a matcher for a specific port
// and one rule to match all ports alongside another for a specific port,
// it might select the matcher for the specific port but fail to find a corresponding filter chain.
// To avoid this issue, we also generate specific port matchers for rules intended to match all ports.
func (b *chainBuilder) expandPortlessMatchers() {
	expanded := map[Matcher]map[Route]bool{}
	for matcher, routes := range b.chains {
		mergeChain(expanded, matcher, routes)
		if matcher.Port != 0 {
			continue
		}
		for port := range b.ports {
			if port == 0 {
				continue
			}
			portMatcher := matcher
			portMatcher.Port = port
			if b.expandable(portMatcher) {
				mergeChain(expanded, portMatcher, routes)
			}
		}
	}
	b.chains = expanded
}

// expandable reports whether a match without a port can be copied onto this port without
// duplicating the filter chain already claimed there
func (b *chainBuilder) expandable(matcher Matcher) bool {
	key := newChainKey(matcher)
	owner, found := b.owners[key]
	if !found || owner == matcher {
		return true
	}
	if owner.Protocol != matcher.Protocol {
		b.warnings.add(fmt.Sprintf(
			"matches with protocol %s and no port are not applied to %s on port %d, protocol %s is already configured there",
			matcher.Protocol, key.describe(), matcher.Port, owner.Protocol,
		))
	} else {
		b.warnings.add(fmt.Sprintf(
			"matches with protocol %s and no port are not applied to %s on port %d, match %q already defines a filter chain there",
			matcher.Protocol, key.describe(), matcher.Port, owner.Value,
		))
	}
	return false
}

func (b *chainBuilder) orderedMatches() []FilterChainMatch {
	matches := []FilterChainMatch{}
	for matcher, routes := range b.chains {
		matches = append(matches, FilterChainMatch{
			Protocol:  matcher.Protocol,
			Port:      matcher.Port,
			MatchType: matcher.MatchType,
			Value:     matcher.Value,
			Routes:    getOrderedRoutes(routes),
		})
	}
	orderMatchers(matches)
	return matches
}

func mergeChain(chains map[Matcher]map[Route]bool, matcher Matcher, routes map[Route]bool) {
	if existing, found := chains[matcher]; found {
		maps.Copy(existing, routes)
	} else {
		chains[matcher] = maps.Clone(routes)
	}
}

// warnings deduplicates messages, map iteration surfaces the same conflict multiple
// times and in random order
type warnings struct {
	messages map[string]struct{}
}

func newWarnings() *warnings {
	return &warnings{messages: map[string]struct{}{}}
}

func (w *warnings) add(message string) {
	w.messages[message] = struct{}{}
}

func (w *warnings) sorted() []string {
	messages := slices.Collect(maps.Keys(w.messages))
	sort.Strings(messages)
	return messages
}

func getMatchType(match api.Match, protocol core_meta.Protocol) (MatchType, bool) {
	var matchType MatchType
	isWildcardDomain := false
	switch match.Type {
	case api.MatchType("Domain"):
		matchType = Domain
		if strings.HasPrefix(match.Value, "*") {
			// L7 wildcard domains stay in the shared chain and aggregate as routes
			if slices.Contains(l7Protocols, protocol) {
				isWildcardDomain = true
			} else {
				matchType = WildcardDomain
			}
		}
	case api.MatchType("IP"):
		if govalidator.IsIPv6(match.Value) {
			matchType = IPV6
		} else {
			matchType = IP
		}
	case api.MatchType("CIDR"):
		split := strings.Split(match.Value, "/")
		if govalidator.IsIPv6(split[0]) {
			matchType = CIDRV6
		} else {
			matchType = CIDR
		}
	}
	return matchType, isWildcardDomain
}

func getOrderedRoutes(routesMap map[Route]bool) []Route {
	routes := []Route{}
	for route := range routesMap {
		routes = append(routes, route)
	}
	sort.SliceStable(routes, func(i, j int) bool {
		if routes[i].MatchType != routes[j].MatchType {
			return routes[i].MatchType > routes[j].MatchType
		}
		if routes[i].MatchType == Domain || routes[i].MatchType == WildcardDomain {
			return sortDomains(routes[i].Value, routes[j].Value)
		}
		return false
	})
	return routes
}

func orderMatchers(matchers []FilterChainMatch) {
	sort.SliceStable(matchers, func(i, j int) bool {
		if protocolOrder[matchers[i].Protocol] != protocolOrder[matchers[j].Protocol] {
			return protocolOrder[matchers[i].Protocol] < protocolOrder[matchers[j].Protocol]
		}
		if matchers[i].MatchType != matchers[j].MatchType {
			return matchers[i].MatchType > matchers[j].MatchType
		}
		if matchers[i].Port != matchers[j].Port {
			return matchers[i].Port > matchers[j].Port
		}
		switch matchers[i].MatchType {
		case Domain, WildcardDomain:
			return sortDomains(matchers[i].Value, matchers[j].Value)
		case CIDR, CIDRV6:
			ipI, prefixI := getIpAndMask(matchers[i].Value)
			ipJ, prefixJ := getIpAndMask(matchers[j].Value)
			if prefixI == prefixJ {
				return ipI > ipJ
			}
			return prefixI > prefixJ
		case IP, IPV6:
			return matchers[i].Value > matchers[j].Value
		default:
			return len(matchers[i].Routes) > len(matchers[j].Routes)
		}
	})
}

func sortDomains(i string, j string) bool {
	splitI := strings.Split(i, ".")
	splitJ := strings.Split(j, ".")

	if len(splitI) != len(splitJ) {
		return len(splitI) > len(splitJ)
	}
	return i < j
}
