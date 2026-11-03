## Rails' backend stability and longevity

- DHH calls Ruby "the most beautiful programming language that I've ever laid eyes on", and says it stays a delight whether he writes the code or watches an agent do it.
- He backs the internet as the best application platform software developers have had, because it allows distribution "without gatekeepers".
- Old Rails code looks much like today's. The 2005 "look at all the things I'm not doing" demo has controllers and models with a shape "eerily similar" to modern ones. Active Record has kept the core of its DSL since the start, with more power and polish added.
- The backend is where Rails got things right early. The front end is what changed (Hotwire, minimal build pipelines, no-build JavaScript).
- Learning Active Record was an investment he says can be "amortized over literally two decades". Most ecosystems churn so much that a 2009 JavaScript framework pays nothing back.
- The early years (about the first five or six) involved open-surgery changes, such as the Rails 2.3 to 3 transition. That is what gave the foundation its stability.
- Rails is now at the "99.999% of coverage" stage. Weekly commits mostly polish edge cases, and he sees that as an achievement.
- His stance on change: "whenever I know better, whenever I see better, I put it into Rails". He is willing to rip out legacy code if there is a better way.
- Contributions: about 6,000 to 7,000 contributors to the Rails codebase.

## Green-field and legacy codebases are nearly the same in Rails

- 37signals maintains both. Basecamp 5 is built on the chassis of Basecamp 3, code that started in 2013.
- They still maintain the original 2003 Basecamp for thousands of customers, even though they stopped selling it to new customers in 2010.
- Fizzy is a green-field app built with their best current ideas, and its codebase is public. DHH says he compares Fizzy with the Basecamp 5 codebase and they "are not that different".
- A model file from today's Basecamp "would look absolutely right at home in Fizzy".
- Basecamp 5 probably has no complete SQL statements, because Active Record is now powerful enough that you don't drop down to SQL.
- The main architectural shift in Basecamp was "recordables" and delegated types. He says this is a nudge toward an architectural style and needs little Rails plumbing.
- Dating a Rails app: look at the front end, not the models. The tells are Webpacker, esbuild, no-build, jQuery, or which front-end framework it started with.

## Hardware and the front end: what modern Rails benefits from

- The developer machine used to be the slow part and the server the fast part. That has flipped.
- Benchmark he ran just before the call: the entire Basecamp 5 test suite on his local AMD 395 machine, 16 physical cores, versus a fast cloud machine with 20 data-center-grade cores. Local was about twice as fast, and the suite ran in 60 seconds.
- He says this compresses auxiliary processes such as CI and build pipelines.
- The switch to no-build and real JavaScript modules ended the Webpacker era (about 2015 to 2019), when the front end was less enjoyable than the back end. He knew then it wasn't the final form.
- Passkeys are one of the modern web features Rails is working to support natively.
- Basecamp 5 has a new editor built on Meta's Lexical framework. Lexical underpins Facebook and WhatsApp. They wanted tables in the Basecamp editor for almost a decade, and the in-house Trix editor couldn't be extended for them.

## Likely Rails World features: Action Text with Lexxy and passkeys

- Action Text will get a major upgrade. Lexxy (the Lexical-based editor) becomes the default, stays compatible with Trix, and supports migrating from Trix.
- Rich text input is "table stakes" for almost any modern web app. Trix lacked Markdown support and tables, which were deal breakers for some.
- A pull request is already open to add end-to-end passkey support to Rails.
- DHH changed his mind on passkeys. He first expected them to replace passwords entirely and saw usability problems, for example a passkey set up on an iPhone not working on a Windows PC.
- What won him over is the Fizzy approach of pairing passkeys with magic links, so you can always log in through email. His conclusion: most applications should simply have magic links and passkeys, ideally without social login.
- He finds it "crazy" that developers outsource login to a SaaS provider, and thinks this combination lowers the floor "so low that everyone can play".
- The framework should own the "delicate dance" of the passkey JavaScript behind an easy API.
- He hinted at more Rails World announcements in September.

## Why Rails isn't rushing to bake in agent features

- On giving agents access to apps (MCP, CLIs, passkeys for agent accounts): "it's not figured out at all". MCPs were hot, then the "puck kind of skated to CLIs", and now both are discussed.
- He is not in a rush to put foundational framework concrete around agent features until the final shape is clearer.
- Example: a default AGENTS.md shipped in the last Rails version would be badly outdated after about three model jumps, and literally harmful.
- Studies of agent instruction files, as he describes them, show that telling an agent to do something it already knew how to do right makes it dumber. It fills the context window with distractions and produces worse code.
- Pace: he compares it to JavaScript churn "on turbo steroids", with a new way of working every six weeks or so. Many pin last December as the inflection point, when people started letting agents write the first code instead of using autocomplete.
- He describes GPT-5.5 as "one of those Opus 4.5 moments", with larger delegable tasks and better code.

## Working with agents: where they help and where they fail

- Agent as explainer: while building keyboard accessibility for Basecamp 5 (sidebar navigation, a neovim-like interaction), he spent a lot of time with GPT-5.5 on JavaScript focus handling. It needed steering. When he challenged "too much code", it walked him through edge cases and timing problems, such as why a frame must be requested first.
- Designers and project managers can now write Rails code and test their hypotheses without a programmer mediating. Most of that code is not merged.
- The benefit is answering "is it good, is it fun, does it feel right" much earlier, without spending weeks of a programmer's time. He recalls writing code that Jason (Fried) rejected after a week or two of work, and says being relieved of that "coding in vain" is a big step forward.
- Process impact: Shape Up's six-week cycle was built on assumptions about implementation time that are "no longer valid". He can hardly imagine a Basecamp feature needing six weeks now.
- Quality risk, the monkey's paw curse: the agent gives you whatever you ask for. It happily writes 1,200 lines when an architectural twist could reduce it to 20.
- He quotes Kent Beck's "make the change easy, then make the easy change" and says agents aren't good at it yet. They are "eager to please as quickly as possible in as few tokens as possible", which leads to bolt-on code.
- Humans also turn codebases into a ball of mud when time pressure removes refactoring. His reservations are about development "without care towards architecture, without care towards style and beauty".
- Keep that care if you want a large system that isn't whack-a-mole where one feature creates three bugs.
- Caveat: his good experience is biased because 37signals codebases already have established patterns. He does not know how agents do in a ball of mud.
- On hallucination: it largely stopped mattering once models became agents with tools, because they run tests and linters, so hallucinations don't reach the pull request.

## AI adoption, ambition and cost of implementation

- He calls it a "professional obligation" for every programmer to take AI seriously and spend time learning it. Skeptical stances like "it's just a parrot" are "distracting ideological dead ends".
- His own change: a year earlier he said he loved writing all his code by hand. He changed his mind once an agent could produce code of the same quality he would have written. He says AI-accelerated he is "so much more productive".
- He compares this to earlier shifts (the internet, script kiddies for PHP, early mobile apps) and says NFTs were an idea that didn't pan out. He calls AI "maybe even the biggest one".
- Cheap implementation: he wants to see many implementations (he needs about seven before he finds a shape he likes), comparing it to browsing art. He says he feels no guilt "flushing a thousand lines of code down the toilet" because agents will build another one.
- Level of ambition goes up. Example: Jeremy on the team started a project to speed up the fastest 1% of requests, lowering the floor from a couple of milliseconds to sub-millisecond. He says it matters for infrastructure spend at millions of requests, even if users can't perceive it.
- The keyboard accessibility sprint close to launch is another example. Before, he'd have scheduled it as a post-launch Shape Up cycle. Now "it's easier to let an idea turn into running code rather than a card for planning".
- Toby Lütke at Shopify saw it earlier and mandated paying attention to AI before the rest of the industry caught up.

## Reliability, risk and vibe-coding with Rails

- More pull requests means more incident opportunities. Analogy: self-driving cars crash at a much lower rate, but 100 times more cars still means more accidents. Going from 5 to 50 pull requests a week at half the defect rate still adds instability.
- He thinks the general feeling that systems got more unreliable with AI comes from volume and speed, not from agents being worse programmers.
- Basecamp 4 had literally 100% uptime over the last three months, with not a second of downtime. For startups he says aiming for 100% is wrong: "get to product market fit quicker" and tolerate some instability.
- Vibe-coding with Rails: he sees a class of apps (the Microsoft Access, FileMaker Pro or Excel kind) that non-programmers could build with Ruby and Rails and agents without ever looking at the code. He wouldn't do this at Basecamp scale or for "my next bank app".
- He changed the tagline on rubyonrails.org from "hello world to IPO" to "from prompt to IPO". He expects IPOs where the first app was vibe-coded to product-market fit and programmers were hired afterward.
- Rails has always flattened the curve for newcomers by handling things like security defaults, so mistakes aren't critical. He wants it "flat" rather than a "200 meter wall".
- Agent-written Rails features and contributions are welcome, but must be reviewed by qualified humans on the core and committer teams. AI slop in security reports is a nuisance that needs ways to be handled.
