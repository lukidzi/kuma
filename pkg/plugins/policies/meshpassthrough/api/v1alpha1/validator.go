package v1alpha1

import (
	"fmt"
	"math"
	"regexp"
	"slices"
	"strings"

	"github.com/asaskevich/govalidator"

	common_api "github.com/kumahq/kuma/v3/api/common/v1alpha1"
	"github.com/kumahq/kuma/v3/pkg/core/resources/apis/mesh"
	"github.com/kumahq/kuma/v3/pkg/core/validators"
	"github.com/kumahq/kuma/v3/pkg/util/pointer"
)

var (
	allMatchProtocols            = []string{string(TcpProtocol), string(TlsProtocol), string(GrpcProtocol), string(HttpProtocol), string(Http2Protocol), string(MysqlProtocol)}
	layer7Protocols              = []ProtocolType{GrpcProtocol, HttpProtocol, Http2Protocol}
	wildcardPartialPrefixPattern = regexp.MustCompile(`^\*[^.]+`)
)

func (r *MeshPassthroughResource) validate() error {
	var verr validators.ValidationError
	path := validators.RootedAt("spec")
	verr.AddErrorAt(path.Field("targetRef"), r.validateTop(r.Spec.TargetRef))
	verr.AddErrorAt(path.Field("default"), validateDefault(r.Spec.Default))
	return verr.OrNil()
}

func (r *MeshPassthroughResource) validateTop(targetRef *common_api.TargetRef) validators.ValidationError {
	if targetRef == nil {
		return validators.ValidationError{}
	}
	targetRefErr := mesh.ValidateTargetRef(*targetRef, &mesh.ValidateTargetRefOpts{
		SupportedKinds: []common_api.TargetRefKind{
			common_api.Mesh,
			common_api.Dataplane,
		},
	})
	return targetRefErr
}

func validateDefault(conf Conf) validators.ValidationError {
	var verr validators.ValidationError
	type portProtocol struct {
		port     uint32
		protocol ProtocolType
	}
	matches := pointer.Deref(conf.AppendMatch)
	uniqueDomains := map[portProtocol]map[string]bool{}
	for i, match := range matches {
		if match.Protocol == MysqlProtocol && match.Port == nil {
			verr.AddViolationAt(validators.RootedAt("appendMatch").Index(i).Field("port"), "port must be defined for Mysql protocol")
		}
		if match.Port != nil && pointer.Deref[uint32](match.Port) == 0 || pointer.Deref[uint32](match.Port) > math.MaxUint16 {
			verr.AddViolationAt(validators.RootedAt("appendMatch").Index(i).Field("port"), "port must be a valid (1-65535)")
		}
		key := portProtocol{
			port:     pointer.Deref[uint32](match.Port),
			protocol: match.Protocol,
		}
		if _, found := uniqueDomains[key]; found {
			if _, found := uniqueDomains[key][match.Value]; found {
				verr.AddViolationAt(validators.RootedAt("appendMatch").Index(i).Field("value"), fmt.Sprintf("value %s is already defined for this port and protocol", match.Value))
			} else {
				uniqueDomains[key][match.Value] = true
			}
		} else {
			uniqueDomains[key] = map[string]bool{match.Value: true}
		}
		if other, found := ConflictingMatch(matches[:i], match); found {
			verr.AddViolationAt(validators.RootedAt("appendMatch").Index(i).Field("protocol"), fmt.Sprintf("protocol %s conflicts with protocol %s defined in appendMatch[%d], matches for the same destination must use the same protocol when their ports overlap, a match without a port applies to all ports", match.Protocol, matches[other].Protocol, other))
		}
		if !slices.Contains(allMatchProtocols, string(match.Protocol)) {
			verr.AddErrorAt(validators.RootedAt("appendMatch").Index(i).Field("protocol"), validators.MakeFieldMustBeOneOfErr("protocol", allMatchProtocols...))
		}
		switch match.Type {
		case "CIDR":
			isValid := govalidator.IsCIDR(match.Value)
			if !isValid {
				verr.AddViolationAt(validators.RootedAt("appendMatch").Index(i).Field("value"), "provided CIDR has incorrect value")
			}
		case "IP":
			isValid := govalidator.IsIP(match.Value)
			if !isValid {
				verr.AddViolationAt(validators.RootedAt("appendMatch").Index(i).Field("value"), "provided IP has incorrect value")
			}
		case "Domain":
			if match.Protocol == "tcp" || match.Protocol == "mysql" {
				verr.AddViolationAt(validators.RootedAt("appendMatch").Index(i).Field("protocol"), fmt.Sprintf("protocol %s is not supported for a domain", match.Protocol))
			}
			if wildcardPartialPrefixPattern.MatchString(match.Value) {
				verr.AddViolationAt(validators.RootedAt("appendMatch").Index(i).Field("value"), "provided DNS has incorrect value, partial wildcard is currently not supported")
			}
			if match.Port == nil && strings.HasPrefix(match.Value, "*") && slices.Contains(layer7Protocols, match.Protocol) {
				verr.AddViolationAt(validators.RootedAt("appendMatch").Index(i).Field("port"), "wildcard domains doesn't work for all ports and layer 7 protocol")
			}
			valueToValidate := match.Value
			if strings.HasPrefix(match.Value, "*.") {
				valueToValidate = match.Value[2:]
			}
			if !strings.HasPrefix(valueToValidate, "*") {
				isValid := govalidator.IsDNSName(valueToValidate)
				if !isValid {
					verr.AddViolationAt(validators.RootedAt("appendMatch").Index(i).Field("value"), "provided DNS has incorrect value")
				}
			}
		default:
			verr.AddViolationAt(validators.RootedAt("appendMatch").Index(i).Field("type"), fmt.Sprintf("provided type %s is not supported, one of Domain, IP, or CIDR is supported", match.Type))
		}
	}
	return verr
}

// ConflictingMatch returns the index of the first of the preceding matches that
// generates a filter chain with exactly the same matching criteria as the given
// match. Envoy rejects the whole listener when two filter chains cannot be told
// apart, so such a combination must never be sent to the data plane.
func ConflictingMatch(preceding []Match, match Match) (int, bool) {
	group, ok := protocolGroup(match.Protocol)
	if !ok {
		return 0, false
	}
	for i, other := range preceding {
		otherGroup, ok := protocolGroup(other.Protocol)
		if !ok || otherGroup != group || other.Protocol == match.Protocol {
			// filter chains of the same protocol are merged into a single one
			continue
		}
		if !portsOverlap(match.Port, other.Port) || destinationMatch(match) != destinationMatch(other) {
			continue
		}
		return i, true
	}
	return 0, false
}

// protocolGroup returns the group of protocols sharing the same filter chain
// matching criteria. Protocols outside of any group are matched on criteria
// unique to a single match, so they can never conflict.
func protocolGroup(protocol ProtocolType) (string, bool) {
	switch protocol {
	case HttpProtocol, Http2Protocol, GrpcProtocol:
		return "layer7", true
	case TcpProtocol, MysqlProtocol:
		return "rawBuffer", true
	default:
		// TLS filter chains are additionally matched on the server name
		return "", false
	}
}

// destinationMatch returns the destination a generated filter chain is matched
// on. Chains for domains are matched on the port only, the domain itself is
// matched later on by the server name or the virtual host.
func destinationMatch(match Match) string {
	switch match.Type {
	case "IP", "CIDR":
		return match.Value
	default:
		return ""
	}
}

// portsOverlap tells whether two matches can end up on the same port. A match
// without a port applies to all of them.
func portsOverlap(port *uint32, otherPort *uint32) bool {
	return port == nil || otherPort == nil || *port == *otherPort
}
