## Aesthetics as a signal of correctness

- DHH holds that "aesthetics is truth." When something is beautiful, it's likely to be correct, and he sees this in mathematics, physics and many other domains.
- He believes being surrounded by beautiful, well-functioning objects is a key part of human happiness. Laggy systems, touch interfaces that don't register and old COBOL systems that block simple tasks are a source of anxiety and "malaise for civilization."
- The aesthetic applies inside as well as outside. He says Steve Jobs cared about the inside of the box because people who care about the circuit board layout also sweat the user interface and the ergonomics of opening the case.
- Ruby is "the house I want to live in" because it produces the most beautiful code in his book while not being rigid about its ideology. He finds Smalltalk beautiful in its minimalism, but it is not where he wants to live.
- He wants programmers to see themselves as craftspeople who polish "until there are no splinters left."
- His favorite book on tactical programming patterns is Kent Beck's Smalltalk Best Practices (mid-1990s). He recommends it as the top book for structuring a method and a class.

## Why he went agent-first (and why his opinions did not change)

- DHH says his opinions did not change; the circumstances and facts did. He saw early that ChatGPT's launch was an obvious marker on the timeline.
- He disliked the early tools: autocomplete and Copilot-style completion in the editor kept interrupting a thought ("Was this what you meant?"). He gave a "tap tap tap" image of that future, tied to the Homer Simpson mechanical bird that hits Enter, and did not want to be the bird.
- What he did like in that period was ChatGPT as a tutor and pair programmer that doesn't drive: paste in code or an error and ask why it works or what is wrong.
- Two things changed his view:
  - Agent harnesses (Claude Code, which got traction over the summer and fall), where the AI has tools such as bash, the terminal and the internet.
  - Opus 4.5, released around late November, which he calls the inflection point. It was the first model that "continuously and consistently" shocked him with the quality of its analysis from vague input and its output. It produced code he wanted to merge with little or no alteration, and it remembered corrections.
- His bar is high: agent code must look as good as his own, or he won't merge it, just as he wouldn't merge a junior's sloppy work. Early models could not meet that.
- He thinks the winter break is when many developers had the same shock with side projects, then returned in January and started mandating the tools.
- He calls the you're left behind unless you know everything FOMO on X nonsense. You could pick it up in about three weeks, and you can skip steps. Instead of MCPs, you can go straight to CLIs and skills.
- Toby Lutke at Shopify saw this earlier than DHH and kept sending him examples. He finds it helpful to be near people whose gaze is further up the road.
- His advice to skeptics is to sit down with a harness (he names OpenCode) and a frontier model, start with Opus, and try one of your unfinished hobby projects.

## His current agent workflow

- Day to day he is "agent first on everything." In early November he was code-first and asked an AI for a second opinion when stuck. He now starts with the agent, reviews the draft, and edits if needed.
- Harnesses and models:
  - OpenCode is his main harness; he also uses Claude Code a little.
  - He is critical of Anthropic pulling subscription use from OpenCode and sees it as a mistake. He still says Opus is currently the best model and goes to it for hard problems.
  - He also uses Codex and Kimi K2.5.
- Layout in tmux, built into Omarchy: Neovim on the left. On the right, OpenCode running Kimi K2.5 on top and Opus in Claude Code below. A terminal strip sits at the bottom.
- Loop: he tells an agent what he wants, then jumps into Neovim and opens the lazygit diff with `space gg`. If it looks right, he commits. If not, he redirects the agent or edits the code himself.
- He does not call this being a project manager for agents. He compares it to stepping into a mech suit: "I don't just have two arms, I have 12." He has been hyper-accelerated as a programmer, with the same affinity for aesthetics when writing Ruby.
- For hard, risky changes he has Opus write a plan, then has Codex critique it, and ping-pongs the plan back and forth a couple of times before executing. He used this on dual-boot support for Omarchy (Linux next to Windows), where mistakes can corrupt partitions or boot records and where LUKS encryption on a partial drive is fiddly.
- Cheap exploration: he now gives vague, half-formed prompts to test a hunch and reverts if it isn't good, because 75 lines of code are no longer "precious." The cost of exploring a hunch has dropped "by a thousandfold."

## Agent-assisted PR review on Omarchy

- Before the Omarchy 3.4 release he had about 250 pending PRs. He gave Claude a review URL per PR and processed 100 PRs in about 90 minutes, which he says would have been a week's work or at least days.
- Outcome breakdown:
  - About 10% merged as-is.
  - About 20% merged using Claude's own implementation, because the contributor had found a real issue but hand-rolled code he didn't want to keep. He asked Claude to "clean room" it: right problem, done right, in his style.
  - About 25% he decided he didn't want.
  - About 25% Claude flagged as maybe something here but without a good implementation.
- Claude's analysis on at least half the PRs covered areas he knew nothing about, where it was a better reviewer than he could be. The PRs had sat because he would not have put in the effort to learn the area.
- Most of Omarchy is bash, but he notes bash still has a shape and he wants it coherent with the rest of the project. Opus matched that.
- Omarchy facts: it started as a summer project during downtime at the 24 Hours of Le Mans week. It is built on Arch and Hyprland, has about 400 code contributors in just over six months, and tens of thousands of daily-driver installs. 37signals now runs Linux on most technical machines because it has its own distro.

## Agents, CLIs and the Unix philosophy

- He installed OpenClaw on a VM and, with no tools, MCP or CLI, asked it to sign up for Fizzy. It asked for an email address, so he told it to sign up for Hey. It did both on its own. He then invited it to Basecamp, and it joined a project and introduced itself to the team. It took about seven minutes.
- He reads this as the end state: agents won't need accommodations or on-ramps. But he does not want to wait for AGI, so 37signals is building CLIs for Basecamp (releasing very soon), Hey, Fizzy and probably the legacy products.
- He sees the CLI as validating the Unix philosophy: small tools that interoperate through pipes. Basecamp, GitHub and Sentry can then be chained by an agent. His example: check errors in Sentry, write them up in Basecamp, open a GitHub PR, and comment back in Basecamp.
- Agents still need help. He says "we're not quite at AGI yet" and notes an agent-generated CLI is not right without human guidance. He is hand-tuning the Basecamp CLI.
- Token efficiency still matters for now. He argues Ruby on Rails is "one of the most token efficient ways of building web apps" and ideally suited to agent workflows, and that agents producing human-readable code still matters (he allows that may end).

## Small teams, designers, and how 37signals builds products

- 37signals was founded in 1999. DHH joined in 2001, Basecamp was built from 2003 and released in 2004, and the company went full-time on software around a year later. Basecamp remains the biggest and best idea they have had. Hey launched in 2020 after almost two years of work and millions of dollars of R&D.
- Hey's screener: nothing reaches your inbox until you give a sender a thumbs up. A thumbs down means you never hear from them again. He says it keeps email from being a chore and removes sales drip campaigns. The screener takes a short daily pass.
- His method for major products: start with a tiny team, often one programmer and one or two designers. They find the shape and architecture first. Once something clicks, they add a few more people, and in the last ~20% everyone piles in. He says pouring people into an uncertain direction makes you slower, and "if you don't know what you want a million people is not going to build it for you."
- Designers at 37signals are not there to make a spec look pretty. They find what the spec should be, act as product managers, and also write the CSS and HTML and dabble in JavaScript and Ruby. He argues that knowing your material makes work cut "along the grain." He compares it to a jeweler knowing gold or an architect knowing load-bearing structures.
- He points to Apple's decline in native Mac craft as the same loss. Native apps now feel "synthetic" instead of "authentic." He thinks Electron gets too much hate; the problem is bad implementations, and it is just the web in a box.
- Agent acceleration is empowering designers to do the whole thing. He expects the industry to move toward 37signals' stance: smaller teams where one person builds something valuable, because communication costs shrink. He recalls that people said Basecamp with one programmer would be a toy.
- Team size: about 60 people, roughly 20 programmers, about 10 designers, 14 in customer support, 10 on operations running servers, plus HR and finance.
- Shape Up's two-month cycles no longer make sense at this pace, and he says no company has rewritten those scripts yet.

## What agents do to productivity, seniority and hiring

- The pie is exploding: work that would never have been started is now done. His example is Jeremy's "P1" project, which optimized the fastest 1% of requests. It took the floor from about 4 ms to under 0.5 ms (a 10x gain) across about 12 PRs and 2,500 lines of code over a couple of days, as a side effort.
- On his team the same people can do much more. They already had headroom, so he plans to plow the extra capacity into more and more ambitious work, not cut staff.
- Senior vs junior:
  - Most successful agent acceleration at 37signals has come from the most senior people, who can judge whether output is safe to ship to millions of users and can run many agents in parallel.
  - He cites Amazon's reported internal conclusion that junior programmers can no longer ship agent-generated code without review, and says juniors' roles are more tenuous than six to nine months ago.
  - A 5x to 10x senior's hour is worth far more, so the trade-off between spending it with agents or teaching a junior has changed. He says it is not clear how this plays out.
- His bet is that agents eventually stop making mistakes, as self-driving did. He cites Tesla FSD going from version 13.1 to 14.2 in about 18 months. He also notes Musk's 2017 claim relied on handcoded C++ and a different approach than today's AI.
- He thinks "peak programmer" has probably passed in terms of the number needed for the same work, even though more software than ever will be produced (Jevons paradox does not rescue every programmer). Cost centers, where software is not the product, will face the most pressure.
- Value moves to figuring out what to build and for whom. He used to have a low opinion of product management, partly because implementation was the constraint. That is flipping. He says "you have to be John Carmack levels of good" to just sit and code, and you must beat what agents offer off the shelf.
- He is cautious about timing predictions and advises not planning life around a 12-month forecast. He also says he can't rule out implementation being solved by next summer.

## Hiring at 37signals and career advice

- They have looked at tens of thousands of candidates and hired roughly 100 programmers over the company's life. He thinks the batting average is only slightly better than 50/50, even after a long process. He cites a Google paper concluding they could not predict employee outcomes from GPA, Ivy League background or LeetCode.
- Process: they discard roughly half to two-thirds of applications up front (people not addressing the job or ignoring instructions). About 20 people get a take-home test, which he defends and says is not free labor, and that the submission is not used. He says the odds are not a lottery and not equally distributed; he is often surprised how little effort most submissions put into being presentable.
- He says long-term success has been higher from people the team had worked with for two years than from open calls. Warm referral is the best path.
- His advice: be as good as you can and put in effort, even at a place you think is bad. People who worked next to you remember whether you showed up and learned. He calls the my workplace isn't worthy of my best idea cope.
- He says the 2010s notion that you can be a great programmer without caring about computers outside work hours is over, if it was ever true. He works a roughly 40-hour rolling average at 37signals but plays with computers in his free time. He expects reference checks to become more important.

## Staying sane and why he keeps building

- He is enjoying programming more than at any time since early 2000s when he discovered Ruby ("I just discovered Ruby feel"), and sees the same in the most AI-forward programmers at 37signals.
- The risk is overwork: he says the dopamine loop from shipping is hyperactive, and the people furthest along are working harder than ever. His reminder to himself is that this is "not a limited sale" and AI will be here next month.
- His health rules:
  - He gets eight hours of sleep and doesn't use an alarm, and calls cutting sleep "such a poor trade."
  - Don't trade away exercise or diet for more agent work; it doesn't help even over three weeks.
- His drive is a love of computers. He says wealth as a "checkpoint" followed by leisure is misery, and that selling a business typically leads to three weeks on a beach and then back in the game. He is also trying not to open X first thing in the morning.
