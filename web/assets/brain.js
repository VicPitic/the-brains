// Brain detail page: identity + receipts on the left, install always within reach on the right
// (a bottom sheet on mobile). Citation pills deep-link to rows in the sources index.
import {
  REDUCED_MOTION,
  TYPE_META,
  bindTips,
  fmtCompact,
  fmtDate,
  fmtDuration,
  h,
  highlight,
  icon,
  isPostType,
  mountChrome,
  mountInstall,
  plural,
  portrait,
  possessive,
  wireTablist,
} from "./shared.js";

const CATEGORIES = {
  "indie-hackers": "Indie hackers",
  "ai-builders": "AI builders",
  ceos: "CEOs",
  investors: "Investors",
  marketers: "Marketers",
  operators: "Operators",
  health: "Health",
  thinkers: "Thinkers",
};
const TYPE_ORDER = ["youtube", "podcast", "essay", "x_article", "x_post", "linkedin_post"];
const INITIAL_ROWS = 60;

mountChrome();
const main = document.getElementById("main");
const slug = decodeURIComponent(location.pathname.split("/")[1] ?? "");

let brain;
let sourceById = new Map();
const citeNumber = new Map();
const src = { type: "all", q: "", expanded: false };

/* ---------- Citations ---------- */
function cite(id) {
  const s = sourceById.get(id);
  if (!s) return null;
  if (!citeNumber.has(id)) citeNumber.set(id, citeNumber.size + 1);
  const n = citeNumber.get(id);
  return h("a", { class: "cite", href: `#s-${id}`, dataset: { source: id }, "aria-label": `Source ${n}: ${s.title}` }, String(n));
}
const cites = (ids = [], max = 3) => {
  const pills = ids.slice(0, max).map(cite).filter(Boolean);
  return pills.length ? h("span", { class: "cites" }, " ", pills) : null;
};
function sourceMeta(s, { long = false } = {}) {
  const parts = [TYPE_META[s.type]?.label ?? s.type];
  if (s.outlet && !isPostType(s.type) && s.outlet !== "X" && s.outlet !== brain.name) parts.push(s.outlet);
  if (s.publishedAt) parts.push(fmtDate(s.publishedAt, long));
  if (s.durationSec) parts.push(fmtDuration(s.durationSec));
  if (s.views) parts.push(`${fmtCompact(s.views)} views`);
  return parts.join(" · ");
}
function tipFor(el) {
  if (el.dataset.tip) return h("div", {}, el.dataset.tip);
  const s = sourceById.get(el.dataset.source);
  if (!s) return h("div", {}, "Source");
  return h(
    "div",
    {},
    h("div", { class: "tip-meta" }, icon(TYPE_META[s.type]?.icon ?? "file"), sourceMeta(s)),
    h("div", { class: "tip-title" }, isPostType(s.type) ? (s.excerpt ?? s.title) : s.title),
  );
}

/* ---------- Header ---------- */
function renderHeader() {
  const cat = brain.categories[0];
  const linkEls = brain.links.map((l) => {
    const label =
      l.kind === "x" ? (l.label ?? "X") : l.kind === "youtube" ? "YouTube" : l.kind === "linkedin" ? "LinkedIn" : (l.label ?? new URL(l.url).hostname.replace(/^www\./, ""));
    const ic = l.kind === "x" ? "x" : l.kind === "youtube" ? "youtube" : l.kind === "linkedin" ? "linkedin" : "globe";
    const followers = ["x", "linkedin", "youtube"].includes(l.kind) ? brain.followers?.[l.kind] : null;
    return h(
      "a",
      { href: l.url, target: "_blank", rel: "noopener" },
      icon(ic),
      label,
      followers ? h("span", { class: "muted" }, `${fmtCompact(followers)} followers`) : null,
    );
  });

  const unofficial = `Built from ${possessive(brain.name)} public talks, essays and posts. Not affiliated with or endorsed by ${brain.name}.`;
  return [
    h(
      "nav",
      { class: "crumbs", "aria-label": "Breadcrumb" },
      h("a", { href: "/" }, icon("arrowLeft"), "All brains"),
      cat ? [h("span", { "aria-hidden": "true" }, "/"), h("a", { href: `/?cat=${cat}` }, CATEGORIES[cat] ?? cat)] : null,
    ),
    h(
      "div",
      { class: "identity", style: "margin-top:22px" },
      portrait(brain, 120),
      h(
        "div",
        {},
        h("h1", { class: "brain-name" }, brain.name),
        h(
          "div",
          { class: "role-line" },
          brain.role || brain.company ? h("span", {}, [brain.role, brain.company].filter(Boolean).join(" · ")) : null,
          brain.claim?.status === "claimed"
            ? h("span", { class: "badge", tabindex: "0", "data-tip": `Verified by ${brain.claim.claimedBy ?? brain.name}.` }, icon("check"), "Claimed")
            : h("span", { class: "badge", tabindex: "0", "data-tip": unofficial }, icon("info"), "Unofficial"),
          brain.status === "building"
            ? h("span", { class: "badge building", tabindex: "0", "data-tip": "Topics and principles are still being written. Search already works." }, "Building")
            : null,
        ),
      ),
    ),
    brain.tagline ? h("p", { class: "tagline-lg" }, brain.tagline) : null,
    linkEls.length ? h("div", { class: "links" }, linkEls) : null,
  ];
}

function renderQuote() {
  const q = brain.quote;
  const s = q && sourceById.get(q.sourceId);
  if (!q || !s) return null;
  return h(
    "figure",
    { class: "pullquote" },
    h("blockquote", {}, `“${q.text}”`),
    h(
      "figcaption",
      {},
      "From ",
      h("a", { href: s.url, target: "_blank", rel: "noopener" }, s.type === "x_post" ? "an X post" : s.type === "linkedin_post" ? "a LinkedIn post" : s.title),
      s.publishedAt ? `, ${fmtDate(s.publishedAt, false)}` : "",
      cite(q.sourceId),
    ),
  );
}

function renderReceipt() {
  const st = brain.stats;
  const stat = (value, label) => h("div", { class: "stat" }, h("b", {}, value), h("span", {}, label));
  const hours = Math.round((st.transcriptMinutes ?? 0) / 60);
  const from = Number(st.dateRange?.from?.slice(0, 4));
  const to = Number(st.dateRange?.to?.slice(0, 4));
  const years = from && to ? to - from + 1 : 0;
  const updated = brain.updatedAt ? shortDay(brain.updatedAt) : null;
  return h(
    "div",
    { class: "receipt", role: "list", "aria-label": "What's in this brain" },
    [
      stat(st.longFormCount.toLocaleString("en"), st.longFormCount === 1 ? "talk or essay" : "talks & essays"),
      st.xPostCount ? stat(st.xPostCount.toLocaleString("en"), "X posts") : null,
      st.linkedinPostCount ? stat(st.linkedinPostCount.toLocaleString("en"), "LinkedIn posts") : null,
      brain.installs > 0 ? stat(brain.installs.toLocaleString("en"), brain.installs === 1 ? "install" : "installs") : null,
      hours ? stat(`${hours}h`, "of transcript") : null,
      years ? stat(plural(years, "year", "years"), `${from}–${to}`) : null,
      updated ? stat(updated, "last updated") : null,
      brain.verifiedStat
        ? h(
            "div",
            { class: "stat" },
            h("b", {}, brain.verifiedStat.value),
            h("span", {}, h("a", { href: brain.verifiedStat.sourceUrl, target: "_blank", rel: "noopener" }, brain.verifiedStat.label)),
          )
        : null,
    ]
      .filter(Boolean)
      .map((el) => (el.setAttribute("role", "listitem"), el)),
  );
}

/** "Today", "Yesterday" or "Oct 3": short enough for a stat cell. Full timestamp goes in a title. */
function shortDay(iso) {
  const d = new Date(iso);
  const days = Math.floor((new Date().setHours(0, 0, 0, 0) - new Date(d).setHours(0, 0, 0, 0)) / 86400000);
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  return d.toLocaleDateString("en", { month: "short", day: "numeric", ...(days > 300 ? { year: "numeric" } : {}) });
}

/* ---------- Editorial sections ---------- */
function sectionHead(title, desc, extra) {
  return h("div", { class: "section-head" }, h("div", {}, h("h2", { id: `h-${title.toLowerCase().replace(/\W+/g, "-")}` }, title), desc ? h("p", { style: "margin-top:4px" }, desc) : null), extra);
}

function renderTopics() {
  if (!brain.topics.length) return null;
  return h(
    "section",
    { class: "section", "aria-labelledby": "h-what-it-knows" },
    sectionHead("What it knows", `${brain.topics.length} areas, each grounded in the sources.`, h("span", { class: "hand", "aria-hidden": "true" }, "strongest first")),
    h(
      "div",
      { class: "topics" },
      brain.topics.map((t) =>
        h(
          "article",
          { class: "topic" },
          h("h3", {}, t.label),
          h("p", {}, t.summary, cites(t.sourceIds)),
          t.sampleQuestion ? h("p", { class: "q" }, h("span", { class: "kicker" }, "Ask"), `“${t.sampleQuestion}”`) : null,
        ),
      ),
    ),
  );
}

function renderPrinciples() {
  if (!brain.principles.length) return null;
  return h(
    "section",
    { class: "section", "aria-labelledby": "h-principles" },
    sectionHead("Principles", "Close to the original words, each linked to where it was said."),
    h("ol", { class: "principles" }, brain.principles.map((p) => h("li", {}, h("p", {}, p.text, cites(p.sourceIds, 4))))),
  );
}

function renderTry() {
  if (!brain.sampleQA.length) return null;
  const transcript = h("div", { class: "transcript", role: "tabpanel", id: "try-panel", "aria-live": "polite" });
  let index = 0;
  const show = (i, dir = 0) => {
    index = i;
    const qa = brain.sampleQA[i];
    transcript.replaceChildren(
      h("div", { class: "turn" }, h("span", { class: "who" }, "you ▸"), h("p", { class: "question" }, qa.question)),
      h(
        "div",
        { class: "turn" },
        h("span", { class: "who brain" }, "brain ▸"),
        h("ul", { class: "answer" }, qa.answer.map((line) => h("li", {}, line.text, cites(line.sourceIds)))),
      ),
    );
    transcript.classList.remove("swap-in-right", "swap-in-left");
    if (dir) {
      void transcript.offsetWidth;
      transcript.classList.add(dir > 0 ? "swap-in-right" : "swap-in-left");
    }
    for (const tab of tabs?.children ?? []) {
      const on = Number(tab.dataset.i) === i;
      tab.setAttribute("aria-selected", String(on));
      tab.tabIndex = on ? 0 : -1;
    }
  };
  const tabs =
    brain.sampleQA.length > 1
      ? h(
          "div",
          { class: "try-tabs", role: "tablist", "aria-label": "Sample questions" },
          brain.sampleQA.map((qa, i) =>
            h(
              "button",
              { class: "chip", type: "button", role: "tab", "aria-controls": "try-panel", dataset: { i }, title: qa.question, onclick: () => i !== index && show(i, Math.sign(i - index)) },
              h("span", {}, qa.question),
            ),
          ),
        )
      : null;
  if (tabs) wireTablist(tabs, (tab) => Number(tab.dataset.i) !== index && show(Number(tab.dataset.i), Math.sign(Number(tab.dataset.i) - index)));
  show(0);
  return h(
    "section",
    { class: "section", "aria-labelledby": "h-try-it" },
    sectionHead("Try it", "Real answers from the brain, cited the way your agent sees them."),
    h("div", { class: "try" }, tabs, transcript),
  );
}

function renderBuilding() {
  if (brain.status !== "building") return null;
  return h(
    "section",
    { class: "section" },
    h(
      "div",
      { class: "building-card" },
      h("h2", {}, h("span", { class: "dot", "aria-hidden": "true" }), "This brain is still being written."),
      h("p", {}, `Topics, principles and sample answers land here soon. The ${plural(brain.sources.length, "source", "sources")} below are already searchable from your agent.`),
    ),
  );
}

/* ---------- Sources index ---------- */
const sourcesEl = h("div", { id: "src-results" });
const srcCount = h("p", { class: "src-count", "aria-live": "polite" });
const srcTabs = h("div", { class: "chips", role: "tablist", "aria-label": "Source types" });
const srcInput = h("input", { type: "search", placeholder: "Search sources", autocomplete: "off", "aria-label": "Search sources", "aria-controls": "src-results" });

function filteredSources() {
  const terms = src.q.toLowerCase().split(/\s+/).filter(Boolean);
  return brain.sources
    .filter((s) => src.type === "all" || s.type === src.type)
    .filter((s) => {
      if (!terms.length) return true;
      const hay = `${s.title} ${s.outlet ?? ""} ${s.excerpt ?? ""}`.toLowerCase();
      return terms.every((t) => hay.includes(t));
    })
    .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));
}

function renderSourceList() {
  const list = filteredSources();
  const capped = !src.expanded && !src.q && list.length > INITIAL_ROWS;
  const shown = capped ? list.slice(0, INITIAL_ROWS) : list;
  const featured = new Set(brain.featuredSourceIds ?? []);
  const byYear = new Map();
  for (const s of shown) {
    const year = s.publishedAt?.slice(0, 4) ?? "Undated";
    if (!byYear.has(year)) byYear.set(year, []);
    byYear.get(year).push(s);
  }
  const typeLabel = src.type === "all" ? "sources" : TYPE_META[src.type].plural.toLowerCase();
  srcCount.textContent = src.q
    ? `${plural(list.length, "source", "sources")} match “${src.q}”`
    : `${list.length.toLocaleString("en")} ${list.length === 1 ? typeLabel.replace(/s$/, "") : typeLabel}, newest first`;

  if (!list.length) {
    sourcesEl.replaceChildren(h("p", { class: "src-empty" }, `Nothing matches “${src.q}”. Try fewer words, or another type.`));
    return;
  }
  sourcesEl.replaceChildren(
    ...[...byYear].map(([year, items]) =>
      h(
        "div",
        { class: "src-year" },
        h("h3", {}, year),
        h(
          "ul",
          { class: "src-list" },
          items.map((s) => {
            const isPost = isPostType(s.type);
            const text = isPost && s.excerpt && s.excerpt.length > s.title.length ? s.excerpt : s.title;
            return h(
              "li",
              { class: "src", id: `s-${s.id}` },
              icon(TYPE_META[s.type]?.icon ?? "file", "ti"),
              h(
                "div",
                {},
                h(
                  "a",
                  { class: `title${isPost ? " post" : ""}`, href: s.url, target: "_blank", rel: "noopener" },
                  highlight(text, src.q.trim().split(/\s+/)[0] ?? ""),
                  icon("arrowUpRight", "ext"),
                ),
                h("div", { class: "meta" }, featured.has(s.id) ? h("span", { class: "kicker" }, "Featured") : null, sourceMeta(s, { long: true })),
              ),
            );
          }),
        ),
      ),
    ),
    // replaceChildren, unlike h(), would render a null child as the text "null".
    ...(capped
      ? [
          h(
            "div",
            { class: "src-more" },
            h("button", { class: "btn btn-ghost", type: "button", onclick: () => ((src.expanded = true), renderSourceList()) }, `Show all ${list.length.toLocaleString("en")}`),
          ),
        ]
      : []),
  );
}

function renderSources() {
  const counts = new Map(TYPE_ORDER.map((t) => [t, 0]));
  for (const s of brain.sources) counts.set(s.type, (counts.get(s.type) ?? 0) + 1);
  const tab = (id, label, n) =>
    h(
      "button",
      { class: "chip", type: "button", role: "tab", "aria-selected": String(src.type === id), tabindex: src.type === id ? "0" : "-1", "aria-controls": "src-results", dataset: { type: id }, onclick: () => setType(id) },
      label,
      h("span", { class: "n" }, n.toLocaleString("en")),
    );
  srcTabs.replaceChildren(
    tab("all", "All", brain.sources.length),
    ...TYPE_ORDER.filter((t) => counts.get(t)).map((t) => tab(t, TYPE_META[t].plural, counts.get(t))),
  );
  wireTablist(srcTabs, (t) => setType(t.dataset.type));
  srcInput.addEventListener("input", () => {
    src.q = srcInput.value;
    renderSourceList();
  });
  renderSourceList();
  return h(
    "section",
    { class: "section", id: "sources", "aria-labelledby": "h-sources" },
    sectionHead("Sources", `Every answer links back to one of these ${plural(brain.sources.length, "source", "sources")}.`),
    h("div", { class: "src-toolbar" }, srcTabs, h("div", { class: "mini-search" }, icon("search"), srcInput)),
    srcCount,
    sourcesEl,
  );
}

function setType(id) {
  src.type = id;
  src.expanded = false;
  for (const t of srcTabs.children) {
    const on = t.dataset.type === id;
    t.setAttribute("aria-selected", String(on));
    t.tabIndex = on ? 0 : -1;
  }
  renderSourceList();
}

/** Makes sure a source row is rendered, scrolls to it and flashes it. */
function revealSource(id, { smooth = true, focus = true } = {}) {
  const s = sourceById.get(id);
  if (!s) return;
  let row = document.getElementById(`s-${id}`);
  if (!row) {
    if (src.type !== "all" && src.type !== s.type) setType("all");
    src.q = "";
    srcInput.value = "";
    src.expanded = true;
    renderSourceList();
    row = document.getElementById(`s-${id}`);
  }
  if (!row) return;
  const animated = smooth && !REDUCED_MOTION.matches;
  // Flash once the row has arrived, so the highlight is seen where the eye lands.
  let flashed = false;
  const flash = () => {
    if (flashed) return;
    flashed = true;
    row.classList.remove("flash");
    void row.offsetWidth;
    row.classList.add("flash");
    setTimeout(() => row.classList.remove("flash"), 2500);
  };
  if (animated) {
    addEventListener("scrollend", flash, { once: true });
    setTimeout(flash, 900);
  }
  row.scrollIntoView({ behavior: animated ? "smooth" : "auto", block: "center" });
  if (!animated) flash();
  if (focus) row.querySelector("a")?.focus({ preventScroll: true });
}

/* ---------- Install: rail on desktop, bottom sheet on mobile ---------- */
function mountMobileInstall() {
  const sheetBody = h("div", { class: "sheet-body" });
  const close = h("button", { class: "icon-btn sheet-close", type: "button", "aria-label": "Close" }, icon("close"));
  const sheet = h(
    "dialog",
    { class: "sheet", "aria-label": `Install ${possessive(brain.shortName)} brain` },
    h("div", { class: "sheet-top" }, h("span", { class: "grabber", "aria-hidden": "true" }), close),
    sheetBody,
  );
  let mounted = false;
  const open = () => {
    if (!mounted) {
      mountInstall(sheetBody, brain, { flat: true });
      mounted = true;
    }
    sheet.classList.remove("closing");
    sheet.showModal();
    requestAnimationFrame(() => requestAnimationFrame(() => sheet.classList.add("open")));
  };
  const dismiss = () => {
    if (!sheet.open) return;
    if (REDUCED_MOTION.matches) {
      sheet.classList.remove("open");
      sheet.close();
      return;
    }
    sheet.classList.add("closing");
    sheet.classList.remove("open");
    const done = () => {
      sheet.removeEventListener("transitionend", done);
      sheet.classList.remove("closing");
      sheet.close();
    };
    sheet.addEventListener("transitionend", done);
    setTimeout(done, 400);
  };
  close.addEventListener("click", dismiss);
  sheet.addEventListener("cancel", (e) => {
    e.preventDefault();
    dismiss();
  });
  sheet.addEventListener("click", (e) => e.target === sheet && dismiss());
  const bar = h(
    "div",
    { class: "install-bar" },
    portrait(brain, 38),
    h("button", { class: "btn btn-primary", type: "button", "aria-haspopup": "dialog", onclick: open }, `Install ${possessive(brain.shortName)} brain`),
  );
  document.body.append(bar, sheet);
  document.body.classList.add("has-bar");
}

/* ---------- Boot ---------- */
async function load() {
  const res = await fetch(`/api/brains/${encodeURIComponent(slug)}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

try {
  brain = await load();
  if (!brain) {
    location.replace("/404");
  } else {
    if (brain.installs === undefined) {
      const list = await fetch("/api/brains").then((r) => (r.ok ? r.json() : [])).catch(() => []);
      brain.installs = list.find((b) => b.slug === brain.slug)?.installs ?? 0;
    }
    sourceById = new Map(brain.sources.map((s) => [s.id, s]));
    document.title = `${possessive(brain.name)} brain · The Brains`;
    document.querySelector('meta[name="description"]')?.setAttribute("content", brain.tagline ? `${brain.tagline}. An unofficial, cited brain for your AI agent.` : `${possessive(brain.name)} brain for your AI agent.`);

    const left = h("div", {}, renderHeader(), renderQuote(), renderReceipt(), renderBuilding(), renderTopics(), renderPrinciples(), renderTry(), renderSources());
    const rail = h("aside", { class: "rail", "aria-label": "Install" });
    const grid = h("div", { class: "brain-grid" }, left, rail);
    main.replaceChildren(grid);
    mountInstall(rail, brain);
    mountMobileInstall();

    bindTips(main, ".cite, .badge[data-tip]", tipFor);
    main.addEventListener("click", (e) => {
      const pill = e.target.closest(".cite");
      if (!pill) return;
      e.preventDefault();
      history.replaceState(null, "", `#s-${pill.dataset.source}`);
      revealSource(pill.dataset.source);
    });

    const hash = decodeURIComponent(location.hash);
    if (hash.startsWith("#s-")) requestAnimationFrame(() => revealSource(hash.slice(3), { smooth: false, focus: false }));
    else if (location.pathname.endsWith("/sources")) requestAnimationFrame(() => document.getElementById("sources")?.scrollIntoView());
  }
} catch (error) {
  console.error(error);
  main.replaceChildren(
    h("div", { class: "notfound" }, h("h1", {}, "This brain didn't load."), h("p", {}, "Check that the server is running, then refresh."), h("div", { class: "actions" }, h("a", { class: "btn btn-ghost", href: "/" }, "All brains"))),
  );
}
