# Surviving Resource Write Conflicts in KDS Sync

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

### Option 1: Retry the update on conflict (chosen)

When `store.IsConflict(err)` fires in the syncer's update loop, re-read the object, reapply the upstream spec and labels onto the fresh meta and status, and write again. Bounded retries; if they run out, fall through to the existing teardown.

The re-read is the delicate part on Kubernetes. The syncer holds a `ResourceStore`, and that abstraction has no way to ask for an uncached read: on Kubernetes it reads through the informer cache, which is what let the version go stale in the first place. A re-read issued immediately can hand back the same dead version and burn every attempt on it.

Rather than punch an uncached-read escape hatch through `ResourceStore` for one caller, the retry pauses for a short jittered interval before re-reading, which is enough for the informer to observe the write that won. This is the same treatment commit `735321cfb0` gave the other writers. If the cache is still behind after the bounded attempts, the teardown backstop takes over and the full resync fixes it, so the worst case is the behaviour we have today rather than something new.

* Good, because it is small and backportable
* Good, because nothing is skipped, so the delta xDS constraint holds and the teardown stays as a backstop
* Good, because it holds on any store, not just the one where the bug shows up
* Bad, because it treats the symptom. The conflict still happens, we just pay for it in retries
* Bad, because the re-read is cache-backed on Kubernetes, so it is timing-dependent rather than guaranteed
* Bad, because every future status writer has to remember to do the same dance

### Option 2: Give status its own write path

Add a status-scoped write to `ResourceStore` (`pkg/core/resources/store/store.go:12-16`) as a distinct method rather than an option on `Update`.

A method, not a flag, because `ResourceStore` has several decorators (strict, cache, metrics, customizable). A new option can be silently dropped by one of them. A new method breaks every wrapper at compile time.

Per store:

- Kubernetes: enable the status subresource on resources with `HasStatus` and route status writes through `Client.Status().Update()`. The API server then enforces the split. Writes to the main endpoint cannot change status, and writes to `/status` cannot change spec.
- Postgres: a status-only `UPDATE` that neither reads nor bumps `version`. The column already exists.
- Memory: trivial.

Then fix the writers. The global-to-zone syncer writes spec and labels only and stops reading status entirely. The VIP allocator (`status.vips`), all three hostname generators (`status.addresses`, `status.hostnameGenerators`), and the MeshMultiZoneService status updater (`status.meshServices`, `status.conditions`) become status-only writers.

One writer does not fit the split, and an implementer will hit it immediately. The MeshService status updater writes both halves: `status.tls` and `status.dataplaneProxies`, but also `spec.identities` and `spec.state` (`pkg/core/resources/apis/meshservice/status/updater.go:145-169`). It is not a conflict source today, because it skips anything that is not a local MeshService (`updater.go:132`) while the syncer only ever writes synced ones, so the two never touch the same object. It still means "the zone writes only status" is not true in general, and this updater needs two calls rather than one.

The interesting part is that the data is already separated everywhere. Postgres has a `status` column. The generated Kubernetes types have a separate `Status` field. KDS carries status as its own field and already strips it. The only place the split does not exist is the write API. This option closes that gap.

**On its own this does not fix the outage on Kubernetes, and Kubernetes is the only place the outage happens.** `metadata.resourceVersion` is one counter for the whole object. A write through `/status` bumps it exactly like a write through the main endpoint, and both endpoints check it. The allocator writing `status.vips` still invalidates the version the syncer is holding, and the syncer's spec write still gets a 409. The status subresource separates which fields persist and who may write them. It does not separate optimistic concurrency.

That is the same point the problem statement already makes: the rejection was never about which fields changed. Splitting the fields does not by itself change the answer.

The obvious follow-up is to stop sending the precondition on spec writes, since a spec write can no longer clobber status anyway. That is not available: the API server rejects an update of an existing object with no `resourceVersion`, with `metadata.resourceVersion: Invalid value: 0x0: must be specified for an update`. `Update` always carries the precondition. The only precondition-free writes are patches, which is Option 3.

So Option 2 is the foundation for the fix rather than the fix, and only in combination with Option 3.

Postgres is different, because we own the version column there. A status write that neither reads nor bumps `version` is genuinely independent of a spec write, so on Postgres the conflict really does disappear.

#### Verified against a real API server

These claims are easy to get backwards, so they were checked with envtest against Kubernetes 1.33, on a CRD with the status subresource enabled and a direct uncached client:

- A write through `/status` moved `resourceVersion` from 207 to 208. A status-only write bumps the shared counter.
- A spec write holding 207 then failed: `Operation cannot be fulfilled ... the object has been modified`. The 409 survives the split.
- The same spec write with `resourceVersion` cleared was rejected as invalid, so the precondition cannot simply be dropped.

Cost is high. There are 11 concrete `ResourceStore` implementations (three real backends, four decorators, the remote store, the separate config and secrets k8s stores, and a test fake), four of which sit in the production wrapping chain, plus `ResourceManager` and the per-type managers.

* Good, because it makes ownership something the API enforces rather than something a comment asks for
* Good, because the status-preservation code in `sync.go:237-245` gets deleted, along with the read-copy-write of a field the syncer has no business touching
* Good, because it removes the conflict outright on Postgres and unblocks Option 3 on Kubernetes
* Bad, because on Kubernetes it does not fix the reported outage by itself
* Bad, because enabling the status subresource changes API server behaviour and needs a careful rollout (see below)
* Bad, because it touches 11 store implementations and the manager layer

### Option 3: Server-side apply with field managers

On Kubernetes, replace both writers' updates with apply patches: `kds-syncer` owns spec and labels, `vip-allocator` owns `status.vips`, `hostname-generator` owns `status.addresses`.

Apply patches carry no version precondition, so conflicts become impossible rather than tolerated, and ownership shows up in `managedFields` where the next person debugging this can just read it.

This is the only option that actually removes the conflict class on Kubernetes. Option 2 does not, for the `resourceVersion` reason above, and Option 1 tolerates conflicts rather than preventing them.

The same envtest run confirms it works. With `kds-syncer` applying `spec` and `vip-allocator` applying `status.vips`, a spec apply issued after the status apply succeeded with no conflict, both values were present afterwards, and neither writer clobbered the other. No `resourceVersion` was involved at any point.

It still depends on Option 2 in practice, because the status writers need `/status` to apply against. There is no server-side-apply usage anywhere in the codebase today, so this would be the first, on the store layer, which is not a small place to start.

* Good, because it removes the precondition entirely, so the race cannot produce an error at all
* Good, because ownership is inspectable in `kubectl get -o yaml` instead of living in comments
* Bad, because it is Kubernetes-only and does nothing for Postgres
* Bad, because it is a large change to the k8s store with no in-repo precedent
* Bad, because field-manager conflicts become a new failure mode to understand and debug

### Make the next one visible

Add a counter for conflict retries in the syncer, and a reason-labelled counter for stream teardowns. This outage was invisible until five unrelated suites failed, and the only reason it was diagnosable afterwards was that the restart log happens to print `nextBackoff`. A counter turns the next one into a graph instead of a log archaeology session.

The counter also carries the evidence for whether the deeper fix is ever needed. Sustained retry churn is what would justify the cost of Option 3; a flat line says the retry is doing its job.

### The backoff cliff, left alone deliberately

The reset threshold in `resilient.go:73` is a real second-order problem, and the problem statement above traces exactly how it turned a sequence of conflicts into three minutes of downtime. It is still not being changed here.

Two reasons. The retry removes what was driving the counter up, so KDS stops reaching the cliff by this route at all. And `resilientComponent` wraps every resilient component in the control plane, not just KDS, so retuning when a component counts as recovered changes restart behaviour well outside the blast radius of this bug. That is a change worth making on its own evidence, with its own testing, not as a rider on a sync fix.

If the teardown counter later shows components pinned at the cap, that is the evidence to revisit it.

### Rollout, if Option 2 is ever taken

This applies only to Option 2 and is a large part of why it is not the fix being shipped here.

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

Risk: retries hide slow failures. If conflicts become frequent for some new reason, the retry absorbs them and the only signal is the counter. That is why the counter ships with the retry rather than after it.

Risk: the re-read is cache-backed on Kubernetes, so the retry is timing-dependent. The jittered pause is a bet that the informer catches up within it. When the bet loses, the teardown backstop still runs, so the failure mode is today's behaviour rather than a new one, but the retry will not have helped.

Risk: the retry bound is a judgement call. Too low and it does not absorb a normal collision; too high and a genuinely wedged resource delays the resync that teardown would have forced.

Unchanged: the stream teardown path stays as the last resort, and the delta xDS constraint still forbids skipping a resource. Nothing here weakens the guarantee that every change global sends is either applied or loudly retried.

If Option 2 is taken later, its own risk is the rollout gap above: between the CRD flip and the CP upgrade, status writes silently do nothing.

## Implications for Kong Mesh

Nothing for the decision being shipped. The retry, the backoff threshold, and the counters are all internal to the control plane, with no interface or API change to inherit.

If Option 2 is taken later, the downstream project inherits the `ResourceStore` interface change and needs the same status write path for any resource it defines with a status, plus the same CRD subresource flip on the same schedule, or status writes there hit the silent-drop failure mode described above.

## Decision

Ship Option 1, plus the counters. That is the fix.

Concretely: the KDS syncer retries a conflicting update against a freshly read copy instead of returning the error, rebasing the upstream change onto the current version each attempt and restoring zone-owned status, and falls through to the existing stream teardown only when the retries are exhausted. The counters go in alongside so the next occurrence is visible before it costs anyone a test run.

The backoff cliff is left as it is, for the reasons in the section above.

This does not remove the race. It removes the outage, which is the part that hurts. A lost race goes back to costing milliseconds, the way it already does for the VIP allocator and every other writer that commit `735321cfb0` touched. The change is small, it backports cleanly to release branches, and it holds regardless of which store is underneath.

Do not take Option 2 as the fix for this outage. It is the intuitive answer and it is wrong for the reported failure, because spec and status share `metadata.resourceVersion` on Kubernetes and Kubernetes is where the outage happens. Anyone reaching for it should know that going in, which is most of why this document exists.

Option 2 remains worth doing on its own merits: it deletes the read-copy-write of status in the syncer, it makes ownership something the API enforces, and it does remove the conflict outright on Postgres. But it costs 11 store implementations plus the manager layer and a staged CRD rollout, and on Kubernetes it buys correctness groundwork rather than a fix. It should be justified as cleanup and as the prerequisite for Option 3, not sold as the answer here.

Option 3 is what would end the conflict class on Kubernetes. Revisit it if conflict-retry churn shows up in the counters we are adding, which is the evidence that would justify the cost. Until then the retry is cheaper and sufficient.
