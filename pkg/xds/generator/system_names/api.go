package system_names

import "github.com/kumahq/kuma/pkg/core/system_names"

var (
	SystemResourceNameEnvoyAdmin = system_names.MustBeSystemName("envoy_admin")
	SystemResourceNameCABundle   = system_names.MustBeSystemName(system_names.Join("trust", "bundle"))
)
