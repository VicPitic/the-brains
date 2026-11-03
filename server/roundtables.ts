// Roundtables: several brains behind one connector, by topic. The server only retrieves each person's own
// passages. It never calls a model: the client's model writes the answer, so a roundtable costs the same as a search.
import { readFile } from "node:fs/promises";
import { type Brain, type Chunk, formatPassage } from "./brains.js";
import { tokenize } from "./search.js";

export interface RoundtablePerson {
  slug: string;
  /** What this person is in the roundtable for. */
  angle: string;
  /** Extra search terms, so retrieval leans into that angle. */
  hint: string;
}

export interface Roundtable {
  id: string;
  label: string;
  blurb: string;
  questions: string[];
  people: RoundtablePerson[];
}

export const MIN_PEOPLE = 2;
const SLUG_SUFFIX = "-brains";
const PASSAGES_PER_PERSON = 4;
const MAX_PER_SOURCE = 2;

export const roundtableSlug = (roundtable: Roundtable) => `${roundtable.id}${SLUG_SUFFIX}`;
export const roundtableName = (roundtable: Roundtable) => `${roundtable.label} Brains`;

export function roundtableForSlug(roundtables: Roundtable[], slug: string): Roundtable | null {
  if (!slug.endsWith(SLUG_SUFFIX)) return null;
  const id = slug.slice(0, -SLUG_SUFFIX.length);
  return roundtables.find((j) => j.id === id) ?? null;
}

export async function loadRoundtables(path: string): Promise<Roundtable[]> {
  const raw = await readFile(path, "utf8").catch(() => null);
  return raw ? (JSON.parse(raw).roundtables as Roundtable[]) : [];
}

/** A person whose brain isn't loaded yet is dropped rather than failing the whole roundtable. */
export function liveRoundtables(roundtables: Roundtable[], brains: Map<string, Brain>): Roundtable[] {
  return roundtables.map((roundtable) => ({ ...roundtable, people: roundtable.people.filter((p) => brains.has(p.slug)) })).filter((roundtable) => roundtable.people.length >= MIN_PEOPLE);
}

// ---- Retrieving one person's passages ----

const uniqueTokens = (text: string) => new Set(tokenize(text));

// Question words that appear in almost every passage, so hitting one says nothing about the topic.
const GENERIC = uniqueTokens(
  "know first need get make want go going good best better way thing things really actually one now right still worth time much many more most " +
    "like just use try work look find keep decide stop tell big small too long new sure start come take give put",
);
const topicTokens = (text: string) => new Set([...uniqueTokens(text)].filter((t) => !GENERIC.has(t)));

// Reciprocal rank fusion: a passage ranks well when it answers the question AND fits the person's angle,
// instead of only matching whichever of the two has the rarer words.
const FUSION_K = 20;
const TITLE_BONUS_QUESTION = 0.04;
const TITLE_BONUS_ANGLE = 0.01;
function rank(brain: Brain, question: string, hint: string): Chunk[] {
  const scores = new Map<number, number>();
  for (const query of [question, `${question} ${hint}`]) {
    brain.bm25.search(query).forEach(({ doc }, position) => scores.set(doc, (scores.get(doc) ?? 0) + 1 / (FUSION_K + position)));
  }
  // A passage whose heading or source is about the question beats one that only mentions it in passing.
  const asked = topicTokens(question);
  const angled = [...uniqueTokens(hint)].filter((t) => !asked.has(t));
  for (const doc of scores.keys()) {
    const chunk = brain.chunks[doc];
    const title = uniqueTokens(`${chunk.heading ?? ""} ${brain.sourceById.get(chunk.sourceId)?.title ?? ""}`);
    const onQuestion = [...asked].filter((t) => title.has(t)).length;
    const onAngle = angled.filter((t) => title.has(t)).length;
    scores.set(doc, scores.get(doc)! + onQuestion * TITLE_BONUS_QUESTION + onAngle * TITLE_BONUS_ANGLE);
  }
  return [...scores.entries()].sort((a, b) => b[1] - a[1]).map(([doc]) => brain.chunks[doc]);
}

// BM25 returns something whenever any term matches, so the floor is explicit: a passage has to hit the question's
// own topic words, and at least two distinct terms overall. Otherwise someone with nothing to say would be handed
// a passage that only shares a word like "business".
export function retrieve(brain: Brain, question: string, hint: string, limit = PASSAGES_PER_PERSON): Chunk[] {
  const topical = topicTokens(question);
  const asked = topical.size ? topical : uniqueTokens(question);
  const wanted = new Set([...asked, ...uniqueTokens(hint)]);
  const passages: Chunk[] = [];
  const perSource = new Map<string, number>();
  for (const chunk of rank(brain, question, hint)) {
    if ((perSource.get(chunk.sourceId) ?? 0) >= MAX_PER_SOURCE) continue;
    const words = uniqueTokens(`${chunk.heading ?? ""} ${chunk.text} ${brain.sourceById.get(chunk.sourceId)?.title ?? ""}`);
    const onQuestion = [...asked].filter((t) => words.has(t)).length;
    const overall = [...wanted].filter((t) => words.has(t)).length;
    if (onQuestion < 1 || (wanted.size > 1 && overall < 2)) continue;
    perSource.set(chunk.sourceId, (perSource.get(chunk.sourceId) ?? 0) + 1);
    passages.push(chunk);
    if (passages.length >= limit) break;
  }
  return passages;
}

// ---- What the agent receives ----

// Keeps the answer grounded in what these people actually said: they never had this conversation.
const HOW_TO_ANSWER = `Answer using only the passages above: what each person would say, with a source link for every claim, then where they agree and where they differ, then your recommendation. Don't write dialogue or invented quotes, because these people never discussed this together. If someone has nothing on record, say so rather than guessing. End by noting that this was built from public sources and they didn't review it.`;

export function askAll(roundtable: Roundtable, brains: Map<string, Brain>, question: string): string {
  const sections = roundtable.people.flatMap((person) => {
    const brain = brains.get(person.slug);
    if (!brain) return [];
    const title = `## ${brain.name}, on ${person.angle}`;
    const passages = retrieve(brain, question, person.hint);
    if (!passages.length) return [`${title}\n\nNothing on record on this question.`];
    return [`${title}\n\n${passages.map((chunk, i) => formatPassage(brain, chunk, i + 1, false).replace(/^## /, "### ").replace(/\n### /g, "\n#### ")).join("\n\n")}`];
  });
  return [`# ${roundtableName(roundtable)}: ${question}`, ...sections, HOW_TO_ANSWER].join("\n\n---\n\n");
}
