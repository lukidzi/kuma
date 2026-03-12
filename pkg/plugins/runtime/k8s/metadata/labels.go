package metadata

const (
	// KumaMeshLabel defines a Pod label to associate objects
	// with a particular Mesh.
	// Label value must be the name of a Mesh resource.
	KumaMeshLabel = "kuma.io/mesh"

	// KumaZoneProxyTypeLabel is a Service label that drives zone proxy
	// listener generation on the Dataplane of a matching pod.
	// Allowed values: KumaZoneProxyTypeIngress, KumaZoneProxyTypeEgress.
	KumaZoneProxyTypeLabel = "k8s.kuma.io/zone-proxy-type"

	// KumaZoneProxyTypeIngress marks a Service as the public endpoint for a
	// mesh-scoped zone ingress proxy.
	KumaZoneProxyTypeIngress = "ingress"

	// KumaZoneProxyTypeEgress marks a Service as the endpoint for a
	// mesh-scoped zone egress proxy.
	KumaZoneProxyTypeEgress = "egress"
)
