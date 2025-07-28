package tls

import (
	"fmt"
)

const (
	MeshCaResource       = "mesh_ca"
	IdentityCertResource = "identity_cert"
	CpValidationCtx      = "cp_validation_ctx"
)

// KumaALPNProtocols are set for UpstreamTlsContext to show that mTLS is created by mesh.
// On the inbound side we have to distinguish Kuma mTLS and application TLS to properly
// support PERMISSIVE mode
var KumaALPNProtocols = []string{"kuma"}

func MeshSpiffeIDPrefix(mesh string) string {
	return fmt.Sprintf("spiffe://%s/", mesh)
}

func ServiceSpiffeID(_ string, _ string) string {
	return "spiffe://default.default.mesh.local/ns/kuma-demo"
}

func KumaID(tagName, tagValue string) string {
	return fmt.Sprintf("kuma://%s/%s", tagName, tagValue)
}
