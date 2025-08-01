package providers

import (
	"context"
	"fmt"

	"github.com/go-logr/logr"

	"github.com/kumahq/kuma/pkg/core"
	core_mesh "github.com/kumahq/kuma/pkg/core/resources/apis/mesh"
	meshidentity_api "github.com/kumahq/kuma/pkg/core/resources/apis/meshidentity/api/v1alpha1"
	"github.com/kumahq/kuma/pkg/core/resources/model"
	"github.com/kumahq/kuma/pkg/events"
)

type IdentityProviderManager struct {
	logger      logr.Logger
	eventWriter events.Emitter
	providers   IdentityProviders
	zone        string
}

func NewIdentityProviderManager(providers IdentityProviders, eventWriter events.Emitter, zone string) IdentityProviderManager {
	logger := core.Log.WithName("identity-provider")
	return IdentityProviderManager{
		logger:      logger,
		eventWriter: eventWriter,
		providers:   providers,
		zone:        zone,
	}
}

func (i *IdentityProviderManager) SelectedIdentity(dataplane *core_mesh.DataplaneResource, identities []*meshidentity_api.MeshIdentityResource) *meshidentity_api.MeshIdentityResource {
	identity, found := meshidentity_api.Matched(dataplane.Meta.GetLabels(), identities)
	if !found {
		return nil
	}
	return identity
}

func (i *IdentityProviderManager) GetWorkloadIdentity(ctx context.Context, dataplane *core_mesh.DataplaneResource, identity *meshidentity_api.MeshIdentityResource) (*WorkloadIdentity, error) {
	if identity == nil {
		i.eventWriter.Send(events.WorkloadIdentityChangedEvent{
			ResourceKey: model.MetaToResourceKey(dataplane.GetMeta()),
			Operation:   events.Delete,
		})
		return nil, nil
	}

	if !identity.Status.IsInitialized() {
		i.logger.V(1).Info("identity hasn't been initialized yet", "identity", identity.Meta.GetName())
		return nil, nil
	}
	i.logger.V(1).Info("providing identity", "identity", identity.Meta.GetName(), "dataplane", dataplane.Meta.GetName())
	provider, found := i.providers[string(identity.Spec.Provider.Type)]
	if !found {
		return nil, fmt.Errorf("identity provider %s not found", identity.Spec.Provider.Type)
	}

	trustDomain, err := identity.Spec.GetTrustDomain(dataplane.GetMeta(), i.zone)
	if err != nil {
		return nil, err
	}
	workloadIdentity, err := provider.CreateIdentity(ctx, identity, dataplane.Meta, trustDomain)
	if err != nil {
		return nil, err
	}
	// TODO: should we send it after the config is reconciled?
	i.eventWriter.Send(events.WorkloadIdentityChangedEvent{
		ResourceKey:    model.MetaToResourceKey(dataplane.GetMeta()),
		Operation:      events.Create,
		GenerationTime: workloadIdentity.GenerationTime,
		ExpirationTime: workloadIdentity.ExpirationTime,
		Origin:         workloadIdentity.KRI,
	})
	return workloadIdentity, nil
}
