## Backlink buying: what makes a link worth paying for

- Ilias will pay "up to $1,000 or $2,000" for a link on any page that ranks in the top 10 or top 20 for a relevant keyword. His reasoning:
  - A top-5 ranking page sends real referral traffic to humans.
  - Those pages also get picked up by AI models.
  - A page ranking that high is likely a legitimate site, even with a low domain rating.
- Bottom-of-funnel keywords matter most, such as "best link building tool". An AI fans out to this kind of query in its final research step, so a mention on a page ranking for it can lead to citations in AI answers.
- Top-of-funnel pages (e.g. "how to get more traffic") are worth less. They are still worth paying for if he can get a direct mention, such as a "best tools" H2 with a screenshot, an H3 with his tool and a description. A bare anchor-text insert is worth less.
- His minimum baseline for a link site:
  - 500 to 1,000+ monthly traffic across the domain in Ahrefs or Semrush.
  - Some domain rating.
  - Top pages roughly relevant to his topic.
- He treats a link as spammy when the site isn't relevant, has low domain traffic, or looks like slop (casino pages, random content). He avoids blogs that look like link farms, where every post is a paid recommendation.
- He sees a no-follow link on a ranking page that gets clicks as valuable. A brand mention inside the content (H3 plus screenshot plus description) is a signal even without a link.

## Finding link opportunities at scale (LinkDR)

- Ilias's product LinkDR (linkdr.com) automates link building. It pulls the top 100 to 1,000 backlinks for each of 5 to 10 competitors and combines them. Pages linking to several competitors (the "intersect") are strong prospects.
- It also adds every page ranking in the top 20 for his keywords. Expanding to the sites that link to those pages gives thousands of prospects, and everyone gets emailed.
- Email style: short, direct requests work best. He dislikes four-paragraph vague emails himself and ignores them. A typical ask is "I saw your page, you didn't mention me, can you please mention me?"
- Templates: AI-written templates were bad (unless using Opus, which was expensive), so he hard-coded real human-written examples. The AI picks from them depending on the opportunity:
  - Listicle: ask to be added.
  - Competitor has an affiliate program and he does too: offer a better deal.
  - Guest-post site: pitch a new guest post.
- Early on he offered $100 to $200 payments, affiliate links, or free credits.
- Recent rebuild: he deleted much of a two-year codebase. The app now runs mostly in Claude Code, a thin wrapper around an MCP and a database. He tells the AI to build its own MCP tools as needed. He says the emails are now very high quality.

## Ahrefs workflow for discovering topics competitors miss

1. Open a top competitor in Ahrefs (the example was NapLab) and go to best-by-links.
2. Filter to one link per domain and sort by page traffic.
3. Find the linking pages that get the most real traffic. Those pages are what to copy or write about, not the competitor's own top pages, which everyone already copies (e.g. "how to wash pillows").
4. Write that content yourself, either as a guest post on a similar site or on your own, and link back.
5. Go one level further: look at who links to the 200 sites that link to the competitor. This expands to thousands of prospects.

- He also exports 10 to 20 CSVs from Ahrefs (keywords, top pages, links across competitors) into a single Claude Code chat to analyze them together.
- He uses Ahrefs batch analysis on all your YouTube videos to see what keywords your video content already ranks for (his example: a video ranking number one for "maximize SEO").

## Where SEO is heading and what still works

- He sees AI overviews as convenient and uses them himself. Pure content sites are dying, so he focuses on bottom-of-funnel pages that lead to a product.
- He believes the best long-term tactic is a real brand. He used Semrush's blog to learn link building, and he'd search "link building Semrush" because they publish deep, researched content. Build a site with "super high value, super high quality" resources.
- Real virality and brand mentions (YouTube, X, LinkedIn, even a billboard) help rankings. His view is that Google ingests data from every platform, so being known matters more than any single link.
- He predicts 2027 SEO becomes broader: Instagram, YouTube, LinkedIn and Twitter content for top of funnel, with the bottom of funnel converting on your own site. AI recommendations are fed by authority across all those sources.
- Paying YouTubers to make videos about you will be the next frontier. He expects social to follow the same path SEO did, with spam eventually pushing out low-authority accounts.
- Wisdom matters more than raw AI knowledge. Seeing patterns across SEO, retention loops, coupons and metrics lets him apply ideas AI wouldn't suggest. Example: a share feature in your app is itself an SEO tactic, because users share your links.
- AI gives conflicting SEO advice, and he says he can prove both sides from sources.
- He notes link exchanges such as Ultra Rank "are working" for now, though he doesn't know how long.

## UGC creator campaign for a SaaS product

- He ran UGC for genppt.com, an AI presentation maker he bought on Acquire.com. He said it already had paying customers, and he tripled its MRR by building SEO content with Claude Code and a month of good backlinks.
- The setup: five creators, 30 videos per month each, for $500 per month each, posting to TikTok, Instagram and YouTube Shorts. (He said "30 videos per day across three channels" for the combined output and "30 videos per month for $500" per creator.)
- He found creators through a platform (he named SideShift). Retainers worked better than per-video pay. The platform tracked views automatically and paid bonuses at 20k, 50k and 100k views.
- Hiring test: he sent a link to the site and asked for a test video. If the creator's video was good, he hired them. Creators tested the app themselves for free, found the "wow moment," and made videos without any briefing, which showed whether they had taste.
- He chose this over buying phones, SIM cards and proxies to run warmed-up accounts. Real US-based creators make their own accounts and are motivated by bonuses.
- Results: some videos hit a million views. People swipe past in 3 to 10 seconds and rarely buy immediately, but may remember the brand. He thinks he needs a better product to test it with.
- His benchmark is Gamma, which spends heavily on creator and affiliate content.
- New accounts take time to warm up. His guideline is to interact with relevant content for a few weeks before posting.

## Public SEO roasts and what builds authority on X

- His best-performing X posts are concrete tactics, skills and step-by-step templates, which people bookmark.
- The content that actually wins clients is the hardest to make: 20 to 30 minute unfiltered audits where he looks at a site for the first time and shows every step (Ahrefs, top pages, links, exporting into his tools, customer journey map, AI SEO tracker). He says that proves skill far better than a tweet.
- He did a public roast of Levels' sites (Peter Levels). Levels paid him to audit his sites in public. Ilias tweeted topics and ideas per site, and Levels implemented them himself.
- He enjoys the roasts because they teach viewers and show the opportunities he sees.
- Long-term, authority-based tactics stay white hat-ish. Short-term exploits are risky to publicize.

## AI SEO testing and protecting content from AI scrapers

- On his SEO roast site (seoroast.com), he sells transcripts and videos for a $50 payment. To stop people pointing ChatGPT or Claude at the content, he detects AI agents and shows them a message that they must buy the content.
- It works 100% of the time, he says. Mechanisms: notes in robots.txt and llms.txt, and content negotiation (checking the Accept header for text/markdown). He also detects ChatGPT browsers and serves different content.
- It is similar to cloaking, which Google bans, but he says the AI companies don't have that rule and want markdown-optimized content.
- His method for AI SEO and for testing this:
  - Open a new incognito ChatGPT and run a prompt simulation.
  - Copy the steps the AI took.
  - Give them to the agent building your site and have it fix what went through.
  - Retest in a loop until everything is blocked.
- He also runs a tool called SEO tracker (the recording gave "seotracker.com") that checks rankings and runs prompt scans for AI search. He says he was early, then big companies entered.

## Customer journey prompt

- He recommends the customer journey skill from his SEO skills repo. It maps the problems and queries people type in.
- He ran it on NapLab. One output was "Why do I sleep better in a hotel than at home?"
- It suggests non-SEO tactics where fitting, like YouTube demonstrations or troubleshooting guides, for each step.
