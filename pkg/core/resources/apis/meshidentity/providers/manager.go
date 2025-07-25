package providers

import (
	"context"
	"fmt"
	"html/template"
	"strings"

	mesh_proto "github.com/kumahq/kuma/api/mesh/v1alpha1"
	"github.com/kumahq/kuma/pkg/core"
	"github.com/kumahq/kuma/pkg/core/kri"
	core_mesh "github.com/kumahq/kuma/pkg/core/resources/apis/mesh"
	meshidentity_api "github.com/kumahq/kuma/pkg/core/resources/apis/meshidentity/api/v1alpha1"
	"github.com/kumahq/kuma/pkg/core/resources/model"
	"github.com/kumahq/kuma/pkg/plugins/runtime/k8s/metadata"
	"github.com/kumahq/kuma/pkg/util/pointer"
	"github.com/pkg/errors"
)

const (
	defaultTrustDomainTemplate = "{{ .Mesh }}.{{ .Zone }}.mesh.local"
	defaultPathTemplate        = "/ns/{{ .Namespace }}/sa/{{ .ServiceAccount }}"
)

type IdentityProviderManager struct {
	providers IdentityProviders
	zone      string
}

func NewIdentityProviderManager(providers IdentityProviders, zone string) IdentityProviderManager {
	return IdentityProviderManager{
		providers: providers,
		zone:      zone,
	}
}

func (i *IdentityProviderManager) SelectedIdentity(dataplane *core_mesh.DataplaneResource, identities []*meshidentity_api.MeshIdentityResource) *meshidentity_api.MeshIdentityResource {
	identity, found := meshidentity_api.Matched(dataplane.Meta.GetLabels(), identities)
	if !found {
		return nil
	}
	return identity
}

func (i *IdentityProviderManager) GetWorkloadIdentity(ctx context.Context, dataplane *core_mesh.DataplaneResource, identity *meshidentity_api.MeshIdentityResource) (*Identity, error) {
	if identity == nil {
		return nil, nil
	}
	provider, found := i.providers[string(identity.Spec.Provider.Type)]
	if !found {
		return nil, fmt.Errorf("identity provider %s not found", identity.Spec.Provider.Type)
	}

	spiffeIDTemplate := getSpiffeIDTemaplate(identity.Spec)

	spiffeID, err := i.GetSpiffeID(spiffeIDTemplate, dataplane.GetMeta())
	if err != nil {
		return nil, err
	}

	mesh := dataplane.Meta.GetMesh()

	pair, err := provider.GetKeyPair(ctx, identity.Spec.Provider, mesh)
	if err != nil {
		return nil, err
	}

	core.Log.Info("spiffeID", "spiffeID", spiffeID)
	ident, err := provider.CreateIdentity(spiffeID, pair)
	if err != nil {
		return nil, err
	}
	ident.SecretName = kri.From(identity, "").String()
	return ident, nil
}

func getSpiffeIDTemaplate(mid *meshidentity_api.MeshIdentity) string {
	builder := strings.Builder{}
	builder.WriteString("spiffe://")
	if mid.SpiffeID != nil {
		if mid.SpiffeID.TrustDomain == nil {
			builder.WriteString(defaultTrustDomainTemplate)
		} else {
			builder.WriteString(pointer.Deref(mid.SpiffeID.TrustDomain))
		}
		if mid.SpiffeID.Path == nil {
			builder.WriteString(defaultPathTemplate)
		} else {
			builder.WriteString(pointer.Deref(mid.SpiffeID.Path))
		}
	} else {
		builder.WriteString(defaultTrustDomainTemplate)
		builder.WriteString(defaultPathTemplate)
	}
	return builder.String()
}

func (i *IdentityProviderManager) GetSpiffeID(spiffeIDTemplate string, meta model.ResourceMeta) (string, error) {
	sb := strings.Builder{}
	tmpl := template.New("").Funcs(
		map[string]any{
			"label": func(key string) (string, error) {
				val, ok := meta.GetLabels()[key]
				if !ok {
					return "", errors.Errorf("label %s not found", key)
				}
				return val, nil
			},
		},
	)
	tmpl, err := tmpl.Parse(spiffeIDTemplate)
	if err != nil {
		return "", fmt.Errorf("failed compiling gotemplate error=%q", err.Error())
	}
	type spiffeID struct {
		Namespace      string
		Mesh           string
		Zone           string
		ServiceAccount string
	}
	serviceAccount := meta.GetLabels()[metadata.KumaServiceAccount]
	zone := meta.GetLabels()[mesh_proto.ZoneTag]
	if zone == "" {
		zone = i.zone
	}
	err = tmpl.Execute(&sb, spiffeID{
		Namespace:      meta.GetLabels()[mesh_proto.KubeNamespaceTag],
		Mesh:           meta.GetMesh(),
		Zone:           zone,
		ServiceAccount: serviceAccount,
	})
	if err != nil {
		return "", fmt.Errorf("pre evaluation of template with parameters failed with error=%q", err.Error())
	}
	return sb.String(), nil
}
