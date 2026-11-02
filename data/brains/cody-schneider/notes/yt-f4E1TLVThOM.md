## Digital gravity: building brand mass instead of a linear funnel

Cody's framing, discussed here with Jordan Mix of Late Checkout, is that buyers don't move down a linear funnel. They orbit a brand.

- Each asset (an ad, a video, a newsletter, a podcast) is another orbit ring, and each ring is a mini-funnel that adds mass.
- The more mass a brand has, the more people get pulled in, and the stickier it becomes in the buyer's head.
- Buyers don't sit at one point. Cody compares the orbits to ellipses: at different moments a buyer is closer to a purchase. The brand has to be in front of them constantly so it's there at the moment of readiness.
- He ties this to the law of seven (seeing a brand seven times before buying), and notes people are probably retargeted 20+ times before purchasing.
- The aim is to "make as much mass on the internet related to your brand in the niche that you are as possible" so you have maximum surface area during product discovery.
- Funnels still work, but they only give linear growth ("I put a dollar in and X comes out"). Nonlinear growth needs branded search and gravity.

## Transactional marketing vs. brand: the arbitrage seesaw

- Early on, Cody looks for arbitrage with "tomorrow revenue", which he calls transactional marketing: paid ads, cold email, cold DMs, and sometimes influencer marketing depending on category. You act, and you get paid the next day.
- The "law of shitty clickthroughs": other people spot the same arbitrage, so the cost of acquiring a user rises over time across all transactional channels.
- His example: signups costing $1 became $5 twelve months later (5x).
- The hedge is a content-marketing flywheel that drives branded search and brand discovery. This lowers customer acquisition cost as the arbitrage fades. He describes it as a seesaw: arbitrage goes down, brand goes up.
- Sequencing advice to startups: don't invest in SEO pre-seed. "You don't even know if you're going to be here in two years," and SEO may not pay off for around 18 months. Start with transactional channels, then layer in content and brand.

## Where to start: test channels, then automate what works

Cody's order of operations for a startup:

1. Find where the target customer spends time online.
2. Pick about three channels and test them.
3. Pour everything into the one or two that work best.
4. Only then automate the proven process with AI.

- Rule: "you need to operate it before you can automate it." Don't automate without a defined goal or knowing it works. This is "do things that don't scale", then automate.
- His Facebook ads example: scrape Reddit for pain points (e.g. why people hate Zendesk), generate around 100 static ads with the OpenAI image API, load them into a campaign, have an agent turn off the bottom 90% of performers and move winners to a conversion campaign, then look at what the winners have in common and repeat.
- There's no course for vibe marketing. The "course" is picking something you do a lot and working out how to automate it.

## Vibe marketing tactics and tooling

- n8n is JSON-based, so Cody has Perplexity write the workflow JSON, which he pastes into n8n to skip the connectivity setup. Example prompt: scrape YouTube channel emails with an Apify actor from a keyword list, validate them with MillionVerifier, and send them to Instantly for a cold email campaign.
- He says this is early and not always perfect. He found the trick about two weeks before recording.
- A second pattern he saw from another marketer: n8n as the backend and Lovable as the front-end dashboard. The marketer used it to screenshot competitor ads daily, surface new ads and what competitors are testing, and view the insights in one place. Cody sees this as internal tooling a marketer would actually use instead of Retool or Metabase. Lovable pulls data via an n8n HTTP/REST endpoint.
- He is skeptical of most agents: they are "automation with embedded AI", often a human in the loop reviewing curated data. His definition: an agent is where a decision a human used to make is handed to AI inside a workflow.
- The only real agent-like use case he's seen: agents running LinkedIn or Twitter accounts. They research topics by scraping Reddit, write a controversial post (he prompts Claude 3.7 Sonnet for an "unhinged post that is controversial"), schedule it, then read impression data, deep-research the best performers, and loop.

## AI SEO: LLMs mostly scrape Google, so it's still the same game

- Cody cites a conversation with Profound's co-founder: about 95% of searches on AI answer engines involve web scraping, and ChatGPT, Google AI Overviews and Perplexity largely return an aggregate of Google page one and two results.
- Reason: Google has 25 years of signal on which content best answers a query, and LLM companies will lean on it rather than index the whole web (maybe later, not now).
- He is skeptical of "AI SEO" agencies: many are just prompting ChatGPT to check whether you show up.
- Tools like Profound generate a synthetic corpus of question variations (AI search is question-based more than keyword-based), then score your surface area, show gaps, and recommend content. The action is to make content for the gaps.
- Bottom-of-funnel software keywords drive signups: "X vs Y", "X alternative", "how to [product]", "best X for Y". Mention your own brand inside those articles (e.g. a tool that integrates with Rippling inside a "Rippling vs Deel" post). Ranking on page one or two raises the chance of appearing in AI answers.
- Habit SEO (his SaaS SEO service) does keyword research, writing, publishing and optimizing of these bottom-of-funnel articles.

## Creator flywheels and YouTube-led discovery

- Match the content channel to where people discover the product. For an AI video editor, YouTube first; LinkedIn is probably the wrong place, but Instagram Reels might work.
- Then ask how to automate production to maximize volume in that channel.
- Creators chase outliers. If you make an outlier video, others copy and remix it, producing a cascade of videos you didn't pay for (e.g. a startup-ideas podcast spotlighting a tool, then about 40 videos on it two weeks later).
- His founder example: a Jungle Scout-for-Etsy tool whose entire growth strategy is YouTube. About 100 creators in an affiliate program, each doing a video a month, produced roughly a thousand videos about the product, which he says the founder "couldn't afford that ever".
- The game for a founder is to find a repeatable process for outlier-style content, then let the knock-on effect happen.
- Companies increasingly hire in-house creators as a job title (Vio is cited as doing this early). The risk is that the creator becomes popular and leaves, as with Triple Whale and Tommy Clark.
- Hedge by combining in-house creators and contracted creators with other strategies. You own the IP, but the face of the brand can walk.
