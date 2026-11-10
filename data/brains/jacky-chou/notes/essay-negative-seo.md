## What negative SEO is and why it happens

- Jacky defines negative SEO as lowering a competitor's search rankings through dishonest or unethical means.
- It is not always deliberate. Link farms, private blog networks, and thousands of bot scraping sites generate links, and a clean site can get lumped in with them.
- Motives he lists: sabotaging a competitor, extortion, or simply causing chaos. Negative SEO services are sold openly online.
- Some attacks are accidental or come from inside. Family members, employees, or paid SEO companies may use black hat tactics to try to boost the site.
- He says searches for "negative SEO" have been rising over the previous 24 months and that the problem is not going away.
- Attacker methods include duplicating content, fake social profiles, hacking and link spamming, spammy misspelled anchor text, and getting existing links to the site removed.

## Does negative SEO work?

- Google's official position (John Mueller, Gary Illyes) is "no", and Mueller has called it a meme.
- Jacky does not take that at face value. His view: negative SEO can still work, but it is far less of a problem than it was some years ago.
- Why it is harder to pull off now:
  - Since Penguin 4.0, Google devalues link spam instead of penalizing whole sites.
  - Penguin became more granular. It adjusts ranking based on spam signals rather than hitting overall ranking, and it targets the unsophisticated link spam most attacks rely on.
  - Spam-filled results would drive users away from Google and hurt its ad revenue, so ineffective negative SEO is core to Google's business.
- Link-based attacks are less common than they used to be, but attacks are not limited to links. A hacker can inject malicious code, outbound links to bad sites, or bogus negative reviews.
- Conclusion: finding and disavowing dodgy links is no longer enough. Monitor your whole online presence and use good security.

## Link-based attacks: link farms and fake removal requests

- **Link farms:**
  - One or two spammy links rarely matter, so attackers use networks of related sites.
  - Most links share the same exact-match anchor text, either irrelevant to the target or a term that makes the owner look like they are manipulating their own link profile.
  - Case: WP Bacon, a WordPress podcast site, quickly accumulated thousands of links with the anchor "porn movie". In a week it dropped more than 50 places for most of its ranking terms. The webmaster disavowed the spammy sites and regained most of its positions.
- **Fake link removal requests:**
  - Unethical SEOs email sites that link to you and persuade them to remove some of your best links.
  - It is uncommon but can be devastating. Losing several top backlinks in a day can significantly drop rankings.
  - You can't stop the emails. Defend by watching for signs of an active removal attempt and acting fast, using Ahrefs Alerts.

## Technical and on-site attacks and their fixes

- **False URL parameters:**
  - Parameters used for sorting and filtering (common in e-commerce) can be abused if the site is not configured properly, so many near-identical versions of a page get indexed.
  - Detection: the Coverage report in Google Search Console. A rise in indexed pages can signal an attack.
- **Heavy crawling:**
  - Aggressive crawling raises server load, slowing or crashing the site. Repeated incidents can cost search credibility.
  - Fix: ask your host or webmaster whether a slowdown is maintenance, organic traffic growth, or an attack. Options include firewall rules or routing traffic through a DDoS protection provider.
- **DDoS:**
  - Floods the server until resources run out. Attacks that only slow the site are sneakier than ones that crash it, because page speed and Core Web Vitals are ranking factors.
  - Fix: continuously monitor incoming traffic and requests. Subtle attacks can be spotted this way, but massive ones can take a site down in seconds.
- **Hacking:**
  - Can inject low-quality or duplicate content, change links, add new links, or alter robots.txt to disrupt indexing.
  - Fix: regular site audits with a tool to catch small changes that would otherwise go unnoticed.
- **Duplicate content:**
  - Content is scraped and republished elsewhere, and Google has to decide which copy to rank, which is not necessarily the original.
- **Pogo sticking:**
  - Bots search for terms you rank for, click your result, and leave immediately, signaling that your page does not satisfy the query.
  - Fix: regularly monitor your most important pages' stats in Google Analytics.

## Reputation attacks: fake reviews and fake profiles

- **Fake reviews:**
  - He treats reviews as just as important as quality backlinks. A flood of negative ones hurts local search results and the business itself, and reviews are easy to manipulate.
  - Fix: check Google My Business often and read every new review. Fake reviews violate Google's policy.
- **Fake social profiles:**
  - Attackers create profiles in your name and misuse them to attack your credibility.
  - Fix: use social listening tools (HubSpot, Hootsuite, Social Mention) that alert you when your name is mentioned. Respond quickly and directly to criticism so it doesn't gain traction.

## Protection playbook

1. **Detect early.** Watch organic traffic in Google Analytics. A drastic drop often signals a Google penalty. Search Console emails you about indexing problems or manual penalties, and the sooner you know, the sooner you can respond.
2. **Secure the admin login.** Hackers usually need admin access, so extra layers of protection reduce the chance of altered SEO properties, changed critical files, and modified redirects.
3. **Disavow.** Google's disavow tool (released October 2012 after public outcry over negative SEO) tells Google you don't want credit from low-quality links. It is especially useful against link farms and Google bowling.
4. **Review SEO settings regularly.** Periodically check on-page elements, robots.txt, headers, and image alt tags.
5. **Prevent hacking.** Set up Search Console alerts, run frequent site audits, and consider hiring cybersecurity companies or staff. A hacked site may carry spammy signals you can't see even though you still have full access.
6. **Fight fake backlinks.**
   - Run a backlink audit tool regularly and watch the score indicator for suspicious changes.
   - Track your authority score trend, since a drop can mean something is wrong in the backlink profile.
   - Update your disavow file regularly when new harmful links appear that you can't remove.
   - For hundreds of bad links, handle it like a manual action: go link by link, group them by criteria, and disavow.
7. **Speed up the site.** Use Google Analytics alerts to catch slowdowns. Fixes: enable caching, disable resource-heavy plugins, optimize image sizes, delete excess code, and block spammer activity.

## Relying on Google

- Jacky says Google works behind the scenes against negative SEO but can't share details, since that would give spammers a head start.
- Google wants you to trust it to rank sites properly, but he asks: "Do you really want to rely on Google to remove all of the spammy links?"
- His stance: "It is always better to be safe than sorry." Whatever attack is underway, it can be fixed, and you don't have to sit back and watch it happen.
