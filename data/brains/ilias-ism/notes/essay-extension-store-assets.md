## Three-phase workflow for Chrome extension store assets

Ilias treats the Chrome Web Store listing as a conversion surface: you can ship clean code and still "lose the click if the store listing looks like an uncropped Figma export." He built **Peel UI** (copy any UI element as Tailwind or CSS) and needed the full asset set: icon, brand guide, promo tiles, five benefit slides, listing copy. He wrote a three-phase workflow, packaged it as an open-source Cursor skill, and stopped opening Figma for every extension.

- **Phase 1, concepts:** generate 4-6 unrelated icon directions as 1:1 JPGs, compare them in a `preview.html` grid, pick one.
- **Phase 2, brand guide:** generate a 16:9 brand guide from the winning icon (hex palette, typography direction, button mocks, 24px toolbar glyph, voice tags). Every later slide references it.
- **Phase 3, store:** promo tiles, five benefit slides, and `product-details.md` listing copy.
- Install: `npx skills add Illyism/dev-skills --skill extension-store-assets`.

## What Chrome requires and the common listing mistakes

Asset sizes Ilias works to:

- Extension icon: 128×128 source
- Small promo tile: 440×280
- Marquee promo tile: 1400×560
- Screenshots: 1280×800, up to 5
- Short description: capped at 132 characters

He names three common mistakes:

- Popup screenshots (a valid upload, but a weak listing)
- Hiring a designer per extension (fine if you have the budget)
- Generic purple clipboard icons, "same as the other forty dev tools in the aisle"

His reading of Google's guidance: favor promotional slides that explain the job. Show what the extension does, not what the popup looks like "zoomed to 90%." Store slides are concept illustrations of benefits, never literal screenshots.

## Phase 1: explore icon directions before committing

Ilias generates 4-6 unrelated visual worlds before choosing anything. For Peel UI he got a sticker peel, a UI magnet, and a wand inspector. The sticker peel revealing code underneath won.

- Each concept is a 1:1 JPG; a `preview.html` grid lets him compare them.
- After picking, he sets `iconFile` in `brand.config.json` and deletes the rest.
- Prompts should avoid literal clipboard or marquee dev-tool clichés unless requested; icons should be fun, beautiful, and readable at 16px.
- His rule: never skip this phase. "Just make the icon" locks you into the first mediocre direction.

## Phase 2: a brand guide that keeps every slide on palette

After the icon is picked, he generates a 16:9 brand guide poster: hex palette, typography direction, button mocks, a 24px toolbar glyph, and voice tags.

- The generator sends the picked icon as `input_reference`, so phase 3 output stays consistent.
- Peel UI's brand: neon magenta #FF2D8A and electric cyan #00E5FF, with a sticker-peel metaphor.
- The brand prefix lives in `promptPrefix` in the config and is prepended to every prompt.

## Phase 3: promo tiles, benefit slides, and listing copy

The store phase outputs promo small (440×280), marquee (1400×560), five 1280×800 benefit slides, and `product-details.md`.

Peel UI's five slides, one idea each:

1. Hero value prop
2. How it works (3 steps)
3. Before/after (screenshot vs code)
4. Export formats (Tailwind vs CSS)
5. Production-ready classes

What makes a slide look store-ready, per Ilias:

- Background hits all four edges (full bleed, no letterboxing)
- Multi-column layout filling the 16:9 frame, not a small centered icon on empty space
- Concrete UI widgets with sample data (class names, code snippets, button states), not abstract icon rows
- Contrasting card pairs (before vs after, format A vs format B)
- Decorative elements bleeding off the canvas, plus a footer bar or three-icon feature row to anchor it

His rule: "One slide, one idea." Hero, picker, and export in one 1280×800 image reads cramped.

## The generator and config

One `brand.config.json` per extension holds `productName`, `outputDir`, `iconFile`, a `brand` block (`promptPrefix`, `paddingColor`, `paddingPercent`), `concepts`, `brandGuide`, and `store` (promo and screenshots prompts).

- The script `generate.ts` calls OpenRouter **gpt-image-2** and resizes with sharp.
- Screenshots default to `fit: cover` with `paddingPercent: 0`, so the background runs edge to edge. He only raises `paddingPercent` above zero if he wants letterboxing.
- Run with `bun ... generate.ts --config=<path> --phase=concepts | brand-guide | store`.
- To regenerate only the slides, add `--screenshots-only` to the store phase.
- Prompting it in Cursor: "Run extension-store-assets phase 1 for my new extension. Output to public/_static/my-extension/"

## Listing copy and review checklist

The skill writes `store/product-details.md` from a template, with a short description of 132 characters or fewer plus the long listing. Peel UI's short description (108 characters):

"Peel any UI element off the web. Click to copy clean Tailwind v4 classes or plain CSS, no DevTools digging."

His notes from the Peel UI run:

1. Run phase 1 every time.
2. Ban browser frames in prompts, because "models default to fake Chrome windows."
3. Fill the frame with multi-column layouts and sample data.
4. One idea per slide.
5. Check the 440×280 promo at thumbnail size; if the wordmark disappears, rewrite the prompt.
6. Do a visual review before shipping.
