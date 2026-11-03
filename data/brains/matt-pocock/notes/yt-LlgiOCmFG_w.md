## Matt's model for the PR bottleneck: speed needs brakes

- Matt describes a "software factory" as a setup where agents and deterministic code initiate work, not just humans. Examples: a classifier that turns a bug report into a fix or reproduction, or PlanetScale slow-query reports triggering a pipeline.
- This acceleration pushes more PRs through, which risks a "slop cannon" of PRs nobody can review.
- He argues you need brakes that raise quality and let you go faster counterintuitively, because "code is the environment your agent operates in" and bad code begets more bad code.
- The three brakes form a layered cake: automated checks (lint, tests, type checking, code quality metrics), automated review (agents), then human review.
- The goal is faster human review by leaning on the first two layers. Higher-quality code means fewer human interventions.

## Automated checks are cheap, but they can lie

- Checks cost CPU cycles, not tokens or human effort, so Matt says you can layer on loads of them and most people don't use enough or aren't creative enough.
- A green CI does not mean the code is ready to merge. Automated and human review are "lie detectors" for finding lies in the checks.
- Tautological tests: a test that reasserts the implementation. His agent (he says Opus 5 got "addicted" to these) wrote `expect(X_POST_CHARACTER_LIMIT).toBe(280)` against a constant set to 280. This ties the test to structure: you can't change or rename the constant without a failing test.
- A worse example: a UI-order test that reads the module's source file into memory and asserts the videos section appears after the content plan in the source text, rather than rendering anything. Changing how the source looks breaks it.
- Tests that cannot fail: a `useAudioBoost` hook test stubs the DOM `AudioContext` API with fake methods. Real `AudioContext` has complicated error modes, so the stub hides them and production hits errors the tests can't catch.
- Matt notes the agent isn't acting in bad faith; it follows instructions and writes tests tied to structure rather than executing real code.

## Design the codebase so checks are harder to cheat

- Matt's first fix is codebase design: deep modules, from John Ousterhout's *A Philosophy of Software Design*. A deep module hides complex behavior behind a simple interface; a shallow one exposes many small functions that each do little.
- Deep modules mean fewer structure-sensitive tests, because tests sit at the small interface instead of reaching into implementation details. The job is to force agents to use that interface.
- His skill for improving architecture works even on a badly vibe-coded codebase. It outputs an HTML document of opportunities for deepening modules, with before/after views showing reduced duplication and a testable deep module, which you can then implement.
- A codebase design skill defines a shared vocabulary, since reading about structure turns up "20 different approaches" all called DDD. Terms include locality (how well changes stay together, so a small change doesn't ripple), leverage (callers get a lot of value from a simple call to a deep module), and seam. Both help agents too.

## Keep coding standards out of the implementer agent

- Matt's advice: "don't put coding standards in your implementer agent." The implementer's single context window is already overloaded: exploring code, changing files, and debugging against the automated checks. Adding standards makes it perform worse.
- Instead, use a code review skill that takes a diff, reads a customizable `coding-standards.md` in the repo, and checks the code against it, run in a sub-agent with its own context window.
- Review is underloaded: it needs some exploration for wider context, but no implementation or debugging, so you can pile coding standards into it.
- He frames this as a two-part process: implement to make it work, then review to make it good. He compares it to red-green-refactor, with one context window for red-green and another for refactor.
- Don't put the standards in global scope like `AGENTS.md`, where they drown out the implementer. Put them in `coding-standards.md` so only the review agent reads them.

## Build your own automated reviewer, and make it commit

- Many people told Matt they use third-party reviewers such as Cursor Bugbot or CodeRabbit. He says "don't outsource automated review. Build your own."
- His reason: generic review skills either give irrelevant false positives when too general, or exclude users when too specific (a TypeScript-focused one doesn't help Rust people).
- Build coding standards over time and share them across the team. Docs nobody reads are a good source to pour in.
- The reviewer should commit fixes, not just comment on the PR. Comments create more work for the human, who must read verbose notes and decide what to implement. If it has genuine questions it can comment, but "the default should be commits."
- His summary: stop trying to one-shot good code by making the implementer perfect.

## A human-friendly PR body

- Matt is finishing a PR skill (due soon), built by "steal[ing] all the best ideas that everyone's got."
- Principle one: some reviews matter more than others. Classify PRs with AWS's one-way door vs two-way door idea. Most PRs are two-way doors you can revert.
- One-way doors need heavy review: a change that accidentally emails 60,000 people, expensive migrations, data loss. Also assess blast radius: what can go wrong and how bad it is.
- Each PR ends with a "merge danger" summary, for example "two-way door, blast radius localized," so he knows how much attention to give.
- Principle two: explain what the PR does using pseudocode, diagrams and images instead of prose. He credits the "show me" skill from Dex Horthy's HumanLayer skills repo (the transcript renders the name as "Dex Hadley"). Mermaid and UML sequence diagrams help, and so do simple visuals, like a CLI diagram showing a new command and two new flags.

## Review the system that produces the code: the retro skill

- Matt's third principle: treat the process that produces your code as important as the code. Human review reviews the system, and "you never want to write the same comment twice."
- His new `retro` skill (retrospective) takes a single agent session, a PR plus its session, or a batch of the last week's PRs and reviews, and suggests automated checks and `coding-standards.md` updates to improve the next round.
- It also checks navigation pointers (can a pointer in `AGENTS.md` help the agent find information next time), tool economy (can tools be made more token efficient, which he says is hard to debug from outside), and bloat in steering files or skills.
- The compounding effect: human review makes the next review's quality higher and saves work later.
- His conclusion: layer automated checks and automated review so human review is "as painless, as simple, and as kind of optional" as needed. You don't need to review every two-way door, but you do review every one-way door.
- His skills are at aihero.dev/skills, with version 1.3 shipping that week.
