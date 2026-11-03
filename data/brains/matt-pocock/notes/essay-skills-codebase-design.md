## Skill vs. process: what `/codebase-design` is

Matt's `codebase-design` skill is a reference glossary, not a process. It fixes the vocabulary for designing modules: module, interface, depth, seam, adapter, leverage and locality. It runs no loop, produces no artifact and never stops to ask a question.

Matt says to know this before invoking it. If you point a session at a skill with no process and no stopping rule and say "go", the agent invents a process.

- He recommends invoking a driver skill (`/grill-with-docs`, `/improve-codebase-architecture` or `/tdd`) and using `codebase-design` as its vocabulary.
- The skill is model-invoked and describes itself as vocabulary, but nothing in it hard-stops an agent from treating it as a runnable process.
- A reported failure (issue #449): told to "resume in /codebase-design and drive the open decisions", an agent picked the closest thing to a process, the parallel sub-agents in `DESIGN-IT-TWICE.md`. It re-explored code a previous session had already mapped and burned about 100k tokens before asking anything.
- The skill has none of a driver skill's guardrails: checkpoints, one question at a time, no auto-advance.
- It's working if invoking it does not start a session. If the agent begins reading files and proposing refactors from `/codebase-design` alone, it has mistaken the reference for a driver.

## The vocabulary and the words it bans

The glossary is the skill. Each term is defined against the others, and each has a loose substitute that Matt bans.

| Term | Meaning | Don't say |
| --- | --- | --- |
| Module | Anything with an interface and an implementation. Deliberately scale-agnostic: a function, a class, a package, a slice spanning tiers | unit, component, service |
| Interface | Everything a caller must know to use it correctly: the type signature plus invariants, ordering constraints, error modes, required config, performance characteristics | API, signature |
| Depth | Leverage at the interface: how much behaviour a caller or a test can exercise per unit of interface they have to learn | none |
| Seam | Michael Feathers' term: a place you can alter behaviour without editing in that place. It is the location of an interface, and where to put it is a separate decision from what goes behind it | boundary |
| Adapter | A concrete thing satisfying an interface at a seam. It names a role, not a kind of thing: an in-memory fake and a Postgres repo are both adapters | none |
| Leverage | What callers get from depth: more capability per unit of interface learned | none |
| Locality | What maintainers get from depth: changes, bugs and verification stay in one place, so one fix covers every caller | none |

- **Deep** means a lot of behaviour behind a small interface. **Shallow** means the interface is nearly as complex as the implementation.
- Matt deliberately does not define depth as the ratio of implementation lines to interface lines (Ousterhout's own definition). That metric rewards padding the implementation, so the skill uses depth-as-leverage instead.
- Discussing an interface should cover invariants, ordering and error modes, not only the type signature.
- The design conversation should stop producing "component", "service" and "boundary" and start producing "module", "interface" and "seam".

## The four principles

- **Depth is a property of the interface, not the implementation.** A deep module can be built internally from small swappable parts that callers never see. A module can have internal seams its own tests use, and one external seam at its interface.
- **The deletion test.** Imagine deleting the module. If complexity disappears, the module was a pass-through. If it reappears across N callers, the module was hiding real complexity.
- **The interface is the test surface.** Callers and tests cross the same seam. If you want to test past the interface, the module is the wrong shape.
- **One adapter means a hypothetical seam. Two adapters means a real one.** Don't cut a seam until something varies across it. A single-adapter seam is just indirection.
- A proposed seam should come with a second adapter named, not just the first one.

## When to use it, and which skill fits instead

Matt's rule is to reach for `codebase-design` when you already know which code you're redesigning and need to think about its shape: where the seam goes, how small the interface can get, whether an extraction removes complexity from its callers. It also settles arguments about what a design word means.

| The problem | The skill |
| --- | --- |
| The shape of one module: its interface, seam, depth | `codebase-design` |
| The words of the domain ("account" means three things; two people mean different things by "cancellation") | `domain-modeling` |
| You don't yet know which module to redesign | `improve-codebase-architecture` (the survey that finds candidates) |
| You want the design argued with, not just named | `grilling` |
| A concrete behaviour to build, with tests that survive a refactor | `tdd` |

- `codebase-design` is a reach-for-it-anytime standalone and the vocabulary layer under the engineering skills, not a step in a chain.
- `domain-modeling` is its closest neighbour, covering the problem domain's words rather than the module's shape. Naming a deep module well needs both.
- `improve-codebase-architecture` writes every deepening candidate in this glossary, so it finds the module and you design it in this skill's words.
- `tdd` now points at this skill when the open question is the shape of the interface. `tdd` still owns "seam" as the boundary you test at; this skill owns the module shape behind it. For a long time `tdd` had no such pointer, because v1.0 removed its inline deep-module notes without adding one.

## Enforcing deep modules in TypeScript

The skill defines what a deep module is. It says nothing about stopping a stray import from reaching past the interface.

- Issue #458 states the problem: "without linting or clear guardrails, humans and LLMs alike will start making it messy over time."
- The answer in that thread gave three options:
  - Wrap it in a class or IIFE, and accept that the class gets enormous.
  - Make it a package in a monorepo, and accept the monorepo tooling.
  - Use a linter like dependency-cruiser to forbid imports that bypass the interface.
- Matt's ranking of the mechanisms: Effect is the best, dependency-cruiser the second-best.
- A `setup-ts-deep-modules` skill sits in the repo's `in-progress/` bucket. It lays down a `src/packages/<name>/index.ts` convention but is a beta-channel skill with no docs page and ships no lint rule.

## It is not a file-structure convention

People repeatedly push for folders, barrel files or feature slices as the implementation of deep modules. Matt's position has not changed.

- Issue #95 proposed a formalised fractal-tree file structure. His reply: "deep modules are about the design of the interface and accessing through a strict interface, no matter what the file system looks like. It seems perfectly possible that you could have shallow modules with this approach."
- On #458: "I think you might be tying the concept of modules too closely to the file system. The file system can certainly be a useful hint to the shape of modules, but there's no need to use the file system in the construction of deep modules."
- That is why **module** is defined as scale-agnostic.

## Supporting files, history and glossary scope

Two supporting files are read on demand rather than up front.

- **`DEEPENING.md`** classifies a candidate's dependencies into four categories: in-process, local-substitutable, remote-but-owned, true-external. The category decides how you test the deepened module across its seam.
- **`DESIGN-IT-TWICE.md`** starts parallel sub-agents to produce three or more radically different interfaces for the same module, then compares them on depth, locality and seam placement. The technique comes from Ousterhout.
  - It says "spawn 3+ sub-agents in parallel using the Agent tool", and "Agent" is a Claude Code tool name.
  - Other harnesses, including Codex, may have no tool with that name, so the parallel-design phase is less portable than the skill's metadata suggests (issue #564, open).

History and scope:

- This skill replaced `design-an-interface` and took over its content, so nothing is missing.
- A separate `/interface-design` skill has been requested, but this skill already covers that deep-module/thin-interface philosophy and no separate skill is planned.
- Proposed glossary additions, both open and unmerged:
  - Issue #180: Parnas's module secrets and Page-Jones's connascence, as a naming layer for what is leaking across a seam.
  - Issue #303: progressive disclosure inside the implementation, so a module that is deep at its public interface also has structure inside it.
- The shipped glossary is small on purpose. Consistent language is the whole point, and a term nobody uses consistently is worse than no term.
