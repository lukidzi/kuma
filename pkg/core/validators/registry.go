package validators

import (
	"sync"

	"github.com/kumahq/kuma/v2/pkg/core/resources/model"
)

// ResourceValidator is a function that validates a specific resource
// It should return validators.ValidationError with any violations found
type AdditionalValidator interface {
	Validate(model.Resource) ValidationError
}

// ValidatorRegistry maintains additional validators for resource types
// This allows external code (plugins, forks) to register additional validation
// logic beyond the base validate() method that each resource implements
type ValidatorRegistry interface {
	// Register adds a validator for a specific resource type
	// Multiple validators can be registered for the same type
	Register(resourceType model.ResourceType, validator AdditionalValidator)

	// Get returns all registered validators for a given resource type
	Get(resourceType model.ResourceType) []AdditionalValidator

	// Clear removes all validators for a specific resource type
	Clear(resourceType model.ResourceType)
}

type validatorRegistry struct {
	mu         sync.RWMutex
	validators map[model.ResourceType][]AdditionalValidator
}

var (
	// Global registry instance
	globalRegistry ValidatorRegistry = NewValidatorRegistry()
)

// GlobalValidatorRegistry returns the global validator registry instance
func GlobalValidatorRegistry() ValidatorRegistry {
	return globalRegistry
}

// NewValidatorRegistry creates a new validator registry
func NewValidatorRegistry() ValidatorRegistry {
	return &validatorRegistry{
		validators: make(map[model.ResourceType][]AdditionalValidator),
	}
}

func (r *validatorRegistry) Register(resourceType model.ResourceType, validator AdditionalValidator) {
	r.mu.Lock()
	defer r.mu.Unlock()

	r.validators[resourceType] = append(r.validators[resourceType], validator)
}

func (r *validatorRegistry) Get(resourceType model.ResourceType) []AdditionalValidator {
	return r.validators[resourceType]
}

func (r *validatorRegistry) Clear(resourceType model.ResourceType) {
	r.mu.Lock()
	defer r.mu.Unlock()

	delete(r.validators, resourceType)
}
