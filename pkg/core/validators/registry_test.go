package validators_test

import (
	"fmt"

	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"

	"github.com/kumahq/kuma/v2/pkg/core/resources/apis/hostnamegenerator/api/v1alpha1"
	"github.com/kumahq/kuma/v2/pkg/core/resources/model"
	"github.com/kumahq/kuma/v2/pkg/core/validators"
)

// Helper type to create validators from functions
type validatorFunc func(resource model.Resource) validators.ValidationError

func (f validatorFunc) Validate(resource model.Resource) validators.ValidationError {
	return f(resource)
}

// Example: Basic usage of validator registry
var _ = Describe("ValidatorRegistry", func() {
	var registry validators.ValidatorRegistry

	BeforeEach(func() {
		registry = validators.NewValidatorRegistry()
	})

	It("should allow registering and validating custom validators", func() {
		// Register a custom validator for HostnameGenerator
		registry.Register(v1alpha1.HostnameGeneratorType, validatorFunc(func(resource model.Resource) validators.ValidationError {
			var verr validators.ValidationError

			hg, ok := resource.(*v1alpha1.HostnameGeneratorResource)
			if !ok {
				return verr
			}

			if hg.Spec.Extension != nil && hg.Spec.Extension.Type != "CUSTOM" {
				verr.AddViolationAt(validators.RootedAt("spec").Field("extension").Field("type"), fmt.Sprintf("type %s is not supported", hg.Spec.Extension.Type))
			}

			return verr
		}))

		// Test validation
		hg := v1alpha1.NewHostnameGeneratorResource()
		hg.Spec.Template = "{{.Name}}"
		hg.Spec.Extension = &v1alpha1.Extension{
			Type: "NOT_SUPPORTED",
		}

		// Get validators and run them
		var verr validators.ValidationError
		for _, validator := range registry.Get(v1alpha1.HostnameGeneratorType) {
			verr.Add(validator.Validate(hg))
		}

		Expect(verr.HasViolations()).To(BeTrue())
		Expect(verr.Error()).To(ContainSubstring("NOT_SUPPORTED"))
	})

	It("should aggregate multiple validators for same resource type", func() {
		// Register first validator
		registry.Register(v1alpha1.HostnameGeneratorType, validatorFunc(func(resource model.Resource) validators.ValidationError {
			var verr validators.ValidationError
			verr.AddViolationAt(validators.RootedAt("spec"), "first validator error")
			return verr
		}))

		// Register second validator
		registry.Register(v1alpha1.HostnameGeneratorType, validatorFunc(func(resource model.Resource) validators.ValidationError {
			var verr validators.ValidationError
			verr.AddViolationAt(validators.RootedAt("spec"), "second validator error")
			return verr
		}))

		hg := v1alpha1.NewHostnameGeneratorResource()

		// Get validators and run them
		var verr validators.ValidationError
		for _, validator := range registry.Get(v1alpha1.HostnameGeneratorType) {
			verr.Add(validator.Validate(hg))
		}

		Expect(verr.HasViolations()).To(BeTrue())
		Expect(verr.Violations).To(HaveLen(2))
	})

	It("should return no error when no validators registered", func() {
		hg := v1alpha1.NewHostnameGeneratorResource()

		// Get validators and run them
		var verr validators.ValidationError
		for _, validator := range registry.Get(v1alpha1.HostnameGeneratorType) {
			verr.Add(validator.Validate(hg))
		}

		Expect(verr.HasViolations()).To(BeFalse())
	})
})
