// Loads every built brain (data/brains/<slug>/index.json) and answers the two MCP tools.
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { Bm25 } from "./search.js";

export interface IndexSource {
  id: string;
  type: "youtube" | "essay" | "podcast" | "x_article" | "x_post" | "linkedin_post";
  title: string;
  url: string;
  publishedAt: string | null;
  outlet: string | null;
  topics: string[];
  quality?: number;
}

export interface Chunk {
  sourceId: string;
  heading: string | null;
  text: string;
}

interface BrainIndex {
  slug: string;
  name: string;
  x: string | null;
  linkedin?: string;
  /** What the brain covers, when it isn't the default business focus (e.g. health protocols). */
  domain?: string;
  /** How to name the sources when "talks, interviews, essays and posts" doesn't fit (e.g. Plato's dialogues). */
  sourcesLabel?: string;
  builtAt: string;
  typeLabels: Record<string, string>;
  sources: IndexSource[];
  chunks: Chunk[];
}

export interface Brain extends BrainIndex {
  sourceById: Map<string, IndexSource>;
  bm25: Bm25;
}

const MAX_CHUNKS_PER_SOURCE = 2;
const isPost = (type: IndexSource["type"]) => type === "x_post" || type === "linkedin_post";
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export async function loadBrains(dataDir: string): Promise<Map<string, Brain>> {
  const brains = new Map<string, Brain>();
  for (const slug of await readdir(dataDir)) {
    const raw = await readFile(join(dataDir, slug, "index.json"), "utf8").catch(() => null);
    if (!raw) continue;
    const index = JSON.parse(raw) as BrainIndex;
    const sourceById = new Map(index.sources.map((s) => [s.id, s]));
    const bm25 = new Bm25(
      index.chunks.map((chunk, id) => ({
        id,
        fields: { text: chunk.text, boosted: `${chunk.heading ?? ""} ${sourceById.get(chunk.sourceId)?.title ?? ""}` },
      })),
    );
    brains.set(index.slug, { ...index, sourceById, bm25 });
  }
  return brains;
}

const formatDate = (date: string | null) => {
  if (!date || !/^\d{4}-\d{2}/.test(date)) return date ?? "";
  const [y, m, d] = date.split("-").map(Number);
  return d ? `${d} ${MONTHS[m - 1]} ${y}` : `${MONTHS[m - 1]} ${y}`;
};

function describe(brain: Brain, source: IndexSource): string {
  const label = brain.typeLabels[source.type] ?? source.type;
  return [label, source.outlet && !isPost(source.type) ? source.outlet : null, formatDate(source.publishedAt)]
    .filter(Boolean)
    .join(", ");
}

// Best passages for a query, at most MAX_CHUNKS_PER_SOURCE from any one source.
function pick(brain: Brain, query: string, limit: number): { chunk: Chunk; score: number }[] {
  const perSource = new Map<string, number>();
  const picked: { chunk: Chunk; score: number }[] = [];
  for (const { doc, score } of brain.bm25.search(query)) {
    const chunk = brain.chunks[doc];
    const seen = perSource.get(chunk.sourceId) ?? 0;
    if (seen >= MAX_CHUNKS_PER_SOURCE) continue;
    perSource.set(chunk.sourceId, seen + 1);
    picked.push({ chunk, score });
    if (picked.length >= limit) break;
  }
  return picked;
}

export function formatPassage(brain: Brain, chunk: Chunk, n: number, withName: boolean): string {
  const source = brain.sourceById.get(chunk.sourceId)!;
  const title =
    source.type === "x_post"
      ? `X post by @${brain.x}, ${formatDate(source.publishedAt)}`
      : source.type === "linkedin_post"
        ? `LinkedIn post by ${brain.name}, ${formatDate(source.publishedAt)}`
        : source.title;
  const heading = chunk.heading && chunk.heading !== "Summary" ? `### ${chunk.heading}\n\n` : "";
  const who = withName ? `${brain.name}: ` : "";
  return `## ${n}. ${who}${title}\nSource: ${source.url} (${describe(brain, source)})\n\n${heading}${chunk.text}`;
}

export function searchBrain(brain: Brain, query: string, limit: number): string {
  const picked = pick(brain, query, limit);
  if (!picked.length) {
    return `No passages in ${brain.name}'s brain matched "${query}". Try other words, or call list_sources to see what it covers.`;
  }
  return picked.map(({ chunk }, i) => formatPassage(brain, chunk, i + 1, false)).join("\n\n---\n\n");
}

// Searches several brains at once and keeps the best-scoring passages overall, each labeled with its person.
export function searchBrains(brains: Brain[], query: string, limit: number): string {
  const hits = brains
    .flatMap((brain) => pick(brain, query, limit).map((hit) => ({ brain, ...hit })))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
  if (!hits.length) return `No passages matched "${query}". Try other words, or call list_brains to see who's here.`;
  return hits.map(({ brain, chunk }, i) => formatPassage(brain, chunk, i + 1, true)).join("\n\n---\n\n");
}

export function listSources(brain: Brain): string {
  const longForm = brain.sources
    .filter((s) => !isPost(s.type))
    .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""))
    .map((s) => `- ${s.title} (${s.url}): ${describe(brain, s)}`);

  const postsByYear = (type: IndexSource["type"]) => {
    const years = new Map<string, number>();
    for (const s of brain.sources.filter((s) => s.type === type)) {
      const year = (s.publishedAt ?? "unknown").slice(0, 4);
      years.set(year, (years.get(year) ?? 0) + 1);
    }
    return [...years.entries()].sort(([a], [b]) => b.localeCompare(a));
  };
  const xPosts = postsByYear("x_post").map(
    ([year, count]) => `- ${brain.name}'s X posts on business and growth, ${year} (https://x.com/${brain.x}): ${count} X posts by @${brain.x}`,
  );
  const linkedinPosts = postsByYear("linkedin_post").map(
    ([year, count]) =>
      `- ${brain.name}'s LinkedIn posts on business and growth, ${year} (https://www.linkedin.com/in/${brain.linkedin}): ${count} LinkedIn posts`,
  );

  return [...longForm, ...xPosts, ...linkedinPosts].join("\n");
}
