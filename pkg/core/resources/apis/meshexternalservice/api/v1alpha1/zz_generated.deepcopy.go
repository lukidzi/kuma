//go:build !ignore_autogenerated

// Code generated by controller-gen. DO NOT EDIT.

package v1alpha1

import (
	commonv1alpha1 "github.com/kumahq/kuma/api/common/v1alpha1"
	"k8s.io/apiextensions-apiserver/pkg/apis/apiextensions/v1"
)

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *Address) DeepCopyInto(out *Address) {
	*out = *in
	out.Origin = in.Origin
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new Address.
func (in *Address) DeepCopy() *Address {
	if in == nil {
		return nil
	}
	out := new(Address)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *AddressOrigin) DeepCopyInto(out *AddressOrigin) {
	*out = *in
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new AddressOrigin.
func (in *AddressOrigin) DeepCopy() *AddressOrigin {
	if in == nil {
		return nil
	}
	out := new(AddressOrigin)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *Endpoint) DeepCopyInto(out *Endpoint) {
	*out = *in
	if in.Port != nil {
		in, out := &in.Port, &out.Port
		*out = new(Port)
		**out = **in
	}
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new Endpoint.
func (in *Endpoint) DeepCopy() *Endpoint {
	if in == nil {
		return nil
	}
	out := new(Endpoint)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *Extension) DeepCopyInto(out *Extension) {
	*out = *in
	if in.Config != nil {
		in, out := &in.Config, &out.Config
		*out = new(v1.JSON)
		(*in).DeepCopyInto(*out)
	}
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new Extension.
func (in *Extension) DeepCopy() *Extension {
	if in == nil {
		return nil
	}
	out := new(Extension)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *Match) DeepCopyInto(out *Match) {
	*out = *in
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
func (in *MeshExternalService) DeepCopyInto(out *MeshExternalService) {
	*out = *in
	out.Match = in.Match
	if in.Extension != nil {
		in, out := &in.Extension, &out.Extension
		*out = new(Extension)
		(*in).DeepCopyInto(*out)
	}
	if in.Endpoints != nil {
		in, out := &in.Endpoints, &out.Endpoints
		*out = make([]Endpoint, len(*in))
		for i := range *in {
			(*in)[i].DeepCopyInto(&(*out)[i])
		}
	}
	if in.Tls != nil {
		in, out := &in.Tls, &out.Tls
		*out = new(Tls)
		(*in).DeepCopyInto(*out)
	}
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new MeshExternalService.
func (in *MeshExternalService) DeepCopy() *MeshExternalService {
	if in == nil {
		return nil
	}
	out := new(MeshExternalService)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *MeshExternalServiceStatus) DeepCopyInto(out *MeshExternalServiceStatus) {
	*out = *in
	if in.Vip != nil {
		in, out := &in.Vip, &out.Vip
		*out = new(VipStatus)
		**out = **in
	}
	if in.Addresses != nil {
		in, out := &in.Addresses, &out.Addresses
		*out = new([]Address)
		if **in != nil {
			in, out := *in, *out
			*out = make([]Address, len(*in))
			copy(*out, *in)
		}
	}
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new MeshExternalServiceStatus.
func (in *MeshExternalServiceStatus) DeepCopy() *MeshExternalServiceStatus {
	if in == nil {
		return nil
	}
	out := new(MeshExternalServiceStatus)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *SANMatch) DeepCopyInto(out *SANMatch) {
	*out = *in
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new SANMatch.
func (in *SANMatch) DeepCopy() *SANMatch {
	if in == nil {
		return nil
	}
	out := new(SANMatch)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *Tls) DeepCopyInto(out *Tls) {
	*out = *in
	if in.Version != nil {
		in, out := &in.Version, &out.Version
		*out = new(Version)
		(*in).DeepCopyInto(*out)
	}
	if in.Verification != nil {
		in, out := &in.Verification, &out.Verification
		*out = new(Verification)
		(*in).DeepCopyInto(*out)
	}
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new Tls.
func (in *Tls) DeepCopy() *Tls {
	if in == nil {
		return nil
	}
	out := new(Tls)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *Verification) DeepCopyInto(out *Verification) {
	*out = *in
	if in.Mode != nil {
		in, out := &in.Mode, &out.Mode
		*out = new(VerificationMode)
		**out = **in
	}
	if in.ServerName != nil {
		in, out := &in.ServerName, &out.ServerName
		*out = new(string)
		**out = **in
	}
	if in.SubjectAltNames != nil {
		in, out := &in.SubjectAltNames, &out.SubjectAltNames
		*out = new([]SANMatch)
		if **in != nil {
			in, out := *in, *out
			*out = make([]SANMatch, len(*in))
			copy(*out, *in)
		}
	}
	if in.CaCert != nil {
		in, out := &in.CaCert, &out.CaCert
		*out = new(commonv1alpha1.DataSource)
		(*in).DeepCopyInto(*out)
	}
	if in.ClientCert != nil {
		in, out := &in.ClientCert, &out.ClientCert
		*out = new(commonv1alpha1.DataSource)
		(*in).DeepCopyInto(*out)
	}
	if in.ClientKey != nil {
		in, out := &in.ClientKey, &out.ClientKey
		*out = new(commonv1alpha1.DataSource)
		(*in).DeepCopyInto(*out)
	}
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new Verification.
func (in *Verification) DeepCopy() *Verification {
	if in == nil {
		return nil
	}
	out := new(Verification)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *Version) DeepCopyInto(out *Version) {
	*out = *in
	if in.Min != nil {
		in, out := &in.Min, &out.Min
		*out = new(TlsVersion)
		**out = **in
	}
	if in.Max != nil {
		in, out := &in.Max, &out.Max
		*out = new(TlsVersion)
		**out = **in
	}
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new Version.
func (in *Version) DeepCopy() *Version {
	if in == nil {
		return nil
	}
	out := new(Version)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *VipStatus) DeepCopyInto(out *VipStatus) {
	*out = *in
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new VipStatus.
func (in *VipStatus) DeepCopy() *VipStatus {
	if in == nil {
		return nil
	}
	out := new(VipStatus)
	in.DeepCopyInto(out)
	return out
}
