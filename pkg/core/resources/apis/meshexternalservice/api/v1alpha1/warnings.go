package v1alpha1

import (
	"github.com/kumahq/kuma/v2/pkg/core/kri"
	"github.com/kumahq/kuma/v2/pkg/core/resources/sni"
)

func (t *MeshExternalServiceResource) Warnings() []string {
	id := kri.WithSectionName(kri.From(t), t.Spec.Match.GetName())
	return sni.Warnings(id)
}
