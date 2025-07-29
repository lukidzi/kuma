package updater

import (
	"context"
	"fmt"
	"reflect"
	"time"

	"github.com/go-logr/logr"
	v1 "k8s.io/apimachinery/pkg/apis/meta/v1"

	common_api "github.com/kumahq/kuma/api/common/v1alpha1"
	"github.com/kumahq/kuma/pkg/core"
	"github.com/kumahq/kuma/pkg/core/kri"
	meshidentity_api "github.com/kumahq/kuma/pkg/core/resources/apis/meshidentity/api/v1alpha1"
	"github.com/kumahq/kuma/pkg/core/resources/apis/meshidentity/providers"
	meshtrust_api "github.com/kumahq/kuma/pkg/core/resources/apis/meshtrust/api/v1alpha1"
	"github.com/kumahq/kuma/pkg/core/resources/manager"
	"github.com/kumahq/kuma/pkg/core/resources/store"
	"github.com/kumahq/kuma/pkg/core/runtime/component"
	"github.com/kumahq/kuma/pkg/core/user"
	"github.com/kumahq/kuma/pkg/events"
	util_tls "github.com/kumahq/kuma/pkg/tls"
	"github.com/kumahq/kuma/pkg/util/pointer"
	mesh_cache "github.com/kumahq/kuma/pkg/xds/cache/mesh"
)

type IdentityProviderReconciler struct {
	roResManager      manager.ReadOnlyResourceManager
	resManager        manager.ResourceManager
	eventFactory      events.ListenerFactory
	logger            logr.Logger
	reconcileInterval time.Duration
	fullSyncInterval  time.Duration
	meshCache         *mesh_cache.Cache
	providers         providers.IdentityProviders
	zone              string
}

var _ component.Component = &IdentityProviderReconciler{}

func New(
	logger logr.Logger,
	reconcileInterval time.Duration,
	fullSyncInterval time.Duration,
	resManager manager.ResourceManager,
	roResManager manager.ReadOnlyResourceManager,
	meshCache *mesh_cache.Cache,
	providers providers.IdentityProviders,
	zone string,
) (*IdentityProviderReconciler, error) {
	return &IdentityProviderReconciler{
		logger:            logger,
		reconcileInterval: reconcileInterval,
		fullSyncInterval:  fullSyncInterval,
		resManager:        resManager,
		roResManager:      roResManager,
		meshCache:         meshCache,
		providers:         providers,
		zone:              zone,
	}, nil
}

func (i *IdentityProviderReconciler) Start(stop <-chan struct{}) error {
	i.logger.Info("starting")
	ticker := time.NewTicker(i.reconcileInterval)
	ctx := user.Ctx(context.Background(), user.ControlPlane)
	// listener := i.eventFactory.Subscribe(func(event events.Event) bool {
	// 	switch ev := event.(type) {
	// 	case events.ResourceChangedEvent:
	// 		return ev.Type == meshidentity_api.MeshIdentityType && ev.Operation == events.Create
	// 	}
	// 	return false
	// })
	for {
		select {
		// full sync if we miss an event
		case <-ticker.C:
			mids := &meshidentity_api.MeshIdentityResourceList{}
			err := i.roResManager.List(ctx, mids, store.ListOrdered())
			if err != nil {
				i.logger.Error(err, "failed to list MeshIdentities")
			}

			trustDomains := map[kri.Identifier]string{}
			for _, mid := range mids.Items {
				var conditions []common_api.Condition
				trustDomain, err := mid.Spec.GetTrustDomain(mid.GetMeta(), i.zone)
				if err != nil {
					conditions = append(conditions, common_api.Condition{
						Type:    common_api.GeneratedCondition,
						Reason:  common_api.TemplateErrorReason,
						Message: err.Error(),
					})
					core.Log.Error(err, "test err")
				}
				trustDomains[kri.From(mid, "")] = trustDomain

				provider, found := i.providers[string(mid.Spec.Provider.Type)]
				if len(conditions) == 0 && !found {
					conditions = append(conditions, common_api.Condition{
						Type:    common_api.GeneratedCondition,
						Reason:  "ProviderNotFoundError",
						Status: v1.ConditionFalse,
						Message: fmt.Sprintf("provider: %s not found", mid.Spec.Provider.Type),
					})
				}
				// initialize only when trust domain is different
				if len(conditions) == 0 && mid.Status.TrustDomain == "" {
					err := provider.Initialize(ctx, mid, trustDomain)
					if err != nil {
						conditions = append(conditions, common_api.Condition{
							Type:    common_api.GeneratedCondition,
							Reason:  "InitializationError",
							Status: v1.ConditionFalse,
							Message: err.Error(),
						})
						core.Log.Error(err, "test err")
					}
				}
				if err := provider.Validate(ctx, mid); len(conditions) == 0 && err != nil {
					conditions = append(conditions, common_api.Condition{
						Type:    common_api.GeneratedCondition,
						Reason:  "ValidationError",
						Status: v1.ConditionFalse,
						Message: err.Error(),
					})
					core.Log.Error(err, "test err")
				}

				// TODO: validate trust domain conflict

				if err := i.createOrUpdateMeshTrust(ctx, mid, trustDomain); len(conditions) == 0 && err != nil {
					conditions = append(conditions, common_api.Condition{
						Type:    common_api.GeneratedCondition,
						Reason:  "TrustGenerationError",
						Status: v1.ConditionFalse,
						Message: err.Error(),
					})
					core.Log.Error(err, "test err")
				}
				if len(conditions) == 0 {
					conditions = append(conditions, common_api.Condition{
						Type:   common_api.GeneratedCondition,
						Status: v1.ConditionTrue,
						Reason: common_api.GeneratedReason,
					})
				}
				if mid.Status == nil {
					mid.Status = &meshidentity_api.MeshIdentityStatus{}
				}
				update := false
				if !reflect.DeepEqual(conditions, mid.Status.Conditions) {
					update = true
					mid.Status.Conditions = conditions
				}
				if !reflect.DeepEqual(trustDomain, mid.Status.TrustDomain) {
					update = true
					mid.Status.TrustDomain = trustDomain
				}
				if update {
					if err := i.resManager.Update(ctx, mid); err != nil {
						core.Log.Error(err, "test err")
						continue
					}
				}
			}

		// we want to process create only here
		// case event, ok := <-listener.Recv():
		// 	if !ok {
		// 		return errors.New("end of events channel")
		// 	}
		// 	if resourceChanged, ok := event.(events.ResourceChangedEvent); ok {
		// 		if err := i.generateMeshTrust(ctx, resourceChanged); err != nil {
		// 			i.logger.Error(err, "failed to generate a MeshTrust", "resourceKey", resourceChanged.Key)
		// 		}
		// 	}
		case <-stop:
			i.logger.Info("stopping")
			return nil
		}
	}
}

func (i *IdentityProviderReconciler) createOrUpdateMeshTrust(ctx context.Context, identity *meshidentity_api.MeshIdentityResource, trustDomain string) error {
	mtrust := meshtrust_api.NewMeshTrustResource()
	update := true
	if err := i.roResManager.Get(ctx, mtrust, store.GetByKey(identity.Meta.GetName(), identity.Meta.GetMesh())); err != nil && store.IsNotFound(err) {
		update = false
	} else {
		return err
	}

	mesh := identity.Meta.GetMesh()

	ca, err := i.loadCA(ctx, identity, mesh)
	if err != nil {
		return nil
	}
	origin := kri.From(identity, "").String()
	if update {
		found := false
		for _, bundle := range mtrust.Spec.CABundles {
			if bundle.Pem.Value == string(ca.CertPEM) {
				found = true
			}
		}
		if !found {
			mtrust.Spec.CABundles = append(mtrust.Spec.CABundles, meshtrust_api.CABundle{
				Type: meshtrust_api.PemCABundleType,
				Pem: &meshtrust_api.Pem{
					Value: string(ca.CertPEM),
				},
			})
			if err := i.resManager.Update(ctx, mtrust); err != nil {
				return err
			}
		}
	} else {
		mtrust.Spec = &meshtrust_api.MeshTrust{
			Origin: &meshtrust_api.Origin{
				KRI: pointer.To(origin),
			},
			TrustDomain: trustDomain,
			CABundles: []meshtrust_api.CABundle{
				{
					Type: meshtrust_api.PemCABundleType,
					Pem: &meshtrust_api.Pem{
						Value: string(ca.CertPEM),
					},
				},
			},
		}
		if err := i.resManager.Create(ctx, mtrust, store.CreateByKey(identity.Meta.GetName(), mesh)); err != nil {
			return err
		}
	}

	return nil
}

func (i *IdentityProviderReconciler) loadCA(ctx context.Context, identity *meshidentity_api.MeshIdentityResource, mesh string) (*util_tls.KeyPair, error) {
	provider, found := i.providers[string(identity.Spec.Provider.Type)]
	if !found {
		return nil, fmt.Errorf("provider: %s not found", identity.Spec.Provider.Type)
	}
	return provider.GetCAKeyPair(ctx, identity, mesh)
}

func (i *IdentityProviderReconciler) NeedLeaderElection() bool {
	return true
}
