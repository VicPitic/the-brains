// Search and link-preview metadata: robots.txt, sitemap.xml, and the <head> tags each page is served with
// (canonical, Open Graph, structured data). Brain pages render client-side, so their title and description
// are written here too, matching what brain.js sets once it loads.
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { SiteBrain } from "./site.js";

import { type Roundtable, roundtableName, roundtableSlug } from "./roundtables.js";

const DEFAULT_IMAGE = "/assets/og.png";
const REPO_URL = "https://github.com/VicPitic/the-brains";

const escapeAttr = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escapeXml = escapeAttr;
// Keeps "</script>" inside a string from closing the JSON-LD block.
const jsonLd = (data: unknown) => `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`;
const possessive = (name: string) => (name.endsWith("s") ? `${name}'` : `${name}'s`);

interface PageMeta {
  path?: string;
  title?: string;
  description?: string;
  image?: string;
  // "summary" for square images (brain photos), "summary_large_image" for the 1200x630 card.
  card?: "summary" | "summary_large_image";
  type?: "website" | "profile";
  noindex?: boolean;
  structuredData?: unknown[];
}

export function createSeo(webDir: string, siteUrl: string) {
  const site = siteUrl.replace(/\/$/, "");
  const abs = (path: string) => (/^https?:\/\//.test(path) ? path : `${site}${path}`);

  // Pages are a few KB, so they're read per request like sendFile did.
  const template = (page: string) => readFile(join(webDir, page), "utf8");

  function headTags(meta: PageMeta) {
    // Pages without a path (the 404) only say "don't index this".
    if (!meta.path) return meta.noindex ? [`<meta name="robots" content="noindex" />`] : [];
    const url = abs(meta.path);
    const tags = [
      `<link rel="canonical" href="${escapeAttr(url)}" />`,
      `<meta property="og:url" content="${escapeAttr(url)}" />`,
      `<meta property="og:type" content="${meta.type ?? "website"}" />`,
      `<meta property="og:site_name" content="The Brains" />`,
      `<meta property="og:image" content="${escapeAttr(abs(meta.image ?? DEFAULT_IMAGE))}" />`,
      `<meta name="twitter:card" content="${meta.card ?? "summary_large_image"}" />`,
    ];
    if (!meta.image || meta.image === DEFAULT_IMAGE) {
      tags.push(`<meta property="og:image:width" content="1200" />`, `<meta property="og:image:height" content="630" />`);
    }
    if (meta.noindex) tags.push(`<meta name="robots" content="noindex" />`);
    for (const data of meta.structuredData ?? []) tags.push(jsonLd(data));
    return tags;
  }

  const addToHead = (html: string, tags: string[]) =>
    tags.length ? html.replace(/\n?\s*<\/head>/, `\n${tags.map((t) => `    ${t}`).join("\n")}\n  </head>`) : html;

  // Serves a page with its title and description replaced (when given) and the SEO tags added to <head>.
  async function render(page: string, meta: PageMeta) {
    let html = await template(page);
    if (meta.title) html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeAttr(meta.title)}</title>`);
    if (meta.description) {
      const description = `<meta name="description" content="${escapeAttr(meta.description)}" />`;
      html = /<meta\s+name="description"[\s\S]*?\/>/.test(html)
        ? html.replace(/<meta\s+name="description"[\s\S]*?\/>/, description)
        : html.replace(/(<title>[\s\S]*?<\/title>)/, `$1\n    ${description}`);
    }
    const og: string[] = [];
    if (meta.path && meta.title && !/property="og:title"/.test(html)) og.push(`<meta property="og:title" content="${escapeAttr(meta.title)}" />`);
    if (meta.path && meta.description && !/property="og:description"/.test(html)) og.push(`<meta property="og:description" content="${escapeAttr(meta.description)}" />`);
    return addToHead(html, [...og, ...headTags(meta)]);
  }

  const organization = {
    "@type": "Organization",
    "@id": `${site}/#organization`,
    name: "The Brains",
    url: `${site}/`,
    logo: `${site}/assets/favicon.svg`,
    sameAs: [REPO_URL],
  };

  function home(brains: SiteBrain[]) {
    const ready = brains.filter((b) => b.status === "ready");
    return render("index.html", {
      path: "/",
      structuredData: [
        {
          "@context": "https://schema.org",
          "@graph": [
            organization,
            {
              "@type": "WebSite",
              "@id": `${site}/#website`,
              name: "The Brains",
              url: `${site}/`,
              publisher: { "@id": `${site}/#organization` },
            },
            {
              "@type": "SoftwareApplication",
              name: "The Brains",
              url: `${site}/`,
              applicationCategory: "DeveloperApplication",
              operatingSystem: "Any",
              description:
                "Founders, CEOs and investors as MCP servers. Add their brains to Claude, Cursor or ChatGPT; every answer cites the talk, essay or post it came from.",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
              license: "https://opensource.org/licenses/MIT",
              codeRepository: REPO_URL,
              publisher: { "@id": `${site}/#organization` },
            },
            {
              "@type": "ItemList",
              name: "Brains",
              numberOfItems: ready.length,
              itemListElement: ready.map((b, i) => ({ "@type": "ListItem", position: i + 1, name: `${possessive(b.name)} brain`, url: `${site}/${b.slug}` })),
            },
          ],
        },
      ],
    });
  }

  function brain(b: SiteBrain) {
    const title = `${possessive(b.name)} brain · The Brains`;
    const description = b.tagline ? `${b.tagline}. An unofficial, cited brain for your AI agent.` : `${possessive(b.name)} brain for your AI agent.`;
    const person: Record<string, unknown> = { "@type": "Person", name: b.name };
    if (b.tagline) person.description = b.tagline;
    if (b.role) person.jobTitle = b.role;
    if (b.company) person.worksFor = { "@type": "Organization", name: b.company };
    if (b.avatarUrl) person.image = abs(b.avatarUrl);
    const sameAs = b.links.map((l) => l.url).filter((u) => /^https?:\/\//.test(u));
    if (sameAs.length) person.sameAs = sameAs;
    return render("brain.html", {
      path: `/${b.slug}`,
      title,
      description,
      image: b.avatarUrl ?? undefined,
      card: b.avatarUrl ? "summary" : "summary_large_image",
      type: "profile",
      structuredData: [
        {
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          url: `${site}/${b.slug}`,
          name: title,
          ...(b.updatedAt ? { dateModified: b.updatedAt } : {}),
          isPartOf: { "@type": "WebSite", name: "The Brains", url: `${site}/` },
          mainEntity: person,
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "The Brains", item: `${site}/` },
            { "@type": "ListItem", position: 2, name: b.name, item: `${site}/${b.slug}` },
          ],
        },
      ],
    });
  }

  const ROUNDTABLES_DESCRIPTION = "Several of the smartest brains in one MCP, by topic. Add a roundtable to Claude, Cursor or ChatGPT, and hear from all of them on one question, every answer cited.";

  function roundtablesIndex(roundtables: Roundtable[]) {
    return render("roundtables.html", {
      path: "/roundtables",
      title: "Roundtables · The Brains",
      description: ROUNDTABLES_DESCRIPTION,
      structuredData: [
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Roundtables",
          url: `${site}/roundtables`,
          description: ROUNDTABLES_DESCRIPTION,
          isPartOf: { "@type": "WebSite", name: "The Brains", url: `${site}/` },
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: roundtables.length,
            itemListElement: roundtables.map((j, i) => ({ "@type": "ListItem", position: i + 1, name: roundtableName(j), url: `${site}/${roundtableSlug(j)}` })),
          },
        },
      ],
    });
  }

  function roundtable(j: Roundtable, nameOf: (slug: string) => string | null) {
    const names = j.people.map((p) => nameOf(p.slug) ?? p.slug);
    const roster = `${names.slice(0, -1).join(", ")} and ${names.at(-1)}`;
    return render("roundtable.html", {
      path: `/${roundtableSlug(j)}`,
      title: `${roundtableName(j)}: ${names.slice(0, 3).join(", ")} and more · The Brains`,
      description: `${j.blurb} ${roster} in one MCP for Claude, Cursor or ChatGPT, every answer cited. Unofficial.`,
      structuredData: [
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "The Brains", item: `${site}/` },
            { "@type": "ListItem", position: 2, name: "Roundtables", item: `${site}/roundtables` },
            { "@type": "ListItem", position: 3, name: roundtableName(j), item: `${site}/${roundtableSlug(j)}` },
          ],
        },
      ],
    });
  }

  const page = (file: string, path: string, description?: string) => render(file, { path, description });
  const notFound = () => render("404.html", { noindex: true });

  function robots() {
    return `User-agent: *\nDisallow: /admin\nDisallow: /api/\n\nSitemap: ${site}/sitemap.xml\n`;
  }

  function sitemap(brains: SiteBrain[], roundtableSlugs: string[] = []) {
    const ready = brains.filter((b) => b.status === "ready");
    const latest = ready.map((b) => b.updatedAt).filter(Boolean).sort().at(-1) ?? null;
    const entries: { loc: string; lastmod?: string | null }[] = [
      { loc: `${site}/`, lastmod: latest },
      { loc: `${site}/love` },
      { loc: `${site}/roundtables` },
      ...roundtableSlugs.map((slug) => ({ loc: `${site}/${slug}` })),
      ...ready.map((b) => ({ loc: `${site}/${b.slug}`, lastmod: b.updatedAt })),
      { loc: `${site}/privacy` },
      { loc: `${site}/terms` },
    ];
    const urls = entries.map((e) => `  <url><loc>${escapeXml(e.loc)}</loc>${e.lastmod ? `<lastmod>${e.lastmod.slice(0, 10)}</lastmod>` : ""}</url>`);
    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
  }

  return { home, brain, roundtablesIndex, roundtable, page, notFound, robots, sitemap };
}
