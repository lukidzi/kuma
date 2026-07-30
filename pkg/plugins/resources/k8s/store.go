package k8s

import (
	"context"
	"encoding/json"
	"maps"
	"reflect"
	"strings"
	"sync"
	"time"

	"github.com/pkg/errors"
	kube_apierrs "k8s.io/apimachinery/pkg/api/errors"
	kube_meta "k8s.io/apimachinery/pkg/apis/meta/v1"
	kube_unstructured "k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
	kube_runtime "k8s.io/apimachinery/pkg/runtime"
	kube_client "sigs.k8s.io/controller-runtime/pkg/client"
	kube_apiutil "sigs.k8s.io/controller-runtime/pkg/client/apiutil"
	"sigs.k8s.io/controller-runtime/pkg/controller/controllerutil"

	"github.com/kumahq/kuma/v3/api/mesh/v1alpha1"
	core_model "github.com/kumahq/kuma/v3/pkg/core/resources/model"
	"github.com/kumahq/kuma/v3/pkg/core/resources/registry"
	"github.com/kumahq/kuma/v3/pkg/core/resources/store"
	k8s_common "github.com/kumahq/kuma/v3/pkg/plugins/common/k8s"
	k8s_model "github.com/kumahq/kuma/v3/pkg/plugins/resources/k8s/native/pkg/model"
	k8s_registry "github.com/kumahq/kuma/v3/pkg/plugins/resources/k8s/native/pkg/registry"
	"github.com/kumahq/kuma/v3/pkg/plugins/runtime/k8s/metadata"
	util_k8s "github.com/kumahq/kuma/v3/pkg/util/k8s"
)

func typeIsUnregistered(err error) bool {
	var typeErr *k8s_registry.UnknownTypeError
	return errors.As(err, &typeErr)
}

var _ store.ResourceStore = &KubernetesStore{}

type KubernetesStore struct {
	Client kube_client.Client
	// Reader reads straight from the API server. Client serves reads from the informer
	// cache, which lags behind a write that just lost a race on the version of an object.
	Reader    kube_client.Reader
	Converter k8s_common.Converter
	Scheme    *kube_runtime.Scheme
}

func NewStore(client kube_client.Client, reader kube_client.Reader, scheme *kube_runtime.Scheme, converter k8s_common.Converter) (store.ResourceStore, error) {
	return &KubernetesStore{
		Client:    client,
		Reader:    reader,
		Converter: converter,
		Scheme:    scheme,
	}, nil
}

func (s *KubernetesStore) Create(ctx context.Context, r core_model.Resource, fs ...store.CreateOptionsFunc) error {
	opts := store.NewCreateOptions(fs...)
	obj, err := s.Converter.ToKubernetesObject(r)
	if err != nil {
		if typeIsUnregistered(err) {
			return errors.Errorf("cannot create instance of unregistered type %q", r.Descriptor().Name)
		}
		return errors.Wrap(err, "failed to convert core model into k8s counterpart")
	}
	name, namespace, err := k8sNameNamespace(opts.Name, obj.Scope())
	if err != nil {
		return err
	}

	labels, annotations := SplitLabelsAndAnnotations(opts.Labels, obj.GetAnnotations())
	obj.GetObjectMeta().SetLabels(labels)
	obj.GetObjectMeta().SetAnnotations(annotations)
	obj.SetMesh(opts.Mesh)
	obj.GetObjectMeta().SetName(name)
	obj.GetObjectMeta().SetNamespace(namespace)

	if opts.Owner != nil {
		k8sOwner, err := s.Converter.ToKubernetesObject(opts.Owner)
		if err != nil {
			return errors.Wrap(err, "failed to convert core model into k8s counterpart")
		}
		if err := controllerutil.SetOwnerReference(k8sOwner, obj, s.Scheme); err != nil {
			return errors.Wrap(err, "failed to set owner reference for object")
		}
	}

	if err := s.Client.Create(ctx, obj); err != nil {
		if kube_apierrs.IsAlreadyExists(err) {
			return store.ErrorResourceAlreadyExists(r.Descriptor().Name, opts.Name, opts.Mesh)
		}
		return errors.Wrap(err, "failed to create k8s resource")
	}
	if err := s.writeStatus(ctx, r, obj); err != nil {
		return errors.Wrap(err, "failed to create status of k8s resource")
	}
	err = s.Converter.ToCoreResource(obj, r)
	if err != nil {
		return errors.Wrap(err, "failed to convert k8s model into core counterpart")
	}
	return nil
}

func (s *KubernetesStore) Update(ctx context.Context, r core_model.Resource, fs ...store.UpdateOptionsFunc) error {
	opts := store.NewUpdateOptions(fs...)

	obj, err := s.Converter.ToKubernetesObject(r)
	if err != nil {
		if typeIsUnregistered(err) {
			return errors.Errorf("cannot update instance of unregistered type %q", r.Descriptor().Name)
		}
		return errors.Wrapf(err, "failed to convert core model of type %s into k8s counterpart", r.Descriptor().Name)
	}

	updateLabels := r.GetMeta().GetLabels()
	if opts.ModifyLabels {
		updateLabels = opts.Labels
	}

	// an owner of single fields is one of several writers of the object, only a
	// server-side apply keeps their writes apart. An owner of whole sections is the only
	// writer of them and needs the removal of the values it stops writing, which an apply
	// can't do for the values another writer put in a merged list before it.
	if opts.FieldOwner != "" && !opts.OwnsWholeSections() {
		return s.apply(ctx, r, obj, updateLabels, opts)
	}

	labels, annotations := SplitLabelsAndAnnotations(updateLabels, obj.GetAnnotations())
	obj.GetObjectMeta().SetLabels(labels)
	obj.GetObjectMeta().SetAnnotations(annotations)
	obj.SetMesh(r.GetMeta().GetMesh())

	if err := s.write(ctx, r, obj, opts); err != nil {
		if kube_apierrs.IsConflict(err) {
			return store.ErrorResourceConflict(r.Descriptor().Name, r.GetMeta().GetName(), r.GetMeta().GetMesh())
		}
		return errors.Wrap(err, "failed to update k8s resource")
	}
	err = s.Converter.ToCoreResource(obj, r)
	if err != nil {
		return errors.Wrap(err, "failed to convert k8s model into core counterpart")
	}
	return nil
}

// conflictRetries is how many times a write of an owner of whole sections is repeated
// with a fresh version of the object. Every writer of the resource bumps the version,
// including the ones writing a different section, so the write can lose the race even
// though there is nothing to merge.
const conflictRetries = 3

// write sends the sections the caller owns, the whole object when it declared no
// ownership. A conflict is only about the version of the object, the caller owns the
// content it writes, so the version is refreshed from the API server and the write
// repeated. The refresh doesn't go through the informer cache, which serves the version
// the write just lost the race against.
func (s *KubernetesStore) write(ctx context.Context, r core_model.Resource, obj k8s_model.KubernetesObject, opts *store.UpdateOptions) error {
	owns := func(section string) bool {
		return opts.FieldOwner == "" || opts.OwnsSection(section)
	}
	withStatus := owns(store.FieldStatus)
	withObject := owns(store.FieldSpec) || owns(store.FieldLabels)

	retries := 0
	if opts.FieldOwner != "" {
		retries = conflictRetries
	}
	for attempt := 0; ; attempt++ {
		err := func() error {
			if withObject {
				if err := s.Client.Update(ctx, obj); err != nil {
					return err
				}
			}
			if !withStatus {
				return nil
			}
			return s.writeStatus(ctx, r, obj)
		}()
		if err == nil || !kube_apierrs.IsConflict(err) || attempt == retries {
			return err
		}
		if refreshErr := s.refreshVersion(ctx, obj); refreshErr != nil {
			if kube_apierrs.IsNotFound(refreshErr) {
				// the resource is gone, the conflict is the answer the caller expects
				return err
			}
			return refreshErr
		}
	}
}

// writeStatus sends the status of the resource to its subresource. Kuma CRDs enable the
// status subresource, so the write of the object itself drops the status.
func (s *KubernetesStore) writeStatus(ctx context.Context, r core_model.Resource, obj k8s_model.KubernetesObject) error {
	if !r.Descriptor().HasStatus || isNil(r.GetStatus()) {
		return nil
	}
	// the write of the object answered with the stored status, put the status of the
	// caller back before sending it
	if err := obj.SetStatus(r.GetStatus()); err != nil {
		return errors.Wrap(err, "failed to set status of k8s resource")
	}
	return s.Client.Status().Update(ctx, obj)
}

// refreshVersion reads the version of the object from the API server, bypassing the
// informer cache the store reads through, which lags behind the write that conflicted.
func (s *KubernetesStore) refreshVersion(ctx context.Context, obj k8s_model.KubernetesObject) error {
	latest := obj.DeepCopyObject().(k8s_model.KubernetesObject)
	key := kube_client.ObjectKeyFromObject(obj)
	if err := s.Reader.Get(ctx, key, latest); err != nil {
		return err
	}
	obj.GetObjectMeta().SetResourceVersion(latest.GetObjectMeta().GetResourceVersion())
	return nil
}

// apply writes only the fields the caller owns with a server-side apply, so that
// components writing other fields of the same object don't conflict. Fields the owner
// used to apply and no longer sets are removed, fields owned by anybody else are kept.
func (s *KubernetesStore) apply(
	ctx context.Context,
	r core_model.Resource,
	obj k8s_model.KubernetesObject,
	updateLabels map[string]string,
	opts *store.UpdateOptions,
) error {
	// annotations are derived from the labels of the owner only, the annotations already
	// on the object belong to whoever wrote them
	labels, annotations := SplitLabelsAndAnnotations(updateLabels, nil)
	obj.GetObjectMeta().SetLabels(labels)
	obj.GetObjectMeta().SetAnnotations(annotations)
	obj.SetMesh(r.GetMeta().GetMesh())

	full, err := toUnstructured(obj)
	if err != nil {
		return errors.Wrap(err, "failed to convert k8s resource into unstructured")
	}
	// the object built by the factory carries no TypeMeta, an apply configuration without
	// a kind is rejected before it reaches the API server
	gvk, err := kube_apiutil.GVKForObject(obj, s.Scheme)
	if err != nil {
		return errors.Wrap(err, "failed to resolve the kind of the k8s resource")
	}
	full["apiVersion"], full["kind"] = gvk.GroupVersion().String(), gvk.Kind

	objectPaths, statusPaths := splitOwnedFields(opts.OwnedFields)
	applied := false
	for _, apply := range []struct {
		paths  []string
		writer func(kube_runtime.ApplyConfiguration) error
	}{
		{paths: objectPaths, writer: func(cfg kube_runtime.ApplyConfiguration) error {
			return s.Client.Apply(ctx, cfg, kube_client.FieldOwner(opts.FieldOwner), kube_client.ForceOwnership)
		}},
		{paths: statusPaths, writer: func(cfg kube_runtime.ApplyConfiguration) error {
			return s.Client.Status().Apply(ctx, cfg, kube_client.FieldOwner(opts.FieldOwner), kube_client.ForceOwnership)
		}},
	} {
		if len(apply.paths) == 0 {
			continue
		}
		body, err := applyBody(full, apply.paths)
		if err != nil {
			return err
		}
		if err := apply.writer(kube_client.ApplyConfigurationFromUnstructured(body)); err != nil {
			// the uid in the body makes the API server reject the apply instead of
			// recreating an object that was deleted in the meantime
			if kube_apierrs.IsConflict(err) || kube_apierrs.IsNotFound(err) {
				return store.ErrorResourceConflict(r.Descriptor().Name, r.GetMeta().GetName(), r.GetMeta().GetMesh())
			}
			return errors.Wrap(err, "failed to apply k8s resource")
		}
		// the server returns the whole object, keep the freshest one for the caller
		if err := fromUnstructured(body.Object, obj); err != nil {
			return errors.Wrap(err, "failed to convert applied k8s resource")
		}
		applied = true
	}
	if !applied {
		return errors.Errorf("no fields to update, owner %q declared no owned fields", opts.FieldOwner)
	}
	return errors.Wrap(s.Converter.ToCoreResource(obj, r), "failed to convert k8s model into core counterpart")
}

// splitOwnedFields translates the owned field paths of the store into paths of the
// Kubernetes object, split into the ones written on the object itself and the ones
// written on its status subresource.
func splitOwnedFields(fields []string) ([]string, []string) {
	var object, status []string
	for _, field := range fields {
		switch {
		case field == store.FieldLabels:
			object = append(object, "metadata.labels", "metadata.annotations")
		case field == store.FieldStatus || strings.HasPrefix(field, store.FieldStatus+"."):
			status = append(status, field)
		default:
			object = append(object, field)
		}
	}
	return object, status
}

// applyBody builds an apply configuration holding the listed fields only. A field
// missing from the object is left out, which tells the API server to remove it in case
// the owner set it before.
func applyBody(full map[string]any, paths []string) (*kube_unstructured.Unstructured, error) {
	meta := map[string]any{}
	for _, field := range []string{"name", "namespace", "uid"} {
		if value, found, err := kube_unstructured.NestedFieldNoCopy(full, "metadata", field); err != nil {
			return nil, errors.Wrapf(err, "failed to read metadata.%s", field)
		} else if found {
			meta[field] = value
		}
	}
	body := map[string]any{
		"apiVersion": full["apiVersion"],
		"kind":       full["kind"],
		"metadata":   meta,
	}
	for _, path := range paths {
		fields := strings.Split(path, ".")
		value, found, err := kube_unstructured.NestedFieldNoCopy(full, fields...)
		if err != nil {
			return nil, errors.Wrapf(err, "failed to read %s", path)
		}
		if !found {
			continue
		}
		if err := kube_unstructured.SetNestedField(body, value, fields...); err != nil {
			return nil, errors.Wrapf(err, "failed to set %s", path)
		}
	}
	return &kube_unstructured.Unstructured{Object: body}, nil
}

func toUnstructured(obj any) (map[string]any, error) {
	bytes, err := json.Marshal(obj)
	if err != nil {
		return nil, err
	}
	out := map[string]any{}
	if err := json.Unmarshal(bytes, &out); err != nil {
		return nil, err
	}
	return out, nil
}

func fromUnstructured(in map[string]any, obj any) error {
	bytes, err := json.Marshal(in)
	if err != nil {
		return err
	}
	return json.Unmarshal(bytes, obj)
}

func isNil(v any) bool {
	if v == nil {
		return true
	}
	value := reflect.ValueOf(v)
	return value.Kind() == reflect.Pointer && value.IsNil()
}

func (s *KubernetesStore) Delete(ctx context.Context, r core_model.Resource, fs ...store.DeleteOptionsFunc) error {
	opts := store.NewDeleteOptions(fs...)

	// get object and validate mesh
	if err := s.Get(ctx, r, store.GetByKey(opts.Name, opts.Mesh)); err != nil {
		return err
	}

	obj, err := s.Converter.ToKubernetesObject(r)
	if err != nil {
		// Unregistered types can't exist in the first place, so deletion would automatically succeed.
		if typeIsUnregistered(err) {
			return nil
		}
		return errors.Wrapf(err, "failed to convert core model of type %s into k8s counterpart", r.Descriptor().Name)
	}

	name, namespace, err := k8sNameNamespace(opts.Name, obj.Scope())
	if err != nil {
		return err
	}
	obj.GetObjectMeta().SetName(name)
	obj.GetObjectMeta().SetNamespace(namespace)
	if err := s.Client.Delete(ctx, obj); err != nil {
		if kube_apierrs.IsNotFound(err) {
			return nil
		}
		return errors.Wrap(err, "failed to delete k8s resource")
	}
	return nil
}

func (s *KubernetesStore) Get(ctx context.Context, r core_model.Resource, fs ...store.GetOptionsFunc) error {
	opts := store.NewGetOptions(fs...)
	obj, err := s.Converter.ToKubernetesObject(r)
	if err != nil {
		if typeIsUnregistered(err) {
			return store.ErrorResourceNotFound(r.Descriptor().Name, opts.Name, opts.Mesh)
		}
		return errors.Wrapf(err, "failed to convert core model of type %s into k8s counterpart", r.Descriptor().Name)
	}
	name, namespace, err := k8sNameNamespace(opts.Name, obj.Scope())
	if err != nil {
		return err
	}
	if err := s.Client.Get(ctx, kube_client.ObjectKey{Namespace: namespace, Name: name}, obj); err != nil {
		if kube_apierrs.IsNotFound(err) {
			return store.ErrorResourceNotFound(r.Descriptor().Name, opts.Name, opts.Mesh)
		}
		return errors.Wrap(err, "failed to get k8s resource")
	}
	if err := s.Converter.ToCoreResource(obj, r); err != nil {
		return errors.Wrap(err, "failed to convert k8s model into core counterpart")
	}
	if opts.Version != "" && r.GetMeta().GetVersion() != opts.Version {
		return store.ErrorResourceConflict(r.Descriptor().Name, opts.Name, opts.Mesh)
	}
	if r.GetMeta().GetMesh() != opts.Mesh {
		return store.ErrorResourceNotFound(r.Descriptor().Name, opts.Name, opts.Mesh)
	}
	return nil
}

func (s *KubernetesStore) List(ctx context.Context, rs core_model.ResourceList, fs ...store.ListOptionsFunc) error {
	opts := store.NewListOptions(fs...)
	obj, err := s.Converter.ToKubernetesList(rs)
	if err != nil {
		if typeIsUnregistered(err) {
			return nil
		}
		return errors.Wrapf(err, "failed to convert core list model of type %s into k8s counterpart", rs.GetItemType())
	}
	if err := s.Client.List(ctx, obj); err != nil {
		return errors.Wrap(err, "failed to list k8s resources")
	}
	predicate := func(r core_model.Resource) bool {
		if opts.Mesh != "" && r.GetMeta().GetMesh() != opts.Mesh {
			return false
		}
		if opts.NameContains != "" && !strings.Contains(r.GetMeta().GetName(), opts.NameContains) {
			return false
		}
		return true
	}
	fullList, err := registry.Global().NewList(rs.GetItemType())
	if err != nil {
		return err
	}
	if err := s.Converter.ToCoreList(obj, fullList, predicate); err != nil {
		return errors.Wrap(err, "failed to convert k8s model into core counterpart")
	}

	for _, item := range fullList.GetItems() {
		_ = rs.AddItem(item)
	}

	rs.GetPagination().SetTotal(uint32(len(fullList.GetItems())))
	return nil
}

func k8sNameNamespace(coreName string, scope k8s_model.Scope) (string, string, error) {
	if coreName == "" {
		return "", "", store.ErrorInvalid("name can't be empty")
	}
	switch scope {
	case k8s_model.ScopeCluster:
		return coreName, "", nil
	case k8s_model.ScopeNamespace:
		name, ns, err := util_k8s.CoreNameToK8sName(coreName)
		if err != nil {
			return "", "", store.ErrorInvalid(err.Error())
		}
		return name, ns, nil
	default:
		return "", "", errors.Errorf("unknown scope %s", scope)
	}
}

// Kuma resource labels are generally stored on Kubernetes as labels, except "kuma.io/display-name".
// We store it as an annotation because the resource name on k8s is limited by 253 and the label value is limited by 63.
func SplitLabelsAndAnnotations(coreLabels map[string]string, currentAnnotations map[string]string) (map[string]string, map[string]string) {
	labels := maps.Clone(coreLabels)
	annotations := maps.Clone(currentAnnotations)
	if annotations == nil {
		annotations = map[string]string{}
	}
	if v, ok := labels[v1alpha1.DisplayName]; ok {
		annotations[v1alpha1.DisplayName] = v
		delete(labels, v1alpha1.DisplayName)
	}
	// ServiceAccount object names are constrained by the DNS subdomain name specification, with a maximum length of 253 characters.
	// Since the source name can exceed this length, we are storing the full, original name as an annotation on the ServiceAccount object.
	// https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/#use-multiple-service-accounts
	if v, ok := labels[metadata.KumaServiceAccount]; ok {
		annotations[metadata.KumaServiceAccount] = v
		delete(labels, metadata.KumaServiceAccount)
	}
	// Workload names can exceed 63 characters (up to 253), which exceeds label length limits.
	// Store as annotation similar to kuma.io/display-name.
	if v, ok := labels[metadata.KumaWorkload]; ok {
		annotations[metadata.KumaWorkload] = v
		delete(labels, metadata.KumaWorkload)
	}
	return labels, annotations
}

var _ core_model.ResourceMeta = &KubernetesMetaAdapter{}

type KubernetesMetaAdapter struct {
	kube_meta.ObjectMeta
	Mesh string

	// cachedLabels memoizes the result of GetLabels. May be pre-populated by
	// CachingConverter on cache hit to reuse labels computed for an earlier
	// call against the same resourceVersion.
	cachedLabels map[string]string
	labelsOnce   sync.Once
}

func (m *KubernetesMetaAdapter) GetName() string {
	if m.Namespace == "" { // it's cluster scoped object
		return m.Name
	}
	return util_k8s.K8sNamespacedNameToCoreName(m.Name, m.Namespace)
}

func (m *KubernetesMetaAdapter) GetNameExtensions() core_model.ResourceNameExtensions {
	return k8s_common.ResourceNameExtensions(m.Namespace, m.Name)
}

func (m *KubernetesMetaAdapter) GetVersion() string {
	return m.GetResourceVersion()
}

func (m *KubernetesMetaAdapter) GetMesh() string {
	return m.Mesh
}

func (m *KubernetesMetaAdapter) GetCreationTime() time.Time {
	return m.GetObjectMeta().GetCreationTimestamp().Time
}

func (m *KubernetesMetaAdapter) GetModificationTime() time.Time {
	return m.GetObjectMeta().GetCreationTimestamp().Time
}

// GetLabels returns the labels of the underlying Kubernetes object enriched
// with annotation-derived entries (display name, Kuma service account, Kuma
// workload). The computation is memoized per adapter instance: callers MUST
// treat the returned map as read-only. Mutating it would corrupt both the
// adapter's cache and, when the adapter was produced by CachingConverter, the
// cross-reconcile entry shared via resourceVersion key.
func (m *KubernetesMetaAdapter) GetLabels() map[string]string {
	m.labelsOnce.Do(func() {
		if m.cachedLabels != nil {
			// Pre-populated by CachingConverter on cache hit; nothing to do.
			return
		}
		labels := maps.Clone(m.GetObjectMeta().GetLabels())
		if labels == nil {
			labels = map[string]string{}
		}
		if displayName, ok := m.GetObjectMeta().GetAnnotations()[v1alpha1.DisplayName]; ok {
			labels[v1alpha1.DisplayName] = displayName
		} else {
			labels[v1alpha1.DisplayName] = m.GetObjectMeta().GetName()
		}
		if sa, ok := m.GetObjectMeta().GetAnnotations()[metadata.KumaServiceAccount]; ok {
			labels[metadata.KumaServiceAccount] = sa
		}
		if workload, ok := m.GetObjectMeta().GetAnnotations()[metadata.KumaWorkload]; ok {
			labels[metadata.KumaWorkload] = workload
		}
		m.cachedLabels = labels
	})
	return m.cachedLabels
}

type KubeFactory interface {
	NewObject(r core_model.Resource) (k8s_model.KubernetesObject, error)
	NewList(rl core_model.ResourceList) (k8s_model.KubernetesList, error)
}

var _ KubeFactory = &SimpleKubeFactory{}

type SimpleKubeFactory struct {
	KubeTypes k8s_registry.TypeRegistry
}

func (f *SimpleKubeFactory) NewObject(r core_model.Resource) (k8s_model.KubernetesObject, error) {
	return f.KubeTypes.NewObject(r.GetSpec())
}

func (f *SimpleKubeFactory) NewList(rl core_model.ResourceList) (k8s_model.KubernetesList, error) {
	return f.KubeTypes.NewList(rl.NewItem().GetSpec())
}
