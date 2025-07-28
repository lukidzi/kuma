package ticker

import (
	"context"
	"fmt"
	"time"

	"github.com/go-logr/logr"
	"github.com/prometheus/client_golang/prometheus"

	"github.com/kumahq/kuma/pkg/core"
	"github.com/kumahq/kuma/pkg/core/runtime/component"
	"github.com/kumahq/kuma/pkg/core/user"
	core_metrics "github.com/kumahq/kuma/pkg/metrics"
)

type PeriodicTask struct {
	ticker     *time.Ticker
	logger     logr.Logger
	onTick     func(context.Context) error
	onStop     func(context.Context) error
	metric     prometheus.Summary
	taskName   string
	leaderOnly bool
}

var _ component.Component = &PeriodicTask{}

func NewPeriodicTask(
	taskName string,
	interval time.Duration,
	metrics core_metrics.Metrics,
	onTick func(context.Context) error,
	onStop func(context.Context) error,
	leaderOnly bool,
) (component.Component, error) {
	summary := prometheus.NewSummary(prometheus.SummaryOpts{
		Name:       fmt.Sprintf("component_%s_generator", taskName),
		Help:       fmt.Sprintf("Summary of %s generation duration", taskName),
		Objectives: core_metrics.DefaultObjectives,
	})
	if err := metrics.Register(summary); err != nil {
		return nil, err
	}
	return &PeriodicTask{
		taskName: taskName,
		ticker:   time.NewTicker(interval),
		logger:   core.Log.WithName("periodic-task").WithName(taskName),
		onTick:   onTick,
		onStop:   onStop,
		metric:   summary,
	}, nil
}

func (p *PeriodicTask) Start(stop <-chan struct{}) error {
	defer p.ticker.Stop()
	p.logger.Info("starting", "task", p.taskName)
	ctx := user.Ctx(context.Background(), user.ControlPlane)

	for {
		select {
		case <-p.ticker.C:
			start := time.Now()
			err := p.onTick(ctx)
			p.metric.Observe(float64(time.Since(start).Milliseconds()))
			if err != nil {
				p.logger.Error(err, "task failed", "task", p.taskName)
			}
		case <-stop:
			p.logger.Info("stopping", "task", p.taskName)
			err := p.onStop(ctx)
			if err != nil {
				p.logger.Error(err, "failed during stopping", "task", p.taskName)
			}
			return nil
		}
	}
}

func (p *PeriodicTask) NeedLeaderElection() bool {
	return p.leaderOnly
}
