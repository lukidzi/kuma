package providers

import (
	"time"

	core_mesh "github.com/kumahq/kuma/pkg/core/resources/apis/mesh"
	"github.com/kumahq/kuma/pkg/core/resources/apis/meshidentity/api/v1alpha1"
)

type ProviderType string

const (
	BundledProviderType ProviderType = "Bundled"
)

type Identity struct {
	Type            ProviderType
	ExpirationTime  time.Time
	Certificate     []byte
	PrivateKey      []byte
	CertificateName string
	PrivateKeyName  string
}

type IdentityProvider interface {
	GenerateIdentity(*core_mesh.DataplaneResource, *v1alpha1.MeshIdentity) (*Identity, error)
}

type IdentityProviders = map[string]IdentityProvider
