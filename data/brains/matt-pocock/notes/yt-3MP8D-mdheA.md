## Deep vs shallow modules: the vocabulary Matt uses to talk architecture with AI

- Matt's thesis: AI has "simply accelerated software entropy". Codebases fall apart faster because every change that ignores the whole codebase adds small, weird things that make the code harder to change. Over time this snowballs into "a huge ball of mud".
- He sees this video as the cure. An earlier video on deep modules covered prevention.
- The tool is his improved codebase architecture skill, part of his GitHub skills repo (about 41.5k stars at the time).
- He added a glossary of terms to the skill. A shared vocabulary with the AI lets you be more precise about what you ask for. He says understanding these terms deeply makes you a better developer.

## Core terms: module, interface, implementation

- **Module**: a unit of something in the app. It could be React components forming a page, the functions that handle authentication, or the logger.
- **Interface**: everything a caller must know to use the module correctly. For auth, that is the sign-in and sign-out methods. It also includes less obvious information such as documentation on how to call the module.
- **Implementation**: what is inside the module, i.e. what it does when you call sign-in or sign-out.
- In a good codebase, modules talk to each other via their interfaces.

## Deep vs shallow modules, depth, and leverage

- A **deep module** hides lots of implementation behind a simple interface. A **shallow module** has a complex interface with little implementation behind it.
- The idea comes from John Ousterhout's *A Philosophy of Software Design*, which Matt recommends.
- Deep modules are better because they hide more information. The caller only learns a tiny interface to get a lot of behavior.
- **Depth** is "the amount of behavior a caller can exercise per unit of interface that they have to learn".
- Matt cites well-known open-source libraries like TanStack Query as having deep modules, hiding a lot of complexity behind a simple interface.
- **Leverage** is the benefit for users of a module: more capability per unit of interface learned. The deeper the module, the more leverage.

## Seams, adapters, and locality

- **Seam**: the location where a module's interface lives in the app, between dependent modules. Seams are usually where you do unit or integration testing. To test a module in isolation, you put a mock at its seam.
- **Adapter** (borrowed from hexagonal architecture): the concrete thing that satisfies the interface at a seam.
- Example: an app that depends on a clock. The seam is the clock interface. A real-clock adapter is used in production. A fake-clock adapter is used in tests, so you don't wait 2 weeks for a test to finish.
- Deciding where seams live is "crucial to getting a good architecture".
- **Locality** is the benefit for maintainers. Changes, bugs and fixes concentrate in one place, the deep module. If they are scattered across modules, locality is low.
- You want high locality: co-locate things that matter and often change together.
- Matt names leverage and locality as the two attributes the skill aims at.

## What a bad codebase looks like

- A bad codebase is usually one with many shallow modules, poor leverage, or poor locality, where logic is spread across many places.
- Matt says "legacy codebase" really means a bad codebase, one that is hard to change.

## Running the skill on a real codebase

- Target: Matt's course video manager repo, the software he uses to record videos. It has about 1,500 commits, uses React Router and effect.ts, and he wouldn't call it a ball of mud, but wouldn't call it perfect either.
- Steps:
  1. Open a new Claude session and run the improved codebase architecture skill.
  2. Turn off auto mode, which he says behaves oddly with human-in-the-loop flows.
  3. The skill explores the codebase first, then returns candidates for deepening. It found six.
  4. Pick one candidate.
- The candidate he picked: a concept implemented twice, once in the frontend and once in the backend, with no single seam and no tests at it. The two parallel implementations could drift out of sync.
- Refactoring it into one module would gain locality, with the clip and clip-section ordering rule living in one place.
- After a pick, the skill shows concrete code on both sides and enters a "grilling session". You discuss the proposed solution and it proposes a module shape.
- In a normal workflow, Matt would answer each question thoughtfully. For the video he asked it to use its recommended answers to speed things up.
- It then proposed a module shape, asked to verify one implementation detail, and sketched the actual TypeScript interface, i.e. which functions form the module's interface. It also raised design decisions for his feedback.
- Finally you can turn the result into a GitHub issue (via the skill's PRD or issues options) for an AFK agent to pick up. He points to his Sandcastle video for that.

## Strategic vs tactical programming: the human stays in the loop

- The skill is not AFK. It "demands" judgment from the user, who can't just run it and rely on it to keep improving the codebase.
- Matt's framing: agents are "really, really good tactical programmers" who make changes quickly on the ground. They need a strategic programmer above them.
- The skill is the sergeant that scouts for improvement opportunities. The human is the general who decides what is good for the long-term health of the codebase.
- Cadence: run it "every couple of days", especially on fast-moving codebases, because there will be many deepening opportunities.

## Deep modules, testing, and legacy codebases

- Clear seams let you write good tests around deep modules. Better tests lead to better agent output.
- For using AI in a legacy codebase, Matt says you first need a harness so changes don't break things. That means tests around deep modules with leverage and locality.
- His recommended starting point: run the improved codebase architecture skill.
- He is building a documentation site for the skills. For now there is a newsletter with updates, tips and resources for getting the most from agents.
