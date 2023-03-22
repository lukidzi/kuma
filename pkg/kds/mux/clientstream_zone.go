package mux

import (
	"context"

	envoy_sd "github.com/envoyproxy/go-control-plane/envoy/service/discovery/v3"
	"google.golang.org/grpc/metadata"
)

type kdsClientStreamZone struct {
	ctx          context.Context
	bufferStream *bufferStreamZone
}

func (k *kdsClientStreamZone) Send(request *envoy_sd.DeltaDiscoveryResponse) error {
	// err := k.bufferStream.Send(&mesh_proto.Message{Value: &mesh_proto.Message_Request{Request: request}})
	// return err
	return nil
}

func (k *kdsClientStreamZone) Recv() (*envoy_sd.DeltaDiscoveryRequest, error) {
	// res, err := k.bufferStream.Recv()
	// if err != nil {
	// 	return nil, err
	// }
	// return res.GetResponse(), nil
	return nil, nil
}

func (k *kdsClientStreamZone) Header() (metadata.MD, error) {
	panic("not implemented")
}

func (k *kdsClientStreamZone) Trailer() metadata.MD {
	panic("not implemented")
}

func (k *kdsClientStreamZone) CloseSend() error {
	panic("not implemented")
}

func (k *kdsClientStreamZone) Context() context.Context {
	return k.ctx
}

func (k *kdsClientStreamZone) SendMsg(m interface{}) error {
	panic("not implemented")
}

func (k *kdsClientStreamZone) RecvMsg(m interface{}) error {
	panic("not implemented")
}
