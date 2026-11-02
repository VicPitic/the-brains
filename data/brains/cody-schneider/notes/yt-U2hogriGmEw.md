## What Cody counts as a real marketing agent

- Cody says a marketing agent needs three things: unified data on the whole pipeline, autonomous decision-making on a cadence with a thinking loop, and the infrastructure to host it.
- That infrastructure is a data pipeline, a data warehouse, and agents hosted in the cloud.
- He rejects "some Zapier automation workflow that's linear". His version is "code in the cloud that's making decisions off of your live business data".
- He doesn't want a free-roaming AGI-style agent. He wants one that runs a defined process, looks at the returning data, and improves from it.
- He is skeptical of claims that an agent runs a whole marketing stack end to end.
- Where it does work today is a single channel. An agent can run Facebook ads entirely: research pain points and outcomes, make on-brand statics and AI avatar UGC, publish to the ads account, turn off losers, promote winners, and feed results back into new creative.
- He describes the result as a "virtual employee" focused on one channel.
- His view on jobs: marketers become "agent jockeys" who turn their domain knowledge into code.
- He says a semi-technical person can set this up by giving Claude Code a transcript like this one and asking it to walk them through the build.

## The data stack: pipeline, warehouse, and hosting

- **Why a warehouse:** it unifies every data source so the agent sees all channels in context with each other. For Facebook ads, Cody lists the data needed: Facebook Ads, Google Analytics, PostHog, the CRM (e.g. HubSpot) and Stripe. With all of it in one place, you can tie a specific ad to revenue.
- **Pipeline:** Airbyte is a self-hosted data pipeline with pre-built connectors that pipes sources into the warehouse.
- **Warehouse:** ClickHouse, which is also open source and self-hostable. He offers both as accessible options, not the only ones.
- **The loop:** data sources feed the warehouse, the agent reads the warehouse and acts in the channel (e.g. Facebook Ads), and the channel's results flow back into the warehouse. That cycle is what makes the system learn.
- **Conversational analytics:** the same warehouse lets an owner query business data from Claude Code or Codex. His example question: "we're having trouble hitting payroll this month, what is going wrong?" The answer might be accounts receivable. It also supports custom dashboards.
- **Hosting:** agents don't need a local Mac mini (the OpenClaw-style setup). They can be deployed to any cloud, such as Heroku or Railway.
- **What an agent is:** "just code under the hood", a decision tree over a live data stream with an LLM thinking loop, optimized for an outcome, which for most companies is more revenue.

## Facebook ads after Andromeda

- Andromeda is Facebook's ad algorithm. It reads the ad creative (image, text, video content and script) and the landing page, and uses that to decide which ad goes to which person.
- Because of this, Cody says interest-based targeting is no longer needed. Before, he would have targeted a WordPress interest.
- Now you make creative that speaks to the pain points or outcomes of the buyer, then send people to a landing page that explains the product.
- He claims "Facebook has turned into the best B2B ads channel that exists right now". Very obscure ads, possibly relevant to only about 10 people in the US, still get found and produce qualified B2B leads.
- Set the conversion event on a deeper funnel action such as signup or payment.
- Sample script angle for the WordPress idea: "I used to be paying my agency a thousand dollars a month to maintain my WordPress site... I just found this plugin that makes it so I can chat with AI to change my website and it includes all these plugins I used to pay extra for."
- He argues for paid ads over relying on organic or word of mouth. You can test a thousand creatives and know within 48 hours what the market responds to.
- He calls it the one system where "I put a dollar in and $5 can potentially come out the other side".
- Founders shouldn't impose positioning on the market ("we're not Don Draper"). Put creative into the market and let the data pick. He also says a competitor-negative angle (an "anti-Yoast" ad) might work and is worth testing.
- Quitting after a few ads is a common mistake. Marketing is continuous, not campaign start/stop, because trends now move roughly 10x faster than 20 years ago.

## The creative pipeline for an agent-run ad account

1. **Research:** scrape Reddit for pain points and outcomes of the target customer. He used Perplexity live in the demo. Reddit works because it is real people complaining, though he notes it is being eroded by people manipulating it for LLM ranking.
2. **Rank:** have the model rank the most-referenced pain points and make the top ones the ad themes. In his WordPress example the top pains were plugin sprawl, performance and speed, and security and maintenance.
3. **Statics:** use Kai AI, which puts the image and video models in one place, with Google Nano Banana for images. Feed it an existing ad from a competitor or adjacent industry as the example to adapt.
4. **Brand check:** run a vision model over the outputs to check brand style guides (fonts, colors, readable text).
5. **Video:** HeyGen for AI avatar UGC still gives great results. He is testing Seedance, but stitching it into 30-second videos is hard because clips are capped at roughly 9 seconds (he says not to quote that exactly).
6. **Publish:** use the Facebook Marketing API, with the constraint below.
7. **Judge:** turn off losers, promote winners, and feed what worked back into creative.

## Facebook API rules, test cadence, and the winners pool

- **API TOS:** accounts get banned for spamming the API by pulling "hundreds of millions of rows" of data from the ads account, not because an agent was used. Cody's rule is to use the Facebook API only for writes (publishing, turning off, promoting). Read performance data from the warehouse instead.
- **Example cadence at a client:**
  - 2 ad sets per day, 5 ads each.
  - Ads upload automatically based on prior research and warehouse data on what has worked.
  - Let them run 2 to 3 days to get initial signal, then turn off the worst performers.
  - Winning ad sets go into a winners pool and compete for the available budget.
- **Learning from creative:** he keeps a database of every ad made, including the JSON prompts sent to Nano Banana and the scripts sent to HeyGen or Seedance. The agent analyzes this to get better at making creative that produces outcomes.
- Human in the loop is fine at the start.
- The time claim: producing around 100 ads and getting them into Facebook was about 2 weeks of work historically. Now a founder can have the system running in roughly an hour and a half.

## Solving entropy so the agent doesn't stagnate

- Entropy is when "the agent gets stuck thinking in the same way". Cody says people who claim set-and-forget agents "have never set up anything", since results feel good on day one and degrade after.
- **Fix 1:** pull competitors' ads from the Facebook Ads Library to inject new "DNA" alongside the original research.
- **Fix 2:** pull YouTube and podcast transcripts and extract insights from them. For WordPress there are hundreds of channels. Run ads off the aggregated insights.
- **Fix 3:** use a trend tool such as Viral Loop (it has an API and scrapes TikTok, and possibly Instagram Reels, which he isn't sure of). Ask for the most viral posts in a category over the last week and use the formats and concepts to shape creative.
- Because the market moves fast, he says you need observability of what is happening and must keep adjusting ads, positioning and go-to-market. Short-form social is where trends originate before they trickle down.

## Business idea: AI for WordPress, and where agents would go

- **The idea:** "Lovable or Anything.com but for WordPress". Users vibe code their site on the WordPress platform.
- **Bundle:** the product includes forms, a CRM and the other plugins people normally hodgepodge together. Cody argues the aggregate of about 10 plugins is replaced by one package at a tenth or fifth of the cost.
- **Pricing:** token-based. His example is a base tier at $29 a month for a set amount of tokens.
- **Why this market:** he says no one is building for WordPress. He cites that 43% of websites indexed by Google are WordPress, calls it "blue ocean", and says he has pitched it to three founders who got into YC and didn't know what to pivot into (they passed).
- **Go-to-market:** Facebook ads and Google ads first.
- **Other agents he says he can build or has seen:**
  - Google Ads agents that run the account end to end.
  - Influencer outreach: research influencers, cold email them, negotiate pricing, and flag good ones.
  - Cold email: find customers and their emails, send, and manage the inbox to book meetings.
  - TikTok reel farms: about 10 cloud accounts posting slideshows about the product, with views aggregated.
  - SEO: keyword research, research, writing on-brand with a distinct point of view.
  - AI search: build citations and do outreach to get listed where AI answers already cite.
  - Social management for LinkedIn and Twitter.
  - Podcast-based newsletters: research, write the script, read it with ElevenLabs voices, and build lead magnets to grow the email list (his example is an e-commerce industry).
- He mentions companiesgraph.com as where his team does this work.
