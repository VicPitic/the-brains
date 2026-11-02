## What an agent actually is
- Cody defines an agent as "some job function or some job to be done" that runs on a repeated cycle, like a standard operating procedure. Under the hood it is "really just software" with a thinking loop.
- Chat tools need a human to push each step (find keywords, research page one, paste in, write the post). An agent runs that same chain itself, then publishes, reads live data on which posts bring customers, and refreshes the content.
- He says the category is full of "snake oil," e.g. tools claiming they will "entirely run your ad account." His rule: take the process a human does and have the agent repeat it.
- The human becomes a curator: deep domain knowledge, a clear explanation of what is wanted, and a measure of success (usually "make more money"), worked back into qualified leads and where target customers spend time.

## The four marketing roles Graft deploys most
- Facebook ads management, Google ads management, SEO plus AI search (ChatGPT, Claude, Perplexity; he says Gemini referral traffic has been "exploding"), and cold email outbound.
- He says most business growth falls into three buckets: cold outbound, paid ads, and organic ranking.
- Other requests: social media management, influencer outreach and negotiation (contact 1,000 influencers, pick the 10 most underpriced), and Pinterest.
- Buyers include software companies that would rather work with Graft than hire a marketing team, and local businesses that say "I hate my agency." He also partners with agencies that run about 150 Google Ads accounts for appliance repair companies, with Graft as the white-label back end.
- Pricing for local businesses can be a flat fee while the agent optimizes in the background.

## The Facebook ads agent loop
- Example client: an AI landscape design product that maps your backyard from your address and produces a material list for a local landscaper.
- Steps:
  - Scrape Reddit, YouTube and other social posts for customer pain points and desired outcomes (tools: Firecrawl or Exa AI, driven from Codex or Claude Code).
  - Generate 10 new static ad creatives daily with Nano Banana, given a brand style guide (fonts, colors, composition).
  - Upload automatically through the Facebook Ads API using a developer API key.
  - Optimize every ad for one conversion action, a form submission or qualified lead sent back to Facebook.
  - Turn off losers, promote winners to a winners campaign where they compete for budget.
  - Attach a vision model that studies what winners share and feeds those themes back to the creative agent.
- Result: cost per lead fell from $17 on average to $1.70 in three weeks, with first ads live in about three days.
- He says nothing here is tricky: "what are the top 1% of Facebook Ads marketers do right now": test a lot of creative, double down on winners, repeat.

## Agent architecture: data first
- Graft's stack is three parts: a data pipeline, a data warehouse, and an agent harness. Pipeline sources might be Facebook ads, Google Analytics, a CRM such as Go High Level, and Stripe.
- Agents need live revenue data. His first attempt at a Google Ads agent hit API rate limits, truncation errors and hallucination, so the first product became a BI tool that solved the pipeline and warehouse. Agent infrastructure was added in the last 3 months.
- The early AI SDR/BDR tools did not fail at making leads. They made lots of low-quality ones because they lacked visibility into whether a lead was qualified or became revenue.
- Align on what a good customer looks like (sales wants "whales," marketing is measured on leads) and track it. The agent gets the same alignment a human team would.
- Harness: Hermes, running in the cloud on an always-on computer. He tried OpenClaw ("a digital human in a box") but found it brittle and not enterprise-ready; Hermes was far better, and he knows the founders. Claude Agent SDK is another option.
- Enterprise reliability matters: a $5,000 monthly ad budget should not turn into $50 thousand by accident.

## How a beginner should adopt agents
- Don't start by building an agent that automates the whole business: "a tar pit that people fall into."
- Progression:
  - Co-work in Claude Code or Codex in another tab. He dictates with Super Whisper and delegates anything involving the mouse or keyboard ("the middle work"). The human explains the task and audits outputs.
  - List daily tasks you despise (writing, data analysis, lead-list cleaning) and turn each into a system.
  - Then automate it with Zapier or n8n, or a cloud Hermes agent. He mentions one-click Hermes on Hostinger at about $15 a month, controlled by text, Telegram, iMessage or Slack.
- Save brand style guides, goals and business context so the tool "turns into a co-founder."
- Cloud beats local for scheduled work ("every day at 9:00 a.m.") and for safety: a local agent has access to everything on your machine.
- Delegating costs "a tenth" or "a hundredth" of an employee.

## Content quality and human-in-the-loop
- An agent asked cold to write about your industry produces average, unoriginal output. Give it 30 minutes of you talking about a specific topic as a transcript and ask for a thought leadership piece, and he says the output is "top 1%."
- Bad ads (looks like "Microsoft Paint") usually mean no brand style guide, color palette, or allowed and disallowed language.
- Give the agent boundaries. He found it works better to say what bad looks like and tell it to do anything else than to define "good."
- Human-in-the-loop is built for regulated industries like finance: the agent drafts, posts in Slack ("Todd, is this all right?"), takes edits, resends.

## Delivery timeline and Graft's model
- Graft forward-deploys engineers into client companies. Clients come as repeat founders avoiding a marketing hire, or after getting "90% of the way there" and stalling on the last 10%. Some have failed three times.
- Pre-built agents are out in about 5 business days. Within the first 2 weeks, 2 to 3 agents are live; by 90 days about 10, of which about 3 are custom.
- Custom example: a "TikTok real farm" of about 100 cloud TikTok accounts with an API endpoint for bulk uploads, for a mobile AI photo-editing app. Each custom build becomes a playbook on the menu for similar companies.
- Marginal cost is low enough that he asks "why wouldn't we do everything" across channels.
- Success measure: the token cost to get a lead, replacing ad spend as the cost to watch. Anyone can make 1,000 ads now; knowing what works is the hard part, so feed agents the metric closest to revenue.
- He previously built "AI slop generators" (e.g. 1,000 blog posts that did produce leads), and learned scale without quality feedback fails.

## When agents don't fit, and rollout advice
- Poor fits: early-stage companies without a clear target customer or positioning ("you can't build a system for a company that doesn't have a system"), and messy paper-trail businesses (real estate) where one employee holds all the knowledge.
- Test: if you can delegate a task to a team member to run on a cadence with a success measure, an agent can probably do it.
- Pick one workflow at a time, "eat the elephant piece by piece." He estimates about 40% of a business can realistically be automated, the parts that cause burnout.
- To drive team adoption, run a weekly lunch and learn where someone shows what they automated, and spotlight that person. Token quotas backfire (a friend at a payroll software company hits his by splitting columns).
- Resistance is real: a 50-employee company he spoke with was against adoption for fear of job loss.
- Learning: the free course at gtmengineeringcourse.com, plus YouTube and X, where new methods appear first, then YouTube, then LinkedIn, then Instagram. He says "everybody that's selling a course is selling old information."
- His closing principle: "What is the most boring thing I can do consistently? And that's what actually makes growth happen."
