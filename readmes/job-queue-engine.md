## overview

a distributed job queue built to survive worker crashes. workers claim jobs with time-bound leases, failed jobs retry with exponential backoff, and jobs that run out of retries are kept in a dead-letter queue instead of being dropped.

## how a job moves

| state | what happens |
| --- | --- |
| queued | the job waits for a free worker. |
| leased | a worker claims it with a time-bound lease. |
| done | the worker finishes before the lease expires. |
| retrying | on failure, the job returns to the queue after an exponential backoff with jitter. |
| dead-lettered | after its retries run out, the job moves to a dead-letter queue for inspection. |

if a worker crashes mid-job, its lease expires and the job is reclaimed automatically.

## design

- **leases, not permanent locks:** a crashed worker can never hold a job forever.
- **automatic reclaim:** expired leases are picked up again with no manual cleanup.
- **backoff with jitter:** retries spread out instead of hitting the system all at once.
- **dead-letter queue:** failed work is preserved for debugging.

## guarantees

- no job is processed by two workers at the same time, even under heavy concurrent load.
- crashes recover on their own, with no manual cleanup.
- retry behaviour stays predictable under sustained load.
- failed work is never silently dropped.
