package bundled

import (
	"crypto"
	"crypto/rand"
	"crypto/x509"
	"crypto/x509/pkix"
	"math/big"
	"net/url"
	"time"

	"github.com/pkg/errors"
	"github.com/spiffe/go-spiffe/v2/spiffeid"

	"github.com/kumahq/kuma/pkg/core"
	core_ca "github.com/kumahq/kuma/pkg/core/ca"
	util_tls "github.com/kumahq/kuma/pkg/tls"
	util_rsa "github.com/kumahq/kuma/pkg/util/rsa"
		"context"
	"fmt"

	"github.com/asaskevich/govalidator"
	"github.com/pkg/errors"

	mesh_proto "github.com/kumahq/kuma/api/mesh/v1alpha1"
	system_proto "github.com/kumahq/kuma/api/system/v1alpha1"
	"github.com/kumahq/kuma/pkg/core"
	core_ca "github.com/kumahq/kuma/pkg/core/ca"
	ca_issuer "github.com/kumahq/kuma/pkg/core/ca/issuer"
	core_mesh "github.com/kumahq/kuma/pkg/core/resources/apis/mesh"
	core_system "github.com/kumahq/kuma/pkg/core/resources/apis/system"
	"github.com/kumahq/kuma/pkg/core/resources/manager"
	core_model "github.com/kumahq/kuma/pkg/core/resources/model"
	core_store "github.com/kumahq/kuma/pkg/core/resources/store"
	core_validators "github.com/kumahq/kuma/pkg/core/validators"
	"github.com/kumahq/kuma/pkg/plugins/ca/builtin/config"
	util_proto "github.com/kumahq/kuma/pkg/util/proto"
)

const (
	DefaultAllowedClockSkew     = 10 * time.Second
	DefaultCACertValidityPeriod = 10 * 365 * 24 * time.Hour
)


import (
	"context"
	"fmt"

	"github.com/asaskevich/govalidator"
	"github.com/pkg/errors"

	mesh_proto "github.com/kumahq/kuma/api/mesh/v1alpha1"
	system_proto "github.com/kumahq/kuma/api/system/v1alpha1"
	"github.com/kumahq/kuma/pkg/core"
	core_ca "github.com/kumahq/kuma/pkg/core/ca"
	ca_issuer "github.com/kumahq/kuma/pkg/core/ca/issuer"
	core_mesh "github.com/kumahq/kuma/pkg/core/resources/apis/mesh"
	core_system "github.com/kumahq/kuma/pkg/core/resources/apis/system"
	"github.com/kumahq/kuma/pkg/core/resources/manager"
	core_model "github.com/kumahq/kuma/pkg/core/resources/model"
	core_store "github.com/kumahq/kuma/pkg/core/resources/store"
	core_validators "github.com/kumahq/kuma/pkg/core/validators"
	"github.com/kumahq/kuma/pkg/plugins/ca/builtin/config"
	util_proto "github.com/kumahq/kuma/pkg/util/proto"
)

var log = core.Log.WithName("ca").WithName("builtin")

const MaxBackendNameLength = 255

type builtinCaManager struct {
	secretManager manager.ResourceManager
}

func NewBuiltinCaManager(secretManager manager.ResourceManager) core_ca.Manager {
	return &builtinCaManager{
		secretManager: secretManager,
	}
}

var _ core_ca.Manager = &builtinCaManager{}

func (b *builtinCaManager) EnsureBackends(ctx context.Context, mesh core_model.Resource, backends []*mesh_proto.CertificateAuthorityBackend) error {
	for _, backend := range backends {
		meshName := mesh.GetMeta().GetName()
		_, err := b.getCa(ctx, meshName, backend.Name)
		if err == nil {
			log.V(1).Info("CA secrets already exist. Nothing to create", "mesh", mesh, "backend", backend.Name)
			continue
		}

		if !core_store.IsNotFound(err) {
			return err
		}

		if err := b.create(ctx, mesh, backend); err != nil {
			return errors.Wrapf(err, "failed to create CA for mesh %q and backend %q", mesh, backend.Name)
		}
		log.Info("CA created", "mesh", meshName)
	}
	return nil
}

func (b *builtinCaManager) ValidateBackend(ctx context.Context, mesh string, backend *mesh_proto.CertificateAuthorityBackend) error {
	verr := core_validators.ValidationError{}
	cfg := &config.BuiltinCertificateAuthorityConfig{}
	if err := util_proto.ToTyped(backend.Conf, cfg); err != nil {
		verr.AddViolation("", "could not convert backend config: "+err.Error())
	}
	backendNameWithPrefix := core_system.BuiltinCertSecretName(mesh, backend.Name)
	if len(backendNameWithPrefix) > MaxBackendNameLength {
		verr.AddViolationAt(core_validators.RootedAt("mtls").Field("backends").Field("name"), fmt.Sprintf("Backend name is too long. Max length: %d", MaxBackendNameLength))
	}
	if !govalidator.IsDNSName(backendNameWithPrefix) || !govalidator.IsLowerCase(backendNameWithPrefix) {
		verr.AddViolationAt(core_validators.RootedAt("mtls").Field("backends").Field("name"), fmt.Sprintf("%q name must be valid dns name", backend.Name))
	}
	return verr.OrNil()
}

func (b *builtinCaManager) UsedSecrets(mesh string, backend *mesh_proto.CertificateAuthorityBackend) ([]string, error) {
	return []string{
		certSecretResKey(mesh, backend.Name).Name,
		keySecretResKey(mesh, backend.Name).Name,
	}, nil
}

func (b *builtinCaManager) create(ctx context.Context, mesh core_model.Resource, backend *mesh_proto.CertificateAuthorityBackend) error {
	meshName := mesh.GetMeta().GetName()
	cfg := &config.BuiltinCertificateAuthorityConfig{}
	if err := util_proto.ToTyped(backend.Conf, cfg); err != nil {
		return errors.Wrap(err, "could not convert backend config to BuiltinCertificateAuthorityConfig")
	}

	var opts []certOptsFn
	if cfg.GetCaCert().GetExpiration() != "" {
		duration, err := core_mesh.ParseDuration(cfg.GetCaCert().GetExpiration())
		if err != nil {
			return err
		}
		opts = append(opts, withExpirationTime(duration))
	}
	keyPair, err := newRootCa(meshName, int(cfg.GetCaCert().GetRSAbits().GetValue()), opts...)
	if err != nil {
		return errors.Wrapf(err, "failed to generate a Root CA cert for Mesh %q", meshName)
	}

	certSecret := &core_system.SecretResource{
		Spec: &system_proto.Secret{
			Data: util_proto.Bytes(keyPair.CertPEM),
		},
	}
	if err := b.secretManager.Create(ctx, certSecret, core_store.CreateWithOwner(mesh), core_store.CreateBy(certSecretResKey(meshName, backend.Name))); err != nil {
		if !core_store.IsAlreadyExists(err) {
			return err
		}
		log.V(1).Info("CA certificate already exists. Nothing to create", "mesh", meshName, "backend", backend.Name)
	}

	keySecret := &core_system.SecretResource{
		Spec: &system_proto.Secret{
			Data: util_proto.Bytes(keyPair.KeyPEM),
		},
	}
	if err := b.secretManager.Create(ctx, keySecret, core_store.CreateWithOwner(mesh), core_store.CreateBy(keySecretResKey(meshName, backend.Name))); err != nil {
		if !core_store.IsAlreadyExists(err) {
			return err
		}
		log.V(1).Info("CA secret key already exists. Nothing to create", "mesh", meshName, "backend", backend.Name)
	}
	return nil
}

func (b *builtinCaManager) GetRootCert(ctx context.Context, mesh string, backend *mesh_proto.CertificateAuthorityBackend) ([]core_ca.Cert, error) {
	ca, err := b.getCa(ctx, mesh, backend.Name)
	if err != nil {
		return nil, errors.Wrapf(err, "failed to load CA key pair for Mesh %q and backend %q", mesh, backend.Name)
	}
	return []core_ca.Cert{ca.CertPEM}, nil
}

func (b *builtinCaManager) getCa(ctx context.Context, mesh string, backendName string) (core_ca.KeyPair, error) {
	certSecret := core_system.NewSecretResource()
	if err := b.secretManager.Get(ctx, certSecret, core_store.GetBy(certSecretResKey(mesh, backendName))); err != nil {
		return core_ca.KeyPair{}, err
	}

	keySecret := core_system.NewSecretResource()
	if err := b.secretManager.Get(ctx, keySecret, core_store.GetBy(keySecretResKey(mesh, backendName))); err != nil {
		return core_ca.KeyPair{}, err
	}

	return core_ca.KeyPair{
		CertPEM: certSecret.Spec.Data.Value,
		KeyPEM:  keySecret.Spec.Data.Value,
	}, nil
}

type certOptsFn = func(*x509.Certificate)

func withExpirationTime(expiration time.Duration) certOptsFn {
	return func(certificate *x509.Certificate) {
		now := core.Now()
		certificate.NotAfter = now.Add(expiration)
	}
}

func newRootCa(mesh string, rsaBits int, certOpts ...certOptsFn) (*core_ca.KeyPair, error) {
	if rsaBits == 0 {
		rsaBits = util_rsa.DefaultKeySize
	}
	key, err := util_rsa.GenerateKey(rsaBits)
	if err != nil {
		return nil, errors.Wrap(err, "failed to generate a private key")
	}
	cert, err := newCACert(key, mesh, certOpts...)
	if err != nil {
		return nil, errors.Wrap(err, "failed to generate X509 certificate")
	}
	return util_tls.ToKeyPair(key, cert)
}

func newCACert(signer crypto.Signer, trustDomain string, certOpts ...certOptsFn) ([]byte, error) {
	subject := pkix.Name{
		Organization:       []string{"Kuma"},
		OrganizationalUnit: []string{"Mesh"},
		CommonName:         trustDomain,
	}
	now := core.Now()
	notBefore := now.Add(-DefaultAllowedClockSkew)
	notAfter := now.Add(DefaultCACertValidityPeriod)

	template, err := caTemplate(trustDomain, subject, signer.Public(), notBefore, notAfter, big.NewInt(0))
	if err != nil {
		return nil, err
	}

	for _, opt := range certOpts {
		opt(template)
	}
	return x509.CreateCertificate(rand.Reader, template, template, signer.Public(), signer)
}

func caTemplate(trustDomain string, subject pkix.Name, publicKey crypto.PublicKey, notBefore, notAfter time.Time, serialNumber *big.Int) (*x509.Certificate, error) {
	domain, err := spiffeid.TrustDomainFromString(trustDomain)
	if err != nil {
		return nil, err
	}
	uri, err := spiffeid.FromSegments(domain)
	if err != nil {
		return nil, err
	}
	return &x509.Certificate{
		SerialNumber: serialNumber,
		Subject:      subject,
		URIs:         []*url.URL{uri.URL()},
		NotBefore:    notBefore,
		NotAfter:     notAfter,
		KeyUsage: x509.KeyUsageCertSign |
			x509.KeyUsageCRLSign,
		BasicConstraintsValid: true,
		IsCA:                  true,
		PublicKey:             publicKey,
	}, nil
}
