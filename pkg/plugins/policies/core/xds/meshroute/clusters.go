package meshroute

import (
	"sort"

	envoy_tls "github.com/envoyproxy/go-control-plane/envoy/extensions/transport_sockets/tls/v3"
	"github.com/pkg/errors"

	common_api "github.com/kumahq/kuma/v2/api/common/v1alpha1"
	mesh_proto "github.com/kumahq/kuma/v2/api/mesh/v1alpha1"
	"github.com/kumahq/kuma/v2/pkg/core/kri"
	core_meta "github.com/kumahq/kuma/v2/pkg/core/metadata"
	unified_naming "github.com/kumahq/kuma/v2/pkg/core/naming/unified-naming"
	core_resources "github.com/kumahq/kuma/v2/pkg/core/resources/apis/core"
	meshmultizoneservice_api "github.com/kumahq/kuma/v2/pkg/core/resources/apis/meshmultizoneservice/api/v1alpha1"
	meshservice_api "github.com/kumahq/kuma/v2/pkg/core/resources/apis/meshservice/api/v1alpha1"
	core_model "github.com/kumahq/kuma/v2/pkg/core/resources/model"
	core_xds "github.com/kumahq/kuma/v2/pkg/core/xds"
	bldrs_common "github.com/kumahq/kuma/v2/pkg/envoy/builders/common"
	bldrs_core "github.com/kumahq/kuma/v2/pkg/envoy/builders/core"
	bldrs_matcher "github.com/kumahq/kuma/v2/pkg/envoy/builders/matcher"
	bldrs_tls "github.com/kumahq/kuma/v2/pkg/envoy/builders/tls"
	"github.com/kumahq/kuma/v2/pkg/plugins/policies/core/rules/resolve"
	util_maps "github.com/kumahq/kuma/v2/pkg/util/maps"
	"github.com/kumahq/kuma/v2/pkg/util/pointer"
	xds_context "github.com/kumahq/kuma/v2/pkg/xds/context"
	envoy_common "github.com/kumahq/kuma/v2/pkg/xds/envoy"
	envoy_clusters "github.com/kumahq/kuma/v2/pkg/xds/envoy/clusters"
	envoy_tags "github.com/kumahq/kuma/v2/pkg/xds/envoy/tags"
	"github.com/kumahq/kuma/v2/pkg/xds/envoy/tls"
	"github.com/kumahq/kuma/v2/pkg/xds/generator/metadata"
	"github.com/kumahq/kuma/v2/pkg/xds/generator/system_names"
)

func GenerateClusters(
	proxy *core_xds.Proxy,
	meshCtx xds_context.MeshContext,
	services envoy_common.Services,
	systemNamespace string,
) (*core_xds.ResourceSet, error) {
	resources := core_xds.NewResourceSet()

	unifiedNaming := unified_naming.Enabled(proxy.Metadata, meshCtx.Resource)

	for _, serviceName := range services.Sorted() {
		service := services[serviceName]
		protocol := meshCtx.GetServiceProtocol(serviceName)
		tlsReady := service.TLSReady()

		for _, cluster := range service.Clusters() {
			clusterName := cluster.Name()
			builder := envoy_clusters.NewClusterBuilder(proxy.APIVersion, clusterName)
			clusterTags := []envoy_tags.Tags{cluster.Tags()}

			var configured bool
			var err error

			if meshCtx.IsExternalService(serviceName) {
				configured, err = buildExternalServiceCluster(builder, proxy, meshCtx, service, serviceName, clusterTags, tlsReady, protocol, unifiedNaming, systemNamespace)
			} else {
				protocol, configured, err = buildInternalServiceCluster(builder, proxy, meshCtx, service, cluster, serviceName, clusterTags, tlsReady, protocol, unifiedNaming, systemNamespace)
			}
			if err != nil {
				return nil, err
			}
			if !configured {
				continue
			}

			edsCluster, err := builder.Build()
			if err != nil {
				return nil, errors.Wrapf(err, "build CDS for cluster %s failed", clusterName)
			}

			resources = resources.Add(&core_xds.Resource{
				Name:           clusterName,
				Origin:         metadata.OriginOutbound,
				Resource:       edsCluster,
				ResourceOrigin: service.BackendRef().Resource(),
				Protocol:       protocol,
			})
		}
	}

	return resources, nil
}

// buildExternalServiceCluster configures a cluster for an external service.
// Returns false when the cluster should be skipped (e.g. missing egress or failed SNI validation).
func buildExternalServiceCluster(
	builder *envoy_clusters.ClusterBuilder,
	proxy *core_xds.Proxy,
	meshCtx xds_context.MeshContext,
	service *envoy_common.Service,
	serviceName string,
	clusterTags []envoy_tags.Tags,
	tlsReady bool,
	protocol core_meta.Protocol,
	unifiedNaming bool,
	systemNamespace string,
) (bool, error) {
	switch {
	case isMeshExternalService(meshCtx.EndpointMap[serviceName]):
		configured, err := configureMeshExternalServiceCluster(builder, proxy, meshCtx, service, unifiedNaming, systemNamespace)
		if !configured || err != nil {
			return configured, err
		}
	case meshCtx.Resource.ZoneEgressEnabled():
		// path for old ExternalService
		builder.
			Configure(envoy_clusters.EdsCluster()).
			Configure(envoy_clusters.ClientSideMTLS(
				proxy.SecretsTracker,
				unifiedNaming,
				meshCtx.Resource,
				mesh_proto.ZoneEgressServiceName,
				tlsReady,
				clusterTags,
				false,
			))
	default:
		// path for old ExternalService
		endpoints := meshCtx.ExternalServicesEndpointMap[serviceName]
		isIPv6 := proxy.Dataplane.IsIPv6()
		builder.
			Configure(envoy_clusters.ProvidedCustomEndpointCluster(isIPv6, isMeshExternalService(endpoints), endpoints...)).
			Configure(envoy_clusters.ClientSideTLS(endpoints))
	}

	switch protocol {
	case core_meta.ProtocolHTTP:
		builder.Configure(envoy_clusters.Http())
	case core_meta.ProtocolHTTP2, core_meta.ProtocolGRPC:
		builder.Configure(envoy_clusters.Http2())
	default:
	}
	return true, nil
}

// configureMeshExternalServiceCluster configures TLS for a MeshExternalService cluster.
// Returns false when the cluster should be skipped (no egresses, failed SNI validation, or missing destination).
func configureMeshExternalServiceCluster(
	builder *envoy_clusters.ClusterBuilder,
	proxy *core_xds.Proxy,
	meshCtx xds_context.MeshContext,
	service *envoy_common.Service,
	unifiedNaming bool,
	systemNamespace string,
) (bool, error) {
	realResourceRef := service.BackendRef().RealResourceBackendRef()
	dest, port, ok := DestinationPortFromRef(meshCtx, realResourceRef)
	if !ok {
		return false, nil
	}

	if proxy.WorkloadIdentity != nil {
		kriID := service.BackendRef().Resource()
		if err := tls.ValidateSNIForKRI(kriID); err != nil {
			return false, nil
		}
		sni := tls.SNIFromKRI(kriID)
		// we only want to route when there are mesh-scoped zone egresses
		if len(meshCtx.ZoneEgresses) == 0 {
			return false, nil
		}
		egressSANs := meshCtx.ZoneEgressSANs()
		if len(egressSANs) == 0 {
			return false, nil
		}
		builder.Configure(envoy_clusters.EdsCluster())
		if err := configureWorkloadIdentityTLS(builder, proxy, sni, egressSANs); err != nil {
			return false, err
		}
	} else {
		sni := SniForBackendRef(realResourceRef, dest, port, systemNamespace)
		builder.
			Configure(envoy_clusters.EdsCluster()).
			Configure(envoy_clusters.ClientSideMTLSCustomSNI(
				proxy.SecretsTracker,
				unifiedNaming,
				meshCtx.Resource,
				mesh_proto.ZoneEgressServiceName,
				true,
				sni,
				false,
			))
	}
	return true, nil
}

// buildInternalServiceCluster configures a cluster for an internal (non-external) service.
// Returns the (possibly updated) protocol, a configured flag, and any error.
// Protocol may change when the real resource ref resolves a MeshService port.
func buildInternalServiceCluster(
	builder *envoy_clusters.ClusterBuilder,
	proxy *core_xds.Proxy,
	meshCtx xds_context.MeshContext,
	service *envoy_common.Service,
	cluster envoy_common.Cluster,
	serviceName string,
	clusterTags []envoy_tags.Tags,
	tlsReady bool,
	protocol core_meta.Protocol,
	unifiedNaming bool,
	systemNamespace string,
) (core_meta.Protocol, bool, error) {
	builder.
		Configure(envoy_clusters.EdsCluster()).
		Configure(envoy_clusters.Http2())

	if upstreamMeshName := cluster.Mesh(); upstreamMeshName != "" {
		for _, otherMesh := range meshCtx.Resources.Meshes().Items {
			if otherMesh.GetMeta().GetName() == upstreamMeshName {
				builder.Configure(
					envoy_clusters.CrossMeshClientSideMTLS(
						proxy.SecretsTracker, unifiedNaming, meshCtx.Resource, otherMesh, serviceName, tlsReady, clusterTags,
					),
				)
				break
			}
		}
		return protocol, true, nil
	}

	if realResourceRef := service.BackendRef().RealResourceBackendRef(); realResourceRef != nil {
		return configureSameMeshRealRefCluster(builder, proxy, meshCtx, realResourceRef, protocol, unifiedNaming, systemNamespace)
	}

	builder.Configure(envoy_clusters.ClientSideMTLS(proxy.SecretsTracker, unifiedNaming, meshCtx.Resource, serviceName, tlsReady, clusterTags, len(meshCtx.CAsByTrustDomain) > 0))
	return protocol, true, nil
}

// configureSameMeshRealRefCluster configures TLS for a same-mesh cluster backed by a real resource ref.
// Returns false when the cluster should be skipped (missing destination or failed SNI validation).
// Protocol may be updated when the ref resolves to a MeshService.
func configureSameMeshRealRefCluster(
	builder *envoy_clusters.ClusterBuilder,
	proxy *core_xds.Proxy,
	meshCtx xds_context.MeshContext,
	realResourceRef *resolve.RealResourceBackendRef,
	protocol core_meta.Protocol,
	unifiedNaming bool,
	systemNamespace string,
) (core_meta.Protocol, bool, error) {
	dest, port, ok := DestinationPortFromRef(meshCtx, realResourceRef)
	if !ok {
		return protocol, false, nil
	}

	tlsReady := true // tls readiness is only relevant for MeshService
	if common_api.TargetRefKind(realResourceRef.Resource.ResourceType) == common_api.MeshService {
		ms := dest.(*meshservice_api.MeshServiceResource)
		// we only check TLS status for local service
		// services that are synced can be accessed only with TLS through ZoneIngress
		tlsReady = !ms.IsLocalMeshService() || ms.Status.TLS.Status == meshservice_api.TLSReady
		protocol = port.GetProtocol()
	}

	zone := realResourceRef.Resource.Zone
	zoneMeshScoped := zone == "" || meshCtx.ZonesWithMeshScopedProxy[zone]
	var sni string
	if zoneMeshScoped && proxy.WorkloadIdentity != nil {
		if err := tls.ValidateSNIForKRI(realResourceRef.Resource); err != nil {
			return protocol, false, nil
		}
		sni = tls.SNIFromKRI(realResourceRef.Resource)
	} else {
		sni = SniForBackendRef(realResourceRef, dest, port, systemNamespace)
	}

	// ClientSideMultiIdentitiesMTLS validates MTLS is enabled on the mesh
	if proxy.WorkloadIdentity != nil {
		if err := configureWorkloadIdentityTLS(builder, proxy, sni, Identities(realResourceRef, meshCtx, true)); err != nil {
			return protocol, false, err
		}
	} else {
		builder.Configure(envoy_clusters.ClientSideMultiIdentitiesMTLS(
			proxy.SecretsTracker,
			unifiedNaming,
			meshCtx.Resource,
			tlsReady,
			sni,
			Identities(realResourceRef, meshCtx, false),
			len(meshCtx.CAsByTrustDomain) > 0,
		))
	}
	return protocol, true, nil
}

// configureWorkloadIdentityTLS applies UpstreamTLSContext to the cluster builder for workload-identity paths.
func configureWorkloadIdentityTLS(builder *envoy_clusters.ClusterBuilder, proxy *core_xds.Proxy, sni string, sans []string) error {
	upstreamCtx, err := UpstreamTLSContext(proxy, sni, sans)
	if err != nil {
		return err
	}
	builder.Configure(envoy_clusters.UpstreamTLSContext(upstreamCtx))
	return nil
}

func UpstreamTLSContext(proxy *core_xds.Proxy, sni string, sans []string) (*envoy_tls.UpstreamTlsContext, error) {
	sanMatchers := make([]*bldrs_common.Builder[envoy_tls.SubjectAltNameMatcher], 0, len(sans))
	for _, san := range sans {
		conf := bldrs_tls.NewSubjectAltNameMatcher().Configure(bldrs_tls.URI(bldrs_matcher.NewStringMatcher().Configure(bldrs_matcher.ExactMatcher(san))))
		sanMatchers = append(sanMatchers, conf)
	}
	var validationSds bldrs_common.Configurer[envoy_tls.CommonTlsContext_CombinedCertificateValidationContext]
	if proxy.WorkloadIdentity.ExternalValidationSourceConfigurer != nil {
		validationSds = bldrs_tls.ValidationContextSdsSecretConfig(
			bldrs_tls.NewTlsCertificateSdsSecretConfigs().Configure(
				proxy.WorkloadIdentity.ExternalValidationSourceConfigurer(),
			),
		)
	} else {
		validationSds = bldrs_tls.ValidationContextSdsSecretConfig(
			bldrs_tls.NewTlsCertificateSdsSecretConfigs().Configure(
				bldrs_tls.SdsSecretConfigSource(
					system_names.SystemResourceNameCABundle,
					bldrs_core.NewConfigSource().Configure(bldrs_core.Sds()),
				),
			),
		)
	}
	commonTlsContext := bldrs_tls.NewCommonTlsContext().
		Configure(bldrs_tls.CombinedCertificateValidationContext(
			bldrs_tls.NewCombinedCertificateValidationContext().
				Configure(validationSds).
				Configure(bldrs_tls.DefaultValidationContext(
					bldrs_tls.NewDefaultValidationContext().Configure(bldrs_tls.SANs(sanMatchers)),
				)),
		)).
		Configure(bldrs_tls.TlsCertificateSdsSecretConfigs([]*bldrs_common.Builder[envoy_tls.SdsSecretConfig]{
			bldrs_tls.NewTlsCertificateSdsSecretConfigs().Configure(
				proxy.WorkloadIdentity.IdentitySourceConfigurer(),
			),
		})).
		Configure(bldrs_tls.KumaAlpnProtocol())
	return bldrs_tls.NewUpstreamTLSContext().
		Configure(bldrs_tls.SNI(sni)).
		Configure(bldrs_tls.UpstreamCommonTlsContext(commonTlsContext)).
		Build()
}

func SniForBackendRef(
	backendRef *resolve.RealResourceBackendRef,
	dest core_resources.Destination,
	port core_resources.Port,
	systemNamespace string,
) string {
	name := core_model.GetDisplayName(dest.GetMeta())
	if backendRef.Resource.ResourceType == meshservice_api.MeshServiceType {
		name = dest.(*meshservice_api.MeshServiceResource).SNIName(systemNamespace)
	}

	return tls.SNIForResource(name, dest.GetMeta().GetMesh(), dest.Descriptor().Name, port.GetValue(), nil)
}

func Identities(
	backendRef *resolve.RealResourceBackendRef,
	meshCtx xds_context.MeshContext,
	includeSpiffeID bool,
) []string {
	var result []string
	serviceTagTransformer := func(serviceTag string) string {
		return serviceTag
	}
	// we don't use function which transform service tag to the spiffe id on cluster configuration
	// instead we want to set it here. It's not required for SpiffeID type, only ServiceTag
	if includeSpiffeID {
		serviceTagTransformer = func(serviceTag string) string {
			return tls.ServiceSpiffeID(meshCtx.Resource.Meta.GetName(), serviceTag)
		}
	}
	switch common_api.TargetRefKind(backendRef.Resource.ResourceType) {
	case common_api.MeshService:
		ms := meshCtx.GetServiceByKRI(backendRef.Resource)
		if ms == nil {
			return result
		}
		for _, identity := range pointer.Deref(ms.(*meshservice_api.MeshServiceResource).Spec.Identities) {
			if identity.Type == meshservice_api.MeshServiceIdentityServiceTagType {
				result = append(result, serviceTagTransformer(identity.Value))
			}
			if identity.Type == meshservice_api.MeshServiceIdentitySpiffeIDType {
				result = append(result, identity.Value)
			}
		}
	case common_api.MeshMultiZoneService:
		svc := meshCtx.GetServiceByKRI(backendRef.Resource)
		if svc == nil {
			return result
		}
		identities := map[string]struct{}{}
		for _, matchedMs := range svc.(*meshmultizoneservice_api.MeshMultiZoneServiceResource).Status.MeshServices {
			ri := kri.Identifier{
				ResourceType: meshservice_api.MeshServiceType,
				Name:         matchedMs.Name,
				Namespace:    matchedMs.Namespace,
				Zone:         matchedMs.Zone,
				Mesh:         matchedMs.Mesh,
			}
			ms := meshCtx.GetServiceByKRI(ri)
			if ms == nil {
				continue
			}
			for _, identity := range pointer.Deref(ms.(*meshservice_api.MeshServiceResource).Spec.Identities) {
				identities[identity.Value] = struct{}{}
			}
		}
		result = util_maps.SortedKeys(identities)
	}
	sort.SliceStable(result, func(i, j int) bool {
		return result[i] < result[j]
	})
	return result
}

func isMeshExternalService(endpoints []core_xds.Endpoint) bool {
	if len(endpoints) > 0 {
		return endpoints[0].IsMeshExternalService()
	}
	return false
}
