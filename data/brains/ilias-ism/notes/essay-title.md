## Page title formula and anatomy

Ilias treats the SERP as the brief for any page title. Bad titles usually fail because they are vague, bloated, mismatched, or clever when Google wants obvious. His starting formula is **primary keyword + useful modifier/benefit + brand**, used mainly to stop people writing titles like "Home".

- Weak to better: "Home" becomes "Client Portal Software for Accountants". "Products" becomes "Best AI Presentation Makers in 2026". "Pricing" becomes "Client Portal Pricing".
- A title tag is the HTML `<title>`, shown as Google's blue headline. It tells Google what the page is about and tells humans why to click.
- If the title is weak, Google may rewrite it. If it is too long, Google cuts it off. If it doesn't match the page, people bounce.
- His summary: "Better page titles are one of the highest-ROI SEO fixes because they sit at the intersection of ranking and CTR." The title should be "clear first", not clever first.

## Put the main query first and align everything around it

The strongest pattern from his SEO Roasts is boring but effective: SEO title, meta description, H1 and URL slug should all point at the same primary phrase.

- Use the query people actually search. "Secure Collaboration Platform for Modern Firms" loses to "Client Portal Software for Accountants".
- Front-load the main phrase so Google and humans understand the page in the first few words.
- Keep slugs stable for the head term (e.g. `/best-ai-presentation-makers`) and update the title as numbers or years change ("10 Best AI Presentation Makers in 2026"). A slug like `/five-options` with a title that later says "10 options" creates a mismatch he calls a "tiny SEO goblin".

## Length: 40-55 characters, keep key words before the cutoff

His practical sweet spot is 40-55 characters. He notes it isn't a law, since Google uses pixel width rather than character count, but it keeps titles readable and avoids truncation.

- Overlong titles kept appearing in roasts: a digital signage page with a 94-character title while competitors were closer to 60, a client portal title getting cut off, and a homepage title that needed to stay under roughly 60 characters.
- The rule: "Shorten until the words that matter appear before the ellipsis." If Google cuts off the benefit, the number or the query, the title is too loose.
- The goal is not exactly 60 characters. It is keeping the important words visible before truncation.

## Mirror the SERP and use proven title patterns

Before writing a title, he searches the keyword and compares the top 10 titles side by side.

- Look for repeated words and formats: "best", "top", years, numbers, "software/tools/platform/service", and paired phrases like "client portal" vs "customer portal".
- This is "matching the market", not copying. If every top result says "best AI presentation makers" and yours says "AI slide creation solution", you have "invented a worse phrase".
- Patterns by intent:
  - How-to: `How to [Task]`
  - Definition: `What Is [Term]?`
  - Guide: `[Topic]: A Beginner's Guide`
  - Listicle: `[Number] Best [Tools]`
  - Checklist: `[Topic] Checklist: [Number] Tips`
  - Comparison: `[A] vs [B]`
  - Error: `What Does [Error] Mean?`
- Modifiers that keep showing up: Best, Top, Complete, Beginner's Guide, Examples, Template, Free, 2026. He warns that "Jaw-dropping", "Unbelievable" and "Shocking" make you sound like you sell miracle protein powder.

## Match the page type, avoid nothing titles, don't stuff keywords

- The title should match the URL's job: pricing pages say pricing, support pages say support, docs say docs or documentation, login pages say login. In one roast a pricing URL was weaker because the title didn't match pricing intent, which he calls an easy fix.
- Ultra-short titles are as bad as long ones. "Home" and "About" are shrugs. A homepage title should say what the product does, e.g. "AI Customer Support Chatbot for SaaS Teams".
- Numbers and years work because they set expectations, but the page must match: "8 benefits" means the page clearly has 8.
- Google's guidance he follows: make titles unique, descriptive and concise, avoid boilerplate, avoid keyword stuffing, and match the page's language. Bad: "SEO Title Generator | SEO Title Tool | Best SEO Title Tags SEO". Good: "SEO Title Generator: Write Better Titles in 2026".

## Title audit loop and checklist

His loop for fixing titles:

1. Pick the target keyword.
2. Search it in Google.
3. Pull the top 10 titles.
4. Note repeated words, numbers, years and modifiers.
5. Check page type and search intent.
6. Write 5-10 title options.
7. Keep the important words under the cutoff.
8. Align title, meta description, H1 and slug.
9. Re-index the page.
10. Measure CTR in Google Search Console.

- "If a page has high impressions and low CTR, the title is often the fastest win." He adds "not always", but says to check it before launching "a 4-month content strategy".
- Pre-publish checklist: primary keyword near the front, matches page type, unique, around 40-55 characters, important part survives truncation, matches H1/description/slug, mirrors the SERP without copying, sounds human. "If yes, ship it. If no, tighten."
- He built the SEO Title Generator inside SEO Roast (seoroast.com) because this workflow kept coming up in audits: enter a keyword, pull top-ranking titles, see common words/length/structure, generate options, then grade the final title.

## Bulk-fixing titles with a Cursor Agent Skill

For dozens of weak titles, he turns the rules into a reusable Cursor Agent Skill so he doesn't re-explain them each time.

- Create `.cursor/skills/seo-title-optimization/SKILL.md` (Cursor discovers skills from `.cursor/skills/` or `.agents/skills/`). The skill's description triggers on mentions of titles, title tags, SERP titles, metadata titles, CTR, truncation, or bulk title improvements.
- The skill encodes: primary query near the front; align title, description, H1 and slug; match page type; keep key words visible before truncation; 40-55 characters; clarity over stuffing; unique titles; mirror SERP patterns; don't change slugs just to match temporary numbers or years.
- Its workflow: identify the primary keyword, determine intent, compare top-ranking titles when SERP data exists, choose a pattern, draft 3-5 options, pick the most accurate and clickable one, and return a before/after table for bulk work.
- Example prompt: "Use the seo-title-optimization skill to audit all MDX blog post titles in content/blog. Return a before/after table with suggested titles around 40-55 characters when possible. Do not edit slugs."
