package providers

import (
	"context"
	"crypto/x509"
	"time"

	"github.com/kumahq/kuma/pkg/core"
	meshidentity_api "github.com/kumahq/kuma/pkg/core/resources/apis/meshidentity/api/v1alpha1"
	util_tls "github.com/kumahq/kuma/pkg/tls"
)

type CertOptsFn = func(*x509.Certificate)

type Identity struct {
	Type           meshidentity_api.ProviderType
	ExpirationTime time.Time
	GenerationTime time.Time
	SecretName     string
	CA             []byte
	*util_tls.KeyPair
}

func (c *Identity) CertLifetime() time.Duration {
	return c.ExpirationTime.Sub(c.GenerationTime)
}

func (i *Identity) ExpiringSoon() bool {
	return core.Now().After(i.GenerationTime.Add(i.CertLifetime() / 5 * 4))
}

type IdentityProvider interface {
	CreateIdentity(string, *util_tls.KeyPair, ...CertOptsFn) (*Identity, error)
	GetCAKeyPair(context.Context, meshidentity_api.Provider, string) (*util_tls.KeyPair, error)
}

type IdentityProviders = map[string]IdentityProvider
