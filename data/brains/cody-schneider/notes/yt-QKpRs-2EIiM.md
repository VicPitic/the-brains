## Mapping the AI-native marketing stack ("marketing engineering")

- Cody describes "marketing engineering" (or GTM engineering when it touches a CRM or sales) as a new role: using a coding agent to do all the "middle work" a marketer used to do by hand. That covers ad creative research and generation, media buying, and channel execution.
- His claim is that a team that once needed about 25 people can now run on one person with a Claude Code Max subscription.
- He expects around 70% of a non-engineer's work to be done by AI. Anything that touches a keyboard should be tested with "can an agent do this?"
- Infrastructure his team found necessary over 18 months:
  - a data pipeline and data warehouse (open-source options he names: Airbyte, ClickHouse)
  - a cloud server to run code, and media storage for images and videos
  - databases the agent can spin up to log its own work (for example, the JSON used to generate an ad, tied back to Facebook ads data)
  - cron jobs for recurring runs, app authentication for private dashboards, and a git manager so several people can work at once
  - an API gateway to every tool the agent needs
- His thesis is "all marketing is now just turning into code." A Seedance video is a JSON file sent to a GPU API, an ad upload is software publishing content, and analysis is an SQL query the agent writes against the warehouse.
- Unifying Google Ads, Google Analytics, PostHog, the CRM and the payment processor lets you see which search terms lead to higher customer lifetime value.

## Turning a manual task into a deployed agent

- Method: do the task by hand with Claude Code, keep the session log, turn it into a repeatable process, then deploy it to the cloud on a daily, weekly or monthly schedule. Marketers then stack these processes on top of each other.
- SEO example:
  1. Research target keywords.
  2. Scrape what ranks on page one.
  3. Write an article from that.
  4. Add brand voice from a founder transcript.
  5. Publish via the CMS API (his blog runs on Strapi).
  6. Refresh on a 30-day cadence from live data.
- Scaled output he cites: 30 new Facebook ads per week, 20 new LinkedIn ads, and Google Ads optimized continuously from the live data stream.
- He argues against "token maxing" and against God-in-a-box agents. He found that having the coding agent write discrete software with a thinking loop and a live data stream beats pointing a general agent like Hermes at an account.
- He treats this as converting a standard operating procedure into code, then giving the coding agent the data it needs to improve that code.
- His tools: Cursor and Claude Code daily (Cursor cloud agents are good for background work), and Codex more recently. He also uses DaVinci Resolve MCP for long-form video editing and says the output is "ridiculous."
- Rule he repeats: "Friends don't let friends do n8n." Go straight to code because it is more discreet and easier to modify.

## Parasite SEO on LinkedIn articles

- Parasite SEO means borrowing a high-authority domain to rank a piece of content. His example publishes a LinkedIn Pulse article from a company page.
- Workflow:
  1. Pull page-one results for the target keyword with serper.dev.
  2. Extract the content with Exa or Firecrawl and put it in the context window.
  3. Have the agent write an article for that exact keyword.
  4. For a real client, record a 30-minute founder conversation about positioning and feed the transcript in alongside the scraped text.
  5. Publish the article on a LinkedIn page, using the keyword phrase as the exact title so it becomes the URL.
  6. Put the URL through Prime Indexer, which drip-pings it to speed up indexing.
- Rule: use Prime Indexer only on external sites, never your core domain, because the drip ping can hurt it.
- Results he cites:
  - A "Facebook ads for kitchen remodeling" article went live and was indexed by Google in about 38 minutes, ranking position one.
  - A "Facebook ads for orthodontists" article reached page one, position one, within 20 minutes of publishing.
  - He also has "Facebook ads for pet grooming" pages built the same way.
  - Pages carry calls to action at different commitment levels.
- The same indexing approach works for local map-pack SEO: put name, address and phone on many large directory sites (Foursquare, MapQuest) and use an indexer so Google sees those deep pages.

## Static creative at scale with Seedance and AI avatars

- For Facebook, Cody targets all of Facebook and lets the creative do the positioning, not interest targeting.
- He explains that with Andromeda, targeting is driven by the ad creative, so the script and the avatar decide who sees the ad. He keeps five AI avatars across age groups and ethnicities.
- Three things must be realistic: the voice, the avatar, and the audio environment. A person shown in a car needs audio that sounds like a car, not studio quality.
- Script pipeline:
  1. Scrape Reddit (via Exa or Perplexity) for pain points and desired outcomes tied to the product.
  2. Take 10 proven Facebook ad hooks from a post he wrote.
  3. Combine them as hook, then desired outcome and pain point.
  4. Write 15 scripts, each 30 seconds, at a 12th-grade reading level, with an "economy of words."
  5. Send the scripts to ElevenLabs for MP3 audio (he uses a voice called Natasha).
  6. Send the MP3 and an avatar screenshot to Seedance through Kai AI or Higgsfield, which lip-syncs the video.
- Cost: about $2.50 for a 30-second video on Higgsfield at the pricing his team has locked in.
- He uses a voice-to-text tool (Superwhisper) to give the agent instructions faster.
- Quality control:
  - He puts a brand-style-guide gate in the loop, where a separate vision model checks each ad, such as for a wrong font, and sends it back to the image model (GPT image) for fixes.
  - He says humans should get out of the way after an initial phase, because a person cannot approve 20 new ads a day, while an agent can reach roughly 99.9% quality.
- Scale reference: Rise Superfoods has about 5,100 active ads. Cody says the best companies test creative volume like this using AI plus creator networks. His team shipped about 11,000 ads across clients in July.
- Creator networks (Sideshift, Tribe): pay per video, for example $40 per UGC video. Another option is paying about 3% of the spend behind each ad the creator makes, so only winners cost more. These networks have APIs, so an agent can manage campaigns and review creative.

## Budget, testing cadence and results

- Starting spend: about $100/day each on Facebook and Google ads. Typical cost per demo for software clients is $50 to $200.
- Timeline: his team usually has enough signal by week six, and sometimes within a week. They can run two to three creative loops per week (test, see what won, remix).
- Cost results he cites:
  - A wellness franchise (corporate level): Facebook cost per lead from $70 to about $16 in four weeks. Google Ads from about $82 to $35 in the same period. He jokes they are "day trading" the Facebook and Google ads algorithm.
  - A prosumer app: roughly 2,000 signups in June, then about 20,000 signups across Facebook ads, Google ads, SEO, cold email and LinkedIn DMs. The whole stack was set up in about three weeks, and signups were roughly doubling month over month.
- Creative decay: "everything has a half-life," so you need to introduce new DNA. His sources are viral organic social posts in the category.
- Explore/exploit split: about 80% on what works and 20% testing, rising to 20-30% net-new creative once cost per action hits a threshold.
- Competitive research: use a vision model (he mentions Gemini) to pull and describe every ad in a category. He did this for car detailing. If many advertisers in different regions run similar ads, that is a strong signal those ads work.

## Signal-based outbound from LinkedIn engagers

- Workflow he demoed:
  1. Pick influencers in your product category and set up a daily check for their new posts.
  2. Extract the commenters and reactors from each post using an Apify actor (API Maestro's LinkedIn actors).
  3. Take the LinkedIn profile URLs and run a waterfall email enrichment (GetLeads, then LeadMagic).
  4. Verify the emails with MillionVerifier.
  5. Upload them to an Instantly campaign.
  6. Optionally send LinkedIn DMs via HeyReach.
- Do not automate your core LinkedIn account with browser-use agents. It risks a ban, so he scrapes through a third-party actor that handles proxies. He says his approach lives in a "white to gray hat" zone.
- Copy rule: two concise emails, subject like "saw your comment," referencing the post, then a short offer (for example, 80 new creatives a month with an agent running media buying).
- Qualification: have the agent score each person one to ten against an ICP markdown file. He also uses TAM mapping (find all target companies, firmographics, the decision maker) and layers signals: engagement, website visits (via a tool like Leadpipe), and job changes. A new job is a strong buying signal because "everybody buys new when they join another company."
- Best-performing offer: find an influencer in your category, record a live class with them, then DM people who engaged with the influencer: "saw you commented on X, we recorded a live class with Y, want the recording?" The recording is effectively a demo in disguise. He points to Nick Abraham, who sends about a quarter million LinkedIn DMs a month, for more.

## Cold email infrastructure and cost

- Cody runs about 1,000 inboxes in Instantly through Hypertide, which manages Microsoft tenants.
- Hypertide groups two domains per tenant and about 100 inboxes per domain so a burned tenant doesn't hurt the rest. Microsoft deliverability suffers if you land in a bad tenant pool.
- Cost: about $125 of infrastructure per 10,000 emails a month, which he extrapolates to a million emails a month for about $8,000.
- Alternatives: InboxKit, and Instantly's own pre-warmed domains (good deliverability, but not branded to your company).
- He thinks of cold email as a one-to-one marketing channel.

## Team size and how Graph engagements work

- Cody's company, Graph, has six people: him and a co-founder, three to four deployed engineers, and a head of sales.
- They sell a platform and forward-deploy engineers to build agents on it. Clients can later drop the engineer and keep the "virtual employee" running on usage-based pricing (rows synced, credits for enrichment and creative).
- He says the hard hire is someone with both software engineering and marketing knowledge. He sees 22-year-olds who have run AI consulting agencies fitting best.
- He says you can build the infrastructure yourself with a coding agent, but his team spent 18 months on it.
