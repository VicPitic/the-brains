## Why the smart zone and the Memento constraint drive Matt's whole AI coding workflow

- LLMs have a "smart zone" and a "dumb zone" (a idea Matt credits to Dex Hardy of Human Layer). A fresh context does its best work, and each added token strains attention relationships, which scale quadratically, like adding a team to a football league.
- Matt puts the dumb-zone boundary at roughly 100K tokens, regardless of whether the window is 200K or 1 million. He says the 1M window "shipped a lot more dumb zone" to people. It helps retrieval (e.g. large documents), not coding.
- Size tasks to fit the smart zone. This is old advice (Refactoring, The Pragmatic Programmer): don't bite off more than you can chew.
- LLMs are "like the guy from Memento": a session goes system prompt, exploration, implementation, testing, and clearing returns to the system prompt. Keep the always-on system prompt tiny (he's seen people put 250K tokens there).
- Matt prefers clearing to compacting. A cleared context returns to the same known state every time, so he optimizes for that. Compacting leaves sediment.
- He keeps a status line showing the exact token count in every session, "absolutely essential" to know how close you are to the dumb zone. He has an article on this on AI Hero.
- Multi-phase plans (phase 1, 2, 3, 4) are really a loop. Matt used them until December last year, then moved toward Ralph Wiggum-style loops (a PRD for the destination, then "make a small change that gets us closer"), but prefers more structure than plain Ralph.

## Grill-me: reaching a shared design concept before any plan

- Matt starts virtually every piece of work with a `grill me` skill, invoked as `/grill-me` plus the input (in the demo, a Slack message from a client about adding gamification to a course platform).
- The skill is tiny: "Interview me relentlessly about every aspect of this plan until we reach a shared understanding. Walk down each branch of the decision tree resolving dependencies one by one. For each question provide your recommended answer." One question at a time.
- Motivation: in plan mode the AI eagerly produces a plan too early. He wanted what Frederick P. Brooks calls the "design concept" in The Design of Design, a shared idea between all participants. "I didn't need a plan, I needed to be on the same wavelength as the AI."
- The AI first explores the repo via an explore sub-agent (about 93.7k tokens in the demo) which has an isolated context and reports a summary back, so the main context barely grows.
- Its recommended answers are often good; Matt frequently accepts them. In the demo it surfaced non-obvious questions such as whether points should be retroactive for existing lesson-progress records.
- Sessions can run 22, 40, 80 or even 100 questions, up to an hour. Matt usually dictates answers rather than typing. The demo session used about 25k tokens, "all of that is gold".
- It works as a team activity: feed a domain-expert meeting transcript into a grilling session to test assumptions. Matt likes pair/mob programming with an AI as the relentless third person. Real decisions need humans in the loop; implementation can be AFK.
- If grilling is too intense, tune the skill (e.g. add stop points).
- He avoids the AskUserQuestion UI in Claude Code, calling it "broken in a ton of different ways".
- He argues against "specs to code": editing specs and ignoring the code is "vibe coding by another name". "I tried this. I really tried it. And it sucks." The code is "your battleground".
- He urges owning your planning stack rather than adopting frameworks (Spec Kit, OpenSpec, Taskmaster): with no clear winner, you need control and observability to fix it when it breaks.

## PRD as destination, Kanban board as journey

- After grilling, Matt runs a `write a PRD` skill to summarize the design concept into a destination document: problem statement, solution, user stories (18 in the demo), implementation decisions, testing decisions, and an out-of-scope section (which also records negative decisions and gives a definition of done).
- The PRD includes proposed modules to modify, so the code stays in mind during planning. The skill can interview again and explore the repo if run fresh.
- He does not review the PRD: LLMs are good at summarization and the shared design concept already exists, so reading it would only test summarization. He also sees little value in endlessly optimizing the PRD; the effort belongs in QA.
- He then converts the PRD into a Kanban board of issues with blocking relationships, each tagged HITL or AFK. In the demo: 5 issues, e.g. schema plus gamification service, streak tracking, wiring into lesson/quiz completion, retroactive backfill, and a final issue blocked by all.
- Unlike a sequential multi-phase plan (one agent only), a Kanban DAG can be picked up by multiple agents in parallel. Blocking order defines phases: e.g. one task first, then two in parallel, then a third.
- The PRD and issues are his own workflow: he uses GitHub issues in his course-video-manager repo (744 closed issues; roughly a thousand videos recorded with the app), and local markdown files for the workshop.
- He deletes or closes PRDs after implementation to avoid doc rot, where stale docs mislead later agents. On GitHub he just marks the issue closed.

## Tracer bullets and vertical slices, not horizontal layers

- Matt uses the "tracer bullet" idea from The Pragmatic Programmer for issue breakdown. His PRD-to-issues skill says: break a PRD into independently grabbable issues using vertical slices.
- Analogy: tracer rounds glow so an anti-aircraft gunner sees where they're aiming. In code, that means feedback on the entire flow early.
- AI loves coding horizontally (all the database work, then all the API, then the front end), so it gets no integrated feedback until phase three and codes blind until then.
- A good first slice cuts through all layers: schema changes, a new service, and a minimal front-end representation. In the demo the AI proposed a service-only first slice; Matt told it "the first slice is too horizontal". It corrected to "award points for lesson completion, visible on dashboard".
- He values 20-year-old books because they already verbalize best software practices in English, a gold mine to feed into prompts.

## AFK implementation: the Ralph loop, TDD and feedback loops

- Matt frames it as the human "day shift" (grill, PRD, Kanban, QA) and the AI "night shift" (implementation).
- His `once.sh` script (human-in-the-loop version) cats all local issue markdown files into a variable, grabs the last five commits, and runs Claude with permission mode accept edits and the prompt. An AFK version loops it inside a Docker sandbox. Run the once version first to watch and tune the prompt.
- The prompt: work on AFK issues only; output a "no more tasks" marker when done; pick the next task by priority (critical bug fixes, dev infrastructure, tracer bullets, then polish, quick wins and refactors); explore the repo; use TDD; run feedback loops.
- TDD is "absolutely essential". A red-green-refactor skill makes the agent write one failing test first, confirm red, then implement. This adds good tests and makes it harder for the AI to cheat, which it does when it writes the whole implementation and then tests below it.
- Feedback loops (tests, type checking) set the ceiling on AI output quality. In the demo it ran `npm run test` and `npm run type check`, fixed a type error, and ended with 284 tests. If AI output is bad, improve the feedback loops.
- Sandcastle, a TypeScript library Matt built over about a week, runs this in parallel: a planner reads the backlog and picks issues, each gets a git worktree/branch in a Docker sandbox with an implementer, then a reviewer, then a merger agent merges branches and fixes type and test failures. He uses Sonnet for implementation and Opus for review.

## QA, review and taste

- Manual QA is the human's job. In the demo, the app threw a SQLite error because the migration hadn't been applied (a table he found oddly named "point events"), which he fixed with a DB migrate/push. He skipped showing QA since "there's nothing less exciting than watching someone else QA".
- QA is where he imposes taste. Teams that automate every stage (idea, research, prototype, QA) end up with "apps that lack taste" and "slop". QA findings become new issues on the Kanban board, even while implementation runs.
- Always add an automated review step with a cleared context. A reviewer in the same context as the implementer works in the dumb zone; a fresh context reviews in the smart zone. Tokens are cheap and AI reviews well.
- To enforce coding standards: "push" (always sent, e.g. CLAUDE.md) versus "pull" (skills the agent may fetch). Make standards available by pull to the implementer, and push them to the reviewer along with the code.
- Matt admits he does more code review now and doesn't know how to square this with small PRs. "I think we just need to be ready to be doing more code review."
- For front end, AI can't judge visuals well yet; he asks for three throwaway prototype routes to click between, then feeds the chosen one back into grilling.

## Deep modules: making a codebase agent-friendly

- "Bad code bases make bad agents." Matt uses John Ousterhout's A Philosophy of Software Design: many shallow modules (small files, tangled dependencies) are hard for AI to navigate and hard to test, and the AI tends to produce them unaided. Tests end up wrapped around each tiny function, missing the interactions.
- Deep modules expose a small, simple interface over a lot of functionality. Put one test boundary around the module and test through its interface.
- Design the interfaces yourself and delegate the implementation. Treat modules as grey boxes: know their shape and behavior, not every line. This keeps your mental map of the codebase while moving fast, which counters the common feeling of knowing your code less well.
- His `improve codebase architecture` skill scans the repo and proposes clusters of related modules to deepen. In the demo it flagged a quiz scoring service with zero tests as the biggest gap. On his video editor it helped build one large module spanning front end to back end (using a discriminated union between the two types), testable from outside, which was "night and day" for the AI's ability to change it. "If you take one thing away from today, just try running this skill on your repo."
- On TypeScript depth: he says deep understanding of code and tools makes you much better with AI.
