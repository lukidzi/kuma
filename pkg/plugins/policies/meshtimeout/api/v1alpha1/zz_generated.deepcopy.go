//go:build !ignore_autogenerated

// Code generated by controller-gen. DO NOT EDIT.

package v1alpha1

import (
	commonv1alpha1 "github.com/kumahq/kuma/api/common/v1alpha1"
	"k8s.io/apimachinery/pkg/apis/meta/v1"
)

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *Conf) DeepCopyInto(out *Conf) {
	*out = *in
	if in.ConnectionTimeout != nil {
		in, out := &in.ConnectionTimeout, &out.ConnectionTimeout
		*out = new(v1.Duration)
		**out = **in
	}
	if in.IdleTimeout != nil {
		in, out := &in.IdleTimeout, &out.IdleTimeout
		*out = new(v1.Duration)
		**out = **in
	}
	if in.Http != nil {
		in, out := &in.Http, &out.Http
		*out = new(Http)
		(*in).DeepCopyInto(*out)
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
func (in *Http) DeepCopyInto(out *Http) {
	*out = *in
	if in.RequestTimeout != nil {
		in, out := &in.RequestTimeout, &out.RequestTimeout
		*out = new(v1.Duration)
		**out = **in
	}
	if in.StreamIdleTimeout != nil {
		in, out := &in.StreamIdleTimeout, &out.StreamIdleTimeout
		*out = new(v1.Duration)
		**out = **in
	}
	if in.MaxStreamDuration != nil {
		in, out := &in.MaxStreamDuration, &out.MaxStreamDuration
		*out = new(v1.Duration)
		**out = **in
	}
	if in.MaxConnectionDuration != nil {
		in, out := &in.MaxConnectionDuration, &out.MaxConnectionDuration
		*out = new(v1.Duration)
		**out = **in
	}
	if in.RequestHeadersTimeout != nil {
		in, out := &in.RequestHeadersTimeout, &out.RequestHeadersTimeout
		*out = new(v1.Duration)
		**out = **in
	}
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new Http.
func (in *Http) DeepCopy() *Http {
	if in == nil {
		return nil
	}
	out := new(Http)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *MeshTimeout) DeepCopyInto(out *MeshTimeout) {
	*out = *in
	if in.TargetRef != nil {
		in, out := &in.TargetRef, &out.TargetRef
		*out = new(commonv1alpha1.TargetRef)
		(*in).DeepCopyInto(*out)
	}
	if in.To != nil {
		in, out := &in.To, &out.To
		*out = new([]To)
		if **in != nil {
			in, out := *in, *out
			*out = make([]To, len(*in))
			for i := range *in {
				(*in)[i].DeepCopyInto(&(*out)[i])
			}
		}
	}
	if in.From != nil {
		in, out := &in.From, &out.From
		*out = new([]From)
		if **in != nil {
			in, out := *in, *out
			*out = make([]From, len(*in))
			for i := range *in {
				(*in)[i].DeepCopyInto(&(*out)[i])
			}
		}
	}
	if in.Rules != nil {
		in, out := &in.Rules, &out.Rules
		*out = new([]Rule)
		if **in != nil {
			in, out := *in, *out
			*out = make([]Rule, len(*in))
			for i := range *in {
				(*in)[i].DeepCopyInto(&(*out)[i])
			}
		}
	}
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new MeshTimeout.
func (in *MeshTimeout) DeepCopy() *MeshTimeout {
	if in == nil {
		return nil
	}
	out := new(MeshTimeout)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *Rule) DeepCopyInto(out *Rule) {
	*out = *in
	in.Default.DeepCopyInto(&out.Default)
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new Rule.
func (in *Rule) DeepCopy() *Rule {
	if in == nil {
		return nil
	}
	out := new(Rule)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *To) DeepCopyInto(out *To) {
	*out = *in
	in.TargetRef.DeepCopyInto(&out.TargetRef)
	in.Default.DeepCopyInto(&out.Default)
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new To.
func (in *To) DeepCopy() *To {
	if in == nil {
		return nil
	}
	out := new(To)
	in.DeepCopyInto(out)
	return out
}
