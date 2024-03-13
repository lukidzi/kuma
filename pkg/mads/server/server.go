package server

import (
	"crypto/tls"
	"fmt"
	"net"
	"net/http"
	"strings"
	"time"

	"github.com/bakito/go-log-logr-adapter/adapter"
	"github.com/emicklei/go-restful/v3"
	"github.com/pkg/errors"
	http_prometheus "github.com/slok/go-http-metrics/metrics/prometheus"
	"github.com/slok/go-http-metrics/middleware"
	"github.com/soheilhy/cmux"

	mesh_proto "github.com/kumahq/kuma/api/mesh/v1alpha1"
	config_core "github.com/kumahq/kuma/pkg/config/core"
	mads_config "github.com/kumahq/kuma/pkg/config/mads"
	config_types "github.com/kumahq/kuma/pkg/config/types"
	"github.com/kumahq/kuma/pkg/core"
	core_runtime "github.com/kumahq/kuma/pkg/core/runtime"
	"github.com/kumahq/kuma/pkg/core/runtime/component"
	"github.com/kumahq/kuma/pkg/mads"
	mads_v1 "github.com/kumahq/kuma/pkg/mads/v1/service"
	core_metrics "github.com/kumahq/kuma/pkg/metrics"
	util_prometheus "github.com/kumahq/kuma/pkg/util/prometheus"
)

var log = core.Log.WithName("mads-server")

// muxServer is a runtime component.Component that
// serves MADs resources over HTTP
type muxServer struct {
	httpServices []HttpService
	config       *mads_config.MonitoringAssignmentServerConfig
	metrics      core_metrics.Metrics
	mesh_proto.UnimplementedMultiplexServiceServer
}

type HttpService interface {
	RegisterRoutes(ws *restful.WebService)
}

var _ component.Component = &muxServer{}

func (s *muxServer) createHttpServicesHandler() http.Handler {
	container := restful.NewContainer()
	promMiddleware := middleware.New(middleware.Config{
		Recorder: http_prometheus.NewRecorder(http_prometheus.Config{
			Registry: s.metrics,
			Prefix:   "mads_server",
		}),
	})
	promFilterFunc := util_prometheus.MetricsHandler("", promMiddleware)

	for _, service := range s.httpServices {
		ws := new(restful.WebService)
		ws.Filter(promFilterFunc)
		service.RegisterRoutes(ws)
		container.Add(ws)
	}

	return container
}

func (s *muxServer) Start(stop <-chan struct{}) error {
	l, err := net.Listen("tcp", fmt.Sprintf(":%d", s.config.Port))
	if err != nil {
		return err
	}
	defer func() {
		if err := l.Close(); err != nil {
			log.Error(err, "unable to close the listener")
		}
	}()

	if s.config.TlsEnabled {
		cert, err := tls.LoadX509KeyPair(s.config.TlsCertFile, s.config.TlsKeyFile)
		if err != nil {
			return errors.Wrap(err, "failed to load TLS certificate")
		}
		tlsConfig := &tls.Config{Certificates: []tls.Certificate{cert}, MinVersion: tls.VersionTLS12} // To make gosec happy
		if tlsConfig.MinVersion, err = config_types.TLSVersion(s.config.TlsMinVersion); err != nil {
			return err
		}
		if tlsConfig.MaxVersion, err = config_types.TLSVersion(s.config.TlsMaxVersion); err != nil {
			return err
		}
		if tlsConfig.CipherSuites, err = config_types.TLSCiphers(s.config.TlsCipherSuites); err != nil {
			return err
		}
		l = tls.NewListener(l, tlsConfig)
	}
	m := cmux.New(l)

	httpL := m.Match(cmux.Any())
	httpS := &http.Server{
		ReadHeaderTimeout: time.Second,
		Handler:           s.createHttpServicesHandler(),
		ErrorLog:          adapter.ToStd(log),
	}
	errChanHttp := make(chan error)
	go func() {
		defer close(errChanHttp)
		if err := httpS.Serve(httpL); err != nil {
			switch err {
			case cmux.ErrServerClosed:
				log.Info("shutting down an HTTP Server")
			default:
				log.Error(err, "could not start an HTTP Server")
				errChanHttp <- err
			}
		}
	}()

	errChan := make(chan error)
	go func() {
		defer close(errChan)
		err := m.Serve()
		if err != nil {
			if strings.Contains(err.Error(), "use of closed network connection") {
				log.Info("shutting down a mux server")
			} else {
				log.Error(err, "could not start a mux Server")
				errChan <- err
			}
		}
	}()

	log.Info("starting", "interface", "0.0.0.0", "port", s.config.Port)

	defer m.Close()

	select {
	case <-stop:
		log.Info("stopping gracefully")
		return nil
	case err := <-errChanHttp:
		return err
	case err := <-errChan:
		return err
	}
}

func (s *muxServer) NeedLeaderElection() bool {
	return false
}

func SetupServer(rt core_runtime.Runtime) error {
	if rt.Config().Mode == config_core.Global {
		return nil
	}
	config := rt.Config().MonitoringAssignmentServer

	rm := rt.ReadOnlyResourceManager()

	var httpServices []HttpService

	if config.VersionIsEnabled(mads.API_V1) {
		log.Info("MADS v1 is enabled")
		svc := mads_v1.NewService(config, rm, log.WithValues("apiVersion", mads.API_V1), rt.MeshCache())
		httpServices = append(httpServices, svc)
	}

	return rt.Add(&muxServer{
		httpServices: httpServices,
		config:       config,
		metrics:      rt.Metrics(),
	})
}
