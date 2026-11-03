## Why `/init` files hurt more than they help

- A `CLAUDE.md` or `agents.md` is part of the system prompt, which is hardwired the moment the agent starts.
- Every line inflates that prompt and leaves less room for exploration, implementation and testing.
- Matt's advice: never run `/init`. If you find an auto-generated file, delete it.
- He cites [research](https://arxiv.org/abs/2602.11988) showing unnecessary context files make tasks harder, not easier.

## The instruction budget and the globality problem

- LLMs have an instruction budget: a limit on how many instructions they can follow at once.
- Each sentence in `CLAUDE.md` counts as an instruction. Matt puts the realistic limit at around 300 to 400 instructions, maybe 500 for bigger models.
- Stuffing in irrelevant instructions burns that budget before the agent starts on the task.
- `CLAUDE.md` is global: every instruction applies to every session (frontend, backend, docs, database).
- A React rule helps a frontend session but is irrelevant in a backend or documentation session. Each added line has a cost that compounds across every session.
- He pushes back on the common advice to "put a rule in `CLAUDE.md`" whenever the agent does something you dislike (npm instead of pnpm, a React pattern you hate).

## What `/init` generates, and why each category fails

- **Command listings:** dumps every `package.json` script. The agent can just read `package.json`, so you pay tokens to duplicate the source of truth.
- **Architecture descriptions:** framework names, rendering modes, compiler settings. A `react-router.config` file already shows React Router; an `effect` import shows Effect.
- **File and service references:** the worst category. Rename a file or move a service and the doc is wrong, so it "actively misleads" the agent.
- **Implementation patterns:** discoverable from code and relevant to only a fraction of sessions.
- Matt's throughline: everything init generates is either trivially discoverable or will go stale. "Your file system _is_ the documentation." A well-structured codebase gives the agent an accurate picture from the source of truth, not a rotting summary.

## The replacement: explore step, skills, near-empty CLAUDE.md

- **Trust the explore step.** Modern agents read files and search the codebase just-in-time. This loads only what's relevant and always reflects current code.
- **Use skills for steering.** Preferences like reducers for complex UI state, or a specific testing pattern, belong in skills: discoverable instructions the agent pulls in when relevant, without spending instruction budget every session.
- **Keep `CLAUDE.md` almost empty.** The bar is content that is both undiscoverable and globally relevant.
- His entire `CLAUDE.md` is: "you are on WSL on Windows". It exists because WSL has unintuitive path resolution issues the agent can't discover on its own.

## How the context window is divided

- System prompt: LLM instructions, MCP servers, system tools and `CLAUDE.md` content. Not flexible.
- Exploration, implementation and testing: very flexible. A simple task needs little exploration; a bug-free implementation needs little testing. Testing can balloon when issues occur.
- Shrinking the system prompt frees space for the phases that do the work and lowers cost.
- His conclusion: if you don't delete the file, you'll burn tokens keeping it up to date. "Just skip to deleting it."
