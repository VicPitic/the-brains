## Using Search Console data as a feedback loop for content refreshes

- Cody treats Google as telling you what it wants you to rank for. His starting point: look at pages two and three of results, where an active SEO effort has "hundreds of keywords that Google's basically pointing at you."
- Loop: find long-tail phrases tied to the product, check top-performing articles for keywords they rank for accidentally, then add a section or weave those phrases in. He says this typically lifts traffic "10 to 20% overnight."
- If the article still doesn't reach page one for that phrase, write a supplementary article and link to it from the original page. The original then helps it rank.
- Track the refreshed batch (e.g. 100 articles) in a dashboard, measure organic lift, and repeat. He calls refreshing "the most valuable thing to be doing in this AI era of content."
- Mechanics: he pipes Search Console data into Claude Code. At large volume the API hits rate limits, pagination truncation and context limits, so he builds a data pipeline and warehouse. The open-source version is Airbyte writing into ClickHouse, hosted on Railway. Duplication errors are common when writing to ClickHouse or combining sources.
- Content must be maintained. He cites an AI spreadsheet tool ("how to Excel" keywords) he took from zero to 400,000 clicks a month in 12 months. After the person running it left, it "falls off a cliff because nobody's maintaining it." A site is "a living breathing thing."

## Writing bottom-of-funnel SEO content with AI

- Relevance to the product matters more than traffic. He says HubSpot's correction came because most of its content was random business articles, while what still ranks relates to CRM and its integrations. Everything should push toward a purchase or signup action.
- Target keyword types: "X vs Y," "X alternative," "X review," and other bottom-of-funnel phrases tied to other products.
- Process:
  1. Pick the target keyword and scrape what ranks on page one (he mentions Cloudflare's new scraper that returns full HTML sites as JSON).
  2. Put that in the context window.
  3. Interview himself for about 30 minutes on the category: opinions, experiences, where the market is going.
  4. Write the article from both sources.
  5. Run an agent loop for internal linking and for a link to the homepage in the last paragraph.
- Place CTAs at the first paragraph and at 25%, 50% and 75% scroll, with varied CTAs sending to the signup flow.
- Put a TL;DR callout above the fold in a different background colour, with the CTA directly below it. He says this also lifts AI search because the answer is easy to pull.
- For better quality, have the model build an outline from the ranking sources (skyscraper style), write section by section, then run a "what did we miss" improvement pass. Newer models often manage it in one try.
- On "AI content is terrible": generic prompts like "write me a blog post" produce average output. Giving the role ("top 1% direct response marketer"), a sandbox of source material and the "nos" produces far better output. "It's not that you don't know what you're doing. It's you don't know how to explain it."

## Tracking signups from content and sending engagement signals

- Set up a custom conversion event in Google Tag Manager for signup (push to the data layer), then use GA4 and Looker Studio to filter landing pages containing "blog" and see signup events. This shows which topics convert, e.g. Facebook ads articles at 2x the rate of Search Console articles.
- His target for a blog post is about 5% of traffic turning into signups. Landing pages are usually better for conversion than blog posts.
- Signals he believes help: scroll tracking firing every 10% (he saw "lift sites overnight"), downloadable assets with a promise, and clicks into deeper pages like a form. He reads these as trust signals back to Google.
- He uses brandable domains for social. Example: gtmengineeringcourse.com (as spoken: "gtmineeringcourse.com"), which he mentions in videos. Free assets are "the most slept on thing in the world."

## Velocity, sites and risk

- Only go high velocity on sites with branded search that grows month over month. A site that looks like a real business: about page, privacy policy, LinkedIn and Twitter, real people.
- He will publish around 10,000 articles in a month to a newish site with some backlinks, dumping them at once. Once impressions and clicks start to curve, he moves to a monthly rewrite cycle on the best and the declining articles. He noindexes or 301-redirects content that no longer belongs, rather than leaving 404s.
- Content is tightly relevant (e.g. integrations of the product). A team member spent about three weeks filtering the keyword set, using Claude Code and a database to cluster it.
- He has intentionally had many sites penalised while finding the threshold. His warning: "If SEO drives 80% of your revenue, do not do this." He also says manual penalties are a real risk.
- Example: a Chrome extension that extracts emails from websites, backed by Google and Facebook ads remarketing, to drive branded search.
- Exact-match domains: he has bought "XYZ generator" domains, built a tool on the homepage, bought about 10 DA50 backlinks and reached page one in about 30 days.
- Keep a marketing mix of two to three channels. After an algorithm update hit a channel he leaned on, he had no fallback. Facebook ads referral traffic also reads as a real-business signal.

## Link building, tools, newsjacking and AI citations

- Link exchange via Twitter ads: global targeting, max CPC 1 cent, link clicks at about 3 cents, landing on a form (name, email, company URL). He keeps the highest-value sites and does three-way exchanges across his portfolio rather than direct swaps.
- Tools: calculators and generators are the biggest AI-era opportunity and also work as link magnets that pass value to money pages.
- Newsjacking: write an article on a current topic before the SERP settles, promote it on social, and you can reach page one. Combining PR and social with SEO beats SEO alone. Example: a friend with an AI-image-detection tool checks viral news images, then pitches journalists.
- AI search: look at the query fan-out and citations. If you email the pages being cited most and pay (e.g. $500) to be added, you can see impact fast. He says to rank-stack the top 10 most-cited sources and prioritise by how often a source appears in the fan-out. He considers it "link building, but very strategic citation link building."
- Hub pages (e.g. /uses or /tools) get the links and distribute to each bottom-of-funnel landing page. With a new site, focus links on three to five landing pages.

## Agents, harnesses and data for marketing

- A harness beats the raw model. Claude Code reportedly has about 38 tools, and he says the same model performs far better inside it than via the bare API. Claude has an SDK for the harness.
- Cost hack: swap in an open-source model trained on Opus 4.6 outputs (he names MiniMax 2.5, at about 1/20th the cost of Opus) inside the harness, and run it in the cloud.
- Hallucination: give the right context at the right time, not everything. Graph's agent pulls pieces of an ontology through a vector database on demand. Fewer tools is better, as Claude Code's team deliberately limits them.
- Graph: AI data analyst for growth teams with a semantic layer. Facebook ads alone has 42 tables, and the agent confuses "link clicks" with "post link clicks" (12 variants) without definitions. They run agent evals on SQL retries (e.g. seven attempts) to make future queries one-shot. Switching between OpenAI and Anthropic models forced a retool.
- On OpenClaw: he hasn't seen a use case a simple scoped agent can't do. An agent is "a loop on a cron job" with an LLM. Build narrow software, deploy it on Railway via its API key, and keep the surface area small.
- Examples: a podcast-booking agent got 112 yeses from about 2,000 contacted and booked 35 calls in a week; a Facebook ads agent (research, make UGC and statics, publish, kill losers, promote winners) he expects to finish in about a week.
- Daily workflow: email triage via Claude Code, Notion meeting notes into follow-up drafts, SendGrid product emails, and a LinkedIn post-engager → Apollo or LeadMagic → MillionVerifier → Instantly cold email flow built in about 30 minutes. His line: "friends don't let friends do n8n."
- Result he cites: 39,000 organic users in a month as one person across channels.

## Content strategy, channels and background

- Long form beats short form for conversions. He does an hour-long podcast to reach thousands, and finds short form hard to track and best for top of funnel with a CTA to something longer.
- His YouTube formula: the thumbnail and title make a promise, deliver in the first 30 seconds, then do the thing.
- Social algorithms care about retention, not how content is made. "Good content is good content."
- Background: print on demand (Etsy, Amazon, Redbubble) in high school and his early 20s; a digital strategy role at a Fortune 500 manufacturing marketing firm with long sales cycles; early employee at Rupa Health, which grew from a $20M to a $110M valuation in about six months; Chrome extensions paying rent for about 10 years; now founder of Graph.
