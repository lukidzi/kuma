package zoneproxy

import (
	"github.com/pkg/errors"

	"github.com/kumahq/kuma/v2/test/framework"
)

type DeploymentOpts struct {
	Name          string
	Namespace     string
	Mesh          string
	Workload      string
	IngressPort   uint32
	EgressPort    uint32
	DeployIngress bool
	DeployEgress  bool
}

func DefaultDeploymentOpts() DeploymentOpts {
	return DeploymentOpts{
		Name:          "zone-proxy",
		Namespace:     framework.TestNamespace,
		Mesh:          "default",
		IngressPort:   10001,
		EgressPort:    10002,
		DeployIngress: true,
		DeployEgress:  true,
	}
}

type DeploymentOptsFn = func(*DeploymentOpts)

func WithName(name string) DeploymentOptsFn {
	return func(opts *DeploymentOpts) {
		opts.Name = name
	}
}

func WithNamespace(namespace string) DeploymentOptsFn {
	return func(opts *DeploymentOpts) {
		opts.Namespace = namespace
	}
}

func WithMesh(mesh string) DeploymentOptsFn {
	return func(opts *DeploymentOpts) {
		opts.Mesh = mesh
	}
}

func WithWorkload(workload string) DeploymentOptsFn {
	return func(opts *DeploymentOpts) {
		opts.Workload = workload
	}
}

func WithIngressPort(port uint32) DeploymentOptsFn {
	return func(opts *DeploymentOpts) {
		opts.IngressPort = port
	}
}

func WithEgressPort(port uint32) DeploymentOptsFn {
	return func(opts *DeploymentOpts) {
		opts.EgressPort = port
	}
}

// IngressOnly deploys only the zone-proxy-ingress Deployment + Service.
func IngressOnly() DeploymentOptsFn {
	return func(opts *DeploymentOpts) {
		opts.DeployEgress = false
	}
}

// EgressOnly deploys only the zone-proxy-egress Deployment + Service.
func EgressOnly() DeploymentOptsFn {
	return func(opts *DeploymentOpts) {
		opts.DeployIngress = false
	}
}

// Install deploys a separate zone-proxy-ingress and zone-proxy-egress
// Deployment + Service pair on a Kubernetes cluster (MADR-098 "separate" topology).
func Install(fn ...DeploymentOptsFn) framework.InstallFunc {
	opts := DefaultDeploymentOpts()
	for _, f := range fn {
		f(&opts)
	}
	return func(cluster framework.Cluster) error {
		switch cluster.(type) {
		case *framework.K8sCluster:
			return cluster.Deploy(&k8sDeployment{opts: opts})
		case *framework.UniversalCluster:
			return cluster.Deploy(&universalDeployment{opts: opts})
		default:
			return errors.New("zone proxy deployment is not supported on this cluster type")
		}
	}
}
