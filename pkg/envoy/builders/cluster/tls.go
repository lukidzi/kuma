package cluster

import (
	envoy_core "github.com/envoyproxy/go-control-plane/envoy/config/core/v3"
	envoy_tls "github.com/envoyproxy/go-control-plane/envoy/extensions/transport_sockets/tls/v3"
	. "github.com/kumahq/kuma/pkg/envoy/builders/common"
)

func NewUpstreamTLSContext() *Builder[envoy_tls.UpstreamTlsContext] {
	return &Builder[envoy_tls.UpstreamTlsContext]{}
}

func SNI(sni string) Configurer[envoy_tls.UpstreamTlsContext] {
	return func(c *envoy_tls.UpstreamTlsContext) error {
		c.Sni = sni
		return nil
	}
}

func CommonTlsContext(commonCtx *Builder[envoy_tls.CommonTlsContext]) Configurer[envoy_tls.UpstreamTlsContext] {
	return func(c *envoy_tls.UpstreamTlsContext) error {
		config, err := commonCtx.Build()
		if err != nil {
			return err
		}
		c.CommonTlsContext = config
		return nil
	}
}

func NewCommonTlsContext() *Builder[envoy_tls.CommonTlsContext] {
	return &Builder[envoy_tls.CommonTlsContext]{}
}

func WithTlsCertificateSdsSecretConfig(builder *Builder[envoy_tls.SdsSecretConfig]) Configurer[envoy_tls.CommonTlsContext] {
	return func(c *envoy_tls.CommonTlsContext) error {
		config, err := builder.Build()
		if err != nil {
			return err
		}
		c.TlsCertificateSdsSecretConfigs = append(c.TlsCertificateSdsSecretConfigs, config)
		return nil
	}
}

func CombinedCertificateValidationContext(builder *Builder[envoy_tls.CommonTlsContext_CombinedCertificateValidationContext]) Configurer[envoy_tls.CommonTlsContext] {
	return func(c *envoy_tls.CommonTlsContext) error {
		config, err := builder.Build()
		if err != nil {
			return err
		}
		c.ValidationContextType = &envoy_tls.CommonTlsContext_CombinedValidationContext{
			CombinedValidationContext: config,
		}
		return nil
	}
}

func NewCombinedCertificateValidationContext() *Builder[envoy_tls.CommonTlsContext_CombinedCertificateValidationContext] {
	return &Builder[envoy_tls.CommonTlsContext_CombinedCertificateValidationContext]{}
}

func NewDefaultValidationContext() *Builder[envoy_tls.CertificateValidationContext] {
	return &Builder[envoy_tls.CertificateValidationContext]{}
}

func WithSAN(builder *Builder[envoy_tls.SubjectAltNameMatcher]) Configurer[envoy_tls.CertificateValidationContext] {
	return func(c *envoy_tls.CertificateValidationContext) error {
		config, err := builder.Build()
		if err != nil {
			return nil
		}
		c.MatchTypedSubjectAltNames = append(c.MatchTypedSubjectAltNames, config)
		return nil
	}
}

func ValidationContextSdsSecretConfig(builder *Builder[envoy_tls.SdsSecretConfig]) Configurer[envoy_tls.CommonTlsContext_CombinedCertificateValidationContext] {
	return func(c *envoy_tls.CommonTlsContext_CombinedCertificateValidationContext) error {
		config, err := builder.Build()
		if err != nil {
			return err
		}
		c.ValidationContextSdsSecretConfig = config
		return nil
	}
}

func NewTlsCertificateSdsSecretConfigs() *Builder[envoy_tls.SdsSecretConfig] {
	return &Builder[envoy_tls.SdsSecretConfig]{}
}

func SdsSecretConfigSource(secretName string, configSource *Builder[envoy_core.ConfigSource]) Configurer[envoy_tls.SdsSecretConfig] {
	return func(c *envoy_tls.SdsSecretConfig) error {
		cs, err := configSource.Build()
		if err != nil {
			return err
		}
		c.Name = secretName
		c.SdsConfig = cs
		return nil
	}
}
