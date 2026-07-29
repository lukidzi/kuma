# Separate Status Writes From Spec Writes

* Status: accepted

## Context and Problem Statement

A multizone e2e run failed five specs across four unrelated suites:

| Spec                                                  | Failure                                                                            |
|:------------------------------------------------------|:-----------------------------------------------------------------------------------|
| InboundPassthroughDisabled … binds to wildcard        | `curl: (6) Could not resolve host: uni-test-server-wildcard.svc.kuma-5.mesh.local` |
| MeshService Connectivity … another Kubernetes cluster | `curl: (22) … error: 503`                                                          |
| Producer Policy Flow … sync producer policy           | policy not withdrawn from `kuma-1`                                                 |
| Sync … should show zones as online                    | 3 online, expected >= 4                                                            |
| Targeting real MeshService … unhealthy (AfterAll)     | `'remove mesh' unsuccessful after 30 retries`                                      |

None of these suites share code. They share a control plane. The `kuma-2` zone CP was offline for three stretches, and every failure lands inside one of them:

```
14:24:42 - 14:25:17
14:26:13 - 14:27:15
14:27:27 - 14:28:23
```

The last one says it out loud: `unable to delete mesh, there are still some dataplanes attached`. The zone could not withdraw its Dataplanes because its KDS stream was down.

### What actually broke

Three log lines, 1.4 seconds apart:

```
14:27:25.605  kds-delta-zone            creating a new resource from upstream   test-server-...kuma-system
14:27:26.751  vips.allocator            allocating IP 241.0.0.61
14:27:27.044  kds-zone.kds-mux-client   scheduling component restart            lastError=... conflict
```

Two components of the *same* zone CP wrote to the *same* MeshService object. One won, the other got a conflict, and the loser was the KDS syncer. A conflict on a single object tore down the stream that carries every resource type for every mesh in that zone.

### Why the conflict happens

Ownership of a MeshService is split by design:

- Global owns `spec` and labels. Status is stripped on the way down (`pkg/kds/service/context.go:89-92`).
- The zone owns `status`. The VIP lives in `status.vips`, and each zone assigns its own (`241.0.0.61` in `kuma-2`, `241.0.0.50` in `kuma-1`).

That split is a convention. It is not enforced anywhere in the write path.

Both writers do a read-modify-write of the whole object:

- KDS syncer: `List` (`pkg/kds/v2/store/sync.go:148`) → copy existing meta and status onto the upstream resource (`:237-245`) → `Update` (`:297`).
- VIP allocator: `List` every 5s (`pkg/core/resources/apis/core/vip/allocator.go:131`) → `Allocate` (`:145`) → `Update` (`:152`).

Every store versions the whole object, not its halves:

- Kubernetes CRDs declare `subresources: {}` (`deployments/charts/kuma/crds/kuma.io_meshservices.yaml:234`, and the same for `meshmultizoneservices` and `meshexternalservices`), so there is no `/status` endpoint. `pkg/plugins/resources/k8s/store.go` only ever calls `Client.Update`.
- Postgres updates every column at once, gated on the object version: `UPDATE resources SET spec=$1, version=$2, ..., status=$5 WHERE ... AND version=$9` (`pkg/plugins/resources/postgres/pgx_store.go:188`).
- The memory store compares a single object version (`pkg/plugins/resources/memory/store.go:183`).

So the rejection has nothing to do with which fields changed. A stale version loses, full stop. The syncer preserves status correctly and still loses, because the allocator bumped the version between the syncer's read and its write.

### Why one conflict costs a minute

Two things turn a lost race into an outage.

**The two writers handle the same error very differently.**

| Loser         | Handling                                                                                                                                                          | Cost                      |
|:---------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------|:---------------------------|
| VIP allocator | logs and retries next tick (`allocator.go:154-156`)                                                                                                               | VIP delayed 5s            |
| KDS syncer    | error propagates to `OnResourcesReceived` in `pkg/kds/v2/client/kds_client.go`, out through `Receive()` in `pkg/kds/mux/client.go:194`, terminating the component | stream down, zone offline |

Commit `735321cfb0` taught the VIP allocator, the hostname generator, and the status updaters to tolerate conflicts. The KDS syncer was never included.

**The backoff never recovers.** `pkg/core/runtime/component/resilient.go:73` resets the backoff only if the component ran longer than `backoffMaxTime`, which is 60s. Attempt 5 ran for 55 seconds. Five seconds short, so the counter kept climbing:

```
attempt 1   nextBackoff 494ms
attempt 2   nextBackoff 10.1s
attempt 3   nextBackoff 17.9s
attempt 4   nextBackoff 35.4s
attempt 5   nextBackoff 1m1.7s
attempt 6   nextBackoff 56.0s
```

Below roughly one conflict per minute, each conflict costs half a second and nobody notices. Above it, the counter never resets and the zone sits at the one-minute cap. There is no gradual degradation between those two states.

### Why the blast radius is the whole zone

KDS syncs per resource type over one stream per zone, carrying every mesh. The 14:26:12 conflict was on a MeshService in the `inbound-passthrough` mesh, and it broke the `inbound-passthrough-disabled` suite. The stream died mid-batch, so every resource queued behind the failing one never landed. That is why one hostname failed to resolve while its siblings were fine.

### Why only Kubernetes

The race exists on every store. Only Kubernetes gives it room to happen.

The k8s store reads through the controller-runtime cache (`mgr.GetClient()`, `pkg/plugins/resources/k8s/plugin.go:30`). A `List` can return a version that was already stale when it was read, because the other writer's change has not reached the informer cache yet. Writes are HTTP round-trips, and the syncer does one `List` followed by a loop of updates, so the versions it read stay exposed for the length of the whole batch.

The memory store used by Universal e2e has the same version check, but reads are always current and both reads and writes are mutex-guarded map operations. The window is sub-microsecond. The conflict path is real, it just never fires. Postgres sits in between: real write latency, but linearizable reads and no stale cache.

Kubernetes widens the window by several orders of magnitude. That is enough to cross the one-per-minute rate where the backoff stops resetting.

### What this is not

- Not caused by the test branch. Every change there is under `test/`. The heavier suite widens the syncer's read-to-write window and pushes the conflict rate past the cliff, but the bug predates it.
- Not a hot loop. The snapshot version map is built from mapped resources (`pkg/kds/v2/server/snapshot_generator.go:110-125`) and the payload carries no timestamps (`pkg/kds/util/resource.go:60-73`). With status stripped, a status-only change upstream produces an identical payload and is not resent.
- Not a sync loop. The `origin: global` filter applies to the zone-to-global direction only (`sync.go:373-380`).
- Not global-side. All three status writers are zone-only, so on global the zone-to-global syncer is the sole writer.

### The constraint that rules out half the fixes

Delta xDS gives exactly one chance to apply each change. `go-control-plane/pkg/server/delta/v3/server.go:156` calls `SetReturnedResources` when the response is sent, before any ACK or NACK, and nothing rolls it back.

Skipping a resource, whether by ACK or NACK, leaves global believing the zone is current. The zone then drifts silently until that resource happens to change again. Silent permanent drift is worse than a loud outage.

This also explains the current behaviour. Tearing down the stream *is* the resync: on reconnect the client subscribes to `*` with no `InitialResourceVersions` (`pkg/kds/mux/stream.go:210`), the server resends everything, and the syncer re-lists the whole downstream. The mechanism is not wrong. It is just wildly disproportionate as a response to one lost race.

## Design

### Option 1: Retry the update on conflict

When `store.IsConflict(err)` fires in the syncer's update loop, re-read the object, reapply the upstream spec and labels onto the fresh meta and status, and write again. Bounded retries; if they run out, fall through to the existing teardown.

On Kubernetes the re-read has to bypass the cache (`mgr.GetAPIReader()`). A cached re-read can hand back the same stale object and burn every attempt on the same version.

* Good, because it is small and backportable
* Good, because nothing is skipped, so the delta xDS constraint holds and the teardown stays as a backstop
* Bad, because it treats the symptom. The conflict still happens, we just pay for it in retries
* Bad, because every future status writer has to remember to do the same dance

### Option 2: Give status its own write path (chosen)

Add a status-scoped write to `ResourceStore` (`pkg/core/resources/store/store.go:12-16`) as a distinct method rather than an option on `Update`.

A method, not a flag, because `ResourceStore` has several decorators (strict, cache, metrics, customizable). A new option can be silently dropped by one of them. A new method breaks every wrapper at compile time.

Per store:

- Kubernetes: enable the status subresource on resources with `HasStatus` and route status writes through `Client.Status().Update()`. The API server then enforces the split. Writes to the main endpoint cannot change status, and writes to `/status` cannot change spec.
- Postgres: `UPDATE resources SET status=$1 WHERE ... AND version=$n`. The column already exists.
- Memory: trivial.

Then fix the writers. The global-to-zone syncer writes spec and labels only, and stops reading status entirely. The VIP allocator, hostname generator, and status updaters use the status write only.

The interesting part is that the data is already separated everywhere. Postgres has a `status` column. The generated Kubernetes types have a separate `Status` field. KDS carries status as its own field and already strips it. The only place the split does not exist is the write API. This option closes that gap.

Once the syncer no longer reads or writes status, it is not racing the allocator over anything. The race does not get smaller, it stops existing.

* Good, because the conflict class disappears instead of being tolerated
* Good, because ownership becomes something the API enforces rather than something a comment asks for
* Good, because the status-preservation code in `sync.go:237-245` gets deleted
* Bad, because enabling the status subresource changes API server behaviour and needs a careful rollout (see below)
* Bad, because it touches all three stores

### Option 3: Server-side apply with field managers

On Kubernetes, replace both writers' updates with apply patches: `kds-syncer` owns spec and labels, `vip-allocator` owns `status.vips`, `hostname-generator` owns `status.addresses`.

Apply patches carry no version precondition, so conflicts become impossible rather than tolerated, and ownership shows up in `managedFields` where the next person debugging this can just read it.

* Good, because it removes the precondition entirely
* Good, because ownership is inspectable in `kubectl get -o yaml`
* Bad, because it is Kubernetes-only and does nothing for Postgres
* Bad, because it is a much larger change to the k8s store

Deferred. Option 2 is a prerequisite for it anyway.

### Cap the cost of the next conflict

Whichever option lands, a lost race must not cost a minute of zone downtime. Two changes, independent of the above:

Decouple the backoff reset in `resilient.go:73` from `backoffMaxTime`. A run that survives a fixed stability window, on the order of 10-15s, resets the counter. Today the reset threshold and the maximum delay are the same number, which creates a latch: below the threshold the cost is half a second, above it the cost pins at the cap, with nothing in between. Failure cost should track failure rate.

Add `kds_stream_teardowns_total{reason}` and `store_conflict_retries_total{component}`. This outage was invisible until five unrelated suites failed. A counter turns the next one into a graph instead of a log archaeology session.

### Rollout

Enabling the status subresource changes how the API server treats existing writes. An old CP doing whole-object updates against a new CRD gets its status writes **silently dropped**. VIP allocation stops working and nothing logs an error. So the order matters:

1. Ship a CP that supports both write paths, chosen by capability detection.
2. Flip the CRDs in the same release train, behind a flag for one release.
3. Remove the legacy path the release after.

The KDS wire format does not change, since status already travels as its own field. There is no zone-to-global version compatibility problem.

## Security implications and review

None. No new external surface, no change to authn or authz, no change to what crosses the KDS boundary. The change narrows what each writer is permitted to modify, which is a small improvement.

## Reliability implications

This is a reliability fix, so the risks are worth stating plainly.

Improved: a lost write race stops taking a zone's KDS stream offline, which today means dataplanes cannot be withdrawn, policies cannot be synced, and the zone reports offline for up to a minute per conflict.

Risk: the rollout gap above. Between the CRD flip and the CP upgrade, status writes silently do nothing. This is the failure mode to guard, and it is the reason for the capability detection in step 1 rather than a straight cutover.

Risk: the status subresource changes the shape of what `kubectl apply` does to these resources for users who edit them by hand. Status was never user-editable in practice, but the error they get on trying will change.

Unchanged: the stream teardown path stays as the last resort. We are removing the reason it fires, not the mechanism.

## Implications for Kong Mesh

The downstream project inherits the `ResourceStore` interface change and needs the same status write path for any resource it defines with a status. Its CRDs need the same subresource flip on the same schedule as the upstream ones, or status writes there hit the silent-drop failure mode described above.

## Decision

Take Option 2: give status its own write path in `ResourceStore`, backed by the Kubernetes status subresource and a status-only `UPDATE` in Postgres. The global-to-zone syncer writes spec and labels. The VIP allocator, hostname generator, and status updaters write status. Neither touches the other's half, so they stop colliding.

Ship the conflict retry from Option 1 first as a small backportable fix, since it stops the bleeding on release branches without waiting for the store work. Keep it afterwards as defence in depth, because new status writers will appear.

Fix the backoff reset threshold and add the two counters alongside.

Option 3 stays on the table as a Kubernetes-only follow-up once Option 2 has landed.
