## Brain dump and restate for planning; paper for the hardest puzzles

- Matt went back to paper for planning courses. A course is a puzzle of roughly a hundred things per section (his example was a six-section course) that must be put in the right order, with dependencies between them.
- When agents helped with this, he held less in his head. They produced a lot of plausible output, and he still had to spend time understanding their planning decisions.
- He says people underestimate the communication overhead of agents: "It is another person that you're dealing with, and that can be very tiring." For some tasks, doing it alone is faster.
- Agents work well in well-defined pipelines. His course pipeline runs: shape of the course, learning goals per section, beats (the vague things to hit in each video), animatics he reviews, then videos.
- His brain-dump flow works like this:
  - Lay out cards and read them out to the agent in a long dictated brain dump.
  - Have the agent restate what he said, so he can correct it ("maybe don't do that, maybe do this").
  - This removes the worry after 15 minutes of talking about whether you are aligned, or whether the agent latched onto something he didn't mean.

## Animatics: agents rehearse the course before he films it

- Matt finds Opus 5.5 "very, very good at vision". He wanted a high-fidelity mock-up of each video before filming, to understand it better and verify what he was about to do.
- Before filming, his agents run through the course locally. They do the work he would otherwise have done himself, work out the gnarly parts, and produce videos back to him: "I've almost seen the course before I'm filming the course."
- Fidelity can be lowered to keep it cheap: still images and a local voice model. His setup is highly parallelizable, so animatics are very quick.
- He thinks people are sleeping on agents producing high-fidelity video for little token spend. For code review, where an agent must give rich information, he expects video to appear more and more.
- He has been a Remotion fan for ages (videos in React). He notes its popular skills library and is starting to use it in his courses.

## Software factory: trust ladder, triggers, and brakes before accelerator

- He takes the trust ladder from Lauren: as agents can verify their own work, the benefit is outsized. If you trust an agent to build the right thing 90% of the time, that might support 50 agents at once. At 95% you get even more.
- He describes the path from idea to production as full of human checkpoints, which you can progressively remove. The first one to consider removing is initiating work.
- His definition of a software factory: "when you have triggers that initiate agent sessions on their own." One example is a loop that checks the GitHub issues on an open-source repo and spawns sub-agents to work on them.
- With triggers accelerating work, you need brakes: verification, testing, and human review. Human review need not cover every PR; you can sample some.
- Removing humans entirely creates a new class of problems. An agentic process on a code base is stateful, because the code changes under it. A bad seed in the environment sends the agent down a bad trajectory that gets worse and worse.
- He says no one working on state-of-the-art solutions seems to have solved this. The factory gets into weird patterns and eventually grinds to a halt, and he can't think of an architecture that escapes this without a sensible human intervening.

## How organizations should start: slow, with brakes and evidence

- Start with a small amount of work, such as one issue a day. "It's just all about building trust."
- The key is giving the agent the ability to prove its change works. Many companies hamstring their agents because systems depend on complicated microservices, or on Kubernetes, which makes them hard to run, so most apps are "not factory ready".
- Get your brakes in first: "if you don't push the quality high enough, you're going to turn your app into a slop cannon."
- An ideal agent PR has these properties:
  - It ran against a staging database similar to production.
  - It attached screenshots of the thing working.
  - It rated its own blast radius, meaning how dangerous it is to merge.
- When people see that, they start to believe and can push the accelerator.
- Matt points to the large amount of available labor: have agents aggressively look for issues, run the system, read performance traces and find slow database queries.
- Once you have the brakes, look for data sources to pass to agents. For example, give the agent CLI access to your bug tracker so issues are searchable and pullable.
- Build reusable cron jobs or triggers that pull work into coding-agent sessions.
- He especially prioritizes cron jobs that just improve the code base, because every later session benefits. People underestimate how much the code base steers output: "You think of agents.md as the place where you put all of your instructions, but actually your code base is kind of like a massive agents.md, but only code."

## One-way doors vs two-way doors for deciding what needs human review

- He borrows the AWS framing: a pull request is either a two-way door (easy to walk back) or a one-way door (never coming back, or very expensive to reverse).
- A one-way door need not be a complicated change. A small subject-line change in code that sends an email to 50,000 people is a one-way door.
- Some industries have more one-way doors. In legal or medical applications many decisions are one-way, which limits the velocity you can get from agents.
- His opinion: "every one-way door must be reviewed by a human", because an agent making that call could cause an extremely expensive mistake nobody accounted for.
- Software has many more two-way doors than fields like civil engineering, where a bridge built wrong is a one-way door. Thinking this way lets you prioritize reviews sensibly.

## Skills: they encode process, with leading words and a few docs

- Matt thinks of skills as process. When writing them he tries to find the best process for producing software and turn it into text. Books already hold these processes, so being able to call on the literal words is useful.
- With agents, domain-driven design has "a whole new life". The old problem was teaching people the process and converting a whole organization. Agents actually read what you give them.
- Instructing agents carries no social cost: "an infinite array of people who will do my bidding." He once wrote a custom lint rule to catch an annoying pattern of a colleague (his boss, who asked "Did you do that for me?"). Now he can do the same for agents.
- Most agent workflows share a common process: align with the agent before building, build, review, then a compounding step that improves the process for next time. Opinions differ mainly on documentation and structure around it.
- His own emphasis is alignment, domain language, and code review. He says Lauren's skills lean toward implementation, getting more from tests, and detailed playbooks. He believes a combination, such as grilling for alignment plus strong implementation, would work very well.
- The only docs he adds are a `glossary.md` and architectural decision records.
- What he steals from skills are "leading words": compressions that turn a large process into a few words. "Grill me relentlessly" is one that creates an emergent behavior in the agent. Discovering them is hard, but stealing them is easy.
- Agents repeat those words in their own thinking traces, which re-emphasizes them and leads the agent down a path.

## Effect, constraints, and stopping agents from cheating

- His premise is that agents need restrictions and flexibility around boundaries. The code base needs a certain shape to work well with agents, and Effect makes that shape "not only simple, but inevitable", as long as you don't let the agent cheat.
- He thinks people pitch Effect wrongly. The reason to adopt it is dependency injection, not error handling or type safety. It lets you build small modules you can swap out and gives nice-looking tests.
- His explanation of Effect:
  - It puts programs inside values, so a program sits idle until you execute it.
  - The type system knows everything that can go wrong with the program, everything it produces and everything it needs.
  - That gives the agent many feedback loops and a lot more information about the program.
- He sees three layers against cheating:
  1. Automated checks: lint rules that run on the implementer agent. Effect ships lint rules that hook into the TypeScript type system, plus unit tests.
  2. Automated review, which he thinks most people badly underuse. Telling an implementer "don't do X" makes it think about X. Giving X to a reviewer agent turns it into a positive instruction: look for X in the diff and excise it.
  3. Human review on top, as little as possible.
- He likes statelessness on purpose. Memory systems build up state that can include bad state. The implementer is "super overloaded" (explore, build, verify, debug). The reviewer is "incredibly underloaded", receiving a diff and reporting back, so you can load it with coding standards and give it a fresh context window.

## Strategic programming, taste, and the teach skill

- He splits programming into tactical (on the ground) and strategic (the long view). He hasn't found agents good at strategic programming and hasn't invested much in trying.
- He thinks they may be bad at it because the median human is too. The feedback loop is slow, and "you could change jobs before your strategic mistakes come back to bite you."
- If agents became good at strategic programming, the death spiral would become a virtuous circle. He doesn't know if that is possible now.
- He thinks agents can raise the floor of a product, but not reach a Linear-level of execution without taste and hard choices. He sees the application of taste as a differentiator.
- He says he wrote his teach skill in an hour and a half on the tube, getting all his ideas about teaching into one skill. People love it, and a video on it goes viral every couple of weeks. He uses it about once a week to ask questions or organize information in his brain in a new way.
