// Step 5: rewrite each long-form source into clean, sectioned, third-person notes (the format
// Nevo's Brain serves), using headless Claude Code on the subscription.
// Usage: node pipeline/notes.mjs <slug> [concurrency=3]
// Writes data/brains/<slug>/notes/<sourceId>.md. Skips sources whose card says the person
// isn't speaking or quality < 2, and notes that already exist.
import { spawn } from "node:child_process";
import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { brainDir, focusOf, isPost, loadPerson, pool, readJson } from "./lib.mjs";

const slug = process.argv[2];
const concurrency = Number(process.argv[3] ?? 3);
if (!slug) throw new Error("Usage: node pipeline/notes.mjs <slug> [concurrency]");
const person = await loadPerson(slug);
const dir = brainDir(slug);
const { sources } = await readJson(join(dir, "sources.json"));
await mkdir(join(dir, "notes"), { recursive: true });

const firstName = person.name.split(" ")[0];
const system = `You turn one source (a transcript or article) into reference notes for "${person.name}'s brain", a cited knowledge base of ${person.name}'s principles on ${focusOf(person).domain}.

Rules:
- Output Markdown only. No preamble, no title line, no closing summary.
- Split into 3-8 sections, each starting with "## " and a specific heading. Every section must stand alone, because search returns sections one at a time.
- Write in the third person about ${firstName} ("${firstName} prices...", "He argues..."), in plain, compact sentences and bullets.
- Keep the concrete detail: numbers, revenue, prices, dates, product names, tools, examples, step-by-step tactics, and short verbatim quotes in double quotes where the wording matters.
- Only include what ${firstName} says or clearly endorses. Leave out hosts' and other guests' views, tips and figures (don't write "per the host"; drop the point instead), ads, small talk and off-topic life stories.
- Never invent or round numbers. If the transcript is ambiguous, leave the detail out.
- Length: 400-1800 words, scaled to how much ${focusOf(person).substance} the source has.`;

function runClaude(prompt) {
  return new Promise((resolve, reject) => {
    const child = spawn(
      "claude",
      ["-p", "--model", "sonnet", "--output-format", "text", "--tools", "", "--strict-mcp-config", "--no-session-persistence", "--system-prompt", system],
      { stdio: ["pipe", "pipe", "pipe"] },
    );
    let out = "";
    let err = "";
    child.stdout.on("data", (d) => (out += d));
    child.stderr.on("data", (d) => (err += d));
    child.on("close", (code) =>
      code === 0 && out.includes("## ") ? resolve(out.trim()) : reject(new Error(`claude exited ${code}: ${(err || out).slice(0, 300)}`)),
    );
    child.stdin.end(prompt);
  });
}

const todo = [];
for (const source of sources.filter((s) => !isPost(s.type))) {
  const card = await readJson(join(dir, "cards", `${source.id}.json`), null);
  if (card && (!card.personIsSpeaker || card.quality < 2)) continue;
  if (await access(join(dir, "notes", `${source.id}.md`)).then(() => true, () => false)) continue;
  todo.push(source);
}

let done = 0;
await pool(todo, concurrency, async (source) => {
  const text = await readFile(join(dir, "sources", `${source.id}.md`), "utf8");
  try {
    const notes = await runClaude(`Source (${source.type}, ${source.outlet ?? ""}, ${source.publishedAt ?? ""}): ${source.title}\n${source.url}\n\n${text}`);
    await writeFile(join(dir, "notes", `${source.id}.md`), notes + "\n");
    console.log(`[${++done}/${todo.length}] ${source.id} ${notes.length} chars`);
  } catch (error) {
    console.warn(`FAILED ${source.id}: ${error.message}`);
  }
});
