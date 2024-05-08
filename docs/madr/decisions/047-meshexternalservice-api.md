# MeshExternalService API

* Status: accepted

Technical Story: https://github.com/kumahq/kuma/issues/6330

## Context and Problem Statement

The current implementation of `ExternalService` has significant limitations and warrants a complete redesign.

* Lack of support for wildcards `*`
* Cluster-scoped resource.
* Overriding real domain DNS records with custom IPs causes conflicts.
* Targeting with policies is not clear.
* ExternalService is derived from `kuma.io/service`.

## Considered Options

* MeshExternalService

## Decision Outcome

Chosen option: "MeshExternalService", because it's the only way.

### Positive Consequences

* Clearer structure.
* Enhanced functionalities.
* Better policy matching capabilities.

### Negative Consequences

* Whole new resource with a lot of new code.
* Temporarily increased complexity of a product until the migration is done.

## Pros and Cons of the Options

### MeshExternalService

We introduce a MeshExternalService object.

```yaml
kind: MeshExternalService
metadata:
  name: httpbin
  namespace: kuma-system
  labels: # you could then select this in when you use `MeshExternalService` in `to` section
    team: security-operators
    kuma.io/mesh: default
spec:
  accessPoint: Egress|Proxy
  match:
  - domain: *.myservice.svc.local
  - domain: google.com
  - cidr: 10.1.1.0/24
  - ip: 192.168.0.1
  ports:
  - name: tcp-port
    port: 443
    targetPort: 8443
    protocol: tcp # http, tcp, tls, grpc, http2
  destinations: # you can mix ip/domain/socket
  - address: 1.1.1.1
    port: 12345
  - address: example.com
  - address: unix://....
  tls:
    version:
      min: TLS_12 # or TLS_13
      max: TLS_12 # setting min=max means we require specific version
    allowRenegotiation: false
    verification:
      skip: true # if this is true then subjectAltNames don't take effect
      subjectAltNames: # if subjectAltNames is not defined then take domains
        - example.com
        - "spiffe://example.local/ns/local"
    caCert: 
      inline: 123
    clientCert:
      secret: 123
    clientKey:
      secret: 123
  plugin: # only 'plugin' or 'endpoints' is allowed
    type: Lambda
    config:
      ARN: arn:123:abc:xyz
status: # managed by CP. Not shared cross zone, but synced to global
  addresses:
  - hostname: xyz.com # generated or from matches
    status: Available # | NotAvailable
    origin: "universal-generator"
    reason: "not available because of the clash with ..."
  vips:
  - ip: <kube_cluster_ip> # or kuma VIP
    type: Kubernetes # | Kuma
```

Ports in Service can be named, so we can also name ports in MeshService. 
Target port can reference port in container by name. To avoid trying to resolve this port to a real port, we also support `targetPort#name`.
To support this, we'll also enhance our Dataplane model, so it's possible to name the inbound. 

To try to keep this MADR reasonable when it comes to length, next MADRs will cover
* Multizone strategy.
* Autogenerate MeshService on Kubernetes based on Service and on Universal based on Dataplane objects
* VIP and hostname management
* Policy matching
* Referencing MeshService in `Dataplane#outbound` and Reachable Services
