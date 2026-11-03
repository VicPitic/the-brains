// Shared UI for The Brains: DOM helper, icons, formatting, theme, tooltips, copy, install panel.

export const CONTACT_EMAIL = "hello@brains.ceo";
export const REPO_URL = "https://github.com/VicPitic/the-brains";
export const requestBrainUrl = (name = "") =>
  `${REPO_URL}/issues/new?template=request-a-brain.yml${name ? `&title=${encodeURIComponent(`Brain request: ${name}`)}` : ""}`;

const GITHUB_MARK =
  '<svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>';
const STAR_ICON =
  '<svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 .25a.75.75 0 01.67.42l1.88 3.81 4.2.61a.75.75 0 01.42 1.28l-3.04 2.96.72 4.19a.75.75 0 01-1.09.79L8 12.33l-3.76 1.98a.75.75 0 01-1.09-.79l.72-4.19L.83 6.37a.75.75 0 01.42-1.28l4.2-.61L7.33.67A.75.75 0 018 .25z"/></svg>';

// "Star on GitHub" pill with a live star count, cached for an hour so pages don't spend the
// unauthenticated GitHub API quota.
function mountStarButton(nav) {
  const link = h("a", { class: "gh-star", href: REPO_URL, target: "_blank", rel: "noopener", "aria-label": "Star The Brains on GitHub" });
  link.innerHTML = `${GITHUB_MARK}<span class="gh-star-label">${STAR_ICON}<span>Star</span></span><span class="gh-star-count" hidden></span>`;
  nav.insertBefore(link, nav.querySelector(".theme-toggle"));
  const show = (n) => {
    if (!Number.isFinite(n)) return;
    const count = link.querySelector(".gh-star-count");
    count.textContent = n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k` : String(n);
    count.hidden = false;
    link.setAttribute("aria-label", `Star The Brains on GitHub (${n} stars)`);
  };
  const cached = store.get("brains.stars");
  if (cached && Date.now() - cached.at < 3_600_000) return show(cached.n);
  fetch("https://api.github.com/repos/VicPitic/the-brains", { headers: { Accept: "application/vnd.github+json" } })
    .then((r) => (r.ok ? r.json() : null))
    .then((repo) => {
      if (!repo) return;
      store.set("brains.stars", { n: repo.stargazers_count, at: Date.now() });
      show(repo.stargazers_count);
    })
    .catch(() => {});
}
export const REDUCED_MOTION = matchMedia("(prefers-reduced-motion: reduce)");

/* ---------- DOM ---------- */
/** Creates an element. Children may be strings (always set as text, never HTML), nodes, arrays or null. */
export function h(tag, attrs = {}, ...children) {
  const el = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs ?? {})) {
    if (value === null || value === undefined || value === false) continue;
    if (key === "class") el.className = value;
    else if (key === "style") el.style.cssText = value;
    else if (key.startsWith("on") && typeof value === "function") el.addEventListener(key.slice(2), value);
    else if (key === "dataset") Object.assign(el.dataset, value);
    else el.setAttribute(key, value === true ? "" : String(value));
  }
  append(el, children);
  return el;
}
function append(el, children) {
  for (const child of children) {
    if (child === null || child === undefined || child === false) continue;
    if (Array.isArray(child)) append(el, child);
    else el.append(child instanceof Node ? child : document.createTextNode(String(child)));
  }
}

/** Text with case-insensitive matches of `query` wrapped in <mark>. */
export function highlight(text, query) {
  const frag = document.createDocumentFragment();
  const q = query.trim().toLowerCase();
  if (!q || !text) {
    frag.append(text ?? "");
    return frag;
  }
  const lower = text.toLowerCase();
  let at = 0;
  for (let i = lower.indexOf(q); i !== -1; i = lower.indexOf(q, at)) {
    frag.append(text.slice(at, i), h("mark", {}, text.slice(i, i + q.length)));
    at = i + q.length;
  }
  frag.append(text.slice(at));
  return frag;
}

/* ---------- Icons (lucide-style strokes) ---------- */
const PATHS = {
  search: '<circle cx="11" cy="11" r="7.5"/><path d="m20.5 20.5-4.2-4.2"/>',
  close: '<path d="M18 6 6 18M6 6l12 12"/>',
  copy: '<rect width="13" height="13" x="8.5" y="8.5" rx="2.2"/><path d="M15.5 4.8A2 2 0 0 0 13.6 3.5H5.5a2 2 0 0 0-2 2v8.1a2 2 0 0 0 1.3 1.9"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  arrowUpRight: '<path d="M7 7h10v10M7 17 17 7"/>',
  arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  arrowLeft: '<path d="M19 12H5M11 18l-6-6 6-6"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',
  chevronRight: '<path d="m9 6 6 6-6 6"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M4.6 4.6 6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4"/>',
  moon: '<path d="M20.5 14.1A8.5 8.5 0 1 1 9.9 3.5a6.6 6.6 0 0 0 10.6 10.6Z"/>',
  video: '<rect x="2.5" y="5" width="19" height="14" rx="4"/><path d="m10.2 9.2 4.6 2.8-4.6 2.8z"/>',
  mic: '<rect x="9" y="2.5" width="6" height="11.5" rx="3"/><path d="M18.5 10.5v.8a6.5 6.5 0 0 1-13 0v-.8M12 18v3.5"/>',
  file: '<path d="M14.5 2.5H6.5a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7.5Z"/><path d="M14 2.5v5h5.5M15.5 13h-7M15.5 17h-7M10.5 9h-2"/>',
  globe: '<circle cx="12" cy="12" r="9.5"/><path d="M12 2.5a14 14 0 0 0 0 19 14 14 0 0 0 0-19M2.5 12h19"/>',
  info: '<circle cx="12" cy="12" r="9.5"/><path d="M12 16v-4.5M12 8h.01"/>',
  alert: '<circle cx="12" cy="12" r="9.5"/><path d="M12 7.5v5M12 16h.01"/>',
  zap: '<path d="M13 2.5 4.5 13.5H12l-1 8 8.5-11H12z"/>',
  terminal: '<path d="m4.5 17 6-5-6-5M12.5 19h7"/>',
};
const FILLED = {
  linkedin:
    '<path transform="translate(2.5 2.5) scale(.79)" d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13M7.12 20.45H3.56V9h3.56zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0"/>',
  x: '<path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.77zm-1.08 16.17h1.7L7.4 4.73H5.58z"/>',
  producthunt:
    '<path fill-rule="evenodd" d="M12 1.5a10.5 10.5 0 1 1 0 21 10.5 10.5 0 0 1 0-21ZM8.2 6.4V17.6h2.3v-3.5h3a3.85 3.85 0 0 0 0-7.7Zm2.3 2.2v3.3h3a1.65 1.65 0 0 0 0-3.3Z"/>',
  reddit:
    '<path fill-rule="evenodd" d="M12 1.5a10.5 10.5 0 1 1 0 21 10.5 10.5 0 0 1 0-21Zm3.9 4.1a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5ZM12 9.9c-3.8 0-6.8 2-6.8 4.5S8.2 18.8 12 18.8s6.8-1.9 6.8-4.4-3-4.5-6.8-4.5Zm-2.1 3a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm4.2 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm-4.6 3.3c.7.6 1.6.9 2.5.9s1.8-.3 2.5-.9l.5.6c-.9.7-1.9 1.1-3 1.1s-2.1-.4-3-1.1Z"/>',
  youtube: '<path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3z"/>',
};
export function icon(name, cls = "") {
  const filled = name in FILLED;
  const span = document.createElement("span");
  span.innerHTML = `<svg class="icon${filled ? " fill" : ""} ${cls}" viewBox="0 0 24 24" aria-hidden="true">${filled ? FILLED[name] : PATHS[name]}</svg>`;
  return span.firstElementChild;
}
export const LOGO_SVG =
  '<svg viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="9" fill="#ff0083"/><g fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round"><path stroke-width="2.6" d="M10.5 6.5v19M10.5 6.5h6c3.3 0 5.5 2.1 5.5 4.75S19.8 16 16.6 16h-6.1M10.5 16h7.3c3.6 0 6 2.1 6 4.75s-2.4 4.75-6 4.75h-7.3"/><path stroke-width="1.8" d="M13.9 11.4c1.1-1.4 2.4 1.3 3.8-.1"/><path stroke-width="1.8" d="M13.9 20.9c1.2-1.5 2.6 1.4 4.1-.1.6-.6 1.3-.5 1.9.1"/></g></svg>';

export const TYPE_META = {
  youtube: { label: "YouTube", plural: "YouTube", icon: "video" },
  podcast: { label: "Podcast", plural: "Podcasts", icon: "mic" },
  essay: { label: "Essay", plural: "Essays", icon: "file" },
  x_article: { label: "X article", plural: "X articles", icon: "x" },
  x_post: { label: "X post", plural: "X posts", icon: "x" },
  linkedin_post: { label: "LinkedIn post", plural: "LinkedIn posts", icon: "linkedin" },
};
export const isPostType = (type) => type === "x_post" || type === "linkedin_post";

/* ---------- Formatting ---------- */
const compact = new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 });
export const fmtCompact = (n) => (typeof n === "number" ? compact.format(n) : "");
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export function fmtDate(iso, withDay = true) {
  if (!iso || !/^\d{4}-\d{2}/.test(iso)) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return withDay && d ? `${MONTHS[m - 1]} ${d}, ${y}` : `${MONTHS[m - 1]} ${y}`;
}
const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
export function fmtAgo(iso) {
  if (!iso) return "";
  const seconds = (new Date(iso).getTime() - Date.now()) / 1000;
  const units = [
    ["year", 31536000],
    ["month", 2592000],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
  ];
  for (const [unit, size] of units) if (Math.abs(seconds) >= size) return rtf.format(Math.round(seconds / size), unit);
  return "just now";
}
export function fmtDuration(sec) {
  if (!sec) return "";
  const m = Math.round(sec / 60);
  return m >= 60 ? `${Math.floor(m / 60)}h ${m % 60 ? `${m % 60}m` : ""}`.trim() : `${m} min`;
}
export const plural = (n, one, many) => `${n.toLocaleString("en")} ${n === 1 ? one : many}`;
export const possessive = (name) => (name.endsWith("s") ? `${name}'` : `${name}'s`);

/* ---------- Storage (never required for correctness) ---------- */
export const store = {
  get(key) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* private mode or blocked storage: fine */
    }
  },
};

/* ---------- Chrome: header, theme, footer ---------- */
export function mountChrome() {
  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = () => header.classList.toggle("is-scrolled", scrollY > 4);
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
  const toggle = document.querySelector(".theme-toggle");
  if (toggle) {
    toggle.append(icon("moon", "moon"), icon("sun", "sun"));
    toggle.addEventListener("click", () => {
      const current =
        document.documentElement.dataset.theme ?? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      store.set("brains.theme", next);
      toggle.setAttribute("aria-label", next === "dark" ? "Switch to light theme" : "Switch to dark theme");
    });
  }
  for (const el of document.querySelectorAll("[data-logo]")) el.insertAdjacentHTML("afterbegin", LOGO_SVG);
  for (const el of document.querySelectorAll("[data-mail]")) {
    el.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(el.dataset.mail)}`;
  }
  for (const el of document.querySelectorAll("[data-request]")) {
    el.href = requestBrainUrl();
    el.target = "_blank";
    el.rel = "noopener";
  }
  for (const el of document.querySelectorAll("[data-repo]")) {
    el.href = REPO_URL;
    el.target = "_blank";
    el.rel = "noopener";
  }
  const nav = document.querySelector(".site-header .nav");
  if (nav) {
    nav.querySelector(`a.nav-link[href="${location.pathname}"]`)?.setAttribute("aria-current", "page");
    mountStarButton(nav);
  }
}

/* ---------- Portrait ---------- */
export function portrait(brain, size) {
  const wrap = h("span", { class: "portrait", style: size ? `--size:${size}px` : null });
  const initials = brain.name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  if (brain.avatarUrl) {
    const img = h("img", {
      src: brain.avatarUrl,
      alt: brain.avatarAlt ?? `Photo of ${brain.name}`,
      loading: "lazy",
      decoding: "async",
      referrerpolicy: "no-referrer",
    });
    img.addEventListener("error", () => img.replaceWith(h("span", { class: "initials", "aria-hidden": "true" }, initials)), {
      once: true,
    });
    wrap.append(img);
  } else {
    wrap.append(h("span", { class: "initials", role: "img", "aria-label": brain.name }, initials));
  }
  return wrap;
}

/* ---------- Tooltip (one shared element; instant after the first) ---------- */
let tipEl;
let tipTimer;
let lastHidden = 0;
export function showTip(anchor, content) {
  if (!tipEl) {
    tipEl = h("div", { class: "tip", role: "tooltip", id: "tip" });
    document.body.append(tipEl);
  }
  clearTimeout(tipTimer);
  const warm = tipEl.classList.contains("on") || Date.now() - lastHidden < 400;
  const place = () => {
    tipEl.replaceChildren(content);
    tipEl.classList.toggle("instant", warm || REDUCED_MOTION.matches);
    const r = anchor.getBoundingClientRect();
    const t = tipEl.getBoundingClientRect();
    const below = r.top - t.height - 10 < 8;
    const top = below ? r.bottom + 8 : r.top - t.height - 8;
    const left = Math.min(Math.max(8, r.left + r.width / 2 - t.width / 2), innerWidth - t.width - 8);
    tipEl.classList.toggle("below", below);
    tipEl.style.top = `${top}px`;
    tipEl.style.left = `${left}px`;
    tipEl.style.transformOrigin = `${r.left + r.width / 2 - left}px ${below ? "0%" : "100%"}`;
    anchor.setAttribute("aria-describedby", "tip");
    requestAnimationFrame(() => tipEl.classList.add("on"));
  };
  tipTimer = setTimeout(place, warm ? 0 : 280);
}
export function hideTip(anchor) {
  clearTimeout(tipTimer);
  anchor?.removeAttribute("aria-describedby");
  if (tipEl?.classList.contains("on")) {
    tipEl.classList.remove("on");
    lastHidden = Date.now();
  }
}
/** Wires hover + focus tooltips for every element matching `selector` inside `root`. */
export function bindTips(root, selector, render) {
  const enter = (e) => {
    const el = e.target.closest?.(selector);
    if (el && root.contains(el)) showTip(el, render(el));
  };
  const leave = (e) => {
    const el = e.target.closest?.(selector);
    if (el) hideTip(el);
  };
  root.addEventListener("pointerover", (e) => e.pointerType === "mouse" && enter(e));
  root.addEventListener("pointerout", leave);
  root.addEventListener("focusin", enter);
  root.addEventListener("focusout", leave);
  addEventListener("scroll", () => hideTip(null), { passive: true });
}

/* ---------- Copy ---------- */
const live = () =>
  document.getElementById("live") ?? document.body.appendChild(h("div", { id: "live", class: "sr-only", "aria-live": "polite" }));

async function writeClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = h("textarea", { style: "position:fixed;opacity:0", readonly: true });
    ta.value = text;
    document.body.append(ta);
    ta.select();
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch {
      ok = false;
    }
    ta.remove();
    return ok;
  }
}

export function copyButton(getText, what = "text") {
  const btn = h(
    "button",
    { class: "copy", type: "button", "aria-label": `Copy ${what}` },
    h("span", { class: "glyph", "aria-hidden": "true" }, icon("copy", "base"), icon("check", "ok")),
    h("span", { class: "label", "aria-hidden": "true" }, h("span", { class: "idle" }, "Copy"), h("span", { class: "done" }, "Copied")),
  );
  let timer;
  btn.addEventListener("click", async () => {
    const ok = await writeClipboard(getText());
    live().textContent = ok ? `Copied ${what}` : "Copy failed. Select the text and copy it manually.";
    if (!ok) return;
    btn.dataset.copied = "true";
    clearTimeout(timer);
    timer = setTimeout(() => (btn.dataset.copied = "false"), 1600);
  });
  return btn;
}

export function codeBlock(text, what, { wrapLines = false } = {}) {
  const pre = h("pre", { tabindex: "0" }, h("code", {}, text));
  return h("div", { class: `code${wrapLines ? " wrap-lines" : ""}` }, pre, copyButton(() => text, what));
}

/* ---------- Tabs with arrow-key navigation ---------- */
export function wireTablist(list, onSelect) {
  list.addEventListener("keydown", (e) => {
    const tabs = [...list.querySelectorAll('[role="tab"]')];
    const i = tabs.indexOf(document.activeElement);
    if (i === -1) return;
    const next = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    const tab = tabs[(next + tabs.length) % tabs.length];
    tab.focus();
    onSelect(tab);
  });
}

/* ---------- Install panel: public MCP URL; the client opens our OAuth sign-in on connect ---------- */
export const CLIENTS = [
  { id: "claude-code", label: "Claude Code" },
  { id: "cursor", label: "Cursor" },
  { id: "claude", label: "Claude" },
  { id: "chatgpt", label: "ChatGPT" },
  { id: "codex", label: "Codex" },
  { id: "other", label: "Other" },
];
const CLIENT_KEY = "brains.client";
const panels = new Set();

const isLocal = () => ["localhost", "127.0.0.1", "[::1]", "::1"].includes(location.hostname) || location.hostname.endsWith(".local");

export function mcpUrl(brain) {
  // External brains are hosted by the person themselves, so their URL is the same everywhere.
  if (brain.mcp?.external && brain.mcp.url) return brain.mcp.url;
  if (isLocal() || !brain.mcp?.url) return `${location.origin}/${brain.slug}/mcp`;
  return brain.mcp.url;
}

function base64(text) {
  return btoa(String.fromCharCode(...new TextEncoder().encode(text)));
}

function clientBody(id, brain) {
  const url = mcpUrl(brain);
  const name = brain.mcp?.serverName ?? `${brain.slug}-brain`;
  const label = brain.installLabel ?? possessive(brain.shortName ?? brain.name) + " brain";
  const ask = brain.topics?.[0]?.sampleQuestion;
  const askLine = ask ? h("p", { class: "or" }, "Then ask: ", h("span", { style: "color:var(--ink-strong)" }, `“${ask}”`)) : null;
  const json = JSON.stringify({ mcpServers: { [name]: { url } } }, null, 2);
  const steps = (items) => h("ol", { class: "steps" }, items.map((item) => h("li", { "data-total": items.length }, h("span", {}, item))));
  const remoteNote = (app) =>
    isLocal()
      ? h(
          "p",
          { class: "note" },
          icon("info"),
          h("span", {}, `${app} connects from the cloud, so it can't reach a localhost URL. Use Claude Code, Cursor or Codex while testing locally; this works once the brain is deployed.`),
        )
      : null;

  switch (id) {
    case "claude-code":
      return [
        h("p", { class: "lead" }, "Run this in your terminal:"),
        codeBlock(`claude mcp add --transport http ${name} ${url}`, "command", { wrapLines: true }),
        steps([
          ["In Claude Code, run ", h("code", {}, "/mcp"), ", pick ", h("b", {}, name), " and choose ", h("b", {}, "Authenticate"), "."],
          ["Sign in with your email and the 6-digit code we send."],
        ]),
        askLine,
      ];
    case "cursor": {
      const deeplink = `cursor://anysphere.cursor-deeplink/mcp/install?name=${encodeURIComponent(name)}&config=${encodeURIComponent(base64(JSON.stringify({ url })))}`;
      return [
        h("a", { class: "btn btn-primary btn-block", href: deeplink }, icon("zap"), "Add to Cursor"),
        h("p", { class: "or" }, "Or paste into ", h("code", {}, "~/.cursor/mcp.json"), ":"),
        codeBlock(json, "Cursor config"),
        h("p", { class: "or" }, "Then open ", h("b", {}, "Customize"), " in Cursor's sidebar, find ", h("b", {}, name), " and sign in with your email and code when asked."),
        askLine,
      ];
    }
    case "claude":
      return [
        h("p", { class: "lead" }, "On claude.ai or the desktop app:"),
        steps([
          ["Click ", h("b", {}, "Customize"), " in the sidebar, then ", h("b", {}, "Connectors"), "."],
          ["Click ", h("b", {}, "+ Add"), ", then ", h("b", {}, "Add custom connector"), "."],
          ["Name it ", h("b", {}, label), ", paste this URL and click ", h("b", {}, "Continue"), "."],
          ["Keep the sign-in settings as they are (", h("b", {}, "Sign in now"), ") and click ", h("b", {}, "Continue"), ", then ", h("b", {}, "Add"), "."],
          ["Sign in with your email and the 6-digit code we send."],
        ]),
        codeBlock(url, "connector URL", { wrapLines: true }),
        h("p", { class: "or" }, "Free plans can add one custom connector. On a Team or Enterprise plan, an owner adds it under ", h("b", {}, "Organization settings"), " first."),
        remoteNote("Claude"),
      ];
    case "chatgpt":
      return [
        h("p", { class: "lead" }, "On chatgpt.com in a browser (not the phone app), with a paid plan:"),
        steps([
          ["Open ", h("a", { href: "https://chatgpt.com/plugins", target: "_blank", rel: "noopener" }, "Plugins"), " in the sidebar, click ", h("b", {}, "+"), ", then ", h("b", {}, "Add custom MCP server"), "."],
          ["Name it ", h("b", {}, label), " and paste this URL under ", h("b", {}, "Connection"), "."],
          ["Set ", h("b", {}, "Authentication"), " to ", h("b", {}, "OAuth"), " and tick ", h("b", {}, "I understand and want to continue"), "."],
          ["Click ", h("b", {}, "Create as a plugin"), " and sign in with your email and the 6-digit code we send."],
          ["Install the plugin, then in a new chat type ", h("b", {}, "@"), " and pick it."],
        ]),
        codeBlock(url, "connector URL", { wrapLines: true }),
        h("p", { class: "or" }, "On a Business or Enterprise workspace, only admins can add it."),
        remoteNote("ChatGPT"),
      ];
    case "codex":
      return [
        h("p", { class: "lead" }, "Run these in your terminal:"),
        codeBlock(`codex mcp add ${name} --url ${url}\ncodex mcp login ${name}`, "commands", { wrapLines: true }),
        h("p", { class: "or" }, "The login opens a quick sign-in in your browser. The Codex app and IDE extension pick it up too."),
        askLine,
      ];
    default:
      return [
        h("p", { class: "lead" }, "Most MCP clients accept this config:"),
        codeBlock(json, "MCP config"),
        h("p", { class: "or" }, "Streamable HTTP with OAuth. Your client opens the sign-in when you connect."),
      ];
  }
}

/** Renders the install panel into `container`. All mounted panels share the selected client. */
export function mountInstall(container, brain, { flat = false } = {}) {
  let current = store.get(CLIENT_KEY);
  if (!CLIENTS.some((c) => c.id === current)) current = "claude-code";
  const uid = `install-${Math.random().toString(36).slice(2, 8)}`;
  const tablist = h("div", { class: "tabs", role: "tablist", "aria-label": "Choose your AI client" });
  const panel = h("div", { class: "tab-panel", role: "tabpanel", id: `${uid}-panel`, tabindex: "-1" });

  const render = (id, direction = 0) => {
    current = id;
    for (const tab of tablist.children) {
      const on = tab.dataset.client === id;
      tab.setAttribute("aria-selected", String(on));
      tab.tabIndex = on ? 0 : -1;
    }
    panel.setAttribute("aria-labelledby", tablist.querySelector(`[data-client="${id}"]`).id);
    panel.replaceChildren(...clientBody(id, brain).filter(Boolean));
    panel.classList.remove("swap-in-right", "swap-in-left");
    if (direction) {
      void panel.offsetWidth;
      panel.classList.add(direction > 0 ? "swap-in-right" : "swap-in-left");
    }
  };
  const select = (id) => {
    if (id === current) return;
    const dir = Math.sign(CLIENTS.findIndex((c) => c.id === id) - CLIENTS.findIndex((c) => c.id === current));
    store.set(CLIENT_KEY, id);
    for (const p of panels) p.render(id, p.tablist === tablist ? dir : 0);
  };

  for (const client of CLIENTS) {
    tablist.append(
      h("button", { class: "chip", type: "button", role: "tab", id: `${uid}-${client.id}`, "aria-controls": `${uid}-panel`, dataset: { client: client.id }, onclick: () => select(client.id) }, client.label),
    );
  }
  wireTablist(tablist, (tab) => select(tab.dataset.client));

  const tools = brain.mcp?.tools ?? [];
  const title = brain.installLabel ?? `${possessive(brain.shortName ?? brain.name)} brain`;
  const root = h(
    "section",
    { class: `install${flat ? " flat" : ""}`, "aria-label": `Install ${title}` },
    h("div", { class: "install-head" }, h("h2", {}, `Install ${title}`), h("p", {}, `Free · ${plural(tools.length || 2, "read-only tool", "read-only tools")}`)),
    tablist,
    panel,
    h("p", { class: "signin-note" }, icon("info"), h("span", {}, "Free. When you connect, your client opens a quick sign-in: enter your email and the 6-digit code we send.")),
    tools.length
      ? h(
          "div",
          { class: "tools" },
          h("h3", {}, "Tools your agent gets"),
          h("ul", {}, tools.map((t) => h("li", {}, h("code", {}, t.name), t.readOnly ? h("span", { class: "ro" }, "read-only") : null, h("p", {}, t.description)))),
        )
      : null,
    brain.installFoot
      ? h("p", { class: "install-foot" }, brain.installFoot)
      : brain.mcp?.external
      ? h(
          "p",
          { class: "install-foot" },
          `${brain.name}'s own brain, run by ${brain.shortName ?? brain.name} at `,
          h("a", { href: `https://${new URL(brain.mcp.url).hostname.replace(/^mcp\./, "")}`, target: "_blank", rel: "noopener" }, new URL(brain.mcp.url).hostname.replace(/^mcp\./, "")),
          ". Installs connect straight to it.",
        )
      : h(
          "p",
          { class: "install-foot" },
          "Unofficial. Built from public talks, essays and posts; not affiliated with ",
          brain.name,
          ". ",
          h("a", { href: `/${brain.slug}/preview/search?q=${encodeURIComponent(brain.topics?.[0]?.label ?? "pricing")}`, target: "_blank", rel: "noopener" }, "Preview a search"),
        ),
  );
  container.replaceChildren(root);
  panels.add({ tablist, render });
  render(current);
  return root;
}

/** The install panel on mobile: a bar pinned to the bottom that opens it in a sheet. `lead` sits beside the button. */
export function mountMobileInstall(brain, lead) {
  const title = brain.installLabel ?? `${possessive(brain.shortName ?? brain.name)} brain`;
  const sheetBody = h("div", { class: "sheet-body" });
  const close = h("button", { class: "icon-btn sheet-close", type: "button", "aria-label": "Close" }, icon("close"));
  const sheet = h(
    "dialog",
    { class: "sheet", "aria-label": `Install ${title}` },
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
    lead,
    h("button", { class: "btn btn-primary", type: "button", "aria-haspopup": "dialog", onclick: open }, `Install ${title}`),
  );
  document.body.append(bar, sheet);
  document.body.classList.add("has-bar");
}
