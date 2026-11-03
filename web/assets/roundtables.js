// Roundtables index: the home directory, with several faces per row.
import { h, highlight, icon, mountChrome, plural, portrait } from "./shared.js";

const $ = (sel) => document.querySelector(sel);
const input = $("#q");
const searchBox = $("#search");
const rowsEl = $("#rows");
const emptyEl = $("#empty");
const resultLine = $("#result-line");

let roundtables = [];
const rowFor = new Map();
const state = { q: new URLSearchParams(location.search).get("q") ?? "" };

mountChrome();
$(".search .clear").append(icon("close"));

const stem = (t) => (t.length > 5 ? t.replace(/(ing|ed|es|s)$/, "") : t);
const terms = () => state.q.toLowerCase().split(/\s+/).filter(Boolean).map(stem);
const names = (j) => j.people.map((p) => p.name).join(", ");

function buildRow(j) {
  return h(
    "a",
    { class: "row row-roundtable", href: `/${j.slug}` },
    h("span", { class: "rank", "aria-hidden": "true" }),
    h("span", { class: "faces", "aria-hidden": "true" }, j.people.map((p) => portrait(p))),
    h(
      "span",
      { class: "row-main" },
      h("span", { class: "row-name" }, h("span", { class: "nm" })),
      h("span", { class: "row-tagline" }),
      h(
        "span",
        { class: "swap" },
        h("span", { class: "row-meta has-ask" }),
        h("span", { class: "row-ask", "aria-hidden": "true" }, h("b", {}, "Ask: "), `“${j.questions[0]}”`),
      ),
    ),
    icon("chevronRight", "chev"),
  );
}

function metaText(j) {
  const sources = j.people.reduce((sum, p) => sum + p.sources, 0);
  return [plural(j.people.length, "brain", "brains"), j.installs > 0 ? plural(j.installs, "install", "installs") : null, `${sources.toLocaleString("en")} cited sources`].filter(Boolean).join(" · ");
}

function apply() {
  const q = state.q.trim();
  const ts = terms();
  const visible = roundtables.filter((j) => ts.every((t) => j._hay.includes(t)));
  const shown = new Set(visible);
  roundtables.forEach((j) => {
    rowFor.get(j.slug).hidden = !shown.has(j);
  });
  visible.forEach((j, i) => {
    const row = rowFor.get(j.slug);
    row.querySelector(".rank").textContent = String(i + 1).padStart(2, "0");
    row.querySelector(".nm").replaceChildren(highlight(j.name, q));
    row.querySelector(".row-tagline").replaceChildren(highlight(names(j), q));
    row.querySelector(".row-meta").replaceChildren(metaText(j));
  });
  searchBox.dataset.hasValue = String(state.q.length > 0);
  resultLine.textContent = q && visible.length ? `${visible.length} of ${plural(roundtables.length, "roundtable", "roundtables")} match “${q}”` : "";
  emptyEl.hidden = visible.length > 0;
  if (!visible.length) {
    emptyEl.replaceChildren(
      h(
        "div",
        { class: "empty" },
        h("h2", {}, `No roundtable for “${q}” yet.`),
        h("p", {}, "Try another topic, or search every brain."),
        h("a", { class: "btn btn-primary", href: `/?q=${encodeURIComponent(q)}` }, `Search all brains for “${q}”`),
      ),
    );
  }
  history.replaceState(null, "", q ? `/roundtables?q=${encodeURIComponent(q)}` : "/roundtables");
}

function renderHeroFaces() {
  const everyone = new Map(roundtables.flatMap((j) => j.people.map((p) => [p.slug, p])));
  $("#hero-faces").replaceChildren(
    h("span", { class: "stack", "aria-hidden": "true" }, [...everyone.values()].slice(0, 5).map((p) => portrait(p, 30))),
    h("span", { class: "tnum" }, `${plural(roundtables.length, "roundtable", "roundtables")} · ${plural(everyone.size, "brain", "brains")}`),
  );
}

input.value = state.q;
input.addEventListener("input", () => {
  state.q = input.value;
  apply();
});
input.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && input.value) {
    e.preventDefault();
    input.value = "";
    state.q = "";
    apply();
  }
});
$(".search .clear").addEventListener("click", () => {
  input.value = "";
  state.q = "";
  apply();
  input.focus();
});
addEventListener("keydown", (e) => {
  const typing = e.target instanceof HTMLElement && (e.target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName));
  if (e.key === "/" && !typing && !e.metaKey && !e.ctrlKey && !e.altKey) {
    e.preventDefault();
    input.focus();
    input.select();
  }
});

try {
  const res = await fetch("/api/roundtables");
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  roundtables = (await res.json()).map((j) => ({ ...j, _hay: [j.name, j.blurb, ...j.questions, ...j.people.flatMap((p) => [p.name, p.angle])].join(" \n ").toLowerCase() }));
  for (const j of roundtables) rowFor.set(j.slug, buildRow(j));
  rowsEl.classList.add("first-paint");
  rowsEl.replaceChildren(...rowFor.values());
  renderHeroFaces();
  apply();
  [...rowsEl.children].forEach((row, i) => row.style.setProperty("--i", String(Math.min(i, 12))));
  setTimeout(() => rowsEl.classList.remove("first-paint"), 1200);
} catch (error) {
  console.error(error);
  rowsEl.replaceChildren(h("div", { class: "empty" }, h("h2", {}, "The roundtables didn't load."), h("p", {}, "Check that the server is running, then refresh.")));
}
