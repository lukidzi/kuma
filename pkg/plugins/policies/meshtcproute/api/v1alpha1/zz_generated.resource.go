// Generated by tools/policy-gen.
// Run "make generate" to update this file.

// nolint:whitespace
package v1alpha1

import (
	_ "embed"
	"errors"
	"fmt"

	"k8s.io/apiextensions-apiserver/pkg/apis/apiextensions"
	apiextensionsv1 "k8s.io/apiextensions-apiserver/pkg/apis/apiextensions/v1"
	"k8s.io/apiextensions-apiserver/pkg/apiserver/schema"
	"k8s.io/kube-openapi/pkg/validation/strfmt"
	"k8s.io/kube-openapi/pkg/validation/validate"
	"sigs.k8s.io/yaml"

	"github.com/kumahq/kuma/pkg/core/resources/model"
)

//go:embed schema.yaml
var rawSchema []byte

func init() {
	var structuralSchema *schema.Structural
	var v1JsonSchemaProps *apiextensionsv1.JSONSchemaProps
	var validator *validate.SchemaValidator
	if rawSchema != nil {
		if err := yaml.Unmarshal(rawSchema, &v1JsonSchemaProps); err != nil {
			panic(err)
		}
		var jsonSchemaProps apiextensions.JSONSchemaProps
		err := apiextensionsv1.Convert_v1_JSONSchemaProps_To_apiextensions_JSONSchemaProps(v1JsonSchemaProps, &jsonSchemaProps, nil)
		if err != nil {
			panic(err)
		}
		structuralSchema, err = schema.NewStructural(&jsonSchemaProps)
		if err != nil {
			panic(err)
		}
		schemaObject := structuralSchema.ToKubeOpenAPI()
		validator = validate.NewSchemaValidator(schemaObject, nil, "", strfmt.Default)
	}
	rawSchema = nil
	MeshTCPRouteResourceTypeDescriptor.Validator = validator
	MeshTCPRouteResourceTypeDescriptor.StructuralSchema = structuralSchema
}

const (
	MeshTCPRouteType model.ResourceType = "MeshTCPRoute"
)

var _ model.Resource = &MeshTCPRouteResource{}

type MeshTCPRouteResource struct {
	Meta model.ResourceMeta
	Spec *MeshTCPRoute
}

func NewMeshTCPRouteResource() *MeshTCPRouteResource {
	return &MeshTCPRouteResource{
		Spec: &MeshTCPRoute{},
	}
}

func (t *MeshTCPRouteResource) GetMeta() model.ResourceMeta {
	return t.Meta
}

func (t *MeshTCPRouteResource) SetMeta(m model.ResourceMeta) {
	t.Meta = m
}

func (t *MeshTCPRouteResource) GetSpec() model.ResourceSpec {
	return t.Spec
}

func (t *MeshTCPRouteResource) SetSpec(spec model.ResourceSpec) error {
	protoType, ok := spec.(*MeshTCPRoute)
	if !ok {
		return fmt.Errorf("invalid type %T for Spec", spec)
	} else {
		if protoType == nil {
			t.Spec = &MeshTCPRoute{}
		} else {
			t.Spec = protoType
		}
		return nil
	}
}

func (t *MeshTCPRouteResource) GetStatus() model.ResourceStatus {
	return nil
}

func (t *MeshTCPRouteResource) SetStatus(_ model.ResourceStatus) error {
	return errors.New("status not supported")
}

func (t *MeshTCPRouteResource) Descriptor() model.ResourceTypeDescriptor {
	return MeshTCPRouteResourceTypeDescriptor
}

func (t *MeshTCPRouteResource) Validate() error {
	if v, ok := interface{}(t).(interface{ validate() error }); !ok {
		return nil
	} else {
		return v.validate()
	}
}

var _ model.ResourceList = &MeshTCPRouteResourceList{}

type MeshTCPRouteResourceList struct {
	Items      []*MeshTCPRouteResource
	Pagination model.Pagination
}

func (l *MeshTCPRouteResourceList) GetItems() []model.Resource {
	res := make([]model.Resource, len(l.Items))
	for i, elem := range l.Items {
		res[i] = elem
	}
	return res
}

func (l *MeshTCPRouteResourceList) GetItemType() model.ResourceType {
	return MeshTCPRouteType
}

func (l *MeshTCPRouteResourceList) NewItem() model.Resource {
	return NewMeshTCPRouteResource()
}

func (l *MeshTCPRouteResourceList) AddItem(r model.Resource) error {
	if trr, ok := r.(*MeshTCPRouteResource); ok {
		l.Items = append(l.Items, trr)
		return nil
	} else {
		return model.ErrorInvalidItemType((*MeshTCPRouteResource)(nil), r)
	}
}

func (l *MeshTCPRouteResourceList) GetPagination() *model.Pagination {
	return &l.Pagination
}

func (l *MeshTCPRouteResourceList) SetPagination(p model.Pagination) {
	l.Pagination = p
}

var MeshTCPRouteResourceTypeDescriptor = model.ResourceTypeDescriptor{
	Name:                         MeshTCPRouteType,
	Resource:                     NewMeshTCPRouteResource(),
	ResourceList:                 &MeshTCPRouteResourceList{},
	Scope:                        model.ScopeMesh,
	KDSFlags:                     model.GlobalToAllZonesFlag | model.ZoneToGlobalFlag | model.GlobalToAllButOriginalZoneFlag,
	WsPath:                       "meshtcproutes",
	KumactlArg:                   "meshtcproute",
	KumactlListArg:               "meshtcproutes",
	AllowToInspect:               true,
	IsPolicy:                     true,
	IsExperimental:               false,
	SingularDisplayName:          "Mesh TCP Route",
	PluralDisplayName:            "Mesh TCP Routes",
	IsPluginOriginated:           true,
	IsTargetRefBased:             true,
	HasToTargetRef:               true,
	HasFromTargetRef:             false,
	HasRulesTargetRef:            false,
	HasStatus:                    false,
	AllowedOnSystemNamespaceOnly: false,
	IsReferenceableInTo:          false,
	ShortName:                    "mtcpr",
	IsFromAsRules:                false,
}
