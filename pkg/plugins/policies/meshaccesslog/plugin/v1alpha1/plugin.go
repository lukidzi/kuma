package v1alpha1

import (
	envoy_listener "github.com/envoyproxy/go-control-plane/envoy/config/listener/v3"
	"github.com/pkg/errors"

	mesh_proto "github.com/kumahq/kuma/api/mesh/v1alpha1"
	"github.com/kumahq/kuma/pkg/core"
	core_plugins "github.com/kumahq/kuma/pkg/core/plugins"
	core_mesh "github.com/kumahq/kuma/pkg/core/resources/apis/mesh"
	"github.com/kumahq/kuma/pkg/core/xds"
	core_xds "github.com/kumahq/kuma/pkg/core/xds"
	"github.com/kumahq/kuma/pkg/plugins/policies/core/matchers"
	core_rules "github.com/kumahq/kuma/pkg/plugins/policies/core/rules"
	policies_xds "github.com/kumahq/kuma/pkg/plugins/policies/core/xds"
	api "github.com/kumahq/kuma/pkg/plugins/policies/meshaccesslog/api/v1alpha1"
	plugin_xds "github.com/kumahq/kuma/pkg/plugins/policies/meshaccesslog/plugin/xds"
	"github.com/kumahq/kuma/pkg/util/pointer"
	xds_context "github.com/kumahq/kuma/pkg/xds/context"
	"github.com/kumahq/kuma/pkg/xds/envoy"
	"github.com/kumahq/kuma/pkg/xds/envoy/names"
	"github.com/kumahq/kuma/pkg/xds/generator"
	xds_topology "github.com/kumahq/kuma/pkg/xds/topology"
)

var (
	_   core_plugins.PolicyPlugin = &plugin{}
	log                           = core.Log.WithName("MeshAccessLog")
)

type plugin struct{}

func NewPlugin() core_plugins.Plugin {
	return &plugin{}
}

func (p plugin) MatchedPolicies(dataplane *core_mesh.DataplaneResource, resources xds_context.Resources) (core_xds.TypedMatchingPolicies, error) {
	return matchers.MatchedPolicies(api.MeshAccessLogType, dataplane, resources)
}

func (p plugin) EgressMatchedPolicies(tags map[string]string, resources xds_context.Resources) (core_xds.TypedMatchingPolicies, error) {
	return matchers.EgressMatchedPolicies(api.MeshAccessLogType, tags, resources)
}

func (p plugin) Apply(rs *core_xds.ResourceSet, ctx xds_context.Context, proxy *core_xds.Proxy) error {
	if proxy.ZoneEgressProxy != nil {
		return applyToEgress(rs, proxy)
	}
	if proxy.Dataplane == nil {
		return nil
	}
	policies, ok := proxy.Policies.Dynamic[api.MeshAccessLogType]
	if !ok {
		return nil
	}

	endpoints := &plugin_xds.EndpointAccumulator{}

	listeners := policies_xds.GatherListeners(rs)

	if err := applyToInbounds(policies.FromRules, listeners.Inbound, proxy, endpoints); err != nil {
		return err
	}
	if err := applyToOutbounds(policies.ToRules, listeners.Outbound, proxy, endpoints); err != nil {
		return err
	}
	if err := applyToTransparentProxyListeners(policies, listeners.Ipv4Passthrough, listeners.Ipv6Passthrough, proxy, endpoints); err != nil {
		return err
	}
	if err := applyToDirectAccess(policies.ToRules, listeners.DirectAccess, proxy, endpoints); err != nil {
		return err
	}
	if err := applyToGateway(policies.GatewayRules, listeners.Gateway, ctx.Mesh.Resources.MeshLocalResources, proxy, endpoints); err != nil {
		return err
	}

	if err := plugin_xds.HandleClusters(*endpoints, rs, proxy); err != nil {
		return errors.Wrap(err, "unable to handle clusters for policy")
	}

	return nil
}

func applyToInbounds(rules core_rules.FromRules, inboundListeners map[core_rules.InboundListener]*envoy_listener.Listener, proxy *core_xds.Proxy, backends *plugin_xds.EndpointAccumulator) error {
	for _, inbound := range proxy.Dataplane.Spec.GetNetworking().GetInbound() {
		iface := proxy.Dataplane.Spec.Networking.ToInboundInterface(inbound)

		listenerKey := core_rules.InboundListener{
			Address: iface.DataplaneIP,
			Port:    iface.DataplanePort,
		}
		listener, ok := inboundListeners[listenerKey]
		if !ok {
			continue
		}

		if err := configureInbound(rules.Rules[listenerKey], proxy, listener, backends); err != nil {
			return err
		}
	}
	return nil
}

func applyToOutbounds(rules core_rules.ToRules, outboundListeners map[mesh_proto.OutboundInterface]*envoy_listener.Listener, proxy *core_xds.Proxy, backends *plugin_xds.EndpointAccumulator) error {
	for _, outbound := range proxy.Dataplane.Spec.Networking.GetOutbound() {
		oface := proxy.Dataplane.Spec.Networking.ToOutboundInterface(outbound)

		listener, ok := outboundListeners[oface]
		if !ok {
			continue
		}

		serviceName := outbound.GetService()

		if err := configureOutbound(rules, proxy, core_rules.MeshService(serviceName), serviceName, listener, backends); err != nil {
			return err
		}
	}

	return nil
}

func applyToTransparentProxyListeners(
	policies xds.TypedMatchingPolicies, ipv4 *envoy_listener.Listener, ipv6 *envoy_listener.Listener, proxy *core_xds.Proxy,
	backends *plugin_xds.EndpointAccumulator,
) error {
	if ipv4 != nil {
		if err := configureOutbound(
			policies.ToRules,
			proxy,
			core_rules.MeshService(core_mesh.PassThroughService),
			"external",
			ipv4,
			backends,
		); err != nil {
			return err
		}
	}

	if ipv6 != nil {
		return configureOutbound(
			policies.ToRules,
			proxy,
			core_rules.MeshService(core_mesh.PassThroughService),
			"external",
			ipv6,
			backends,
		)
	}

	return nil
}

func applyToDirectAccess(
	rules core_rules.ToRules, directAccess map[generator.Endpoint]*envoy_listener.Listener, proxy *core_xds.Proxy,
	backends *plugin_xds.EndpointAccumulator,
) error {
	for endpoint, listener := range directAccess {
		name := generator.DirectAccessEndpointName(endpoint)
		return configureOutbound(
			rules,
			proxy,
			core_rules.MeshService(core_mesh.PassThroughService),
			name,
			listener,
			backends,
		)
	}

	return nil
}

func applyToGateway(
	rules core_rules.GatewayRules, gatewayListeners map[core_rules.InboundListener]*envoy_listener.Listener, resources xds_context.ResourceMap, proxy *core_xds.Proxy,
	backends *plugin_xds.EndpointAccumulator,
) error {
	var gateways *core_mesh.MeshGatewayResourceList
	if rawList := resources[core_mesh.MeshGatewayType]; rawList != nil {
		gateways = rawList.(*core_mesh.MeshGatewayResourceList)
	} else {
		return nil
	}

	gateway := xds_topology.SelectGateway(gateways.Items, proxy.Dataplane.Spec.Matches)
	if gateway == nil {
		return nil
	}

	for _, listener := range gateway.Spec.GetConf().GetListeners() {
		address := proxy.Dataplane.Spec.GetNetworking().Address
		port := listener.GetPort()
		rulesListener := core_rules.InboundListener{
			Address: address,
			Port:    port,
		}
		listener, ok := gatewayListeners[rulesListener]
		if !ok {
			continue
		}

		listenerRules, ok := rules.ToRules[rulesListener]
		if !ok {
			continue
		}

		if err := configureGatewayListener(
			listenerRules,
			proxy,
			core_rules.Subset{},
			listener,
			backends,
		); err != nil {
			return err
		}
	}

	return nil
}

func configureInbound(
	fromRules core_rules.Rules,
	proxy *core_xds.Proxy,
	listener *envoy_listener.Listener,
	backendsAcc *plugin_xds.EndpointAccumulator,
) error {
	serviceName := proxy.Dataplane.Spec.GetIdentifyingService()

	// `from` section of MeshAccessLog only allows Mesh targetRef
	conf := core_rules.ComputeConf[api.Conf](fromRules, core_rules.MeshSubset())
	if conf == nil {
		return nil
	}

	for _, backend := range pointer.Deref(conf.Backends) {
		configurer := plugin_xds.Configurer{
			Mesh:                proxy.Dataplane.GetMeta().GetMesh(),
			TrafficDirection:    envoy.TrafficDirectionInbound,
			SourceService:       mesh_proto.ServiceUnknown,
			DestinationService:  serviceName,
			Backend:             backend,
			Proxy:               proxy,
			AccessLogSocketPath: proxy.Metadata.AccessLogSocketPath,
		}

		for _, chain := range listener.FilterChains {
			if err := configurer.Configure(chain, backendsAcc); err != nil {
				return err
			}
		}
	}

	return nil
}

func configureOutbound(
	rules core_rules.ToRules,
	proxy *core_xds.Proxy,
	subset core_rules.Subset,
	destinationServiceName string,
	listener *envoy_listener.Listener,
	backendsAcc *plugin_xds.EndpointAccumulator,
) error {
	sourceService := proxy.Dataplane.Spec.GetIdentifyingService()

	conf := core_rules.ComputeConf[api.Conf](rules.Rules, subset)
	if conf == nil {
		return nil
	}

	for _, backend := range pointer.Deref(conf.Backends) {
		configurer := plugin_xds.Configurer{
			Mesh:                proxy.Dataplane.GetMeta().GetMesh(),
			TrafficDirection:    envoy.TrafficDirectionOutbound,
			SourceService:       sourceService,
			DestinationService:  destinationServiceName,
			Backend:             backend,
			Proxy:               proxy,
			AccessLogSocketPath: proxy.Metadata.AccessLogSocketPath,
		}

		for _, chain := range listener.FilterChains {
			if err := configurer.Configure(chain, backendsAcc); err != nil {
				return err
			}
		}
	}

	return nil
}

func configureGatewayListener(
	rules core_rules.Rules,
	proxy *core_xds.Proxy,
	subset core_rules.Subset,
	listener *envoy_listener.Listener,
	backendsAcc *plugin_xds.EndpointAccumulator,
) error {
	gatewayService := proxy.Dataplane.Spec.GetIdentifyingService()

	conf := core_rules.ComputeConf[api.Conf](rules, subset)

	for _, backend := range pointer.Deref(conf.Backends) {
		configurer := plugin_xds.Configurer{
			Mesh:                proxy.Dataplane.GetMeta().GetMesh(),
			TrafficDirection:    envoy.TrafficDirectionOutbound,
			SourceService:       gatewayService,
			DestinationService:  mesh_proto.MatchAllTag,
			Backend:             backend,
			Proxy:               proxy,
			AccessLogSocketPath: proxy.Metadata.AccessLogSocketPath,
		}

		for _, chain := range listener.FilterChains {
			if err := configurer.Configure(chain, backendsAcc); err != nil {
				return err
			}
		}
	}

	return nil
}

func applyToEgress(rs *core_xds.ResourceSet, proxy *core_xds.Proxy) error {
	listeners := policies_xds.GatherListeners(rs)
	endpoints := &plugin_xds.EndpointAccumulator{}
	for _, resource := range proxy.ZoneEgressProxy.MeshResourcesList {
		for _, es := range resource.ExternalServices {
			meshName := resource.Mesh.GetMeta().GetName()
			esName, ok := es.Spec.GetTags()[mesh_proto.ServiceTag]
			if !ok {
				continue
			}
			policies, ok := resource.Dynamic[esName]
			if !ok {
				continue
			}
			mtp, ok := policies[api.MeshAccessLogType]
			if !ok {
				continue
			}
			if listeners.Egress == nil {
				log.V(1).Info("skip applying MeshTrafficPermission, Egress has no listener",
					"proxyName", proxy.ZoneEgressProxy.ZoneEgressResource.GetMeta().GetName(),
					"mesh", resource.Mesh.GetMeta().GetName(),
				)
				return nil
			}

			for _, rule := range mtp.FromRules.Rules {
				// `from` section of MeshAccessLog only allows Mesh targetRef
				conf := core_rules.ComputeConf[api.Conf](rule, core_rules.MeshSubset())
				if conf == nil {
					return nil
				}
				for _, backend := range pointer.Deref(conf.Backends) {
					configurer := plugin_xds.Configurer{
						Mesh:                meshName,
						TrafficDirection:    envoy.TrafficDirectionOutbound,
						SourceService:       "egress",
						DestinationService:  esName,
						Backend:             backend,
						Proxy:               proxy,
						AccessLogSocketPath: proxy.Metadata.AccessLogSocketPath,
					}
					for _, filterChain := range listeners.Egress.FilterChains {
						if filterChain.Name == names.GetEgressFilterChainName(esName, meshName) {
							if err := configurer.Configure(filterChain, endpoints); err != nil {
								return err
							}
						}
					}
				}

			}
		}
	}
	if err := plugin_xds.HandleClusters(*endpoints, rs, proxy); err != nil {
		return errors.Wrap(err, "unable to handle clusters for policy")
	}
	return nil
}
