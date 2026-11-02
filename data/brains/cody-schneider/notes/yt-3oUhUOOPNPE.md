## Cody's definition of GTM engineering and how it has evolved

- Cody says GTM engineering started around 2023 as an outbound discipline, and Clay solidified it as a job function. The idea was to treat distribution as trackable, attributable systems and processes rather than one-off campaigns, like a software engineering function: weekly sprints, analyze the data, repeat what works.
- He says it has since expanded to everything: outbound, inbound, paid ads, SEO, organic content. It now covers sales, marketing, customer experience and revops.
- He argues the name is just a new label for the same person who has existed for 10-20 years (growth hacker, head of growth). The job is unchanged: find marketing and distribution arbitrage, nail the positioning so the audience is receptive, build processes to execute, and put data analysis on top to track it. Only the tooling changed.
- Some teams are building these systems into the core company codebase, so a side project (e.g. one running the whole blog and organic content strategy) becomes an agent that works continuously in the background.
- On his career leverage: "you're a person with 30 agents behind you." You bring your own personal software and systems to a company, which is a salary-negotiation lever.
- His claim: what one person can do in a day with Claude Code, APIs, GitHub, Railway and skill files is what a Fortune 500 team would do in a year. He says he's done more work in two weeks than in the period since October. He is explicit that he is sharing what he's experimenting with and seeing work, not claiming universal results.

## Setup: how Cody works day to day in Claude Code

- He keeps one local folder (in Documents) that he lives out of, deliberately unorganized ("it works for me").
- First step: create an environment (.env) file holding the API keys for every tool in the stack. Claude Code uses these to interact with each tool.
- He `cd`s into the folder and starts Claude Code. Claude understands the file structure and prior work in it.
- He spins up multiple Claude agents in separate desktops/workspaces and moves between them while others work. He calls it "jockeying" agents. Alex frames it as multi-threaded work, not multitasking.
- He dictates prompts with Super Whisper (voice transcription).
- He uses plan mode for new builds: Claude asks what it needs (API keys, permissions) and walks him through where to get each one. Errors are fed back to Claude, which loops to fix them (e.g. reading Railway logs to fix a failed deploy).
- Claim: you don't need engineering knowledge, just clear thinking. If you don't know something (what an API is, how to get one, how to share a tool), ask Claude.
- He installed a Claude Code UI design skill (search "UI design") to improve visual output quality.
- He found most tools via Twitter and YouTube, where this is happening in real time. Practical method: ask Perplexity "what are the five best tools for X." He says there's no good educational material and the meta changes weekly; everything he showed happened over the previous two weeks.
- He used to build workflows in n8n but now skips it and writes code directly. Example: a post-sales-call workflow where a Notion recording triggers a follow-up email draft, run from Slack. He gave Claude his Railway API key and it set up a Node Express server, deployed the software and pushed the repo to GitHub.

## Bulk Meta ad creative: template, research and testing

- Build: he gave Claude an example ad and had it make a bulk ad generator in about 20 minutes (the template took roughly two prompts; the bulk generator took more back and forth). Design is just code, so the ad is a React component exported to a downloadable PNG with the HTML-to-canvas library.
- Variation workflow:
  1. Use Perplexity to find the pain points and desired outcomes of the target buyer (his example: an AI data analyst for GTM teams), pulling in real Reddit conversations so the copy uses the customer's own language.
  2. Feed that into Claude: "brainstorm 40 ad titles and supporting paragraphs based on the source material."
  3. Claude bulk-generates a zip of image variations.
  4. Upload to Facebook Ads. He was still building the connector so Claude Code can upload the zip into a specific campaign (as drafts), edit destination URLs and subject lines at scale, and tell him which ads perform best.
- Why: he doesn't know what will work, so testing angles is how he finds the positioning the audience responds to.
- Test structure (his way, "a million ways to do it"):
  - Test all creatives against each other in a click campaign, about $100 over three days.
  - Pick the lowest-CPC winners, which he says is historically a leading indicator of cheaper cost per action later.
  - Move winners into their own conversion campaign with a dedicated budget.
  - Goal: test around 200 creatives a month and always refresh the ads platform with new winners. Google Ads works the same way, tracking keywords that produce conversions or the cheapest CPC.
- Example results he showed: CPC of 30 cents on a winner versus 53 and 85 cents on others.
- He says spend so far is small: the company is early stage and he settled on its positioning about two weeks earlier, narrowing from "AI business intelligence software" to "AI data analyst for GTM teams" for 10-50 person companies that don't want to hire a data engineer.
- Remixing winners: take a winning message and recreate it in other formats, e.g. bulk UGC ads via the HeyGen API. His loop: generate ads in HeyGen, test, take the winner and try to make a better version in Veo 3 with the same script, and only then hire a human to read the script if needed.
- On quality: "the concept is what you're testing"; the medium can change. Creative doesn't need to be perfect first; humans can polish winners later. He says AI avatar UGC ads have been among his best performers and he moves faster than when a human is in the loop.

## Landing pages at scale with Strapi and Claude Code

- Stack: Strapi, an open-source, self-hostable CMS with an API endpoint, used for graft.com. He creates content formats in Strapi and Claude Code hits the API to create and upload blog and landing page content. Any CMS (e.g. WordPress) would work; he chose Strapi because it scales cheaply (he cites a possible 100,000 blog posts).
- Landing page template: a copy of the homepage where only the title (H1) and supporting paragraph in the hero change.
- Reason: aligning the ad with the landing page it sends to increases conversion rate, because the funnel feels cohesive.
- Two sources of angles: winning Facebook ad angles, or keywords that convert in Google Ads (the ones creating signups or payments). He used to do this manually; now Claude does it in bulk.
- Keyword demo: use Keywords Everywhere to pull long-tail keywords for a topic (his example: "AI dashboard generator"), download them, and tell Claude "make a landing page for each of these." Seven pages were created in draft mode with URLs to review before publishing.
- Indexing: have Claude find the sitemap, submit it via the Google Search Console API, and for pages not getting indexed use Google's web indexing API to manually request indexing.
- He can also test different landing page formats against each other without engineering resources.

## Blog content quality: interview yourself plus SERP scrape

- He says "write a blog post about X" yields "the most average thing you've ever seen."
- His fix: record a roughly 10-minute monologue of his own opinions on the topic and use the transcript as source material. Also scrape what ranks on page one of Google and add that as source material. Then ask for a post using both and the vocabulary from the transcript. He says this lands output in the top 10% to 1% of quality.
- Same principle for design: the hard part is having the language to describe what you want. Example: he didn't know to say "grain overlay" (an SVG grain with adjustable opacity) and kept asking for "texture." He says domain knowledge is the real bottleneck, which is why experts get more out of these tools. His technical co-founder describes outcomes with far deeper vocabulary.

## Cold outbound and LinkedIn engager workflow

- Cody calls cold email "super underrated": scrape data from the internet and send customized bulk email at scale.
- Infrastructure: Hypertide.io for domain and inbox setup. He runs about 2,000 inboxes inside Instantly and several campaigns at once. Current campaigns: pitching himself to podcasts, pitching YouTubers for creator/influencer marketing, and traditional cold email to his ICP.
- Live build, from one prompt in plan mode: take engagers from a LinkedIn post, enrich them with the Apollo API, validate emails with MillionVerifier (to avoid damaging sending domains), and add them to an Instantly campaign. He says the workflow is built in about 20 minutes. He tells Claude to read keys from the .env file and ask for any it's missing. He also names PhantomBuster for scraping LinkedIn comments and engagers.
- He extends it into a Slack command (a `/linkedin`-style slash command): drop a LinkedIn post URL from his phone and the whole pipeline fires into the cold outbound campaign.
- Sourcing ideas: use Apify or RapidAPI to extract the most viral content in the category automatically. He is building a version that scrapes LinkedIn engagers on incumbent competitors' CEO posts, treating people who engage as a signal that they're in a buying motion, then reaching out to them.
- Lead gen assets: he wrote scripts and software to give away as LinkedIn lead magnets.

## Data analysis is the bottleneck and the origin of Graft

- Core point: producing a thousand ads or pages is now easy; understanding what is actually working is the hard part. "If you don't have an outcome you're moving towards or a way to measure this, there's no point."
- This is the origin of his company, Graft: he says an MCP or the Facebook API can't handle the volume. One customer's Facebook ads produce about 25 million rows of data a month at about $180K monthly spend.
- Graft provides an AI data analyst that builds dashboards. Demo: paste a Facebook ad set ID, ask Claude "make a dashboard about this ad set," and get spend, conversions and placement breakdown. He can chat with the dashboard to change chart styles and share it internally to build buy-in with KPI evidence (e.g. showing a 20% CPA reduction from ad velocity testing).
- On sharing and team use: deploy tools like the bulk ad generator to a URL, or use a shared GitHub repo where merges keep everyone on one instance. You can ask Claude how to do either.
- On quality control and brand risk: test ideas on burner or satellite accounts and promote winners to the main account. He does this with organic social. Paid ad spend on a winner is the filter before it reaches main channels. He says to get buy-in, show the KPI dashboard.
- His advice on tools: "The tools don't matter anymore." Focus on the outcome, then polish and measure what works for the company.
