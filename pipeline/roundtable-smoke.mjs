// Connects to a running server as a real MCP client and exercises a roundtable end to end.
// Usage: start the server without a database, then node pipeline/roundtable-smoke.mjs [baseUrl=http://localhost:8790]
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import assert from "node:assert/strict";

const base = process.argv[2] ?? "http://localhost:8790";
let passed = 0;
async function check(name, run) {
  await run();
  passed += 1;
  console.log(`ok  ${name}`);
}
async function connect(path) {
  const client = new Client({ name: "roundtable-smoke", version: "0.1.0" });
  await client.connect(new StreamableHTTPClientTransport(new URL(`${base}${path}`)));
  return client;
}
const text = (result) => result.content[0].text;
const toolNames = async (client) => (await client.listTools()).tools.map((t) => t.name).sort();

const pricing = await connect("/pricing-brains/mcp");

await check("a roundtable exposes its tools, all read-only, and names its people", async () => {
  assert.deepEqual(await toolNames(pricing), ["ask_all", "list_sources", "search_brains"]);
  for (const tool of (await pricing.listTools()).tools) assert.equal(tool.annotations?.readOnlyHint, true);
  assert.match(pricing.getInstructions() ?? "", /Pricing Brains: Alex Hormozi/);
  assert.match(pricing.getInstructions() ?? "", /Unofficial/);
});

await check("ask_all returns each person's cited passages", async () => {
  const out = text(await pricing.callTool({ name: "ask_all", arguments: { question: "Should I add a free plan to my SaaS?" } }));
  for (const name of ["Alex Hormozi", "Jason Cohen", "Rob Walling", "Tibo Louis-Lucas", "Corey Haines"]) assert.ok(out.includes(`## ${name}`), name);
  assert.match(out, /Source: https?:\/\//);
});

await check("search_brains stays inside the roundtable", async () => {
  const everyone = text(await pricing.callTool({ name: "search_brains", arguments: { query: "freemium", limit: 10 } }));
  assert.match(everyone, /Rob Walling|Jason Cohen|Tibo/);
  assert.doesNotMatch(everyone, /Pieter Levels|Marc Lou/);
  assert.match(text(await pricing.callTool({ name: "search_brains", arguments: { query: "freemium", brain: "Rob Walling" } })), /Source:/);
  const outside = await pricing.callTool({ name: "search_brains", arguments: { query: "freemium", brain: "marc-lou" } });
  assert.equal(outside.isError, true);
  assert.match(text(outside), /isn't in Pricing Brains/);
});

await check("list_sources works for people in it, and only them", async () => {
  assert.match(text(await pricing.callTool({ name: "list_sources", arguments: { brain: "rob-walling" } })), /https?:\/\//);
  assert.equal((await pricing.callTool({ name: "list_sources", arguments: { brain: "marc-lou" } })).isError, true);
});

await pricing.close();

await check("the main and single-person connectors are unchanged", async () => {
  const all = await connect("/mcp");
  assert.deepEqual(await toolNames(all), ["list_brains", "list_sources", "search_brains"]);
  await all.close();
  const one = await connect("/rob-walling/mcp");
  assert.deepEqual(await toolNames(one), ["list_sources", "search_brain"]);
  await one.close();
});

await check("unknown roundtables 404", async () => {
  const res = await fetch(`${base}/nope-brains/mcp`, { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" });
  assert.equal(res.status, 404);
  assert.equal((await fetch(`${base}/nope-brains`)).status, 404);
});

await check("the API has what the pages need", async () => {
  const roundtables = await (await fetch(`${base}/api/roundtables`)).json();
  assert.ok(roundtables.length >= 5);
  const one = roundtables.find((j) => j.slug === "pricing-brains");
  assert.equal(one.name, "Pricing Brains");
  assert.equal(one.mcp.serverName, "pricing-brains");
  assert.ok(one.mcp.url.endsWith("/pricing-brains/mcp"));
  for (const person of one.people) assert.ok(person.name && person.angle && person.sources > 0);
});

await check("pages render with their own SEO, and appear in the sitemap", async () => {
  assert.match(await (await fetch(`${base}/roundtables`)).text(), /<title>Roundtables · The Brains<\/title>/);
  const page = await (await fetch(`${base}/fundraising-brains`)).text();
  assert.match(page, /<title>Fundraising Brains: /);
  assert.match(page, /rel="canonical" href="[^"]*\/fundraising-brains"/);
  assert.match(await (await fetch(`${base}/sitemap.xml`)).text(), /\/pricing-brains<\/loc>/);
});

await check("a person's page still works", async () => {
  assert.equal((await fetch(`${base}/rob-walling`)).status, 200);
});

console.log(`\n${passed} checks passed`);
