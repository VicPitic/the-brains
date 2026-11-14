// The Brains MCP server: one stateless Streamable HTTP endpoint per brain at POST /<slug>/mcp,
// POST /mcp, which serves every brain behind one connector (for app directories),
// and POST /<topic>-brains/mcp, which serves a roundtable: several brains behind one connector.
import { createOAuthMetadata, mcpAuthRouter } from "@modelcontextprotocol/sdk/server/auth/router.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import express from "express";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import { adminOverview, adminUser, adminXbot, requireAdmin, toCsv } from "./admin.js";
import { AuthError, requestCode, resolveKey, verifyEmailCode } from "./auth.js";
import { type Brain, listSources, loadBrains, searchBrain, searchBrains } from "./brains.js";
import { hasDatabase, migrate } from "./db.js";
import { createSeo } from "./seo.js";
import { askAll, type Roundtable, roundtableForSlug, roundtableName, roundtableSlug, liveRoundtables, loadRoundtables } from "./roundtables.js";
import { getBrain, listBrains, SLUG_RE, toCard } from "./site.js";
import { completeAuthorization, createOAuthProvider, requestExists } from "./oauth.js";
import { emailRows, ensureInstall, recordInstall, recordToolCall, uniqueInstallsBySlug } from "./tracking.js";

const DATA_DIR = join(fileURLToPath(import.meta.url), "..", "..", "data", "brains");
const ROUNDTABLES_PATH = join(fileURLToPath(import.meta.url), "..", "..", "data", "roundtables.json");
const WEB_DIR = join(fileURLToPath(import.meta.url), "..", "..", "web");
const PORT = Number(process.env.PORT ?? 8790);
const PUBLIC_BASE_URL = process.env.PUBLIC_BASE_URL?.replace(/\/$/, "") ?? null;
// MCP endpoints live on their own host (mcp.brains.ceo); the same service answers both.
const MCP_BASE_URL = process.env.MCP_BASE_URL?.replace(/\/$/, "") ?? null;
const mcpHost = MCP_BASE_URL ? new URL(MCP_BASE_URL).host : null;
// OAuth issuer and base for MCP URLs: the MCP host in production, this server locally.
const ISSUER = MCP_BASE_URL ?? PUBLIC_BASE_URL ?? `http://localhost:${PORT}`;
// MCP endpoints need a signed-in user once accounts exist; local runs without a database stay open.
const REQUIRE_AUTH = hasDatabase() && process.env.REQUIRE_KEY !== "false";
// Behind an MCP gateway (Manufact), the gateway writes resource_metadata into per-brain 401s itself and
// can't follow one that points back at its own host, so those 401s leave it out.
const BEHIND_MCP_GATEWAY = process.env.BEHIND_MCP_GATEWAY === "true";
// Header carrying the real client IP when the proxy chain is longer than one hop (e.g. cf-connecting-ip).
const CLIENT_IP_HEADER = process.env.CLIENT_IP_HEADER?.toLowerCase() || null;

let brains = await loadBrains(DATA_DIR);
const roundtableFile = await loadRoundtables(ROUNDTABLES_PATH);
let roundtables = liveRoundtables(roundtableFile, brains);
// Pick up brains the pipeline finishes while the server is running.
setInterval(() => {
  loadBrains(DATA_DIR)
    .then((next) => {
      brains = next;
      roundtables = liveRoundtables(roundtableFile, next);
    })
    .catch((error) => console.error("brain reload failed:", error.message));
}, 60_000).unref();

if (hasDatabase()) await migrate();

interface Caller {
  userId: string | null;
  clientName: string | null;
}

function buildServer(brain: Brain, caller: Caller): McpServer {
  const firstName = brain.name.split(" ")[0];
  const domain = brain.domain ?? "growth, distribution, marketing, pricing and building a business";
  const has = (type: string) => brain.sources.some((s) => s.type === type);
  const postKinds = [has("x_post") ? "X" : null, has("linkedin_post") ? "LinkedIn" : null].filter(Boolean);
  const sourceKinds = ["talks", "interviews", "essays", postKinds.length ? `${postKinds.join(" and ")} posts` : null].filter(Boolean);
  const posts = brain.sourcesLabel ?? (sourceKinds.length > 1 ? `${sourceKinds.slice(0, -1).join(", ")} and ${sourceKinds.at(-1)}` : sourceKinds[0]);
  const server = new McpServer(
    { name: `${brain.slug}-brain`, version: "0.1.0" },
    {
      instructions:
        `${brain.name}'s principles on ${domain}, ` +
        `curated from public ${posts}. Unofficial: not affiliated with or endorsed by ${brain.name}. ` +
        (brain.domain
          ? `Use search_brain for anything about ${firstName}'s views on ${domain}, and cite the returned sources.`
          : `Use search_brain for anything about how ${firstName} builds, grows or prices products, and cite the returned sources.`),
    },
  );

  server.registerTool(
    "search_brain",
    {
      description:
        `Search ${brain.name}'s playbooks on ${domain}, ` +
        `from ${firstName}'s ${posts}. Ask in plain words, one topic per call; call again with ` +
        `other words to dig deeper. Returns passages with their source.`,
      inputSchema: {
        query: z.string().min(2).max(500).describe("What to look for, in plain words"),
        limit: z.number().int().min(1).max(10).default(6).describe("How many passages to return"),
      },
      annotations: { title: "Search brain", readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
    },
    async ({ query, limit }) => {
      recordToolCall({ userId: caller.userId, slug: brain.slug, tool: "search_brain", query, clientName: caller.clientName ?? undefined });
      return { content: [{ type: "text", text: searchBrain(brain, query, limit) }] };
    },
  );

  server.registerTool(
    "list_sources",
    {
      description: `List every talk, interview, essay and post collection in ${brain.name}'s brain, with links.`,
      inputSchema: {},
      annotations: { title: "List sources", readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
    },
    async () => {
      recordToolCall({ userId: caller.userId, slug: brain.slug, tool: "list_sources", clientName: caller.clientName ?? undefined });
      return { content: [{ type: "text", text: listSources(brain) }] };
    },
  );

  return server;
}

// Install/tool-call key for the all-brains endpoint, which isn't tied to one person.
const ALL_SLUG = "all";

// Finds a brain by slug or by name ("pieter-levels", "Pieter Levels", "levels").
function findBrain(ref: string): Brain | null {
  const key = ref.trim().toLowerCase();
  const exact = brains.get(key) ?? [...brains.values()].find((b) => b.name.toLowerCase() === key);
  if (exact) return exact;
  const partial = [...brains.values()].filter((b) => b.slug.includes(key.replace(/\s+/g, "-")));
  return partial.length === 1 ? partial[0] : null;
}

function buildAllServer(caller: Caller): McpServer {
  const server = new McpServer(
    { name: "the-brains", version: "0.1.0" },
    {
      instructions:
        "The Brains: founders, CEOs, investors and creators, each turned into a searchable knowledge base of their principles " +
        "on growth, distribution, marketing, pricing and building a business, curated from public talks, interviews, essays and posts. " +
        "Unofficial: not affiliated with or endorsed by the people. Call list_brains to see who's here, search_brains to find passages " +
        "(across everyone, or one person with `brain`), and always cite the returned sources.",
    },
  );
  const track = (tool: string, slug: string, query?: string) =>
    recordToolCall({ userId: caller.userId, slug, tool, query, clientName: caller.clientName ?? undefined });
  const unknown = (ref: string) => ({
    content: [{ type: "text" as const, text: `No brain named "${ref}". Call list_brains to see who's here.` }],
    isError: true,
  });

  server.registerTool(
    "list_brains",
    {
      title: "List brains",
      description: "List every person in The Brains, with the slug to pass as `brain` and what their brain covers.",
      inputSchema: {},
      annotations: { title: "List brains", readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
    },
    async () => {
      track("list_brains", ALL_SLUG);
      const site = new Map((await listBrains(DATA_DIR)).map((b) => [b.slug, b]));
      const lines = [...brains.values()]
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((b) => {
          const info = site.get(b.slug);
          const role = [info?.role, info?.company].filter(Boolean).join(", ");
          return `- ${b.name} (brain: ${b.slug})${role ? `, ${role}` : ""}: ${info?.tagline ?? ""} [${b.sources.length} sources]`;
        });
      return { content: [{ type: "text", text: lines.join("\n") }] };
    },
  );

  server.registerTool(
    "search_brains",
    {
      title: "Search brains",
      description:
        "Search founders' and investors' playbooks on growth, distribution, marketing, pricing and building a business. " +
        "Leave `brain` empty to search everyone, or pass one person's slug or name. Ask in plain words, one topic per call. " +
        "Returns passages with the person and source.",
      inputSchema: {
        query: z.string().min(2).max(500).describe("What to look for, in plain words"),
        brain: z.string().max(80).optional().describe("Optional: one person's slug or name, e.g. pieter-levels"),
        limit: z.number().int().min(1).max(10).default(6).describe("How many passages to return"),
      },
      annotations: { title: "Search brains", readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
    },
    async ({ query, brain: ref, limit }) => {
      if (ref) {
        const brain = findBrain(ref);
        if (!brain) return unknown(ref);
        track("search_brains", brain.slug, query);
        return { content: [{ type: "text", text: searchBrain(brain, query, limit) }] };
      }
      track("search_brains", ALL_SLUG, query);
      return { content: [{ type: "text", text: searchBrains([...brains.values()], query, limit) }] };
    },
  );

  server.registerTool(
    "list_sources",
    {
      title: "List sources",
      description: "List every talk, interview, essay and post collection in one person's brain, with links.",
      inputSchema: { brain: z.string().max(80).describe("The person's slug or name, e.g. pieter-levels") },
      annotations: { title: "List sources", readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
    },
    async ({ brain: ref }) => {
      const brain = findBrain(ref);
      if (!brain) return unknown(ref);
      track("list_sources", brain.slug);
      return { content: [{ type: "text", text: listSources(brain) }] };
    },
  );

  return server;
}

// A roundtable: a few brains on one topic behind one connector, for people who want a panel rather than every brain.
function buildRoundtableServer(roundtable: Roundtable, caller: Caller): McpServer {
  const slug = roundtableSlug(roundtable);
  const name = roundtableName(roundtable);
  const people = roundtable.people.flatMap((person) => {
    const brain = brains.get(person.slug);
    return brain ? [brain] : [];
  });
  const roster = people.map((b) => b.name).join(", ");
  const slugs = people.map((b) => b.slug).join(", ");
  const findPerson = (ref: string) => {
    const key = ref.trim().toLowerCase();
    return people.find((b) => b.slug === key.replace(/\s+/g, "-") || b.name.toLowerCase() === key) ?? null;
  };
  const notHere = (ref: string) => ({ content: [{ type: "text" as const, text: `${ref} isn't in ${name}. The people here are: ${slugs}.` }], isError: true });
  const track = (tool: string, query?: string) => recordToolCall({ userId: caller.userId, slug, tool, query, clientName: caller.clientName ?? undefined });
  const annotations = (title: string) => ({ title, readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false });

  const server = new McpServer(
    { name: slug, version: "0.1.0" },
    {
      instructions:
        `${name}: ${roster}. ${roundtable.blurb} Built from their public talks, interviews, essays and posts. Unofficial: not affiliated with or endorsed by these people. ` +
        "Use ask_all for a decision or anything that needs several points of view, search_brains to look something up, and always cite the returned sources.",
    },
  );

  server.registerTool(
    "ask_all",
    {
      title: "Ask everyone",
      description: `Put one question to everyone in ${name} (${roster}) and get each person's passages, separately and with sources. Then answer from those passages.`,
      inputSchema: { question: z.string().min(3).max(500).describe("The decision or question, in the user's words") },
      annotations: annotations("Ask everyone"),
    },
    async ({ question }) => {
      track("ask_all", question);
      return { content: [{ type: "text", text: askAll(roundtable, brains, question) }] };
    },
  );

  server.registerTool(
    "search_brains",
    {
      title: "Search these brains",
      description: `Search what the people in ${name} have said. Leave \`brain\` empty to search all of them, or pass one person: ${slugs}. Returns passages with the person and source.`,
      inputSchema: {
        query: z.string().min(2).max(500).describe("What to look for, in plain words"),
        brain: z.string().max(80).optional().describe("Optional: one person's slug or name"),
        limit: z.number().int().min(1).max(10).default(6).describe("How many passages to return"),
      },
      annotations: annotations("Search these brains"),
    },
    async ({ query, brain: ref, limit }) => {
      track("search_brains", query);
      if (!ref) return { content: [{ type: "text", text: searchBrains(people, query, limit) }] };
      const brain = findPerson(ref);
      if (!brain) return notHere(ref);
      return { content: [{ type: "text", text: searchBrain(brain, query, limit) }] };
    },
  );

  server.registerTool(
    "list_sources",
    {
      title: "List sources",
      description: `List every talk, interview, essay and post collection behind one person in ${name}, with links.`,
      inputSchema: { brain: z.string().max(80).describe(`The person's slug or name: ${slugs}`) },
      annotations: annotations("List sources"),
    },
    async ({ brain: ref }) => {
      const brain = findPerson(ref);
      if (!brain) return notHere(ref);
      track("list_sources");
      return { content: [{ type: "text", text: listSources(brain) }] };
    },
  );

  return server;
}

const ROUNDTABLE_TOOLS = [
  { name: "ask_all", description: "Put one question to everyone and get each person's passages, separately and with sources.", readOnly: true },
  { name: "search_brains", description: "Search all of them, or one person. Returns passages with their source.", readOnly: true },
  { name: "list_sources", description: "List every talk, essay and post behind one person, with links.", readOnly: true },
];

const app = express();
// Railway puts exactly one proxy in front of us; a precise hop count keeps req.ip honest.
app.set("trust proxy", 1);
// Longer proxy chains (Manufact's gateway) end at a shared hop, so req.ip comes from their client-IP
// header instead. Our code-request limits and the SDK's OAuth rate limiters all key on req.ip.
if (CLIENT_IP_HEADER) {
  app.use((req, _res, next) => {
    const ip = req.get(CLIENT_IP_HEADER)?.trim();
    if (ip) Object.defineProperty(req, "ip", { value: ip, configurable: true });
    next();
  });
}
app.use(express.json({ limit: "1mb" }));

// The MCP host only serves MCP endpoints, OAuth and health; anything else goes to the website.
const MCP_HOST_PATHS = /^\/(?:(?:[a-z0-9-]+\/)?mcp|health|\.well-known\/.*|authorize|token|register|revoke|userinfo|oauth\/.*)$/;
app.use((req, res, next) => {
  if (!mcpHost || req.hostname !== mcpHost.split(":")[0] || MCP_HOST_PATHS.test(req.path)) return next();
  res.redirect(301, `${PUBLIC_BASE_URL ?? ""}${req.originalUrl}`);
});

// What sign-in and OAuth metadata call a connector: a person's name, or a roundtable's name.
function connectableName(slug: string): string | null {
  const roundtable = roundtableForSlug(roundtables, slug);
  return brains.get(slug)?.name ?? (roundtable ? roundtableName(roundtable) : null);
}

const bearer = (req: express.Request) => req.get("authorization")?.match(/^Bearer\s+(\S+)$/i)?.[1] ?? null;
const siteOrigin = (req: express.Request) => PUBLIC_BASE_URL ?? `${req.protocol}://${req.get("host")}`;

function sendAuthError(res: express.Response, error: unknown) {
  if (error instanceof AuthError) return void res.status(error.status).json({ error: error.code, ...error.extra });
  console.error(error);
  res.status(500).json({ error: "server_error" });
}

// ---- MCP authorization: public brain URLs, sign-in with email + 6-digit code on connect ----
if (hasDatabase()) {
  const provider = createOAuthProvider({
    issuer: new URL(ISSUER).href,
    brainName: (slug) => connectableName(slug),
    onAuthorized: async ({ userId, slug, clientName }) => {
      if (slug && connectableName(slug)) await recordInstall(userId, slug, clientName);
    },
  });
  // Must match the SDK's authorization-server `issuer` byte for byte (it serializes via URL.href,
  // so "https://mcp.brains.ceo/"), or strict RFC 8414 clients like Copilot CLI reject it.
  const issuerUrl = new URL(ISSUER);
  // Each brain is its own protected resource, all served by one authorization server.
  app.get("/.well-known/oauth-protected-resource/:slug/mcp", (req, res) => {
    const name = connectableName(req.params.slug);
    if (!name) return void res.status(404).json({ error: "not_found" });
    res.json({
      resource: `${ISSUER}/${req.params.slug}/mcp`,
      authorization_servers: [issuerUrl.href],
      bearer_methods_supported: ["header"],
      resource_name: brains.has(req.params.slug) ? `${name}'s brain` : name,
    });
  });
  app.get("/.well-known/oauth-protected-resource/mcp", (_req, res) => {
    res.json({
      resource: `${ISSUER}/mcp`,
      authorization_servers: [issuerUrl.href],
      bearer_methods_supported: ["header"],
      resource_name: "The Brains",
    });
  });
  // The SDK's metadata plus a UserInfo endpoint, so clients and dashboards can show who signed in.
  const authMetadata = { ...createOAuthMetadata({ provider, issuerUrl }), userinfo_endpoint: new URL("/userinfo", issuerUrl).href };
  app.get("/.well-known/oauth-authorization-server", (_req, res) => {
    res.set("Access-Control-Allow-Origin", "*").json(authMetadata);
  });
  app.use(mcpAuthRouter({ provider, issuerUrl, resourceServerUrl: issuerUrl, resourceName: "The Brains" }));

  app.options("/userinfo", (_req, res) => {
    res.set({ "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Authorization" }).status(204).end();
  });
  app.get("/userinfo", async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    const user = await resolveKey(bearer(req)).catch(() => null);
    if (!user) return void res.status(401).set("WWW-Authenticate", `Bearer error="invalid_token"`).json({ error: "invalid_token" });
    res.json({ sub: user.userId, email: user.email });
  });

  app.post("/oauth/send-code", async (req, res) => {
    try {
      if (!(await requestExists(String(req.body?.requestId ?? "")))) return void res.status(410).json({ error: "expired_request" });
      await requestCode(req.body?.email, req.ip ?? null);
      res.json({ ok: true });
    } catch (error) {
      sendAuthError(res, error);
    }
  });

  app.post("/oauth/verify", async (req, res) => {
    try {
      const requestId = String(req.body?.requestId ?? "");
      if (!(await requestExists(requestId))) return void res.status(410).json({ error: "expired_request" });
      const user = await verifyEmailCode(req.body?.email, req.body?.code, { ip: req.ip ?? null, userAgent: req.get("user-agent") ?? null });
      res.json({ redirect: await completeAuthorization(requestId, user.userId) });
    } catch (error) {
      sendAuthError(res, error);
    }
  });
}

app.get("/health", (_req, res) => {
  res.json({ ok: true, brains: [...brains.keys()] });
});

app.get("/brains", (_req, res) => {
  res.json(
    [...brains.values()].map((b) => ({
      slug: b.slug,
      name: b.name,
      sources: b.sources.length,
      builtAt: b.builtAt,
      mcp: `/${b.slug}/mcp`,
    })),
  );
});

// Runs one stateless MCP request. `brain` is null for the all-brains endpoint.
async function handleMcp(req: express.Request, res: express.Response, target: { brain: Brain } | { roundtable: Roundtable } | null) {
  const brain = target && "brain" in target ? target.brain : null;
  const roundtable = target && "roundtable" in target ? target.roundtable : null;
  const scoped = brain?.slug ?? (roundtable ? roundtableSlug(roundtable) : null);
  const slug = scoped ?? ALL_SLUG;
  const resourcePath = scoped ? `${scoped}/mcp` : "mcp";
  const signInName = brain ? `${brain.name}'s brain` : roundtable ? roundtableName(roundtable) : "The Brains";
  // Bearer token from the OAuth flow; ?key= keeps early personal links working.
  const key = bearer(req) ?? (typeof req.query.key === "string" ? req.query.key : null);
  const user = hasDatabase() ? await resolveKey(key).catch(() => null) : null;
  if (REQUIRE_AUTH && !user) {
    // Tells the MCP client where to start OAuth (RFC 9728); it then opens our sign-in page.
    res
      .status(401)
      .set(
        "WWW-Authenticate",
        // scope="brain:<slug>" tells the sign-in page which brain this is when the resource doesn't (SEP-835 clients send it).
        scoped && BEHIND_MCP_GATEWAY
          ? `Bearer realm="The Brains", scope="brain:${scoped}"`
          : `Bearer resource_metadata="${ISSUER}/.well-known/oauth-protected-resource/${resourcePath}"${scoped ? `, scope="brain:${scoped}"` : ""}`,
      )
      .json({
        jsonrpc: "2.0",
        error: { code: -32001, message: `Sign in to use ${signInName}: connect it from your MCP client.` },
        id: null,
      });
    return;
  }
  const clientName = req.body?.params?.clientInfo?.name ?? req.get("user-agent") ?? null;
  if (user) ensureInstall(user.userId, slug, clientName);
  const caller = { userId: user?.userId ?? null, clientName };
  const server = brain ? buildServer(brain, caller) : roundtable ? buildRoundtableServer(roundtable, caller) : buildAllServer(caller);
  const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
  try {
    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
    res.on("close", () => {
      void transport.close();
      void server.close();
    });
  } catch (error) {
    console.error(`MCP request failed for ${slug}:`, error);
    if (!res.headersSent) {
      res.status(500).json({ jsonrpc: "2.0", error: { code: -32603, message: "Internal server error" }, id: null });
    }
  }
}

app.post("/mcp", (req, res) => handleMcp(req, res, null));

app.post("/:slug/mcp", async (req, res) => {
  const brain = brains.get(req.params.slug);
  const roundtable = brain ? null : roundtableForSlug(roundtables, req.params.slug);
  if (!brain && !roundtable) {
    res.status(404).json({ jsonrpc: "2.0", error: { code: -32004, message: `No brain named "${req.params.slug}"` }, id: null });
    return;
  }
  await handleMcp(req, res, brain ? { brain } : { roundtable: roundtable! });
});

// Plain-text previews of the two tools, for checking a brain in a browser.
app.get("/:slug/preview/search", (req, res) => {
  const brain = brains.get(req.params.slug);
  if (!brain) return void res.status(404).send(`No brain named "${req.params.slug}"`);
  const query = String(req.query.q ?? "").trim();
  if (query.length < 2) return void res.status(400).send("Pass ?q=<what to look for>");
  const limit = Math.min(10, Math.max(1, Number(req.query.limit ?? 6) || 6));
  res.type("text/plain; charset=utf-8").send(searchBrain(brain, query, limit));
});

app.get("/:slug/preview/sources", (req, res) => {
  const brain = brains.get(req.params.slug);
  if (!brain) return void res.status(404).send(`No brain named "${req.params.slug}"`);
  res.type("text/plain; charset=utf-8").send(listSources(brain));
});

// Stateless server: no SSE stream or session teardown.
app.get(["/mcp", "/:slug/mcp"], (_req, res) => {
  res.status(405).set("Allow", "POST").send("Method Not Allowed");
});

// ---- Website: static assets, JSON API and pages ----
app.use("/assets", express.static(join(WEB_DIR, "assets"), { maxAge: 0 }));

app.get("/api/brains", async (_req, res) => {
  const [all, installs] = await Promise.all([listBrains(DATA_DIR), uniqueInstallsBySlug().catch(() => new Map<string, number>())]);
  res.json(all.map((brain) => ({ ...toCard(brain), installs: installs.get(brain.slug) ?? 0 })));
});

app.get("/api/roundtables", async (_req, res) => {
  const [all, installs] = await Promise.all([listBrains(DATA_DIR), uniqueInstallsBySlug().catch(() => new Map<string, number>())]);
  const site = new Map(all.map((b) => [b.slug, b]));
  res.json(
    roundtables.map((roundtable) => {
      const slug = roundtableSlug(roundtable);
      return {
        slug,
        name: roundtableName(roundtable),
        blurb: roundtable.blurb,
        questions: roundtable.questions,
        installs: installs.get(slug) ?? 0,
        mcp: { url: `${ISSUER}/${slug}/mcp`, serverName: slug, tools: ROUNDTABLE_TOOLS },
        people: roundtable.people.flatMap((person) => {
          const brain = site.get(person.slug);
          if (!brain) return [];
          const { slug: personSlug, name, shortName, avatarUrl, avatarAlt } = brain;
          const sources = brain.stats.longFormCount + brain.stats.xPostCount + (brain.stats.linkedinPostCount ?? 0);
          return [{ slug: personSlug, name, shortName, avatarUrl, avatarAlt, angle: person.angle, sources }];
        }),
      };
    }),
  );
});

// ---- Admin: who installed what, and the email list ----
const brainName = (slug: string) => connectableName(slug);
const ADMIN_RANGES = new Set([7, 30, 90, 0]);

app.get("/admin", requireAdmin, (_req, res) => sendPage(res, "admin/index.html"));
app.use("/admin/assets", requireAdmin, express.static(join(WEB_DIR, "admin"), { maxAge: 0 }));

app.get("/admin/api/overview", requireAdmin, (req, res) => {
  const range = Number(req.query.range ?? 30);
  if (!ADMIN_RANGES.has(range)) return void res.status(400).json({ error: "range must be 7, 30, 90 or 0" });
  adminOverview(range, brainName)
    .then((data) => res.set("Cache-Control", "no-store").json(data))
    .catch((error) => sendAuthError(res, error));
});

app.get("/admin/api/xbot", requireAdmin, (req, res) => {
  const range = Number(req.query.range ?? 30);
  if (!ADMIN_RANGES.has(range)) return void res.status(400).json({ error: "range must be 7, 30, 90 or 0" });
  adminXbot(range, brainName)
    .then((data) => res.set("Cache-Control", "no-store").json(data))
    .catch((error) => sendAuthError(res, error));
});

app.get("/admin/api/users/:id", requireAdmin, async (req, res) => {
  try {
    const user = await adminUser(req.params.id, brainName);
    if (!user) return void res.status(404).json({ error: "No such user" });
    res.set("Cache-Control", "no-store").json(user);
  } catch (error) {
    sendAuthError(res, error);
  }
});

app.get("/admin/emails.csv", requireAdmin, async (_req, res) => {
  const stamp = new Date().toISOString().slice(0, 10);
  res.type("text/csv").set("Content-Disposition", `attachment; filename="the-brains-emails-${stamp}.csv"`).send(toCsv(await emailRows()));
});

app.get("/api/brains/:slug", async (req, res) => {
  const brain = await getBrain(DATA_DIR, req.params.slug);
  if (!brain) return void res.status(404).json({ error: `No brain named "${req.params.slug}"` });
  res.json(brain);
});

app.get("/media/:slug/:file", (req, res) => {
  const { slug, file } = req.params;
  if (!SLUG_RE.test(slug) || !["photo.jpg", "sketch.png"].includes(file)) return void res.status(404).end();
  res.sendFile(join(DATA_DIR, slug, file), { maxAge: "1h" }, (error) => {
    if (error && !res.headersSent) res.status(404).end();
  });
});

const sendPage = (res: express.Response, page: string, status = 200) =>
  res.status(status).set("Cache-Control", "no-cache").sendFile(join(WEB_DIR, page));

// Pages go out with canonical, Open Graph and structured data in <head>; the plain file is the fallback.
const seo = createSeo(WEB_DIR, PUBLIC_BASE_URL ?? "https://brains.ceo");
const sendSeoPage = (res: express.Response, html: Promise<string>, page: string, status = 200) =>
  html
    .then((body) => res.status(status).set("Cache-Control", "no-cache").type("html").send(body))
    .catch((error) => {
      console.error(`SEO render failed for ${page}:`, error);
      sendPage(res, page, status);
    });

app.get("/robots.txt", (_req, res) => {
  res.type("text/plain").send(seo.robots());
});
app.get("/sitemap.xml", async (_req, res) => {
  res.type("application/xml").set("Cache-Control", "public, max-age=3600").send(seo.sitemap(await listBrains(DATA_DIR), roundtables.map(roundtableSlug)));
});

app.get("/", (_req, res) => sendSeoPage(res, listBrains(DATA_DIR).then(seo.home), "index.html"));
app.get("/privacy", (_req, res) =>
  sendSeoPage(res, seo.page("privacy.html", "/privacy", "What The Brains collects when you sign in and connect a brain, and what it never receives."), "privacy.html"),
);
app.get("/terms", (_req, res) =>
  sendSeoPage(res, seo.page("terms.html", "/terms", "Terms for using The Brains: unofficial brains built from public content, free and open source."), "terms.html"),
);
app.get("/love", (_req, res) => sendSeoPage(res, seo.page("love.html", "/love"), "love.html"));

// /<slug> and /<slug>/sources are the brain page (the sources view is an anchor on it).
app.get("/roundtables", (_req, res) => sendSeoPage(res, seo.roundtablesIndex(roundtables), "roundtables.html"));
app.get("/:slug", (req, res, next) => {
  const roundtable = roundtableForSlug(roundtables, req.params.slug);
  if (!roundtable) return next();
  sendSeoPage(res, seo.roundtable(roundtable, (slug) => brains.get(slug)?.name ?? null), "roundtable.html");
});

app.get(["/:slug", "/:slug/sources"], async (req, res) => {
  const brain = await getBrain(DATA_DIR, req.params.slug);
  if (!brain) return void sendSeoPage(res, seo.notFound(), "404.html", 404);
  sendSeoPage(res, seo.brain(brain), "brain.html");
});

app.use((_req, res) => sendSeoPage(res, seo.notFound(), "404.html", 404));

app.listen(PORT, () => {
  console.log(`The Brains MCP on :${PORT} serving ${[...brains.keys()].join(", ") || "no brains yet"}`);
});
