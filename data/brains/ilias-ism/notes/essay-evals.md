## Eval structure: one `eval.ts` per feature, co-located `eval.md`

Ilias skips eval SaaS platforms, vector databases and scoring dashboards. He runs minimal evals across five products (AISEOTracker, LinkDR, GenPPT, headshot-generator.ai, MagicBuddy), covering voice TTS, image generation, presentation decks, long-form markdown and structured JSON.

- Each feature gets one `eval.ts` plus a co-located `eval.md` that diffs cleanly in git, so cost, speed and output changes are visible in pull requests.
- Rules he enforces:
  - Import the production function, prompt constants and Zod schemas directly. Never copy-paste prompts into the eval, because production evolves and the benchmark ends up testing obsolete behavior.
  - Run real API calls to record true latency, tokens and cost. Models can't predict their own streaming throughput.
  - One script, three modes: `bun eval.ts` runs the production model only, `--matrix` runs all candidates, `--models=a,b` runs a subset.
  - Log progress with ✅/❌ and write results to `eval.md`, not just stdout.
- He packaged this as an open-source skill: `npx skills add Illyism/dev-skills --skill eval`.
- His definition: an eval is "a unit test for non-deterministic AI outputs". It runs real inputs through production code and records latency, token usage, cost, schema validity and a surface for judging quality.

## Why he runs evals: regressions, prompt drift, margins, schema failures

Ilias gives four reasons to eval every AI feature:

- **Silent model regressions:** providers change checkpoints and API behavior behind the scenes. An eval flags when a new model version breaks tool calling or JSON formatting.
- **Prompt drift:** fixing one edge case in a system message often breaks three others. A repeatable suite catches that.
- **Margins:** benchmarking candidates side by side on real production inputs lets you swap an expensive flagship for a lightweight model. He cites cutting API costs 75%+ this way.
- **Silent schema failures:** even strong reasoning models can fail structured JSON or loop on tool calls. Evals catch this before users see broken UI.

Without evals, he says, every prompt update, model upgrade or provider swap is a gamble.

## The self-score fallacy: never let models grade themselves

Ilias's AISEOTracker competitor-suggestion benchmark (Framer alternatives) showed why auto-scoring lies.

- The summary counted candidates each model scored above 80/100. `gpt-5.6-luna` got 7/10 and `gemini-3.6-flash` got 4/10, so luna appeared to win.
- The raw outputs said otherwise. `gemini-3.6-flash` returned four precise direct competitors: Webflow, Wix, Squarespace, Elementor. `gpt-5.6-luna` returned those four plus bare "WordPress" (redundant with Elementor), Builder.io (a headless visual CMS, not a Framer replacement) and Bubble (a full-stack app builder, wrong category).
- Luna confidently scored its own weak suggestions highly, so the eval rewarded it for producing more items.

His conclusion: self-scoring "rewards quantity and confidence, not correctness".

Rules that follow:
- Summary tables hold machine metrics only: latency (ms), input/output tokens, total cost, schema pass/fail. Any item count is captioned as a count, never "Relevant" or "Quality".
- Quality is judged from raw outputs grouped verbatim under each test case, by a human or a strong independent judge model (`gpt-5.6-sol` or `claude-opus`). The judge must never be the generating model.
- A "✅ Passed" only means the API call succeeded and the JSON matched the Zod schema. It says nothing about accuracy or quality.

## Image evals: cutting headshot-generator.ai cost to lift margin to 80%

On headshot-generator.ai users upload photos to generate style clones (subway film portraits, studio headshots, cinematic editorial). Failures either lose the scene grammar (tiles, lighting) or copy the reference subject's face. His `clone-eval.ts` runs style analysis, calls image generation, and passes the output image path to an independent visual judge model.

Benchmark on the `fuji-street` subway portrait case:

| Model | Latency | Result | Cost/image | Margin on $0.17 credit |
| --- | --- | --- | --- | --- |
| `gemini-3-pro-image-preview` (default) | ~30,000ms | PASS 7/10 | $0.134 | 20% |
| `gemini-3.1-flash-lite-image` | ~12,000ms | PASS 6/10 | $0.034 | 80% |

Flash Lite kept the hard scene grammar (white subway tile, orange stripe, red/white curb), scrubbed the subject's identity cleanly, ran 2.5x faster at a quarter of the cost. He says that one benchmark unlocked an 80% margin on standard credit packs.

He also admits the eval is weak: one case, one run, a 1-10 score, so 7 vs 6 is noise. To hillclimb it he'd want a judge that checks yes/no claims (white subway tile, orange stripe, a new face) and more cases, each run three times.

## Tool-calling evals: GenPPT's 18-slide deck benchmark

GenPPT turns articles, documents or prompts into 18-slide decks. It's a multi-turn tool-calling task (`addSlides`, `setTheme`, `insertImages`), not a single prompt.

Results against the baseline `gpt-5.4-nano`:

| Model | Pass | Slides | Duration | Cost |
| --- | --- | --- | --- | --- |
| `gpt-5.4-nano` | 100% | 18 | 94.3s | $0.0206 |
| `gpt-5.6-luna` | 92% | 18 | 72.1s | $0.1127 |
| `gpt-5.6-terra` | 91% | 18 | 52.3s | $0.1867 |
| `gpt-5.6-sol` | 90% | 18 | 115.3s | $0.5047 |
| `gemini-3.6-flash` | 21% | 0 | 55.3s | $0.2126 |

- `gemini-3.6-flash` looped 13 times on malformed `addSlides` arguments, produced 0 slides and still burned $0.21. Public leaderboards rated it a top fast reasoning model, but it choked on his tool schema.
- The lesson he draws: an eval stops you shipping a hyped model update that breaks your core workflow.
- He notes this eval has no headroom (nano already scores 100%), so it works as a cost eval, not something to hillclimb. Every pricier model scored lower and cost more.

## Voice evals on MagicBuddy and pitfalls in benchmark fairness

MagicBuddy is a Telegram AI bot that sends voice notes via TTS providers like Grok Voice TTS and Gemini. His `voice.eval.ts` tests voices (`Sulafat`, `Eve`), languages (English, French, Spanish) and inline emotion tags. Example case: voice `Sulafat`, input "[whispers] Mon chéri... come closer. I have a secret.", instructions "Soft Parisian French accent. Slow, intimate, whispered delivery."

- It writes `.ogg` and `.mp3` files to `voice-samples/` plus an `eval.md` with audio duration, payload size and latency.
- Instead of prompting the bot on his phone, he runs `bun voice.eval.ts` and listens to the exported files.

Other benchmark traps he flags:
- **Control output constraints.** If one model emits 60 tokens and another 1,400, the second looks 20x slower and pricier, but you're measuring verbosity. Force identical `top_k`, character limits or array lengths.
- **Count real billed cost.** Reasoning models (Gemini Flash thinking, OpenAI o-series) burn hidden reasoning tokens. Pull total billed cost from response metadata, not visible output length.
- **Use absolute dollars.** "94x more expensive" sounds scary, but a backfill at $0.22 vs $20.70 may be trivial against the quality or speed gain. Judge against your margins.

## Hillclimbing without overfitting

Ilias treats an eval as a place to stand and hillclimbing as the next step: read failures, change one thing, rerun, keep it only if the score rises. He draws on Anthropic's Lance Martin post (Sep 28, 2026), whose `claude-api` skill ships `/claude-api build-eval` and `/claude-api hillclimb`.

**Check the eval first.** Hillclimbing a bad eval optimizes the bad eval. Cases should mirror production (real inputs, bug reports, support tickets before synthetic ones), stronger models should score higher, the best model should land well below 100%, and the same setup should score about the same twice.

**The loop:**
1. Split cases into train and test, roughly two-thirds and one-third. The agent reads train failures only.
2. Measure noise: run the baseline three times per split. If identical runs swing 4 points, a 3-point gain means nothing.
3. One patch per round, aimed at a root cause. Rerun both splits.
4. Keep it only if train and test both improve. Train up with test flat is overfitting, so revert. Revert any regression too.
5. Log every round in `hillclimb.md` next to `eval.md` and ship the version with the best test score.

**Don't let it cheat.** Never paste failing cases or expected answers into the prompt. Don't add tools or rules that fix only one case. Keep the answer key out of the model's reach.

**When it stalls.** After two or three flat rounds, stop patching and group remaining failures by root cause. In Anthropic's example, `claude-api` went from 66% to 88% over 24+ rounds. At one stall the right docs were present but Claude kept writing older API shapes from training data, so they added a table mapping old forms to current ones. The last jump came in the round where they fixed a broken grader.

**Hillclimbing cost.** Anthropic's 44-ticket support benchmark started on Opus 4.8 at high effort, 4.6¢ per ticket. They trimmed the prompt, lowered effort, dropped to Sonnet 5, then added routing rules. On 14 held-out tickets the final setup scored 90.5% vs the baseline's 78.6%, at about a fifth of the cost.
