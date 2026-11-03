## Planning first, with clarifying questions before any code

- Matt starts big work in plan mode (Shift+Tab until plan mode shows in the bottom left). Claude Code explores the codebase with an Explore sub-agent before it writes anything.
- His first prompt is rough. He dictates it into a dictation tool and doesn't polish it: "I haven't really put too much thought into this."
- Claude comes back with clarifying questions as a multi-step form. Examples from his CLI task:
  - Where should commit diffs come from? A CLI option.
  - Positional argument or required option? A required option.
  - Match exercise numbers strictly or flexibly? Flexible.
  - What does the "01" represent? The sequence of the diff.
- He dictates answers to the follow-up questions too, then Claude produces a revised plan.
- Nothing is written until the plan is settled: "Notice how we haven't written any code yet."

## Rules file: be concise and end plans with unresolved questions

- Matt's user memory (opened with the `/memory` command) is only about 43 lines, with "very light hints".
- The top line is his favorite rule and he says he's never taking it out: in all interactions and commit messages, be extremely concise and sacrifice grammar for the sake of concision. That rule is why his plans are short and easy to read.
- The second key rule: at the end of each plan, give a list of unresolved questions to answer, if any, also extremely concise.
  - This puts the open questions in front of him at the exact point where he approves or rejects the plan.
- Other rules in the file are workflow-specific:
  - Use the GitHub CLI as the primary way to interact with GitHub.
  - Prefix branches with "matt" to show they came from him.
  - Rules for PR comments and for changesets, which he uses in several repos.

## Turning a big plan into a multi-phase plan

- A plan with no open questions can still be too large. Matt's "Spidey senses" told him this one would overrun the context window.
- He rejected the plan ("no, keep planning") and told Claude to "make the plan multi-phase."
- Claude then broke the work into implementation phases that can be split across several context windows.
- He checks the `/context` command often because he's paranoid about context. After exploration and the plan he had 83.7% free space, about 33k tokens used.

## Executing phases and reviewing between them

- After planning he switches to auto-accept edits and tells Claude to execute phase one. Once the plan exists he can be "pretty aggressive" with accept-edits, because he understands the implementation.
- Small friction: Claude still thought it was in plan mode, so he told it "crack on please with phase one."
- He doesn't review while it runs. He reviews at the end of each phase:
  - Exit Claude with Ctrl+C twice, run `code .`, inspect the diff in VS Code, then run `claude continue` to resume the same conversation.
  - He commits or at least stages changes after each phase so it's clear what each phase added.
  - Claude left a TODO in the code for phase two, which acts as a hint for the next phase.
- Phase one used only about 3k tokens, so he kept going in the same window.
- He allowed `pnpm build` commands with "don't ask again."
- When he saves a file and an auto-formatter changes it, Claude doesn't know. He tells it directly: "pull the files into your context."
- He wishes Claude Code showed tokens used in the status line, as Cursor does. His own status line shows the repo path relative to his repos folder, the branch, and counts of staged, unstaged and new files.

## Storing the plan as a GitHub issue and clearing context

- To carry a plan across context windows he asks Claude to make a GitHub issue containing the current plan, with completed items checked off. Claude runs `gh issue create` with the plan in the description.
- With the plan saved outside the window, he clears context. `/context` then shows about 16K tokens, just memory files, system tools and system prompt, and no messages.
- He then says: get GitHub issue 24 and enact phase 4 of that plan.
- He chose accept-edits over plan mode for that fresh window. Plan mode would force extra exploration, but Claude read the right file and implemented phase four from the issue alone.
- Phase five reused the already-fetched issue, so it didn't fetch it again.
- He allowed viewing issues with "don't ask again."
- Why GitHub issues rather than a local file: other people can comment on them and add to them asynchronously, even overnight.
- You can run as many phases as you like per window. Splitting across windows is optional, and you watch the context as you go.

## Matt's three top tips

- Put a tip in your memory file to be extremely concise.
- Get Claude to produce unresolved questions at the end of each plan.
- Get Claude to use the GitHub CLI to create issues, so context is shared across multiple context windows.
- He says this plan-heavy, accept-edits flow is how he does all his coding now, for both AI Hero and Everite. He describes it as a combination of heavy upfront thinking through planning and letting the AI work on accept mode.
