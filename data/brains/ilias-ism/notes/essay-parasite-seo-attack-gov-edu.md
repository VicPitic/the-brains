## Parasite SEO on high-authority domains: what Ilias observed (Sept 2025)

Ilias documented what he calls "one of the most aggressive examples of Parasite SEO I've ever seen": attackers compromising `.gov` and `.edu` sites and publishing thousands of spam pages, mostly SEO-optimized PDFs, that rank almost instantly for illicit, high-volume keywords.

- One Canadian `.gov` domain went "0 → 8M organic traffic in 24 hours".
- Compromised subdomains he named: `covididr.duhs.duke.edu`, `mienviro.michigan.gov`, `meetings.ctc.ca.gov`, and `wayne.edu`.
- The pattern shows up across domains that share the same CMS or software, which he reads as a sign they are fully compromised.
- The spam is not gibberish. It is well-structured, looks like a legitimate article, and includes calls-to-action that funnel traffic to illicit sites.

## Scale of the traffic: numbers from specific domains

- **Duke University (DR 94):** a subdomain's organic traffic spiked to over 21.8 million visitors. Ilias exported over 1,200 compromised PDFs to a public Google Sheet. Per-PDF traffic estimates range from thousands to hundreds of thousands of monthly visits, across keywords from adult content to gambling to illegal services.
- **Michigan.gov (DR 91):** a compromised PDF ranks #1 for "ai undresser", a keyword with 70,000+ monthly searches (90,500 volume and $2.48 CPC in his keyword tool).
- **ca.gov:** over 3,000 compromised pages ranking for spam keywords, an estimated 2.1 million monthly visits.
- **Wayne State (wayne.edu):** thousands of compromised pages driving large traffic for illicit keywords.
- Government domains were also ranking for NSFW AI bot searches, the same results his own NSFW AI chatbots guide competes in.

## Why it works: Google's authority bias

- Ilias's core claim: "Google heavily weights domain authority." Spam placed on `michigan.gov` (DR 91) or `duke.edu` (DR 94) inherits instant trust and ranking power.
- The algorithm "can't distinguish between legitimate government content and spam when both exist on the same trusted domain."
- That is why attackers target `.gov` and `.edu`: they get instant #1 rankings that would take years to earn on a normal domain, for keywords with real commercial value.
- The upside of authority is also the risk. High authority makes a domain "a high-value target for attackers."

## How he says to defend a high-authority site

Ilias frames this as brand protection, not just a technical issue. His steps for universities, agencies, and large corporations:

1. **Audit for vulnerabilities.** The most common vectors are outdated CMS versions, vulnerable plugins, and misconfigured file upload forms. He suggests automated scanning of code, dependencies, and infrastructure with a tool like Aikido, or an immediate thorough manual audit.
2. **Monitor Google Search Console.** Check the "Pages" report for URLs you don't recognize. A sudden spike in indexed pages is a major red flag. Ahrefs or SEMrush can also be used to watch traffic.
3. **Configure robots.txt properly.** Disallow crawling of sensitive directories and file types, for example `/admin/`, `/uploads/`, `*.pdf$`, `/temp/`, `/cache/`. He notes this "won't stop determined attackers," but it can keep search engines from indexing spam if it does get uploaded to those locations.

## Detecting this kind of attack from the outside

- A Google `site:` search on a suspect subdomain is a quick way to see the extent of a compromise.
- Keyword and traffic tools (he uses his own LinkDR keyword tool) show whether an authority domain suddenly ranks for off-topic, high-volume terms.
- Exporting the top pages of a compromised subdomain into a spreadsheet exposes the pattern: many PDFs, thousands to hundreds of thousands of monthly visits each, and unrelated spam keywords.
