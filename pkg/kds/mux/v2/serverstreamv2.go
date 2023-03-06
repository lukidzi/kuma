package mux

import (
	"context"
	"io"
	"sync"

	envoy_sd "github.com/envoyproxy/go-control-plane/envoy/service/discovery/v3"
	"github.com/kumahq/kuma/pkg/core"
	"google.golang.org/grpc/metadata"
)

type kdsServerStreamV2 struct {
	ctx          context.Context
	sendBuffer chan *envoy_sd.DiscoveryResponse
	recvBuffer chan *envoy_sd.DiscoveryRequest

	// Protects the send-buffer against writing on a closed channel, this is needed as we don't control in which goroutine `Send` will be called.
	lock   sync.Mutex
	closed bool
}

func (k *kdsServerStreamV2) Send(response *envoy_sd.DiscoveryResponse) error {
	k.lock.Lock()
	defer k.lock.Unlock()
	core.Log.Info("SENDDDDD")
	if k.closed {
		return io.EOF
	}
	k.sendBuffer <- response
	return nil
}

func (k *kdsServerStreamV2) Recv() (*envoy_sd.DiscoveryRequest, error) {
	r, more := <-k.recvBuffer
	if !more {
		return nil, io.EOF
	}
	return r, nil
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

func (k *kdsServerStreamV2) close() {
	k.lock.Lock()
	defer k.lock.Unlock()

	k.closed = true
	close(k.sendBuffer)
	close(k.recvBuffer)
}