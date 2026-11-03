## Why AI isn't writing DHH's code yet

- DHH says AI is not writing Basecamp or anything from scratch for him. He uses it for one-shot experiments, and they "usually stay on one shot" because once he gets into evolving something, he decides he "could have done it quicker" himself.
- At 37signals, every developer uses AI to some extent, but the Ruby code is mostly not AI-written. Where it is used for code, it is mechanical translation: "Here's something that we know exists. Can you write that in a Ruby version" gives a first draft.
- AI helps a bit more with Go code that is more boilerplate-heavy, but he says even there "it hasn't changed the game".
- He says 95% of Basecamp was typed by humans. He is skeptical of claims that "in five minutes we're not going to need any programmers", and asks which model those claims are based on (he mentions Opus 4.5 as the current one).
- He calls the quality a flickering light bulb: sometimes the AI pieces everything together in a way that astonishes him, and two seconds later it produces code he wouldn't maintain, below what a junior programmer would deliver.
- He stays open to change. He says it "could change in three months", and he is prepared to be in a mode where AI writes the majority of his code at some point. He compares his hand-written code to a modern saddle maker: a luxury, but still competitive.
- He does not enjoy being a project manager for "a gaggle of AI agents". He prefers writing code himself.

## Using AI to learn instead of to write

- The real productivity gain for him is becoming better and smarter: getting up to speed on new APIs, techniques and concepts, and finding leads on why a bug happens.
- Omarchy, his Linux distribution, "would not have existed without AI". He would not have had the patience to trawl Linux forums to decode obscure error messages. Pasting them into an AI beat a condescending, three-year-old Stack Overflow post.
- Example: Rails switched its CSRF protection from tokens stored in cookies to a newer browser header-based feature. He asked AI which header it is and when it became available. He could have gotten this from caniuse.com or the RFCs, but the AI served it combined on a platter.
- He says the point is "using the AI to make me smarter", not just making it do things for him.
- He worries about competence draining. While writing a lot of bash for Omarchy, he caught himself asking the AI for the umpteenth time how to write an if conditional, and noticed he had not internalized it. He asks whether that is like teachers who thought calculators meant students no longer needed their times tables.
- His rule: his "moving average" of knowledge must go up and to the right. He does not need to know everything, but he should know more things in more domains at the end of each year. If not, he gets bored, then unmotivated, then does "jack diddly".

## Where AI genuinely paid off at 37signals

- **Security bug bounty triage (HackerOne):** The volume is brutal. About 300 submissions in a quarter, of which roughly 3 were legitimate, about a 1% ratio. Verifying and dismissing the other 99 was a big time sink.
- AI processes incoming reports, checks them against the codebase, gives a verdict on whether the report is legitimate, and writes the reply. He says compressing 100 reports to review down to 5, or 10, or 20, is real productivity.
- It also writes the replies in a calm tone. He notes that human programmers find it hard not to shout obscenities at entitled, impatient researchers demanding a $5,000 bounty for a bad report, while AI calmly explains why the report is wrong.
- **Customer support:** this is harder because 90% correctness is "actually pretty bad". A wrong answer to 10% of customers can cause churn, and the lifetime value lost erases any savings. The last full test was about 18 months earlier and "didn't pan out so well". He says it is time to retry, and notes Intercom's Fin AI agent is seeing great adoption.
- **AI features inside products:** 37signals experimented with an AI command line for Fizzy cards and AI summarization, and tried several features in Basecamp. None "made the cut" as clearly better, so none shipped.
- **Shopify Sidekick:** as a Shopify board member, he calls its AI agent that helps merchants set up and optimize shops "truly incredible", with undisputable tangible benefits.
- He understands pushback against AI features, citing Apple's news and text summarization as hilariously bad. If a company of Apple's size cannot get it right, others probably cannot either.

## The productivity test: more with fewer people for less money

- He applied the same test to AI that he applied to the cloud. 37signals left the cloud because "can we do more with fewer people for less money" never panned out. Going to the cloud often doubled team size and quadrupled invoices.
- The exit saves about $2 million a year. Cloud spend peaked at $3.4 million and is now just over $1 million in ongoing cost.
- He has not seen AI let a standard SaaS business fire half its programmers and still go faster. He is skeptical of claims that it already does.
- He uses an analogy: if one beer distributor uses a horse and buggy and another a truck, the market settles in five minutes. He has not seen that kind of gap yet with AI, though there may be a data lag.
- Even the AI companies are still hiring lots of programmers, and AGI has not arrived.
- He says people are sometimes busy with AI and feeling productive while shipping less, making less and understanding even less.
- He explains that developer productivity has always been the premise of Ruby and Rails. A single developer can build a product. Lowering the cost of experimentation gives more shots on goal, whether via Rails, AI, or both together.

## Launching and marketing in the age of algorithms

- Launching a product has never been easier, so the market is flooded with launches. Fizzy's launch was good, but smaller than earlier ones. He attributes that partly to social algorithms: he has 500,000+ followers on X, but they work for a sharp take that goes viral, not for a "right hook" call to action. He no longer even sees his business partner Jason's tweets unless they go viral.
- Gary Vee's "jab, jab, jab, right hook" playbook no longer works, since people only see the jabs. His answer is to throw both punches at once: give something of developer value (a cool Fizzy feature, community work) and say "Fizzy, Fizzy, Fizzy" in the same post. Repetition is marketing and branding.
- Fizzy's open-source release served this strategy. It is a gift to developers wanting to learn from a production-grade Rails app, and it also gave 37signals a license to talk about Fizzy continuously.
- The blockbuster launch (teaser, trailer, big day) from "Getting Real" in 2006 is dead, because there is no shared culture of events anymore, only individualized feeds. A launch is now "a quarter or a year or even a decade", not a day.
- He now tweets more, because the algorithm handles volume, and more volume gives more seeds a chance to land.
- Omarchy's marketing: about 40 releases in the first month, which blasted feeds for around three months. People replied things like "FINE, I've heard about Omarchy for the 17th time, I'll install it." He cites the rule of thumb that you must hear a brand seven times, and Jason's "transfer of enthusiasm".
- Platforms ghost corporate accounts. Tweets from 37signals' and Basecamp's company accounts get "crickets", and even The Verge with millions of followers gets a handful of likes. Only personalities, or god-tier brands like Wendy's, get traction.
- He admits that he still does not fully know why Basecamp hit when nothing else he built has matched it, and that thousands of people still sign up every week despite many competitors. His takeaway is humility: try many things, take the hints, and do not expect a repeatable master formula.

## Opportunity for small teams and the open field of software

- He argues competition is higher because more people can build, but attention has not left the system. He compares it to music, where complaints about Spotify coexist with an industry as big as ever.
- Opportunity is still large outside the over-picked categories. He has made about seven to-do lists in his career, and there are billions of others. He suggests software for hair salons, which often has terrible tools built decades ago.
- His own habit has been solving his own problems, since he immediately knows if the software is good. Building for other industries needs more customer interaction, which he says he is not personally cut out for, but others are.
- Fizzy is a fresh take on kanban, a concept Toyota created in the 1950s for its production line, turned into software in the early 2000s, and popularized by Trello. His point is that you can revisit a crowded domain to make something better, more fun, more lightweight, more colorful, with fewer features.
- Pricing for Fizzy: 1,000 cards free, then $20 a month. The full codebase is open source and free to self-host. It also acts as a lab for techniques going into Basecamp 5.

## Staying open as the market shifts

- He compares this moment to the mid-to-late 90s internet and the 2007 iPhone. Unlike those, he says this shift is obvious in real time, since anyone who used the first ChatGPT could see it would rewrite the rules.
- He says you cannot roll these shifts back, and the best response is to accept uncertainty, stay curious and ride it.
- He loves computers themselves, not just as tools. He ranks this change as at least on par with going online with a modem on a Commodore 64 or Amiga.
- He tried local models again and was "shocked at how good" they have become, though not frontier level. He says the "halflife of truth" for statements about AI is now very short. He raises the possibility that open models become good enough that no one dominates, as open source did to backend software (Linux, databases, Ruby, Rails).
- On mobile, he sees Apple and Google as the two winners with full lockdown, and hopes the AI shift flips that board, though he does not trust that the outcome will be an open utopia.
- His advice for the anxiety: "your sense of wonder is your safety line".
