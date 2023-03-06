package mux

import (
	"context"
	"io"
	"sync"
	"time"

	"github.com/pkg/errors"

	envoy_sd "github.com/envoyproxy/go-control-plane/envoy/service/discovery/v3"
	mesh_proto "github.com/kumahq/kuma/api/mesh/v1alpha1"
	"github.com/kumahq/kuma/pkg/core"
)

type SessionClientV2 interface {
	ClientStream() mesh_proto.KDSSyncService_GlobalToZoneSyncClient
	PeerID() string
	Error() <-chan error
}

type sessionClientV2 struct {
	peerID       string
	clientStream *kdsClientStreamV2

	err       chan error
	sync.Once // protects err, so we only send the first error and close the channel
}

type KDSSyncStreamClient interface {
	Send(*envoy_sd.DiscoveryRequest) error
	Recv() (*envoy_sd.DiscoveryResponse, error)
	Context() context.Context
}

// NewSession creates a multiplexed session for KDS so both CP sends and receives resources.
//
// Buffer settings recommendations:
// The buffer size should be of a size of all inflight request, so we are never blocked on the buffer channels.
// The buffer is separate for each direction (send/receive) on each multiplexed stream (ex. global acting as server/global acting as client).
// The maximum number of inflight requests are the number of synced resources, because:
//   - A CP never sends multiple DiscoveryRequests for one resource type.
//   - A CP never sends multiple DiscoveryResponses for one resource type (it waits until peer answers with ACK/NACK for the previous number)
//
// We could carefully count which resources are synced each way,
// but for the simplicity it's recommended to a set a buffer to number of resources in CP leaving a bit of buffer for resources unknown to the other side.
func NewClientSessionV2(peerID string, stream KDSSyncStreamClient, bufferSize uint32, sendTimeout time.Duration) SessionClientV2 {
	s := &sessionClientV2{
		peerID: peerID,
		err:    make(chan error),
		clientStream: &kdsClientStreamV2{
			ctx:          stream.Context(),
			bufferStream: newBufferStreamClientV2(bufferSize),
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

// handleRecv polls to receive messages from the KDSStream (the actual grpc bidi-stream).
// Depending on the message it dispatches to either the server receive buffer or the client receive buffer.
// It also closes both streams when an error on the recv side happens.
// We can rely on an error on recv to end the session because we're sure an error on recv will always happen, it might be io.EOF if we're just done.
func (s *sessionClientV2) handleRecv(stream KDSSyncStreamClient) {
	for {
		msg, err := stream.Recv()
		core.Log.Info("HANDLE RECV", "msg", msg)
		if err != nil {
			s.clientStream.bufferStream.close()
			// Recv always finishes with either an EOF or another error
			s.setError(err)
			return
		}
		// We can safely not care about locking as we're only closing the channel from this goroutine.
		s.clientStream.bufferStream.recvBuffer <- msg
	}
}

// handleSend polls either sendBuffer and call send on the KDSStream (the actual grpc bidi-stream).
// This call is stopped whenever either of the sendBuffer are closed (in practice they are always closed together anyway).
func (s *sessionClientV2) handleSend(stream KDSSyncStreamClient, sendTimeout time.Duration) {
	for {
		var msgToSend *envoy_sd.DiscoveryRequest
		msg, more := <-s.clientStream.bufferStream.sendBuffer
		if !more {
			return
		}
		msgToSend = msg
		core.Log.Info("HANDLE SEND", "msg", msgToSend)
		ctx, cancel := context.WithTimeout(context.Background(), sendTimeout)
		go func() {
			<-ctx.Done()
			if ctx.Err() == context.DeadlineExceeded {
				// This is very unlikely to happen, but it was introduced as a last resort protection from a gRPC streaming deadlock.
				// gRPC streaming deadlock may happen if both peers are stuck on Send() operation without calling Recv() often enough.
				// In this case, if data is big enough, both parties may wait for WINDOW_UPDATE on HTTP/2 stream.
				// We fixed the deadlock by increasing buffer size which is larger that all possible inflight request.
				// If the connection is broken and send is stuck, it's more likely for gRPC keep alive to catch such case.
				// If you still hit the timeout without deadlock, you may increase it. However, there are two possible scenarios
				// 1) This is a malicious client reading stream byte by byte. In this case it's actually better to end the stream
				// 2) A client is such overwhelmed that it cannot even let the server know that it's ready to receive more data.
				//    In this case it's recommended to scale number of instances.
				s.setError(errors.New("timeout while sending a message to peer"))
			}
		}()
		if err := stream.Send(msgToSend); err != nil {
			s.setError(err)
			cancel()
			return
		}
		cancel()
	}
}

func (s *sessionClientV2) setError(err error) {
	// execute this once so writers to this channel won't be stuck or trying to write to a close channel
	// We only care about the first error, because it results in broken session anyway.
	s.Once.Do(func() {
		s.err <- err
		close(s.err)
	})
}

func (s *sessionClientV2) ClientStream() mesh_proto.KDSSyncService_GlobalToZoneSyncClient {
	return s.clientStream
}

func (s *sessionClientV2) PeerID() string {
	return s.peerID
}

func (s *sessionClientV2) Error() <-chan error {
	return s.err
}

type bufferStreamClientV2 struct {
	sendBuffer chan *envoy_sd.DiscoveryRequest
	recvBuffer chan *envoy_sd.DiscoveryResponse

	// Protects the send-buffer against writing on a closed channel, this is needed as we don't control in which goroutine `Send` will be called.
	lock   sync.Mutex
	closed bool
}

func newBufferStreamClientV2(bufferSize uint32) *bufferStreamClientV2 {
	return &bufferStreamClientV2{
		sendBuffer: make(chan *envoy_sd.DiscoveryRequest, bufferSize),
		recvBuffer: make(chan *envoy_sd.DiscoveryResponse, bufferSize),
	}
}

func (k *bufferStreamClientV2) Send(message *envoy_sd.DiscoveryRequest) error {
	k.lock.Lock()
	defer k.lock.Unlock()
	core.Log.Info("SENDDDDD")
	if k.closed {
		return io.EOF
	}
	k.sendBuffer <- message
	return nil
}

func (k *bufferStreamClientV2) Recv() (*envoy_sd.DiscoveryResponse, error) {

	core.Log.Info("RECVVVVVV")
	r, more := <-k.recvBuffer
	if !more {
		return nil, io.EOF
	}
	return r, nil
}

func (k *bufferStreamClientV2) close() {
	k.lock.Lock()
	defer k.lock.Unlock()

	k.closed = true
	close(k.sendBuffer)
	close(k.recvBuffer)
}
