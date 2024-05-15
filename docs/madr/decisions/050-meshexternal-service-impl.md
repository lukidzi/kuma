# MeshExternalService implementation

* Status: accepted

## Context and Problem Statement

We have a new policy that allows defining `MeshExternalServices` but it's not implemented, and configuration is not affecting dataplanes. This MADR is going to provide details of implementation from the point of Kuma and Envoy.

## Considered Options

* Implement `MeshExternalServices` using filter chain matches
* Implement `MeshExternalServices` using separate listeners and filter chain matches

## Decision Outcome

Implement `MeshExternalServices` using filter chain matches because it's simpler and doesn't require us to allocate separate listeners.

### Positive Consequences

* Solved scalability problems

### Negative Consequences

* A pretty big effort (implementation, a strategy of migration).
* Temporarily increased complexity of a product until the migration is done.


### Implement `MeshExternalServices` manually applied on Zone CP

