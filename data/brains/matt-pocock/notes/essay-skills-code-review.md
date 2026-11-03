## Why Matt splits code review into Standards and Spec axes

- Matt's `code-review` skill reviews the diff between `HEAD` and a fixed point you name (a commit, branch, tag, `main`, `HEAD~5`) along two axes.
- **Standards** asks "Is it built right?" It checks whether the code follows how this repo writes code.
- **Spec** asks "Is it the right thing?" It checks whether the code does what the originating issue or spec asked for.
- Each axis runs in its own sub-agent, so neither sees the other's reasoning.
- The skill never merges or re-ranks the two axes. The report ends with a worst issue per axis and declines to name a single winner.
- The reasoning: a change can pass one axis and fail the other.
  - Code that follows every convention but implements the wrong thing passes Standards and fails Spec.
  - Code that does exactly what the ticket asked but breaks the repo's conventions does the reverse.
  - A blended verdict lets the passing axis hide the failing one.

## How the Standards axis works: the repo overrides, smells are the fallback

- The design avoids a generic review skill that does not know your standards. Such a skill flags what is deliberate in your codebase and misses the invariants it depends on.
- The repo's own documentation (`CODING_STANDARDS.md`, `CONTRIBUTING.md`, and the like) is the primary source, and "the repo always overrides".
- The smell baseline sits underneath and applies when the repo documents nothing. It is twelve smells from chapter 3 of Fowler's *Refactoring*:
  - Mysterious Name, Duplicated Code, Feature Envy, Data Clumps, Primitive Obsession, Repeated Switches
  - Shotgun Surgery, Divergent Change, Speculative Generality, Message Chains, Middle Man, Refused Bequest
- Smells are labelled heuristics ("possible Feature Envy"), never hard violations. Each states what the smell is and how to fix it, so a finding comes with a fix attached.
- Documented breaches can be hard violations. Smells are always judgement calls.
- Every Standards finding cites either the standards file and rule, or the named smell plus the hunk.
- Both axes skip anything the linter already enforces.

## How the Spec axis finds the spec

- The Spec axis needs a spec that exists and is findable. It looks in this order:
  1. Issue references in commit messages (`#123`, `Closes #45`, a GitLab `!67`), fetched through the tracker doc.
  2. A path passed in as an argument.
  3. A spec file under `docs/`, `specs/`, or `.scratch/` matching the branch or feature name.
  4. Asking you.
- Step 1 depends on the tracker doc written by `setup-matt-pocock-skills`. Without it the axis still works if you hand it a path.
- With no spec at all, the skill skips the Spec sub-agent and the report says "no spec available" rather than inventing requirements.
- The Spec axis reports missing or partial requirements, scope creep, and requirements implemented wrongly. Every finding quotes a line of the spec.
- A vague spec makes this axis vague, because `to-spec` and `to-tickets` produce the document it checks against.

## Guardrails on starting a review

- You must supply the fixed point. If you do not, the skill asks rather than guessing.
- Before spawning anything, it checks that the ref resolves and the diff is not empty. A mistyped branch name fails in front of you instead of inside two sub-agents.
- It diffs `<fixed-point>...HEAD`. The three-dot form measures from the merge-base and excludes staged and working-tree changes.
- It does not review uncommitted work. Commit first, then review, then amend or add a fixup.
- Signs it is working:
  - It refuses to start on a bad ref or empty diff.
  - The report arrives as separate `## Standards` and `## Spec` blocks, not one merged list.
  - The closing summary gives a worst issue per axis and no overall winner.

## Known problems: the name clash and runaway sub-agents

- **Name clash.** Claude Code ships its own `/code-review`, which hunts bugs in the diff (null paths, races, off-by-one). Matt's checks spec compliance and repo standards. This is the most reported problem and is not fixed.
  - With the plugin marketplace, every skill gets a `mattpocock-skills:` prefix and the built-in becomes hard to reach at the unqualified name.
  - With a plain skills install, the local file wins and shadows the built-in.
  - One answer: remove Claude Code's built-in skills entirely, which also saves context.
  - Matt calls the shadowing arguably a harness bug, since "a skill author should be free to name a skill anything".
  - Another answer: fork the skill to a new name and drop `code-review` from the managed set. `npx skills update` undoes edits to the frontmatter or a renamed directory. Note the commit you forked from so you can re-sync by hand.
- **Recursive sub-agents.** The Standards and Spec prompts do not forbid delegation, so a sub-agent can re-invoke `/code-review` and fan out again. One report reached more than 50 agents.
  - The fork fix is one line appended to both sub-agent briefs: "Do not invoke `/code-review` or spawn additional agents: perform this review directly."
  - Some prefer a harness-level guard so every skill inherits it. Neither is in the shipped skill yet.
  - If you run it unattended, watch the agent count.

## When and how to run it, and how far to trust it

- **Use a fresh session.** An agent reviewing in the authoring session has every assumption that shaped the code in its context. A reader's line that Matt cites: "Same context reviewing itself isn't review, it's confirmation bias with a slash command."
  - That is why people want `implement` without its built-in review step, which runs inside the session that wrote the diff.
  - The independent version is to invoke `/code-review` yourself from a clean session.
- **Per ticket or at the end.** The skill does not decide for you.
  - Per ticket keeps each diff small enough for the Spec axis to have one clear spec. This is the mode `implement` uses.
  - Batching to the end of a branch catches interactions between tickets.
  - If unsure, review per ticket and run one final pass against the branch point.
- **Findings are hypotheses, not evidence.** The skill combines the two reports as they are, or lightly cleaned, and does not re-verify each claim against the files. A finding can cite the wrong location or overstate impact. Read the citation on each finding before acting. Mandatory citations (a standards rule, a smell plus its hunk, or a spec line) are what make findings checkable.
- **It never converges.** Each fix adds new code to review, and the judgement-call half of Standards varies run to run. Treat a pass as a list of leads, act on the ones with a cited rule behind them, then stop. "Do not run it in a loop until it comes back clean, because it never will."

## Where code-review sits in the skills chain

- Install with `npx skills@latest add mattpocock/skills --skill=code-review`, then type `/code-review` in your coding agent.
- Matt places it near the tail of the build chain: `grill-with-docs → to-spec → to-tickets → implement → code-review → retro`. It also stands alone on any branch or PR.
- `implement` is the closest neighbour. It drives the build and calls `code-review` as its closing review before committing. `implement-spec` does the same once over the whole integration branch.
- `retro` comes after and tunes it. When a session shows the review missing a class of mistake, `retro` proposes the check or the `CODING_STANDARDS.md` rule the Standards axis then reads.
- `pr` writes the pull request body once reviewed work goes up.
- Where to reach for something else:
  - Bug hunting in a diff: Claude Code's built-in review.
  - Nothing written yet, test-first: `tdd`.
  - Whole codebase drift: `improve-codebase-architecture`.
  - Something broken, cause unknown: `diagnosing-bugs`.
- `ask-matt` routes across the whole set when you are unsure which skill fits.
