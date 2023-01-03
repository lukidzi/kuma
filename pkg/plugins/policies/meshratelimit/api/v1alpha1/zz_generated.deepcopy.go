//go:build !ignore_autogenerated
// +build !ignore_autogenerated

// Code generated by controller-gen. DO NOT EDIT.

package v1alpha1

import ()

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *Conf) DeepCopyInto(out *Conf) {
	*out = *in
	in.Local.DeepCopyInto(&out.Local)
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
func (in *From) DeepCopyInto(out *From) {
	*out = *in
	in.TargetRef.DeepCopyInto(&out.TargetRef)
	in.Default.DeepCopyInto(&out.Default)
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new From.
func (in *From) DeepCopy() *From {
	if in == nil {
		return nil
	}
	out := new(From)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *HeaderValue) DeepCopyInto(out *HeaderValue) {
	*out = *in
	if in.Append != nil {
		in, out := &in.Append, &out.Append
		*out = new(bool)
		**out = **in
	}
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new HeaderValue.
func (in *HeaderValue) DeepCopy() *HeaderValue {
	if in == nil {
		return nil
	}
	out := new(HeaderValue)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *Local) DeepCopyInto(out *Local) {
	*out = *in
	if in.HTTP != nil {
		in, out := &in.HTTP, &out.HTTP
		*out = new(LocalHTTP)
		(*in).DeepCopyInto(*out)
	}
	if in.TCP != nil {
		in, out := &in.TCP, &out.TCP
		*out = new(LocalTCP)
		**out = **in
	}
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new Local.
func (in *Local) DeepCopy() *Local {
	if in == nil {
		return nil
	}
	out := new(Local)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *LocalHTTP) DeepCopyInto(out *LocalHTTP) {
	*out = *in
	out.Interval = in.Interval
	if in.OnRateLimit != nil {
		in, out := &in.OnRateLimit, &out.OnRateLimit
		*out = new(OnRateLimit)
		(*in).DeepCopyInto(*out)
	}
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new LocalHTTP.
func (in *LocalHTTP) DeepCopy() *LocalHTTP {
	if in == nil {
		return nil
	}
	out := new(LocalHTTP)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *LocalTCP) DeepCopyInto(out *LocalTCP) {
	*out = *in
	out.Interval = in.Interval
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new LocalTCP.
func (in *LocalTCP) DeepCopy() *LocalTCP {
	if in == nil {
		return nil
	}
	out := new(LocalTCP)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *MeshRateLimit) DeepCopyInto(out *MeshRateLimit) {
	*out = *in
	in.TargetRef.DeepCopyInto(&out.TargetRef)
	if in.From != nil {
		in, out := &in.From, &out.From
		*out = make([]From, len(*in))
		for i := range *in {
			(*in)[i].DeepCopyInto(&(*out)[i])
		}
	}
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new MeshRateLimit.
func (in *MeshRateLimit) DeepCopy() *MeshRateLimit {
	if in == nil {
		return nil
	}
	out := new(MeshRateLimit)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *OnRateLimit) DeepCopyInto(out *OnRateLimit) {
	*out = *in
	if in.Status != nil {
		in, out := &in.Status, &out.Status
		*out = new(uint32)
		**out = **in
	}
	if in.Headers != nil {
		in, out := &in.Headers, &out.Headers
		*out = make([]HeaderValue, len(*in))
		for i := range *in {
			(*in)[i].DeepCopyInto(&(*out)[i])
		}
	}
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new OnRateLimit.
func (in *OnRateLimit) DeepCopy() *OnRateLimit {
	if in == nil {
		return nil
	}
	out := new(OnRateLimit)
	in.DeepCopyInto(out)
	return out
}
