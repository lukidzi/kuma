package tls

import (
	"fmt"
	"hash/fnv"
	"strings"

	"github.com/pkg/errors"

	mesh_proto "github.com/kumahq/kuma/v2/api/mesh/v1alpha1"
	"github.com/kumahq/kuma/v2/pkg/core/resources/model"
	"github.com/kumahq/kuma/v2/pkg/util/maps"
	envoy_tags "github.com/kumahq/kuma/v2/pkg/xds/envoy/tags"
)

func SNIFromTags(tags envoy_tags.Tags) string {
	extraTags := tags.WithoutTags(mesh_proto.ServiceTag).String()
	service := tags[mesh_proto.ServiceTag]
	if extraTags == "" {
		return service
	}
	return fmt.Sprintf("%s{%s}", service, extraTags)
}

func TagsFromSNI(sni string) (envoy_tags.Tags, error) {
	parts := strings.Split(sni, "{")
	if len(parts) > 2 {
		return nil, errors.New(fmt.Sprintf("cannot parse tags from sni: %s", sni))
	}
	if len(parts) == 1 {
		return envoy_tags.Tags{mesh_proto.ServiceTag: parts[0]}, nil
	}
	cleanedTags := strings.ReplaceAll(parts[1], "}", "")
	tags, err := envoy_tags.TagsFromString(cleanedTags)
	if err != nil {
		return nil, err
	}
	tags[mesh_proto.ServiceTag] = parts[0]
	return tags, nil
}

const (
	sniFormatVersion = "a"
	dnsLabelLimit    = 63
)

// Resource type names for SNI-supported types. Kept as string literals so
// this package does not depend on the resource API packages.
const (
	meshServiceTypeName          model.ResourceType = "MeshService"
	meshExternalServiceTypeName  model.ResourceType = "MeshExternalService"
	meshMultiZoneServiceTypeName model.ResourceType = "MeshMultiZoneService"
)

func SNIForResource(resName string, meshName string, resType model.ResourceType, port int32, additionalData map[string]string) string {
	var mapStrings []string
	for _, key := range maps.SortedKeys(additionalData) {
		mapStrings = append(mapStrings, fmt.Sprintf("%s=%s", key, additionalData[key]))
	}

	hash := fnv.New64a()
	_, _ = fmt.Fprintf(hash, "%s;%s;%v", resName, meshName, strings.Join(mapStrings, ",")) // fnv64a does not return error
	hashBytes := hash.Sum(nil)

	if len(resName) > dnsLabelLimit-1 {
		resName = resName[:dnsLabelLimit-1] + "x"
	}
	if len(meshName) > dnsLabelLimit-1 {
		meshName = meshName[:dnsLabelLimit-1] + "x"
	}

	resTypeAbbrv := ""
	switch resType {
	case meshServiceTypeName:
		resTypeAbbrv = "ms"
	case meshExternalServiceTypeName:
		resTypeAbbrv = "mes"
	case meshMultiZoneServiceTypeName:
		resTypeAbbrv = "mzms"
	default:
		panic("resource type not supported for SNI")
	}

	return fmt.Sprintf("%s%x.%s.%d.%s.%s", sniFormatVersion, hashBytes, resName, port, meshName, resTypeAbbrv)
}
