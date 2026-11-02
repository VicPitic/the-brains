## Why Cody builds AI marketing agents, and what has to be true for them to work

- Cody argues growth is engineering: "I have an outcome that I'm trying to get. I have limited resources of time, money, and mental energy," and the job is to distribute those resources most effectively. If it is a system, it can become a process, then software.
- He says the whole stack to have a company "market itself" already exists: the data, the intelligence, and the tooling. What remains is building the systems, operations, and quality standards around the agents.
- His startup pitch to clients is speed: "we can deploy an agent in like 40 hours," across channels, reusing the same playbooks that work for similar SaaS companies.
- He says buyers want outcomes, not self-serve tools. Companies "just want to pay for the outcome," and he is effectively building virtual employees for them at roughly 1/10th the cost of hiring 10 people.
- After adding an agent layer on top of Graphed (a data pipeline, warehouse and BI tool), users kept saying "cool, I have this insight, now I want to act on it." That feedback pushed Graphed into done-for-you, forward-deployed GTM engineering.
- He tested demand for that offer by posting it on Twitter and LinkedIn with a Tally form, and got over 100 inbound requests.

## Why AI SDRs failed, and how to avoid the same trap

- Cody's postmortem of AI SDRs: the agent often performed "unbelievably well." It got leads, but the leads were terrible quality.
- The cause is optimizing for the wrong metric. He compares it to Google Ads ML self-optimizing into a cheaper sign-up event from the wrong subset of the audience.
- His framing: "it's not the agent's fault... it's optimizing for the wrong metric." If the wrong signal goes back to it, it does its job against that signal.
- The fix is to give the agent all the data and resources and tie it to revenue, not just the top-of-funnel event.
- He says the hardest remaining problem is human: deciding what the agent should optimize for. Pointing it at the wrong target is "pointing a nuclear weapon" at the wrong thing.
- He dismisses people who say agents can't work in marketing as "rookies" who don't see growth as a system.

## A multi-agent team: one narrow job per agent

- Cody says "run Facebook ads" as a single prompt fails, like a human who has never done it. It is rare to find one person who can make creative, manage the account and analyze data, and the same limits apply to one agent.
- His approach is a team of agents, each in its own sandbox, each with a tightly scoped job:
  - Research agent: scours social media for target customers' pain points and desired outcomes and builds a corpus.
  - Script-writing agent: writes scripts from that research and uses the HeyGen API to generate raw video, then removes silence and adds captions, producing AI UGC ads.
  - Ad-account agent: uploads to Facebook Ads and follows explicit rules. If CPM hits $50, it stops that ad. If it sees a target CPA, it promotes the ad to its own ad set and allocates budget. After about 30 days, it turns off ads showing fatigue.
  - Analysis agent: finds what actually works and feeds that back to the others.
- He describes the structure as ICs, a manager above them, and an analytics layer over Facebook ads, Google ads, SEO and the whole organization, like "a board meeting with your agents."
- He says no single agent or human could hold all of this at once, so splitting by job is what makes it work.

## The SEO agent loop (built live)

Cody built this on a livestream:
1. Keyword research.
2. Research what ranks on page one of Google.
3. Input a transcript of him talking about the topic (his example: how AI is changing Facebook Ads).
4. The agent writes and publishes the content.
5. It calls a web indexing API to get the page indexed.
6. A second agent reads live Google Search Console data and optimizes the article.
7. A third agent looks at which pages produce sign-ups and revenue, and feeds that into the next round of content.

- He says every good go-to-market system follows this loop: "I try things, I look at what works, I do less of what doesn't and more of what does, and I just repeat that growth loop."
- To grow fast, layer channels: do one, add a second, add a third, and "never stop what you're doing."
- He warns that "give it a keyword and it writes it" is why people say AI SEO doesn't rank. Under the hood, good content involves many steps.

## Vibe coding is not production: the last 20% is the work

- Cody says vibe coding "from zero to 80% is pretty cool. 80 to production and live is a chasm."
- Examples of the hidden work: agent evals so output hits brand style guidelines, and an observer agent checking image outputs (he mentions Nano Banana via two API endpoints) against the guide before they move to the next step, such as upload.
- He says this is where companies underestimate: they want agents conceptually, but the build-out and implementation gap is huge.
- His example of speed when scope is clear: he gave Claude Code a plan, with "dangerous permissions," to build a medical-business directory site. The data-collection agents took time, but the product itself was done in about 45 minutes. It included location filters, login and paid placement for top listings.

## Data quality and agent evals

- Cody warns that agents assume things about underlying data. Facebook Ads alone has 96 tables and hundreds of columns, so "link clicks" or "CPC over time" can be ambiguous, and the agent guesses from training.
- He says you have to teach the agent the ontology of the data: "when somebody says this they mean this." Then run an eval program so that when a user asks for something of that shape, the agent writes the right SQL on the first try instead of retrying five times.
- He says the worst outcome is making decisions on bad data. Many marketers hook Claude Code to the Facebook Ads API and assume the output is right.
- Failure modes he lists: rate limits that aren't flagged, truncation or pagination problems in MCPs that report "all the data" but return page one, and stuffing tabular data into the context window.
- He says evals are needed for both the data and the decisions the agent makes.

## Choosing tools in an agent world, and keeping agents safe

- On CRMs: six months ago he'd pick HubSpot for its UI. Now the criterion is "what has the most API endpoints and can control the product at the largest scale via the API." He says he hasn't touched the HubSpot UI during live sales cycles and instead uses a Graphed agent with an API key to track deal flow and follow-ups.
- Graphed's product direction: rather than adding UI features like dropdown filters, give the agent a skill and an endpoint to create hosted artifacts. A user's agent can build custom dashboards, then slide decks with chart PNGs, for example a weekly client report sent every Monday.
- Safety practices Graphed uses for agents:
  - The agent never touches real API keys. Real secrets live in a local secrets file, the agent gets a "ghost key," and the real key is proxied in at call time.
  - Remove open web access. Give the agent Firecrawl only, and require approval for specific outbound actions, to reduce prompt injection from something like a random Reddit post.
- He says it is early and nobody knows the full safety surface yet.
- On cost: he notes Graphed ships a lot on MiniMax 2.5 because it is capable for the cost. His pattern: a frontier model ships, an open-source model follows about 3 months later at roughly 1/20th the cost, so he assumes intelligence cost trends toward zero.

## How Cody picks what to build, and his advice for marketers

- Business selection: he asks whether it's a problem he faces or one with search intent. Example: the domain trackableqrcode.com (about 1,200 searches a month and growing quickly). Incumbents like Bitly aren't focused on it, and buyers include restaurants and consumer packaged goods companies putting QR codes on products. He bought it intending to have an agent build the product and market it autonomously.
- He sorts ideas into a fun side project (an example: a business making about $8k a month and a possible flip) versus one with "the biology" to be a large company.
- On too many options: "a business at its core is always the simplest thing": what the market wants to buy, and how to get in front of them. Customer demand tells you what to work on.
- Advice for people early in their career: become a marketing or go-to-market engineer. He says the title has widened from cold outbound to paid ads, cold email, SEO and nurture, and someone who can do all of it at scale with agents is "top 1%." He cites a friend hired as a GTM engineer at about $650k a year.
- He says the people who made impact usually combined two deep skills, and that a weekend of tutorials can now teach paid ads, cold email and SEO.
- Cody's prediction: companies will struggle to hire this talent internally, so they'll buy outcomes. He also says differentiation is an open problem once everyone runs the same playbooks.

## Cody's background and how his marketing instincts formed

- He grew up in Coeur d'Alene, Idaho, studied economics, and says he's started more companies than he's had jobs.
- Early on he taught himself Photoshop and Illustrator, bought a direct-to-garment printer, and mined Etsy's then-public best-seller data with a script. He remixed best sellers around their target keywords and reached about $10k a month in his early 20s, running it from his basement.
- He was banned from Etsy for scraping its data. The lesson he took: he was selling commodities and needed to build a brand alongside the product.
- He learned B2B marketing over four years with a boss who had been through Y Combinator and sold digital strategy to Fortune 500 companies. His first test was a bathtub and shower-base manufacturer: he proposed a Pinterest campaign built around an e-book on putting a shower in a van or RV, and was given a test budget.
- The job taught him long sales cycles and account-based marketing.
- At Rupa Health (he was around employee nine or ten), a friend sent him the growth curve: slow 3-4% compounding monthly growth, then a steep jump. The explanation was "I turned on ads." He said yes on a Sunday, had the call on Wednesday and the offer on Thursday, and moved to San Francisco the next Monday. His principle: act when you have real signal.
