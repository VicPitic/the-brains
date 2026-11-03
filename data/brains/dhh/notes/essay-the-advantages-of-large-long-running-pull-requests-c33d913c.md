## Why DHH prefers large, long-running pull requests

- DHH's favorite part of code review is seeing "all the trade-offs, design decisions, and changes in context together."
- That is hard when a feature is chopped into "itty bitty pieces as independent pull requests under pressure never to let them run longer than a week."
- At Basecamp, pull requests run as long as they need to cover a complete feature or fix: from a few weeks up to six weeks, because the team follows Shape Up.
- He argues the PR-size debate "focuses mostly on the cost, not on the value." The value is "tremendous to any organization that seeks to keep high design standards and a cohesive architecture."

## The merge conflict trade-off and how to manage it

- DHH admits the approach has a cost: the longer a PR runs off the main branch, the greater the chance of merge conflicts.
- His mitigation is to keep the pull request up to date by frequently merging main into it.
- He accepts that very large organizations with high traffic on the same bits of code might hit a point where this doesn't cut it, but asks "is that really you?"
- At Basecamp it has never been a serious problem. Several teams have often worked on the same product in close proximity. Conflicts occasionally happen, but he can't remember the last time they seriously impeded the work.
- He acknowledges the cost still exists and may grow with organization size.

## Externalities of piecemeal code review

- DHH frames fragmented review as a source of negative externalities.
- His metaphor: high design standards and a cohesive architecture "bank the rivers of clear code." Pouring in partial, I-haven't-seen-the-end pull requests pollutes those pristine waters.
- Each one looks like a harmless drop in the river, but if you keep it up, "eventually the rivers no longer run clear."
- The damage isn't obvious right away, which is why it accumulates.

## What gets lost when you review pieces without the whole

- Code that didn't embrace a key insight that would simplify everything when viewed from 30,000 feet.
- Code that doesn't leave the campsite in a better condition than it found it, because cleanup is deferred to "another pull request, on another day (by no one ever)."
- Code that has already shipped and now feels like too much of a hassle to change.

## Reviewing your own work against the full diff

- DHH treats code review as something a programmer can do to themselves, not only something done by others.
- On substantial work, he hops back and forth between TextMate and the complete GitHub diff for all the commits.
- In that back-and-forth, "you see the shape of the code, pick up on bad smells, and ultimately decide whether you're happy with the whole."
- This self-review depends on having the whole feature in one pull request.

## Guidance: when to split pull requests

- DHH's advice: "don't chop up your pull requests until the cost of doing so definitively outpaces the value."
- He says what works for "mega corps working on million-line code bases" probably isn't fit for smaller systems.
- Smaller systems "still have a fighting chance at keeping their structural integrity," and large PRs help protect it.
