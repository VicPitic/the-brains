## Communication is the core skill when working with agents

- Matt argues that people underestimate the communication gap between a human and an agent. However smart the model, it "doesn't know precisely what you want" and doesn't know what you care about, so you must tell it every time.
- He says the best way to get good work from agents is to tell them what you care about.
- Agents also perform better in a good environment. In a "garbage vibe-coded crappy code base", the result is "garbage in, garbage out."
- His thought experiment: if he ran a coding organization with 100 human coders, how would he raise the floor so the worst coder performs better? The answer is decades-old practice: good tests, and checks that stop classes of bugs and prevent mistakes. He says books on this "feel like they were written last week."
- He says the top developers he has seen are all incredibly good communicators. Their code changes come with detailed, easy-to-read reports, so "the clarity of their thinking ends up in the product they create."
- Weak communicators get worse results because they can't tell the agent what they want or what is wrong.
- The quality of your thinking and language matters when talking to the client and when telling the agent what the client wants.
- He expects models and harnesses to improve but never to "read your mind", so some process layer will always be needed to bridge the communication barrier.

## Grill Me and unknown unknowns

- "Grill me" is one of his most commonly used skills. It tells the agent to interview him relentlessly about what they're building.
- It works because it pulls out more context about what he cares about and surfaces unknown unknowns.
- He defines the key skill as being "aware of unknown unknowns": knowing you could be missing things in your design and not trusting that your design is complete.
- Examples of things people forget to mention: security, how the thing is deployed.
- If the agent isn't told, it either makes things up or assumes an unmentioned thing isn't important, and you get something different from what you imagined.
- He cites The Pragmatic Programmer: "no one knows exactly what they want."
- He says turning an idea into code exposes weaknesses in the design. Some of these only become clear once you reach code, because it is a translation from a fuzzy human brain into executable statements.
- He sees no divide between a regular person and a coder here. A normal person talking to a developer faces the same barrier as a person talking to an agent.

## Ubiquitous language and Grill with Docs

- Matt recommends domain-driven design (DDD) for building with agents. Its core idea is a ubiquitous language.
- The terms in the code should match the terms developers use, the terms the client uses to ask for the product, and the terms users see. His example is "order": it should mean the same thing in the code, the database, the UI and the conversation with the client.
- Iterating on that language, and keeping it precise, aligns you with what the client wants and what you're actually building.
- "Grill with Docs" is his modified version of Grill Me. It builds this domain language as the interview goes.
- He admits he's "shilling DDD" and that most coders haven't heard of it, but says he's found it "extraordinary for building with agents."

## Why spec-driven development failed for him

- Matt's war story: he saw a talk at an AI engineering event arguing "specs are the new code". The idea is to write a very detailed specification and have an agent turn it into code.
- He tried spec-driven development for months on his pride-and-joy repo, a custom video editor (a bit like Descript) with AI writing and thumbnail design.
- He kept wanting to look at the code, and saw it "getting worse and worse and worse," with the agent producing worse results.
- He kept trying because the speaker was from OpenAI and he assumed they knew what they were talking about. It still didn't work.
- His conclusion was to ditch the specs and focus on the code. Code is the environment the agent operates in, and a dog sitting in a burning house won't behave well.
- He defines a good code base as one that is easy to change: a change won't break something the agent didn't think about, and everything is easy to modify.

## Environment beats model choice, and how he runs agents

- He uses Claude Code with Opus 5.5 at medium effort, and is considering going lower. He calls this a hot take: he thinks most people run effort levels too high.
- Lower effort gives better token efficiency and faster replies. Since he has "raised the floor" on his agents, they don't need to work hard. They write code that passes the tests, and the tests catch mistakes.
- He doesn't try lots of models and harnesses, and says "I just don't care that much about the harness." He treats agents as employees in his company and wants the company's baseline to be as good as possible.
- His biggest recent gain came from fixing a complicated project (the video editor, which depends on OBS running locally) so an agent could use the browser, click through the app, take screenshots and run it properly. He says this raised output quality massively, and that he could get just as good a result with Opus 4.5 and that setup.
- Nate's point, which Matt agrees with: someone who communicates well with an old model can beat someone who doesn't with the newest one.
- His output: about four agents on long-term tasks at once. He is trying a "chief of staff" skill that manages sub-agents, and says it is like a team of eight developers.
- His GitHub shows around 200-300 commits a day, where "20 a day would have been a good day" before.
- He calls Opus 4.5 and the OpenClaw-era releases in December 2025 the threshold where he decided he would never write a line of code himself again. Before that he was a skeptic with about 10 years of coding experience, 8 of them professional.

## Learning with agents and the /teach skill

- Matt says to be skeptical of anything anyone tells you, including agents. He was a skeptic of AI for a long time.
- His teach skill fetches high-trust primary sources and breaks them down with quotes and attribution, linking to exactly where each claim comes from.
- Hallucinations have dropped a lot but still happen.
- He mostly uses teach sessions to get introduced to a topic, then reads the primary source himself. The session gives him the language to interpret it.

## Opportunities and a path for newcomers

- Matt sees massive opportunity in taking agents and working out processes for knowledge work, then bringing those to organizations. Every organization does things slightly differently, and he says this is a skill that's "really hard."
- Agents are good at code and math because both are easy to verify. Real-world work is harder to verify, and it took him a long time and many processes to find something he's happy with for his own day-to-day work.
- He rejects the idea that agents have no learning curve. The curve is still there, partly hidden. The things to learn: what you can trust from an agent, how to organize agents, how to control and design the information they receive, and how to turn their work into reusable processes and your processes into something agents can follow.
- He also sees teaching demand, because organizations resist adopting this.
- On pitching clients, he has no concrete advice since he hasn't bid for roles. He thinks people want someone who understands what they care about. Vibe-coding a prototype that shows you understand their business can help, since it shows real acumen quickly. He also jokes that if speed unsettles people, "charge them for 5 days."
- His starter path for beginners:
  - Download his skills and pick any harness (Claude Code, Codex, GitHub Copilot); don't overthink the choice.
  - Start in an empty folder, use VS Code so you can look inside the code, and have a real idea you want to build.
  - Watch the agent "like a hawk" and learn to brake before you accelerate.
  - "Climb the trust ladder": only then add a second agent, write skills, and connect Slack, Gmail or Twitter.
  - He has an agent that triages a to-do list he dictates from his watch.
- He disagrees with the advice to give models your most ambitious tasks. He says to give them menial, boring work where output is easy to check and correct, such as drafting replies. He uses Opus 5.5 to write first drafts of his written content.

## What he is excited about next

- Software factories: automating the start of work and improving code bases over time. He wants agents to become "that annoying developer who's always on the team" who says to do it the right way, not the fast way, for the benefit of those who come after.
- He thinks agents are currently bad at thinking long-term about a code base, and that this can be fixed.
- He says nobody has found the right way to organize lots of agents yet.
- He's also excited about open models, and expects one as good as Opus 5.5 would delight him.
- He describes himself as a teacher, not a pundit, based in Oxfordshire. He declines most offers to preview things and wants to "make it work now."
