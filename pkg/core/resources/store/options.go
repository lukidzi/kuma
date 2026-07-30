package store

import (
	"fmt"
	"strings"
	"time"

	core_model "github.com/kumahq/kuma/v3/pkg/core/resources/model"
)

type CreateOptions struct {
	Name         string
	Mesh         string
	CreationTime time.Time
	Owner        core_model.Resource
	Labels       map[string]string
}

type CreateOptionsFunc func(*CreateOptions)

func NewCreateOptions(fs ...CreateOptionsFunc) *CreateOptions {
	opts := &CreateOptions{}
	for _, f := range fs {
		f(opts)
	}
	return opts
}

func CreateBy(key core_model.ResourceKey) CreateOptionsFunc {
	return CreateByKey(key.Name, key.Mesh)
}

func CreateByKey(name, mesh string) CreateOptionsFunc {
	return func(opts *CreateOptions) {
		opts.Name = name
		opts.Mesh = mesh
	}
}

func CreatedAt(creationTime time.Time) CreateOptionsFunc {
	return func(opts *CreateOptions) {
		opts.CreationTime = creationTime
	}
}

func CreateWithOwner(owner core_model.Resource) CreateOptionsFunc {
	return func(opts *CreateOptions) {
		opts.Owner = owner
	}
}

func CreateWithLabels(labels map[string]string) CreateOptionsFunc {
	return func(opts *CreateOptions) {
		opts.Labels = labels
	}
}

// Top level sections of a stored resource. They can be passed to UpdateOwnedFields
// on their own, or be the first segment of a more specific field path like "status.vips".
const (
	FieldSpec   = "spec"
	FieldStatus = "status"
	FieldLabels = "labels"
)

type UpdateOptions struct {
	ModificationTime time.Time
	Labels           map[string]string
	ModifyLabels     bool
	// FieldOwner names the component the update is attributed to. It is set together
	// with OwnedFields, see UpdateOwnedFields.
	FieldOwner string
	// OwnedFields lists the field paths the caller owns, see UpdateOwnedFields.
	OwnedFields []string
}

func ModifiedAt(modificationTime time.Time) UpdateOptionsFunc {
	return func(opts *UpdateOptions) {
		opts.ModificationTime = modificationTime
	}
}

func UpdateWithLabels(labels map[string]string) UpdateOptionsFunc {
	return func(opts *UpdateOptions) {
		opts.Labels = labels
		opts.ModifyLabels = true
	}
}

// UpdateOwnedFields narrows the update down to the listed field paths and attributes
// them to the given owner. Resources of Kuma are written by more than one component at
// a time (the KDS syncer owns spec and labels, the VIP allocator owns status.vips, ...),
// and a whole object update makes every one of them collide on the version of the object
// even when they touch disjoint fields.
//
// A store that can write the listed fields on their own does it without the version
// precondition, so writers of other fields don't conflict. On Kubernetes this is a
// server-side apply, which merges per field, so any path can be listed. Stores that can
// only write whole sections (Postgres, memory) honor the ownership when every listed
// path is a whole section, and fall back to a regular update otherwise.
//
// The owner has to be stable across restarts, Kubernetes tracks the fields under this
// name and takes them away from the previous owner on the first apply.
func UpdateOwnedFields(owner string, fields ...string) UpdateOptionsFunc {
	return func(opts *UpdateOptions) {
		opts.FieldOwner = owner
		opts.OwnedFields = fields
	}
}

// OwnsWholeSections returns true when the caller declared ownership and every owned
// path is a whole top level section, so a store that writes section by section can
// honor the ownership.
func (o *UpdateOptions) OwnsWholeSections() bool {
	if o.FieldOwner == "" || len(o.OwnedFields) == 0 {
		return false
	}
	for _, field := range o.OwnedFields {
		switch field {
		case FieldSpec, FieldStatus, FieldLabels:
		default:
			return false
		}
	}
	return true
}

// OwnsSection returns true when any of the owned paths belongs to the given section.
func (o *UpdateOptions) OwnsSection(section string) bool {
	for _, field := range o.OwnedFields {
		if field == section || strings.HasPrefix(field, section+".") {
			return true
		}
	}
	return false
}

type UpdateOptionsFunc func(*UpdateOptions)

func NewUpdateOptions(fs ...UpdateOptionsFunc) *UpdateOptions {
	opts := &UpdateOptions{}
	for _, f := range fs {
		f(opts)
	}
	return opts
}

type DeleteOptions struct {
	Name string
	Mesh string
}

type DeleteOptionsFunc func(*DeleteOptions)

func NewDeleteOptions(fs ...DeleteOptionsFunc) *DeleteOptions {
	opts := &DeleteOptions{}
	for _, f := range fs {
		f(opts)
	}
	return opts
}

func DeleteBy(key core_model.ResourceKey) DeleteOptionsFunc {
	return DeleteByKey(key.Name, key.Mesh)
}

func DeleteByKey(name, mesh string) DeleteOptionsFunc {
	return func(opts *DeleteOptions) {
		opts.Name = name
		opts.Mesh = mesh
	}
}

type DeleteAllOptions struct {
	Mesh string
}

type DeleteAllOptionsFunc func(*DeleteAllOptions)

func DeleteAllByMesh(mesh string) DeleteAllOptionsFunc {
	return func(opts *DeleteAllOptions) {
		opts.Mesh = mesh
	}
}

func NewDeleteAllOptions(fs ...DeleteAllOptionsFunc) *DeleteAllOptions {
	opts := &DeleteAllOptions{}
	for _, f := range fs {
		f(opts)
	}
	return opts
}

type GetOptions struct {
	Name       string
	Mesh       string
	Version    string
	Consistent bool
}

type GetOptionsFunc func(*GetOptions)

func NewGetOptions(fs ...GetOptionsFunc) *GetOptions {
	opts := &GetOptions{}
	for _, f := range fs {
		f(opts)
	}
	return opts
}

func GetBy(key core_model.ResourceKey) GetOptionsFunc {
	return GetByKey(key.Name, key.Mesh)
}

func GetByKey(name, mesh string) GetOptionsFunc {
	return func(opts *GetOptions) {
		opts.Name = name
		opts.Mesh = mesh
	}
}

func GetByVersion(version string) GetOptionsFunc {
	return func(opts *GetOptions) {
		opts.Version = version
	}
}

// GetConsistent forces consistency if storage provides eventual consistency like read replica for Postgres.
func GetConsistent() GetOptionsFunc {
	return func(opts *GetOptions) {
		opts.Consistent = true
	}
}

func (g *GetOptions) HashCode() string {
	return fmt.Sprintf("%s:%s", g.Name, g.Mesh)
}

type (
	// ListFilterFunc returns true if the item passes the filtering criteria
	ListFilterFunc func(rs core_model.Resource) bool
)

type ListOptions struct {
	Mesh         string
	PageSize     int
	PageOffset   string
	FilterFunc   ListFilterFunc
	NameContains string
	Ordered      bool
	ResourceKeys map[core_model.ResourceKey]struct{}
}

type ListOptionsFunc func(*ListOptions)

func NewListOptions(fs ...ListOptionsFunc) *ListOptions {
	opts := &ListOptions{}
	for _, f := range fs {
		f(opts)
	}
	return opts
}

// Filter returns true if the item passes the filtering criteria
func (l *ListOptions) Filter(rs core_model.Resource) bool {
	if l.FilterFunc == nil {
		return true
	}

	return l.FilterFunc(rs)
}

func ListByNameContains(name string) ListOptionsFunc {
	return func(opts *ListOptions) {
		opts.NameContains = name
	}
}

func ListByMesh(mesh string) ListOptionsFunc {
	return func(opts *ListOptions) {
		opts.Mesh = mesh
	}
}

func ListByPage(size int, offset string) ListOptionsFunc {
	return func(opts *ListOptions) {
		opts.PageSize = size
		opts.PageOffset = offset
	}
}

func ListByFilterFunc(filterFunc ListFilterFunc) ListOptionsFunc {
	return func(opts *ListOptions) {
		opts.FilterFunc = filterFunc
	}
}

func ListOrdered() ListOptionsFunc {
	return func(opts *ListOptions) {
		opts.Ordered = true
	}
}

func ListByResourceKeys(rk []core_model.ResourceKey) ListOptionsFunc {
	return func(opts *ListOptions) {
		resourcesKeys := map[core_model.ResourceKey]struct{}{}
		for _, val := range rk {
			resourcesKeys[val] = struct{}{}
		}
		opts.ResourceKeys = resourcesKeys
	}
}

func (l *ListOptions) IsCacheable() bool {
	return l.FilterFunc == nil
}

func (l *ListOptions) HashCode() string {
	return fmt.Sprintf("%s:%t:%s:%d:%s", l.Mesh, l.Ordered, l.NameContains, l.PageSize, l.PageOffset)
}
