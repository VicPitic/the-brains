import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";

const WEB = join(import.meta.dirname, "..", "web");

test("every page has the same navbar", () => {
  const pages = readdirSync(WEB).filter((file) => file.endsWith(".html"));
  assert.ok(pages.length >= 8);
  const navs = new Map(
    pages.map((page) => {
      const nav = readFileSync(join(WEB, page), "utf8").match(/<nav class="nav"[\s\S]*?<\/nav>/)?.[0];
      assert.ok(nav, `${page} has no navbar`);
      return [page, nav];
    }),
  );
  const expected = navs.get("index.html");
  for (const [page, nav] of navs) assert.equal(nav, expected, `${page} differs from the home navbar`);
});
