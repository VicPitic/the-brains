// Run with: npm test
import assert from "node:assert/strict";
import { join } from "node:path";
import { before, describe, test } from "node:test";
import { fileURLToPath } from "node:url";
import { type Brain, loadBrains } from "./brains.js";
import { askAll, type Roundtable, roundtableForSlug, roundtableName, roundtableSlug, liveRoundtables, loadRoundtables, retrieve } from "./roundtables.js";

const root = join(fileURLToPath(import.meta.url), "..", "..");
const NOBODY_COVERS_THIS = "xylophone zygote gluon";

let brains: Map<string, Brain>;
let roundtables: Roundtable[];
const roundtable = (id: string) => roundtables.find((j) => j.id === id)!;

before(async () => {
  brains = await loadBrains(join(root, "data", "brains"));
  roundtables = await loadRoundtables(join(root, "data", "roundtables.json"));
});

describe("data/roundtables.json", () => {
  test("every person is a real brain, and each roundtable has several people", () => {
    assert.ok(roundtables.length >= 5);
    for (const j of roundtables) {
      assert.ok(j.people.length >= 3 && j.people.length <= 6, `${j.id} has ${j.people.length} people`);
      assert.equal(new Set(j.people.map((p) => p.slug)).size, j.people.length, `${j.id} lists someone twice`);
      for (const p of j.people) {
        assert.ok(brains.has(p.slug), `${j.id}: no brain ${p.slug}`);
        assert.ok(p.angle && p.hint, `${j.id}: ${p.slug} needs an angle and a hint`);
      }
      assert.ok(j.questions.length >= 1, `${j.id} needs a sample question`);
    }
  });

  test("nobody is in more than 3 roundtables", () => {
    const counts = new Map<string, number>();
    for (const j of roundtables) for (const p of j.people) counts.set(p.slug, (counts.get(p.slug) ?? 0) + 1);
    for (const [slug, n] of counts) assert.ok(n <= 3, `${slug} is in ${n}`);
  });

  test("slugs don't collide with a person's brain", () => {
    for (const j of roundtables) assert.ok(!brains.has(roundtableSlug(j)), roundtableSlug(j));
  });
});

describe("slugs", () => {
  test("resolve from the roundtable slug, and only from it", () => {
    assert.equal(roundtableForSlug(roundtables, "pricing-brains")?.id, "pricing");
    assert.equal(roundtableForSlug(roundtables, "pricing"), null);
    assert.equal(roundtableForSlug(roundtables, "nope-brains"), null);
    assert.equal(roundtableForSlug(roundtables, "alex-hormozi"), null);
  });

  test("names read as a group", () => assert.equal(roundtableName(roundtable("pricing")), "Pricing Brains"));
});

describe("liveRoundtables", () => {
  test("drops a person whose brain isn't loaded, and a roundtable with too few left", () => {
    const partial = new Map([...brains].filter(([slug]) => slug !== "alex-hormozi"));
    assert.ok(!liveRoundtables(roundtables, partial).find((j) => j.id === "pricing")!.people.some((p) => p.slug === "alex-hormozi"));
    assert.equal(liveRoundtables(roundtables, new Map()).length, 0);
  });
});

describe("retrieve", () => {
  test("returns passages from that person's own sources", () => {
    const brain = brains.get("rob-walling")!;
    const passages = retrieve(brain, "Should I add a free plan to my SaaS?", "SaaS pricing plans freemium");
    assert.ok(passages.length > 0);
    for (const chunk of passages) assert.ok(brain.sourceById.has(chunk.sourceId));
  });

  test("returns nothing when the topic isn't there, even with a good hint", () => {
    assert.equal(retrieve(brains.get("alex-hormozi")!, NOBODY_COVERS_THIS, "money model pricing offer").length, 0);
  });

  test("no source dominates a person's passages", () => {
    const counts = new Map<string, number>();
    for (const chunk of retrieve(brains.get("paul-graham")!, "Should I raise a seed round?", "fundraising investors", 6)) counts.set(chunk.sourceId, (counts.get(chunk.sourceId) ?? 0) + 1);
    for (const n of counts.values()) assert.ok(n <= 2);
  });
});

describe("askAll", () => {
  test("gives everyone their own section, with source links", () => {
    const text = askAll(roundtable("pricing"), brains, "Should I add a free plan to my SaaS?");
    assert.match(text, /^# Pricing Brains: Should I add a free plan/);
    for (const p of roundtable("pricing").people) assert.ok(text.includes(`## ${brains.get(p.slug)!.name}, on ${p.angle}`), p.slug);
    assert.match(text, /Source: https?:\/\//);
  });

  test("rules out invented speech", () => {
    assert.match(askAll(roundtable("fundraising"), brains, "Should I raise a seed round?"), /Don't write dialogue or invented quotes/);
  });

  test("says so when someone has nothing on record", () => {
    const text = askAll(roundtable("pricing"), brains, NOBODY_COVERS_THIS);
    assert.match(text, /Nothing on record on this question/);
    assert.doesNotMatch(text, /Source: https?:\/\//);
  });
});
