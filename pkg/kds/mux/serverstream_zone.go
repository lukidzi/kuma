package mux

import (
	"context"

	envoy_sd "github.com/envoyproxy/go-control-plane/envoy/service/discovery/v3"
	"google.golang.org/grpc/metadata"
)

type kdsServerStreamZone struct {
	ctx          context.Context
	bufferStream *bufferStreamZone
}

func (k *kdsServerStreamZone) Send(response *envoy_sd.DeltaDiscoveryRequest) error {
	// err := k.bufferStream.Send(response)
	// return err
	return nil
}

func (k *kdsServerStreamZone) Recv() (*envoy_sd.DeltaDiscoveryResponse, error) {
	// res, err := k.bufferStream.Recv()
	// if err != nil {
	// 	return nil, err
	// }
	// return res, nil
	return nil, nil
}

func (k *kdsServerStreamZone) SetHeader(metadata.MD) error {
	panic("not implemented")
}

func (k *kdsServerStreamZone) SendHeader(metadata.MD) error {
	panic("not implemented")
}

func (k *kdsServerStreamZone) SetTrailer(metadata.MD) {
	panic("not implemented")
}

func (k *kdsServerStreamZone) Context() context.Context {
	return k.ctx
}

func (k *kdsServerStreamZone) SendMsg(m interface{}) error {
	panic("not implemented")
}

func (k *kdsServerStreamZone) RecvMsg(m interface{}) error {
	panic("not implemented")
}
