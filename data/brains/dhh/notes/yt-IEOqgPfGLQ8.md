## Matz and DHH on the AI transition and why programmers should accept it now

- DHH expects that by the end of 2026 virtually all programmers will be working through agents, as Matz already does. He says Matz has coded almost entirely with Claude Code since the previous November.
- He frames the future as "probabilities, not certainties," and puts the odds on this shift as very high.
- He compares the reaction to the stages of grief. Anger is mostly past, and many people are now "bargaining with the future."
- The AI "will listen to you, but it will not change its trajectory," so the quicker people reach acceptance, the better.
- He says the other side is amazing, wonderful and fun in the same ways programming always was: you have ideas, you see them come to life, and with AI it happens much faster.
- He says there is room for nostalgia, as with every past paradigm shift (the internet, mobile), where some people chose to stay at the station.
- He argues the community has a "collective responsibility to lean in and help each other" get to acceptance.

## Software writer to software maker: identity, taste and what humans still add

- DHH never saw himself as a "software engineer" because it sounded too serious and rigorous. He has long seen himself as a "software writer."
- He says people who never fit the engineering hat are better placed for the new role of "software maker," which is broader.
- He finds being a software maker more satisfying than being a software writer, and he loved writing: "the whole enchilada" is more satisfying than handwriting code.
- The human value added when working with agents is taste, a sense of proportion, a sense of beauty. These are the same things Rubyists cared about when writing Ruby.
- He says this makes the Ruby community "uniquely well tuned" for the moment, since what makes a good Ruby programmer makes a good agent driver.
- He says the shift is not about Rails or Ruby; it is "coming for everyone, for all domains, for all libraries, for all frameworks, for all languages." He calls the online focus on Ruby's fate "myopic."
- He rejects tribal attachment to the next language: he has no interest in becoming a Rust programmer because that role "has been abstracted away." Rust is just the most efficient tool today, and he would switch to a better one "with none of the grief" because he has no ego invested.
- He speculates agents may soon skip Rust and write machine code or assembler per platform, so portability stops mattering. "The camps are gone. We're not building new ones."

## Directing agents like a promoted lead: judgment, trust and egoless code

- DHH compares agent work to what he did on Rails. The first version he wrote himself, the second about half, and by the sixth and seventh "barely any at all, just direction": where to go, what's in, what's out.
- He says this is a promotion into direction and judgment, and that it is "immensely satisfying" once you give it five minutes.
- He gives agents responsibility in proportion to their competence, "measured in your trust that the last pull request was handled correctly, just like you would any human."
- He judges an agent as he would a 37signals programmer: is this person ready for more responsibility, and how often do I need to check in? The more senior the agent, the less he checks in.
- If you stop reading every line, you rely on outputs and trust and accept some risk. "Who amongst us have not written poor code with bugs that could be faster?"
- He calls demanding perfection from the new intelligence while accepting it from humans "AI psychosis" and "AI delusion."
- He prefers pull requests and issues opened by agents. He says they are higher quality than any average human-produced PRs and issues he has handled on any repo he has managed.
- He treats a "slop grenade" PR as just a suggestion and does not have to catch it. If he likes the idea, his agent picks the implementation apart and returns "a beautiful implementation."
- Contributors who did not write the code feel no loss when he discards it. Past open source friction came from people attached to lines of code they had invested energy in, and he says there are few lines of his own left in the Rails codebase.
- He sees this as letting more people produce code without ego, with attachment only to ideas and better ideas.

## Cope versus real criticism: slop, meat proxies and the innovator's dilemma

- DHH calls "90% cope" the contempt for AI shown in terms like "slop" and "meat proxy."
- He accepts the meat proxy as a real but temporary problem. If you copy and paste error messages between tools, you should let the agent read them directly: "Why are you in the loop?" The role is unfulfilling and ineffective.
- He calls the claim that agents cannot write original, high-quality, bug-free code "delusional," and "far more AI psychosis than the optimism." He says the slop label should be retired soon.
- He applies the innovator's dilemma. New technology first looks like a toy, and incumbents dismiss it. People once said Ruby "doesn't scale" and now say the same about AI, "wrong in exactly the same way."
- Whatever doesn't scale yet "is going to scale in five minutes from now," because the technology is improving at an "absolutely astronomical rate." He says not to sit as the incumbent who scoffs at toys.
- He compares the standards to self-driving cars. He cites a figure of roughly 45,000 US traffic deaths a year and says the technology he has seen is about eight times less likely to crash than the average human. Cutting deaths to an eighth would leave about 30,000 people alive.

## More software, not fewer jobs: against the fixed-pie view

- DHH says people anxious about jobs assume a fixed number of applications and conclude fewer programmers are needed.
- He agrees that the applications that exist today will need "vastly, vastly fewer programmers" to maintain and evolve.
- He argues the world will make far more software: "That's the bloom." He points to GitHub falling over constantly as evidence of an explosion in software creation.
- He expects all those new applications to need tending, which is why he is optimistic for programmers who accept the future and take on the software maker role. He calls it "job security."
- He says this only works if you don't "hold on to the pencil so tight that you can't imagine the calculator helping you out."

## Languages, token efficiency and what agents are good at

- DHH says current token cost and speed concerns reflect this moment only. He calls today's agents a "Commodore 64" at "1 megahertz," expecting them to run 10 times as fast next year and 100 times in two years.
- He says humans cannot intuit exponential growth, so you should watch your token bill now but treat it as short-term.
- He calls fears of being rug-pulled by Anthropic and OpenAI "economically illiterate." He cites strong open-weight models and says there is more competition than in any earlier computing shift, with leads measured "in months, if not weeks."
- On language choice, Matz cites a colleague's measurement across about 13 languages, including Ruby, Python, JavaScript, TypeScript, Rust, Kotlin and Go. Ruby, Python and plain JavaScript were the three best on token efficiency and time efficiency, and static typing helped neither. DHH's reaction was "told you."
- DHH says agents speak Python by default because the ML researchers who built them used it, which says nothing about what they do better. They are fluent in every language and will write Ruby if asked.
- He says the focus on pre-training and teaching labs more Ruby was a mistake. Models don't need to see much Ruby to write Ruby, because the principles of good software are universal.
- He rejects the idea that models are parrots. He calls them "incredibly creative thinkers," and says the creativity is why security is hard, since they string together attack combinations. He says defenders need agents of their own.
- He says to have agents write Ruby when you want to read code, because "Ruby is the best programming language for humans." They can then compile down to machine code for the CPU.

## Ruby's role going forward: readable explanation, rewrites and Spinel

- DHH first took Ruby for pseudo code when reading Dave Thomas's articles in a magazine, and sees Ruby as the best language for explaining concepts. He says an agent explaining Rust code to him in Ruby would be "an amazing return to form."
- He plans to start all new web applications in Ruby on Rails. He says most Rails apps run on a single Raspberry Pi and need no more speed than that.
- If something becomes popular enough that a Rust or machine-code rewrite pays off, he would do the rewrite and can turn it back into Ruby afterwards. Code is malleable in both directions and you aren't "condemned" to Rust.
- He thinks future software may be generated on the fly, with operating systems, drivers, frameworks and languages produced like current generative game worlds. He says we need "more science fiction" to guide imagination, because our current mental models (HAL 9000, Terminator) are decades old.
- Matz describes Spinel, a Ruby compiler to native binaries he started in March (2026). It runs fast and uses much less memory, and in a realistic program he cites about 20 MB against 100 MB, roughly one fifth.
- Matz's concern is that as agents make components transparent, society will stop caring about open source foundations such as Ruby, Rails, Linux, the Rust compiler and databases. He says their sustainability still has to be worked on.

## What Ruby and Rails got right: agency, joy and motivation

- DHH says Ruby and Rails' central contribution is agency: individual programmers going much further with efficient, pleasurable, beautiful tools.
- Ruby was for him both a practical tool for shaping web applications and an endless source of joy and motivation.
- He says the communities understand human psychology and productivity better than others, and motivation is a large part of it. Code that looks like "poetry" matters beyond whether it runs fast.
- He thanks Matz for letting the Rails community "finish the book he started," placing the application programmer on the same level as the language designer.
- Matz says Ruby's biggest contribution is showing the importance of joy, motivation and community in programming. He says joy, motivation and freedom will stay important even if Ruby does.
- DHH says humans need to find a tribe with a shared outlook but enough friction to learn from each other. He treats static versus dynamic typing, tabs versus spaces and Emacs versus Vim as disagreements that are not reasoned into or out of but come from near-bedrock presets in people's brains.
- He says we should celebrate such divisions and invent new ones, as agents write more code, to keep camaraderie.
