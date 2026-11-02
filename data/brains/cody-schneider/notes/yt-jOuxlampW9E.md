## Why marketing engineering matters and what it is

- Cody defines marketing engineering as having a coding agent do "all of the middle work" a marketer used to do by hand. He says it works in any harness (Claude Code, Cursor, Hermes agent, Grok bot).
- Work it replaces: writing copy, making creative and graphic design, uploading blog posts, building landing pages, researching Google Ads keywords and target customers, finding emails and loading them into cold email software, building newsletters for webinars, and monitoring competitors' ad libraries on Facebook, Google and LinkedIn.
- He has done digital marketing for 15 years, and spent the last 4 working on getting AI to run marketing operations.
- Demand signal: marketing engineering searches and job listings are growing fast, with salaries of $150,000+ a year for marketers who learn the engineering side with coding agents. He says it tracks the same trajectory as GTM engineering.
- His pitch to marketers: learn this so you still have a job 2 years from now.

## The stack an agent needs to do marketing

Cody's list of what a coding agent needs before it can act as a marketer:

- **Data pipeline plus data warehouse:** pull Facebook Ads, Google Ads, Google Analytics, Search Console, CRM (Attio or HubSpot) and Stripe data into one place the agent can query.
- **Cloud server:** an always-on computer in the cloud so scripts and agents run without your laptop being on.
- **Media storage:** an S3 bucket for images and videos (social posts, ads, AI avatars). He calls it super cheap.
- **Postgres databases:** the agent stores things like total addressable market maps for cold email, image/video queues organized by SKU, and the JSON sent to image or video models (he names ChatGPT Image 2.5 and Seedance). They should be creatable on a whim.
- **Cron jobs:** recurring tasks that run hourly, per minute or daily.
- **Artifact hosting:** shareable dashboards or pages (for example, all the ads you made, for approval). This brings in authentication so teammates can access them and the public can't.
- **Git manager:** makes the system multiplayer so several people can work on the same code without overwriting each other.
- **API gateway:** one access point for APIs that make images, find emails, make video, and scrape the web and social accounts.

His claim: once these barriers are removed, the agent "is the best marketer that exists on planet Earth."

Open-source or DIY mapping he gives: Airbyte (pipeline), ClickHouse (warehouse), Netlify (server), S3 (media), Railway (databases), a cron function on the server, Vercel (artifacts), a login database (auth), GitHub (Git), and subscriptions to roughly 40 APIs. He skips that route and uses the Graph (graph.com) marketing engineering cloud, which bundles all of it behind one CLI. The video is sponsored by Graph.

## Why you need a data pipeline and warehouse instead of calling APIs directly

- Calling platform APIs directly causes three problems:
  - Rate limits. Hitting Facebook Ads too aggressively can break its terms of service and get the ad account banned.
  - Joins. Joining data across sources inside the agent is hard, and the agent hallucinates.
  - Context. Pulling something like 50 million Facebook Ads rows and 75 million Google Analytics rows blows past token limits.
- The pattern: sync every source into the warehouse, let the agent read from it with SQL (he says modern models are very good at SQL), and use platform APIs only to write (upload media, turn ads on and off, move ads between ad sets).
- Write actions flow back into the warehouse, creating a continuous loop.
- Why multiple sources: a single source like Facebook Ads can misrepresent what is happening. He says you must tie ads all the way down to what produces revenue, and sees people miss this constantly.
- He says a small single-channel account can run on raw APIs, but any real business at scale needs this structure. After 2 years he reports companies keep arriving saying they built locally and hit these problems.
- His summary: "All marketing, everything that we're doing is now code."

## Getting a Facebook Ads API token that never expires

- Cody uses the Facebook Marketing API as the bridge for managing an account.
- Steps he walks through:
  1. In Business Settings, click Add (top right) to create a developer app and name it (for example "Graph Ads").
  2. Select the use cases: create and manage ads with the Marketing API and with Meta Ads Manager, and connect the business portfolio.
  3. Confirm the overview, create the app, and add a privacy policy.
  4. Add a system user, assign the assets it needs access to, and generate the token.
- Takes about 10 minutes and yields a token that never expires.
- Storage: he advises against keeping the token locally because it is a security vulnerability. Use a secrets manager (Graph does this automatically). He pastes the token into Claude Code and says "add this Facebook Ads API token to my secrets," then lists secrets via the CLI.
- His secrets list includes Facebook Ads, Google Ads, Instantly, and Strapi (his blog CMS).

## Making and managing Facebook ads from Claude Code

- Making a static ad: he prompts "use the Graph CLI" to make a 1080x1080 static ad through the ChatGPT Image 2.5 endpoint, with the text "Marketing Engineering Crash Course," and has it check graph.com for the design style. The tool routes the call through a provider called Kai AI.
- Scaling creative: variations come at scale, and he can specify fonts, colors, and allowed or forbidden language (useful in regulated industries).
- Uploading: he pastes an ad set URL and says "upload the marketing engineering crash course ad to this ad set." The ad appeared in the ad set after a refresh.
- Managing: he turned off an ad in an ad set by title through a plain-language request, and it was off when he checked. Uploading, pausing and moving ads all work this way, for statics and video.
- Scale claim: 100 ads, plus 100 titles and 100 descriptions based on pain points and desired outcomes extracted from Reddit via the xAI API.
- His line: "I know I personally never want to touch a Facebook Ads Library again."
- Workflow habit: run several tasks in the background at once. Once a process works, deploy it to the cloud on a schedule so he doesn't have to babysit it.

## Conversational analytics and dashboards on live data

- Because everything is in the warehouse, he asks questions across sources in one prompt. His example: how many sign-ups Facebook Ads and its pixel recorded, how much GA4 traffic has Facebook as referral, and whether branded searches (Search Console) are rising.
- The warehouse syncs hourly, which he calls real time. Agents can make decisions autonomously on top of it, and he builds dashboards for the team.
- He then asked for an artifact dashboard of the pulled data and edited it conversationally: switch charts to bar or line, show spend by month, add a date range picker.
- Artifacts get a shareable URL accessible to the team only, not public, and can be interactive software.

## Research, outbound and SEO workflows

- **Reddit research for ad creative:** extract pain points, desired outcomes and objections from Reddit threads about why someone would buy a data pipeline and warehouse tool and give Claude Code access instead of using Looker Studio or Power BI. These get clustered for ad categories.
- **UGC scripts:** from those pain points he had it write 10 AI-avatar UGC ad scripts, with hooks like "Okay, this is kind of crazy" and "I wish I found this sooner." Example script opener: "Every Monday I used to spend like 3 hours pulling CSVs..." The scripts can be read by an AI avatar or a creator.
- **LinkedIn engager outbound:** take a LinkedIn post whose engagers would be target customers, extract the engagers, and run a get-leads endpoint to find emails. The post had 69 reactions and 316 comments, and likely duplicates. In his run, 5 emails were found and 44 people had none, which he calls a poor result ("We'd typically see about half").
- **Waterfall enrichment:** for people without emails, run the cheapest provider first and work down (Lead Magic, Apollo and others, paying only for credits used). Then guess emails from about 32 pattern variations and check them with Million Verifier. He says guessing plus verification is sometimes cheaper than any enrichment provider.
- **Keyword research:** used the DataForSEO API for "versus" keywords in the customer data platform space (HighTouch vs X, ClickHouse vs X). Got 765 results, then filtered to unique search intents by dropping X vs Y / Y vs X duplicates.
- **Page-two opportunities:** with Search Console plus the SEO data in the warehouse, he found 398 keywords in positions 11 to 20 with 100+ impressions in the last 90 days, and asked for a ranked top 10 to write content for.
- **Publishing a blog post:** with Graph's SEO plugin installed and wired to his CMS, he gave a target keyword. It researches what ranks on the first page of Google, writes the article with Claude Sonnet, uploads to the CMS, and returns the URL. He notes the plugin is modifiable.

## Pay-per-use tooling and how to start

- Graph exposes about 250 tools through a unified API, added over time from workflows they identify. Examples he lists: scraping ads from TikTok, Google and Meta; finding and validating emails (Million Verifier, Get Leads); phone lookups; funding signals; news search; keyword research with DataForSEO; image creation; video creation with Seedance and HeyGen; LinkedIn profile extraction.
- Data sources: 800+ connectors (GoHighLevel, GA, Search Console, Instantly, Facebook Ads, Twilio and others).
- Pricing: pay as you go, usage-based for syncing and for API credits. He says you can start for free, and that $10 can pull roughly 1,000 emails.
- Setup: install an NPM package (the Graph CLI) by giving Claude Code the URL and telling it to install it. It bundles the pipeline, warehouse and tools.
- Plugins are installed by prompt, for example "Install the Graph SEO plugin. Help me set it up to my CMS."
- He is building a free course at gtmengineeringcourse.com, sponsored by Graph, and says he will post marketing engineering videos weekly.
