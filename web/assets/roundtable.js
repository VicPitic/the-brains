// Roundtable page: the brain page's layout, with the people in it instead of one person's receipts.
import { h, icon, mountChrome, mountInstall, mountMobileInstall, plural, portrait } from "./shared.js";

mountChrome();
const main = document.getElementById("main");
const slug = decodeURIComponent(location.pathname.split("/")[1] ?? "");

const faces = (roundtable) => h("span", { class: "faces", "aria-hidden": "true" }, roundtable.people.map((p) => portrait(p)));

function render(roundtable) {
  const roster = roundtable.people.map((p) => p.name).join(", ");
  const sources = roundtable.people.reduce((sum, p) => sum + p.sources, 0);
  const left = h(
    "div",
    {},
    h("nav", { class: "crumbs", "aria-label": "Breadcrumb" }, h("a", { href: "/roundtables" }, icon("arrowLeft"), "Roundtables")),
    h(
      "div",
      { class: "identity", style: "margin-top:22px" },
      faces(roundtable),
      h(
        "div",
        {},
        h("h1", { class: "brain-name" }, roundtable.name),
        h("div", { class: "role-line" }, h("span", {}, `${plural(roundtable.people.length, "brain", "brains")} · ${sources.toLocaleString("en")} cited sources`), h("span", { class: "badge" }, icon("info"), "Unofficial")),
      ),
    ),
    h("p", { class: "tagline-lg" }, roundtable.blurb),
    h(
      "section",
      { class: "section", "aria-labelledby": "h-who" },
      h("div", { class: "section-head" }, h("div", {}, h("h2", { id: "h-who" }, "Who's in it"), h("p", { style: "margin-top:4px" }, "Each person answers from their own talks, essays and posts."))),
      h(
        "div",
        { class: "rows roundtable-people" },
        roundtable.people.map((p) =>
          h(
            "a",
            { class: "row", href: `/${p.slug}` },
            portrait(p, 52),
            h("span", { class: "row-main" }, h("span", { class: "row-name" }, p.name), h("span", { class: "row-tagline" }, `On ${p.angle}`)),
            icon("chevronRight", "chev"),
          ),
        ),
      ),
    ),
    h(
      "section",
      { class: "section", "aria-labelledby": "h-ask" },
      h("div", { class: "section-head" }, h("div", {}, h("h2", { id: "h-ask" }, "Things to ask"), h("p", { style: "margin-top:4px" }, "Your agent gets what each of them said, with a link to where they said it."))),
      h("ul", { class: "roundtable-asks" }, roundtable.questions.map((q) => h("li", {}, q))),
    ),
  );
  const brainLike = {
    ...roundtable,
    shortName: roundtable.name,
    installLabel: roundtable.name,
    topics: [{ sampleQuestion: roundtable.questions[0] }],
    installFoot: `Unofficial. Built from public talks, essays and posts; not affiliated with ${roster}.`,
  };
  const rail = h("aside", { class: "rail", "aria-label": "Install" });
  main.replaceChildren(h("div", { class: "brain-grid" }, left, rail));
  mountInstall(rail, brainLike);
  mountMobileInstall(brainLike, faces(roundtable));
}

try {
  const res = await fetch("/api/roundtables");
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const roundtable = (await res.json()).find((j) => j.slug === slug);
  if (!roundtable) location.replace("/404");
  else {
    document.title = `${roundtable.name} · The Brains`;
    render(roundtable);
  }
} catch (error) {
  console.error(error);
  main.replaceChildren(h("div", { class: "notfound" }, h("h1", {}, "This roundtable didn't load."), h("p", {}, "Check that the server is running, then refresh."), h("div", { class: "actions" }, h("a", { class: "btn btn-ghost", href: "/roundtables" }, "All roundtables"))));
}
