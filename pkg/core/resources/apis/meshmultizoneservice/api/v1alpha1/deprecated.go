package v1alpha1

import (
	"fmt"
	"strings"

	apimachineryvalidation "k8s.io/apimachinery/pkg/api/validation"

	"github.com/kumahq/kuma/pkg/core/resources/model"
)

func (t *MeshMultiZoneServiceResource) Deprecations() []string {
	var deprecations []string

	name := model.GetDisplayName(t.GetMeta())
	allErrs := apimachineryvalidation.NameIsDNS1035Label(name, false)
	if len(allErrs) != 0 {
		nameDeprecationMsg := fmt.Sprintf("Invalid name: '%s'. It does not conform to the DNS format (RFC 1035). This is deprecated. Errors: %s",
			name, strings.Join(allErrs, "; "))
		deprecations = append(deprecations, nameDeprecationMsg)
	}

	return deprecations
}
