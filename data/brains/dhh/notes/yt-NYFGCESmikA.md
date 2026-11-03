## AI as a step change: Opus 4.5 to agents that pick the route

- DHH says his view changed in emotion and practice, not in principle. A year earlier he disliked autocomplete and chatbot-style AI, though he liked chat as a tutor and lookup tool. His feeling now is "100% pure unadulterated joy and optimism and amazement."
- He dates the break to Opus 4.5 in late November 2025. He tried it around the 26th and found the output "uncannily close to what I would have written." He credits the agent harness more than raw intelligence: using tools, checking its own work, and producing real output.
- Early 2026 brought sub-agents. These split a task across parallel workers, so work took a fraction of the time. He still had to drive, specifying what he wanted and auditing the result.
- By summer 2026 (Opus 5, Fable, GPT Sol), he says he describes a problem or a fuzzy idea and the model picks the route. He compares this to GPS: early GPS had people driving into harbors, and now it is trusted.
- He says that unless you can see this, you are not recognizing the gravity of the moment. In his view the real "psychosis" is believing the world is barely different. He quotes the line "decades where nothing happens and weeks where decades happen."

## Where agents work best: Omarchy at 100%, Basecamp harder

- On Omarchy "Quattro" (shipped late August 2026) he wrote none of the shipped code by hand over roughly the last two months. He reviewed the shape of everything and the individual lines of anything critical in the model layer. He skipped much of the UI and auxiliary code.
- He calls this the black box experiment. His Typora replacement, "Omarkdown" (his name for it, a C++/Qt app), was built in about 20 minutes. He stopped using Typora within two days and has written all his essays in it since. He never looked at its C++.
- Basecamp 5 was the first 37signals product accelerated by agents, and it was harder:
  - Designers vibe-coded features around February.
  - Individually acceptable PRs, taken together, "destroyed the architecture."
  - The team had to mop it up by hand to get back to a coherent system.
- His take is that vibe coding on an existing, substantial codebase still requires a programmer if you want to keep the architecture. He adds that the average human programmer's output is also slop, with 3,000 humans through a codebase making it awful.
- He gives three reasons large established products have not visibly sped up:
  - The bottleneck is human bandwidth and communication, not implementation.
  - Many orgs are bottlenecked on ideas, vision and taste, not implementation capacity.
  - It has only been about six months. Microsoft had endless programmers for decades and still shipped mediocre software.
- To get the 10x to 100x gain, he says you must interact with agents directly, because a human intermediary is "too slow."
- He sees the innovator's dilemma at work. Big companies are tuned for a world that no longer exists, so new entrants and individuals win. His example is rewriting your own 5% of Photoshop or Premiere. He says everyone uses a different 5% of Office, and "what if we all just built our own 5%."

## Specification, taste and prompting: stay vague, then interact

- He argues that being a programmer can be a handicap in the agent era. Prescribing the path made sense in the first agentic moment. Describing the outcome or problem now beats prescribing a solution.
- Many programmers are poor product managers, and he says "software is product management": what it should do, for whom, how it looks, what version one includes.
- On `AGENTS.md` and `CLAUDE.md`, he cites Boris at Anthropic: the system prompt for Opus 5 shrank by about 80%. Overly prescriptive humans actively damage the output, and he compares it to a pointy-haired boss telling programmers how to code.
- He ties this to the Agile Manifesto. People do not know what they want until they receive it, so "be as vague as you can to manifest something, then interact with the something."
- Humans are good at snap judgments. Give them three options and they pick quickly. They fall off a cliff with 22 options.
- He likes using ambiguity deliberately, as in poetry. Over-specifying makes the model follow instructions too literally. He says "if there is one programming language more beautiful than Ruby, it is the English language."
- He embraces non-determinism. The same prompt will not give the same result twice, and he finds that part of the appeal. He also sees his own writing as resembling next-token prediction with some temperature.

## Craft, code quality and what still matters

- In Ruby he still sweats the details, but he thinks the economic payoff is "diminishing rapidly." The case for beautiful code was that humans would modify it. He calls it an open question how much that matters now.
- It still matters for the moment because tokens are scarce. A coherent architecture lets agents make the next change as cheaply as the last. Without it you get a ball of mud.
- He uses a Commodore 64 analogy: a programmer from that era teleported to 2026 would have heuristics that no longer apply.
- He is not sad about losing hand-chiseled code. He wrote it for 25 years, he does not romanticize it, and he compares the nostalgia to people who still ride horses for pleasure. He notes people still write new Game Boy games for the love of the constraints, and he mentions the Analogue/Chromatic Tetris reimplementation.
- He frames his own transition through programming having never been about `if` statements: "I became a programmer because I wanted programs." AI returned him to that.
- Agents' bash is now very good. His one complaint is early exits (precondition-or-exit chains) instead of fully expanded conditionals, which he corrects each time.
- He still acts as an editor on code shape:
  - He looks at proportions and complexity.
  - He says "it looks a little too complicated," and the agent usually simplifies. He sees this as human intuition still being needed, and compares his role to a master like da Vinci directing a studio of students.
  - Agents will say work is done, a second agent will agree, and a human nudge toward simplicity still halves the code.

## Workflow, tooling and model comparisons

- His setup is shifting from single-threaded flow to parallel work:
  - Terminal-first, running agents in tmux-style panes, then a tool he calls "Herder" (tmux plus agent notifications).
  - Tailscale and GL.iNet Comet KVMs to put idle mini PCs in a closet onto his network.
  - He maxes out at about 16 concurrent threads, with agents producing hundreds of lines an hour versus his own roughly 20-30 lines an hour by hand.
  - He calls lines of code a stupid metric, only a shorthand for output volume.
- He still uses Neovim, mostly as a project browser and to view changes. He also tries Hunk for diffs but wants surrounding context, not just the change set.
- He types prompts rather than dictating them. He uses Omarchy's built-in Voxtype for short commands (hold F9). Lex disagrees and prefers long voice monologues.
- Model views, as of this episode:
  - Fable is best overall. Opus 5 is second.
  - GPT Sol and Grok 4.6 are strong. Grok 4.6 surprised him.
  - Kimi K3 and DeepSeek V4 Pro (a smaller open-weight model) also completed the task.
- His benchmark was translating the Python `terminal-text-effects` library into Rust as a single dependency-free executable that is pixel- and frame-perfect:
  - Fable finished in under 45 minutes, plan included.
  - Startup went from 86 ms to 2 ms, execution became about 9.6x faster, and the binary is 3 MB.
  - It was later pushed to about a 46x speedup with auto-research loops.
  - Fable's per-token cost would have been about $550. Sol took about 1.5 hours at roughly $46. Grok 4.6 cost roughly $55 and DeepSeek Pro 2 hours 45 minutes at about $23. Luna and DeepSeek Flash failed.
  - It was released as the TTFX package.
- He uses Fable for planning and review and Opus for implementation. His standard process is to have one model do the work and another, such as Codex at extra-high effort, review it. GitHub Copilot review has also become useful after previously generating noise.
- He prefers Claude Code's harness (agent view, multi-agent), uses Open Code for open-weight models through Fireworks, and runs four Max subscriptions. He is annoyed that Claude reads only `CLAUDE.md` and not `AGENTS.md`, so he points each `CLAUDE.md` at `AGENTS.md`.
- Shopify's CTO ran a study tracing production incidents back to PRs. PRs reviewed by agents caused fewer production issues than human-reviewed ones, using models from about six months earlier.
- At 37signals he is experimenting with agents as co-workers inside Basecamp, assigned to-dos and cards, since asynchronous collaboration suits agents better than chat.

## Open source, contributions and the Omarchy plugin economy

- He rejects maintainer complaints about AI pull requests. His line is that it is like complaining your "steak is too juicy and lobster too buttery."
- Most human contributors do not write tests, fill in context or double-check work. Agents do if told to, so the median agent PR beats the median human PR.
- You can say "no thank you" to an agent-written PR without hurting a human's feelings. Agents also review PRs for him, sort chaff from pearls and validate bug fixes in a VM.
- On Omarchy he has merged over 1,000 PRs in three months, with about 400 open. Many came from non-Linux-distribution programmers whose ideas would otherwise have stayed in their heads.
- Omarchy ships skills that teach any agent how to extend the OS. In about three days the plugin marketplace reached 330 plugins, which he says is faster participation than any project he has run. The calendar plugin is one example, with about 17 implementations.
- Ideas now come from models as well as humans. He says he has seen model-originated ideas so good they make him humble.
- He built Quattro to diagnose its own crashes. When an app crashes, an optional popup asks the configured agent to diagnose it, and agents have traced bugs to source lines. In one case an agent found a race condition in a package manager (mise) and emailed the maintainer a bug report on unreleased code that was already fixed in source.

## Omarchy Quattro: speed obsession, Linux for agents

- Omarchy is a Linux distro on Arch with Hyprland. The Quattro release (version 4) is, in his words, among the best software releases of his career, despite him having hand-written the least code of any release.
- He explains the sub-60-second install:
  - His first target was 15 minutes, then 2 minutes, then 1 minute. The record is now 45 seconds.
  - He contrasts this with a Mac that needed 42 minutes of updates and a Windows Panther Lake PC that took 1 hour 35 minutes.
  - The NVMe drive tests at about 7 GB/s, so he argues there is no reason an installer should not approach hardware limits. A turbo image for the Dell XPS could install in about 12 seconds.
  - Tricks used: preloading while the user types the five setup answers, shrinking the ISO from 7.5 GB to about 5.85 GB (a slim JetBrains Mono package saved about 180 MB, and heavier ZSTD compression on the Nvidia drivers saved about 200 MB), and auto-research loops by agents.
- He compares this to McLaren shaving grams and to the W126 Mercedes: over-building for its own sake pushes a field forward, and pursuing a frivolous number can produce unexpected innovation.
- Omarchy is "opinionated" and pre-installs software (OBS, Kdenlive, Neovim, Herder, tmux, themes) by design. The name comes from "omakase," meaning the chef's choice, and he is the chef.
- Why Linux fits agents:
  - Everything is a config file or a CLI tool, and agents love the Unix philosophy.
  - Agents know the Linux source and can diagnose cryptic errors.
  - Mac is hostile to automation (for example, Raycast has no config file, and settings cannot be set up by script). Windows Subsystem for Linux is a sandbox.
- He sees an opening for the first time in roughly 40 years. Computing platforms are in play, Linus Torvalds has welcomed AI contributions, and he thinks Linux desktop growth is the most probable outcome. Dell now makes an XPS that finally competes with MacBooks. Lex received an Omarchy-loaded Dell XPS 14.
- On compatibility, he says Linux used to fail on drivers, and that persistence and a patient maintainer eventually fix this. Malleability is what makes people switch, not mimicking Windows or Mac.

## Employment, anxiety and advice for programmers

- On job fears, he separates people who loved the mechanical act of coding from people who love building. The first group faces more risk. He says he can see more builders being needed, citing the Jevons paradox and the ATM and bank-teller example.
- He accepts that productivity means fewer people for the same job and real pain for individuals, but argues it is good for the economy and for growth. He notes it is fine to grieve for a moment.
- He thinks much of the layoff wave is overhiring from the pandemic and AI used as a convenient excuse. He also says AI will expose roles that were not productive, as in David Graeber's "Bullshit Jobs."
- His advice to young programmers:
  - Do not try to predict two model generations ahead, because that leads to "AI psychosis."
  - Focus on right now and lean in. Catching up takes about two weeks, because the frontier churns and what survives is sorted ruthlessly.
  - Seek community (open source) to counter isolation and existential dread.
- He is using the 80s as a mental anchor for optimism. He keeps a memento mori Easter egg in the Omarchy calendar showing percentage of life elapsed, and he declares he wants a normal finite life, around 90 to 100 years.
