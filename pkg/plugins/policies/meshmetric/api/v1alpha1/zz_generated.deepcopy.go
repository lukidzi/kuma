//go:build !ignore_autogenerated

// Code generated by controller-gen. DO NOT EDIT.

package v1alpha1

import ()

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *Application) DeepCopyInto(out *Application) {
	*out = *in
	if in.Path != nil {
		in, out := &in.Path, &out.Path
		*out = new(string)
		**out = **in
	}
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new Application.
func (in *Application) DeepCopy() *Application {
	if in == nil {
		return nil
	}
	out := new(Application)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *Backend) DeepCopyInto(out *Backend) {
	*out = *in
	if in.Name != nil {
		in, out := &in.Name, &out.Name
		*out = new(string)
		**out = **in
	}
	if in.Prometheus != nil {
		in, out := &in.Prometheus, &out.Prometheus
		*out = new(PrometheusBackend)
		(*in).DeepCopyInto(*out)
	}
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new Backend.
func (in *Backend) DeepCopy() *Backend {
	if in == nil {
		return nil
	}
	out := new(Backend)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *Conf) DeepCopyInto(out *Conf) {
	*out = *in
	if in.Sidecar != nil {
		in, out := &in.Sidecar, &out.Sidecar
		*out = new(Sidecar)
		(*in).DeepCopyInto(*out)
	}
	if in.Applications != nil {
		in, out := &in.Applications, &out.Applications
		*out = new([]Application)
		if **in != nil {
			in, out := *in, *out
			*out = make([]Application, len(*in))
			for i := range *in {
				(*in)[i].DeepCopyInto(&(*out)[i])
			}
		}
	}
	if in.Backends != nil {
		in, out := &in.Backends, &out.Backends
		*out = new([]Backend)
		if **in != nil {
			in, out := *in, *out
			*out = make([]Backend, len(*in))
			for i := range *in {
				(*in)[i].DeepCopyInto(&(*out)[i])
			}
		}
	}
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new Conf.
func (in *Conf) DeepCopy() *Conf {
	if in == nil {
		return nil
	}
	out := new(Conf)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *MeshMetric) DeepCopyInto(out *MeshMetric) {
	*out = *in
	in.TargetRef.DeepCopyInto(&out.TargetRef)
	in.Default.DeepCopyInto(&out.Default)
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new MeshMetric.
func (in *MeshMetric) DeepCopy() *MeshMetric {
	if in == nil {
		return nil
	}
	out := new(MeshMetric)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *PrometheusBackend) DeepCopyInto(out *PrometheusBackend) {
	*out = *in
	if in.Tls != nil {
		in, out := &in.Tls, &out.Tls
		*out = new(PrometheusTls)
		**out = **in
	}
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new PrometheusBackend.
func (in *PrometheusBackend) DeepCopy() *PrometheusBackend {
	if in == nil {
		return nil
	}
	out := new(PrometheusBackend)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *PrometheusTls) DeepCopyInto(out *PrometheusTls) {
	*out = *in
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new PrometheusTls.
func (in *PrometheusTls) DeepCopy() *PrometheusTls {
	if in == nil {
		return nil
	}
	out := new(PrometheusTls)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *Sidecar) DeepCopyInto(out *Sidecar) {
	*out = *in
	if in.Regex != nil {
		in, out := &in.Regex, &out.Regex
		*out = new(string)
		**out = **in
	}
	if in.UsedOnly != nil {
		in, out := &in.UsedOnly, &out.UsedOnly
		*out = new(bool)
		**out = **in
	}
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new Sidecar.
func (in *Sidecar) DeepCopy() *Sidecar {
	if in == nil {
		return nil
	}
	out := new(Sidecar)
	in.DeepCopyInto(out)
	return out
}
