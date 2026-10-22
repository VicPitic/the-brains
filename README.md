<div align="center">

<img src="docs/assets/logo.svg" width="64" height="64" alt="The Brains logo">

# The Brains

**The smartest brains on earth, in an MCP.**

Founders, CEOs and investors, each turned into a searchable MCP server built from their talks, essays and posts.<br>
Add one to Claude, Cursor, ChatGPT or Codex. Every answer cites its source.

[**brains.ceo**](https://brains.ceo) · [Request a brain](https://github.com/VicPitic/the-brains/issues/new?template=request-a-brain.yml) · [How it works](#how-it-works) · [Run your own](#run-it-yourself)

[![License: MIT](https://img.shields.io/badge/license-MIT-ff0083.svg)](LICENSE)
[![Brains](https://img.shields.io/badge/brains-42-202020.svg)](https://brains.ceo)
[![MCP](https://img.shields.io/badge/MCP-streamable%20HTTP%20%2B%20OAuth-4a4a4a.svg)](https://modelcontextprotocol.io)

<img src="docs/assets/home.png" alt="The Brains directory" width="900">

</div>

---

## Use a brain in 30 seconds

Every brain is a public MCP URL: `https://mcp.brains.ceo/<slug>/mcp`. To get every brain behind one connector, use `https://mcp.brains.ceo/mcp` (tools: `list_brains`, `search_brains`, `list_sources`).

```bash
# Claude Code
claude mcp add --transport http levels-brain https://mcp.brains.ceo/pieter-levels/mcp
# then run /mcp and choose Authenticate
```

```bash
# Codex
codex mcp add levels-brain --url https://mcp.brains.ceo/pieter-levels/mcp
codex mcp login levels-brain
```

In **Cursor**, **Claude.ai / Claude Desktop** and **ChatGPT**, add it as a custom MCP server or connector with the same URL. Each brain page on [brains.ceo](https://brains.ceo) has one-click buttons and step-by-step instructions for each client.

The first time you connect, your client opens a short sign-in: enter your email and the 6-digit code we send you. It's free, and there are no passwords.

Then just ask: *"How would Levels price this?"* or *"What would Paul Graham say about my idea?"*

### Tools

| Tool | What it does |
|---|---|
| `search_brain(query, limit)` | Searches the brain and returns passages, each with its source link and date |
| `list_sources()` | Lists every talk, interview, essay and post collection in the brain |

## The brains

| Brain | Who | Long-form | Posts | Transcript hours |
|---|---|---|---|---|
| [Nevo David](https://brains.ceo/nevo-david) | Solo founder of Postiz, the agentic social media scheduler. **His own brain**, linked straight to [mcp.nevo.md](https://nevo.md) | 101 | 458 | n/a |
| [Paul Graham](https://brains.ceo/paul-graham) | Y Combinator cofounder and essayist on startup ideas, growth and founders | 45 | 370 | 11 |
| [Naval Ravikant](https://brains.ceo/naval-ravikant) | AngelList co-founder and angel investor; author of the How to Get Rich thread | 29 | 266 | 36 |
| [Pieter Levels](https://brains.ceo/pieter-levels) | Solo founder of Photo AI, Nomad List and Remote OK, bootstrapped with $0 funding | 34 | 259 | 17 |
| [Alex Hormozi](https://brains.ceo/alex-hormozi) | Co-founder of Acquisition.com; built Gym Launch by licensing his gym playbook | 28 | 248 | 34 |
| [Marc Lou](https://brains.ceo/marc-lou) | Solo founder of TrustMRR, DataFast and ShipFast; $3M from 36 startups | 44 | 216 | 14 |
| [Sam Altman](https://brains.ceo/sam-altman) | CEO of OpenAI and former president of Y Combinator | 45 | 119 | 19 |
| [Jack Friks](https://brains.ceo/jack-friks) | Solo founder of Post Bridge; grows apps with organic short-form video | 20 | 142 | 11 |
| [Alexandr Wang](https://brains.ceo/alexandr-wang) | Chief AI Officer at Meta, founder of Scale AI and Meta Superintelligence Labs | 27 | 96 | 23 |
| [Rob Walling](https://brains.ceo/rob-walling) | Runs MicroConf and TinySeed; built Drip, bought and sold HitTail | 40 | 74 | 11 |
| [Elon Musk](https://brains.ceo/elon-musk) | CEO of Tesla and SpaceX; co-founder of PayPal, Neuralink and The Boring Co. | 21 | 67 | 37 |
| [Rob Hallam](https://brains.ceo/rob-hallam) | Co-founder of SuperX, building in public on X from $0 to $80K/month | 20 | 101 | 8 |
| [Jason Calacanis](https://brains.ceo/jason-calacanis) | Angel investor backing 100 startups a year; host of TWiST and All-In | 29 | 88 | 34 |
| [Yahia Bakour](https://brains.ceo/yahia-bakour) | Solo YC founder of Context.dev; sold Stock Alarm for $500K | 7 | 157 | 2 |
| [Ryan Hoover](https://brains.ceo/ryan-hoover) | Founder of Product Hunt and investor at Weekend Fund | 48 | 147 | 20 |
| [Romàn Czerny](https://brains.ceo/roman-czerny) | Co-founder and CMO of Gojiberry AI (YC); sold his first SaaS for 7 figures | 16 | 181 | 8 |
| [Blake Anderson](https://brains.ceo/blake-anderson) | Co-founder of Cal AI, Umax and RizzGPT; now building 10x | 21 | 137 | 17 |
| [Ruben Hassid](https://brains.ceo/ruben-hassid) | AI educator behind the How to AI newsletter. **LinkedIn brain** | 37 | 265 LinkedIn | 12 |
| [Justin Welsh](https://brains.ceo/justin-welsh) | Built a one-person business to $10M+ with no employees or paid ads. **LinkedIn brain** | 30 | 239 LinkedIn | 14 |
| [Adam Robinson](https://brains.ceo/adam-robinson) | Bootstrapped founder behind RB2B and Retention.com. **LinkedIn brain** | 27 | 285 LinkedIn | 21 |
| [Bryan Johnson](https://brains.ceo/bryan-johnson) | Founder of Blueprint and Kernel. **Health brain**: his sleep, diet, exercise, supplement and biomarker protocols | 29 | 177 | 7 |
| [Shaan Puri](https://brains.ceo/shaan-puri) | Co-host of My First Million; sold the Milk Road newsletter | 28 | 195 | 8 |
| [Alex West](https://brains.ceo/alex-west) | Solo founder of CyberLeads; wrote the 13-book "How I Made $1M From My Personal Projects" | 33 | 172 | 9 |
| [Corey Haines](https://brains.ceo/corey-haines) | Cofounder of Conversion Factory; includes 42 playbooks from his open-source Marketing Skills | 68 | 110 | 12 |
| [Lenny Rachitsky](https://brains.ceo/lenny-rachitsky) | Writer of Lenny's Newsletter, ex-Airbnb product lead. Built from his own essays and talks, not his guests | 31 | 161 | 14 |
| [Greg Isenberg](https://brains.ceo/greg-isenberg) | Host of The Startup Ideas Podcast and CEO of Late Checkout | 30 | 298 | 12 |
| [Guillermo Rauch](https://brains.ceo/guillermo-rauch) | Vercel CEO and creator of Next.js, building v0 and the AI Cloud | 33 | 186 | 18 |
| [Zach Yadegari](https://brains.ceo/zach-yadegari) | Built Cal AI to $50M ARR and sold it to MyFitnessPal; now building Persona | 25 | 103 | 17 |
| [Andrew Huberman](https://brains.ceo/andrew-huberman) | Stanford neurobiologist, host of Huberman Lab. **Health brain**: his sleep, light, focus, exercise, nutrition and stress protocols | 39 | 300 | 38 |
| [Jason Cohen](https://brains.ceo/jason-cohen) | Founder of two unicorns, Smart Bear and WP Engine. Includes all 202 of his A Smart Bear essays (2007 to 2026) | 221 | 300 | 20 |
| [Socrates](https://brains.ceo/socrates) | Athenian philosopher. **Thinker brain** built from Plato's and Xenophon's dialogues (public-domain translations) | 36 | n/a | n/a |
| [Iman Gadzhi](https://brains.ceo/iman-gadzhi) | Started a social media agency at 16; now teaches agencies and personal brands | 42 | n/a | 39 |
| [Tibo](https://brains.ceo/tibo-maker) | Sold Tweet Hunter and Taplio; now runs a bootstrapped SaaS portfolio | 30 | 250 | 12 |
| [Danny Postma](https://brains.ceo/danny-postma) | Founder of HeadshotPro; sold Headlime to Jasper for seven figures | 11 | 187 | 6 |
| [Alex (@alexxgrowth)](https://brains.ceo/alexxgrowth) | CMO of Content Rewards; sold clipping agency Virality for 7 figures at 16 | 7 | 126 | n/a |
| [Priyam Raj](https://brains.ceo/priyam-raj) | Bootstrapped founder of VidAI (~$70k/mo) with two SaaS exits | 11 | 82 | 8 |
| [Damon Chen](https://brains.ceo/damon-chen) | Bootstrapped founder of Testimonial.to and PDF.ai, started solo after Cisco | 10 | 225 | 3 |
| [Warren Buffett](https://brains.ceo/warren-buffett) | Berkshire Hathaway chairman. Every shareholder letter from 1977 to 2024, the partnership letters and 12 talks | 65 | n/a | 23 |

Missing someone? [Request a brain](https://github.com/VicPitic/the-brains/issues/new?template=request-a-brain.yml). The most-requested ones get built first.

## How it works

A brain is a small, curated, cited knowledge base, not an archive of everything someone ever said. Each one holds 15–45 long-form sources and a few hundred hand-picked posts, all filtered to the person's principles on growth, distribution, pricing and building a business.

```
discover ──▶ curate ──▶ fetch ──▶ cards ──▶ notes ──▶ index ──▶ manifest ──▶ MCP + site
 (cheap       (Claude     (only the  (one per   (sectioned,  (BM25)    (brain.json)
 metadata)    picks)      shortlist) source)    third person)
```

| Step | Command | Output |
|---|---|---|
| 1. Discover | `node pipeline/discover.mjs <slug>` | `candidates.json`: top X posts, YouTube interviews and talks, essays |
| 1b. Deep X pull | `node pipeline/x-deep.mjs <slug> [minFaves] [maxItems]` | Business-keyword and high-engagement posts (Apify, ~$0.40 per 1,000) |
| 1c. LinkedIn pull | `node pipeline/linkedin.mjs <slug> [maxPosts]` | Recent LinkedIn posts and profile for LinkedIn-first people (Apify, ~$2 per 1,000 posts) |
| 1d. Full post text | `node pipeline/x-refresh.mjs <slug>` | Re-fetches the full text of long X posts already in a brain (~$0.0004 per post) |
| 2. Curate | a Claude agent following [`docs/brain-runbook.md`](docs/brain-runbook.md) | `shortlist.json`: 12–30 long-form sources, 60–300 posts |
| 3. Fetch | `node pipeline/fetch.mjs <slug>` | Transcripts and essay text for the shortlist only (not committed) |
| 4. Cards | `node pipeline/summarize.mjs <slug>` | `cards/`: title, summary, verbatim quotes, topics, quality score |
| 5. Notes | `node pipeline/notes.mjs <slug>` | `notes/`: sectioned third-person notes, the passages search returns |
| 6. Index | `node pipeline/build.mjs <slug>` | `index.json`, which the MCP server loads |
| 7. Manifest | `node pipeline/brain.mjs <slug>` | `brain.json`: tagline, topics, principles and sample Q&A, every line cited |

The LinkedIn posts pull stays on `harvestapi/linkedin-profile-posts`. Set `THE_BRAINS_LINKEDIN_POSTS_ACTOR` to `johnvc/linkedin-posts-api` to send `profileUrls` and `maxPostsPerProfile` (capped at 200) instead. Posts still use `id`, `url`, `date`, `text`, `likes`, and `comments`. The profile lookup stays as it is. [Actor](https://apify.com/johnvc/linkedin-posts-api). [Alpha OSINT](https://alphaosint.com/).

Steps 2, 4, 5 and 7 run on headless Claude Code (`claude -p`), so they use a Claude subscription instead of API credits. The first 10 brains cost about **$3.50 in total** in scraping fees.

### Architecture

- **`server/`** is one Express app (TypeScript, run with `tsx`) that serves:
  - the website (`web/`)
  - every brain as a stateless Streamable HTTP MCP endpoint at `/<slug>/mcp`
  - OAuth 2.1 with dynamic client registration, where sign-in is email plus a 6-digit code (`server/oauth.ts`)
  - usage tracking and a password-protected `/admin` with an email CSV export
- **`web/`** is a no-build vanilla HTML/CSS/JS site: a search-first directory, brain pages with cited principles and sources, and per-client install instructions.
- **`pipeline/`** has the scripts above. They're idempotent: re-running a step skips finished work.
- **`data/brains/<slug>/`** holds each brain's curated, derived content: `brain.json`, `index.json`, `cards/`, `notes/` and `shortlist.json`.
- **External brains** are ones people already run themselves, like Nevo David's [mcp.nevo.md](https://nevo.md). They're listed with `node pipeline/external.mjs <slug>` from `pipeline/external/<slug>.json`, and installs go straight to their URL.

## Run it yourself

```bash
git clone https://github.com/VicPitic/the-brains.git
cd the-brains
npm install
npm start            # http://localhost:8790
```

That's enough to browse and use all the brains locally. Without `DATABASE_URL`, the MCP endpoints are open and nothing is tracked. Add one locally:

```bash
claude mcp add --transport http levels-brain http://localhost:8790/pieter-levels/mcp
```

To build new brains or turn on sign-in and tracking, copy [`.env.example`](.env.example) to `.env.local` and fill in what you need. Deployment is a single service plus Postgres. We run the website on Railway and the same service on [Manufact](https://manufact.com) for the MCP host (`mcp.brains.ceo`), with `BEHIND_MCP_GATEWAY=true` and `CLIENT_IP_HEADER=cf-connecting-ip`.

## Content and takedowns

- Brains are **unofficial**. They're built only from public talks, interviews, essays and posts, and they're not affiliated with or endorsed by the people they're about unless marked "claimed".
- Every passage cites its original source. The repo contains only our derived summaries and short quotes. Raw transcripts and scraped articles are never committed.
- Are you one of these people? Email [hello@brains.ceo](mailto:hello@brains.ceo?subject=Claim%20my%20brain) to claim your brain, correct it, add sources, or have it removed.

## Contributing

Brain requests, new brains, fixes and design improvements are all welcome. Start with [CONTRIBUTING.md](CONTRIBUTING.md).

If The Brains is useful to you, [give it a star](https://github.com/VicPitic/the-brains). It helps more people find it.

## License

The code is [MIT](LICENSE). Brain content belongs to its original authors; see [Content and takedowns](#content-and-takedowns).
