package mux

import (
	"context"

	envoy_sd "github.com/envoyproxy/go-control-plane/envoy/service/discovery/v3"
	"google.golang.org/grpc/metadata"
)

type kdsServerStreamV2 struct {
	ctx          context.Context
	bufferStream *bufferStreamV2
}

func (k *kdsServerStreamV2) Send(response *envoy_sd.DiscoveryResponse) error {
	err := k.bufferStream.Send(response)
	return err
}

func (k *kdsServerStreamV2) Recv() (*envoy_sd.DiscoveryRequest, error) {
	res, err := k.bufferStream.Recv()
	if err != nil {
		return nil, err
	}
	return res, nil
}

func (k *kdsServerStreamV2) SetHeader(metadata.MD) error {
	panic("not implemented")
}

func (k *kdsServerStreamV2) SendHeader(metadata.MD) error {
	panic("not implemented")
}

func (k *kdsServerStreamV2) SetTrailer(metadata.MD) {
	panic("not implemented")
}

func (k *kdsServerStreamV2) Context() context.Context {
	return k.ctx
}

func (k *kdsServerStreamV2) SendMsg(m interface{}) error {
	panic("not implemented")
}

func (k *kdsServerStreamV2) RecvMsg(m interface{}) error {
	panic("not implemented")
}
