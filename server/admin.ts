// Password-protected admin: a usage dashboard (/admin) fed by JSON endpoints, plus the email CSV.
import type { NextFunction, Request, Response } from "express";
import { timingSafeEqual } from "node:crypto";
import { db } from "./db.js";

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const password = process.env.ADMIN_PASSWORD;
  const [scheme, encoded] = (req.get("authorization") ?? "").split(" ");
  const given = scheme === "Basic" && encoded ? Buffer.from(encoded, "base64").toString().split(":").slice(1).join(":") : "";
  const ok = Boolean(password) && given.length === password!.length && timingSafeEqual(Buffer.from(given), Buffer.from(password!));
  if (!ok) {
    res.set("WWW-Authenticate", 'Basic realm="The Brains admin"').status(401).send("Admin login required");
    return;
  }
  next();
}

export function toCsv(rows: Record<string, unknown>[]): string {
  if (!rows.length) return "email,created_at,last_seen_at,brains,installs,tool_calls\n";
  const columns = Object.keys(rows[0]);
  const cell = (v: unknown) => {
    const text = v instanceof Date ? v.toISOString() : String(v ?? "");
    return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  };
  return [columns.join(","), ...rows.map((row) => columns.map((c) => cell(row[c])).join(","))].join("\n") + "\n";
}

// MCP clients identify themselves inconsistently (OAuth client names, clientInfo, user agents).
// Fold them into the app people actually use, keeping the surface (CLI, Desktop…) as detail.
export function clientFamily(raw: string | null | undefined): { family: string; surface: string | null } {
  const name = (raw ?? "").trim();
  const s = name.toLowerCase();
  if (!s) return { family: "Unknown", surface: null };
  if (/^claude[- ]code/.test(s)) {
    const surface = s.includes("claude-desktop")
      ? "Desktop"
      : s.includes("vscode")
        ? "VS Code"
        : s.includes("sdk")
          ? "Agent SDK"
          : s.includes("(cli)")
            ? "CLI"
            : null;
    return { family: "Claude Code", surface };
  }
  if (s.startsWith("claude")) return { family: "Claude", surface: s.startsWith("claude-user") ? "connector" : null };
  if (s.includes("codex")) return { family: "Codex", surface: null };
  if (s.startsWith("openai-mcp") || s.startsWith("chatgpt")) return { family: "ChatGPT", surface: null };
  if (s.startsWith("cursor")) return { family: "Cursor", surface: null };
  if (s.startsWith("opencode")) return { family: "OpenCode", surface: null };
  if (/^(omp|oh-my-pi)\b/.test(s)) return { family: "oh-my-pi", surface: null };
  if (s.includes("antigravity")) return { family: "Antigravity", surface: null };
  if (s.startsWith("perplexity")) return { family: "Perplexity", surface: null };
  if (/^(visual studio code|vscode)/.test(s)) return { family: "VS Code", surface: null };
  if (/^(python|curl|node|axios|undici|go-http|httpx|mcp\b|mcp\/)/.test(s)) return { family: "Scripts & SDKs", surface: name.split(/[\s/(]/)[0] };
  return { family: name.split(/[/(]/)[0].trim().slice(0, 28) || "Unknown", surface: null };
}

const DAY_MS = 86_400_000;
const utcDay = (col: string) => `(${col} at time zone 'UTC')::date`;
const dayKey = (col: string) => `to_char(${utcDay(col)}, 'YYYY-MM-DD')`;
const isoDay = (t: number) => new Date(t).toISOString().slice(0, 10);
const num = (v: unknown) => Number(v ?? 0);

function dayList(from: string, to: string): string[] {
  const out: string[] = [];
  for (let t = Date.parse(from); t <= Date.parse(to); t += DAY_MS) out.push(isoDay(t));
  return out;
}

type Row = Record<string, any>;
const rows = (sql: string, params: unknown[] = []) => db().query(sql, params).then((r) => r.rows as Row[]);

// Everything the dashboard shows for one window: the last `range` UTC days including today
// (0 = since the first signup). Previous-window numbers power the "vs previous" deltas.
export async function adminOverview(range: number, brainName: (slug: string) => string | null) {
  const today = isoDay(Date.now());
  const [{ first }] = await rows(`select to_char(${utcDay("min(created_at)")}, 'YYYY-MM-DD') as first from users`);
  // Windows never reach back before the first signup, so charts don't open on empty pre-launch days.
  const windowStart = range ? isoDay(Date.parse(today) - (range - 1) * DAY_MS) : today;
  const start = first && (!range || first > windowStart) ? first : windowStart;
  const since = new Date(`${start}T00:00:00Z`);
  const prev = range ? new Date(since.getTime() - range * DAY_MS) : null;
  const p = [since, prev];

  const [
    [kpi],
    [funnel],
    daily,
    signupsDaily,
    activeDays,
    cohortUsers,
    brainRows,
    brainInstalls,
    brainDaily,
    clientRows,
    toolRows,
    userRows,
    userTopBrain,
    userClients,
    userDaily,
    questions,
  ] = await Promise.all([
    rows(
      `with t as (
         select t.user_id, t.created_at, ${utcDay("t.created_at")} as d, ${utcDay("u.created_at")} as sd
         from tool_calls t join users u on u.id = t.user_id
         where t.created_at >= coalesce($2::timestamptz, $1::timestamptz))
       select
         (select count(*) from users) as users_total,
         (select count(*) from users where created_at >= $1) as signups,
         (select count(*) from users where created_at >= $2 and created_at < $1) as signups_prev,
         (select count(*) from installs where created_at >= $1) as installs,
         (select count(*) from installs where created_at >= $2 and created_at < $1) as installs_prev,
         count(*) filter (where created_at >= $1) as calls,
         count(*) filter (where created_at < $1) as calls_prev,
         count(distinct user_id) filter (where created_at >= $1) as active,
         count(distinct user_id) filter (where created_at < $1) as active_prev,
         count(distinct user_id) filter (where created_at >= $1 and d > sd) as returning,
         count(distinct user_id) filter (where created_at < $1 and d > sd) as returning_prev
       from t`,
      p,
    ),
    rows(
      `with c as (select id, ${utcDay("created_at")} as sd from users where created_at >= $1),
       a as (select t.user_id, count(distinct ${utcDay("t.created_at")}) as days, bool_or(${utcDay("t.created_at")} > c.sd) as came_back
             from tool_calls t join c on c.id = t.user_id group by 1)
       select (select count(*) from c) as signed_up,
         (select count(distinct i.user_id) from installs i join c on c.id = i.user_id) as installed,
         (select count(*) from a) as called,
         (select count(*) from a where came_back) as returned,
         (select count(*) from a where days >= 3) as habit`,
      [since],
    ),
    rows(
      `select ${dayKey("t.created_at")} as day, count(*) as calls, count(distinct t.user_id) as active,
         count(distinct t.user_id) filter (where ${utcDay("t.created_at")} > ${utcDay("u.created_at")}) as returning
       from tool_calls t join users u on u.id = t.user_id where t.created_at >= $1 group by 1`,
      [since],
    ),
    rows(`select ${dayKey("created_at")} as day, count(*) as n from users where created_at >= $1 group by 1`, [since]),
    rows(
      `select days, count(*) as users from (
         select user_id, count(distinct ${utcDay("created_at")}) as days from tool_calls where created_at >= $1 group by 1) x
       group by 1 order by 1`,
      [since],
    ),
    rows(
      `select ${dayKey("u.created_at")} as sd,
         coalesce(array_agg(distinct ${dayKey("t.created_at")}) filter (where t.id is not null), '{}') as days
       from users u left join tool_calls t on t.user_id = u.id
       where u.created_at >= $1 group by u.id`,
      [since],
    ),
    rows(
      `select brain_slug as slug,
         count(*) filter (where created_at >= $1) as calls,
         count(*) filter (where created_at < $1) as calls_prev,
         count(distinct user_id) filter (where created_at >= $1) as users
       from tool_calls where created_at >= coalesce($2::timestamptz, $1::timestamptz) group by 1`,
      p,
    ),
    rows(
      `select brain_slug as slug, count(distinct user_id) as installers, count(*) filter (where created_at >= $1) as installs
       from installs group by 1`,
      [since],
    ),
    rows(
      `select brain_slug as slug, ${dayKey("created_at")} as day, count(*) as n, count(distinct user_id) as users
       from tool_calls where created_at >= $1 group by 1, 2`,
      [since],
    ),
    rows(`select client_name, user_id, count(*) as n from tool_calls where created_at >= $1 group by 1, 2`, [since]),
    rows(
      `select tool, count(*) as n, count(distinct user_id) as users from tool_calls where created_at >= $1 group by 1 order by 2 desc`,
      [since],
    ),
    rows(
      `select u.id, u.email, u.created_at, coalesce(a.calls, 0) as calls, coalesce(a.days, 0) as days, coalesce(a.brains, 0) as brains,
         coalesce(l.calls, 0) as calls_total, coalesce(l.days, 0) as days_total, l.last_call,
         (select count(*) from installs i where i.user_id = u.id) as installs
       from users u
       left join (select user_id, count(*) as calls, count(distinct ${utcDay("created_at")}) as days, count(distinct brain_slug) as brains
                  from tool_calls where created_at >= $1 group by 1) a on a.user_id = u.id
       left join (select user_id, count(*) as calls, count(distinct ${utcDay("created_at")}) as days, max(created_at) as last_call
                  from tool_calls group by 1) l on l.user_id = u.id
       order by calls desc, calls_total desc, u.created_at desc limit 1000`,
      [since],
    ),
    rows(
      `select distinct on (user_id) user_id, brain_slug from tool_calls where created_at >= $1
       group by 1, 2 order by user_id, count(*) desc`,
      [since],
    ),
    rows(`select user_id, client_name, count(*) as n from tool_calls where user_id is not null group by 1, 2`),
    rows(
      `select user_id, ${dayKey("created_at")} as day, count(*) as n from tool_calls where created_at >= $1 group by 1, 2`,
      [since],
    ),
    rows(
      `select t.id, t.brain_slug, t.tool, t.query, t.client_name, t.created_at, t.user_id, u.email
       from tool_calls t left join users u on u.id = t.user_id
       where t.created_at >= $1 and t.query is not null order by t.created_at desc limit 200`,
      [since],
    ),
  ]);

  const days = dayList(start, today);
  const byDay = new Map(daily.map((r) => [r.day, r]));
  const signupsByDay = new Map(signupsDaily.map((r) => [r.day, num(r.n)]));
  const series = days.map((day) => {
    const r = byDay.get(day);
    const active = num(r?.active);
    const returning = num(r?.returning);
    return { day, calls: num(r?.calls), active, returning, fresh: active - returning, signups: signupsByDay.get(day) ?? 0 };
  });

  // Retention: daily cohorts by signup day while the window is short, weekly once it's long.
  const weekly = days.length > 35;
  const bucket = (day: string) => {
    if (!weekly) return day;
    const t = Date.parse(day);
    return isoDay(t - ((new Date(t).getUTCDay() + 6) % 7) * DAY_MS); // Monday of that week
  };
  const unitMs = (weekly ? 7 : 1) * DAY_MS;
  const columns = weekly ? 12 : 14;
  const cohortMap = new Map<string, { size: number; active: number[] }>();
  for (const u of cohortUsers) {
    const key = bucket(u.sd);
    const cohort = cohortMap.get(key) ?? { size: 0, active: Array(columns).fill(0) };
    cohort.size++;
    const offsets = new Set<number>();
    for (const d of u.days as string[]) {
      const offset = Math.floor((Date.parse(d) - Date.parse(key)) / unitMs);
      if (offset >= 0 && offset < columns) offsets.add(offset);
    }
    for (const o of offsets) cohort.active[o]++;
    cohortMap.set(key, cohort);
  }
  const cohorts = [...cohortMap.entries()]
    .sort(([a], [b]) => (a < b ? 1 : -1))
    .map(([start, c]) => {
      const elapsed = Math.floor((Date.parse(today) - Date.parse(start)) / unitMs);
      return { start, size: c.size, cells: c.active.map((n, i) => (i <= elapsed ? n : null)) };
    });

  const installsBySlug = new Map(brainInstalls.map((r) => [r.slug, r]));
  const sparkBySlug = new Map<string, Map<string, number>>();
  const returningBySlug = new Map<string, number>();
  for (const r of brainDaily) {
    if (!sparkBySlug.has(r.slug)) sparkBySlug.set(r.slug, new Map());
    sparkBySlug.get(r.slug)!.set(r.day, num(r.n));
  }
  // Brain-level recurring users: people who used that brain on 2+ different days in the window.
  const brainUserDays = await rows(
    `select brain_slug as slug, count(*) as n from (
       select brain_slug, user_id from tool_calls where created_at >= $1
       group by 1, 2 having count(distinct ${utcDay("created_at")}) > 1) x group by 1`,
    [since],
  );
  for (const r of brainUserDays) returningBySlug.set(r.slug, num(r.n));
  const label = (slug: string) => (slug === "all" ? "All brains (cross-search)" : (brainName(slug) ?? slug));
  const brains = brainRows
    .filter((r) => num(r.calls) > 0)
    .map((r) => ({
      slug: r.slug,
      name: label(r.slug),
      calls: num(r.calls),
      callsPrev: prev ? num(r.calls_prev) : null,
      users: num(r.users),
      returning: returningBySlug.get(r.slug) ?? 0,
      installs: num(installsBySlug.get(r.slug)?.installs),
      installers: num(installsBySlug.get(r.slug)?.installers),
      spark: days.map((d) => sparkBySlug.get(r.slug)?.get(d) ?? 0),
    }))
    .sort((a, b) => b.calls - a.calls || b.users - a.users);

  const families = new Map<string, { calls: number; users: Set<string>; surfaces: Map<string, number> }>();
  for (const r of clientRows) {
    const { family, surface } = clientFamily(r.client_name);
    const f = families.get(family) ?? { calls: 0, users: new Set(), surfaces: new Map() };
    f.calls += num(r.n);
    if (r.user_id) f.users.add(r.user_id);
    if (surface) f.surfaces.set(surface, (f.surfaces.get(surface) ?? 0) + num(r.n));
    families.set(family, f);
  }
  const clients = [...families.entries()]
    .map(([name, f]) => ({
      name,
      calls: f.calls,
      users: f.users.size,
      surfaces: [...f.surfaces.entries()].sort((a, b) => b[1] - a[1]).map(([s, n]) => ({ name: s, calls: n })),
    }))
    .sort((a, b) => b.users - a.users || b.calls - a.calls);

  const topBrain = new Map(userTopBrain.map((r) => [r.user_id, r.brain_slug]));
  const mainClient = new Map<string, { family: string; n: number }>();
  const clientTotals = new Map<string, Map<string, number>>();
  for (const r of userClients) {
    const { family } = clientFamily(r.client_name);
    const m = clientTotals.get(r.user_id) ?? new Map<string, number>();
    m.set(family, (m.get(family) ?? 0) + num(r.n));
    clientTotals.set(r.user_id, m);
  }
  for (const [id, m] of clientTotals) {
    const [family, n] = [...m.entries()].sort((a, b) => b[1] - a[1])[0];
    mainClient.set(id, { family, n });
  }
  const userSpark = new Map<string, Map<string, number>>();
  for (const r of userDaily) {
    if (!userSpark.has(r.user_id)) userSpark.set(r.user_id, new Map());
    userSpark.get(r.user_id)!.set(r.day, num(r.n));
  }
  const users = userRows.map((u) => ({
    id: u.id,
    email: u.email,
    signedUp: u.created_at,
    lastActive: u.last_call,
    calls: num(u.calls),
    days: num(u.days),
    brains: num(u.brains),
    callsTotal: num(u.calls_total),
    daysTotal: num(u.days_total),
    installs: num(u.installs),
    topBrain: topBrain.has(u.id) ? label(topBrain.get(u.id)) : null,
    client: mainClient.get(u.id)?.family ?? null,
    spark: userSpark.has(u.id) ? days.map((d) => userSpark.get(u.id)!.get(d) ?? 0) : null,
  }));

  const withPrev = (key: string) => ({ value: num(kpi[key]), prev: prev ? num(kpi[`${key}_prev`]) : null });
  return {
    range,
    start,
    today,
    generatedAt: new Date().toISOString(),
    kpis: {
      usersTotal: num(kpi.users_total),
      signups: withPrev("signups"),
      active: withPrev("active"),
      returning: withPrev("returning"),
      calls: withPrev("calls"),
      installs: withPrev("installs"),
    },
    funnel: {
      signedUp: num(funnel.signed_up),
      installed: num(funnel.installed),
      called: num(funnel.called),
      returned: num(funnel.returned),
      habit: num(funnel.habit),
    },
    series,
    activeDays: activeDays.map((r) => ({ days: num(r.days), users: num(r.users) })),
    retention: { unit: weekly ? "week" : "day", columns, cohorts },
    brains,
    clients,
    tools: toolRows.map((r) => ({ name: r.tool, calls: num(r.n), users: num(r.users) })),
    users,
    questions: questions.map((q) => ({
      id: q.id,
      at: q.created_at,
      brain: label(q.brain_slug),
      slug: q.brain_slug,
      tool: q.tool,
      query: q.query,
      client: clientFamily(q.client_name).family,
      userId: q.user_id,
      email: q.email,
    })),
  };
}

export async function adminUser(id: string, brainName: (slug: string) => string | null) {
  if (!/^\d{1,18}$/.test(id)) return null;
  const [[user], daily, brains, clients, installs, queries] = await Promise.all([
    rows(`select id, email, created_at, last_seen_at, signup_user_agent from users where id = $1`, [id]),
    rows(`select ${dayKey("created_at")} as day, count(*) as n from tool_calls where user_id = $1 group by 1 order by 1`, [id]),
    rows(
      `select brain_slug as slug, count(*) as n, max(created_at) as last from tool_calls where user_id = $1 group by 1 order by 2 desc`,
      [id],
    ),
    rows(`select client_name, count(*) as n from tool_calls where user_id = $1 group by 1`, [id]),
    rows(`select brain_slug as slug, client, created_at from installs where user_id = $1 order by created_at desc`, [id]),
    rows(
      `select id, brain_slug as slug, tool, query, client_name, created_at from tool_calls
       where user_id = $1 order by created_at desc limit 200`,
      [id],
    ),
  ]);
  if (!user) return null;
  const label = (slug: string) => (slug === "all" ? "All brains (cross-search)" : (brainName(slug) ?? slug));
  const families = new Map<string, number>();
  for (const r of clients) {
    const { family, surface } = clientFamily(r.client_name);
    const key = surface ? `${family} · ${surface}` : family;
    families.set(key, (families.get(key) ?? 0) + num(r.n));
  }
  const signupDay = isoDay(new Date(user.created_at).getTime());
  const byDay = new Map(daily.map((r) => [r.day, num(r.n)]));
  return {
    id: user.id,
    email: user.email,
    signedUp: user.created_at,
    lastSeen: user.last_seen_at,
    userAgent: user.signup_user_agent,
    series: dayList(signupDay, isoDay(Date.now())).map((day) => ({ day, calls: byDay.get(day) ?? 0 })),
    calls: brains.reduce((sum, b) => sum + num(b.n), 0),
    activeDays: daily.length,
    brains: brains.map((b) => ({ slug: b.slug, name: label(b.slug), calls: num(b.n), last: b.last })),
    clients: [...families.entries()].sort((a, b) => b[1] - a[1]).map(([name, calls]) => ({ name, calls })),
    installs: installs.map((i) => ({ brain: label(i.slug), client: i.client, at: i.created_at })),
    queries: queries.map((q) => ({
      id: q.id,
      brain: label(q.slug),
      tool: q.tool,
      query: q.query,
      client: clientFamily(q.client_name).family,
      at: q.created_at,
    })),
  };
}

// @brainsbot on X: the reply bot writes every mention it handles to xbot.mentions in this
// database. One row per tag, with what it decided and what it posted.
const XBOT_REPLIED = ["answered", "unknown_person", "no_material", "chat", "optout_confirmed"];

export async function adminXbot(range: number, brainName: (slug: string) => string | null) {
  // The bot also sees its own posts that name it; those are not tags, so they stay out of every number.
  const [{ ready }] = await rows(`select to_regclass('xbot.mentions') is not null as ready`);
  if (!ready) return { available: false as const };

  const today = isoDay(Date.now());
  const [{ first }] = await rows(`select to_char(${utcDay("min(created_at)")}, 'YYYY-MM-DD') as first from xbot.mentions where status <> 'skipped_self'`);
  const windowStart = range ? isoDay(Date.parse(today) - (range - 1) * DAY_MS) : today;
  const start = first && (!range || first > windowStart) ? first : windowStart;
  const since = new Date(`${start}T00:00:00Z`);
  const prev = range ? new Date(since.getTime() - range * DAY_MS) : null;
  const replied = `status = any($3)`;

  const [[kpi], daily, statuses, brainRows, people, feed, [extra]] = await Promise.all([
    rows(
      `select
         count(*) filter (where created_at >= $1) as mentions,
         count(*) filter (where created_at < $1) as mentions_prev,
         count(*) filter (where created_at >= $1 and ${replied}) as replies,
         count(*) filter (where created_at < $1 and ${replied}) as replies_prev,
         count(*) filter (where created_at >= $1 and status = 'answered') as answered,
         count(distinct author_id) filter (where created_at >= $1) as people,
         count(distinct author_id) filter (where created_at < $1) as people_prev,
         count(*) filter (where created_at >= $1 and status = 'error') as errors,
         percentile_cont(0.5) within group (order by extract(epoch from replied_at - created_at))
           filter (where created_at >= $1 and ${replied} and replied_at is not null) as median_seconds
       from xbot.mentions where status <> 'skipped_self' and created_at >= coalesce($2::timestamptz, $1::timestamptz)`,
      [since, prev, XBOT_REPLIED],
    ),
    rows(
      `select ${dayKey("created_at")} as day, count(*) filter (where status = any($2)) as replied, count(*) as total
       from xbot.mentions where status <> 'skipped_self' and created_at >= $1 group by 1`,
      [since, XBOT_REPLIED],
    ),
    rows(`select status, count(*) as n from xbot.mentions where status <> 'skipped_self' and created_at >= $1 group by 1 order by 2 desc`, [since]),
    rows(
      `select brain_slug as slug, count(*) as asks, count(distinct author_id) as people, max(created_at) as last
       from xbot.mentions where status <> 'skipped_self' and created_at >= $1 and brain_slug is not null group by 1 order by 2 desc, 3 desc limit 50`,
      [since],
    ),
    rows(
      `select max(author_username) as username, count(*) as mentions, count(*) filter (where status = any($2)) as replies,
         count(distinct ${utcDay("created_at")}) as days, max(created_at) as last
       from xbot.mentions where status <> 'skipped_self' and created_at >= $1 group by author_id order by 2 desc, 5 desc limit 12`,
      [since, XBOT_REPLIED],
    ),
    rows(
      `select tweet_id, author_username, text, parent_text, status, brain_slug, reply_text, reply_id, error, created_at, replied_at
       from xbot.mentions where status <> 'skipped_self' and created_at >= $1 order by created_at desc limit 200`,
      [since],
    ),
    rows(
      `select (select count(*) from xbot.optouts) as optouts,
         (select count(*) from (select author_id from xbot.mentions where status <> 'skipped_self' and created_at >= $1 group by 1 having count(*) > 1) x) as repeat_people,
         (select max(created_at) from xbot.mentions where status <> 'skipped_self') as last_mention`,
      [since],
    ),
  ]);

  const byDay = new Map(daily.map((r) => [r.day, r]));
  const withPrev = (key: string) => ({ value: num(kpi[key]), prev: prev ? num(kpi[`${key}_prev`]) : null });
  return {
    available: true as const,
    start,
    kpis: {
      mentions: withPrev("mentions"),
      replies: withPrev("replies"),
      people: withPrev("people"),
      answered: num(kpi.answered),
      errors: num(kpi.errors),
      repeatPeople: num(extra.repeat_people),
      optouts: num(extra.optouts),
      medianSeconds: kpi.median_seconds == null ? null : Math.round(Number(kpi.median_seconds)),
    },
    lastMention: extra.last_mention,
    series: dayList(start, today).map((day) => {
      const r = byDay.get(day);
      return { day, replied: num(r?.replied), other: num(r?.total) - num(r?.replied) };
    }),
    statuses: statuses.map((r) => ({ status: r.status, n: num(r.n), replied: XBOT_REPLIED.includes(r.status) })),
    brains: brainRows.map((r) => ({ slug: r.slug, name: brainName(r.slug) ?? r.slug, asks: num(r.asks), people: num(r.people), last: r.last })),
    people: people.map((r) => ({ username: r.username, mentions: num(r.mentions), replies: num(r.replies), days: num(r.days), last: r.last })),
    mentions: feed.map((m) => ({
      id: m.tweet_id,
      username: m.author_username,
      text: m.text,
      parent: m.parent_text,
      status: m.status,
      replied: XBOT_REPLIED.includes(m.status),
      brain: m.brain_slug ? (brainName(m.brain_slug) ?? m.brain_slug) : null,
      reply: m.reply_text,
      replyId: m.reply_id,
      error: m.error,
      at: m.created_at,
      seconds: m.replied_at ? Math.round((new Date(m.replied_at).getTime() - new Date(m.created_at).getTime()) / 1000) : null,
    })),
  };
}
