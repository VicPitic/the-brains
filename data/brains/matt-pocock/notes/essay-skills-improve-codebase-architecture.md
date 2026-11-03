## What the skill does and what it never touches

- `/improve-codebase-architecture` surveys a codebase for "deepening opportunities": places where a shallow module (an interface nearly as complex as the thing it hides) could become a deep one.
- It writes the findings as one self-contained HTML report in the OS temp directory (`<tmpdir>/architecture-review-<timestamp>.html`), then grills Matt's reader through the one candidate they pick.
- It never changes code. The output is a conversation and one HTML file. The refactor happens later in a separate session through the normal build flow, so it is a survey, not a refactoring tool.
- It is invoked by typing `/improve-codebase-architecture`; the agent will not reach for it on its own. It is periodic maintenance outside the main build loop, used to queue up work.
- Install: `npx skills@latest add mattpocock/skills --skill=improve-codebase-architecture`.

## Depth, shallow modules and the deletion test

- The skill rests on one idea, depth. A deep module puts a lot of behaviour behind a small, stable interface. A shallow module exposes its implementation through an interface nearly as wide as the code beneath it.
- It hunts for three forms of shallowness:
  - Pure functions extracted only for testability, while the real bugs are in how callers use them (no locality).
  - Modules that leak across their seams.
  - A concept you cannot understand without opening five files.
- Filter one, the deletion test: if you removed this module, would its complexity move behind a smaller interface, or spread across the callers? Only the first case gets a card.
- Filter two, recency: unless pointed at a specific area, it reads recent commit history first and focuses on paths that change often. As Matt frames it, a deepening in code nobody touches is a refactor that never pays back.
- Vocabulary used throughout: module, interface, depth, seam, adapter, leverage, locality. This comes from the `codebase-design` skill, which is a reference rather than a session driver.

## The report: cards, badges and top recommendation

- Each candidate is a card with the files involved, the friction, a plain-English solution, the benefit in terms of locality and leverage, a before/after diagram, and a strength badge.
- Badges:
  - `Strong`: the deletion test passes clearly and the friction is real. Take these seriously.
  - `Worth exploring`: plausible, but the payoff depends on where the code is going next.
  - `Speculative`: included for completeness; most can be ignored.
- The report ends with a Top recommendation, the candidate it would do first. Then the skill stops and asks which candidate to explore. Nothing is decided and no code has changed at that point.
- It rarely says the codebase is fine, because it exists to output findings. Matt's correction: if every candidate is `Speculative`, the skill found nothing.
- If `GLOSSARY.md` or ADRs in `docs/adr/` exist, it uses the domain's own nouns, so a candidate reads "deepen the Order intake module," not "refactor the FooBarHandler."

## When to run it and how to prompt it

- Routine upkeep: run it every few days, or in a spare moment, so structure does not decay between features.
- Before a big build: point it at the spec and ask "how can we make this change easy?" Matt calls this the most effective prompt.
- Brownfield audit: run it on a large, unstructured or vibe-coded repo to learn what shape it is in.
- Legacy test work: use it to find missing seams before writing tests against untestable code.
- A run with no prompt looks for hot spots on its own, which is fine for upkeep; giving a direction makes the report actionable.
- Sibling skills:
  - `codebase-design`: design one module already chosen. This skill finds the module.
  - `wayfinder`: efforts too big for one session.
  - `diagnosing-bugs`: a specific broken thing; it sends you back here when there is no good seam to lock the bug down.

## What happens after you pick a candidate

- Picking a candidate starts a grilling session covering constraints, what goes behind the seam, which tests survive, and what the deepened interface should look like.
- The output is a decision, not a diff. It then enters the normal flow: `to-spec`, then `to-tickets`, then `implement`.
- During grilling it adds or sharpens terms in `GLOSSARY.md` (creating it if missing). It offers to record a rejected candidate as an ADR so a future run does not suggest it again.
- Matt recommends one candidate per session. Working several in one conversation fills the context window with the report, grilling, domain-model edits and code changes. The report is a temp file, so carry the candidate forward, not the file. Turn the rest into tickets for later, and put the chosen improvement into a spec rather than going straight to implementation.

## Known limitations and workarounds

- Grilling too long: the design intent is report first, grilling only on a chosen candidate, but weaker models skip to interviewing about their first idea. Workaround: say "don't grill me, just show the report." No documented no-grill mode exists yet; it is an open issue.
- Unstyled report: it loads Tailwind and Mermaid from CDNs, so a blocked network (or SRI hash mismatch from a security hook) breaks the page with no error, since the agent never renders it. Workaround: ask for inline CSS and hand-built SVG diagrams. Open issue.
- Large legacy codebases: it works partly. One user said it "helped a little but still doesn't seem to cut it"; one developer with an eight-year-old codebase saw the model go in circles. If there is no shared vocabulary, run `grill-with-docs` first to create one, which usually improves the output.
- Harness portability: the exploration step names Claude Code's `Agent` tool with `subagent_type=Explore`. Other harnesses may skip the parallel exploration, so the scan is less thorough. A harness-neutral rewrite is proposed but not merged.
- TypeScript: the skill does not ship concrete file and module layouts for deep modules (no `TYPESCRIPT.md`). It says where a deepening belongs and what goes behind the seam; turning that into a package or directory structure is left to you.
- Passing `/codebase-design` alone as a task fails: it has no process, so the agent invents one and runs a long time before asking anything.

## Signs it is working

- Candidates name domain concepts, not invented class names.
- Candidates sit in recently edited files, not in code nobody touches.
- No code changed; the only new file is the HTML report in the temp directory.
- It stops after the report and asks which candidate you want.
- Each card explains the payoff as locality or leverage and says which tests get simpler, not just "this is cleaner."
- On a lasting rejection, it offers an ADR.
- Where it fits: it is the periodic counterpart to `retro`. This skill improves the code the agent works in; `retro` improves the environment around it (checks, standards, steering files) after a build.
