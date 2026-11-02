## Cody's definition of a marketing agent: software with a thinking loop, not "God in a box"

- Cody says "marketing agents are the new coding agents": deploying them gets customers "on autopilot."
- His definition: an agent is "code. It's maybe some thinking loop and it's a live data stream." What makes it an agent is that it does a job to be done (find leads, outbound to them, answer replies), not that it uses a particular framework.
- He rejects "everybody tried to put God in a box and give it access to a Facebook ads account." The right approach is to copy what a top human did (a media buyer researches angles, makes creative, tests, prunes losers, promotes winners) and write software that runs that exact process.
- He argues against paying token tax on every marketing action: "You should not be paying Anthropic... to do an API call. You should be paying them to make the software that uses CPU to do the API call." Use inference only when you need it.
- His view: "the only agent is a coding agent." Everything else is software the coding agent makes.
- He says agent frameworks are usually bloat for finite problems; a very simple setup works.
- The build tools are Claude Code or Codex; the hard part is strategy (who you target, why, and the tool stack).
- Deployment: take the local script and put it on a server (Railway, for example), which is "just a computer that is on all the time somewhere else," running on an hourly or daily cron. For the data pipeline and warehouse feeding agent decisions he suggests ClickHouse; his company Graft combines the warehouse and the server.
- Risk example: if an LLM agent like Hermes runs your Facebook ads freely, it may "absolutely nuke the account." Custom software that mimics a human process is safer and higher quality.
- Marketing is code: an image is a JSON prompt, an AI avatar video is an LLM scraping Reddit and writing a script, then an API call to Kai AI.

## LinkedIn engager outbound agent: sourcing leads from hand-raisers

- Context: Cody says cold email reply rates are down, and "every marketing channel is down right now" because AI slop is flooding the zone. His way to stand out is to target signals or triggers where people hand-raise, instead of firmographics, demographics or psychographics.
- The signal: someone liking or commenting on content their target customer would engage with shows interest in the topic.
- Step 1: find 10-20 LinkedIn influencers or business accounts in the niche (e.g. AI marketing, Clay) and keep them in a spreadsheet. He does this manually from his own For You feed, because the feed already shows what is relevant. The company usually already knows who its customers engage with.
- Why 10-20 is enough: there are a handful of outliers per niche and everyone engages with them. Monitoring them gives roughly "80% surface area coverage" for the industry, and the marginal return of chasing the rest is poor.
- Step 2: use Apify (a scraping API; one key covers LinkedIn, Twitter and more). He likes the LinkedIn actors from "API Maestro" because they are the most stable and maintained. The ones used are the profile post scraper, post comments and post reactions.
- Step 3: have the coding agent write a script that takes a post URL and extracts all engagers. In his demo, one post gave 63 raw profiles.
- Step 4: deploy the script to the cloud on a daily cron: pull net-new posts from each tracked profile, then extract their engagers.
- Optional LLM step: before enrichment, have an LLM research the person and company (employee count, etc.) and check ICP fit, so you only pay to enrich and email qualified people.
- Compliance caveat: he says buying contact data from data brokers is legal and "pretty far on the white hat side," but compliance rules (CAN-SPAM, EU) differ and people should do their own research. He is not a lawyer.

## Waterfall enrichment for emails and phone numbers

- Cody's rule: start with the cheapest, most accurate source and fall down to more expensive ones for the leftovers.
- Stack he names: getleads.io first (a B2B contact database with an API), then Apollo for what's missing, then tools like Prospeo or Origami (he praises Origami's team and says it aggregates the waterfall; you send a LinkedIn profile and it cascades through providers). LeadMagic is one he uses a lot, especially for mobile phone numbers.
- Worked example: of 50 LinkedIn URLs, getleads finds 32 emails; the remaining 18 go to Apollo, which finds maybe 10; the last 8 go to Prospeo/Origami. This is how you reach an "80% find rate," and you can chain as many providers as budget allows.
- Validation: run every email through MillionVerifier (good / risky / catchall / bad) and cold email only valid ones, because invalid addresses cause deliverability problems. He says to double-check even for Apollo and getleads output.
- In the demo he had Claude Code call the getleads API on the scraped LinkedIn URLs.

## Cold email infrastructure and costs

- Never cold email from your core domain. Sending e.g. 10,000 cold emails from it can "nuke the deliverability" of the business domain.
- Keep separate domains for each purpose: cold email, email marketing, transactional email (e.g. password resets), and the main business domain the team uses.
- Buy burner domains plus inboxes from Inboxkit, Instantly's pre-built inboxes, or Hypertide (the partner Cody's team uses and has a partnership with).
- Cost: about 10,000 cold emails per month for about $100/month in inbox infrastructure with Hypertide. Inboxkit pricing is similar, and it runs frequent sales.
- Sending software: Instantly, with a $97/month tier. Total to get started is roughly $200 for sending software plus inboxes.
- LinkedIn DMs: HeyReach and Botdog both have APIs and run DM campaigns from LinkedIn accounts. He also knows people seeing "incredible success" right now using LinkedIn InMail.

## An SDR in a box: an agent that manages the inbox

- Instantly's API lets an agent monitor and manage the whole account. The agent can write per-person copy and variables, which get pushed into Instantly.
- Instantly webhooks fire on a positive reply and send it to the agent on a cloud server. The agent gets a base prompt with the context and a goal: get the person to schedule a demo at your link. It answers questions and pushes them deeper.
- Long-term follow-up: program it to re-reach people who went cold, for example every six months.
- Plug in a scheduler (Calendly or Cal.com) so the agent can check whether a contacted person actually booked a discovery call, the action being optimized.
- Whole chain: find people by social engagement, find emails, write emails, decide ICP fit, send via the sending platform, then manage replies. Under the hood it is "code with an LLM attached."

## Organic LinkedIn agent: interviews to posts to scheduling to analytics

- Problem: companies (for example sales teams of seven wanting to post daily) need unique posts from many people. Cody says "write good LinkedIn content" from nothing yields mid content that wastes readers' time and risks being flagged as AI slop by LinkedIn.
- The fix is real source material: a weekly one-on-one interview ("tell me everything you've learned this week"), sales call or Gong transcripts, Slack sales channels, Notion, the codebase, or a podcast transcript. A customer saying why they did not buy can become an "unbelievable piece of content." The same works with someone else's podcast as source.
- Pipeline: transcript, then insights, then an LLM API call to write posts (Claude Sonnet is "probably good enough" for writing), then schedule via Ordinal's API or MCP. Ordinal, a partner, supports multiple connected LinkedIn accounts that can interact with each other.
- Feedback loop: Ordinal's analytics for every account feed back to the agent, so the next round of writing leans on what got impressions. He uses the words "snowball" or "remix" to push it to build on winners.
- The social media manager's job (prospect ideas, make content, publish, read data, build a recurring calendar) can be done by an agent. He says the "real meta" is one person managing 10, 20 or 100 accounts across channels with agents.
- His own content: "the exact same thing remixed every 90 days." He has posts he has reused for two years, and "every time I post it, I know it's going to go viral."

## Content and product principles: mine what the market already wants

- Cody's mindset: find ideas or winners, then reuse them as often as possible. Building a corpus of data shows what will already go viral.
- Same logic for products: ask "what do people want to buy that they currently can't, and can I build and sell it?" rather than trying to invent a new idea.
- For content, mine posts that already had a viral moment, then add your own spin or angle.
- Ad creative entropy fix: a looping agent keeps producing the same ideas. Instead, track about 10 human creators on Instagram, look for outliers, and pull new hooks or topics to remix.
- Earned media value: LinkedIn impressions cost about $22 per thousand on average, so a post with 1,000 impressions from a 500-follower account is roughly $20 of free value. "I get paid to build lead pipeline."
- Platforms also pay creators, such as YouTube, on top of the earned reach.

## Where to follow up

- Cody is active on Twitter and LinkedIn. His company Graft offers a platform for deploying these agents and forward-deploys software engineers to implement them for fast-growing companies.
- He offers to teach on request, such as direct mail at scale by scraping Google Maps, TV advertising, or cheaper LinkedIn clicks. He has a crash-course video on go-to-market engineering that covers the Claude Code setup in about 10 minutes.
