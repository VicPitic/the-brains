## How Cody structures ad creative as a matrix and competitive map

Cody's starting point is positioning. He asks what pain points and outcomes the target customer has, then builds a matrix to map them.
- Rows and columns are emotional triggers crossed with situations the customer could be in.
- Example trigger: "I took this restaurant over from my dad and I'm afraid I'm going to run it into the ground." Example situations: the Friday night rush, a weekend when the phone keeps ringing and the owner doesn't want to answer.
- Five emotional triggers times ten situations gives dozens of distinct ad concepts.
- He pulls every competitor's live creative and plots it on the same matrix. Usually only a few cells (he describes "the top left corner") are lit up because everyone talks about the product the same way.
- He then makes creative for the empty cells. The claim: ROAS rises and CPA falls because he is differentiating the message to the same customer rather than competing in a red ocean.
- Example: every beef tallow brand repeats the same three benefits. There may be seven other benefits, such as eczema relief or replacing Vaseline for slugging, that nobody is covering.

## Competitor angle over capital

Cody frames smaller brands as competing with giants that have huge ad budgets.
- If a small brand runs the same thesis as a heavily funded brand, the big one wins "nine to 10 times out of 10" because it has more capital.
- The way to compete is "angle to angle," not capital to capital: zig when they zag and talk about completely different things.
- Rise Superfoods is his example of scale, with roughly 2,500 live ads and about 100 or more new ones deployed daily.

## Mining competitor ads and customer language with agents

He describes this as software, not a person, and says Claude Code could build it.
- A daily cron job uses something like Apify to monitor competitor Facebook Ad Library entries and pull net new creative into a database of active ads.
- A vision model watches video ads and describes what happens second by second. Then aggregate across about 10 competitors to spot larger trends (his example: claymation ads going viral in women's health supplements), and recreate them with Seedance.
- An agent can run for about 12 hours reading Reddit to collect the situations people are in and the language they use. He maps persona by emotional trigger plus situation, using customers' own words that resonate with them.
- Historically, collecting this research would have been prohibitively expensive.

## The ad tournament system that replaces a media buyer

Cody's agent-run media buying works as a tournament, running across his clients' ad accounts.
- Each day, for one company, he publishes about 5 new ad sets with 5 new ads in each.
- Ads within an ad set compete over a 2 to 3 day window. Losers are turned off automatically.
- Winners from each ad set go into a winners pool, and the pool competes for the available ad budget.
- Volume: he says they launch roughly 10,000 to 15,000 ads a month across all client companies, on Facebook, with a learning loop on top.
- His logic: a media buyer's job is an algorithm (publish new creative, look at what works, kill losers, double down on winners), which can be coded. It needs a data stream, an agent that thinks on top of that data, and the ability to make new creative.
- Andromeda view: Meta's ad delivery is effectively one-to-one, finding a single person each ad can reach, even at $30 for a lead, and creative is now cheap enough to feed it at volume.
- He expects the hard problem to shift to "if I'm publishing 10,000 ads a month, what the [ __ ] is working?"
- He predicts about six weeks until a plug-in ad machine produces cinematic, Pixar-style Seedance creative and uploads it to Facebook automatically.
- He says he is in B2B, so his tactics are different from e-commerce.

## Why he won't rely on Meta's built-in AI ads

- He doesn't trust Meta to run ads for brands, comparing it to Google reps who just say "increase budget."
- Platform AI is trained to the average. He wants the outliers, because that is the better place to put limited time, money and mental energy.
- Meta's self-serve tools were designed for the "boost a post" SMB owner, and that may suit an HVAC or tree trimming business that just wants leads.
- To compete in the top 1% or 10%, strategy and context matter. Generic prompting gives bell-curve output ("go write me a blog post about X" gives vague average copy).
- His fix is a "walled garden": give the model source material (for example, 10 expert podcasts on hotel marketing in 2026) and it writes top-tier content. For ads, give direction: "You can go northwest, you can go northeast, I don't care, but you have to go north."

## TikTok phone farms for cheap impressions

Cody uses real-device TikTok farms for brand awareness.
- Setup: real Android phones in a warehouse (his example is Brooklyn) with separate eSIMs and local IPs, scrolling like real users. His provider is Double Speed AI, which gives an API.
- Cost as he recalls it: about $100 per account per month; he runs 10 accounts for about $1,500 (he says "don't quote me" on the per-account figure).
- Math: at 500 to 1,000 views per video across 10 accounts, CPM comes to roughly $2 to $3, versus about $10 for TikTok ads to a general audience. The arbitrage is cheaper impressions.
- Content: slideshows made with Nano Banana, not video. Videos "doesn't work as effectively." The hard part is finding a format that already works.
- Finding formats: scroll TikTok in your category, or use a tool like Virlo (via API with Claude Code) to pull viral posts from the last 7 days.
- Example: a "day in the life of a corporate girly" slideshow that works the product in naturally (a supplement on slide three, taken with matcha). Accounts should look like normal people, not branded.
- He accepts that "the internet is fake" and says the goal is hunting impressions as cheaply as possible.
- Scaling the math: 10 accounts at 300,000 to 500,000 views a month, then 100 or 1,000 accounts. He says this is how new artists and brands appear from nowhere.
- Limits: it is brand-level, not bottom of funnel. It works for B2B only as category brand building, and for e-commerce it can feed the sales process. Attribution is hard, so judge it in aggregate (an average of about 1,000 views per slideshow hits the CPM target).
- Measuring it: look at branded search impressions and clicks in Google Search Console after a strong day. He says nobody has ever solved full ROAS attribution in his ten years.
- On brand: "branded search happens, we just don't know when," and impressions are how you influence word of mouth. His billboard analogy is that accident lawyers buy every billboard because it works.

## Creator seeding combined with the farm

- A separate approach is creator marketing on payroll: scrape about 20,000 beauty creators, cold email them, and pay roughly $900 a month for a video per day across Reels, Shorts and TikTok. With 20 creators that is about 20 videos a day.
- Creators hunt for viral formats. When one hits, he rolls that format out to all creators and to the phone farm.
- Example math: if the average slideshow gets 1,000 views and the original hit 1 million, even 10,000 views on the farm is an outlier worth doubling down on.
- He separates this from influencer marketing, which is about reach and trust (his example is Meta Ray-Ban working with Kylie Jenner to elevate the brand).

## What agents can and can't do today, and his product

- He says agents can do almost anything a human can do on a computer. The one boundary he has found is long-form video editing, such as a two-hour live stream. It needs word-by-word transcription and frame-by-frame vision, which is too expensive, so a Philippines editor at about $1,600 a month is cheaper. He expects it to be solved in roughly six months.
- Styleframe AI: he mentions it for motion graphics from key frames, citing an Apple-style watch animation.
- His company, Grafft, started as a data pipeline and warehouse tool. It now offers the infrastructure to deploy agents and artifacts (such as dashboards) onto live data (Facebook ads, Google Analytics, Shopify) in one place.
- Today he works only with B2B and sells outcomes (plan, engineer and run) because most clients "just want to buy the outcomes." He sees e-commerce as a longer-term fit.
- Open request: he is looking for companies working out a wholesale motion, such as getting into every boutique in the southeastern United States.
