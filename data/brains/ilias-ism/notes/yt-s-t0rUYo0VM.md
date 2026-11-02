## Ilias's pattern-recognition view of entrepreneurship and templates

- Ilias argues entrepreneurship "is really about seeing patterns and being able to understand them and use them", including for Twitter viral marketing and growth ideas.
- He says his speed on SEO audits comes from volume: he opens a website and already knows what to change for SEO or a blog post, because the knowledge "sticks in your brain" from years of trial and error ("learn through pain" from products that didn't ship or sell).
- He uses templates for tweets, headlines, SEO titles, landing-page descriptions and email subject lines, because the same templates keep working on people's psychology.
- He keeps swipe files: he collected about 200 SEO titles and headlines that work and fed them to ChatGPT/Claude, so he now has a quick tool that outputs an optimized SEO title. He did the same for tweets and wants to productize it one day.
- He also saves good emails (e.g. from Danny Postma) in a folder to reuse and optimize.
- His design method: collect references, take the best parts of about 10 products, and combine them into one unique page. He built an OG image tool this way: the top line from one tool, buttons from another, popups from others (e.g. ShipFast).
- He advises finding five references and spotting what they share before building something, rather than starting from scratch.
- On product timing, he says he used to launch many products with no audience and nothing happened. If he did it again he would build in public first, talk to people, find recurring problems, and then build for specific groups.

## Twitter "drop your domain" SEO tip template

- Ilias runs a reply-bait tweet: "drop your site domain, I'll give you one tip to improve your SEO strategy", combined with an auto-DM (Typefully or Tweet Hunter style) that sends links.
- First run, November 2023: about 330 replies, many bookmarks, around 70,000 views.
- Rerun the same week as this recording to prove the template works: about 110k views and 460 replies, with an account that had grown from roughly 100-200 followers to almost 4,000.
- His earlier variant was "You deserve a break, I'll give your site a mini SEO checkup for free, I'll record a video analysis" (a testimonial video attached). It got only about 7,000 views, which he calls a good thing: the video reviews took up to 13 minutes each, and at 20 minutes per person, 100 replies is about two weeks of work.
- His rule: keep the deliverable under about 5 minutes per person, otherwise you spend days answering.
- Friends copied the template with their own specialty: a conversion-rate-optimization version (300-follower account roughly doubled followers), a "one idea to grow your product" version (about 200 replies in a day), "explain to your mom what your product does" (130 replies), and a product-hunt pre-launch version with a DM sent to everyone. Landing-page redesign offers also went viral for another founder (about 120 comments).
- It did not work on LinkedIn for him.
- Side benefits he lists: DMs from leads, content you can compile into a Notion doc, blog post or paid info product, social proof from testimonials, and followers who see you as an expert without it being spam.

## How tweets go viral in stages, and Twitter vs LinkedIn

- Ilias describes three stages for a viral tweet: first it is shown to close friends and followers; if they engage it spreads to a slightly bigger group; after about 6-8 hours, when American traffic wakes up (for him in Europe), views can jump from about 20K to 100K+. He says a tweet must pass all stages to go super viral.
- He thinks LinkedIn's algorithm differs and people there are more hesitant: Twitter rewards "build in public" and admitting "my website needs help", while LinkedIn culture leans toward "my website is already perfect", so different content is needed.
- On Twitter, he says it is one of his best channels for generating leads and getting high-quality clients, and gives immediate feedback from other founders.
- He promotes products he genuinely finds underexposed (e.g. a blog-to-Pinterest scheduler tool), because he feels better products deserve visibility.

## Technical SEO audit checklist

Ilias's quick audit uses the Ahrefs SEO toolbar and checks the following:
- Domain rating and backlink/referring domain counts at the page level.
- **Canonical URL:** missing canonicals mean Google treats URL variants (e.g. with query parameters) as separate pages; a canonical concentrates link juice on one page.
- robots.txt and sitemap.xml, including removing pages from the sitemap that shouldn't be in it.
- **Structured data:** e.g. person schema for a personal site, article schema for blog posts, review schema for review snippets. He says star-rating snippets help a page stand out versus a plain result; which schema to use depends on niche (courses, books, e-commerce).
- **Open Graph images:** auto-generate them (he notes they can be generated, and suggests adding a title and type). He says OG is for social/chat previews and does not impact rankings.
- Add alt text to images.
- **Unique titles on every page:** he says titles are among the most important things to manage. Check them with a Google `site:` search; if every page shows the same or duplicated title, fix it.
- Make sure the homepage explains what the tool is. On the audited product, he preferred a longer "about" style front page over a one-screen demo page, and suggested adding social proof such as stars from a testimonial tool.
- A one-page site will struggle to rank for much, and blogs written randomly "waste a lot of time" if not done in a specific way.

## Domain migrations and building domain authority

- To move from one domain to another, Ilias sets up 301 redirects (e.g. Cloudflare rules, dynamic regex redirects, or on Vercel) mapping every page to its equivalent (/blog to new /blog), not just the root domain, since redirecting only the root destroys the purpose.
- He also says to use Google Search Console's "change of address" tool.
- He recommends hosting everything under one domain or subdomains where possible, because it concentrates domain rating. Separate domains for user-generated pages are acceptable, especially if they backlink to the main product.
- He frames SEO as building domain authority as an asset: with a domain rating of 60-70+, every new product or page launched from that domain gets an advantage.
- His example is Canva: domain rating about 92, around 370 domains linking in, many tools on one domain, so any new tool or blog post can outrank rivals even for keywords where Midjourney or ChatGPT seem like the obvious winner. He compares domain rating to a social account with many followers.
- Another tactic he's seen: competitors redirect expired domains that had backlinks to their landing pages.

## Competitor keyword research and ranking for listicles

- Ilias picks a few competitors (for the audited tool: Webflow, Framer, Unicorn Platform), compares their top pages and keywords in Ahrefs, and goes keyword by keyword. He treats it as "which keyword should I focus on and what can I do to get into this list?" rather than "what content should I write".
- He skips low-intent keywords (e.g. "ChatGPT website") that bring people looking for something else.
- **Alternatives pages:** make "X alternatives" pages, list your tool on G2 and Product Hunt (mark yourself as the tool you use instead of the competitor so you appear as an alternative), and go through the top 100 keywords even though it takes long.
- **Get listed in existing lists:** open the pages Google ranks, find their contact or partner page, and reach out even if they say they don't accept guest posts. Offers include: a free article (paid placements typically cost roughly $200 to $1,000 per post), a link exchange, a free product, or a social shout-out. Being mentioned as a tool, even without a dofollow link, already wins part of that keyword. Also reach out to YouTubers who made reviews.
- Write for Starter Story-type sites: he says Starter Story has strong SEO ratings, and submitting your own story creates a high-value backlink (he has been featured).
- **Listicle format is mandatory:** if Google shows lists (5, 7, 14, 22 tools), you can only rank with a list. The title starts with a number and includes the keyword (e.g. "5 Best Website Builders for Beginners in 2024"), followed by an introduction, a numbered list, and a conclusion. He says deviating from the format wastes time.
- Keep titles within about 60 characters or they get cut off in search results.

## How to make a listicle outrank the competition

- Ilias analyzes the page ranking first and explains why it wins: it shows a feature comparison table, an overall score, pricing, whether there is a free plan, pros and cons, images/screenshots of the software, a "since our last update" note, expert tips, and "best for" labels (e.g. best for e-commerce, best for beginners, easiest design).
- He criticizes a weaker page (ranked ninth): the intro skips explaining what website builders are, the evaluation criteria come too early, the list items are too short, with no images, pricing or detail, and an unnecessary extra H2. His view: listing pros and cons alone provides "no value".
- To outrank it, he says make a better page with unique insights: who each tool is best for, screenshots, use cases, example sites, reviews of users, and comparison with competitors (e.g. one focused on AI content vs another on simple directories).
- His rule: the more unique information you can provide, the better, and AI-written generic content loses against pages with real insights and images.
- For content planning, he suggests building a sitemap/directory structure beforehand, looking at competitors, and choosing specific keywords. A feature-explainer page for the product is fine as a landing page, but blog effort should go to competitor keywords.
- He uses Zebra-brief-style content-brief tools (he names Stefan's tool, "Z brief") for outlines and keyword ideas, and Story Chief for agencies with multi-writer workflows, scheduling and multi-channel distribution.

## Distribution after publishing and podcast repurposing

- Ilias says writing an article is not enough; distribution is what makes it rank. His repurposing list: send it in your newsletter, link it from your top pages, make a Pinterest pin in portrait format, schedule tweets or a thread (using Typefully or similar, asking an AI for tweet ideas from the article), post to LinkedIn and everywhere else, and reach out for backlinks ("I built this page, do you want to link to it?").
- He says there is a lot of effort involved, so focus on the most important keywords one by one: do the maximum effort per keyword.
- For podcasts, he suggests making episode pages with transcripts and embedded tweets to rank for the content, then posting everywhere (Twitter, LinkedIn, Pinterest, email).
- He offers free quick audits to people who reach out on Twitter, but notes the real cost of SEO is time and prioritization: "pick a few keywords, focus on those" instead of writing random blogs.
