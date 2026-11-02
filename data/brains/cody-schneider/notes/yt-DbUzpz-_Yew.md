## Why Facebook ad agents work now (Andromeda)

- Andromeda is Facebook's AI system for choosing which ad shows to which person. It rolled out from late 2025 and had a bigger impact in the first quarter of 2026.
- Targeting is no longer interest-based. Cody says "the ad creative itself is actually the targeting mechanism." The ad and the landing page are the signals Facebook uses to pick the person.
- So the job is to hit as many personas as possible with many different ads, giving Facebook the "firepower" to find the right person.
- Cody has managed Facebook ads almost entirely through Claude Code for four months, then built an agent that runs the account: researching, making and publishing ads, turning off losers, promoting winners.
- Example result: a company selling to financial advisors cut cost per lead from about $100 to $53 over four weeks.
- The loop: publish more ads, let Facebook prospect for winning formats, trim the losers ("survival of the fittest"), put maximum budget behind winners, then remix the winning formats and repeat.

## Conversion tracking and the analytics stack

- Install Google Tag Manager once in the site head, then deploy all tracking pixels through it. Create custom events (form submit, signup, payment) pushed to the data layer, and send them back to Facebook as conversion events.
- Data sources to unify: Facebook ads, Google Analytics or PostHog, and the CRM or CMS (WordPress, Shopify). Cody likes PostHog because it shows multi-touch paths, e.g. a user came from a Facebook ad, left, then two days later googled the brand. Google Analytics would call that organic.
- Start the conversion event up-funnel and move down toward revenue as volume grows. Example from a content repurposing software company: signup, then "uploaded a recording," then payment.
- Why not start at payment: Facebook needs enough conversion volume to learn who becomes a paying customer.
- Don't track everything. Pick one or a few leading indicators; more than five is typically too much.
- Cody has treated everything on the call as work for a coding agent: Google Tag Manager has a robust API, so Claude Code or Codex can walk through and do much of the setup. He suggests giving the transcript to the agent.

## Real-time lead qualification with server-side events

- The "lead quality was terrible" problem happens because the algorithm optimizes for the form submission, not for the right person submitting it.
- Fix: use the Facebook Conversions API to fire a server-side event only for qualified leads.
- Example: a manufacturer with roughly four-week deal cycles. Waiting for closed-won would delay feedback by four weeks, so the agent enriches the lead in real time instead. Apify's SimilarWeb endpoint is used to check site traffic as a proxy for business quality.
- Enrichment signals by business type:
  - Consumers: zip code of the address.
  - B2B: CRM used, headcount.
  - SMBs: number of Google reviews and review velocity.
- An agent scores the lead 1 to 10. Above a threshold (e.g. 6) it counts as a good lead and the event is sent back to Facebook. This works the same for Google and LinkedIn.
- To build the scoring "shape," take the best closed-won customers (the manufacturer supplied 2,900 best customers), study secondary signals such as website traffic and branded search volume, and score new leads against that profile. The yes/no score happens within seconds.
- Cody finds waiting on closed-won sync unreliable. Some friends swear by HubSpot deep-funnel optimization, but he prefers faster learning cycles.

## Researching pain points and making the creative

- Source messaging from the language customers already use in public forums, not guesses. Prompt a research tool to scrape Reddit for pain points and desired outcomes. Example phrases found for an AI WordPress design product: "inconsistent page builders," "overwhelming themes and builders."
- Cody demoed this in Perplexity. In production he uses the xAI API (generous free tier) wired into Claude Code, Codex or Cursor.
- Statics: Google Nano Banana through Kai AI, a single API reseller for frontier image models (Nano Banana Pro, GPT Image 2, etc.). At his volume and price point Nano Banana is "more than capable."
- Solve the cold-start problem by mining competitor ads from the Facebook, Google and LinkedIn ad libraries. Send those images in the prompt along with your brand style guide (fonts, colors, logos).
- AI avatar UGC video: HeyGen avatars plus 11 Labs voices, which he finds much better than HeyGen's own voices. Use the public UGC avatars in HeyGen and pick a voice that matches the setting.
- Seedance is being tested for video but is more expensive.
- Process: test with cheaper models, then use more advanced models once a winning format is found.
- Scripts: give Claude the product, the top hooks and the Reddit pain points, and ask for UGC scripts. These are sent to the HeyGen API. Because the scripts use customers' own complaint language, he finds them strong.

## Facebook Marketing API setup and safety

- The Marketing API is the bridge for uploading creative and managing the account (turning off losers, moving ads between ad sets). Bulk uploads include creative, headlines and text.
- Don't make a public app and submit it to Facebook. Use a developer app with a token for your own account.
- Setup steps:
  - Go to business.facebook.com, open Apps in the left sidebar, and create a new app (upload policy and terms, publish it as a developer app only).
  - Create a system user.
  - Assign it the app, the Facebook page, the ad account and the Instagram account.
  - Generate the system user token, which does not expire, and give it to the agent.
- Don't use the API for analysis. Hitting it with many simultaneous calls risks violating the Marketing API terms of service and getting the business or ad account banned. He says "it's not because they're against a coding agent," it's API abuse.
- Agents pulling data through the API also hit hallucinations, truncation and pagination errors.
- The rule: the API is for writes only; all analysis queries the data warehouse. Cody says he has had no issues doing it this way and calls the "agent use will get you banned" rumor false.
- The Facebook MCP exposes only a handful of endpoints (as of about four weeks before) and can break at scale. The API covers everything the UI does. A Facebook CLI exists but he hasn't used it much.

## Campaign structure and the testing/winners loop

- Testing campaign: multiple ad sets tested at once, with about five ads per ad set competing for budget.
- Facebook now identifies the winner itself and sends most budget to it. Winners can show in about two days to a week, depending on budget and cost per action. At $100/day and $5 per signup you learn far faster than at $100/day and $70 per action.
- Move winners into a winners campaign, where they compete against each other. Watch for ad fatigue (the audience has seen it so much it stops producing).
- Every ad has a shelf life, shorter under Andromeda and especially in B2B. Push budget until marginal returns diminish.
- Remix winning concepts into new variations and feed them back into testing, forming the learning loop.
- Optimization events can differ by campaign. Cody has prospected on signups and run the winners campaign on a deeper event like demo booked or payment. He has also run demo-booked and form-submit campaigns side by side with the same creative and saw no big quality gap, though demo bookers are higher intent. Lean toward demos for sales-driven motions, signups plus in-product action for product-led growth.
- Entropy problem: left alone, the agent keeps producing similar creative. Inject "new DNA" from competitor ad libraries and tools like Viralo AI (API for trending TikTok, Instagram Reels and YouTube Shorts).

## Data warehouse, deployment and budgets

- Pipe Facebook Ads, Google Analytics, CRM and other sources into a warehouse through a data pipeline. The agent queries the warehouse (conversational analytics, live dashboards) and writes to Facebook through the API.
- Open-source option: Airbyte as the pipeline and ClickHouse as the warehouse.
- Why not Supabase: it is Postgres, not built for analytical queries. With 100 million rows a query could take minutes versus milliseconds in ClickHouse. You'd also have to handle rate limits and de-duplication of overlapping chunks. Facebook ads alone has about 42 tables with hundreds of columns.
- An agent is "just software with a thinking loop with some type of live data stream." Deploy it to a host like Railway on an hourly or daily cadence.
- DIY effort: roughly two weeks for a monkey-patched usable version, four to six weeks to be enterprise-ready. He found the open-source pipeline and warehouse "an absolute pain to manage." Many CTOs won't hand over Snowflake access either.
- Cody's company, Graph, deploys this agent in five business days (and agents for Google ads, SEO, AI search, social, cold email), and just launched self-service infrastructure.
- Budgets to get signal:
  - Cost per lead examples: about $30 for an SMB seller, about $80 per demo booked.
  - Local business: about $30/day, enough data in roughly two weeks.
  - National: about $100/day to get moving.
  - The goal at the start is just signal, then remix the winners.
- For small budgets, Cody still recommends setting up the API key with your local Claude or Codex so uploading creative (which he says is about four hours of work for 10 ads) isn't manual. Move to a cloud agent once it works, since the work is continuous.
- Attribution tools like Hyros audit each channel's claimed conversions. Cody calls attribution "an unsolvable thing" and says marketing is about building "digital gravity." He expects media management autonomy to come to every platform, but notes ad platforms' incentives are misaligned with advertisers.
