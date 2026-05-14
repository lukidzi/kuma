// Package sni owns the KRI-based SNI format defined in MADR-101 and the
// compliance helpers used by resource validators (MeshService,
// MeshExternalService, MeshMultiZoneService).
//
// It intentionally has no dependency on pkg/xds/envoy/tls so that resource
// API packages can import it without creating an import cycle through
// pkg/xds/envoy/tags.
package sni

import (
	"strings"

	"github.com/pkg/errors"

	"github.com/kumahq/kuma/v2/pkg/core/kri"
	"github.com/kumahq/kuma/v2/pkg/core/resources/registry"
)

const (
	dnsLabelLimit    = 63
	dnsHostnameLimit = 253
	sniFormatPrefix  = "sni"
)

// sniCapableShortNames lists resource type ShortNames whose KRI is rendered
// as an SNI by xDS generators.
var sniCapableShortNames = map[string]struct{}{
	"msvc":   {}, // MeshService
	"extsvc": {}, // MeshExternalService
	"mzsvc":  {}, // MeshMultiZoneService
}

// FromKRI builds an SNI in the KRI-derived format described in MADR-101.
//
// The format is:
//
//	sni.<short>.<mesh>.<name>.<sectionName>                          (5 segments) — global-originated
//	sni.<short>.<mesh>.<zone>.<name>.<sectionName>                   (6 segments) — zone-originated resource on universal
//	sni.<short>.<mesh>.<zone>.<namespace>.<name>.<sectionName>       (7 segments) — zone-originated resource on k8s
func FromKRI(id kri.Identifier) string {
	return strings.Join(buildSegments(id), ".")
}

// ValidateKRI returns nil if the SNI that FromKRI would produce satisfies
// the MADR-101 naming rules:
//
//   - Mesh, Name and SectionName are non-empty
//   - if Namespace is non-empty, Zone must also be non-empty
//   - no segment contains "."
//   - each segment length ≤ 63 (DNS label limit)
//   - total length ≤ 253 (DNS hostname limit)
func ValidateKRI(id kri.Identifier) error {
	if id.Mesh == "" || id.Name == "" || id.SectionName == "" {
		return errors.Errorf("SNI: mesh, name and sectionName must be non-empty: %+v", id)
	}
	if id.Namespace != "" && id.Zone == "" {
		return errors.Errorf("SNI: namespace %q set without zone: %+v", id.Namespace, id)
	}
	segments := buildSegments(id)
	total := len(segments) - 1 // dots between segments
	for _, s := range segments {
		if strings.ContainsRune(s, '.') {
			return errors.Errorf("SNI: segment %q contains '.': %+v", s, id)
		}
		if len(s) > dnsLabelLimit {
			return errors.Errorf("SNI: segment %q exceeds DNS label limit (%d > %d): %+v", s, len(s), dnsLabelLimit, id)
		}
		total += len(s)
	}
	if total > dnsHostnameLimit {
		return errors.Errorf("SNI: total length %d exceeds DNS hostname limit %d: %+v", total, dnsHostnameLimit, id)
	}
	return nil
}

func buildSegments(id kri.Identifier) []string {
	desc, err := registry.Global().DescriptorFor(id.ResourceType)
	if err != nil {
		panic("unknown resource type " + string(id.ResourceType))
	}
	if _, ok := sniCapableShortNames[desc.ShortName]; !ok {
		panic("resource type not supported for SNI: " + string(id.ResourceType))
	}

	segments := []string{sniFormatPrefix, desc.ShortName, id.Mesh}
	if id.Zone != "" {
		segments = append(segments, id.Zone)
	}
	if id.Namespace != "" {
		segments = append(segments, id.Namespace)
	}
	segments = append(segments, id.Name, id.SectionName)
	return segments
}
