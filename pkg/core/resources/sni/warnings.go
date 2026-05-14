package sni

import (
	"fmt"
	"strings"

	"github.com/kumahq/kuma/v2/pkg/core/kri"
	"github.com/kumahq/kuma/v2/pkg/core/resources/registry"
)

// Warnings returns user-facing warnings if the SNI that would be derived from
// id does not satisfy the MADR-101 naming rules (no '.' in any segment, each
// segment ≤63 chars, total ≤253 chars). It returns nil when the resource is
// SNI-compliant or its type does not produce an SNI.
//
// Use this for soft, non-blocking warnings on Create/Update; production xDS
// code paths should also use ValidateKRI to silently skip invalid resources
// from config generation.
func Warnings(id kri.Identifier) []string {
	desc, err := registry.Global().DescriptorFor(id.ResourceType)
	if err != nil {
		return nil
	}
	if _, ok := sniCapableShortNames[desc.ShortName]; !ok {
		return nil
	}
	if id.Mesh == "" || id.Name == "" || id.SectionName == "" {
		return nil
	}

	type field struct {
		name, value string
	}
	fields := []field{
		{"mesh", id.Mesh},
		{"name", id.Name},
		{"port", id.SectionName},
	}
	if id.Zone != "" {
		fields = append(fields, field{"zone", id.Zone})
	}
	if id.Namespace != "" {
		fields = append(fields, field{"namespace", id.Namespace})
	}

	var warnings []string
	for _, f := range fields {
		if strings.ContainsRune(f.value, '.') {
			warnings = append(warnings, fmt.Sprintf(
				"%s %q contains '.', SNI computed for this resource is invalid and traffic may fail",
				f.name, f.value))
		}
		if len(f.value) > dnsLabelLimit {
			warnings = append(warnings, fmt.Sprintf(
				"%s %q is %d characters which exceeds DNS label limit (%d), SNI computed for this resource is invalid and traffic may fail",
				f.name, f.value, len(f.value), dnsLabelLimit))
		}
	}

	sni := FromKRI(id)
	if len(sni) > dnsHostnameLimit {
		warnings = append(warnings, fmt.Sprintf(
			"SNI computed for port %q is %d characters which exceeds DNS hostname limit (%d), traffic may fail",
			id.SectionName, len(sni), dnsHostnameLimit))
	}
	return warnings
}
