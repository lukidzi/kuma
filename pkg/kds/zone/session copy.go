package zone

import (
	"context"
	"io"
	"sync"
	"time"

	envoy_sd "github.com/envoyproxy/go-control-plane/envoy/service/discovery/v3"
	"github.com/envoyproxy/go-control-plane/pkg/server/stream/v3"
	"github.com/pkg/errors"

	mesh_proto "github.com/kumahq/kuma/api/mesh/v1alpha1"
)

type Session interface {
	ServerStream() stream.DeltaStream
	PeerID() string
	Error() <-chan error
}

type session struct {
	peerID       string
	serverStream *kdsServerStream

	err       chan error
	sync.Once // protects err, so we only send the first error and close the channel
}

func NewSession(stream mesh_proto.KDSSyncService_ZoneToGlobalSyncClient, bufferSize uint32, sendTimeout time.Duration) Session {
	s := &session{
		err:    make(chan error),
		serverStream: &kdsServerStream{
			ctx:          stream.Context(),
			bufferStream: newBufferStream(bufferSize),
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

func (s *session) handleRecv(stream mesh_proto.KDSSyncService_ZoneToGlobalSyncClient) {
	for {
		msg, err := stream.Recv()
		if err != nil {
			s.serverStream.bufferStream.close()
			// Recv always finishes with either an EOF or another error
			s.setError(err)
			return
		}
		s.serverStream.bufferStream.recvBuffer <- msg
	}
}

func (s *session) handleSend(stream mesh_proto.KDSSyncService_ZoneToGlobalSyncClient, sendTimeout time.Duration) {
	for {
		msgToSend, more := <-s.serverStream.bufferStream.sendBuffer
		if !more {
			return
		}
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

func (s *session) setError(err error) {
	// execute this once so writers to this channel won't be stuck or trying to write to a close channel
	// We only care about the first error, because it results in broken session anyway.
	s.Once.Do(func() {
		s.err <- err
		close(s.err)
	})
}

func (s *session) ServerStream() stream.DeltaStream {
	return s.serverStream
}

func (s *session) PeerID() string {
	return s.peerID
}

func (s *session) Error() <-chan error {
	return s.err
}

type bufferStream struct {
	sendBuffer chan *envoy_sd.DeltaDiscoveryResponse
	recvBuffer chan *envoy_sd.DeltaDiscoveryRequest

	// Protects the send-buffer against writing on a closed channel, this is needed as we don't control in which goroutine `Send` will be called.
	lock   sync.Mutex
	closed bool
}

func newBufferStream(bufferSize uint32) *bufferStream {
	return &bufferStream{
		sendBuffer: make(chan *envoy_sd.DeltaDiscoveryResponse, bufferSize),
		recvBuffer: make(chan *envoy_sd.DeltaDiscoveryRequest, bufferSize),
	}
}

func (k *bufferStream) Send(message *envoy_sd.DeltaDiscoveryResponse) error {
	k.lock.Lock()
	defer k.lock.Unlock()
	if k.closed {
		return io.EOF
	}
	k.sendBuffer <- message
	return nil
}

func (k *bufferStream) Recv() (*envoy_sd.DeltaDiscoveryRequest, error) {
	r, more := <-k.recvBuffer
	if !more {
		return nil, io.EOF
	}
	return r, nil
}

func (k *bufferStream) close() {
	k.lock.Lock()
	defer k.lock.Unlock()

	k.closed = true
	close(k.sendBuffer)
	close(k.recvBuffer)
}
