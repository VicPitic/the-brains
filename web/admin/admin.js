// The Brains admin dashboard: fetches /admin/api/* and draws everything with plain DOM + SVG.
const $ = (sel, root = document) => root.querySelector(sel);
const SVG_NS = "http://www.w3.org/2000/svg";
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

const state = {
  range: readRange(),
  metric: "calls",
  brainSort: "calls",
  brainLimit: 10,
  segment: "all",
  userSort: { key: "calls", dir: -1 },
  userSearch: "",
  userLimit: 25,
  questionBrain: "",
  questionSearch: "",
  feedLimit: 30,
  data: null,
  xbot: null,
  xbotFilter: "all",
  xbotLimit: 15,
};

// ---------- Small helpers ----------
function el(tag, attrs = {}, ...children) {
  const node = tag.startsWith("svg:") ? document.createElementNS(SVG_NS, tag.slice(4)) : document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === "class") node.setAttribute("class", v);
    else if (k === "text") node.textContent = v;
    else if (k === "style") node.style.cssText = v;
    else if (k.startsWith("on")) node.addEventListener(k.slice(2), v);
    else node.setAttribute(k, v === true ? "" : v);
  }
  for (const child of children.flat()) if (child != null) node.append(child instanceof Node ? child : document.createTextNode(child));
  return node;
}
const nf = new Intl.NumberFormat("en-US");
const fmt = (n) => nf.format(Math.round(n ?? 0));
const pct = (n, d) => (d ? Math.round((n / d) * 100) : 0);
const dayLabel = (iso, opts = { month: "short", day: "numeric" }) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { ...opts, timeZone: "UTC" });
const dateTime = (v) =>
  new Date(v).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit", timeZone: "UTC" }) + " UTC";
function ago(v) {
  if (!v) return "never";
  const s = (Date.now() - new Date(v).getTime()) / 1000;
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  if (s < 86400 * 30) return `${Math.floor(s / 86400)}d ago`;
  return dayLabel(new Date(v).toISOString().slice(0, 10));
}
const hue = (text) => [...text].reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 360, 7);
const avatar = (email, cls = "avatar") => el("span", { class: cls, style: `--h:${hue(email)}`, "aria-hidden": "true", text: email[0] ?? "?" });
const rangeText = () => (state.range ? `last ${state.range} days` : "all time");

function readRange() {
  const q = Number(new URLSearchParams(location.search).get("range"));
  if ([7, 30, 90, 0].includes(q) && new URLSearchParams(location.search).has("range")) return q;
  try {
    const saved = localStorage.getItem("brains.admin.range");
    if (saved !== null && [7, 30, 90, 0].includes(Number(saved))) return Number(saved);
  } catch {}
  return 30;
}

function delta(value, prev) {
  if (prev == null) return null;
  if (prev === 0) return value > 0 ? { text: "new", dir: "up" } : null;
  const change = Math.round(((value - prev) / prev) * 100);
  return { text: `${change > 0 ? "+" : ""}${change}%`, dir: change > 0 ? "up" : change < 0 ? "down" : "flat" };
}
const arrow = (dir) =>
  dir === "flat"
    ? null
    : el(
        "svg:svg",
        { viewBox: "0 0 10 10", "aria-hidden": "true" },
        el("svg:path", { d: dir === "up" ? "M5 1.5 9 7H1z" : "M5 8.5 1 3h8z", fill: "currentColor" }),
      );

function countUp(node, to) {
  if (reduceMotion || to < 4) return void (node.textContent = fmt(to));
  const start = performance.now();
  const from = Number(node.dataset.value ?? 0);
  node.dataset.value = to;
  const tick = (now) => {
    const t = Math.min(1, (now - start) / 650);
    node.textContent = fmt(from + (to - from) * (1 - Math.pow(1 - t, 3)));
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

// ---------- Tooltip ----------
const tip = $("#tip");
function showTip(event, title, rows) {
  tip.replaceChildren(
    el("div", { class: "atip-title", text: title }),
    ...rows.map(([label, value, color]) =>
      el(
        "div",
        { class: "atip-row" },
        el("span", {}, color ? el("i", { style: `background:${color}` }) : null, label),
        el("b", { text: value }),
      ),
    ),
  );
  tip.hidden = false;
  delete tip.dataset.hidden;
  const { innerWidth: w, innerHeight: h } = window;
  const r = tip.getBoundingClientRect();
  const x = event.clientX + 14 + r.width > w - 8 ? event.clientX - r.width - 14 : event.clientX + 14;
  const y = Math.min(h - r.height - 8, Math.max(8, event.clientY - r.height - 10));
  tip.style.left = `${x}px`;
  tip.style.top = `${y}px`;
}
function hideTip() {
  tip.dataset.hidden = "";
}

// ---------- Charts ----------
function niceMax(max) {
  if (max <= 4) return 4;
  const pow = 10 ** Math.floor(Math.log10(max));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * pow).find((s) => max / s <= 4) ?? 10 * pow;
  return Math.ceil(max / step) * step;
}

// Vertical bars per category (days or buckets), optionally stacked. One hover column per x.
function barChart(root, { labels, series, height = 230, tipTitle, xLabel, directLabels = false, grow = true }) {
  const width = Math.max(280, root.clientWidth);
  const pad = { top: directLabels ? 20 : 10, right: 4, bottom: 26, left: 36 };
  const innerW = width - pad.left - pad.right;
  const innerH = height - pad.top - pad.bottom;
  const totals = labels.map((_, i) => series.reduce((sum, s) => sum + s.values[i], 0));
  const max = niceMax(Math.max(0, ...totals));
  const y = (v) => pad.top + innerH - (v / max) * innerH;
  const slot = innerW / labels.length;
  const barW = Math.max(2, Math.min(36, slot * 0.68));
  const svg = el("svg:svg", { viewBox: `0 0 ${width} ${height}`, height, role: "img", class: grow && !reduceMotion ? "bars-grow" : null });

  for (let i = 0; i <= 4; i++) {
    const v = (max / 4) * i;
    const yy = Math.round(y(v)) + 0.5;
    svg.append(el("svg:line", { class: i ? "gridline" : "baseline", x1: pad.left, x2: width - pad.right, y1: yy, y2: yy }));
    svg.append(el("svg:text", { x: pad.left - 8, y: yy + 4, "text-anchor": "end", text: fmt(v) }));
  }
  const every = Math.ceil(labels.length / Math.max(2, Math.floor(innerW / 64)));
  const hovers = [];
  labels.forEach((label, i) => {
    const cx = pad.left + slot * i + slot / 2;
    const hover = el("svg:rect", { class: "col-hover", x: cx - slot / 2, y: pad.top, width: slot, height: innerH, rx: 6 });
    svg.append(hover);
    hovers.push(hover);
    let base = 0;
    series.forEach((s, si) => {
      const v = s.values[i];
      if (!v) return;
      const top = y(base + v);
      const h = Math.max(1.5, y(base) - top - (base > 0 ? 2 : 0)); // 2px surface gap between stacked segments
      const isTop = series.slice(si + 1).every((t) => !t.values[i]);
      const r = Math.min(4, barW / 2, h);
      // Rounded data-end only, square at the baseline.
      const x0 = cx - barW / 2;
      const x1 = cx + barW / 2;
      const yb = top + h;
      const d = isTop
        ? `M${x0},${yb}V${top + r}Q${x0},${top} ${x0 + r},${top}H${x1 - r}Q${x1},${top} ${x1},${top + r}V${yb}Z`
        : `M${x0},${yb}V${top}H${x1}V${yb}Z`;
      svg.append(el("svg:path", { class: `bar ${s.cls ?? ""}`, d, style: grow ? `animation-delay:${Math.min(i * 12, 240)}ms` : null }));
      base += v;
    });
    if (directLabels && totals[i]) svg.append(el("svg:text", { class: "bar-label", x: cx, y: y(totals[i]) - 6, "text-anchor": "middle", text: fmt(totals[i]) }));
    if (i % every === 0 || labels.length <= 8)
      svg.append(el("svg:text", { x: cx, y: height - 8, "text-anchor": "middle", text: xLabel ? xLabel(label) : label }));
  });

  const hit = el("svg:rect", { class: "col-hit", x: pad.left, y: 0, width: innerW, height });
  let active = -1;
  hit.addEventListener("pointermove", (event) => {
    const box = svg.getBoundingClientRect();
    const x = ((event.clientX - box.left) / box.width) * width - pad.left;
    const i = Math.max(0, Math.min(labels.length - 1, Math.floor(x / slot)));
    if (i !== active) {
      hovers[active]?.classList.remove("on");
      hovers[i].classList.add("on");
      active = i;
    }
    const rows = series.map((s) => [s.label, fmt(s.values[i]), series.length > 1 ? s.color : null]);
    if (series.length > 1) rows.push(["Total", fmt(totals[i])]);
    showTip(event, tipTitle(labels[i], i), rows);
  });
  hit.addEventListener("pointerleave", () => {
    hovers[active]?.classList.remove("on");
    active = -1;
    hideTip();
  });
  svg.append(hit);
  root.replaceChildren(svg);
}

function sparkline(values, { width = 74, height = 22 } = {}) {
  const svg = el("svg:svg", { class: "spark", viewBox: `0 0 ${width} ${height}`, width, height, "aria-hidden": "true" });
  if (!values?.length) return svg;
  const max = Math.max(1, ...values);
  const step = values.length > 1 ? width / (values.length - 1) : width;
  const pts = values.map((v, i) => [i * step, height - 2 - (v / max) * (height - 4)]);
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join("");
  svg.append(el("svg:path", { class: "area", d: `${line}L${width},${height}L0,${height}Z` }));
  svg.append(el("svg:path", { class: "line", d: line }));
  return svg;
}

const cssVar = (name) => getComputedStyle(document.body).getPropertyValue(name).trim();

// ---------- Sections ----------
function renderKpis(d) {
  const k = d.kpis;
  const tiles = [
    { label: "Active users", value: k.active.value, prev: k.active.prev, foot: `${pct(k.active.value, k.usersTotal)}% of all users` },
    {
      label: "Recurring users",
      value: k.returning.value,
      prev: k.returning.prev,
      foot: `${pct(k.returning.value, k.active.value)}% of active came back`,
    },
    { label: "Tool calls", value: k.calls.value, prev: k.calls.prev, foot: `${k.active.value ? (k.calls.value / k.active.value).toFixed(1) : 0} per active user` },
    { label: "New signups", value: k.signups.value, prev: k.signups.prev, foot: `${fmt(k.usersTotal)} users total` },
    { label: "Installs", value: k.installs.value, prev: k.installs.prev, foot: "brain connections" },
  ];
  const root = $("#kpis");
  const existing = root.children.length === tiles.length;
  tiles.forEach((t, i) => {
    const node = existing
      ? root.children[i]
      : root.appendChild(
          el("div", { class: "kpi" }, el("div", { class: "kpi-label", text: t.label }), el("div", { class: "kpi-value", text: "0" }), el("div", { class: "kpi-foot" })),
        );
    countUp(node.querySelector(".kpi-value"), t.value);
    const change = delta(t.value, t.prev);
    node.querySelector(".kpi-foot").replaceChildren(
      ...(change ? [el("span", { class: `delta ${change.dir}`, title: `vs previous ${state.range} days` }, arrow(change.dir), change.text)] : []),
      el("span", { text: t.foot }),
    );
  });
}

const METRICS = {
  calls: { title: "Tool calls", sub: "Every search and list call, per day (UTC)" },
  active: { title: "Active users", sub: "People who used a brain that day: new (signed up that day) vs returning" },
  signups: { title: "Signups", sub: "New accounts per day (UTC)" },
};

function renderTrend(grow = true) {
  const d = state.data;
  if (!d) return;
  const m = METRICS[state.metric];
  $("#trend-title").textContent = m.title;
  $("#trend-sub").textContent = m.sub;
  $("#trend-legend").hidden = state.metric !== "active";
  for (const b of $("#trend-tabs").children) b.setAttribute("aria-selected", String(b.dataset.metric === state.metric));
  const labels = d.series.map((s) => s.day);
  const series =
    state.metric === "active"
      ? [
          { label: "New that day", cls: "new", color: cssVar("--series-new"), values: d.series.map((s) => s.fresh) },
          { label: "Returning", color: cssVar("--series"), values: d.series.map((s) => s.returning) },
        ]
      : [{ label: m.title, values: d.series.map((s) => s[state.metric]) }];
  barChart($("#trend"), {
    labels,
    series,
    grow,
    xLabel: (day) => dayLabel(day),
    tipTitle: (day) => dayLabel(day, { weekday: "short", month: "short", day: "numeric" }),
  });
}

function renderFunnel(d) {
  const f = d.funnel;
  $("#funnel-sub").textContent = `People who signed up in the ${rangeText()}`;
  const steps = [
    ["Signed up", f.signedUp, "entered their email"],
    ["Installed a brain", f.installed, "connected a client"],
    ["Used a brain", f.called, "made a tool call"],
    ["Came back", f.returned, "on a later day"],
    ["Habit", f.habit, "3+ active days"],
  ];
  const root = $("#funnel");
  if (!f.signedUp) return void root.replaceChildren(el("div", { class: "chart-empty", text: "No signups in this window yet." }));
  root.replaceChildren(
    ...steps.map(([name, n, note], i) => {
      const fill = el("div", { class: "fill", style: "transform:scaleX(0)" });
      requestAnimationFrame(() => requestAnimationFrame(() => (fill.style.transform = `scaleX(${n / f.signedUp})`)));
      return el(
        "div",
        { class: "step" },
        el("div", { class: "step-name" }, name, el("small", { text: note })),
        el("div", { class: "step-num" }, fmt(n), i ? el("span", { text: `${pct(n, f.signedUp)}%` }) : null),
        el("div", { class: "track" }, fill),
      );
    }),
  );
}

function renderFrequency(d) {
  const buckets = [
    ["1 day", (n) => n === 1],
    ["2 days", (n) => n === 2],
    ["3 days", (n) => n === 3],
    ["4–6 days", (n) => n >= 4 && n <= 6],
    ["7+ days", (n) => n >= 7],
  ];
  const values = buckets.map(([, test]) => d.activeDays.filter((r) => test(r.days)).reduce((s, r) => s + r.users, 0));
  const total = values.reduce((a, b) => a + b, 0);
  if (!total) return void $("#frequency").replaceChildren(el("div", { class: "chart-empty", text: "Nobody used a brain in this window." }));
  barChart($("#frequency"), {
    labels: buckets.map(([l]) => l),
    series: [{ label: "Users", values }],
    height: 214,
    directLabels: true,
    tipTitle: (label, i) => `Active ${label} · ${pct(values[i], total)}% of active users`,
  });
}

function renderCohorts(d) {
  const { unit, columns, cohorts } = d.retention;
  $("#cohort-sub").textContent = `Share of each ${unit === "week" ? "weekly" : "daily"} signup cohort that used a brain N ${unit}s later`;
  const root = $("#cohorts");
  if (!cohorts.length) return void root.replaceChildren(el("div", { class: "chart-empty", text: "No signups in this window yet." }));
  const head = el(
    "tr",
    {},
    el("th", { text: "Cohort" }),
    ...Array.from({ length: columns }, (_, i) => el("th", { text: `${unit === "week" ? "W" : "D"}${i}` })),
  );
  const body = cohorts.map((c) =>
    el(
      "tr",
      {},
      el(
        "td",
        { class: "c-label" },
        unit === "week" ? `Week of ${dayLabel(c.start)}` : dayLabel(c.start, { weekday: "short", month: "short", day: "numeric" }),
        el("small", { text: `${fmt(c.size)} ${c.size === 1 ? "user" : "users"}` }),
      ),
      ...c.cells.map((n, i) => {
        if (n == null) return el("td", { class: "cell future", "aria-label": "Not yet" });
        const share = c.size ? n / c.size : 0;
        const cell = el("td", { class: "cell", style: `--v:${share.toFixed(3)}`, text: `${Math.round(share * 100)}%` });
        cell.addEventListener("pointermove", (e) =>
          showTip(e, `${unit === "week" ? "Week" : "Day"} ${i} after signup`, [
            ["Active", `${fmt(n)} of ${fmt(c.size)}`],
            ["Retention", `${Math.round(share * 100)}%`],
          ]),
        );
        cell.addEventListener("pointerleave", hideTip);
        return cell;
      }),
    ),
  );
  root.replaceChildren(el("table", { class: "cohort" }, el("thead", {}, head), el("tbody", {}, body)));
}

function renderBrains() {
  const d = state.data;
  const key = state.brainSort;
  for (const b of $("#brain-sort").children) b.setAttribute("aria-selected", String(b.dataset.sort === key));
  const list = [...d.brains].sort((a, b) => b[key] - a[key] || b.calls - a.calls);
  const max = Math.max(1, ...list.map((b) => b[key]));
  const root = $("#brain-list");
  if (!list.length) {
    root.replaceChildren(el("div", { class: "chart-empty", text: "No brain was used in this window." }));
    $("#brain-more").hidden = true;
    return;
  }
  const shown = list.slice(0, state.brainLimit);
  root.replaceChildren(
    el(
      "div",
      { class: "lb-head" },
      el("span", { text: "#" }),
      el("span", { text: "Brain" }),
      el("span", { text: `Trend` }),
      el("span", { text: "Calls" }),
      el("span", { text: "Users" }),
      el("span", { text: "Recurring" }),
    ),
    ...shown.map((b, i) => {
      const change = delta(b.calls, b.callsPrev);
      const row = el(
        "div",
        { class: "lb-row", style: "--share:0" },
        el("span", { class: "pos", text: String(i + 1) }),
        el(
          "span",
          { class: "name" },
          b.slug === "all" ? el("strong", { text: b.name }) : el("a", { href: `/${b.slug}`, target: "_blank", rel: "noopener", text: b.name }),
          el("small", {}, `${fmt(b.installers)} installed`, change ? " · " : "", change ? el("span", { class: `trend ${change.dir}`, text: change.text }) : null),
        ),
        sparkline(b.spark),
        el("span", { class: "n", text: fmt(b.calls) }),
        el("span", { class: "n", text: fmt(b.users) }),
        el("span", { class: "n muted", text: fmt(b.returning) }),
      );
      row.addEventListener("pointermove", (e) =>
        showTip(e, b.name, [
          ["Tool calls", fmt(b.calls)],
          ["Users", fmt(b.users)],
          ["Used it on 2+ days", fmt(b.returning)],
          ["Installs in window", fmt(b.installs)],
          ["Installed all time", fmt(b.installers)],
        ]),
      );
      row.addEventListener("pointerleave", hideTip);
      requestAnimationFrame(() => requestAnimationFrame(() => row.style.setProperty("--share", (b[key] / max).toFixed(3))));
      return row;
    }),
  );
  const more = $("#brain-more");
  more.hidden = list.length <= 10;
  more.textContent = state.brainLimit < list.length ? `Show all ${list.length} brains` : "Show top 10";
}

function renderClients(d) {
  const root = $("#client-list");
  root.classList.add("clients");
  const max = Math.max(1, ...d.clients.map((c) => c.users));
  const totalUsers = d.kpis.active.value || 1;
  if (!d.clients.length) return void root.replaceChildren(el("div", { class: "chart-empty", text: "No client activity in this window." }));
  root.replaceChildren(
    el("div", { class: "lb-head" }, el("span", { text: "Client" }), el("span", { text: "Users" }), el("span", { text: "Calls" })),
    ...d.clients.map((c) => {
      const surfaces = c.surfaces
        .slice(0, 3)
        .map((s) => `${s.name} ${pct(s.calls, c.calls)}%`)
        .join(" · ");
      const row = el(
        "div",
        { class: "lb-row", style: "--share:0" },
        el("span", { class: "name" }, el("strong", { text: c.name }), el("small", { text: surfaces || `${pct(c.users, totalUsers)}% of active users` })),
        el("span", { class: "n", text: fmt(c.users) }),
        el("span", { class: "n muted", text: fmt(c.calls) }),
      );
      row.addEventListener("pointermove", (e) =>
        showTip(e, c.name, [
          ["Users", fmt(c.users)],
          ["Share of active users", `${pct(c.users, totalUsers)}%`],
          ["Tool calls", fmt(c.calls)],
          ...c.surfaces.map((s) => [s.name, fmt(s.calls)]),
        ]),
      );
      row.addEventListener("pointerleave", hideTip);
      requestAnimationFrame(() => requestAnimationFrame(() => row.style.setProperty("--share", (c.users / max).toFixed(3))));
      return row;
    }),
  );
  $("#tool-list").replaceChildren(
    ...d.tools.map((t) => el("span", { class: "tool", title: `${fmt(t.users)} users` }, el("code", { text: t.name }), el("b", { text: fmt(t.calls) }))),
  );
}

const SEGMENTS = {
  all: () => true,
  active: (u) => u.calls > 0,
  returning: (u) => u.daysTotal > 1,
  dormant: (u) => u.callsTotal === 0,
};

function renderUsers() {
  const d = state.data;
  $("#users-sub").textContent = `${fmt(d.users.length)} people signed up. Usage columns cover the ${rangeText()}.`;
  for (const b of $("#segments").children) {
    const seg = b.dataset.seg;
    b.setAttribute("aria-checked", String(seg === state.segment));
    b.replaceChildren(b.dataset.label ?? (b.dataset.label = b.textContent), el("span", { class: "count", text: fmt(d.users.filter(SEGMENTS[seg]).length) }));
  }
  const q = state.userSearch.trim().toLowerCase();
  const { key, dir } = state.userSort;
  const value = (u) => (key === "lastActive" || key === "signedUp" ? (u[key] ? Date.parse(u[key]) : 0) : u[key] ?? "");
  const list = d.users
    .filter(SEGMENTS[state.segment])
    .filter((u) => !q || u.email.toLowerCase().includes(q))
    .sort((a, b) => {
      const va = value(a);
      const vb = value(b);
      const c = typeof va === "string" ? va.localeCompare(vb) : va - vb;
      return c * dir || b.callsTotal - a.callsTotal;
    });
  for (const th of $("#user-table thead").querySelectorAll("th")) {
    if (th.dataset.key === key) th.setAttribute("aria-sort", dir > 0 ? "ascending" : "descending");
    else th.removeAttribute("aria-sort");
  }
  const tbody = $("#user-table tbody");
  if (!list.length) {
    tbody.replaceChildren(el("tr", { class: "empty-row" }, el("td", { colspan: 9, text: q ? `No user matches “${state.userSearch}”.` : "Nobody in this segment yet." })));
    $("#user-more").hidden = true;
    return;
  }
  tbody.replaceChildren(
    ...list.slice(0, state.userLimit).map((u) =>
      el(
        "tr",
        { tabindex: 0, "data-id": u.id, "aria-label": `Open ${u.email}` },
        el("td", {}, el("div", { class: "usr" }, avatar(u.email), el("span", { text: u.email }))),
        el("td", { class: "num", title: `${fmt(u.callsTotal)} all time` }, fmt(u.calls)),
        el("td", { class: "num", title: `${fmt(u.daysTotal)} all time` }, u.daysTotal > 1 && u.days ? el("span", { class: "pill pink", text: fmt(u.days) }) : fmt(u.days)),
        el("td", { class: "num" }, fmt(u.brains)),
        el("td", { class: "hide-sm" }, sparkline(u.spark, { width: 96 })),
        el("td", { class: "hide-sm dim", text: u.topBrain ?? "—" }),
        el("td", { class: "hide-sm" }, u.client ? el("span", { class: "pill", text: u.client }) : el("span", { class: "dim", text: "—" })),
        el("td", { class: "num dim", title: u.lastActive ? dateTime(u.lastActive) : "" }, ago(u.lastActive)),
        el("td", { class: "num dim hide-sm", title: dateTime(u.signedUp) }, dayLabel(new Date(u.signedUp).toISOString().slice(0, 10))),
      ),
    ),
  );
  const more = $("#user-more");
  more.hidden = list.length <= state.userLimit;
  more.textContent = `Show more (${fmt(list.length - state.userLimit)} left)`;
}

function highlight(text, q) {
  if (!q) return [text];
  const out = [];
  const lower = text.toLowerCase();
  let i = 0;
  for (let at = lower.indexOf(q); at !== -1; at = lower.indexOf(q, i)) {
    out.push(text.slice(i, at), el("mark", { text: text.slice(at, at + q.length) }));
    i = at + q.length;
  }
  out.push(text.slice(i));
  return out;
}

function questionItem(q, { withUser = true } = {}, search = "") {
  return el(
    "li",
    { class: "q" },
    el("div", { class: "q-text" }, highlight(q.query, search)),
    el("time", { class: "q-time", datetime: q.at, title: dateTime(q.at), text: ago(q.at) }),
    el(
      "div",
      { class: "q-meta" },
      el("span", { text: q.brain }),
      el("span", { text: q.client }),
      withUser && q.email ? el("button", { type: "button", "data-user": q.userId, text: q.email }) : null,
    ),
  );
}

function renderFeed() {
  const d = state.data;
  const select = $("#question-brain");
  const brains = [...new Set(d.questions.map((q) => q.brain))].sort();
  if (state.questionBrain && !brains.includes(state.questionBrain)) state.questionBrain = "";
  select.replaceChildren(
    el("option", { value: "", text: `All brains (${fmt(d.questions.length)})` }),
    ...brains.map((b) => el("option", { value: b, text: b, selected: b === state.questionBrain })),
  );
  const s = state.questionSearch.trim().toLowerCase();
  const list = d.questions.filter((q) => (!state.questionBrain || q.brain === state.questionBrain) && (!s || q.query.toLowerCase().includes(s)));
  const root = $("#feed");
  root.replaceChildren(
    ...(list.length
      ? list.slice(0, state.feedLimit).map((q) => questionItem(q, {}, s))
      : [el("li", { class: "chart-empty", text: s ? `No question mentions “${state.questionSearch}”.` : "No questions in this window yet." })]),
  );
  const more = $("#feed-more");
  more.hidden = list.length <= state.feedLimit;
  more.textContent = `Show more (${fmt(list.length - state.feedLimit)} left)`;
}

// ---------- @brainsbot on X ----------
// Every status the bot records, in words. `quiet` ones are deliberate non-replies.
const XBOT_STATUS = {
  answered: "Answered from a brain",
  chat: "Banter reply",
  unknown_person: "Asked about someone we don't have",
  no_material: "Brain had nothing on it",
  optout_confirmed: "Opt-out confirmed",
  ignored: "Not a request",
  skipped_self: "Its own post",
  skipped_repost: "Repost",
  skipped_optout: "Author opted out",
  capped_daily: "Daily cap reached",
  capped_user: "Per-person cap reached",
  capped_conversation: "Thread cap reached",
  pending: "In progress",
  error: "Failed",
};
const xbotLabel = (status) => XBOT_STATUS[status] ?? status.replace(/_/g, " ");
const duration = (s) => (s == null ? "—" : s < 90 ? `${s}s` : s < 5400 ? `${Math.round(s / 60)}m` : `${Math.round(s / 3600)}h`);
const XBOT_FILTERS = {
  all: () => true,
  replied: (m) => m.replied,
  quiet: (m) => !m.replied && m.status !== "error",
  error: (m) => m.status === "error",
};

function renderXbot() {
  const x = state.xbot;
  const body = $("#xbot-body");
  const sub = $("#xbot-sub");
  if (!x || x.failed || !x.available) {
    sub.textContent = x?.failed ? "Couldn't load the bot's numbers. Try refresh." : "The bot hasn't written to this database yet.";
    body.hidden = true;
    return;
  }
  body.hidden = false;
  const k = x.kpis;
  const when = state.range ? `in the last ${state.range} days` : "since launch";
  sub.textContent = k.mentions.value
    ? `People who tagged the bot ${when} · last tag ${ago(x.lastMention)}`
    : `Nobody tagged the bot ${when}${x.lastMention ? ` · last tag ${ago(x.lastMention)}` : ""}`;

  const tiles = [
    { label: "Mentions", value: k.mentions.value, prev: k.mentions.prev, foot: "tags under a post" },
    { label: "Replies sent", value: k.replies.value, prev: k.replies.prev, foot: `${pct(k.replies.value, k.mentions.value)}% of mentions` },
    { label: "Answered from a brain", value: k.answered, foot: `${pct(k.answered, k.replies.value)}% of replies` },
    { label: "People", value: k.people.value, prev: k.people.prev, foot: `${fmt(k.repeatPeople)} tagged it again` },
    { label: "Median time to reply", text: duration(k.medianSeconds), foot: k.errors ? `${fmt(k.errors)} failed` : `${fmt(k.optouts)} opted out` },
  ];
  const root = $("#xbot-kpis");
  const existing = root.children.length === tiles.length;
  tiles.forEach((t, i) => {
    const node = existing
      ? root.children[i]
      : root.appendChild(
          el("div", { class: "kpi" }, el("div", { class: "kpi-label", text: t.label }), el("div", { class: "kpi-value", text: "0" }), el("div", { class: "kpi-foot" })),
        );
    if (t.text != null) node.querySelector(".kpi-value").textContent = t.text;
    else countUp(node.querySelector(".kpi-value"), t.value);
    const change = delta(t.value, t.prev);
    node.querySelector(".kpi-foot").replaceChildren(
      ...(change ? [el("span", { class: `delta ${change.dir}`, title: `vs previous ${state.range} days` }, arrow(change.dir), change.text)] : []),
      el("span", { text: t.foot }),
    );
  });

  renderXbotTrend();

  const list = (id, items, head, empty, rowOf) => {
    const node = $(id);
    if (!items.length) return void node.replaceChildren(el("div", { class: "chart-empty xb-empty", text: empty }));
    const max = Math.max(1, ...items.map((it) => rowOf(it).share));
    node.replaceChildren(
      el("div", { class: "lb-head" }, ...head.map((h) => el("span", { text: h }))),
      ...items.map((it) => {
        const r = rowOf(it);
        const row = el(
          "div",
          { class: "lb-row", style: "--share:0" },
          el("span", { class: "name" }, r.href ? el("a", { href: r.href, target: "_blank", rel: "noopener", text: r.name }) : el("strong", { text: r.name }), el("small", { text: r.note })),
          el("span", { class: "n", text: r.a }),
          el("span", { class: "n muted", text: r.b }),
        );
        requestAnimationFrame(() => requestAnimationFrame(() => row.style.setProperty("--share", (r.share / max).toFixed(3))));
        return row;
      }),
    );
  };
  list("#xbot-brains", x.brains.slice(0, 8), ["Brain", "Asks", "People"], "No brain was asked for in this window.", (b) => ({
    name: b.name,
    href: `/${b.slug}`,
    note: `last asked ${ago(b.last)}`,
    a: fmt(b.asks),
    b: fmt(b.people),
    share: b.asks,
  }));
  list("#xbot-outcomes", x.statuses, ["Outcome", "Mentions", "Share"], "Nothing handled in this window.", (s) => ({
    name: xbotLabel(s.status),
    note: s.status === "error" ? "nothing was posted" : s.replied ? "replied" : "no reply, on purpose",
    a: fmt(s.n),
    b: `${pct(s.n, k.mentions.value)}%`,
    share: s.n,
  }));
  $("#xbot-people").replaceChildren(
    ...(x.people.length
      ? x.people.map((p) =>
          el(
            "a",
            { class: "tool xb-person", href: `https://x.com/${encodeURIComponent(p.username ?? "")}`, target: "_blank", rel: "noopener", title: `${fmt(p.replies)} replies · last tag ${ago(p.last)}` },
            el("span", { text: `@${p.username ?? "unknown"}` }),
            el("b", { text: fmt(p.mentions) }),
          ),
        )
      : [el("span", { class: "card-sub", text: "Nobody yet." })]),
  );
  renderXbotFeed();
}

function renderXbotTrend(grow = true) {
  const x = state.xbot;
  if (!x?.available) return;
  const root = $("#xbot-trend");
  if (!x.kpis.mentions.value) return void root.replaceChildren(el("div", { class: "chart-empty", text: "No tags in this window. The first one shows up here within a minute." }));
  barChart(root, {
    labels: x.series.map((s) => s.day),
    series: [
      { label: "Replied", color: cssVar("--series"), values: x.series.map((s) => s.replied) },
      { label: "No reply", cls: "new", color: cssVar("--series-new"), values: x.series.map((s) => s.other) },
    ],
    height: 200,
    grow,
    xLabel: (day) => dayLabel(day),
    tipTitle: (day) => dayLabel(day, { weekday: "short", month: "short", day: "numeric" }),
  });
}

function mentionItem(m) {
  const asked = m.text.replace(/^(\s*@\w+)+\s*/, "") || m.text;
  const tone = m.status === "error" ? "bad" : m.replied ? "pink" : "";
  return el(
    "li",
    { class: "q xb-item" },
    el("div", { class: "q-text", text: asked }),
    el("time", { class: "q-time", datetime: m.at, title: dateTime(m.at), text: ago(m.at) }),
    el(
      "div",
      { class: "q-meta" },
      el("a", { href: `https://x.com/i/status/${m.id}`, target: "_blank", rel: "noopener", text: `@${m.username ?? "unknown"}` }),
      el("span", { class: `pill ${tone}`, text: xbotLabel(m.status) }),
      m.brain ? el("span", { text: m.brain }) : null,
      m.replied && m.seconds != null ? el("span", { text: `replied in ${duration(m.seconds)}` }) : null,
    ),
    m.parent ? el("p", { class: "xb-parent", text: m.parent }) : null,
    m.reply
      ? el(
          "p",
          { class: "xb-reply" },
          m.reply,
          m.replyId ? el("a", { href: `https://x.com/i/status/${m.replyId}`, target: "_blank", rel: "noopener", text: "View reply" }) : null,
        )
      : null,
    m.error ? el("p", { class: "xb-reply xb-error", text: m.error }) : null,
  );
}

function renderXbotFeed() {
  const x = state.xbot;
  if (!x?.available) return;
  for (const b of $("#xbot-filter").children) {
    const f = b.dataset.f;
    b.setAttribute("aria-checked", String(f === state.xbotFilter));
    b.replaceChildren(b.dataset.label ?? (b.dataset.label = b.textContent), el("span", { class: "count", text: fmt(x.mentions.filter(XBOT_FILTERS[f]).length) }));
  }
  const list = x.mentions.filter(XBOT_FILTERS[state.xbotFilter]);
  $("#xbot-feed").replaceChildren(
    ...(list.length
      ? list.slice(0, state.xbotLimit).map(mentionItem)
      : [el("li", { class: "chart-empty xb-empty", text: state.xbotFilter === "all" ? "No tags in this window yet." : "Nothing here in this window." })]),
  );
  const more = $("#xbot-more");
  more.hidden = list.length <= state.xbotLimit;
  more.textContent = `Show more (${fmt(list.length - state.xbotLimit)} left)`;
}

// ---------- Data ----------
let loadToken = 0;
async function load({ first = false } = {}) {
  const token = ++loadToken;
  const board = $("#board");
  if (!first) board.classList.add("is-loading");
  for (const b of $("#range").children) b.setAttribute("aria-checked", String(Number(b.dataset.range) === state.range));
  try {
    // The bot's numbers ride along; if they fail, the rest of the dashboard still loads.
    const xbot = fetch(`/admin/api/xbot?range=${state.range}`, { headers: { accept: "application/json" } })
      .then((r) => (r.ok ? r.json() : { failed: true }))
      .catch(() => ({ failed: true }));
    const res = await fetch(`/admin/api/overview?range=${state.range}`, { headers: { accept: "application/json" } });
    if (!res.ok) throw new Error(`The dashboard API answered ${res.status}.`);
    const data = await res.json();
    if (token !== loadToken) return;
    state.data = data;
    $("#error").hidden = true;
    $("#stamp").textContent = `${state.range ? `Last ${state.range} days` : "All time"} · ${dayLabel(data.start)} to ${dayLabel(data.today)} (UTC) · updated ${new Date(
      data.generatedAt,
    ).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}`;
    if (first) board.classList.add("is-first");
    renderKpis(data);
    renderTrend();
    renderFunnel(data);
    renderFrequency(data);
    renderCohorts(data);
    renderBrains();
    renderClients(data);
    renderUsers();
    renderFeed();
    state.xbot = await xbot;
    if (token === loadToken) renderXbot();
  } catch (error) {
    if (token !== loadToken) return;
    const box = $("#error");
    box.hidden = false;
    box.textContent = `Couldn't load the numbers. ${error.message} Try refresh.`;
  } finally {
    if (token === loadToken) board.classList.remove("is-loading");
  }
}

// ---------- User drawer ----------
const drawer = $("#drawer");
const backdrop = $("#backdrop");
let lastFocus = null;
let drawerToken = 0;

async function openUser(id) {
  const token = ++drawerToken;
  const known = state.data?.users.find((u) => u.id === String(id));
  lastFocus = document.activeElement;
  $("#drawer-title").textContent = known?.email ?? "Loading…";
  $("#drawer-avatar").textContent = known?.email?.[0] ?? "";
  $("#drawer-avatar").style.setProperty("--h", hue(known?.email ?? ""));
  $("#drawer-sub").textContent = "";
  const body = $("#drawer-body");
  body.classList.add("loading");
  if (drawer.hidden) {
    drawer.hidden = false;
    backdrop.hidden = false;
    drawer.classList.remove("closing");
    requestAnimationFrame(() => {
      drawer.classList.add("open");
      backdrop.classList.add("open");
    });
    document.body.style.overflow = "hidden";
  }
  $("#drawer-close").focus({ preventScroll: true });
  history.replaceState(null, "", `#user=${id}`);
  try {
    const res = await fetch(`/admin/api/users/${encodeURIComponent(id)}`);
    if (!res.ok) throw new Error(res.status === 404 ? "This user no longer exists." : `The API answered ${res.status}.`);
    const u = await res.json();
    if (token !== drawerToken) return;
    renderUser(u);
  } catch (error) {
    if (token !== drawerToken) return;
    body.replaceChildren(el("div", { class: "adm-error", text: error.message }));
  } finally {
    if (token === drawerToken) body.classList.remove("loading");
  }
}

function renderUser(u) {
  $("#drawer-title").textContent = u.email;
  $("#drawer-avatar").textContent = u.email[0];
  $("#drawer-avatar").style.setProperty("--h", hue(u.email));
  const last = u.queries[0]?.at;
  $("#drawer-sub").textContent = `Signed up ${ago(u.signedUp)} · last active ${ago(last)}`;
  const chart = el("div", { class: "chart" });
  const maxBrain = Math.max(1, ...u.brains.map((b) => b.calls));
  const maxClient = Math.max(1, ...u.clients.map((c) => c.calls));
  const section = (title, ...children) => el("section", { class: "drawer-section" }, el("h3", { text: title }), ...children);
  const bars = (items, max, sub) =>
    el(
      "div",
      { class: "lb clients" },
      ...items.map((b) =>
        el(
          "div",
          { class: "lb-row", style: `--share:${(b.calls / max).toFixed(3)}` },
          el("span", { class: "name" }, el("strong", { text: b.name }), sub ? el("small", { text: sub(b) }) : null),
          el("span", { class: "n muted", text: `${pct(b.calls, u.calls)}%` }),
          el("span", { class: "n", text: fmt(b.calls) }),
        ),
      ),
    );
  $("#drawer-body").replaceChildren(
    el(
      "div",
      { class: "stat-row" },
      el("div", {}, el("b", { text: fmt(u.calls) }), el("span", { text: "tool calls" })),
      el("div", {}, el("b", { text: fmt(u.activeDays) }), el("span", { text: "active days" })),
      el("div", {}, el("b", { text: fmt(u.brains.length) }), el("span", { text: "brains used" })),
      el("div", {}, el("b", { text: fmt(u.installs.length) }), el("span", { text: "installs" })),
    ),
    section("Activity since signup", chart),
    u.brains.length ? section("Brains", bars(u.brains, maxBrain, (b) => `last used ${ago(b.last)}`)) : null,
    u.clients.length ? section("Clients", bars(u.clients, maxClient)) : null,
    section(
      "Account",
      el(
        "dl",
        { class: "kv" },
        el("dt", { text: "Email" }),
        el("dd", {}, el("a", { href: `mailto:${u.email}`, text: u.email })),
        el("dt", { text: "Signed up" }),
        el("dd", { text: dateTime(u.signedUp) }),
        el("dt", { text: "Last sign-in" }),
        el("dd", { text: dateTime(u.lastSeen) }),
        el("dt", { text: "Installs" }),
        el("dd", { text: u.installs.length ? u.installs.map((i) => `${i.brain} (${i.client ?? "unknown client"})`).join(", ") : "None" }),
        u.userAgent ? el("dt", { text: "Signup browser" }) : null,
        u.userAgent ? el("dd", { text: u.userAgent }) : null,
      ),
    ),
    section(
      `Questions (${fmt(u.queries.filter((q) => q.query).length)})`,
      el(
        "ol",
        { class: "feed" },
        ...(u.queries.some((q) => q.query)
          ? u.queries.filter((q) => q.query).map((q) => questionItem(q, { withUser: false }))
          : [el("li", { class: "chart-empty", text: "No searches yet." })]),
      ),
    ),
  );
  barChart(chart, {
    labels: u.series.map((s) => s.day),
    series: [{ label: "Tool calls", values: u.series.map((s) => s.calls) }],
    height: 150,
    xLabel: (day) => dayLabel(day),
    tipTitle: (day) => dayLabel(day, { weekday: "short", month: "short", day: "numeric" }),
  });
}

function closeUser() {
  if (drawer.hidden) return;
  drawerToken++;
  drawer.classList.add("closing");
  drawer.classList.remove("open");
  backdrop.classList.remove("open");
  document.body.style.overflow = "";
  history.replaceState(null, "", location.pathname + location.search);
  setTimeout(() => {
    if (drawer.classList.contains("open")) return;
    drawer.hidden = true;
    backdrop.hidden = true;
  }, 240);
  lastFocus?.focus?.({ preventScroll: true });
}

// ---------- Wiring ----------
$("#range").addEventListener("click", (e) => {
  const b = e.target.closest("button[data-range]");
  if (!b || Number(b.dataset.range) === state.range) return;
  state.range = Number(b.dataset.range);
  try {
    localStorage.setItem("brains.admin.range", String(state.range));
  } catch {}
  const url = new URL(location.href);
  url.searchParams.set("range", String(state.range));
  history.replaceState(null, "", url);
  load();
});
$("#refresh").addEventListener("click", (e) => {
  const b = e.currentTarget;
  b.classList.remove("spin");
  void b.offsetWidth;
  b.classList.add("spin");
  load();
});
$("#trend-tabs").addEventListener("click", (e) => {
  const b = e.target.closest("button[data-metric]");
  if (!b || b.dataset.metric === state.metric) return;
  state.metric = b.dataset.metric;
  renderTrend();
});
$("#brain-sort").addEventListener("click", (e) => {
  const b = e.target.closest("button[data-sort]");
  if (!b) return;
  state.brainSort = b.dataset.sort;
  renderBrains();
});
$("#brain-more").addEventListener("click", () => {
  state.brainLimit = state.brainLimit > 10 ? 10 : Infinity;
  renderBrains();
});
$("#segments").addEventListener("click", (e) => {
  const b = e.target.closest("button[data-seg]");
  if (!b) return;
  state.segment = b.dataset.seg;
  state.userLimit = 25;
  renderUsers();
});
$("#user-search").addEventListener("input", (e) => {
  state.userSearch = e.target.value;
  state.userLimit = 25;
  renderUsers();
});
$("#user-table thead").addEventListener("click", (e) => {
  const th = e.target.closest("th[data-key]");
  if (!th) return;
  const key = th.dataset.key;
  const textual = key === "email" || key === "topBrain" || key === "client";
  state.userSort = state.userSort.key === key ? { key, dir: -state.userSort.dir } : { key, dir: textual ? 1 : -1 };
  renderUsers();
});
$("#user-more").addEventListener("click", () => {
  state.userLimit += 50;
  renderUsers();
});
$("#user-table tbody").addEventListener("click", (e) => {
  const tr = e.target.closest("tr[data-id]");
  if (tr) openUser(tr.dataset.id);
});
$("#user-table tbody").addEventListener("keydown", (e) => {
  const tr = e.target.closest("tr[data-id]");
  if (tr && (e.key === "Enter" || e.key === " ")) {
    e.preventDefault();
    openUser(tr.dataset.id);
  }
});
$("#question-brain").addEventListener("change", (e) => {
  state.questionBrain = e.target.value;
  state.feedLimit = 30;
  renderFeed();
});
$("#question-search").addEventListener("input", (e) => {
  state.questionSearch = e.target.value;
  state.feedLimit = 30;
  renderFeed();
});
$("#feed-more").addEventListener("click", () => {
  state.feedLimit += 50;
  renderFeed();
});
$("#xbot-filter").addEventListener("click", (e) => {
  const b = e.target.closest("button[data-f]");
  if (!b) return;
  state.xbotFilter = b.dataset.f;
  state.xbotLimit = 15;
  renderXbotFeed();
});
$("#xbot-more").addEventListener("click", () => {
  state.xbotLimit += 30;
  renderXbotFeed();
});
document.addEventListener("click", (e) => {
  const b = e.target.closest("button[data-user]");
  if (b) openUser(b.dataset.user);
});
$("#drawer-close").addEventListener("click", closeUser);
backdrop.addEventListener("click", closeUser);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !drawer.hidden) closeUser();
  if (e.key === "Tab" && !drawer.hidden) {
    const focusable = [...drawer.querySelectorAll("a[href], button, [tabindex='0']")].filter((n) => n.offsetParent);
    const first = focusable[0];
    const last = focusable.at(-1);
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});

// Redraw width-dependent charts without replaying their entrance.
let resizeTimer = 0;
let lastWidth = $("#trend").clientWidth;
new ResizeObserver(() => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    const w = $("#trend").clientWidth;
    if (!state.data || w === lastWidth) return;
    lastWidth = w;
    renderTrend(false);
    renderFrequency(state.data);
    renderXbotTrend(false);
  }, 120);
}).observe($("#board"));

load({ first: true });
const deepLink = location.hash.match(/^#user=(\d+)$/);
if (deepLink) openUser(deepLink[1]);
