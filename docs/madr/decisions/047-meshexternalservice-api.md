# MeshExternalService API

* Status: accepted

Technical Story: https://github.com/kumahq/kuma/issues/6330

## Context and Problem Statement

The current implementation of `ExternalService` has significant limitations and warrants a complete redesign.

* Lack of support for * subdomains
* Lack of support for thick clients (think Kafka or C* where discovery is done as part of the client).
* Need for pluggability (for example lambda support or equivalent)
* Working well with gateways (what if your ExternalService relies on SNI/host header to route through a gateway)
* Applying policies


## Considered Options

* Creating MeshExternalService + HostnameGenerator
* Creating MeshExternalService

## Decision Outcome

Chosen option: "Creating MeshExternalService".

### Positive Consequences

* Clearer structure.
* Enhanced functionalities.
* Better policy matching capabilities.
* No need for a HostnameGenerator

### Negative Consequences

* Whole new resource with a lot of new code.
* Temporarily increased complexity of a product until the migration is done.

## Pros and Cons of the Options

### Creating MeshExternalService

We introduce a MeshExternalService object.

```yaml
kind: MeshExternalService
metadata:
  name: example
  namespace: kuma-system
  labels:
    kuma.io/mesh: default
    kuma.io/zone: east-1
spec:
  match:
  - type: InternalVIP # Kuma will generate a domain
    value: example.ext.svc.local
    port: 80
    protocol: http
  - type: Domain # Existing domain
    value: httpbin.com
    port: 80
    protocol: http
  - type: CIDR
    value: 10.1.1.0/24
    port: 80
    protocol: http
  - type: IP
    value: 192.168.0.1
    port: 80
    protocol: http
 destination:
   type: Regular # Regular|Passthrough|Extension
   extension:
     type: Lambda 
     config: # type JSON
       arn: arn:aws:lambda:us-west-2:123456789012:function:my-function
   endpoints:
   - address: 1.1.1.1
     port: 12345
   - address: example.com
   - address: unix://....
   tls:
     enabled: true
     version:
       min: TLS_12 # or TLS_13
       max: TLS_12 # setting min=max means we require specific version
     allowRenegotiation: false
     verification:
       skip: true # if this is true then subjectAltNames don't take effect
       subjectAltNames: # if subjectAltNames is not defined then take domain or ips
         - example.com
         - "spiffe://example.local/ns/local"
     caCert: 
       inline: 123
     clientCert:
       secret: 123
     clientKey:
       secret: 123
status: 
  vips:
  - ip: 242.0.0.1
    type: Kuma
    hostname: example.ext.svc.local
```
* **spec**:
  * **match**: defines a list of internalVIPs/domains/CIDR/IPs that should be routed through the sidecar
    * **type**: type of the match, one of `InternalVIP`, `Domain`, `CIDR` and `IP` are available
      * `InternalVIP`: allocates a VIP for a domain provided in the `value` field
      * `Domain`: handles traffic to the specified domain
      * `CIDR`: handles traffic to specified addresses range
      * `IP` handles the traffic to specified IP
    * **value**: depends of the type can be an existing domain, new domain name, CIDR or IP
  * **ports**: defines a list of ports and protocols
    * **port**: defines a port to which a user does requests
    * **protocol**: defines a protocol of the communication. Possible values:
      * tls: should be used when TLS traffic is originated by the client application
      * tcp: WARNING: shouldn't be used when match has only domains. On the TCP level we are not able to disinguish domain, in this case it is going to hijack whole traffic on this port.
      * grpc
      * http
      * http2
    * **targetPort**: defines a target port to which traffic should be sent. 
  * **destination**: defines where matched requests should be routed
    * **type**: defines what kind of destination is it, one of `Regular`, `Passthrough`, or `Extension`, (Default: `Passthrough`)
      * `Regular`: allows creating a set of destination endpoints and `TLS` configuration, when defined section `extension` is not available.
      * `Passthrough`: traffic just passes a proxy without any modifications to the original destination, when defined sections `endpoints`, `tls` and `extension` are not available.
      * `Extension`: allows specifying a custom plugin for example, user can create a plugin which support AWS Lambda, when defined sections `endpoints` and `tls` are not available.
    * **extension**: struct for a plugin configuration
      * **type**: defines what kind of plugin to use, it's a string type so any new plugins should works.
      * **config**: json map that is mapped to configuration provided in the type.
    * **endpoints**: defines a list of endpoints
      * **address**: defines an address to which a user want to send a request. Is possible to provide `domain`, `ip` and `unix` sockets
      * **port**: defines a port of a destination.
    * **tls**: provides a TLS configuration when proxy is resposible for a TLS origination
      * **enabled**: defines if proxy should originate TLS.
      * **version**: section for providing version specification.
        * **min**: defines minmum supported version.
        * **max**: defines maximum supported version.
      * **allowRenegotiation**: defines if TLS sessions will allow renegotiation.
      * **verification**: section for providing TLS verification details.
        * **skip**: defines if proxy should skip SAN verification. Default `false`.
        * **subjectAltNames**: list of names to verify in the certificate.
      * **caCert**: defines a certificate of CA.
        * one of `inline`, `inlineString` or `secret`.
      * **clientCert**: defines a certificate of a client.
        * one of `inline`, `inlineString` or `secret`.
      * **clientKey**: defines a client private key.
        * one of `inline`, `inlineString` or `secret`.
* **status**: status of an object managed by Kuma control-plane
  * **vips**: list of allocated VIPs
    * **ip**: allocated IP for a provided domain with `InternalVIP` type in a match section
    * **type**: provides information about the way IP was provided
    * **hostname**: provides a domain with `InternalVIP` type in a match section for which IP was allocated. In case of many entries it helps corelating entries.

#### Extensability

Provided model allows creating separate plugins which can integrate with different cloud providers or components. The user can create it's own custom configuration and later in the code create XDS configuration based on it. 

Example:

```yaml
kind: MeshExternalService
metadata:
  name: example
  namespace: kuma-system
  labels:
    kuma.io/mesh: default
    kuma.io/zone: east-1
spec:
  match:
  - type: InternalVIP
    value: example.ext.svc.local
    port: 80
    protocol: http
 destination:
   type: Extension
   extension:
     type: Lambda 
     config:
       arn: arn:aws:lambda:us-west-2:123456789012:function:my-function
```

#### Domain generation

The `ExternalService` resource automatically allocated an internal IP each real domain (e.g. `httpbin.com`). While this approach offered benefits such as avoiding the allocation of a listener for a specific port listening on `0.0.0.0`, it obscured the existing domain behind a custom IP. With the introduction of `MeshExternalService`, we expose to users a type called `InternalVIP`, enabling the creation of domains for specific external services.

```yaml
kind: MeshExternalService
metadata:
  name: mongo
  namespace: kuma-system
  labels:
    kuma.io/mesh: default
spec:
  match:
  - type: InternalVIP # Kuma will generate a domain
    value: mongo.ext.svc.local
    port: 27017
    protocol: tcp
 destination:
   type: Regular # Regular|Passthrough|Extension
   endpoints:
   - address: 10.0.0.1
     port: 27017
   - address: 10.0.0.2
     port: 27017
status: 
  vips:
  - ip: 242.0.0.1
    type: Kuma
    hostname: mongo.ext.svc.local
```

In this scenario, we generate a custom domain `mongo.ext.svc.local` and allocate the address `242.0.0.1` to it.

#### Other options

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
  - port: 443
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