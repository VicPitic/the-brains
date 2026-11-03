## Why deletion needs its own domain concept ("incineration")

- DHH points to a Patrick McKenzie tweet: at most companies, deleting your data just sets a flag. The data stays in the database and in backups, and can be accessed by employees years later or subpoenaed.
- He argues programmers have an obligation to retire that pattern: "make it disappear", scrubbed from databases and backups in a timely, reasonable way.
- Basecamp's privacy policy says that when you cancel an account, nothing remains on its servers after 30 days.
- This doesn't happen automatically. In a multi-tenant database all data is intertwined, so it's not drop database customers. You must walk the whole web of connections and cherry-pick what to remove without deleting the wrong things.
- Basecamp reserves the word "incinerate" for this specific, meticulous, tracked process, instead of overloading generic terms like delete or destroy (which already have specific meanings in Ruby, Rails and computer science). He also "just think[s] it's a cool word".

## Structure: an Incinerable concern plus command objects

- The account is the root of the data tree. An `Incinerable` concern on Account separates this aspect of the account, a recurring theme in the series.
- The concern is a thin access layer: it sets a callback so that after the account is canceled (a method from another concern that handles the account lifecycle), the incineration is triggered.
- The incineration itself is a standard command pattern: pass in the account, then either run it or check whether running is possible.
- Domain-language sugar: the job exposes a `schedule` method, so callers write `IncinerationJob.schedule(account)` and the job knows its own delay.
- The delay constant (30 days) is used in several places, so it was pulled up into the Incinerable concern. DHH says normally it would live with the job, which owns the scheduling.
- Accidental complexity: Basecamp runs the incineration against the master database (the shared "Signal ID" account database) and lets it replicate from there.

## Scheduling 30 days out and the "possible?" guard

- Policy: an account is incinerated 30 days after cancellation. That gives 30 days to regret the decision, during which support can still recover a file.
- If a customer demands immediate deletion, secondary support can run incinerate directly from the command line.
- Jobs are scheduled 30 days into the future, so Basecamp keeps a deep, long-running queue of far-future jobs. DHH calls this a little unusual. They could rebuild it by querying for overdue canceled accounts if jobs were lost.
- Because the job waits 30 days, things can change in the meantime (for example, the customer un-cancels). So the command has a second layer of defense, a `possible?` predicate, that checks:
  - the account is actually canceled and inactive
  - the incineration window (30 days) has elapsed
- Incineration never runs just because a job was scheduled; it runs only if it's still legitimately possible.

## Walking the tree: account, buckets, recordings, recordables

- Deletion proceeds top-down through the tree, and the account itself is deleted last, after everything depending on it.
- Level 1, buckets: projects, teams, and "pings" (direct conversations). Each bucket has its own incineration command. At the end, the account and the shared account record are deleted.
- Level 2, the bucket is mostly metadata (name, etc.), so the real data starts at the recordings it contains.
- Level 3, recordings: this is where content lives (messages, to-dos, uploaded files). Each recording incinerates its dependents (children), then itself. The recordable holds the actual content, such as a message body or to-do description. It's the last stop in the tree.
- Each level follows the same pattern: a `run` method plus a `possible?` check.
- DHH notes a style nit in the code: the private methods should follow the "table of contents" order of how they're invoked, and he likes inserting an extra blank line to separate groups of related methods (predicates vs. carrying out the command). He says this is controversial even in Rails core and Robocop complains, so you'd have to turn that cop off.

## Reusing incineration for single deletes, and avoiding wasted queries

- The same framework handles deleting one project, team, or message, not just account cancellation. Deleting part of the tree is a subset of deleting the whole tree, which gives reuse.
- Each node therefore has two valid paths: it can be incinerated by itself (it was trashed and is due) or as part of an ancestor's incineration. A node must not be deleted out of sequence while an ancestor is being traversed, so the check also looks at whether an ancestor is being incinerated.
- Performance detail: Active Record's `belongs_to ... touch` normally touches the parent on each child delete, which is an UPDATE per row. During incineration that is wasteful, since an account can have thousands, tens of thousands, or in rare cases hundreds of thousands of recordings. Incineration skips the touching.

## Multi-stage grace periods and backup expiry

- For a single bucket, deletion has stages:
  - Trashed: visible in a trash can that account users can see and restore from.
  - Imminent: no longer visible to users, with a final 5-day grace period. A user who finds the data gone can write to support to pull it back out of the deletion queue.
  - Incinerated: gone from the active database for good.
- Support can't restore a single customer from a database backup in a multi-tenant system, because restoring to production would roll back every other customer to that point.
- Database backups are wiped after 30 days too, so the data can't be recovered, subpoenaed, or involved in any retrieval process.
- DHH's principle: give as many reasonable safety steps as possible while still honoring that data should actually disappear. Basecamp chose 30 days as the point at which it fully does.
