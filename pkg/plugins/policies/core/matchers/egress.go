package matchers

import (
	"sort"

	"github.com/pkg/errors"

	common_api "github.com/kumahq/kuma/api/common/v1alpha1"
	mesh_proto "github.com/kumahq/kuma/api/mesh/v1alpha1"
	core_mesh "github.com/kumahq/kuma/pkg/core/resources/apis/mesh"
	core_model "github.com/kumahq/kuma/pkg/core/resources/model"
	core_xds "github.com/kumahq/kuma/pkg/core/xds"
	core_rules "github.com/kumahq/kuma/pkg/plugins/policies/core/rules"
	xds_context "github.com/kumahq/kuma/pkg/xds/context"
)

func EgressMatchedPolicies(rType core_model.ResourceType, tags map[string]string, resources xds_context.Resources) (core_xds.TypedMatchingPolicies, error) {
	policies := resources.ListOrEmpty(rType)

	if len(policies.GetItems()) == 0 {
		return core_xds.TypedMatchingPolicies{Type: rType}, nil
	}

	p := policies.GetItems()[0]

	if _, ok := p.GetSpec().(core_model.Policy); !ok {
		return core_xds.TypedMatchingPolicies{}, errors.Errorf("resource type %v doesn't support TargetRef matching", p.Descriptor().Name)
	}

	_, isFrom := p.GetSpec().(core_model.PolicyWithFromList)
	_, isTo := p.GetSpec().(core_model.PolicyWithToList)
	_, isSingleItem := p.GetSpec().(core_model.PolicyWithSingleItem)

	if !isFrom && !isTo && !isSingleItem {
		return core_xds.TypedMatchingPolicies{}, nil
	}

	var fr core_rules.FromRules
	var err error
	gateways := resources.Gateways().Items
	// in case the policy support
	switch {
	case isSingleItem:
		fr, err = processSingleRules(tags, policies)
	case isFrom && isTo:
		// we needed a strategy to choose what rules to apply on zone egress when a policy supports both "to" and "from".
		// Picking "from" rules works for us today, because there is only MeshFaultInjection policy that has both "to"
		// and "from" and is applied on zone egress. In the future, we might want to move the strategy down to the policy plugins.
		fr, err = processFromRules(tags, policies, gateways)
	case isFrom:
		fr, err = processFromRules(tags, policies, gateways)
	case isTo:
		fr, err = processToRules(tags, policies)
	}

	if err != nil {
		return core_xds.TypedMatchingPolicies{}, err
	}

	return core_xds.TypedMatchingPolicies{
		Type:      rType,
		FromRules: fr,
	}, nil
}

func processFromRules(
	tags map[string]string,
	rl core_model.ResourceList,
	gateways []*core_mesh.MeshGatewayResource,
) (core_rules.FromRules, error) {
	matchedPolicies := []core_model.Resource{}

	for _, policy := range rl.GetItems() {
		spec := policy.GetSpec().(core_model.Policy)
		if !serviceSelectedByTargetRef(spec.GetTargetRef(), tags) {
			continue
		}
		matchedPolicies = append(matchedPolicies, policy)
	}

	sort.Sort(ByTargetRef(matchedPolicies))

	return core_rules.BuildFromRules(map[core_rules.InboundListener][]core_model.Resource{
		{}: matchedPolicies, // egress always has only 1 listener, so we can use empty key
	}, gateways)
}

// It's not possible to directly target egress. But there are situations when we're
// targeting external service in the top target ref, and we need to make adjustments on the Egress, i.e:
//
// type: MeshTrace
// spec:
//
//		targetRef:
//		  kind: MeshService
//	   name: external-service-1
//		default:
//	   backends:
//	     - type: Datadog
//	       datadog:
//	         url: http://trace-svc.default.svc.cluster.local:8126
//	         splitService: true
//
// In this case we need to apply the policy to the Egress. The problem is that Egress is
// a single point for multiple clients. This means we have to specify different configurations
// for different clients. In order to easily get a list of rules for policy on Egress
// we have to convert it to 'from' policy, i.e. the policy above will be converted to artificially
// created policy:
//
// spec:
//
//		targetRef:
//		  kind: MeshService
//		  name: external-service-1
//		from:
//		  - targetRef:
//		      kind: Mesh
//		  default:
//	     backends:
//	       - type: Datadog
//	         datadog:
//	           url: http://trace-svc.default.svc.cluster.local:8126
//	           splitService: true
//
// that's why processSingleRules() method produces FromRules for the Egress.
func processSingleRules(
	tags map[string]string,
	rl core_model.ResourceList,
) (core_rules.FromRules, error) {
	matchedPolicies := []core_model.Resource{}

	for _, policy := range rl.GetItems() {
		spec := policy.GetSpec().(core_model.Policy)
		if !serviceSelectedByTargetRef(spec.GetTargetRef(), tags) {
			continue
		}
		matchedPolicies = append(matchedPolicies, policy)
	}
	sort.Sort(ByTargetRef(matchedPolicies))

	items := []core_rules.PolicyItemWithMeta{}
	for _, mp := range matchedPolicies {
		policyWithSingleItem, ok := mp.GetSpec().(core_model.PolicyWithSingleItem)
		if !ok {
			continue
		}
		item := core_rules.PolicyItemWithMeta{
			PolicyItem:   policyWithSingleItem.GetPolicyItem(),
			ResourceMeta: mp.GetMeta(),
		}
		items = append(items, item)
	}

	// MeshGateway cannot be target for SingleItemRules
	rules, err := core_rules.BuildRules(items, []*core_mesh.MeshGatewayResource{})
	if err != nil {
		return core_rules.FromRules{}, err
	}
	return core_rules.FromRules{Rules: map[core_rules.InboundListener]core_rules.Rules{
		{}: rules,
	}}, nil
}

// It's not natural for zone egress to have 'to' policies. It doesn't make sense to target
// external service in the top-level targetRef and specify 'to' array (simply because we don't
// have access to the external service outbounds). But there are situations when we're
// targeting external service in the 'to' array, and we need to make adjustments on the Egress, i.e:
//
// type: MeshLoadBalancingStrategy
// spec:
//
//	targetRef:
//	  kind: Mesh
//	to:
//	  - targetRef:
//	      kind: MeshService
//	      name: external-service-1
//	    default:
//	      localityAwareness:
//	        disabled: true
//
// In this case we need to apply the policy to the Egress. The problem is that Egress is
// a single point for multiple clients. This means we have to specify different configurations
// for different clients. In order to easily get a list of rules for 'to' policy on Egress
// we have to convert it to 'from' policy, i.e. the policy above will be converted to artificially
// created policy:
//
// spec:
//
//	targetRef:
//	  kind: MeshService
//	  name: external-service-1
//	from:
//	  - targetRef:
//	      kind: Mesh
//	    default:
//	      localityAwareness:
//	        disabled: true
//
// that's why processToRules() method produces FromRules for the Egress.
func processToRules(
	tags map[string]string,
	rl core_model.ResourceList,
) (core_rules.FromRules, error) {
	var matchedPolicies []core_model.Resource

	for _, policy := range rl.GetItems() {
		spec := policy.GetSpec().(core_model.Policy)

		to, ok := spec.(core_model.PolicyWithToList)
		if !ok {
			return core_rules.FromRules{}, nil
		}

		for _, item := range to.GetToList() {
			if serviceSelectedByTargetRef(item.GetTargetRef(), tags) {
				matchedPolicies = append(matchedPolicies, policy)
			}
		}
	}

	sort.Sort(ByTargetRef(matchedPolicies))

	var toList []core_rules.PolicyItemWithMeta
	for _, policy := range matchedPolicies {
		for _, item := range policy.GetSpec().(core_model.PolicyWithToList).GetToList() {
			if !serviceSelectedByTargetRef(item.GetTargetRef(), tags) {
				continue
			}
			// convert 'to' policyItem to 'from' policyItem
			artificial := &artificialPolicyItem{
				conf:      item.GetDefault(),
				targetRef: policy.GetSpec().(core_model.Policy).GetTargetRef(),
			}
			toList = append(toList, core_rules.BuildPolicyItemsWithMeta([]core_model.PolicyItem{artificial},
				policy.GetMeta())...)
		}
	}
	// MeshGateway as a To doesn't make sense so we can pass empty list
	rules, err := core_rules.BuildRules(toList, []*core_mesh.MeshGatewayResource{})
	if err != nil {
		return core_rules.FromRules{}, err
	}

	return core_rules.FromRules{Rules: map[core_rules.InboundListener]core_rules.Rules{
		{}: rules,
	}}, nil
}

type artificialPolicyItem struct {
	conf      interface{}
	targetRef common_api.TargetRef
}

func (a *artificialPolicyItem) GetTargetRef() common_api.TargetRef {
	return a.targetRef
}

func (a *artificialPolicyItem) GetDefault() interface{} {
	return a.conf
}

func serviceSelectedByTargetRef(tr common_api.TargetRef, tags map[string]string) bool {
	switch tr.Kind {
	case common_api.Mesh:
		return true
	case common_api.MeshSubset:
		return mesh_proto.TagSelector(tr.Tags).Matches(tags)
	case common_api.MeshService:
		return tr.Name == tags[mesh_proto.ServiceTag]
	case common_api.MeshServiceSubset:
		return tr.Name == tags[mesh_proto.ServiceTag] && mesh_proto.TagSelector(tr.Tags).Matches(tags)
	}
	return false
}
