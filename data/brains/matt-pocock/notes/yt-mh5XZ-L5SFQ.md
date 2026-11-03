## Matt's approach to automated code review

- Matt says automated code review is "one of the most impactful ways that you can improve the code quality coming out of your agent."
- He keeps a review skill in his skills repo (about 109,000 stars), currently marked "in progress". He is "sort of okay with it" but "not terribly happy with it", so he hunts other people's skills for ideas to steal.
- He tried Cursor's "thermonuclear code quality review" skill on Sandcastle, his open-source software factory.
  - He ran it in auto mode on the last five PRs that reached main.
  - The skill is a single SKILL.md.
- His main takeaway: a review that is very ambitious and pushes many options produces more false positives, but those are "pretty easy just to say no to".
  - The dangerous ones are the improvements the reviewer misses and you never see.
- Of the findings on his Sandcastle PRs, he judged roughly five out of seven good or right.
- He plans to keep experimenting with it, and welcomes requests for other skills to review because it lets him steal ideas.

## Why ambition is the point of the Cursor skill

- The skill asks for a deep audit of the branch's changes, rethinking the structure "to meaningfully improve code quality without impacting behavior". It says to be ambitious, to restructure the code base where there is a clear path, and to "measure twice, cut once".
- Matt's observation: given a diff, an agent usually treats the diff as its bounds.
  - This skill goes beyond that. It starts from the branch's changes but looks across the whole code base for opportunities.
- He singles out the "code judo" framing as lovely. Two of its primary review questions he likes:
  - "Is there a code judo move that would make this dramatically simpler?"
  - "Can this be reframed so that fewer concepts, branches or helper layers are needed?"
- He likes that it escalates findings where a cleaner reframing could delete whole categories of complexity, and that it suggests deleting a layer of indirection rather than polishing it.
- These questions plus the rules give the agent "a nice way into talking about the code".

## Rules from the skill that Matt endorses

- **File size.** The skill says not to let a PR push a file from under 1K lines to over 1K lines without a strong reason.
  - Matt reached the same conclusion independently. Large files are hard for agents because the agent must ingest the whole file into its context window to find the useful part.
  - His fix is to split into multiple files and let the file name act as "the context pointer" that tells the agent what is inside and whether to open it. This is more context efficient.
  - He generally splits a file once it passes about 5K tokens, which is a similar rubric to 1K lines.
- **Boring code.** He likes "prefer direct, boring, maintainable code over hacky and magical code". He thinks the idea comes from `simplify` in Claude Code.
- **Type and boundary cleanliness.** The skill says to question unnecessary optionality, `unknown`, `any` and cast-heavy code when a clearer type boundary could exist, and to make type boundaries explicit so control flow gets simpler.
  - Matt's pet peeve is unnecessary optionality. When an agent adds a prop to a React component, it always makes it optional, even when it is always required, apparently for backwards compatibility or to shrink the blast radius. "It's so stupid."
- **Reuse canonical helpers.** Prefer existing utilities over bespoke one-offs, so the reviewer looks for places where the problem is already solved in the code base.
- **Parallelism.** Independent work that is serialized for no reason should be questioned, though the skill also says not to over-index on micro-optimizations.

## Where Matt is unsure about the skill

- **Pushing logic out of nested ifs.** The skill treats weird `if` statements added in random places as a design problem. It prefers a dedicated abstraction, helper, state machine, policy object or separate module.
  - Matt says "it's arguable whether I prefer that. Sometimes I do, sometimes I don't", and accepted it for the experiment.
- **Vague wording.** He would rewrite parts to be more direct.
  - "Treat unnecessary sequential orchestration and non-atomic updates as design smells" is "word salad to me".
  - "Does this improve or worsen the local architecture?" is not useful unless you say exactly what good and bad look like to an agent.
- **Repetition and size.** The same points (casts, `any`, `unknown`, optional params, duplication) recur through the file.
  - He calls it a "huge ball of mud" for the agent to read, where it is hard to know what to prioritize, and says it could be "cut down quite a lot".
- **Review tone section.** He doesn't know why a "be direct, serious, demanding, do not be rude" section is there, though it does punch up the language the agent uses.

## Output and prioritization in the skill

- The skill tells the agent to order findings so structural code quality regressions sit at the top and legibility and maintainability concerns sit at the bottom.
  - Matt likes this because it floats the important findings up and keeps the agent from flooding the output with useless findings.
- It ends with an approve or reject verdict on the PR.
- His summary of the skill: be more ambitious, here are specific things to focus on, propose many structural changes, prioritize findings so you don't flood the output, then approve or reject on stated conditions.
- On his run, the verdict was that under the skill's bar a couple of the PRs "should not have landed in their current shape". The behavior was correct, but the code base was "meaningfully messier than it was a week ago".

## What the review found in Sandcastle

- **Large file.** An init service had grown past 1,000 lines and mixed several concerns. The review proposed a split, and a small generic make-registry function that would delete about 20 lines of duplicated boilerplate. Matt: "feels good".
- **Scattered special case.** A feature-specific `if` on a custom issue tracker name was spread across three layers. The suggestion was to push the variation into a type instead. Matt knows the code well and rated both suggestions good.
- **False positive.** Template args carried both shell commands and prose markers. The review suggested a discriminated union, command or to-do marker, to strengthen the type boundary.
  - Matt said it came from an inaccurate understanding of the system and he'd answer "this is fine". This was two out of three correct so far.
- **Hardcoded dependency.** Templates each declare their dependencies, mostly Zod, but a code path hardcoded Zod. Hard to explain, but it surfaced something weird. Three out of four.
- **Swallowed errors.** `execSync` inside an effect swallowed errors and returned false on failure. Matt wants a reviewer to catch this.
- **Half-finished decomposition.** A large file had been split into smaller files only partway. Five out of six.
- **Prompt duplication.** Two changed prompts were byte-identical in one section, and the review suggested a shared issue-list preamble.
  - Matt disagreed: the prompts should be independently changeable. Five out of seven overall.
- A final list of smaller items also looked "pretty good" on a quick scan.

## What Matt would change in the skill

- Make it less duplicative and more DRY.
- Add a stronger focus on tests. The skill never mentions testing, seams, or improving feedback loops so future agent runs go better.
  - In his view, that is "the entire point now" of a good code base: one that is easy to change, modular and easy to navigate.
  - Everything in the skill targets source code, none of it tests.
- Bring in thinking about seams in the code base, like what his improved code base architecture skill does.
