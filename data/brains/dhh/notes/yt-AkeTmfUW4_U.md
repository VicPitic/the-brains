## DHH on why AI agents changed his mind in late 2025

- DHH says AI "really changed in the later half of 2025". Models kept improving, but the key shift was giving them more power in development.
- He moved from autocomplete-in-the-editor AI to terminal agents. In agent mode they run on their own from a plan, use the terminal, run bash commands, run code, and look things up on the web.
- He disliked the autocomplete mode: "Can you shut up for a second and just let me type the damn thought out of my head?" It interfered with how he works. He prefers a text editor to a heavy IDE and likes typing code by hand.
- He re-tested AI every month or at each model drop through early 2025. He saw promise but found it "not actually helping me", and he did not want to keep the work it produced.
- By the second half of 2025, agents were helpful enough that he wanted to keep the majority of what they produced.
- He writes that agents work "alongside you, not sort of on top of you". That change in feel mattered as much as the capability jump.

## How much of an agent's output he keeps

- He often gets agent output that is "like 80% there".
- Sometimes he gets the last 20% by iterating with the agent. More often he jumps in and does it himself.
- His view is that if an agent does 80% of a problem, that is amazing. Even 20% is still amazing, as long as it isn't padded with junk that takes longer to pull out.
- He sometimes throws out the agent's solution and rewrites it from scratch, but the draft still gives him the blueprint of where to go.
- The ratio of makes a mess to solves it or gives a useful draft is shifting fast. Not every run is good: after a great result he has asked for something simple and gotten a mess.
- He wrote a post about "promoting" AI agents, with a double meaning. He recommends developers and designers working in code try agents, and he personally "promoted" the AI he uses from a text box he asked questions to into a worker whose output he can keep.

## Using agents on toil at 37signals

Jeremy pioneered putting agents on programmer toil that is important but not exciting.

- **HackerOne security reports:** External researchers submit findings for bounties, which DHH says go up to $5,000 or possibly more for catastrophic finds. About 90% of reports are low quality ("sludge"), from humans or weak AI.
  - The agent gets the history of past reports and a score of the submitter, such as whether they have submitted nonsense before.
  - It pre-reviews each report so the team spends time on high-value ones. He compares it to spam detection applied to low signal rather than spam.
  - He says AI is "really good at filtering noise from signal".
- **Console access reviews:** Every two weeks they review the logs of programmers' access to production systems and data during customer investigations. The goal is to make sure no one accesses data beyond what customers have permitted.
  - Early reviews found sloppy habits, such as accessing too much data at once, which were fixed.
  - Recent reports typically find that all accesses, such as "42 accesses to personal information", were vetted and within jurisdiction.
  - He notes AI is "perfectly patient" doing the same check repeatedly and can be trained to spot the aberration.
- **On-call and performance investigations:** The agent is given access to logs, the exception system, and performance monitoring and asked what is going on. He says it pulls data and runs queries and sometimes comes up with the answer in a way that is "damn impressive".

## Why 37signals held off on shipping AI in its products

- Early experiments to put AI into the product, around search, commands, and autocompletion, never felt like a slam dunk.
- DHH says launching them would risk being called AI slop: a sticker on the product that isn't uniformly better.
- He doesn't mind being late, because when 37signals ships it wants the result to be useful.
- Experience with agents over the last three or four months of 2025 gave the team renewed zeal to find places where AI delivers an unequivocally positive impact in the product.
- He is excited about one idea around Basecamp but won't give details, since "we may not launch it either".

## Peak experiences: debugging and multi-model drafts

- **Debugging a Rails bug:** A bug in the latest Rails produced a weird artifact when opening a Rails console. He didn't want to dive in, so he handed it to Claude's Opus 4.5.
  - The agent pulled out a C debugger and attached it to the process, which he didn't expect.
  - Its first couple of hypotheses didn't pan out, but it kept going and pinpointed the problem and the commit where things went wrong.
  - It produced a patch he could drop into the Basecamp codebase as a workaround until Rails core is fixed.
  - He says he wouldn't have invested that time right then and would have worked around the bug.
  - He enjoys seeing the visible reasoning of the thinking models, whether or not it reflects what's happening underneath: "The show is spectacular."
- **Five drafts of an MCP connector:** He wanted to look at the MCP standard (which he says now "seems like maybe it's kind of fading") and see how to build it the Rails way.
  - He used OpenCode, a terminal UI that lets him use models from all providers at once, including Claude, Gemini, OpenAI's Codex, and open-weight models. It was just added to the default setup (Omarchy context implied, not stated).
  - He got five drafts from five different models with a loosely specified task: a connector with three tools, authenticated with a bearer token. Each ran about 2.5 to 6 minutes.
  - All five produced working solutions using the existing tests, which shocked him. He kept none, because he wanted to focus on the fluidity of the interface, but several had good ideas he hadn't thought of.
  - Combining them with his own work was much faster. He got to running software and hooked it to his MCP debugger to see hello world come back.
- He ranks this up there with his top computer experiences, comparable to playing Yie Ar Kung-Fu on a Commodore 64 at age five and publishing his first web page in ninth grade.

## Experts versus non-programmers, and the innovator's dilemma

- DHH says non-programmers can get more out of AI than he can. Everything he asks AI to do is something he could do himself given enough time, whereas non-programmers get something they truly couldn't have built.
- He compares this to Excel and FileMaker Pro, which let non-programmers build programs for business tasks they couldn't afford or had no access to professional programmers to do. He notes Jason started in software with FileMaker Pro.
- He grants that AI-built software can be insecure or leaky, and says he'd hesitate to put his personal data into some of it. But he argues not everything is as critical as "a pacemaker or a bank".
  - Many programs sit at the low end of the "criticality ladder", where even catastrophic failure costs little and the upside of the program existing is worth it.
- He invokes the innovator's dilemma. Every disruptive technology starts out feeble, a toy that can't do top-end work, and then grows into it. Today's AI output needs supervision, but so what.

## His stance on AI hype and doom

- He refuses to extrapolate. "Nobody knows where this is going", including whether LLMs are near the top of the curve, or whether AGI is five minutes or ten years away.
- He asks people to focus on how good AI is right now and what an achievement of mankind it is.
- He notes how fast image generation went from Midjourney v1 with seven fingers and mutant faces to hyperrealistic images in about two and a half to three years.
- He chooses optimism, hoping the new capabilities do more good than harm. He says it is easy to imagine the worst, since sci-fi has depicted it for 50 years, and he cites HAL 9000 in 2001: A Space Odyssey.
- His advice: unless you work at DARPA, the Pentagon, or a research lab, don't spend your time worrying about the end of the world. People worried about nuclear war in 1964 and it didn't happen. Be optimistic and enjoy the time you have.
- He says he goes to bed thinking "holy [expletive] this is amazing" and wakes up genuinely curious where it goes.
