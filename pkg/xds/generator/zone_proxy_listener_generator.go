package generator

import (
	"context"
	"fmt"
	"slices"

	mesh_proto "github.com/kumahq/kuma/v2/api/mesh/v1alpha1"
	core_meta "github.com/kumahq/kuma/v2/pkg/core/metadata"
	"github.com/kumahq/kuma/v2/pkg/core/naming"
	unified_naming "github.com/kumahq/kuma/v2/pkg/core/naming/unified-naming"
	core_mesh "github.com/kumahq/kuma/v2/pkg/core/resources/apis/mesh"
	meshservice_api "github.com/kumahq/kuma/v2/pkg/core/resources/apis/meshservice/api/v1alpha1"
	core_xds "github.com/kumahq/kuma/v2/pkg/core/xds"
	plugins_xds "github.com/kumahq/kuma/v2/pkg/plugins/policies/core/xds"
	util_maps "github.com/kumahq/kuma/v2/pkg/util/maps"
	xds_context "github.com/kumahq/kuma/v2/pkg/xds/context"
	envoy_common "github.com/kumahq/kuma/v2/pkg/xds/envoy"
	envoy_clusters "github.com/kumahq/kuma/v2/pkg/xds/envoy/clusters"
	envoy_listeners "github.com/kumahq/kuma/v2/pkg/xds/envoy/listeners"
	envoy_names "github.com/kumahq/kuma/v2/pkg/xds/envoy/names"
	"github.com/kumahq/kuma/v2/pkg/xds/envoy/tags"
	"github.com/kumahq/kuma/v2/pkg/xds/envoy/tls"
	"github.com/kumahq/kuma/v2/pkg/xds/generator/metadata"
	"github.com/kumahq/kuma/v2/pkg/xds/generator/zoneproxy"
)

// ZoneProxyListenerGenerator generates Envoy listeners for zone proxy listeners
// embedded in a regular Dataplane resource (DataplaneZoneListeners).
// It is a no-op when proxy.DataplaneZoneListeners is nil.
type ZoneProxyListenerGenerator struct{}

func (g ZoneProxyListenerGenerator) Generate(
	ctx context.Context,
	_ *core_xds.ResourceSet,
	xdsCtx xds_context.Context,
	proxy *core_xds.Proxy,
) (*core_xds.ResourceSet, error) {
	if proxy.DataplaneZoneListeners == nil {
		return nil, nil
	}

	rs := core_xds.NewResourceSet()

	for _, il := range proxy.DataplaneZoneListeners.IngressListeners {
		generated, err := g.generateIngressListener(proxy, xdsCtx, il)
		if err != nil {
			return nil, err
		}
		rs.AddSet(generated)
	}

	for _, el := range proxy.DataplaneZoneListeners.EgressListeners {
		generated, err := g.generateEgressListener(ctx, proxy, xdsCtx, el)
		if err != nil {
			return nil, err
		}
		rs.AddSet(generated)
	}

	return rs, nil
}

func (g ZoneProxyListenerGenerator) generateIngressListener(
	proxy *core_xds.Proxy,
	xdsCtx xds_context.Context,
	il *core_xds.DataplaneIngressListener,
) (*core_xds.ResourceSet, error) {
	rs := core_xds.NewResourceSet()
	cp := xdsCtx.ControlPlane

	unifiedNaming := unified_naming.Enabled(proxy.Metadata, xdsCtx.Mesh.Resource)
	getName := naming.GetNameOrFallbackFunc(unifiedNaming)

	address := il.Listener.Address
	port := il.Listener.Port

	inboundContextualID := naming.MustContextualInboundName(proxy.Dataplane, il.Listener.Name)
	listenerName := getName(inboundContextualID, envoy_names.GetInboundListenerName(address, port))
	statPrefix := getName(inboundContextualID, "")

	listener := envoy_listeners.NewListenerBuilder(proxy.APIVersion, listenerName).
		Configure(envoy_listeners.InboundListener(address, port, core_xds.SocketAddressProtocolTCP)).
		Configure(envoy_listeners.StatPrefix(statPrefix)).
		Configure(envoy_listeners.TLSInspector())

	mr := il.MeshResources
	meshName := mr.Mesh.GetMeta().GetName()
	meshResources := xds_context.Resources{MeshLocalResources: mr.Resources}

	localMS := &meshservice_api.MeshServiceResourceList{}
	for _, ms := range meshResources.MeshServices().GetItems() {
		if lbls := ms.GetMeta().GetLabels(); lbls == nil || lbls[mesh_proto.ZoneTag] == "" || lbls[mesh_proto.ZoneTag] == cp.Zone {
			_ = localMS.AddItem(ms)
		}
	}

	dest := zoneproxy.BuildMeshDestinations(
		il.AvailableServices,
		cp.SystemNamespace,
		meshResources,
		localMS,
		meshResources.MeshMultiZoneServices(),
	)

	services := zoneproxy.GetServices(dest, mr.EndpointMap, il.AvailableServices, unifiedNaming)
	clusters := services.Clusters()

	cds, err := zoneproxy.GenerateCDS(proxy, dest, services, meshName, metadata.OriginIngress, unifiedNaming)
	if err != nil {
		return nil, err
	}
	rs.AddSet(cds)

	eds, err := zoneproxy.GenerateEDS(proxy, mr.EndpointMap, services, meshName, metadata.OriginIngress, unifiedNaming)
	if err != nil {
		return nil, err
	}
	rs.AddSet(eds)

	for _, cluster := range clusters {
		listener.Configure(envoy_listeners.FilterChain(zoneproxy.CreateFilterChain(proxy, cluster)))
	}

	if len(clusters) == 0 {
		response := fmt.Sprintf(`{"proxy":%q,"zone":%q}`, proxy.Id.String(), proxy.Zone)
		filterChain := envoy_listeners.NewFilterChainBuilder(proxy.APIVersion, envoy_common.AnonymousResource).
			Configure(envoy_listeners.NetworkDirectResponse(response))
		listener.Configure(envoy_listeners.FilterChain(filterChain))
	}

	resource, err := listener.Build()
	if err != nil {
		return nil, err
	}
	rs.Add(&core_xds.Resource{
		Name:     resource.GetName(),
		Origin:   metadata.OriginIngress,
		Resource: resource,
	})
	return rs, nil
}

func (g ZoneProxyListenerGenerator) generateEgressListener(
	ctx context.Context,
	proxy *core_xds.Proxy,
	xdsCtx xds_context.Context,
	el *core_xds.DataplaneEgressListener,
) (*core_xds.ResourceSet, error) {
	rs := core_xds.NewResourceSet()

	unifiedNaming := unified_naming.Enabled(proxy.Metadata, el.MeshResources.Mesh)
	getName := naming.GetNameOrFallbackFunc(unifiedNaming)
	meshName := el.MeshResources.Mesh.GetMeta().GetName()

	address := el.Listener.Address
	port := el.Listener.Port

	inboundContextualID := naming.MustContextualInboundName(proxy.Dataplane, el.Listener.Name)
	listenerName := getName(inboundContextualID, envoy_names.GetInboundListenerName(address, port))
	statPrefix := getName(inboundContextualID, "")

	listener := envoy_listeners.NewListenerBuilder(proxy.APIVersion, listenerName).
		Configure(envoy_listeners.InboundListener(address, port, core_xds.SocketAddressProtocolTCP)).
		Configure(envoy_listeners.StatPrefix(statPrefix)).
		Configure(envoy_listeners.TLSInspector())

	secretsTracker := envoy_common.NewSecretsTracker(meshName, []string{meshName})

	internal, internalFCB, err := g.genInternalResources(proxy, xdsCtx, el.ZoneIngresses, el.MeshResources, unifiedNaming)
	if err != nil {
		return nil, err
	}
	rs.AddSet(internal)

	external, externalFCB, err := g.genExternalResources(ctx, proxy, el.MeshResources, secretsTracker, unifiedNaming)
	if err != nil {
		return nil, err
	}
	rs.AddSet(external)

	for _, fcb := range slices.Concat(internalFCB, externalFCB) {
		listener.Configure(envoy_listeners.FilterChain(fcb))
	}

	if len(internalFCB) > 0 || len(externalFCB) > 0 {
		resource, err := listener.Build()
		if err != nil {
			return nil, err
		}
		rs.Add(&core_xds.Resource{
			Name:     resource.GetName(),
			Origin:   metadata.OriginEgress,
			Resource: resource,
		})
	}

	return rs, nil
}

// genInternalResources mirrors egress.genInternalResources but accepts zone ingresses
// as a parameter instead of reading from proxy.ZoneEgressProxy.
func (g ZoneProxyListenerGenerator) genInternalResources(
	proxy *core_xds.Proxy,
	xdsCtx xds_context.Context,
	zoneIngresses []*core_mesh.ZoneIngressResource,
	resources *core_xds.MeshResources,
	unifiedNaming bool,
) (*core_xds.ResourceSet, []*envoy_listeners.FilterChainBuilder, error) {
	if !resources.Mesh.ZoneEgressEnabled() {
		return nil, nil, nil
	}

	rs := core_xds.NewResourceSet()
	meshName := resources.Mesh.GetMeta().GetName()

	availableServicesMap := map[string]*mesh_proto.ZoneIngress_AvailableService{}
	for _, zi := range zoneIngresses {
		for _, svc := range zi.Spec.GetAvailableServices() {
			serviceName := svc.Tags[mesh_proto.ServiceTag]
			endpoints := resources.EndpointMap[serviceName]

			switch {
			case svc.Mesh != meshName:
				continue
			case len(endpoints) == 0:
				continue
			case endpoints[0].IsExternalService() && endpoints[0].IsReachableFromZone(xdsCtx.ControlPlane.Zone):
				continue
			}

			svcTags := tags.Tags(svc.Tags).String()
			if _, ok := availableServicesMap[svcTags]; !ok {
				availableServicesMap[svcTags] = svc
			}
		}
	}

	availableServices := util_maps.AllValues(availableServicesMap)
	dest := zoneproxy.BuildMeshDestinations(
		availableServices,
		"",
		xds_context.Resources{MeshLocalResources: resources.Resources},
	)

	services := zoneproxy.GetServices(dest, resources.EndpointMap, availableServices, unifiedNaming)

	cds, err := zoneproxy.GenerateCDS(proxy, dest, services, meshName, metadata.OriginEgress, unifiedNaming)
	if err != nil {
		return nil, nil, err
	}
	rs.AddSet(cds)

	eds, err := zoneproxy.GenerateEDS(proxy, resources.EndpointMap, services, meshName, metadata.OriginEgress, unifiedNaming)
	if err != nil {
		return nil, nil, err
	}
	rs.AddSet(eds)

	var filterChainBuilders []*envoy_listeners.FilterChainBuilder
	for _, cluster := range services.Clusters() {
		filterChainBuilders = append(filterChainBuilders, zoneproxy.CreateFilterChain(proxy, cluster))
	}
	return rs, filterChainBuilders, nil
}

// genExternalResources mirrors egress.genExternalResources but uses proxy.Dataplane.IsIPv6()
// instead of proxy.ZoneEgressProxy.ZoneEgressResource.IsIPv6().
func (g ZoneProxyListenerGenerator) genExternalResources(
	_ context.Context,
	proxy *core_xds.Proxy,
	resources *core_xds.MeshResources,
	secretsTracker core_xds.SecretsTracker,
	unifiedNaming bool,
) (*core_xds.ResourceSet, []*envoy_listeners.FilterChainBuilder, error) {
	rs := core_xds.NewResourceSet()
	var filterChainBuilders []*envoy_listeners.FilterChainBuilder

	for _, cluster := range g.getExternalServicesClusters(resources, unifiedNaming) {
		filterChainBuilders = append(filterChainBuilders,
			g.buildExternalServiceFilterChain(proxy, resources, secretsTracker, cluster, unifiedNaming),
		)
		cds, err := g.genExternalServicesCDS(proxy, resources.EndpointMap[cluster.Service()], cluster)
		if err != nil {
			return nil, nil, err
		}
		rs.Add(cds)
	}
	return rs, filterChainBuilders, nil
}

func (g ZoneProxyListenerGenerator) getExternalServicesClusters(
	resources *core_xds.MeshResources,
	unifiedNaming bool,
) []envoy_common.Cluster {
	svcAcc := envoy_common.NewServicesAccumulator(nil)
	localResources := xds_context.Resources{MeshLocalResources: resources.Resources}
	destinations := zoneproxy.BuildMeshDestinations(
		nil,
		"",
		localResources,
		localResources.MeshExternalServices(),
	)

	meshName := resources.Mesh.GetMeta().GetName()
	matchAll := destinations.KumaIoServices[mesh_proto.MatchAllTag]
	sniUsed := map[string]struct{}{}

	for _, es := range resources.ExternalServices {
		esName := es.Spec.GetService()
		endpoints := resources.EndpointMap[esName]
		if len(endpoints) == 0 || !endpoints[0].IsExternalService() {
			continue
		}
		for _, dest := range slices.Concat(destinations.KumaIoServices[esName], matchAll) {
			destTags := dest.WithTags("mesh", meshName)
			sni := tls.SNIFromTags(destTags.WithTags(mesh_proto.ServiceTag, esName))
			if _, ok := sniUsed[sni]; ok {
				continue
			}
			sniUsed[sni] = struct{}{}
			cluster := plugins_xds.NewClusterBuilder().
				WithName(envoy_names.GetMeshClusterName(meshName, esName)).
				WithService(esName).
				WithSNI(sni).
				WithExternalService(true).
				WithTags(destTags).
				Build()
			svcAcc.Add(cluster)
		}
	}

	for _, ref := range destinations.BackendRefs {
		endpoints := resources.EndpointMap[ref.LegacyServiceName]
		if _, ok := sniUsed[ref.SNI]; ok || len(endpoints) == 0 || !endpoints[0].IsExternalService() {
			continue
		}
		sniUsed[ref.SNI] = struct{}{}
		clusterName := naming.GetNameOrFallback(unifiedNaming, ref.Resource().String(), ref.LegacyServiceName)
		cluster := plugins_xds.NewClusterBuilder().
			WithName(clusterName).
			WithService(ref.LegacyServiceName).
			WithSNI(ref.SNI).
			WithExternalService(true).
			Build()
		svcAcc.AddBackendRef(&ref.ResolvedBackendRef, cluster)
	}
	return svcAcc.Services().Clusters()
}

func (g ZoneProxyListenerGenerator) genExternalServicesCDS(
	proxy *core_xds.Proxy,
	endpoints []core_xds.Endpoint,
	cluster envoy_common.Cluster,
) (*core_xds.Resource, error) {
	// Use proxy.Dataplane.IsIPv6() instead of ZoneEgressResource.IsIPv6()
	ipv6 := proxy.Dataplane.IsIPv6()
	systemCAPath := proxy.Metadata.GetSystemCaPath()

	protocol := endpoints[0].Protocol()
	isMES := endpoints[0].IsMeshExternalService()

	resource, err := envoy_clusters.NewClusterBuilder(proxy.APIVersion, cluster.Name()).
		Configure(envoy_clusters.DefaultTimeout()).
		ConfigureIf(core_meta.IsHTTP(protocol), envoy_clusters.Http()).
		ConfigureIf(core_meta.IsHTTP2Based(protocol), envoy_clusters.Http2()).
		ConfigureIf(isMES, envoy_clusters.ProvidedCustomEndpointCluster(ipv6, true, endpoints...)).
		ConfigureIf(isMES, envoy_clusters.MeshExternalServiceClientSideTLS(endpoints, systemCAPath, true)).
		ConfigureIf(!isMES, envoy_clusters.ProvidedEndpointCluster(ipv6, endpoints...)).
		ConfigureIf(!isMES, envoy_clusters.ClientSideTLS(endpoints)).
		Build()
	if err != nil {
		return nil, err
	}
	return &core_xds.Resource{
		Name:           resource.GetName(),
		Origin:         metadata.OriginEgress,
		Resource:       resource,
		Protocol:       endpoints[0].ExternalService.Protocol,
		ResourceOrigin: endpoints[0].ExternalService.OwnerResource,
	}, nil
}

func (g ZoneProxyListenerGenerator) buildExternalServiceFilterChain(
	proxy *core_xds.Proxy,
	resources *core_xds.MeshResources,
	secretsTracker core_xds.SecretsTracker,
	cluster envoy_common.Cluster,
	unifiedNaming bool,
) *envoy_listeners.FilterChainBuilder {
	meshName := resources.Mesh.GetMeta().GetName()
	endpoints := resources.EndpointMap[cluster.Service()]
	getName := naming.GetNameOrFallbackFunc(endpoints[0].IsMeshExternalService)
	esName := naming.GetNameOrFallback(unifiedNaming, cluster.Name(), cluster.Service())
	filterChainName := getName(esName, envoy_names.GetEgressFilterChainName(esName, meshName))
	routeConfigName := getName(esName, envoy_names.GetOutboundRouteName(esName))
	virtualHostName := esName

	filterChain := envoy_listeners.NewFilterChainBuilder(proxy.APIVersion, filterChainName).
		Configure(envoy_listeners.ServerSideMTLS(resources.Mesh, secretsTracker, nil, nil, unifiedNaming, false)).
		Configure(envoy_listeners.MatchTransportProtocol(core_meta.ProtocolTLS)).
		Configure(envoy_listeners.MatchServerNames(cluster.SNI())).
		Configure(envoy_listeners.NetworkRBAC(esName, true, resources.ExternalServicePermissionMap[esName]))

	if !core_meta.IsHTTPBased(endpoints[0].Protocol()) {
		return filterChain.Configure(envoy_listeners.TcpProxyDeprecatedWithMetadata(esName, cluster))
	}

	var routes envoy_common.Routes
	for _, rl := range resources.ExternalServiceRateLimits[esName] {
		if rl.Spec.GetConf().GetHttp() == nil {
			continue
		}
		routes = append(routes, envoy_common.NewRoute(
			envoy_common.WithCluster(cluster),
			envoy_common.WithMatchHeaderRegex(tags.TagsHeaderName, tags.MatchSourceRegex(rl)),
			envoy_common.WithRateLimit(rl.Spec),
		))
	}
	routes = append(routes, envoy_common.NewRoute(envoy_common.WithCluster(cluster)))

	return filterChain.
		Configure(envoy_listeners.HttpConnectionManager(esName, false, proxy.InternalAddresses, proxy.Metadata.GetIPv6Enabled())).
		Configure(envoy_listeners.FaultInjection(resources.ExternalServiceFaultInjections[esName]...)).
		Configure(envoy_listeners.RateLimit(resources.ExternalServiceRateLimits[esName])).
		Configure(envoy_listeners.HttpOutboundRoute(routeConfigName, virtualHostName, routes, nil))
}
