package v2

import (
	"time"

	mesh_proto "github.com/kumahq/kuma/api/mesh/v1alpha1"
	"github.com/kumahq/kuma/pkg/core"
	"github.com/kumahq/kuma/pkg/core/resources/registry"
	mux_v2 "github.com/kumahq/kuma/pkg/kds/mux/v2"
	"github.com/kumahq/kuma/pkg/kds/util"
)

////
type CallbacksGlobal interface {
	OnGlobalToZoneConnect(session mux_v2.SessionV2) error
}

type OnGlobalToZoneConnectFunc func(session mux_v2.SessionV2) error

func (f OnGlobalToZoneConnectFunc) OnGlobalToZoneConnect(session mux_v2.SessionV2) error {
	return f(session)
}

var log = core.Log.WithName("test")
type KDSSyncServiceServer struct {
	timeout time.Duration
	callback CallbacksGlobal
	mesh_proto.UnimplementedKDSSyncServiceServer
}

func NewKDSSyncServiceServer(callback CallbacksGlobal, timeout time.Duration) *KDSSyncServiceServer {
	return &KDSSyncServiceServer{
		callback: callback,
		timeout: timeout,
	}
}

var _ mesh_proto.KDSSyncServiceServer = &KDSSyncServiceServer{}

func (g *KDSSyncServiceServer) GlobalToZoneSync(stream mesh_proto.KDSSyncService_GlobalToZoneSyncServer) error {
	clientID, err := util.ClientIDFromIncomingCtx(stream.Context())
	if err != nil {
		return err
	}

	bufferSize := len(registry.Global().ObjectTypes())
	session := mux_v2.NewSessionV2(clientID, stream, uint32(bufferSize), g.timeout)
	if err := g.callback.OnGlobalToZoneConnect(session); err != nil {
		log.Error(err, "closing KDS stream following a callback error")
		return err
	}
	err = <-session.Error()
	log.Info("KDS stream is closed", "reason", err.Error())
	return nil
}