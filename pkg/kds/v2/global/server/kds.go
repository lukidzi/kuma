package server

import (
	"context"
	"sync"

	envoy_sd "github.com/envoyproxy/go-control-plane/envoy/service/discovery/v3"
	envoy_cache "github.com/envoyproxy/go-control-plane/pkg/cache/v3"
	"github.com/envoyproxy/go-control-plane/pkg/server/delta/v3"
	envoy_server "github.com/envoyproxy/go-control-plane/pkg/server/v3"
	"github.com/go-logr/logr"

	mesh_proto "github.com/kumahq/kuma/api/mesh/v1alpha1"
)

type Server interface {
	mesh_proto.KDSSyncServiceServer
}

func NewServer(config envoy_cache.Cache, callbacks envoy_server.Callbacks, log logr.Logger) Server {
	deltaServer := delta.NewServer(context.Background(), config, callbacks)
	return &server{Server: deltaServer}
}

var _ Server = &server{}

type server struct {
	delta.Server
	mesh_proto.UnimplementedKDSSyncServiceServer
}

func (s *server) GlobalToZoneSync(stream mesh_proto.KDSSyncService_GlobalToZoneSyncServer) error {
	return s.Server.DeltaStreamHandler(stream, "")
}

func (s *server) ZoneToGlobalSync(stream mesh_proto.KDSSyncService_ZoneToGlobalSyncServer) error {
	return s.Server.DeltaStreamHandler(NewZoneSession(stream).ServerStream(), "")
}

type SessionZone interface {
	ServerStream() mesh_proto.KDSSyncService_ZoneToGlobalSyncServer
	ClientStream() mesh_proto.KDSSyncService_ZoneToGlobalSyncClient
	PeerID() string
	Error() <-chan error
}

type sessionZone struct {
	serverStream *kdsServerStreamZone
	clientStream *kdsClientStreamZone

	err       chan error
	sync.Once // protects err, so we only send the first error and close the channel
}

type ZoneStream interface {
	Send(*envoy_sd.DeltaDiscoveryResponse) error
	Recv() (*envoy_sd.DeltaDiscoveryRequest, error)
	Context() context.Context
}

func NewZoneSession(stream ZoneStream) SessionZone {
	s := &sessionZone{
		serverStream: &kdsServerStreamZone{
			ctx:          stream.Context(),
			bufferStream: newBufferStreamZone(bufferSize),
		},
		clientStream: &kdsClientStreamZone{
			ctx:          stream.Context(),
			bufferStream: newBufferStreamZone(bufferSize),
		},
	}
	go func() {
		s.handleSend(stream, sendTimeout)
	}()
	go func() {
		s.handleRecv(stream)
	}()
	return s
}