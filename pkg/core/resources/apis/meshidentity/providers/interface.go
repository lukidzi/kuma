package providers

import (
	"context"
	"crypto/x509"
	"time"

	"github.com/kumahq/kuma/pkg/core"
	"github.com/kumahq/kuma/pkg/core/kri"
	meshidentity_api "github.com/kumahq/kuma/pkg/core/resources/apis/meshidentity/api/v1alpha1"
	"github.com/kumahq/kuma/pkg/core/resources/model"
	util_tls "github.com/kumahq/kuma/pkg/tls"
)

type CertOptsFn = func(*x509.Certificate)

type WorkloadIdentity struct {
	KRI                kri.Identifier
	Type               meshidentity_api.ProviderType
	ExpirationTime     time.Time
	GenerationTime     time.Time
	IdentitySecretName *string
	CABundleSecretName *string
	*util_tls.KeyPair
}

func (c *WorkloadIdentity) CertLifetime() time.Duration {
	return c.ExpirationTime.Sub(c.GenerationTime)
}

func (i *WorkloadIdentity) ExpiringSoon() bool {
	return core.Now().After(i.GenerationTime.Add(i.CertLifetime() / 5 * 4))
}

type IdentityProvider interface {
	Validate(context.Context, *meshidentity_api.MeshIdentityResource) error
	Initialize(context.Context, *meshidentity_api.MeshIdentityResource, string) error
	CreateIdentity(*util_tls.KeyPair, *meshidentity_api.MeshIdentityResource, model.ResourceMeta) (*WorkloadIdentity, error)
	GetCAKeyPair(context.Context, *meshidentity_api.MeshIdentityResource, string) (*util_tls.KeyPair, error)
}

type IdentityProviders = map[string]IdentityProvider
