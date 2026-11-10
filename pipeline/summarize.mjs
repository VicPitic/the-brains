// Step 4: one "source card" per long-form source, written by headless Claude Code (`claude -p`),
// so the work runs on the Claude subscription rather than paid API calls.
// Usage: node pipeline/summarize.mjs <slug> [concurrency=3]
// Writes data/brains/<slug>/cards/<sourceId>.json (skips cards that already exist).
import { spawn } from "node:child_process";
import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { brainDir, focusOf, isPost, loadPerson, pool, readJson } from "./lib.mjs";

const slug = process.argv[2];
const concurrency = Number(process.argv[3] ?? 3);
if (!slug) throw new Error("Usage: node pipeline/summarize.mjs <slug> [concurrency]");
const person = await loadPerson(slug);
const focus = focusOf(person);

const SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["title", "summary", "principles", "topics", "personIsSpeaker", "quality"],
  properties: {
    title: { type: "string", description: "Descriptive title in the style 'How X did Y' or 'Topic: specifics', max 110 chars" },
    summary: { type: "string", description: "2-3 sentences on what this source teaches, max 400 chars" },
    principles: {
      type: "array",
      maxItems: 6,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["text", "quote"],
        properties: {
          text: { type: "string", description: "The principle in plain words, max 140 chars" },
          quote: { type: "string", description: "Verbatim supporting quote from the source, max 240 chars" },
        },
      },
    },
    topics: { type: "array", items: { type: "string", enum: focus.topics }, maxItems: 4 },
    personIsSpeaker: { type: "boolean", description: "True if the person is actually speaking/writing in this source" },
    quality: { type: "integer", minimum: 1, maximum: 5, description: `How much durable insight on ${focus.domain} this source holds` },
  },
};

const dir = brainDir(slug);
const { sources } = await readJson(join(dir, "sources.json"));
const longForm = sources.filter((s) => !isPost(s.type));
await mkdir(join(dir, "cards"), { recursive: true });

const system = [
  `You write source cards for "${person.name}'s brain", a cited knowledge base of ${person.name}'s core principles on ${focus.domain}.`,
  `Read the source and extract only what ${person.name} says or clearly endorses. Ignore hosts, other guests and ads.`,
  `Quotes must be copied verbatim from the source text (fix only obvious transcription casing). Never invent numbers.`,
  `If ${person.name} is not actually speaking or writing in it, set personIsSpeaker false and keep principles empty.`,
].join(" ");

function runClaude(prompt) {
  return new Promise((resolve, reject) => {
    const child = spawn(
      "claude",
      ["-p", "--model", "sonnet", "--output-format", "json", "--json-schema", JSON.stringify(SCHEMA),
        "--tools", "", "--strict-mcp-config", "--no-session-persistence", "--system-prompt", system],
      { stdio: ["pipe", "pipe", "pipe"] },
    );
    let out = "";
    let err = "";
    child.stdout.on("data", (d) => (out += d));
    child.stderr.on("data", (d) => (err += d));
    child.on("close", (code) => {
      if (code !== 0) return reject(new Error(`claude exited ${code}: ${err.slice(0, 300) || out.slice(0, 300)}`));
      try {
        const envelope = JSON.parse(out);
        resolve(envelope.structured_output ?? JSON.parse(envelope.result));
      } catch (error) {
        reject(new Error(`unparseable claude output: ${out.slice(0, 300)}`));
      }
    });
    child.stdin.end(prompt);
  });
}

let done = 0;
await pool(longForm, concurrency, async (source) => {
  const cardPath = join(dir, "cards", `${source.id}.json`);
  if (await access(cardPath).then(() => true, () => false)) return;
  const text = await readFile(join(dir, "sources", `${source.id}.md`), "utf8");
  const prompt = `Source (${source.type}, ${source.outlet ?? ""}, ${source.publishedAt ?? ""}): ${source.title}\n${source.url}\n\n${text}`;
  try {
    const card = await runClaude(prompt);
    await writeFile(cardPath, JSON.stringify({ id: source.id, ...card }, null, 2) + "\n");
    console.log(`[${++done}/${longForm.length}] ${source.id} q${card.quality} ${card.personIsSpeaker ? "" : "(not speaker)"} ${card.title}`);
  } catch (error) {
    console.warn(`FAILED ${source.id}: ${error.message}`);
  }
});
