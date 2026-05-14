package v1alpha1

import (
	"github.com/kumahq/kuma/v2/pkg/core/kri"
	"github.com/kumahq/kuma/v2/pkg/core/resources/sni"
)

func (t *MeshServiceResource) Warnings() []string {
	base := kri.From(t)
	seen := map[string]struct{}{}
	var warnings []string
	for _, port := range t.Spec.Ports {
		id := kri.WithSectionName(base, port.GetName())
		for _, w := range sni.Warnings(id) {
			if _, ok := seen[w]; ok {
				continue
			}
			seen[w] = struct{}{}
			warnings = append(warnings, w)
		}
	}
	return warnings
}
