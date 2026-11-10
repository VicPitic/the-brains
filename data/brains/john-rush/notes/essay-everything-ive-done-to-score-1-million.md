## John's SEO scorecard and domain naming rules

John says he has generated over 1B impressions and 1M clicks from SEO over the past years. His domain rules:

- Use .com, .org, .dev, .ai or .io.
- Use keyword-like names, e.g. "osssoftware dot org".
- Keep names to 14 letters max, with no "-" or "_".
- One topic per domain when possible.
- Pick www or non-www and redirect the other to it.

## Technical SEO checklist

- Make sure the page renders HTML when bots request it.
- Drop the URL into Claude and ask whether it does everything right for tech SEO. John says Claude or Codex will lay out the details if shown the site.
- Use HTTPS, be mobile-friendly, and be fast enough that the site doesn't feel broken. PageSpeed Insights is enough. If GSC web-vitals is green, it's fine.
- Keep URLs short and stable, with no random strings. The slug should match the meta title and h1.
- Use one H1 per page, a unique title and meta per page, and alt text on images that matter.
- Put a canonical URL on every indexable page that has no query string.
- Fix 404s and redirect chains.
- Leave no orphan pages. Every important URL needs at least one internal link (seogets shows the orphans).

## Indexing workflow

- Add sitemap.xml to Google Search Console and check that all pages are indexed.
- If pages aren't indexed, run indexrusher.com. Do the same for Bing and Yandex through indexrusher.
- Keep a robots.txt that allows public pages. Ask ChatGPT to check it.
- Request indexing in GSC for new pages, or automate it with indexrusher.
- Check the Coverage / Pages reports and fix "crawled - currently not indexed" on pages that should rank.
- Don't waste crawl budget. Avoid creating too many pages, folders, tags or groups right away. Add them later, once the first bulk is indexed.

## Analytics and the weekly review

- Tools: Google Search Console, an Ahrefs small plan, seogets and DataFast.
- Once a week, John looks at two things:
  - Queries with impressions but few clicks. He takes the queries pointing to those pages and embeds them in the h1 and meta title.
  - Pages that used to get clicks and then decayed. He updates their content.

## Low-hanging fruit: fix what Google already knows

- **Pages in positions 8-20.** They're closer to page 1 than any new article.
  - Add the exact query to the H1, title or H2 if it makes sense.
  - Add one missing section that the current top results have.
- **Lots of impressions, almost no clicks.** Rewrite the title and meta, and keep the keyword.
- **Old pages with a little traffic.** Update them before writing a new one. "Google kinda loves to see pages being regularly updated."
- **Pages Google knows but didn't index.** Request indexing page by page, or run indexrusher. If that doesn't help, remove them, because Google won't index them.
- **Thin pages fighting for the same query.** Keep the stronger URL and merge or 301 the weaker one.

## Five-minute SEO hacks

- GSC → URL Inspection → Request indexing for a URL.
- Put the target keyword in the first 60 characters of the title.
- Add the main query to the H1 if it's missing.
- Add 2 internal links from old posts to the page he wants to push.
- Add alt text to the first image on the page.
- Add a 3-question FAQ at the bottom using GSC queries.
- Submit or resubmit sitemap.xml in GSC.
- Search `site:mydomain` to see which pages are indexed and how they look.
- Google his brand plus the product keyword. If a page mentions him with no link, ask them to add one.
- Ask ChatGPT "best tool for [keyword]", open the cited URLs and email those authors the same day, offering money or a link exchange.
- Post the article URL on X, LinkedIn or Reddit with the keyword in the first line.
- Drop the URL into Claude: "what 5 on-page fixes can I do in 5 minutes?"

## Blog and content approach

- Write 1 good blog post a week, done manually with some AI assistance. Focus on the most promising keywords where he already ranks high.
- Use seobotai.com to generate more articles, see which get traction, then manually turn the promising ones into high-quality human-made articles.
- Before writing, search Google for the keyword. Match the format that already ranks and answer the question better than the current top 5.
- Put original material in the article: screenshots, his own numbers, and what he actually tried. This assures Google the article comes from a human's own experience.
- Refresh old posts that already get impressions. Update the date only if the content actually changed: "avoid hacks here, do real updates".
- Add these page types on top of the weekly post: "best X", "X vs Y", "X alternatives", and "how to" for the exact job the product does.

## Backlinks, social SEO and AI search

**Backlinks**
- Ask ChatGPT "What's the best tool for...", see the URLs it used, and reach out to those authors. Ask them to include his URL in exchange for money or a backlink.
- Repeat in Claude, Perplexity, Gemini and Grok. Do the same with pages that already rank in Google for his keywords.
- List on as many directories as possible using listingbott.com.
- Link pages across all his websites, and do internal linking between blog articles and pages on each site.
- Other things that still work: guest posts on sites that already rank for his keywords, "best tools" roundups, and unlinked brand mentions.
- Linking pages should have real traffic, a topic close to his, and a natural-looking link. "Avoid spam at all cost."

**Social media SEO**
- Reddit, X, Substack and LinkedIn get indexed instantly.
- Monitor hot keywords and trends with Google Trends and Radar on X. Produce posts around them with some product links inside.
- Find relevant social posts via Google Search and add his product in the comments only when it adds value. No spam.
- Put the keyword in the first line of the post.
- Turn each good blog post into 1 X thread, 1 LinkedIn post and 1 Reddit answer where it helps, each linking back to the original URL. In his experience, social media backlinks carry really high weight for Google.
- Reply under bigger posts in his niche with a useful reply first. Add a link only if it adds something.

**AI search**
- He says it's the same game as SEO.
- Ask ChatGPT, Claude, Perplexity and Gemini "What's the best tool for [my keyword]?" and "Best alternatives to [competitor]", and see whether they mention him.
- If not, look at who they mentioned and get onto those same pages by paying them or doing a link exchange.
