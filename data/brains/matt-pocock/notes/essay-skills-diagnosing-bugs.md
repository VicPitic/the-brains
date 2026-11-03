## The skill's core gate: no theory without a tight feedback loop

`/diagnosing-bugs` is Matt's skill for hard bugs and performance regressions. It runs six phases: build a repro, minimise it, rank hypotheses, instrument, fix with a regression test, clean up. Its central rule is that the agent may not form a theory until a tight feedback loop exists. A coding agent given a bug report by default reads code and guesses, and this skill blocks that.

- The loop is "one named command, already run once, that goes red on _this_ bug and green when it is fixed."
- If no red-capable command exists, there is no Phase 2.
- Matt says that once the loop exists, "everything after it (bisection, hypothesis-testing, instrumentation) is mechanical."
- Phase 1 gets the most effort because it is the only hard phase.
- The skill is model-invoked. It fires on "diagnose", "debug this", or a report that something is broken, throwing, failing, or slow.
- It is slow and thorough on purpose, so it suits bugs you can't solve at first look, intermittent flakes, and regressions between two known-good states. It is the wrong tool for a question you want answered in one message.
- It diagnoses one known failure. It does not audit a codebase for bottlenecks (a proactive-performance skill was proposed and closed).
- Install: `npx skills@latest add mattpocock/skills --skill=diagnosing-bugs`.

## What makes a loop "tight", and ways to build one

A loop is not the goal; a **tight** loop is. Tight means:

- Fast (seconds).
- Deterministic (same verdict every run).
- Sharp (asserts the exact symptom, not "didn't crash").
- Runnable by the agent without the human.

A 30-second flaky loop is "barely better than none."

The skill lists ways to build the loop, roughly in order of preference:

1. A failing test at whatever seam reaches the bug.
2. A curl or HTTP script against a running dev server.
3. A CLI invocation with a fixture input, diffed against a known-good snapshot.
4. A headless browser script asserting on DOM, console, or network.
5. A replayed capture (saved request, payload, or event log) run through the code path in isolation.
6. A throwaway harness: a minimal subset of the system, one function call.
7. A property or fuzz loop, for "sometimes wrong output".
8. A bisection harness you can hand to `git bisect run`.
9. A differential loop: same input, old version against new.
10. A human-in-the-loop bash script, as a last resort. The skill ships `scripts/hitl-loop.template.sh` (about 30 lines of `read -r -p` prompts) so the agent runs it, the human follows prompts, and answers come back as parseable output.

## Handling flaky bugs and the case where no loop can be built

- For a bug that only shows up sometimes, the target is not a clean repro but a **higher reproduction rate**. Loop the trigger, parallelise, add stress, inject sleeps, until the flake rate is high enough to debug against.
- For performance regressions, the skill has a branch: establish a baseline measurement, then bisect. Measure first, fix second.
- If the agent cannot build a loop, it must stop and say so, list what it tried, and ask the human for environment access, a captured artifact, or permission to add temporary instrumentation. It must not go on to form hypotheses anyway.

## The gates between phases

Matt describes the phases as gates, not a checklist. The agent cannot enter a phase until a specific condition is true.

| Gate | What has to be true |
| --- | --- |
| Into Phase 2 | A named command, already run and pasted with its output, that can go red on this bug |
| Into Phase 3 | The repro is reproduced _and_ minimised: every remaining element is needed to reproduce the bug |
| Into Phase 4 | 3-5 ranked, falsifiable hypotheses exist, each stating its prediction, shown to the human before any is tested |
| Into Phase 5 | Probes map to a specific prediction, one variable at a time; every debug log has a tag like `[DEBUG-a4f2]`, so one grep finds them all for cleanup |
| Done | The original repro no longer reproduces, the instrumentation is gone, and the commit message names the hypothesis that turned out correct |

## Regression tests and the "correct seam" rule

- In Phase 5 the agent writes the regression test before the fix, but only if a **correct seam** exists: one where the test exercises the real bug pattern as it occurs at the call site.
- Where the only available seam is too shallow, the skill tells the agent to say so instead of writing a test that gives false confidence.
- The missing seam is itself a finding, and the agent records it instead of hiding it.
- If no good seam exists to lock the bug down, Matt points to `improve-codebase-architecture`, which the human starts.

## How to tell it is working

- It shows a command and its red output before offering any theory. If theory arrives first, the skill is not running.
- The failure reproduced is the one reported, not a nearby one found on the way.
- It shrinks the repro before guessing, and can explain why each remaining piece is needed.
- It shows a ranked list of 3-5 falsifiable hypotheses before testing any.
- A grep for the `[DEBUG-...]` tag comes back empty when it declares done.
- The commit or PR message names which hypothesis was right.
- When it cannot lock the bug down with a test, it says so instead of writing a shallow one.

## Known limitations and where it fits with other skills

Limitations Matt lists in the essay:

- **Over-triggering:** On GPT-5.6-Sol especially, it fires on plain problem descriptions and builds mock reproduction scenarios, causing reply delays (four people reported this on issue #578). The accepted fix, starting lighter and escalating only when needed, has not shipped. Workarounds: say "just answer this, don't diagnose", or disable model invocation in your harness. He says the skill is tuned for Claude Code's invocation behaviour.
- **No human gate before the fix:** Only Phase 3 has a human checkpoint. If the human is away, the agent continues with its own ranking, and nothing stops it writing code before the human agrees with the root cause (issue #124, open). Ask for the gate when invoking.
- **Secrets in output:** The skill asks the agent to paste repro output and request artifacts like HAR files, log dumps, and core dumps, with no sanitising instruction (issue #674, open). Redaction is the human's job for now, especially before output goes public.
- **Security scanners:** Snyk flags it as high risk; the essay calls this a false positive. It is the only skill in the set shipping an executable shell script, which plus outbound HTTP triggers static scanners.
- **Rename:** `/diagnose` became `/diagnosing-bugs` in v1.0.0. Wrappers or saved prompts using the old name need updating.

Relationship to neighbours:
- **triage** runs before it for raw bug reports from others and does a shallower version of Phases 1-2. Neither skill references the other, so expect this one to redo that work in full.
- **retro** runs after it, in the same session, to ask what would have prevented the bug. It is user-invoked, so `diagnosing-bugs` never calls it.
- **prototype** is for throwaway code answering a design question, and **tdd** is for building planned behaviour test-first.
- It is standalone, keeps no state, needs no setup, and ends when the fix and regression test are in. `ask-matt` routes "Something's broken" to it.
