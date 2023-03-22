package v2

import (
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	mesh_proto "github.com/kumahq/kuma/api/mesh/v1alpha1"
	"github.com/kumahq/kuma/pkg/core"
)

type Filter interface {
	InterceptServerStream(stream grpc.ServerStream) error
	InterceptClientStream(stream grpc.ClientStream) error
}

type Callbacks interface {
	OnGlobalToZoneSyncConnect(stream mesh_proto.KDSSyncService_GlobalToZoneSyncServer, errorCh chan error)
}

type OnGlobalToZoneSyncConnectFunc func(stream mesh_proto.KDSSyncService_GlobalToZoneSyncServer, errorCh chan error)

func (f OnGlobalToZoneSyncConnectFunc) OnGlobalToZoneSyncConnect(stream mesh_proto.KDSSyncService_GlobalToZoneSyncServer, errorCh chan error) {
	f(stream, errorCh)
}

var clientLog = core.Log.WithName("kds-delta-client")

type KDSSyncServiceServer struct {
	callback Callbacks
	filters  []Filter
	mesh_proto.UnimplementedKDSSyncServiceServer
}

func NewKDSSyncServiceServer(callback Callbacks, filters []Filter) *KDSSyncServiceServer {
	return &KDSSyncServiceServer{
		callback: callback,
		filters:  filters,
	}
}

var _ mesh_proto.KDSSyncServiceServer = &KDSSyncServiceServer{}

func (g *KDSSyncServiceServer) GlobalToZoneSync(stream mesh_proto.KDSSyncService_GlobalToZoneSyncServer) error {
	for _, filter := range g.filters {
		if err := filter.InterceptServerStream(stream); err != nil {
			clientLog.Error(err, "closing KDS stream following a callback error")
			return err
		}
	}
	processingErrorsCh := make(chan error)
	go g.callback.OnGlobalToZoneSyncConnect(stream, processingErrorsCh)
	select {
	case <-stream.Context().Done():
		clientLog.Info("GlobalToZoneSync rpc stream stopped")
		return nil
	case err := <-processingErrorsCh:
		if status.Code(err) == codes.Unimplemented {
			clientLog.Error(err, "GlobalToZoneSync rpc stream failed, because Global CP does not implement this rpc. Upgrade Global CP.")
			return err
		}
		clientLog.Error(err, "GlobalToZoneSync rpc stream failed prematurely, will restart in background")
		return err
	}
}