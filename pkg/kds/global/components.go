package global

import (
	"context"
	"fmt"
	"strings"

	"github.com/go-logr/logr"
	"github.com/pkg/errors"

	mesh_proto "github.com/kumahq/kuma/api/mesh/v1alpha1"
	system_proto "github.com/kumahq/kuma/api/system/v1alpha1"
	config_core "github.com/kumahq/kuma/pkg/config/core"
	store_config "github.com/kumahq/kuma/pkg/config/core/resources/store"
	"github.com/kumahq/kuma/pkg/core"
	core_mesh "github.com/kumahq/kuma/pkg/core/resources/apis/mesh"
	"github.com/kumahq/kuma/pkg/core/resources/apis/system"
	core_manager "github.com/kumahq/kuma/pkg/core/resources/manager"
	"github.com/kumahq/kuma/pkg/core/resources/model"
	"github.com/kumahq/kuma/pkg/core/resources/registry"
	"github.com/kumahq/kuma/pkg/core/resources/store"
	"github.com/kumahq/kuma/pkg/core/runtime"
	"github.com/kumahq/kuma/pkg/core/user"
	"github.com/kumahq/kuma/pkg/kds/client"
	"github.com/kumahq/kuma/pkg/kds/mux"
	kds_server "github.com/kumahq/kuma/pkg/kds/server"
	"github.com/kumahq/kuma/pkg/kds/service"
	sync_store "github.com/kumahq/kuma/pkg/kds/store"
	"github.com/kumahq/kuma/pkg/kds/util"
	kds_client_v2 "github.com/kumahq/kuma/pkg/kds/v2/client"
	kds_server_v2 "github.com/kumahq/kuma/pkg/kds/v2/server"
	kds_sync_store_v2 "github.com/kumahq/kuma/pkg/kds/v2/store"
	resources_k8s "github.com/kumahq/kuma/pkg/plugins/resources/k8s"
	k8s_model "github.com/kumahq/kuma/pkg/plugins/resources/k8s/native/pkg/model"
	util_proto "github.com/kumahq/kuma/pkg/util/proto"
)

var (
	kdsGlobalLog      = core.Log.WithName("kds-global")
	kdsDeltaGlobalLog = core.Log.WithName("kds-delta-global")
)

func Setup(rt runtime.Runtime) error {
	var err error
	if rt.Config().Mode != config_core.Global {
		// Only run on global
		return nil
	}
	reg := registry.Global()
	kdsServer, err := kds_server.New(
		kdsGlobalLog,
		rt,
		reg.ObjectTypes(model.HasKDSFlag(model.ProvidedByGlobal)),
		"global",
		rt.Config().Multizone.Global.KDS.RefreshInterval.Duration,
		rt.KDSContext().GlobalProvidedFilter,
		rt.KDSContext().GlobalResourceMapper,
		true,
		rt.Config().Multizone.Global.KDS.NackBackoff.Duration,
	)
	if err != nil {
		return err
	}

	kdsServerV2, err := kds_server_v2.New(
		kdsDeltaGlobalLog,
		rt,
		reg.ObjectTypes(model.HasKDSFlag(model.ProvidedByGlobal)),
		"global",
		rt.Config().Multizone.Global.KDS.RefreshInterval.Duration,
		rt.KDSContext().GlobalProvidedFilter,
		rt.KDSContext().GlobalResourceMapper,
		true,
		rt.Config().Multizone.Global.KDS.NackBackoff.Duration,
	)
	if err != nil {
		return err
	}

	resourceSyncer := sync_store.NewResourceSyncer(kdsGlobalLog, rt.ResourceStore())
	resourceSyncerV2 := kds_sync_store_v2.NewResourceSyncer(kdsDeltaGlobalLog, rt.ResourceStore())
	kubeFactory := resources_k8s.NewSimpleKubeFactory()
	onSessionStarted := mux.OnSessionStartedFunc(func(session mux.Session) error {
		log := kdsGlobalLog.WithValues("peer-id", session.PeerID())
		log.Info("new session created")
		go func() {
			if err := kdsServer.StreamKumaResources(session.ServerStream()); err != nil {
				log.Error(err, "StreamKumaResources finished with an error")
			} else {
				log.V(1).Info("StreamKumaResources finished gracefully")
			}
		}()
		kdsStream := client.NewKDSStream(session.ClientStream(), session.PeerID(), "") // we only care about Zone CP config. Zone CP should not receive Global CP config.
		if err := createZoneIfAbsent(log, session.PeerID(), rt.ResourceManager()); err != nil {
			log.Error(err, "Global CP could not create a zone")
			return errors.New("Global CP could not create a zone") // send back message without details. Zone CP will retry
		}
		sink := client.NewKDSSink(log, reg.ObjectTypes(model.HasKDSFlag(model.ConsumedByGlobal)), kdsStream, Callbacks(resourceSyncer, rt.Config().Store.Type == store_config.KubernetesStore, kubeFactory))
		go func() {
			if err := sink.Receive(); err != nil {
				log.Error(err, "KDSSink finished with an error")
			} else {
				log.V(1).Info("KDSSink finished gracefully")
			}
		}()
		return nil
	})

	onGlobalToZoneSyncConnect := mux.OnGlobalToZoneSyncConnectFunc(func(stream mesh_proto.KDSSyncService_GlobalToZoneSyncServer, errChan chan error) {
		clientId, err := util.ClientIDFromIncomingCtx(stream.Context())
		if err != nil {
			errChan <- err
		}
		log := kdsDeltaGlobalLog.WithValues("peer-id", clientId)
		log.Info("Global To Zone new session created")
		if err := createZoneIfAbsent(log, clientId, rt.ResourceManager()); err != nil {
			errChan <- errors.Wrap(err, "Global CP could not create a zone")
		}
		if err := kdsServerV2.GlobalToZoneSync(stream); err != nil {
			errChan <- err
		} else {
			log.V(1).Info("GlobalToZoneSync finished gracefully")
		}
	})

	onZoneToGlobalSyncConnect := mux.OnZoneToGlobalSyncConnectFunc(func(stream mesh_proto.KDSSyncService_ZoneToGlobalSyncServer, errChan chan error) {
		clientId, err := util.ClientIDFromIncomingCtx(stream.Context())
		if err != nil {
			errChan <- err
		}
		log := kdsDeltaGlobalLog.WithValues("peer-id", clientId)
		kdsStream := kds_client_v2.NewDeltaKDSStream(stream, clientId, "")
		sink := kds_client_v2.NewKDSSyncClient(log, reg.ObjectTypes(model.HasKDSFlag(model.ConsumedByGlobal)), kdsStream,
			kds_sync_store_v2.GlobalSyncCallback(resourceSyncerV2, rt.Config().Store.Type == store_config.KubernetesStore, kubeFactory, rt.Config().Store.Kubernetes.SystemNamespace))
		go func() {
			if err := sink.Receive(); err != nil {
				errChan <- errors.Wrap(err, "KDSSyncClient finished with an error")
			} else {
				log.V(1).Info("KDSSyncClient finished gracefully")
			}
		}()
	})
	return rt.Add(mux.NewServer(
		onSessionStarted,
		rt.KDSContext().GlobalServerFilters,
		*rt.Config().Multizone.Global.KDS,
		rt.Metrics(),
		service.NewGlobalKDSServiceServer(rt.KDSContext().EnvoyAdminRPCs),
		mux.NewKDSSyncServiceServer(
			onGlobalToZoneSyncConnect,
			onZoneToGlobalSyncConnect,
			rt.KDSContext().GlobalServerFiltersV2,
		),
	))
}

func createZoneIfAbsent(log logr.Logger, name string, resManager core_manager.ResourceManager) error {
	ctx := user.Ctx(context.Background(), user.ControlPlane)
	if err := resManager.Get(ctx, system.NewZoneResource(), store.GetByKey(name, model.NoMesh)); err != nil {
		if !store.IsResourceNotFound(err) {
			return err
		}
		log.Info("creating Zone", "name", name)
		zone := &system.ZoneResource{
			Spec: &system_proto.Zone{
				Enabled: util_proto.Bool(true),
			},
		}
		if err := resManager.Create(ctx, zone, store.CreateByKey(name, model.NoMesh)); err != nil {
			return err
		}
	}
	return nil
}

func Callbacks(s sync_store.ResourceSyncer, k8sStore bool, kubeFactory resources_k8s.KubeFactory) *client.Callbacks {
	return &client.Callbacks{
		OnResourcesReceived: func(clusterName string, rs model.ResourceList) error {
			util.AddPrefixToNames(rs.GetItems(), clusterName)
			if k8sStore {
				// if type of Store is Kubernetes then we want to store upstream resources in dedicated Namespace.
				// KubernetesStore parses Name and considers substring after the last dot as a Namespace's Name.
				kubeObject, err := kubeFactory.NewObject(rs.NewItem())
				if err != nil {
					return errors.Wrap(err, "could not convert object")
				}
				if kubeObject.Scope() == k8s_model.ScopeNamespace {
					util.AddSuffixToNames(rs.GetItems(), "default")
				}
			}

			if rs.GetItemType() == core_mesh.ZoneIngressType {
				for _, zi := range rs.(*core_mesh.ZoneIngressResourceList).Items {
					zi.Spec.Zone = clusterName
				}
			} else if rs.GetItemType() == core_mesh.ZoneEgressType {
				for _, ze := range rs.(*core_mesh.ZoneEgressResourceList).Items {
					ze.Spec.Zone = clusterName
				}
			}

			return s.Sync(rs, sync_store.PrefilterBy(func(r model.Resource) bool {
				return strings.HasPrefix(r.GetMeta().GetName(), fmt.Sprintf("%s.", clusterName))
			}), sync_store.Zone(clusterName))
		},
	}
}
