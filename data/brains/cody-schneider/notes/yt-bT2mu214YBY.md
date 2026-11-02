## Cody's core shift: hand off the "middle work" to agents via Claude Code and APIs

- Cody's framing: everything between an idea and the final polish is "middle work" he now hands to an agent. His job becomes curator: idea in, polish out.
- Setup takes about five minutes: make a folder on a local machine, run Claude Code inside it, add an environment file holding the API keys for the whole stack (Shopify, Google Search Console, Facebook ads, Google ads, Klaviyo and so on).
- He works conversationally with Super Whisper (a transcription app), "jockeying" about five agents in the background at once.
- Definition: "agent" = an employee with a small scope of work that does one specific thing. Once he sees a repeatable task, he ships it as an agent.
- Prompt the outcome, not the steps. Tell it "I'm trying to make this outcome," then "make a plan or ask me questions if you need more context." Prescriptive instructions are the biggest learning curve for newcomers.
- To find what to automate, audit what you did this week that matched last week, then ask Claude "can I make an agent out of this?"
- Over time the folder accumulates CLAUDE.md files, workflows, company descriptions and goals, so it becomes a knowledge base of how he thinks about the business. He can ask it "what am I not thinking about that I should be?" for blind-spot analysis.
- Timing claim: everything he describes happened in about six weeks. Eight weeks earlier he'd have said "agents are bullshit."

## The Facebook ads agent loop (and why it needs a data warehouse)

- About a week from the interview he expected an agent to run his Facebook ads end to end:
  1. Research social for target-customer pain points and desired outcomes.
  2. Make creative: Nano Banana, plus writing React code and exporting it as a PNG.
  3. Upload the ads to Facebook.
  4. Analyze performance. Losers are turned off automatically; winners are promoted into their own ad sets with dedicated budget.
  5. Results feed the next round of creative, and the agent searches the internet for more context. "It's just a loop."
- Why agents fail when they hit APIs directly: rate limits, pagination (the agent thinks it sees everything but sees about 5%, so it decides wrongly), and context-window bloat from pulling in something like a million Shopify rows.
- His fix, and the reason his company Graph exists: build a data pipeline and warehouse, plus an AI data analyst agent callable over MCP from Claude Code.
- Of roughly 25 "we'll run your Facebook/Google ads automatically" tools he reviewed, he saw only one using a data warehouse. A client spending $180K/month on Facebook ads couldn't pull their data through the API in any useful way.
- The stack for an ecom founder: bulk creative generation (Veo 3, Sora 2, Nano Banana plus a brand style guide), then a Facebook Ads API key, then pipeline, warehouse and agent access to the data.
- Tip: create a developer-only Facebook app so you skip Facebook's authorization/credentialing process for internal use. Ask Claude to walk you through getting the marketing API key.
- Claim: you never need to touch the Facebook ads dashboard again.

## Boundaries beat instructions, and vocabulary is the superpower

- Cody says it is easier to list "all the nos" than to say "agent, do this." The nos create the surface area where "yes" lives, and output improves. Companies find it hard to name their lines in the sand.
- Agents have moved from linear workflows to circular loops, which he compares to a cockroach: feel around, get stimulus, react. Do things, analyze what works, do more of it, repeat.
- Domain vocabulary is the leverage. "Write a blog post about X" gives mid content. Instead specify a persona ("top 1% direct response marketer who writes at the intersection of educational content and sales"), the product details, pain points and outcomes, and the customer persona, and the output is top tier.
- Same for ads: knowing Facebook terms lets him say "spin these up in a new ad set under the conversion campaign titled XYZ, this campaign ID, this conversion event."
- His expertise (seven years of go-to-market and growth) now lives in a GitHub repo that the team can query for context on why initiatives exist.
- Models are idiot savants: the language and deep technical knowledge you have becomes the most valuable asset.

## Cold email PR sprint: 2,000 podcasts, 35 booked calls

- Workflow built entirely by Claude Code: researched 2,000 podcasts, scraped their emails, validated them with MillionVerifier, loaded them into Instantly AI, and cold emailed them.
- A reply agent's goal was to book an intro call with him.
- Results: 112 positive responses from about 2,000 outreach, 35 calls booked in a week. "I was like, 'Fuck, this worked too well.'"
- Problems found: the agent dropped the ball on 90 replies, people noticed it responded instantly and called it a bot, and it agreed to buy a guest two of his books so Cody could come on the show.
- Fixes: a response delay (pick a random time between 45 and 60 minutes), plus iteration as feedback comes in.
- His lesson: skip no-code. "Friends don't let friends use n8n." Code is more malleable when you build personal software and agents and need to adjust from real-world feedback. It is faster for him to modify an agent in code than in a no-code tool.

## LinkedIn content to lead gen agent workflow

- During a company growth sprint, he posts how-tos (example: GTM engineering with Claude Code) and lets posts go viral before building the supporting Notion document.
- He got tired of writing Notion docs, so he gave Claude his Notion API key, built the tutorial doc structure together, then had it turned into a reusable skill.
- The flow now: here's the post, build the Notion doc, then hand it to another agent that comments back with the document, which becomes lead gen. He says this replaces work that would take multiple virtual assistants.

## How to roll this out to a team and incentivize adoption

- Easiest first exercise for a team: brainstorm an email, write it, publish it as a draft in Klaviyo, all through Claude Code. Seeing it happen is the "holy shit" moment.
- Token quotas don't work: people just paste a spreadsheet into a column to hit the limit.
- What works: spotlight whoever builds something good. Example: Trevor builds a crazy workflow, gets a 30-minute fireside chat where he walks through it, and the boss amplifies it. Status in the community drives other people to adopt. Time off or more money are other levers.
- For employees: bring your own agent stack and personal software. A friend got poached partly because he had his own agent stack and could be productive on day one, which gave him salary leverage. "You're not hiring me, you're hiring me and all of the agents."
- His belief: he may never hire go-to-market people again, apart from an account executive who only hunts whales. Agency work like SEO at $35K/month can be done in about two hours with Claude Code, data access and publishing access to Shopify or another CMS.
- For freelancers: someone who learns this and approaches ecom brands could make $80K/month doing the work of hundreds, especially with repeatable processes like making, publishing and analyzing ads.

## Software buying: API depth beats UI, and switching costs collapse

- His team picks software by how robust the API is. If an action works as a button click in the UI but not via API, "I'm not going to use that product. Full stop."
- This flips the old dynamic: Salesforce was clunky, so people chose HubSpot for its UI, but Salesforce's deep API is now an advantage.
- He and his team asked whether they should even build a front end for Graph, or build backend infrastructure as a tool for the customer's agent.
- Example: his brother, in healthcare, hated Mailchimp (about 120K list) and migrated everything (context, flows, campaign templates) to Klaviyo in a weekend, via APIs, with no downtime. The agent audited the account structure afterward and caught that the form wasn't connected to Klaviyo. Switching costs that once blocked such moves have collapsed, so the best software on API and capability wins.
- Prediction: go-to-market will be run by agents by the end of the year for the most sophisticated companies. The founder's job becomes building the right product.
- Cost-of-intelligence point: three months after Opus 4.6, an open-source Chinese model (he says it identified itself as Opus 4.6) shipped at a hundred-twentieth of the cost. He treats tokens as abundant and tries to "unbound" his constraints.

## Data analysis use cases and why ecom is positioned well

- Example: a store with about 20,000 SKUs (wedding cups) could not see in Shopify which SKUs sell best or grow fastest. With data access, 10 of about 500 top SKUs drove 80% of revenue, half of them had no ad spend (organic only), and the agent was told to shift ad budget to them.
- SEO example: with a catalog of 10,000 items, ask which collection pages to build from product cross-sections, giving Claude Shopify, Search Console and Google Analytics access, and request an action plan. A two-hour deep dive into a 17% traffic drop surfaced about 100 hours of manual-equivalent analysis.
- Data-team bottleneck anecdote: a leader at a large brand whose SEO drove 20% of revenue waited 3 to 5 business days per data request. This was the origin of Graph. Data engineers cost roughly $180K to $250K, so small teams can't afford them.
- Postgres and servers: he uses Railway (strong API) to spin up servers and Postgres databases for agents and data analysis, and can harden servers for security.
- Why ecom fits: transparent unit economics make agent loops easy to measure. In software, "everyone is building things people don't want" because engineering used to be the constraint; ecom has physical constraints and knows how to sell what the market wants.
- Remaining question he flags: when every brand can do this, differentiation comes from each company's unique skills and product.
