package mux

import (
	"context"

	envoy_sd "github.com/envoyproxy/go-control-plane/envoy/service/discovery/v3"
	"google.golang.org/grpc/metadata"
)

type kdsClientStreamV2 struct {
	ctx          context.Context
	bufferStream *bufferStreamClientV2
}

func (k *kdsClientStreamV2) Send(request *envoy_sd.DiscoveryRequest) error {
	err := k.bufferStream.Send(request)
	return err
}

func (k *kdsClientStreamV2) Recv() (*envoy_sd.DiscoveryResponse, error) {
	res, err := k.bufferStream.Recv()
	if err != nil {
		return nil, err
	}
	return res, nil
}

func (k *kdsClientStreamV2) Header() (metadata.MD, error) {
	panic("not implemented")
}

func (k *kdsClientStreamV2) Trailer() metadata.MD {
	panic("not implemented")
}

func (k *kdsClientStreamV2) CloseSend() error {
	panic("not implemented")
}

func (k *kdsClientStreamV2) Context() context.Context {
	return k.ctx
}

func (k *kdsClientStreamV2) SendMsg(m interface{}) error {
	panic("not implemented")
}

func (k *kdsClientStreamV2) RecvMsg(m interface{}) error {
	panic("not implemented")
}
