## DHH's view of the AI inflection point and how it changes programming

- DHH calls November 24, 2025 (Opus 4.5) "the Kodak Brownie of our era": the point where AI became accessible enough in a usable harness for many people to build software alongside a new form of intelligence. He says history books will mark it as the inflection point of the Age of Agents. For him there is "everything before November 24 and then everything after."
- He compares it to photography. Portrait painters spent months or years on a single painting, then the Brownie (c. 1900, about a dollar) democratized photography. Painters pivoted to new art (cubism, impressionism) once depicting reality perfectly was no longer economically viable. He notes his great-great-grandfather, the painter Laurits Tuxen, embraced photography himself.
- Technology advances in fits and starts. Photography barely changed for roughly 80 years, then went frictionless and reached about 2 trillion photos a year in 2026.
- He describes a trough of disillusionment from February to May 2026, when new models seemed worse and people said the exponential had stalled. It ended in June with Fable 5 and Mythos, which he says is where his AI delirium/euphoria set in. Then GPT-6 Astra arrived in September, and Deep Seek 4.1 Flash showed frontier intelligence would not stay with a few large American companies.
- His practical test of the shift: with Opus he went from "I can tell an agent to do something" to code he wanted to merge. With Fable he could hand over problems or ideas and have them solved with no direction on implementation.
- He argues no one can predict the final state, since any prediction is out of date within about 20 minutes. His recommendation is to lean in rather than take the "black pill."

## Productivity numbers and the 10x debate

- The 10x programmer idea traces to a 1968 ACM study showing the best and worst programmers varied 5x to 30x, about 10x on average. The industry then argued about it for roughly 45 years.
- He says it is now uncontroversial that the best programmer with AI tools is about 100x the worst programmer without them. He adds, less controversially in his view, that the figure may be about 1,000x.
- His own numbers:
  - In the past 20 months he wrote half as much code as in the previous 21 years.
  - Over 21 years he wrote about 30,000 lines of production Ruby per year.
  - In August 2026 he produced 150,000 lines in one month, about 60 times his long-term average.
  - Over half his past work was Ruby; this year about 3%. He caveats that much of the new output is verbose Rust he would never tolerate in Ruby.
- He frames the bottleneck as a single question: "how do you get the most out of this intelligence explosion". Every other question sits below it.
- He compares it to his 2005 Rails demo in Brazil, where he was excited about "all the code I wasn't writing." In his view the same feeling applies now, at far larger scale.

## 37signals stops writing code by hand

- At 37signals, about a few weeks before the talk, the team decided they are "pencils down" on handwritten code. Writing code by hand is now an exceptional state, treated like seeing a bug in Sentry: something went wrong, so fix the machine or "the factory."
- He polled the room: only about five people still wrote material amounts of code by hand weekly. He says a similar claim three months earlier would have sounded crazy, and that the claim only recognizes what is already happening.
- A failed attempt in spring 2026 during Basecamp 5: designers vibe-coded final features and each PR looked reasonable, but 20 to 30 together left the architecture like Swiss cheese. The team reverted to manual review with programmers using agents. DHH now calls that "the wrong conclusion," because the models (Fable) were about five minutes from making it work.
- Basecamp 5 shipped agent-accelerated but still with a lot of handwritten code.
- He says he retired as a professional programmer around March 2026. He asks people to look back on 25 years of handwriting code with joy, not regret, and says handwriting code is no longer economically productive for most programmers at most companies, and by the end of 2026 will not be for virtually any.
- The new career he describes is a professional maker of things who steers intelligence. He calls English "a better programming language than Ruby": more expressive, a bit vaguer and less deterministic, but a joy.

## Native apps and Rust: rethinking the web-app default

- 37signals is starting a new version of Hey and will stop making it a web app. His reasoning: Hey was a web app only because that was how small teams stayed productive. Maintaining six native apps was previously preposterous, which is why React Native and Hotwire Native existed, accepting a fidelity hit.
- Six native applications were kicked off about a week before the talk, and he demoed them already running. A first Windows prompt produced something not shippable; a redirected version landed 20 minutes later.
- He predicts that web apps that exist out of necessity, convenience, programmer preference, team size or resources will become native apps, because the cost of building them has fallen to nearly zero. Shopify's recent rewrite of the Shop app from React Native to native, done by about six people over a short time, is his example.
- On the backend he dislikes Rust ("the ugliest programming language invented in probably the last 40 years") but loves it if he never has to read it. Agents like Rust.
- With the frontend native and no HTML rendering, the Hey server becomes the mail server it is at its core, written in Rust. Claimed results:
  - 99% less CPU.
  - 95% less memory.
  - 10 hosts needed only for redundancy.
  - By back-of-the-envelope calculation, Hey's peak traffic could be served on a single Raspberry Pi.
- He treats Rust and C++ as black boxes he evaluates from the outside, like any business owner who commissions programmers. He says not knowing Rust is "a feature and a privilege," and warns programmers who know too much about how computers work not to be overly prescriptive. A beginner's mindset, with higher-level prompts, works better.

## Where Rails and Ruby still fit

- The web remains valuable because it asks no one to install anything, which suits ephemeral customers. Basecamp is his example: strangers who need a file or short-term collaboration. He says Rails is well positioned for those apps and admits he does not have the answer for exactly where to draw the native versus web line.
- Rails' 25 years of convention over configuration pay off in token efficiency. The one-developer-framework focus fits the agent era, where single developers can go much further.
- Evil Martians built agent evals for the Rails Foundation, measuring implementation of features against reference apps. Agents saturated the first version at about 95% completion, so the evals were made harder. He says this elevation of tasks will keep recurring.
- He says agents also work best asynchronously: hand an agent a task like a coworker, leave, and review later, rather than waiting on a chat interface. 37signals is experimenting with directing agents from inside Basecamp (via its agent, Marie).
- He stresses that models can now be assigned outcomes or problems rather than tasks, and that this capability is only a couple of months old.

## Software architecture and abstractions need re-evaluation

- DHH says everything we think we know about structuring codebases will have to be revisited. Abstractions, his long-time favorite tool (including naming things), "don't make quite the same sense in the age of agents."
- Reasoning: abstractions existed partly to avoid repetition. With hundreds or thousands of conscious processes mutating an app, abstractions become choke points, and the price of repetition and of keeping things in sync has dropped to near zero.
- He calls these fundamental re-evaluations of computer science with no blueprint yet, and says things like methodology, cycle length and who specifies what are all open. He compares being present now to being there when object orientation first appeared.
- Optimization is another payoff: with programmer time no longer the scarce resource, every optimization becomes affordable. His examples: his Hype presentation app is half a megabyte, while Spotify's player is 1.2 GB.

## CLIs over embedded chatbots, and concept search

- He rejects bolting a chatbot concierge into every app: "I have my own personal butler" that can use CLIs to connect Basecamp, Hey and many other apps. His request to software makers: "If your app doesn't have a CLI, I want to see it by next Friday," and let users bring their own agent.
- The Hey CLI changed his experience of search. Elasticsearch, which Hey uses, is serviceable but does not find things when he doesn't know the keywords. Through an agent he can search by concept: he found a five-year-old email about sneakers and a podcast without remembering the company or the year.

## Building with agents: Omarchy and small apps

- The "we can just fix everything" feeling extends to the whole computer. He credits it for Omarchy, a Linux setup he says is far superior to any computer he's used, with about $20 million raised for the effort.
- Install time progress: 3 min 33 s at last year's Rails World, 35 seconds on an AMD Strix Halo laptop (installed by Anush from AMD), and 9 seconds in the lab. He quotes Mitchell Hashimoto: "The pursuit of excellence does not need justification."
- He built several apps in C++ and Qt without knowing either well, never reading the generated code:
  - A calculator, one-shot from a single screenshot, working about 7 minutes after the prompt and pushed to the public repo about 15 minutes later, then included in a new ISO.
  - A writing app replacing iA Writer.
  - A video trimmer, now included in Omarchy.
  - Hype, a Markdown-based presentation tool, started Thursday before the keynote, built while preparing the talk, with a binary of about half a megabyte.

## Optimism, security and uncertainty about the future

- He argues predictions about the economy and society are consistently wrong. His example: when ATMs arrived in the US in the 1950s, there was panic that about 30,000 bank tellers would lose their jobs; instead banks opened more branches and employed more tellers (about 40,000 by 2010). He cites Jevons paradox for the pattern.
- He criticizes AI researchers who see scary things in the lab and extrapolate to societal doom, comparing it to Oppenheimer being unable to predict the Cold War outcome. He asks for more optimism and less "P doom."
- He accepts that real risks exist, especially security (an agent might try bad things), but says tools can be invented in response. The example is a recent Rails CVE involving a C image library, with a quarantine/sandbox effort ("Hot Cell") presented by Mike at the conference. His line: "You have agency."
- His game-theory argument: since no one knows the future, optimism is the rational stance; if it turns out well, sadness was a waste, and if it turns out badly, you should have spent your last day cheerful.
- He expects competition as more people can program, but says Rails programmers are "the best of the best." He closes by saying kids are not weighed down by things to unlearn, and tells people to take "the optimism pill."
