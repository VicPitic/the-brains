## Strategic vs tactical programming: why skills are the ceiling on AI

- Matt uses John Ousterhout's distinction from *A Philosophy of Software Design*. Tactical programming is day-to-day work: writing code, fiddling with syntax, fixing bugs as they appear, creating commits. Strategic programming is "winning the war, not the battle": long-term thinking about how the codebase should look and which strategies raise velocity.
- His claim: "AI has basically eaten tactical programming." AI does tactical work cheaper and better than a human, so developers need to be great at strategic programming to get value from "this infinite fleet of tactical programmers".
- Strategic programming hasn't changed. Delegating to AI is the same as delegating to junior or mid-level developers:
  - Design the hard parts up front.
  - Scope tasks tightly.
  - Think about the interfaces between modules.
  - Think about test seams and good tests.
  - Build a codebase that is easy to work in, with just enough documentation to point the AI at the right places to make changes.
- "Your skills are the ceiling on what AI can do." If your skills are low, AI can't go past that.
- Skills act as a multiplier. He reports that CTOs and others at conferences tell him AI makes senior developers about 10x better, while juniors get a smaller boost, so it makes less sense to hire many juniors. (He notes he sells developer courses, so his view should be taken with a pinch of salt.)
- He still sees great juniors as valuable: enthusiasm beats experience, and juniors learn fast. Anyone with an experimental mindset who is curious about improving the harness will thrive, junior or senior.
- Seniors are useful because they know how to build good DX (developer experience), and there is a big overlap between good DX and good AX (agent experience). Juniors who are strong with AI come at the problem from a different angle.
- Product work: he says AI doesn't change the fundamentals of building a business. Talk to customers, find what they need, build prototypes. Ask AI what to remove from your app and how to simplify the UX, "instead of ending up like one of those dreadful VC funded apps" with a thousand features.

## Harness over model: where Matt puts his effort

- His "hot take": everyone is obsessed with the model, the engine of the Formula 1 car, when the engine is only part of the system. People should care about the harness: the right prompts, the right skills, and improving the environment the model runs in, including the codebase.
- He frames model and harness as roughly 50/50 in importance, and says you have far more control over the harness than the model.
- He raised the "bitter lesson" (raw compute beats clever optimisation) himself as the counterargument, and said he doesn't know if he's falling into it. He still believes there is a lot to gain from optimising the harness and building codebases the agent can do well in, "instead of hamstringing the agent before it even gets started".
- He declines to make predictions ("I'm not a pundit"). His approach: keep the workspace and harness agent-agnostic, apply good software fundamentals, and do "stuff that's always worked", which will probably keep working.
- Token spend: when asked how to optimise it, his answer is "Have a codebase that's easier to make changes in."
  - A better architecture means better guard rails and easier exploration, so a model spends fewer tokens "banging its head against the wall".
  - That lets you use a cheaper, "stupider" model for the same work.
  - If you hamstring the model from day one, you need a smart model to compensate.
- He contrasts this with the vibe coder who switches tools every week (Replit, Lovable, and so on) and never learns fundamentals. He says focusing on the big shiny new thing is focusing on the wrong thing.
- Model adoption: he runs Claude Code with Opus 4.8 at medium effort and says he mostly doesn't worry about models. For a new model he waits about a month to see how things shake out (as he did with Opus 4.5). He hadn't adopted "Fable" yet, citing the hype noise, token cost, availability and latency, even while granting it seems a step change.
- On the claim that a stronger model finds deeper security bugs: he says the useful lesson is that your code has security issues and you need a system that checks for them. A daily cron job reviewing a different part of the repo, even with a simpler model and the right prompt, can find them. His bike analogy: "if someone keeps stealing your bike, maybe buy a lock."
- He wants self-improving systems built from long-standing practices: test suites, human review, refactoring. When a bug surfaces, ask why it got there and fix the underlying process, not only the bug.
- On an agent doing the whole task via a browser (creating API keys, moving an app in a console): he sees that as a reasonable scoped task with tools. Deciding whether it's the right thing and security-testing the result is still the human's job.

## AFK agents, queues and Sand Castle

- Discovering AFK (away from keyboard) agents was when he "really got into AI coding" and massively increased output. Removing himself from permission prompts and questions lets him parallelise: "suddenly there are two of me, three of me, four of me, five of me."
- Human-in-the-loop work suits planning, complicated implementation and unscoped work. AFK work suits well-scoped tasks.
- On the "loops" trend (Ralph loop, Geoffrey Huntley's article dated 14 July the previous year): the Ralph loop is a while loop that feeds a prompt to Claude Code repeatedly. He realised he only needs an AFK agent to take a specific task and do it. He calls the idea that you should be running loops mostly nonsensical, since it just means AFK agents.
- He prefers queues to loops. The queue is the backlog of tasks, as development has always worked, with multiple nodes (developers or agents) picking items off.
  - His Sand Castle repo issues get triaged and explored AFK, then put back on the queue.
  - He adds an "agent implement" label and a GitHub Action running Sand Castle implements it.
  - The item leaves the queue when the pull request merges.
- A possible extended pipeline: Sentry or telemetry creates an issue from a live bug report, an agent explores it and returns structured data on whether it can be fixed immediately, then implements and reviews it, with a tag deciding whether it can auto-merge or pings a human.
- Principle: push human-in-the-loop checkpoints "further and further right". Instead of a bug report, the human gets the bug report plus the codebase exploration plus the fix, "one button click away instead of a whole debugging session away."
- Review does two jobs: it gates dangerous changes from production, and it gives insight into the system. You are reviewing the system that produces the code, not only the code. If an AI decides some PRs need no review, you still need to spot-check those decisions and improve over time. Removing checkpoints where possible is still the goal.
- He mentioned an approach where, on a front-end change, the AI records a video walking through the change and overlays text-to-speech narration on the PR. His point: build richness like this into review and use AI to make human review faster.

## Sand Castle: running agents in sandboxes

- Sand Castle is a tool Matt built to run agents inside sandboxes. Unsandboxed agents can do things like delete your home directory or exfiltrate environment variables to bad sites.
- It plugs into Docker or Podman and runs agents such as Claude Code inside the sandbox. It can run on his own machine or on remote sandboxes such as Vercel Sandboxes, with commits pulled back into the local workspace.
- He combines it with GitHub Actions. Example from the Sand Castle repo: an agent review action that runs on a PR, checks out the branch, runs a review prompt he keeps locally, runs type checks, and replies that it looks good.
- Benefits: parallelise as much as you like, don't constrain local machine resources, and spin up an agent quickly to do a task.
- His day-to-day setup: Claude Code for planning and some local implementation, Opus 4.8 at medium effort, and most development done AFK through Sand Castle plus GitHub Actions.

## Skills: procedures versus abilities, and how he writes them

- He splits skills into two types:
  - Procedures: skills you invoke yourself to get the model to behave a certain way.
  - Abilities: skills the model invokes on its own, for example a "React coding standards" skill it pulls in when writing React (such as not using useEffect).
- He prefers procedures because he wants to stay in control: "I don't want to delegate my thinking to the model." His workflow chains them: grill me, then write a PRD (to-PRD), then split it into issues, then work through them.
- Superpowers (from Obra, probably the most popular skills repo) takes the opposite approach, with the model in control.
- Cost of abilities: every skill's description leaks into the context window, so 100 skills means 100 descriptions in context. Setting `disable-model-invocation: true` keeps a skill user-only and stops its description entering context. He prefers to keep most knowledge in the human, not the AI.
- Grill me is one of his most popular skills. It is about four or five sentences and turns the agent into an adversarial interviewer that asks questions and offers ideas you hadn't considered until you reach a shared understanding. He uses it as a replacement for plan mode before implementing code, to flush out surprises early.
- Skills as reusable procedures are like extracting a repeated function in code: if you've made a plan 100 times, turn that into a skill and share it so the whole team plans the same way and contributes back. He calls it "raising the floor" for what engineers can do.
- Knowledge, skills and wisdom: knowledge is understanding in your head, skills are muscle memory from repetition, and wisdom is knowing when to do it and how it fits the real world. Wisdom is nearly impossible to gain without doing the thing in its real context. Skills can bundle the first two into something reusable.

## The teach skill: a stateful skill built on learning science

- Matt taught singing and voice for 10 years straight out of university, then became a developer, and has taught developers for four years. The teach skill encodes teaching principles: the zone of proximal development and the distinction between knowledge, skills and wisdom.
- It creates a course on the fly on any topic. He used it to teach himself to solve a Rubik's cube from memory, and to explore how to become a senior developer.
- Skills can be stateless (no local memory) or stateful. Teach is stateful because a good teacher remembers what you've done and where you need to go next. It must be run in a workspace because it saves state there.
- Demo flow, with Matt playing a vibe coder who can read some code and use basic CLI commands:
  - He wrote a mission statement by dictation (using Whisper Flow): a voice teacher wanting a scheduling and student-notes app, likely full stack with a database and authentication.
  - The skill checked the workspace, asked a few questions to align with the mission, then wrote a `mission.md` (who the person is, what they want to build, why it matters, what success looks like).
  - It searched trusted resources, then created a learning record, a reference cheat sheet and a first lesson.
  - It started with Git, since the highest-leverage gap for a vibe coder is the stuff around the code that lets you "ship without fear".
- Lessons are generated as local HTML files, richer than the terminal ("learning stuff in the terminal is just brutal"). They include exercises to run in the terminal and are personalised to the user's machine.
- It uses quizzes ("I sort of hate quizzes but quizzes are just unreasonably effective for increasing the strength that something is stored in") with questions such as `git commit`, `git status`, `git add` and `git restore`, then points to a primary source (the Pro Git book).
- He sees knowledge as a graph, a forest to explore, and the skill builds a linear path through it, tracked in a learning record (mission, starting point, current estimates).
- Install from his GitHub skills repo: `npx skills latest add mattpocock/skills`, then choose teach. It works with Claude Code, Codex and others.
- He says skills are a good example of the point that a better teacher can use AI to teach better.

## Advice for getting more out of AI today

- Step 1: delete every skill, plugin and MCP server, plus `CLAUDE.md` and `AGENTS.md`. Go back to a blank slate and watch what the agent does. In his experience people bloat their context window with too many instructions.
- Step 2: layer things back on deliberately, as procedure skills you choose. His skills repo is a good start. If you really miss something (he gave brainstorming from Superpowers as an example), bring it back, installed in a form you can customise and experiment with.
- Step 3: when you notice a problem, find a fix for it. Delegate implementation to an AFK agent as much as possible. AFK "takes a little bit of setup, but once it's set up, it just goes crazy."
- Dictation is a big speed advantage; he says communication and speaking are "ridiculously overpowered" in development.
- Where to find him: aihero.dev (newsletter) and aihero.dev/skills for updates to his skills.
