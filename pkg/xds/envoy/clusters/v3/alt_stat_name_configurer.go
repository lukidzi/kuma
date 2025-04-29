package clusters

import (
	envoy_cluster "github.com/envoyproxy/go-control-plane/envoy/config/cluster/v3"

	util_xds "github.com/kumahq/kuma/pkg/util/xds"
)

type AltStatNameConfigurer struct{
	statName string
}

var _ ClusterConfigurer = &AltStatNameConfigurer{}

func (e *AltStatNameConfigurer) Configure(cluster *envoy_cluster.Cluster) error {
	if e.statName != "" {
		cluster.AltStatName = e.statName
		return nil
	}
	sanitizedName := util_xds.SanitizeMetric(cluster.Name)
	if sanitizedName != cluster.Name {
		cluster.AltStatName = sanitizedName
	}
	return nil
}
