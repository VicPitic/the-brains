## AI answer engines scrape Google page 1 and 2, so the play is "digital gravity"

- Cody says he was asked more about AI chat search in two weeks than in the prior 12 months. It is now top of mind for founders and marketers.
- He spoke to the founder of Profound (Answer Engine Optimization software), who told him 95% of the searches they see are web based. Those web searches get scraped from Google.
- His own internal data shows AI answer engines scraping page 1 and page 2 of Google.
- The job for a brand: publish more content in its niche and earn more media placements on page 1 and page 2.
- Scale needed: "I'm not talking about 10x content, I'm talking about 1000x. You need surface area, a lot of surface area to show up in AI search engines."
- Mental model: more surface area makes more digital mass, more digital mass makes more digital gravity, and digital gravity makes more influence in your niche.
- His timing view: "Make a plan, the arbitrage is now."

## YouTube as the most valuable social platform

- Cody has been investing heavily in YouTube, based on two observations:
  - YouTube is now streamed more than Netflix. On Netflix's recent earnings call they were asked about YouTube as a threat.
  - Someone sent him a photo of them watching a podcast he appeared on through their smart TV in their living room.
- His argument: you can now be in a person's home, talking to them daily, weekly or monthly, as much content as you can get out the door.
- Comparison he draws: "cable news brainwashed my grammy from her living room, you can now do this too."

## Free small apps as lead gen for higher-priced services

- Cody highlights Relay Commerce (relaycommerce.io), which builds many small-scope Shopify apps and gives them away free.
- The goal of the free apps is lead gen for the company's main consulting services.
- Apps he lists that they own: relo, peel, smartrr, flocker, fomo, salespop, smartrmail, bookthatapp. All of them push toward the consulting services.
- Takeaway: many cheap, narrow free tools act as a distribution funnel into a higher-priced service.

## Cheap paid traffic tactics: Twitter and TikTok

- **Twitter ads for AI music discovery:** he audited an ad where a company makes music with AI and uses cheap Twitter ad traffic to create discovery. For these ads he suggests global targeting with a CPC bid cap of $0.01; he reports seeing $.005 link clicks.
- **TikTok ads with a $2 CPM bid cap:**
  - Clippers are being paid about $1 per 1000 impressions.
  - TikTok lets you set a bid cap of $2 CPM. When he tested it he got a $1.64 CPM.
  - Benefit: no headache managing clippers who may bot farm views to drain a dedicated budget.
  - He calls it an easy way to build top-of-funnel discovery.

## Building 100+ ad variants with AI automation

His thesis: more ad variant testing means cheaper CPCs. Two workflows:

**1. Video ads**
- Prompt Perplexity for 10 pain points related to the product.
- Ask for 10 thirty-second ad scripts per pain point, each using a hook from a hook list.
- Sample hooks: "You won't believe how easy this is…", "What happens next will shock you…", "Struggling with [problem]? Here's a solution.", "Tired of wasting time on [task]? This will save you hours.", "Say goodbye to [pain point] once and for all.", "Stop wasting money on [ineffective solution]! Try this instead.", "3 simple steps to solve [common problem].", "If you [describe your target], stop scrolling!"
- Use n8n to take the transcripts, upload them to the HeyGen API, then upload the ads to Facebook Ads.

**2. ChatGPT image API ads**
- Prompt Perplexity for 10 pain points, then 10 ad concepts per pain point.
- Pull competitor ads from the Facebook Ad Library.
- Feed competitor ads, your product images and the 100 concepts to the ChatGPT image API via an n8n flow to generate an ad per concept.
- Upload all ads to Facebook Ads.

## n8n as a marketer's lever, and product ideas around it

- Cody calls n8n "might be the most OP thing ive used as a marketer."
- Insight: n8n flows are just structured JSON, so he asks Perplexity to write n8n JSON for him.
- Tooling note: he deploys self-hosted n8n on Railway.com for $5 per month.
- Idea he drew from this: an app that works as an n8n flow-building assistant you chat with, which writes the code. He says search volume for "n8n json" is "going nuclear."

## Go-to-market ideas he shared

- **AI study podcast:** people want a podcast built from what they are supposed to learn. Build it on the Nari Labs Dia model, turning user-supplied source material into an engaging podcast. Go-to-market is TikToks with the hook "this app saved my brain".
- **AI music generator:** use cheap Twitter ad traffic to get the first listeners (see the Twitter tactic above).
- **n8n JSON generator:** the chat-based flow builder described above.
