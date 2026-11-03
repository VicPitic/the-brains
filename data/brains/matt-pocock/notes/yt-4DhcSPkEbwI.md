## Why Matt moved from TypeScript courses to AI skills

- Matt was a voice coach for six years (singing, accents, Shakespeare, public speaking for consulting firms) before becoming a developer around 2017. He left coaching because doing it well meant living in London, which he hated.
- He taught himself JavaScript by building tools for his own lessons, including a web audio spectrogram analyzer for voice resonance. He says it ran terribly but made his lessons better.
- His coaching background gave him an unusual edge: little technical knowledge at first, but the ability to explain it. He rose quickly through agencies.
- At an agency building a learning management system for a car maker, TypeScript fixed a slow front-end team whose backend (in Portugal) kept changing contracts without telling them. He says velocity "just went" up and the team outpaced the backend.
- He joined the XState core team, then the Stately company, then Vercel (under Jared Palmer), where he stayed about 3 months on a 3-days-a-week contract while testing his own idea.
- Two-minute advanced TypeScript tips on Twitter took him from about 4,000 to 10,000 followers. Total TypeScript, built with Joel Hooks, reached seven figures within a couple of years of its early-2023 launch.
- His business model: sell products, offer a generous refund policy, avoid sponsored content, and aim for a lifestyle where he spends most of his time with family. He tries never to work weekends and dislikes "996" culture.
- Total TypeScript revenue has fallen with AI. His framing: AI made knowledge cheap, but wisdom is no easier to learn. He moved from courses on putting AI into apps to teaching how to work with agents.

## Tactical vs strategic programming in the AI age

- Matt, borrowing John Ousterhout's distinction, says AI has largely eaten tactical programming (syntax, knowledge) and it is up to developers to handle strategic programming (long-term design).
- He thinks of strategic programming as a huge mixing desk with sliders (more microservices vs a monolith), where you can't hear the mistakes until about 9 months later.
- His view is that AI speeds up that feedback loop, so strategic mistakes now come back faster. He says "your code is the environment the agent operates in" and should keep improving it.
- He argues the strategic layer is more valuable than ever because of the leverage it gives. He is skeptical of hiring juniors and treating them as agents until their mistakes surface (the advice Uncle Bob gave him), calling it a waste of money.
- Spec-driven development ("English is the hot new programming language") disappointed him: each edit-the-spec, regenerate loop made the code worse. The agent gets bad signal from a bad test suite, just as a human would.
- Software entropy, from The Pragmatic Programmer, is his lens: agents produce entropy faster than ever. Tech debt is anything that makes the codebase harder to change, and agents make it easy to produce even in tiny codebases.

## Smart zone, dumb zone, and why work is split across sessions

- Matt credits Dex Horthy's idea of a smart zone and a dumb zone. Every token competes for attention, so more context degrades the model's grasp of the important parts.
- He puts the smart zone at roughly the first 150,000 tokens, regardless of the model's total context window size.
- Ralph loops fit this: give a goal, do the smallest change toward it, clear context, repeat. Only a little state persists in the filesystem and environment, not in the model.
- His take on his agent-app experience: building apps with agents taught him to think about data flow (where state lives, its shape, how to compact or clear it), which made harnesses feel familiar. He compares loops to finite state machines, like his XState work.
- His workflow separates a destination document (a spec declaring when you've arrived) from tickets, one per session. A grilling session becomes a spec, which becomes 30 to 40 tickets run by an implement loop.
- He likes a "day shift / night shift" model: plan during the day, let agents work AFK overnight, review clean code in the morning. He wants chunks of planning plus chunks of review rather than constant terminal-switching.

## The grill-me skill and aligning with the agent

- Grill-me is a very small skill that tells the agent to interview you relentlessly about a topic. Matt says it has "this weird emergent behavior where the models start thinking a little bit outside the box" and throws ideas at you. He got the idea from Tariq of the Claude Code team.
- Why it works: there is a communication gap between you and the agent. It "can't read your mind," so left to itself it produces something misaligned with your values. Grilling establishes what is in scope, what is out, and what you consider important.
- Grilling makes you decide while also reminding you of things you hadn't considered. Matt says it felt like discussions with a very senior engineer, such as Andarist at XState.
- Choosing when to grill:
  - Small change (a five-line fix, moving a button): don't grill, align afterwards ("shift right").
  - Fits a single session: grill-me.
  - Spans multiple sessions: wayfinder.
- Example of a no-grill flow: a feedback button in his video editor files a GitHub issue, an implement agent picks it up, a review agent checks it, and he aligns at the end.
- On the "this is waterfall" criticism, he says he does heavy, aggressive prototyping before writing a spec. Agents make prototypes cheapest ever (build 3 or 4 versions and pick one). He sees the agentic setup as closer to agile, though he doesn't mind waterfall as a cautionary tale.

## Wayfinder: planning work larger than one context window

- Wayfinder exists because some grilling can't fit in 150k tokens (his example: "build me a Stripe clone").
- Its central object is a map: the shared reference for all decisions, with milestones and a "fog of war" that opens as sessions resolve questions. He describes it as a directed acyclic graph walked toward a destination.
- Each session works one ticket on the map. Tickets can be grilling, prototyping, research, or arbitrary tasks like provisioning infrastructure.
- He has had maps of 50 to 100 tickets, and uses it for non-engineering work too: course planning and building a garden office.
- He notes that agents work well in software because inputs and outputs are all text (code, docs, test results, type checks, lint). Anything non-textual, like animation feel, they handle poorly, so he tries to make his services agent-accessible and text-based.

## Leading words from classic books

- Matt's discovery: reading The Pragmatic Programmer, he realized its ideas were probably in the agents' priors. Using its phrases in prompts changed behavior, and the agent started saying them back (e.g. "I'll turn this into a tracer bullet").
- He calls these leading words. You repeat a simple phrase in a skill or prompt to steer the agent.
- Tracer bullets: get feedback quickly by building a thin path that works end to end. This fixes agents (even in Ralph loops) that build the whole database layer, then the whole app layer, then the whole component library, and only integrate at the end. The related idea is vertical slices instead of horizontal slices across layers.
- From John Ousterhout's A Philosophy of Software Design, he took "deep modules".
- From Eric Evans' Domain-Driven Design, he took ubiquitous language. He built a "grill with docs" skill (which he admits is badly named) that builds a domain language while you ideate, and a domain modeling skill.
- Example: in his course app, converting a ghost lesson inside a ghost section inside a ghost course into a real one triggers what he calls the "materialization cascade", a term he and the agent coined. A shared term replaces many words, and the agent can grep for it in code.
- His framing: agents are like the character in Memento, waking up fresh every session, so optimize the codebase for a new starter. Humans can work around a bad codebase by building memory; agents can't.
- His reading list: The Pragmatic Programmer, A Philosophy of Software Design, and roughly the first three chapters of DDD.

## Testing, tech debt and review

- TDD optimizes for small working memory, which agents don't need as much as humans. What agents do need is feedback loops, and a failing test first is hard for them to cheat.
- Even without strict TDD, he asks agents to "provide proof that your change does the thing" and give TDD evidence that it would fail without the change.
- His warning: agents often write tautological tests that just assert the implementation (e.g. write a constant, then expect it to equal that value).
- He uses an implement agent followed by an automated review agent that enforces coding standards and flags tautological tests. He asks how you know the reviewer is good, and says you must stay in a constant battle against tech debt.
- On Jared Friedman's tweet that tech debt is no longer something you have to live with, Matt's reply was "now you can live with it even in a tiny code base".
- He also runs a morning loop that executes an "improve codebase architecture" skill and proposes an improvement, which he can turn into tickets with a button.

## Organizations, cloud agents and gardening

- For orgs, he says the first step is observability over agents: their success and failure rates, with someone responsible for analyzing it and spreading lessons from the best repos. Teams need a shared set of skills and workflow, and an experimental mindset (A/B test processes).
- He suggests spending something like 20% of time on "the factory that builds your software", and says no one will be upset if you report you also did it.
- He is moving off a local dev setup toward a remote box he reaches through Discord, Slack or Linear, with schedules and a morning standup with his agent. He argues a shared space is needed for collaborative grilling. He concedes front-end work is the exception, because of the feedback loop.
- On gardening, he says "the only thing your team needs are gardeners" and "we are our agents platform team", building the environment for agents to succeed.
- His advice for juniors: use agents as much as possible, stay curious, and be introspective about your own process. He calls the key skill introspection: turning your process into something an AI can work with.
