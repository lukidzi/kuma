// +kubebuilder:object:generate=true
package v1alpha1

import (
	k8s "k8s.io/apimachinery/pkg/apis/meta/v1"

	"github.com/kumahq/kuma/api/common/v1alpha1"
)

type Selector struct {
	Dataplane *k8s.LabelSelector `json:"dataplane,omitempty"`
}

// MeshIdentity
// +kuma:policy:is_policy=false
// +kuma:policy:allowed_on_system_namespace_only=true
// +kuma:policy:kds_flags=model.GlobalToZonesFlag | model.ZoneToGlobalFlag
type MeshIdentity struct {
	Selector Selector  `json:"selector,omitempty"`
	SpiffeID *SpiffeID `json:"spiffeID,omitempty"`
	Provider Provider  `json:"provider,omitempty"`
}

type SpiffeID struct {
	TrustDomain string `json:"trustDomain,omitempty"`
	Path        string `json:"path,omitempty"`
}

// +kubebuilder:validation:Enum=Builtin;Provided;Spire
type ProviderType string

const (
	BuiltinType  ProviderType = "Builtin"
	ProvidedType ProviderType = "Provided"
	SpireType    ProviderType = "Spire"
)

type Provider struct {
	// +required
	// +kubebuilder:validation:Required
	// +kubebuilder:validation:Enum=True;False;Unknown
	Type     ProviderType `json:"type"`
	Builtin  *Builtin     `json:"builtin,omitempty"`
	Provided *Provided    `json:"provided,omitempty"`
	Spire    *Spire       `json:"spire,omitempty"`
}

type DataplaneCertificate struct {
	Duration *k8s.Duration `json:"duration,omitempty"`
}

type Builtin struct {
	DataplaneCertificate *DataplaneCertificate `json:"dataplaneCertificate,omitempty"`
}

type Provided struct {
	// +required
	// +kubebuilder:validation:Required
	Certificate v1alpha1.DataSource `json:"certificate"`
	// +required
	// +kubebuilder:validation:Required
	PrivateKey           v1alpha1.DataSource   `json:"privateKey"`
	DataplaneCertificate *DataplaneCertificate `json:"dataplaneCertificate,omitempty"`
}

type SpireAgent struct {
	Address string        `json:"address,omitempty"`
	Timeout *k8s.Duration `json:"timeout,omitempty"`
}

type Spire struct {
	Agent *SpireAgent `json:"agent,omitempty"`
}
