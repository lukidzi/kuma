package v1alpha1

import (
	"sort"

	"github.com/kumahq/kuma/pkg/util/pointer"
)

func Matched(
	labels map[string]string,
	meshIdentities []*MeshIdentityResource,
) (*MeshIdentity, bool) {
	type scoredMatch struct {
		matchCount int
		name       string
		policy     *MeshIdentity
	}

	var matches []scoredMatch

	for _, mi := range meshIdentities {
		if mi.Spec.Selector == nil || mi.Spec.Selector.Dataplane == nil || !mi.Spec.Selector.Dataplane.Matches(labels) {
			continue
		}

		matchCount := len(pointer.Deref(mi.Spec.Selector.Dataplane.MatchLabels))
		matches = append(matches, scoredMatch{
			matchCount: matchCount,
			name:       mi.GetMeta().GetName(),
			policy:     mi.Spec,
		})
	}

	if len(matches) == 0 {
		return nil, false
	}

	sort.Slice(matches, func(i, j int) bool {
		if matches[i].matchCount != matches[j].matchCount {
			return matches[i].matchCount > matches[j].matchCount
		}
		return matches[i].name < matches[j].name
	})

	return matches[0].policy, true
}
