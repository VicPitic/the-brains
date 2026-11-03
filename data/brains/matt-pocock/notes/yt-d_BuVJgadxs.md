## Interviewing the agent with "grill me" before building

- Matt built "grill me" because plan mode asks a few vague clarifying questions and then rushes to produce a plan.
- He calls this an "asset rush": the agent is sycophantic and heads for a finished artifact (a plan) as fast as it can, because that scores well in benchmarks.
- The skill is about five lines. It tells the agent to interview him about what he is building until they reach a shared understanding.
- It never mentions creating a plan. Hiding the next step makes the agent do more work on the current step, and Matt decides when to stop.
- Sessions can run to roughly 40 questions. The conversation itself becomes the asset.
- He credits Tariq, who works on Claude Code, for the idea that interviewing is a powerful technique.
- Matt's analogy: ordering a chorizo salad and getting a sandwich, so you send it back. Grilling stops that.
- Using Frederick Brooks's term, the goal is a "design concept" held clearly in the user's head. Once that is clear, the implementation is trivial for the AI.
- Grilling tests the user as much as the agent. Someone told him they use "grill me" to interview job candidates, to see how they interact with AI and whether they can hold the design concept clearly.
- He has the AskUserQuestion tool disabled. He dislikes its multiple-choice UI, and it costs about 2K tokens in the system prompt, which eats smart-zone budget.
- He sees tools converging: OpenSpec explore mode, Superpowers brainstorm and grill me are all the same idea.

## Grill with docs: ubiquitous language and ADRs

- Code can explain what it does but not the decisions that were not taken, and it explains domain language poorly.
- "Grill with docs" is grill me plus a thin documentation layer: a ubiquitous language (from DDD) and architectural decision records (ADRs) in the repo.
- The problem it targets: AI output can be verbose and use words that feel wrong, a communication gap between Matt as product manager and the AI as developer.
- Example in his own apps (a video editor and a course planner). Instead of "when you create a real lesson inside a ghost section inside a ghost course, it should make the ghost section and ghost course real and require a file path", he can say "there's a problem in the materialization cascade."
- His pet theory: once you establish the language of something, you understand it and have a working model of it. This also applies to teaching.
- The grilling session is the right moment to settle the terms, not later.

## Specs are temporary; make the code easier to navigate instead

- Matt is not a fan of spec-driven development, partly because everyone means something different by "spec".
- His definition: a spec is a temporary artifact for scheduling work over multiple agent sessions. Write the spec, split it into tickets (one agent session each), clear context between tickets, then delete the spec once it is in the code.
- He disagrees with persisting specs as a shadow version of the code:
  - It spends tokens keeping the specs in sync with the code.
  - It locks you into a spec-first way of working.
- His alternative: spend those tokens making the code easier to navigate and read. That means fewer cross-repo dependencies and better modules, so the agent doesn't have to search everywhere.
- The host argued that persisted specs save the cost of inferring features from the whole codebase, provided they stay up to date. Matt kept his position.

## Wayfinder, the smart zone and the dumb zone

- Wayfinder plans big changes (or new projects) across many agent sessions, because Matt wants most work to fit in a narrow context window.
- He gets the best output in roughly the first 150k tokens. Dex Hy, behind HumanLayer, calls this the "smart zone"; beyond it is the "dumb zone".
- Smart-zone work is cheaper, and the agent avoids attention degradation.
- Mechanics:
  - It creates a map issue in the tracker (GitHub issues in his case; Linear works too). It is like a parent epic aiming at one big spec.
  - Sub-issues are decision tickets, with blocking relationships between decisions.
  - Each decision ticket is its own session: a grilling session, research on external information, or a prototype.
  - There is a "fog" section for things that can't be scoped yet because earlier decisions haven't been made.
- Prototypes are underused. A prototype that looks and behaves as wanted is "catnip" for agents: they can read the code and turn it into production code.
- On 1M-token windows, the smart zone/dumb zone is a heuristic, not a hard drop-off. Context size is a limit the labs pick for infrastructure reasons. More tokens just degrade quality gradually.
- It is fine to enter the dumb zone for mindless refactors or long implementations, at slightly worse results per token.
- He uses Wayfinder for non-coding work too, such as planning a garden office. It pushed him to call a surveyor.

## Strategic vs tactical programming, and who owns a spec

- Matt uses John Ousterhout's distinction (A Philosophy of Software Design): tactical programming is day-to-day coding; strategic programming is the long-term view of the codebase and product.
- AI has "eaten" tactical programming. What is left is planning and review, and the middle of the process is gone.
- Open question he raises: how do juniors learn strategic programming when it normally takes months of living with your own mistakes? And how do you interview for it?
- Labor is no longer the constraint, but alignment and building the right thing still are. The host noted AI makes coding vastly faster without making ticket throughput proportionally faster.
- His view on sprints and tickets: the right unit is no longer the individual ticket. One developer should own an entire spec and manage the agents that implement it.
  - A developer might handle about four specs at once.
  - This avoids a "crisis of responsibility", where code is merged and nobody owns it ("the AI did it").
- On understanding AI-written code: delegation is healthy. Developers should own the overall shape and the interfaces (modularization, how others interface with the code) but needn't understand every line of the implementation.
  - His rule: "design the interface and delegate the implementation."
- For collaboration, he made an in-progress skill, "to questionnaire". It turns the grilling questions into a Google Doc that a non-technical person can fill in offline, then feeds the answers back to the agent. He used it with his wife on the garden office.

## Handoff skill and running multiple agents

- Work in a session has phases (grill, implement, review). At each boundary you can continue, clear context, or compact.
- When something unrelated comes up mid-session (a critical bug, a type error), the handoff skill writes a markdown document describing the work, which you open in a new agent.
- Claude Code's agent view runs many agents under a background daemon. He now has a Claude handoff skill that spawns a new agent from the command line instead of the manual copy-paste.
- He can spawn several agents on separate tasks while the main session keeps going.
- He keeps one folder where he runs all Claude Code sessions. Its `CLAUDE.md` holds navigation pointers to each repo, acting as a router, and he keeps skills there. This gives him a single directory for all work.
- Tools he mentioned: Herder (herdr), an open-source layer over tmux with integrations for Claude, Codex and others. He hasn't fully adopted it because of a dictation incompatibility.

## Dictation and personal software

- He dictates into agents with Whisper Flow. He argues that AI is good at picking out transcription errors and understanding what you meant, so dictated text is a great input.
- He runs several grilling sessions at once: switch tabs and dictate into each.
- He has an annual Whisper Flow subscription.
- His personal wiki: an ingest bot runs every 3 hours in GitHub Actions and pulls his inputs (Twitter, Gmail, Discord, YouTube) into a wiki of markdown files in a repo.
  - He has about 300,000 followers on Twitter and about 300,000 subscribers on YouTube, too much to read by hand.
  - He queries the wiki when planning courses ("what are people confused about?").
  - Gemini text-to-speech turns the day's changes into a private daily podcast feed, about 15 minutes of two people discussing his audience.

## Background and where the field is converging

- Matt has done full-time developer education since 2022. His background includes the XState open-source library (and the company Stately), a short stint at Vercel as a developer advocate, then the Total TypeScript course.
- He argues type safety matters even more with agents.
- His skills repo took him by surprise. The numbers given in the episode: about 185k stars and 11 million downloads. He calls it the biggest open-source thing he has done.
- Most of 2024 he focused on putting AI into apps, such as chatbots. That knowledge carried over to working with harnesses, because the underlying models are the same.
- His view on churn: despite the pace, the fundamentals aren't changing much. Everyone is converging on plan, execute, review, human review, merge.
  - There are still disagreements, such as whether to persist specs and how much to prototype.
- That stability is why he feels he can release AI coding courses now.
