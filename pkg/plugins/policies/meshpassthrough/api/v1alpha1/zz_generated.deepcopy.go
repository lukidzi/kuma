//go:build !ignore_autogenerated

// Code generated by controller-gen. DO NOT EDIT.

package v1alpha1

import (
	commonv1alpha1 "github.com/kumahq/kuma/api/common/v1alpha1"
)

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *Conf) DeepCopyInto(out *Conf) {
	*out = *in
	if in.PassthroughMode != nil {
		in, out := &in.PassthroughMode, &out.PassthroughMode
		*out = new(PassthroughMode)
		**out = **in
	}
	if in.AppendMatch != nil {
		in, out := &in.AppendMatch, &out.AppendMatch
		*out = new([]Match)
		if **in != nil {
			in, out := *in, *out
			*out = make([]Match, len(*in))
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
func (in *Match) DeepCopyInto(out *Match) {
	*out = *in
	if in.Port != nil {
		in, out := &in.Port, &out.Port
		*out = new(uint32)
		**out = **in
	}
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new Match.
func (in *Match) DeepCopy() *Match {
	if in == nil {
		return nil
	}
	out := new(Match)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *MeshPassthrough) DeepCopyInto(out *MeshPassthrough) {
	*out = *in
	if in.TargetRef != nil {
		in, out := &in.TargetRef, &out.TargetRef
		*out = new(commonv1alpha1.TargetRef)
		(*in).DeepCopyInto(*out)
	}
	in.Default.DeepCopyInto(&out.Default)
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new MeshPassthrough.
func (in *MeshPassthrough) DeepCopy() *MeshPassthrough {
	if in == nil {
		return nil
	}
	out := new(MeshPassthrough)
	in.DeepCopyInto(out)
	return out
}
