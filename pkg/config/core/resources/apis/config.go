package apis

import (
	"time"

	config_types "github.com/kumahq/kuma/pkg/config/types"
)

type Config struct {
	// List of enabled core resources
	Enabled []string `json:"enabled" envconfig:"KUMA_CORE_RESOURCES_ENABLED" default:""`
	// Generators configuration for core resources
	Generators ConfigGenerators `json:"generators"`
	// Status of core resources
	Status ConfigStatus `json:"status"`
}

type ConfigGenerators struct {
	// How often we run a component reconciling MeshIdentity resources
	MeshIdentityInterval config_types.Duration `json:"meshIdentityInterval" envconfig:"KUMA_CORE_RESOURCES_GENERATORS_MESH_IDENTITY_INTERVAL"`
	// How often we run a component reconciling MeshIdentity resources
	MeshIdentityFullSync config_types.Duration `json:"meshIdentityFullSync" envconfig:"KUMA_CORE_RESOURCES_GENERATORS_MESH_IDENTITY_FULL_SYNC"`
}

type ConfigStatus struct {
	// How often we compute status of MeshMultiZoneService
	MeshMultiZoneServiceInterval config_types.Duration `json:"meshMultiZoneServiceInterval" envconfig:"KUMA_CORE_RESOURCES_STATUS_MESH_MULTI_ZONE_SERVICE_INTERVAL"`
	// How often we compute status of MeshService
	MeshServiceInterval config_types.Duration `json:"meshServiceInterval" envconfig:"KUMA_CORE_RESOURCES_STATUS_MESH_SERVICE_INTERVAL"`
}

func Default() *Config {
	return &Config{
		Enabled: DefaultEnabled,
		Generators: ConfigGenerators{
			MeshIdentityInterval: config_types.Duration{Duration: 1 * time.Second},
			MeshIdentityFullSync: config_types.Duration{Duration: 1 * time.Second},
		},
		Status: ConfigStatus{
			MeshMultiZoneServiceInterval: config_types.Duration{Duration: 5 * time.Second},
			MeshServiceInterval:          config_types.Duration{Duration: 5 * time.Second},
		},
	}
}

func (c *Config) PostProcess() error {
	return nil
}

func (c *Config) Sanitize() {
}

func (c *Config) Validate() error {
	return nil
}
