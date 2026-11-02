## Cody's AI-agent GTM stack: how he booked podcasts with an agent

- Cody ran a PR sprint after Graphed's pre-seed round (October) and three months of heads-down product work. He wanted to get booked on podcasts.
- His old manual process: pull shows and contact info from Refonic (a database of shows and contacts), scrape them, validate the emails with Million Verifier, load them into Instantly, pitch, then manage replies.
- The new process: connect all the APIs, load the leads into Instantly, and attach an Instantly agent whose job is to schedule a discovery call.
- Results from a 2,000-contact cohort: 112 positive responses, 35 calls scheduled, and the agent dropped the ball on 90 of the 112. He expected "maybe a handful" and mainly wanted data to improve the agent.
- His calendar ended up booked back-to-back, about 10 hours a day for a week.
- The mistakes were real. The agent replied within seconds, so people knew it was a bot. It agreed to buy two books from a host. Some people were "viscerally mad."
- His recovery: get on the call, acknowledge it, say it was a test, apologize for the poor experience, and explain that he needed data.
- He sees this as the same tension as with human PR. Hired PR people also pitch bad-fit shows. The difference is the iteration speed: the agent is code in a GitHub repo, so fixes shipped within 24 hours of feedback.
- He now asks what the boundary of PR is that agents roaming the web can handle.

## "Friends don't let friends do n8n": build agents in code with Claude Code

- Cody says to go straight to code instead of workflow tools, because code is "so much more malleable." He can update the system prompt, tools, and behavior from live market feedback while Claude Code works in the background.
- Deployment: Claude Code builds the software and deploys it to Railway ("like a Heroku but it has a really robust API"), where the agent runs in perpetuity. Postgres databases on Railway are also easy to spin up. He says he "will never do a pivot table again."
- His definition of an agent: access to the things it needs (API keys), plus a system prompt with a goal. He builds a boundary by listing the "nos": "here's all the nos around the thing," which "creates a boundary for yes," and the agent works out the best path inside it.
- He treats an agent as a "malleable employee." When the meta shifts, he swaps tools or the conversion event in minutes. Example: UGC ads (HeyGen avatars with ElevenLabs voices) gave way to static ads with big text.
- Agent harness: he thinks the harness (model plus tools) is the product, and that is where differentiation and defensibility lie. He says Claude Code with the model beats raw claude.ai, and describes running 5-10 terminals on different Mac desktops, managing agents "like an agent jockey."
- Voice input: he uses Super Whisper to dictate instead of typing.
- Cost curve: he cites Opus 4.6 and then MiniMax 2.5 arriving about 3 months later at roughly 1/20th of the cost at similar intelligence (he says it appeared to be distilled from Claude via ~24,000 accounts). He sees three cycles of this, so hard work keeps getting cheaper.
- He calls the mindset "token abundance": unshackle yourself from old constraints.

## How to start building a GTM agent stack (the folder method)

Cody's step-by-step for beginners:
1. Make a local folder (his is called "graph growth agents") and open it in Claude Code. Everything he does lives in that folder, essentially a code repo.
2. Create an environment file and add the API keys for your whole business stack.
3. Tell Claude what you want to do. Ask it to make a plan and interrogate you for more context.
4. Let context accumulate in the directory. It gets smarter as it accumulates knowledge about the business, the marketing process, and your challenges.
5. When a co-worked process lands on an output you like, tell Claude to save it as a skill for reuse.

- Example email workflow: Claude Code pulls a product-feature transcript from Notion, writes an email with a "top 1% direct response marketer" persona (educational, casting a vision), saves it as a draft in SendGrid via API, sends a test to his inbox, then sends it. He doesn't touch the SendGrid UI.
- He says the shift happened in the last ~6 weeks: it went from an assistant that "doesn't really do work" to doing real work.
- Audit method for small, high-touch businesses: audit the work you do daily, weekly, or monthly, find what repeats, and co-work with Claude to automate it. His example for a small agency: a weekly agent that sends 10 LinkedIn post drafts on Monday morning, then learns from impression data.
- He says GTM engineer is "the most desired role that exists" right now; he gets 10-20 messages a day asking how to hire one. A friend negotiated a much higher salary by saying he was bringing his whole stack of ~20 agents and personal software.
- He publishes a free tutorial series at gtmengineeringcourse.com, sponsored by Graphed.

## Automated Facebook ads loop

Cody's pipeline, built in Claude Code:
1. Research pain points: scrape Reddit and Twitter for how people talk about what they hate about Looker Studio, and use that exact language in ads.
2. Generate creative: an on-brand template built as a React component, where only the title and paragraph change, with a before/after image below. Nano Banana can be used for images. He can make about 1,000 ad variations for essentially zero cost.
3. Upload through the Facebook Ads API.
4. Wait about a week, then use the Graphed MCP to find winners and losers.
5. Turn off the losers, promote the winners to their own ad set, and switch to a conversion (signup) campaign. He uses clicks only for testing.
6. Identify common threads among the winners and generate another creative round.

- He is about a week from turning this into a fully autonomous agent running Facebook ads.
- Why a data warehouse is needed: calling ad APIs directly runs into rate limits. An MCP over the API hits pagination and truncation. Stuffing data into context causes context bloat. Example: a client spending about $180K a month on Facebook ads could pull only about two hours of data through the API, so Claude hallucinates from partial data and the agent decides on bad information. His view is that the data pipeline and warehouse have to be solved first. This is the thesis behind Graphed.
- Graphed: an AI data analyst for growth teams. It connects and unifies data sources, manages the pipeline and warehouse, builds an ontology layer, and offers an MCP and a Slack integration (@graph in chat).

## LinkedIn "comment to get the doc" playbook

- Cody posts content with an outcome and a Notion document that teaches it: "here's the seven things you're going to learn... Comment X to get the Notion document."
- Comments create a viral loop. A Claude Code skill using the Browser Use Chrome extension replies to the commenter (about 300 replies), which adds more reach. The asset is email-gated, so it becomes an email lead.
- He uses Phantom Buster to extract everyone who engaged on the post and gets their LinkedIn profiles. He enriches them with Apollo, validates the emails with Million Verifier, and loads them into an Instantly cold-email campaign. The system "just runs."
- Result: about 500,000 impressions on LinkedIn in 30 days. At an average LinkedIn CPM of about $23, he computes roughly $115,000 of free reach.
- Writing: he keeps markdown files with his writing style and examples of his best content by reach. LinkedIn and Twitter tone are different and are kept separate.
- Snowball technique: keep a repository of best-performing content and remix it from new angles ("everything is a remix").
- Graphed's acquisition has been all organic; the only ads he runs are remarketing. He publishes about 500 pieces of content a month and just re-enabled free trials about two weeks before the interview.
- Ideas he is exploring: Instagram persona accounts ("a day in the life of a corporate girly" slideshows with the product included, made with Nano Banana, scheduled and analyzed automatically), scaled to 10 accounts. He also thinks of podcasts and niche newsletters, such as one for automotive shop digital marketing, as content channels agents can run.

## Lead enrichment and rolling out AI inside a company

- Lead enrichment: SDRs and AEs dislike doing it, and it doesn't make them money. An agent can research each lead about 30 minutes after it lands: org structure, how the lead fits in, a plan to sell into that structure, and what they need to get buy-in from their decision maker. APIs he names include LeadMagic, Apollo, and SalesQL.
- Agent for relationship building: he is building an agent that emails target customers with no intention to sell, asking about pain points and building a relationship at scale (one-to-one conversations with thousands of people). Later it can seed ideas or collect information. He compares it to a 13-month email thread with one person that an agent can run across many.
- Adoption incentives inside a company: he says time-off rewards, and token quotas or bonuses, both have problems. Example: a friend at a late-stage startup has a monthly token limit, so he splits and rejoins CSV files just to hit it.
- His preferred approach: give a crash-course, give people access, and let someone rise up ("Trevor") and do something striking. Then spotlight that person with a 20-30 minute fireside chat on the workflow. Status drives adoption: "everybody wants status."
- He doesn't expect to need growth employees. The main hires would be good salespeople who hunt whales, fed the best leads by a large brand. He doesn't think fully automated sales works yet: "people buy from people."

## Brand and owned media as the defense against rising CPCs

- Cody has been "preaching" for five years that owned media is the future. He cites Andrew Chen's book *The Cold Start Problem* and his idea of the "law of shitty clickthroughs": as a market matures, more competitors bid and CPC rises, and the only counter is owned media that gives organic reach.
- At Rupa Health (a marketplace for specialty lab test ordering), they started with ads and then layered on a live class, a podcast, a big email list, and a big blog, so that customer acquisition cost stayed flat while paid costs rose.
- Graphed sits in a very competitive category (Tableau, Power BI, and others). Some VCs said it was the dumbest idea they'd seen; others said it was obvious. Cody's answer is brand and distribution real estate.
- Where your customers spend time includes physical places. At his old agency, a manufacturer found that physical pamphlets at gas stations in its geography outperformed every other channel, so it did that at every gas station.
- Goal: own mental real estate so that when someone thinks of a category, they think of your company.
- In the AI era, he says the only work left is "ideas and polish" (taste); everything in the middle is "how do I get an agent to do it?"
- On building product: code costs are near zero, so the hard part is knowing what people actually want to buy. He gives the example of a PM friend whose team builds prototypes and tries to merge features nobody wants. He thinks ecom has an advantage because physical constraints force a "does the market want this?" test.
