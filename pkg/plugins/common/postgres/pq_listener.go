package postgres

import (
	"sync"

	"github.com/go-logr/logr"
	"github.com/lib/pq"

	config "github.com/kumahq/kuma/pkg/config/plugins/resources/postgres"
)

type pqListener struct {
	listener      *pq.Listener
	notifications chan *Notification
	err           chan error
	mu            sync.Mutex
}

func (p *pqListener) Error() chan error {
	p.mu.Lock()
	defer p.mu.Unlock()
	return p.err
}

var _ Listener = (*pqListener)(nil)

func (p *pqListener) Notify() chan *Notification {
	return p.notifications
}

func (p *pqListener) Close() error {
	return p.listener.Close()
}

func NewListener(cfg config.PostgresStoreConfig, log logr.Logger, stop <-chan struct{}) (Listener, error) {
	connStr, err := cfg.ConnectionString()
	if err != nil {
		return nil, err
	}

	notificationCh := make(chan *Notification)
	errCh := make(chan error)
	l := &pqListener{
		notifications: notificationCh,
		err:           errCh,
	}

	reportProblem := func(ev pq.ListenerEventType, err error) {
		if err != nil {
			l.mu.Lock()
			defer l.mu.Unlock()
			l.err <- err
			// notifications channel is already closed via Close()
			return
		}
		log.V(1).Info("event happened", "event", ev)
	}
	listener := pq.NewListener(connStr, cfg.MinReconnectInterval.Duration, cfg.MaxReconnectInterval.Duration, reportProblem)
	if err := listener.Listen(channelName); err != nil {
		return nil, err
	}

	pqNotificationCh := listener.NotificationChannel()
	l.listener = listener

	go func() {
		for {
			select {
			case pqNotification, more := <-pqNotificationCh:
				if more {
					notification := toNotification(pqNotification)
					notificationCh <- notification
				} else {
					break
				}
			case <-stop:
				log.Info("stop")
				return
			}
		}
	}()

	return l, nil
}

func toNotification(pqNotification *pq.Notification) *Notification {
	return &Notification{
		Payload: pqNotification.Extra,
	}
}
