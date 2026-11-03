## Skills as encoded processes, not special sauce

- Matt's most popular skill is "Grill Me": a short skill that interviews the user relentlessly about a plan before the agent does any work. He says it is "not a special sauce" and "anyone could have written this skill"; its value is that it encodes a repeatable process.
- His rule of thumb: whenever he wants to run a process again and again, a skill is the right place to put it.
- Small skills are easy to audit and easy to bring into an organization.
- The skills repo had 214,000 GitHub stars at the time of recording.
- Skills can be invokable by the model, by the user, or both. Grill Me is hidden from the model by default; the grilling skill beneath it holds the substance.
- He has two grilling skills: "grill me" and "grill with docs" (in his engineering directory), which runs a grilling session using the domain modeling skill. He calls this a hacky way to share code, since the skill spec has nothing on sharing code between skills.

## Align before you build: the plan, implement, review loop

- Matt frames agent work as plan, implement, review. Most people skip the pre-alignment phase before the agent does the work.
- Demo: he gave Claude Code (Opus 5, medium effort, Claude Max subscription) a security review of a newly deployed app, once without Grill Me and once with it.
  - Without it, he got a general security audit with decent but generic advice.
  - With it, the agent asked a round of numbered questions first ("who is the adversary?", "what is the asset?", "what is in scope?", "what is the deliverable?"), each with a recommended answer. It then asked about rate limits, unauthenticated health endpoints and more, so the audit became tailored to his real concerns.
- Users hold an internal hierarchy of values and priorities the agent cannot anticipate. Grilling closes that communication gap, "and that's always going to be there."
- Answering is quick because questions are numbered: "For Q1, yeah, I accept your recommendation. For Q2, the worst thing that can occur is probably data loss..." He dictates the answers.
- Questions come in sensible batches, in rounds.

## Low fidelity first

- Matt draws on Shape Up (Ryan Singer): people think they need to work at higher fidelity than necessary.
- His ladder: start with text, then move to diagrams or breadboarding, then prototypes.
- The default mistake is jumping straight to high fidelity ("produce the entire feature, then review the whole thing"), which makes review expensive and surfaces unexpected bugs late.
- Five minutes of low-fidelity alignment first lets you ship much faster.
- He does not claim low fidelity is always right: sometimes you need a prototype first. His focus is complex, production-bound apps, where "before you build anything real, you have to align."

## Grilling skill internals: leading words and design trees

- The grilling skill is about 22 lines long. It says to interview the user relentlessly until reaching shared understanding, and to map the plan as a design tree where every decision branches into the decisions that hang off it.
- Work the tree in rounds; "the frontier is every decision whose prerequisites are already settled."
- He calls the bolded terms "leading words": words designed to trigger the agent's reasoning traces and lead it to think in those terms.
- Facts are the agent's job, not the user's: "finding facts is your job, never the user's. When a frontier question needs a fact from the environment, dispatch a sub agent to find it. Don't block the user."

## The spec, tickets and implement workflow

- The main flow in his repo is grill with docs, then to spec, to ticket, to implement, to code review: essentially a software development life cycle encoded as skills that span multiple sessions.
- Grill with docs adds two outputs on top of grilling:
  - A glossary of the thing being built. Agents "thrive off consistent language"; if folders, functions and concepts are named consistently, a request like "modify the materialization cascade" tells the agent exactly where to look.
  - Architectural decision records explaining the non-obvious parts of the code.
- If the work fits in the remaining context window, jump straight to the implement skill: implement the code, commit, then run an automated review.
- For a large feature that cannot fit in one context window, write a spec (a document describing the destination, reusable for review and passed into every later session) and then tickets, where each ticket is a slice of the spec that fits in one context window.
- Tickets can be split across multiple agents or tabs, then integrated at the end.
- Contrast with superpowers: Matt says that pack aims to give the model superpowers, whereas his skills take more learning but give the user superpowers. Once you learn about five skills "you can build anything of any size."

## Running ticket loops overnight with Sandcastle

- Matt has had specs with around 30 tickets and runs them with a GitHub Actions setup that implements a ticket, clears the context, implements the next, and so on, overnight. He reviews the resulting PR in the morning.
- This needs a layer on top of the harness: model plus harness make the agent, and the layer above issues instructions and clears context. A set of tickets is just a loop, so it can be deterministic and does not need an agent.
- He built Sandcastle for this orchestration. Alternatives he names: the AI SDK (TypeScript), and Claude workflows that schedule sub-agents with a script.

## Writing for agents: killing no-ops

- His "writing for agents" skill packs what he has learned about writing skills and prompts.
- Core problem: agent-written skills fill up with "no-ops", instructions that change neither output nor behavior and can be removed with nothing changing. Examples: "be thorough" (like "don't make mistakes").
- He says you can often delete about half of a popular skill without changing output.
- The skill's pruning rules:
  - Keep each meaning in a single source of truth; duplication costs maintenance and tokens.
  - Check every line for relevance to what the document does.
  - Hunt no-ops sentence by sentence; an instruction the model already obeys by default adds nothing.
- Routine: once a month, run the skill over all your skills and read the diff (before and after) to see if you agree. It usually culls skills into smaller sections and is opinionated.
- It is model-invoked: it triggers when the agent is creating or editing skills or modifying AGENTS.md or CLAUDE.md.
- He warns that reading skills matters: he caught an awkward sentence in the skill itself that Opus had written.

## The teach skill

- Matt hand-wrote his "teach" skill, drawing on about 10 years of teaching experience: roughly 6 years as a voice coach (speaking and singing, lots of one-to-one) and about 4 years teaching devs.
- You create a dedicated folder and run the skill there. It creates a stateful workspace that saves information about you, tracks how you are developing, and keeps learning records, so later sessions build on earlier ones.
- On the first run it interviews you about what you want to learn and why, then finds primary-source resources and teaches itself from them. He finds it strong for academic material because the sources are often public PDFs.
- Lessons are produced as HTML. Each lesson should recommend a primary source for the user to read or watch, since "you should never really trust an LLM."
- He has used it to learn about feeding his 2.5-year-old better food, solving a Rubik's Cube, and folk harmonies.
- His engineering skills repo is aimed at engineers; the writing-beats skill was still in progress and not ready.
