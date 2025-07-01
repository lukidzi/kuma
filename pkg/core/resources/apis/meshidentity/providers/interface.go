package providers

type TLSContextConfigurer interface {
	GetUpstreamTLSContext(identity string, destIdentities []string)
	GetDownstreamTLSContext(trustDomains []string)
}

type Provider interface {
	TLSContextConfigurer
	CreateIdentity()
}
