// Small BM25 index over a brain's chunks. Brains are a few thousand chunks, so an in-memory
// lexical index is fast and free; embeddings can replace it later without changing the tools.

const STOPWORDS = new Set(
  ("a an and are as at be but by do does for from has have he her his how i if in into is it its me my " +
    "not of on or our she so than that the their them then there these they this to was we were what when " +
    "where which who why will with you your about can should would could").split(" "),
);

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9$%\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t))
    .map(stem);
}

// Light suffix stripping so "pricing"/"priced"/"prices" meet "price".
function stem(token: string): string {
  if (token.length <= 4) return token;
  for (const suffix of ["ings", "ing", "ers", "ies", "ed", "es", "er", "s"]) {
    if (token.endsWith(suffix) && token.length - suffix.length >= 3) {
      return suffix === "ies" ? token.slice(0, -3) + "y" : token.slice(0, -suffix.length);
    }
  }
  return token;
}

export interface Doc {
  id: number;
  fields: { text: string; boosted: string };
}

export class Bm25 {
  // Postings live in two flat typed arrays, not one object per posting: every brain is indexed in
  // memory at once (about two million postings in all), and objects cost over ten times as much heap.
  // Term i owns the slice [starts[i], starts[i + 1]) of `docs` and `tfs`.
  private termIds = new Map<string, number>();
  private starts: Uint32Array;
  private docs: Uint32Array;
  private tfs: Uint32Array;
  private lengths: number[] = [];
  private avgLength = 0;
  private readonly k1 = 1.2;
  private readonly b = 0.75;

  constructor(docs: Doc[], private readonly boost = 2) {
    // While building, each term's postings are a flat [doc, tf, doc, tf, ...] list.
    const lists: number[][] = [];
    let total = 0;
    for (const doc of docs) {
      const counts = new Map<string, number>();
      const add = (tokens: string[], weight: number) => {
        for (const t of tokens) counts.set(t, (counts.get(t) ?? 0) + weight);
      };
      const body = tokenize(doc.fields.text);
      add(body, 1);
      add(tokenize(doc.fields.boosted), this.boost);
      this.lengths[doc.id] = body.length;
      for (const [term, tf] of counts) {
        let id = this.termIds.get(term);
        if (id === undefined) {
          this.termIds.set(term, (id = lists.length));
          lists.push([]);
        }
        lists[id].push(doc.id, tf);
        total++;
      }
    }
    this.starts = new Uint32Array(lists.length + 1);
    this.docs = new Uint32Array(total);
    this.tfs = new Uint32Array(total);
    let at = 0;
    lists.forEach((list, id) => {
      this.starts[id] = at;
      for (let i = 0; i < list.length; i += 2, at++) {
        this.docs[at] = list[i];
        this.tfs[at] = list[i + 1];
      }
    });
    this.starts[lists.length] = at;
    this.avgLength = this.lengths.reduce((a, b) => a + b, 0) / Math.max(1, this.lengths.length);
  }

  search(query: string): { doc: number; score: number }[] {
    const scores = new Map<number, number>();
    const n = this.lengths.length;
    for (const term of new Set(tokenize(query))) {
      const id = this.termIds.get(term);
      if (id === undefined) continue;
      const start = this.starts[id];
      const end = this.starts[id + 1];
      const count = end - start;
      const idf = Math.log(1 + (n - count + 0.5) / (count + 0.5));
      for (let i = start; i < end; i++) {
        const doc = this.docs[i];
        const tf = this.tfs[i];
        const norm = tf + this.k1 * (1 - this.b + (this.b * this.lengths[doc]) / this.avgLength);
        scores.set(doc, (scores.get(doc) ?? 0) + idf * ((tf * (this.k1 + 1)) / norm));
      }
    }
    return [...scores.entries()].map(([doc, score]) => ({ doc, score })).sort((a, b) => b.score - a.score);
  }
}
