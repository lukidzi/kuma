package server

import (
	"context"

	envoy_cache "github.com/envoyproxy/go-control-plane/pkg/cache/v3"
	"github.com/envoyproxy/go-control-plane/pkg/server/sotw/v3"
	envoy_server "github.com/envoyproxy/go-control-plane/pkg/server/v3"
	"github.com/go-logr/logr"

	mesh_proto "github.com/kumahq/kuma/api/mesh/v1alpha1"
)


type ServerV2 interface {
	mesh_proto.KDSSyncServiceServer
}

func NewServerV2(config envoy_cache.Cache, callbacks envoy_server.Callbacks, log logr.Logger) ServerV2 {
	sotwServer := sotw.NewServer(context.Background(), config, callbacks)
	return &serverV2{Server: sotwServer}
}

var _ ServerV2 = &serverV2{}

type serverV2 struct {
	sotw.Server
	mesh_proto.UnimplementedKDSSyncServiceServer
}

func (s *serverV2) GlobalToZoneSync(stream mesh_proto.KDSSyncService_GlobalToZoneSyncServer) error {
	return s.Server.StreamHandler(stream, "")
}
