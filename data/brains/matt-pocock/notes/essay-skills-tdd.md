## Skill identity and purpose

- `/tdd` is Matt's skill for building a feature or fixing a bug test-first. It runs one failing test, then just enough code to pass it, then the next behaviour.
- It carries the standards that make that loop produce tests worth keeping: what a good test is, where tests go, what mocks are for, and three anti-patterns that make a suite worthless.
- It is a reference, not a driver. It holds the rules of the loop, and something else (the user, or the `implement` skill) runs the session that applies them.
- Install: `npx skills@latest add mattpocock/skills --skill=tdd`, then type `/tdd` in the coding agent. The agent can also reach for it automatically when a task fits, or when the user says "red-green-refactor".
- It requires `codebase-design` to be installed. v1.0 deleted `tdd`'s own deep-module and interface-design notes in favour of that shared skill. The skill is stateless and writes no files.

## When Matt reaches for /tdd, and when not

- Use it when there is a concrete behaviour to build, with an input and an observable output, and the tests need to survive a refactor. Examples: business logic, a request/response contract, a transformation, validation.
- If the behaviour isn't pinned down yet, go to `to-spec`, which also agrees the test seams before any code is written.
- If the question is really the shape of the interface, go to `codebase-design`.
- If there is a spec or tickets and the whole build should be run, use `implement`, which drives `tdd` per ticket.
- Config, wiring, glue, type annotations and straight CRUD delegation fit poorly. This is a known open gap (issue #746): the skill decides where seams go, but not whether a change is worth the loop at all.
- Running it on a change with no independent source of truth to assert against yields a test that restates the implementation, which is the tautological anti-pattern. Until the issue closes, the user makes that call or writes the rule into `CLAUDE.md`.

## The loop: red-green, vertical slices, tracer bullet

- Red-green means write the failing test, then only enough code to pass it. Do not write code for the test after next.
- There is no refactor phase. The skill dropped it in June 2026 because agents almost never performed it, and because review and implementation work better as separate sessions. Refactoring now belongs to `code-review`, which carries the Fowler smell baseline. `refactoring.md` left `tdd` at the same time.
- Vertical slice: one test at one seam, then the minimal implementation, then repeat. The first cycle is a "tracer bullet" that proves a single path end to end.
- The opposite is horizontal slicing: all tests first, then all code. Bulk-written tests verify "imagined" behaviour. They check the shape of things rather than what a user does, and they commit to a test structure before the implementation is understood.
- The description still says "red-green-refactor" although the body no longer refactors (issue #589, open). The phrase still fires the skill. What you get is red-green.

## Pre-agreed seams

- A seam is the public boundary where behaviour is observed without reaching inside.
- The rule has no exceptions: no test goes at an unconfirmed seam. Before any test exists, the skill names the public boundaries it intends to test at and stops for confirmation.
- The reason is that testing effort is finite. This step spends it on the critical paths instead of every edge case.
- In the full chain, seams are agreed earlier during `to-spec`. Matt's wording: "`/tdd` is told to only work at pre-agreed test seams, `/code-review` checks that only agreed-upon test seams were used." Invoked on its own, `tdd` asks the user directly.
- Known friction (issue #607, the most reported): the prompt lists candidate seams by name only, with nothing about what each catches or misses. No fix has shipped. The workaround is to ask the agent for trade-offs first, for example what a component-level seam misses that an integration seam catches, and how much slower it is. This is also why the chain agrees seams up front in `to-spec`, where the whole feature is in view.

## Three anti-patterns and the rule on mocks

- Implementation-coupled: the test breaks when an internal function is renamed though behaviour didn't change. Tells: mocked internal collaborators, asserted call counts, database queries used to verify instead of the interface.
- Tautological: the expected value is computed the way the code computes it, so the test passes by construction. Expected values must come from elsewhere: a known-good literal, a worked example, or the spec.
- Horizontal slicing: a batch of tests lands before any implementation.
- Mocks are for system boundaries only: external APIs, time, randomness, and sometimes the filesystem or database. Never mock your own modules.

## How to tell it's working

- It stops and names the seams it intends to test at, and waits, before any test file exists.
- One test appears, goes red, gets just enough code to pass, and only then does the next test appear, not a batch of tests then a batch of code.
- Test names read as capabilities ("user can checkout with valid cart"), not internals ("checkout calls paymentService.process").
- Assertion expected values are literals traceable to the spec.
- Renaming an internal function breaks nothing in the suite.
- Mocks appear only at external boundaries (the payment API, the clock), never around your own modules.

## Agent compliance, browser tests, and ticket scope

- Agents sometimes write the implementation before the test. One user pushed the model and got: "I knew the skill said 'one test at a time, watch it fail for the right reason'. I read it. I just defaulted to my normal habit."
- Matt's stance is that no instruction makes an agent comply 100% of the time, and stricter wording restricts the agent's creativity for little gain. The loop is worth running even when followed loosely, because results are still better overall. If strict adherence matters for a slice, watch the run rather than trusting the skill to enforce it.
- Browser or end-to-end tests first is usually a bad idea. One user saw the agent write a Playwright test first, then spend a long loop re-running it and conclude the test was broken for a feature that didn't exist yet. Browser tests are slow enough that the red-green feedback loop stops paying for itself. The fix is to state in the repo's `CLAUDE.md` that browser tests come after the behaviour works.
- Run against one ticket, `tdd` has no view of the issue graph and can propose work belonging to a sibling ticket (issue #129). Passing the spec alongside the ticket helps, and right-sizing the tickets helps more.

## Where /tdd fits in the skill chain

- Chain: `grill-with-docs → to-spec → to-tickets → implement → code-review → retro`. `tdd` runs inside the build step and is not a step of its own.
- `to-spec` agrees test seams up front, `implement` drives `tdd` per ticket, and `code-review` checks afterwards that only agreed seams were used and owns the refactoring `tdd` no longer does.
- `/tdd` does not replace `/implement` or the course's `/do-work`. `/tdd` documents the methodology, while `/implement` is a simple work→feedback→commit loop and the direct stand-in for `/do-work`. The old single `/do-work` step is now split across `/implement`, `/tdd` and `/code-review`. Asked which to run against a ticket, the answer is almost always `/implement`.
- `codebase-design` is the shared source of the seam and deep-module vocabulary `tdd` uses. `ask-matt` routes the user when unsure which skill fits.
- `tdd` can also be used on its own whenever there is a concrete behaviour to build and no full spec is in play.
