package bundled

import (
	"context"
	"crypto"
	"crypto/rand"
	"crypto/tls"
	"crypto/x509"
	"encoding/pem"
	"fmt"
	"math/big"
	"net/url"
	"reflect"
	"time"

	"github.com/pkg/errors"
	"github.com/spiffe/go-spiffe/v2/spiffeid"
	k8s "k8s.io/apimachinery/pkg/apis/meta/v1"

	system_proto "github.com/kumahq/kuma/api/system/v1alpha1"
	"github.com/kumahq/kuma/pkg/core"
	"github.com/kumahq/kuma/pkg/core/kri"
	meshidentity_api "github.com/kumahq/kuma/pkg/core/resources/apis/meshidentity/api/v1alpha1"
	"github.com/kumahq/kuma/pkg/core/resources/apis/meshidentity/providers"
	core_system "github.com/kumahq/kuma/pkg/core/resources/apis/system"
	"github.com/kumahq/kuma/pkg/core/resources/manager"
	"github.com/kumahq/kuma/pkg/core/resources/model"
	core_store "github.com/kumahq/kuma/pkg/core/resources/store"
	util_tls "github.com/kumahq/kuma/pkg/tls"
	"github.com/kumahq/kuma/pkg/util/pointer"
	util_proto "github.com/kumahq/kuma/pkg/util/proto"
	util_rsa "github.com/kumahq/kuma/pkg/util/rsa"
)

const (
	DefaultAllowedClockSkew = 10 * time.Second
)

var DefaultWorkloadCertValidityPeriod = k8s.Duration{Duration: 24 * time.Hour}

var _ providers.IdentityProvider = &bundledIdentityProvider{}

type bundledIdentityProvider struct {
	roSecretManager manager.ReadOnlyResourceManager
	secretManager   manager.ResourceManager
}

func NewBundledIdentityProvider(roSecretManager manager.ReadOnlyResourceManager, secretManager manager.ResourceManager) providers.IdentityProvider {
	return &bundledIdentityProvider{
		roSecretManager: roSecretManager,
		secretManager:   secretManager,
	}
}

func (b *bundledIdentityProvider) Validate(ctx context.Context, identity *meshidentity_api.MeshIdentityResource) error {
	if !pointer.DerefOr(identity.Spec.Provider.Bundled.InsecureAllowSelfSigned, false) {
		if pointer.DerefOr(identity.Spec.Provider.Bundled.Autogenerate.Enabled, false) {
			return errors.Errorf("self-signed certificates are not allowed")
		}
		pair, err := b.GetCAKeyPair(ctx, identity, identity.Meta.GetMesh())
		if err != nil {
			return err
		}
		selfSigned, err := isSelfSigned(pair.CertPEM)
		if err != nil {
			return err
		}
		if selfSigned {
			return errors.Errorf("self-signed certificates are not allowed")
		}
	}
	return nil
}

func (b *bundledIdentityProvider) Initialize(ctx context.Context, identity *meshidentity_api.MeshIdentityResource, trustDomain string) error {
	if pointer.DerefOr(identity.Spec.Provider.Bundled.Autogenerate.Enabled, false) {
		keyPair, err := GenerateRootCA(trustDomain)
		if err != nil {
			return err
		}
		certSecret := &core_system.SecretResource{
			Spec: &system_proto.Secret{
				Data: util_proto.Bytes(keyPair.CertPEM),
			},
		}
		mesh := identity.Meta.GetMesh()
		if err := b.secretManager.Create(ctx, certSecret, core_store.CreateWithOwner(identity), core_store.CreateByKey(RootCAName(identity.Meta.GetName()), mesh)); err != nil {
			if !core_store.IsAlreadyExists(err) {
				return err
			}
		}
		keySecret := &core_system.SecretResource{
			Spec: &system_proto.Secret{
				Data: util_proto.Bytes(keyPair.KeyPEM),
			},
		}
		if err := b.secretManager.Create(ctx, keySecret, core_store.CreateWithOwner(identity), core_store.CreateByKey(PrivateKeyName(identity.Meta.GetName()), mesh)); err != nil {
			if !core_store.IsAlreadyExists(err) {
				return err
			}
		}
	}
	return nil
}

func (b *bundledIdentityProvider) GetCAKeyPair(ctx context.Context, identity *meshidentity_api.MeshIdentityResource, mesh string) (*util_tls.KeyPair, error) {
	bundled := pointer.Deref(identity.Spec.Provider.Bundled)
	var err error
	var cert, key []byte
	if bundled.Autogenerate == nil || !pointer.Deref(bundled.Autogenerate.Enabled) {
		cert, err = bundled.Certificate.ReadByControlPlane(ctx, b.secretManager, mesh)
		if err != nil {
			return nil, err
		}
		key, err = bundled.PrivateKey.ReadByControlPlane(ctx, b.secretManager, mesh)
		if err != nil {
			return nil, err
		}
	} else {
		// ca
		ca := core_system.NewSecretResource()
		if err := b.roSecretManager.Get(ctx, ca, core_store.GetByKey(RootCAName(identity.Meta.GetName()), mesh)); err != nil {
			return nil, err
		}
		cert = ca.Spec.Data.GetValue()
		// privateKey
		caKey := core_system.NewSecretResource()
		if err := b.roSecretManager.Get(ctx, caKey, core_store.GetByKey(PrivateKeyName(identity.Meta.GetName()), mesh)); err != nil {
			return nil, err
		}
		key = caKey.Spec.Data.GetValue()
	}
	return &util_tls.KeyPair{
		CertPEM: cert,
		KeyPEM:  key,
	}, nil
}

func (b *bundledIdentityProvider) CreateIdentity(pair *util_tls.KeyPair, identity *meshidentity_api.MeshIdentityResource, meta model.ResourceMeta) (*providers.WorkloadIdentity, error) {
	if pair == nil {
		return nil, errors.New("certificate pair cannot be empty")
	}
	caPrivateKey, caCert, err := loadKeyPair(pointer.Deref(pair))
	if err != nil {
		return nil, errors.Wrap(err, "failed to load CA key pair")
	}
	// TODO replace with ED25519
	workloadKey, err := util_rsa.GenerateKey(util_rsa.DefaultKeySize)
	if err != nil {
		return nil, errors.Wrap(err, "failed to generate a private key")
	}
	now := time.Now()
	serialNumber, err := newSerialNumber()
	if err != nil {
		return nil, err
	}
	spiffeID, err := identity.Spec.GetSpiffeID(identity.Status.TrustDomain, meta)
	if err != nil {
		return nil, err
	}
	id, err := spiffeid.FromString(spiffeID)
	if err != nil {
		return nil, err
	}
	certValidity := pointer.DerefOr(identity.Spec.Provider.Bundled.CertificateParameters.Expiry, DefaultWorkloadCertValidityPeriod)

	core.Log.Info("CURRENT SPIFFE", "id", id)
	template := &x509.Certificate{
		SerialNumber: serialNumber,
		URIs:         []*url.URL{id.URL()},
		NotBefore:    now.Add(-DefaultAllowedClockSkew),
		NotAfter:     now.Add(certValidity.Duration),
		KeyUsage: x509.KeyUsageKeyEncipherment |
			x509.KeyUsageKeyAgreement |
			x509.KeyUsageDigitalSignature,
		ExtKeyUsage: []x509.ExtKeyUsage{
			x509.ExtKeyUsageServerAuth,
			x509.ExtKeyUsageClientAuth,
		},
		BasicConstraintsValid: true,
		PublicKey:             workloadKey.Public(),
	}
	workloadCert, err := x509.CreateCertificate(rand.Reader, template, caCert, workloadKey.Public(), caPrivateKey)
	if err != nil {
		return nil, errors.Wrap(err, "failed to generate X509 certificate")
	}
	identityPair, err := util_tls.ToKeyPair(workloadKey, workloadCert)
	if err != nil {
		return nil, err
	}
	return &providers.WorkloadIdentity{
		KRI:            kri.From(identity, ""),
		Type:           meshidentity_api.BundledType,
		ExpirationTime: template.NotAfter,
		GenerationTime: now,
		KeyPair:        identityPair,
	}, nil
}

var maxUint128, one *big.Int

func init() {
	one = big.NewInt(1)
	m := new(big.Int)
	m.Lsh(one, 128)
	maxUint128 = m.Sub(m, one)
}

func isSelfSigned(certPEM []byte) (bool, error) {
	block, _ := pem.Decode(certPEM)
	if block == nil || block.Type != "CERTIFICATE" {
		return false, errors.New("failed to decode PEM certificate")
	}

	cert, err := x509.ParseCertificate(block.Bytes)
	if err != nil {
		return false, err
	}

	// Check if subject and issuer are the same
	if !reflect.DeepEqual(cert.Subject.ToRDNSequence(), cert.Issuer.ToRDNSequence()) {
		return false, nil
	}

	// Try to verify the certificate using its own public key
	err = cert.CheckSignatureFrom(cert)
	if err != nil {
		return false, nil
	}

	return true, nil
}

func newSerialNumber() (*big.Int, error) {
	res, err := rand.Int(rand.Reader, maxUint128)
	if err != nil {
		return nil, fmt.Errorf("failed generation of serial number: %w", err)
	}
	// Because we generate in the range [0, maxUint128) and 0 is an invalid serial and maxUint128 is valid we add 1
	// to have a number in range [1, maxUint128] See: https://cabforum.org/2016/03/31/ballot-164/
	return res.Add(res, one), nil
}

func loadKeyPair(pair util_tls.KeyPair) (crypto.PrivateKey, *x509.Certificate, error) {
	root, err := tls.X509KeyPair(pair.CertPEM, pair.KeyPEM)
	if err != nil {
		return nil, nil, errors.Wrap(err, "failed to parse TLS key pair")
	}
	rootCert, err := x509.ParseCertificate(root.Certificate[0])
	if err != nil {
		return nil, nil, errors.Wrap(err, "failed to parse X509 certificate")
	}
	return root.PrivateKey, rootCert, nil
}
