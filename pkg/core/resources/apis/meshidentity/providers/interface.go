package providers

import (
	"context"

	meshidentity_api "github.com/kumahq/kuma/pkg/core/resources/apis/meshidentity/api/v1alpha1"
	"github.com/kumahq/kuma/pkg/core/resources/model"
	"github.com/kumahq/kuma/pkg/core/xds"
)

// This interface is a subject to changes based on other providers to find one that serves for all
type IdentityProvider interface {
	Validate(context.Context, *meshidentity_api.MeshIdentityResource) error
	Initialize(context.Context, *meshidentity_api.MeshIdentityResource, string) error
	CreateIdentity(context.Context, *meshidentity_api.MeshIdentityResource, model.ResourceMeta, string) (*xds.WorkloadIdentity, error)
	GetRootCA(context.Context, *meshidentity_api.MeshIdentityResource, string) ([]byte, error)
}

type IdentityProviders = map[string]IdentityProvider
