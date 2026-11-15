// Site data for the web UI: serves brain.json (docs/brain-schema-ui.md) when the pipeline has
// written it, otherwise a "building" brain derived from index.json + candidates.json.
// Files are re-read when their mtime changes, so the site picks up pipeline output without a restart.
import { readdir, readFile, stat } from "node:fs/promises";
import { join } from "node:path";

type SourceType = "x_post" | "linkedin_post" | "x_article" | "youtube" | "podcast" | "essay";
const SOURCE_TYPES: SourceType[] = ["x_post", "linkedin_post", "x_article", "youtube", "podcast", "essay"];
export const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

interface SiteSource {
  id: string;
  type: SourceType;
  title: string;
  url: string;
  publishedAt: string | null;
  outlet?: string;
  durationSec?: number;
  views?: number;
  topicIds: string[];
  excerpt?: string;
}

export interface SiteBrain {
  status: "ready" | "building";
  slug: string;
  name: string;
  shortName: string;
  tagline: string | null;
  role: string | null;
  company: string | null;
  categories: string[];
  avatarUrl: string | null;
  avatarAlt: string;
  links: { kind: string; url: string; label?: string }[];
  followers: { x?: number; linkedin?: number; youtube?: number; asOf?: string } | null;
  claim: { status: "unofficial" | "claimed"; claimedBy?: string };
  quote: { text: string; sourceId: string } | null;
  stats: {
    longFormCount: number;
    xPostCount: number;
    linkedinPostCount: number;
    byType: Record<SourceType, number>;
    transcriptMinutes: number;
    dateRange: { from: string | null; to: string | null };
  };
  updatedAt: string | null;
  topics: { id: string; label: string; summary: string; sampleQuestion: string; sourceIds: string[] }[];
  principles: { text: string; sourceIds: string[] }[];
  sampleQA: { question: string; answer: { text: string; sourceIds: string[] }[] }[];
  featuredSourceIds: string[];
  sources: SiteSource[];
  mcp: { url: string | null; serverName: string; auth: string; tools: { name: string; description: string; readOnly: boolean }[]; external?: boolean };
  verifiedStat: { label: string; value: string; asOf: string; sourceUrl: string; verifiedBy?: string } | null;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
type Json = any;

const cache = new Map<string, { key: string; brain: SiteBrain }>();

async function mtime(path: string): Promise<number | null> {
  try {
    return (await stat(path)).mtimeMs;
  } catch {
    return null;
  }
}

async function readJson(path: string): Promise<Json | null> {
  try {
    return JSON.parse(await readFile(path, "utf8"));
  } catch {
    return null;
  }
}

const defaultTools = (name: string) => [
  { name: "search_brain", description: `Search ${name}'s playbooks on growth, distribution, pricing and building.`, readOnly: true },
  { name: "list_sources", description: `List every source in ${name}'s brain, with links.`, readOnly: true },
];

function computeStats(sources: SiteSource[]): SiteBrain["stats"] {
  const byType = Object.fromEntries(SOURCE_TYPES.map((t) => [t, 0])) as Record<SourceType, number>;
  for (const s of sources) if (s.type in byType) byType[s.type]++;
  const dates = sources.map((s) => s.publishedAt).filter((d): d is string => /^\d{4}-\d{2}/.test(d ?? "")).sort();
  const seconds = sources.filter((s) => s.type === "youtube" || s.type === "podcast").reduce((t, s) => t + (s.durationSec ?? 0), 0);
  return {
    longFormCount: sources.length - byType.x_post - byType.linkedin_post,
    xPostCount: byType.x_post,
    linkedinPostCount: byType.linkedin_post,
    byType,
    transcriptMinutes: Math.round(seconds / 60),
    dateRange: { from: dates[0]?.slice(0, 7) ?? null, to: dates.at(-1)?.slice(0, 7) ?? null },
  };
}

async function resolveAvatar(dir: string, slug: string, manifest: Json | null, profile: Json | null): Promise<string | null> {
  for (const file of [manifest?.avatar?.sketch, manifest?.avatar?.photo, "photo.jpg"]) {
    if (typeof file === "string" && /^[\w.-]+$/.test(file) && (await mtime(join(dir, file))) !== null) {
      return `/media/${slug}/${file}`;
    }
  }
  // Clones of the open-source repo have no photos (they're not committed), so fall back to the public URL.
  const remote = profile?.avatar ?? manifest?.avatar?.remoteUrl;
  return typeof remote === "string" && remote.startsWith("https://") ? remote : null;
}

async function buildBrain(dataDir: string, slug: string, people: Json[]): Promise<SiteBrain | null> {
  const dir = join(dataDir, slug);
  const index = await readJson(join(dir, "index.json"));
  const manifest = await readJson(join(dir, "brain.json"));
  // External brains (run by the person themselves, e.g. mcp.nevo.md) have a manifest but no local index.
  if (!index && !manifest?.mcp?.external) return null;
  const candidates = await readJson(join(dir, "candidates.json"));
  const profile = candidates?.profile ?? candidates?.linkedinProfile ?? null;
  const avatarUrl = await resolveAvatar(dir, slug, manifest, profile);
  const name: string = manifest?.name ?? index?.name ?? slug;

  if (manifest) {
    const sources: SiteSource[] = manifest.sources ?? [];
    return {
      status: "ready",
      slug,
      name,
      shortName: manifest.shortName ?? name,
      tagline: manifest.tagline ?? null,
      role: manifest.role ?? null,
      company: manifest.company ?? null,
      categories: manifest.categories ?? [],
      avatarUrl,
      avatarAlt: manifest.avatar?.alt ?? `Photo of ${name}`,
      links: manifest.links ?? [],
      followers: manifest.followers ?? null,
      claim: manifest.claim ?? { status: "unofficial" },
      quote: manifest.quote ?? null,
      stats: { ...computeStats(sources), ...manifest.stats },
      updatedAt: manifest.updatedAt ?? index?.builtAt ?? null,
      topics: manifest.topics ?? [],
      principles: manifest.principles ?? [],
      sampleQA: manifest.sampleQA ?? [],
      featuredSourceIds: manifest.featuredSourceIds ?? [],
      sources,
      mcp: {
        url: manifest.mcp?.url ?? null,
        serverName: manifest.mcp?.serverName ?? `${slug}-brain`,
        auth: manifest.mcp?.auth ?? "none",
        tools: manifest.mcp?.tools ?? defaultTools(name),
        external: manifest.mcp?.external === true,
      },
      verifiedStat: manifest.verifiedStat ?? null,
    };
  }

  // Building: brain.json not written yet. Everything here is computed, nothing editorial.
  const firstChunk = new Map<string, string>();
  for (const chunk of index.chunks ?? []) if (!firstChunk.has(chunk.sourceId)) firstChunk.set(chunk.sourceId, chunk.text);
  const sources: SiteSource[] = (index.sources ?? []).map((s: Json) => ({
    id: s.id,
    type: s.type,
    title: s.title,
    url: s.url,
    publishedAt: s.publishedAt ?? null,
    ...(s.outlet ? { outlet: s.outlet } : {}),
    ...(s.durationSec ? { durationSec: s.durationSec } : {}),
    ...(s.views ? { views: s.views } : {}),
    topicIds: [],
    excerpt: String(s.summary ?? firstChunk.get(s.id) ?? "").slice(0, 200) || undefined,
  }));
  const person = people.find((p) => p.slug === slug);
  const links: SiteBrain["links"] = [];
  if (index.x) links.push({ kind: "x", url: `https://x.com/${index.x}`, label: `@${index.x}` });
  if (index.linkedin) links.push({ kind: "linkedin", url: `https://www.linkedin.com/in/${index.linkedin}`, label: "LinkedIn" });
  if (candidates?.youtubeChannel?.handle) links.push({ kind: "youtube", url: `https://www.youtube.com/${candidates.youtubeChannel.handle}` });
  for (const site of person?.sites ?? []) links.push({ kind: "website", url: `https://${site.domain}` });

  return {
    status: "building",
    slug,
    name,
    shortName: name,
    tagline: null,
    role: null,
    company: null,
    categories: [],
    avatarUrl,
    avatarAlt: `Photo of ${name}`,
    links,
    followers:
      typeof profile?.followers !== "number" ? null : candidates?.profile ? { x: profile.followers } : { linkedin: profile.followers },
    claim: { status: "unofficial" },
    quote: null,
    stats: computeStats(sources),
    updatedAt: index.builtAt ?? null,
    topics: [],
    principles: [],
    sampleQA: [],
    featuredSourceIds: [],
    sources,
    mcp: { url: null, serverName: `${slug}-brain`, auth: "none", tools: defaultTools(name) },
    verifiedStat: null,
  };
}

export async function getBrain(dataDir: string, slug: string): Promise<SiteBrain | null> {
  if (!SLUG_RE.test(slug)) return null;
  const dir = join(dataDir, slug);
  const key = [await mtime(join(dir, "index.json")), await mtime(join(dir, "brain.json")), await mtime(join(dir, "photo.jpg"))].join(":");
  const hit = cache.get(slug);
  if (hit && hit.key === key) return hit.brain;
  const people = (await readJson(join(dataDir, "..", "..", "pipeline", "people.json"))) ?? [];
  const brain = await buildBrain(dataDir, slug, people);
  if (brain) cache.set(slug, { key, brain });
  else cache.delete(slug);
  return brain;
}

export async function listBrains(dataDir: string): Promise<SiteBrain[]> {
  const slugs = (await readdir(dataDir).catch(() => [] as string[])).filter((s) => SLUG_RE.test(s));
  // One at a time: a cold cache parses each brain's whole index.json, and doing all of them at once
  // holds every file in memory together.
  const brains: SiteBrain[] = [];
  for (const slug of slugs) {
    const brain = await getBrain(dataDir, slug);
    if (brain) brains.push(brain);
  }
  return brains;
}

/** The light card shape the directory needs (no sources). */
export function toCard(b: SiteBrain) {
  return {
    status: b.status,
    slug: b.slug,
    name: b.name,
    shortName: b.shortName,
    tagline: b.tagline,
    role: b.role,
    company: b.company,
    categories: b.categories,
    avatarUrl: b.avatarUrl,
    avatarAlt: b.avatarAlt,
    followers: b.followers,
    claim: b.claim,
    stats: b.stats,
    updatedAt: b.updatedAt,
    topics: b.topics.map((t) => ({ label: t.label, sampleQuestion: t.sampleQuestion })),
    principles: b.principles.map((p) => p.text),
  };
}
