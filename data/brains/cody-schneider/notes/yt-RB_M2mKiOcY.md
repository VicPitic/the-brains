## Environment file as the foundation for a growth-agent workspace

- Cody starts by creating one folder he "lives out of" (his is called "Graft Growth Agents"). All work starts there.
- First file: an environment file holding API keys for every tool in his daily go-to-market stack: Intercom, SendGrid, HubSpot, cal.com, Perplexity, Facebook Ads, MillionVerifier, Instantly, Phantombuster and others.
- The point is to interact with everything he does day to day through APIs, from a single repo (just a folder of files), with Claude Code doing the work.
- Recommended extras: a transcription tool like Super Whisper so he can speak his instructions instead of typing, and optionally the Claude Code front-end design skill so generated UIs look decent.
- He shows a blank "demo" folder he wipes before each presentation, to demonstrate going from zero to one.

## Buying software based on API quality (APIs over UI)

- Cody now evaluates software mainly by how robust its API is. A friend told him Salesforce, though a clunkier CRM, is the better foundation for AI than HubSpot because its API lets you do more.
- He is close to churning a tool because something critical can be done in its UI but not its API: "it feels archaic for me to go and interact with your UI."
- In his view the UI/SaaS becomes the nice-to-have; what matters is the output, and agents running 24/7 against the API.
- His company Graft debates whether to build a UI at all, or just the tooling that works inside any harness (Claude iOS, ChatGPT desktop, Claude Code, Cursor) and gives the same outputs everywhere. Its MCP serves a live data feed from the warehouse, e.g. "show me my Google Ads and Facebook Ads paid ad spend", usable by the whole team.
- He is losing sleep over how agents discover and pick your infrastructure when they build something.

## Running many Claude Code instances in parallel ("agent jockeying")

- Cody runs a separate Claude Code window per project, starts each in plan mode, then moves on to the next while it works. In the session he had about ten going.
- Workflow: describe the job by voice, put Claude in plan mode, answer its questions, let it run in the background, check back.
- Examples running at once: a LinkedIn auto-responder, a bulk Facebook ad generator, a podcast outreach pipeline, a LinkedIn engagement scraper, a Notion giveaway doc writer, a dashboard builder.
- A LinkedIn responder agent (using the Claude Chrome extension and a custom skill) replied to everyone who asked for his email-triage giveaway asset, with the Notion doc link, and ran about 15 minutes unattended.
- Downside he admits: context switching between windows is hard ("what was this one doing again?"), and he is considering a new computer for more RAM. He has worked this way for about six weeks, starting at 2-3 windows and now comfortable with far more.
- His framing of GTM engineering: the term was coined by Clay for cascading data-enrichment workflows for outbound. He sees it as everything that used to be "middle work" at the keyboard now passed to an agent harness. His job becomes having ideas, handing them off, and polishing the end product.

## Bulk Facebook ad creative generator built from React components

- Format: 1080x1080 images, built entirely as React components and exported to PNG with html-to-canvas, with a UI to preview and a downloadable zip.
- Finding a starting template: browse the Facebook Ad Library for competitors' ads in your category. His template came from a before/after format he found there.
- Messaging comes from research: he has Claude (via the Perplexity API) pull pain points and desired outcomes from Reddit, YouTube and Twitter, e.g. growth marketers who can't get analyst bandwidth, find BI tools too complicated, or can't unify data in one place. Ads speak to pain points and sell outcomes.
- Cost: roughly "a thousand tokens" to produce many variations; "we can create a thousand ad variations right now and it literally costs nothing."
- Why code instead of Nano Banana: Nano Banana images can drift off-brand. Code gives a fast way to test messaging angles. Once an angle wins, remix it into other templates or formats (e.g. a UGC video via the HeyGen API). For bulk Nano Banana generation he points to Kai AI.
- Strategy: find the winning format or angle first, then remix it a thousand ways.

## Bulk-uploading, analyzing and pruning Facebook ads with agents

- Steps shown: generate variations, tell Claude to bulk upload them as drafts into a given Facebook ad set via the Facebook Ads API, build a dashboard in Graft (clicks over time, cost and CPC lines, spend and click scorecards, impressions by age bar chart), then pull ad-level data through the Graft MCP and pause the worst performers.
- Example: he pulled ads with the highest CPM and told Claude to turn off those ads by name using the Facebook Ads API.
- Why a data warehouse: he argues a direct Facebook Ads MCP hits pagination and rate limits, and people end up seeing "only like 5% of the data that I think I'm actually seeing." With volume, analysis without a data pipeline and warehouse isn't possible.
- Where he is taking it: a test campaign constantly trying new creative; a daily cron that turns off low performers; winners promoted into their own ad sets with a dedicated CPA budget; a dashboard tracking it; and a morning chat briefing on KPIs (e.g. yesterday's homepage users via the Graft MCP plus GA4), including from his phone.
- He frames this as an early version ("weeks of realization") of autonomous marketing running 24/7.

## Cold email pipelines: podcast outreach and LinkedIn engager scraping

- Podcast booking pipeline: scrape podcast host emails (from Rephonic, in the marketing category), verify them with MillionVerifier, push them into an Instantly campaign, then have an agent respond to replies and book him on the podcast. It "ends up turning into way better performing than I expected."
- LinkedIn engager pipeline: a Slack command (`/linkedin post`) where anyone on the team drops a LinkedIn post URL. It uses the PhantomBuster API to extract engagers, enriches the profiles with the Apollo API, verifies emails with MillionVerifier, and adds them to an Instantly campaign.
- Instantly is the cold email software in his stack. The manual workflows he used to run are now daisy-chained APIs built by Claude.
- He describes an always-on agent that crawls LinkedIn for his ICP, enriches, writes a personalized email and cold emails them.

## Deploying agents and on-demand infrastructure with Railway

- Once a workflow works locally, he tells Claude Code to deploy it to a server on Railway (or Vercel) so the team can use it and it runs in perpetuity, e.g. the LinkedIn queue where teammates drop posts that flow into cold email.
- He found Railway's API robust and picked it because he saw a tutorial.
- Example of throwaway infrastructure: instead of downloading data into Excel and building pivot tables (about 5 hours historically), he had Claude spin up a Postgres database through the Railway API, loaded the data, analyzed it with Claude, pushed the outputs where he needed them, and then spun the database down. Done in about 20-30 minutes.
- His takeaway: "on the fly UIs, on the fly databases, on the fly software" will become standard for people at the forefront. He emphasizes custom jobs-to-be-done workflows rather than giving a general agent access to everything.

## Domain knowledge, vocabulary and who wins from AI marketing

- Cody's point: just because something can be built doesn't mean you can build it, because you may lack the vocabulary. His co-founder Max gets top-1% output from coding agents thanks to precise technical vocabulary.
- Example: he couldn't describe a TV-like texture for an ad background until he found someone's description with the right terms, after which it one-shotted. A designer with 20 years of experience would have the same edge in design.
- He believes the old "deep T with one or two skills" still applies, amplified: deep domain expertise plus these tools is what makes people valuable.
- A hosted question about his predictions: he expects rapid, real job loss. He cites a startup founder friend planning to cut 50 people (about 70% of the team), believing agent swarms can do their jobs. His definition of an agent swarm: agents doing specific tasks with an agent managing the system, which he says he has already built.
- He is excited because domain experts become far more capable.
- He is building a free, public course at gtmengineeringcourse.com, with a waitlist of about 100, documenting his step-by-step process. He also mentions Chrome extensions one-shotted by Claude Code and an agent that ran an Etsy shop until it was banned.
