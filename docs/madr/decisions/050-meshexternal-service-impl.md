# MeshExternalService implementation

* Status: accepted

## Context and Problem Statement

We have a new policy that allows defining `MeshExternalServices` but it's not implemented, and configuration is not affecting dataplanes. This MADR is going to provide details of implementation from the point of Kuma and Envoy.

## Current solution

Currently, for each `ExternalService` we generate custom DNS entry and when a user does a request to the domain, we return custom IP address. The sidecar has a listner on the port and when the request arrives we are able to match it with this listener and route traffic to desired `ExternalService`. This solution has some limitations. One of them, we cannot create 2 external services pointing to the same domain but with different TLS context.

## Considered Options

* Implement `MeshExternalServices` using filter chain matches
* Implement `MeshExternalServices` using separate listeners and filter chain matches

## Decision Outcome

Implement `MeshExternalServices` using filter chain matches because it's simpler and doesn't require us to allocate separate listeners.

### Positive Consequences

* No need to allocate separate listeners
* Simpler implementation

### Negative Consequences

* Problem with Universal without transparent proxy
* Quite complicated config
* Some of the matchers are in a alpha phase

### Implement `MeshExternalServices` using filter chain matches

In a new release of Envoy, [Matcher API](https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/advanced/matching/matching_listener#arch-overview-matching-listener) gets out of a Alpha phase and is stable. We can use it to support different external services on a listener.

#### Envoy configuration

With transparent proxy each sidecar has a listner listing on port 15001 for all outgoing traffic. Instead of creating a new lisener we are going to add a [`filter_chain_matcher`](https://www.envoyproxy.io/docs/envoy/latest/xds/type/matcher/v3/matcher.proto#envoy-v3-api-msg-xds-type-matcher-v3-matcher) matching specific requests and filter chains handling these requests. Apart from that we needs listner filters to retrieve specific details about traffic:
* [envoy.extensions.filters.listener.original_dst.v3.OriginalDst](filters.listener.original_dst.v3.OriginalDst) - details about traffic port, ip
* [envoy.extensions.filters.listener.tls_inspector.v3.TlsInspector](https://www.envoyproxy.io/docs/envoy/latest/configuration/listeners/listener_filters/tls_inspector) - for server name information, and TLS detection
* [envoy.extensions.filters.listener.http_inspector.v3.HttpInspector](https://www.envoyproxy.io/docs/envoy/latest/configuration/listeners/listener_filters/http_inspector) - for http protocol detection

The idea is to match at the begining the most specific requests and at the end less specific to avoid situation that there is a more specific match.

1. Match port
2. Match protocol
3. Match exact hostname(http/1.1 and h2c), server name(tls), IP
4. Match wildecard domain or CIDR

`MeshExternalService` should works also with a passthrough mode set on Mesh resource. In this case we can add a `default_filter_chain` which handles the traffic if there is no matching filter for this purpose. 

```yaml
    default_filter_chain:
      filters:
      - name: tcp_proxy
        typed_config:
          "@type": type.googleapis.com/envoy.extensions.filters.network.tcp_proxy.v3.TcpProxy
          stat_prefix: default_filter_chain
          cluster: outbound:passthrough:ipv4
```

When `passthrough` mode on the Mesh is disabled, listener won't have a fallback filter chain.

##### Example

Let's have 2 `MeshExternalServices`
```yaml
kind: MeshExternalService
metadata:
  name: example1
  namespace: kuma-system
  labels:
    kuma.io/mesh: default
spec:
  match:
  - type: InternalVIP # Kuma will generate a domain
    value: example.ext.svc.local
    port: 80
    protocol: http
  - type: Domain 
    value: httpbin.com
    port: 80
    protocol: http
  - type: Domain 
    value: httpbin.com
    port: 443
    protocol: tls
  - type: CIDR 
    value: 192.168.0.1/24
    port: 9090
    protocol: tcp
```

```yaml
kind: MeshExternalService
metadata:
  name: example2
  namespace: kuma-system
  labels:
    kuma.io/mesh: default
spec:
  match:
  - type: IP 
    value: 192.168.0.10
    port: 9090
    protocol: tcp
  destination:
    type: Regular
    endpoints:
    - address: httpbin.com
      port: 80
```

We should create a follwing configuration:

```yaml
static_resources:
  listeners:
  - name: outbound
    address:
      socket_address:
        address: 0.0.0.0
        port_value: 15001
    default_filter_chain:
      filters:
      - name: tcp_proxy
        typed_config:
          "@type": type.googleapis.com/envoy.extensions.filters.network.tcp_proxy.v3.TcpProxy
          stat_prefix: default_filter_chain
          cluster: default:passthrough
    listener_filters:
    - name: original_dst
      typed_config:
        "@type": type.googleapis.com/envoy.extensions.filters.listener.original_dst.v3.OriginalDst
    - name: tls_inspector
      typed_config:
        "@type": type.googleapis.com/envoy.extensions.filters.listener.tls_inspector.v3.TlsInspector
    - name: "envoy.filters.listener.http_inspector"
      typed_config:
        "@type": type.googleapis.com/envoy.extensions.filters.listener.http_inspector.v3.HttpInspector
    traffic_direction: OUTBOUND
    use_original_dst: true
    filter_chains:
    - name: http
      filters:
      - name: http_connection_manager
        typed_config:
          "@type": type.googleapis.com/envoy.extensions.filters.network.http_connection_manager.v3.HttpConnectionManager
          stat_prefix: ingress_http
          route_config:
            name: local_route
            virtual_hosts:
            - name: example.ext.svc.local
              domains: ["example.ext.svc.local"]
              routes:
              - match:
                  prefix: "/"
                route:
                  cluster: example_80
            - name: httpbin.com
              domains: ["httpbin.com"]
              routes:
              - match:
                  prefix: "/"
                route:
                  cluster: example_80
          http_filters:
          - name: router
            typed_config:
              "@type": type.googleapis.com/envoy.extensions.filters.http.router.v3.Router
    - name: tls
      filters:
      - name: tcp_proxy
        typed_config:
          "@type": type.googleapis.com/envoy.extensions.filters.network.tcp_proxy.v3.TcpProxy
          stat_prefix: tls
          cluster: example_443
    - name: example2_tcp
      filters:
      - name: tcp_proxy
        typed_config:
          "@type": type.googleapis.com/envoy.extensions.filters.network.tcp_proxy.v3.TcpProxy
          stat_prefix: example2_tcp
          cluster: example2_9090
    - name: example_tcp
      filters:
      - name: tcp_proxy
        typed_config:
          "@type": type.googleapis.com/envoy.extensions.filters.network.tcp_proxy.v3.TcpProxy
          stat_prefix: example_tcp
          cluster: example_9090
    # Snippet: 58-102
    filter_chain_matcher:
      matcher_tree:
        input:
          name: transport
          typed_config:
            "@type": type.googleapis.com/envoy.extensions.matching.common_inputs.network.v3.TransportProtocolInput
        exact_match_map:
          map:
            "tls":
              matcher:
                matcher_tree:
                  input:
                    name: envoy.matching.inputs.destination_port
                    typed_config:
                      "@type": type.googleapis.com/envoy.extensions.matching.common_inputs.network.v3.DestinationPortInput
                  exact_match_map:
                    map:
                      "443":
                        matcher:
                          matcher_list:
                            matchers:
                              - predicate:
                                  or_matcher:
                                    predicate:
                                    - single_predicate:
                                        input:
                                          name: envoy.matching.inputs.application_protocol
                                          typed_config:
                                            "@type": type.googleapis.com/envoy.extensions.matching.common_inputs.network.v3.ApplicationProtocolInput
                                        value_match:
                                          contains: "http/1.1"
                                    - single_predicate:
                                        input:
                                          name: envoy.matching.inputs.application_protocol
                                          typed_config:
                                            "@type": type.googleapis.com/envoy.extensions.matching.common_inputs.network.v3.ApplicationProtocolInput
                                        value_match:
                                          contains: "h2c"
                                on_match:
                                  action:
                                    name: tls
                                    typed_config:
                                      "@type": type.googleapis.com/google.protobuf.StringValue
                                      value: tls
                              - predicate: 
                                  single_predicate:
                                    input:
                                      name: tls
                                      typed_config:
                                        "@type": type.googleapis.com/envoy.extensions.matching.common_inputs.network.v3.ServerNameInput
                                    value_match:
                                      exact: "httpbin.com"
                                on_match:
                                  action:
                                    name: tls
                                    typed_config:
                                      "@type": type.googleapis.com/google.protobuf.StringValue
                                      value: tls
            "raw_buffer":
              matcher:
                matcher_tree:
                  input:
                    name: envoy.matching.inputs.destination_port
                    typed_config:
                      "@type": type.googleapis.com/envoy.extensions.matching.common_inputs.network.v3.DestinationPortInput
                  exact_match_map:
                    map:
                      80:
                        action:
                          name: http
                          typed_config:
                            "@type": type.googleapis.com/google.protobuf.StringValue
                            value: http
                      9090:
                        matcher:
                          matcher_tree:
                            input:
                              name: ip
                              typed_config:
                                "@type": type.googleapis.com/envoy.extensions.matching.common_inputs.network.v3.DestinationIPInput
                            custom_match:
                              name: ip-matcher
                              typed_config:
                                "@type": type.googleapis.com/xds.type.matcher.v3.IPMatcher
                                range_matchers:
                                - ranges:
                                  - address_prefix: 192.168.0.10
                                    prefix_len: 32
                                  on_match:
                                    action:
                                      name: example2_tcp
                                      typed_config:
                                        "@type": type.googleapis.com/google.protobuf.StringValue
                                        value: example2_tcp
                                - ranges:
                                  - address_prefix: 192.168.0.0
                                    prefix_len: 24
                                  on_match:
                                    action:
                                      name: example_tcp
                                      typed_config:
                                        "@type": type.googleapis.com/google.protobuf.StringValue
                                        value: example_tcp
```

#### Auto reachable services

Based on the current state, it might not be supported in the first iteration. `MeshExternalServices` are going to be created later in the pipline, after filtering, so we need to investigate together with team working on `MeshService` where is the best fit for it.

#### Zone Egress

Currently, when the `Mesh` object has `zoneEgress` enabled, we automatically route to external services through the Zone Egress. I think we should keep this feature, as it allows Mesh Operator global behaviour of routing.

Implementation TBA

#### Universal without Transparent Proxy

In this situation, we need to limit how we implement them. Due to the nature of the traffic, we don't have information about the real destination, so we cannot use the same feature as in a transparent proxy.

In the code, we need to detect if the dataplane is not using a transparent proxy. In this case, we require only policies with `destination.type: Regular`. We cannot route to many different endpoints, which is why we have this limitation.

For implementation, a user can target `MeshExternalService` in the outbound section of the dataplane. We will then validate if we can add this external service to the outbound.

**Limitations**

* wildcard not supported
* many match services not supported
* only destination.type: Regular supported


