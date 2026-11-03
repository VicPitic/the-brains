## The `/pr` skill defines a three-part PR body: Summary, Evidence, Merge Danger

Matt's `pr` skill is a format reference for pull request bodies. It does not push a branch, open the PR, or decide what goes into it. It tells the agent what the body should look like when it writes one. It is installed with `npx skills@latest add mattpocock/skills --skill=pr` and invoked with `/pr`. It is also model-invoked, so the agent uses it automatically whenever it writes a PR body.

- The template has three sections, in this order: **Summary**, **Evidence**, **Merge Danger**.
- The body has no preamble. It starts at the Summary heading.
- It sits in the chain `to-spec → to-tickets → implement → code-review → pr → retro`. `code-review` runs first, because a PR body should describe a diff that has already been reviewed. `implement` produces the commits the body describes.
- It only writes the body. It does not triage review comments that come back, and it does not keep the body up to date as the PR changes. After a large change, Matt's advice is to ask the agent to rewrite the body.

## Summary: a visual, not a paragraph

A default PR body describes the diff in prose. Matt's version picks the **smallest view** that makes the key point clear and keeps the words around it brief. The reviewer already has the diff open, so the body shows them its shape before they read it.

- Available views: pseudocode, a call tree, a component tree, a file tree, a Mermaid diagram, or a shaped diff.
- Use one visual, sometimes several, rarely all of them. Each visual sits next to the short text it supports.
- Keep only the calls, files, props, and boundaries the reviewer needs.
- Mermaid renders on GitHub and GitLab but not in a terminal, so it shows as raw text while the agent is still showing it locally. Call trees, file trees, and shaped diffs read the same everywhere.
- Workarounds for CLI users: an ASCII Mermaid renderer, or having the agent attach an HTML version to the PR.
- The skill is meant to prevent walls of text and stacks of diagrams. If the body is huge because the diff is huge, the problem is PR size, and the skill will not split it.

## Evidence: a before and an after

Evidence has to show a before and an after. "Tests are green" on its own is "a claim, not a before and after."

- If the change is visual and the environment can take one, a screenshot is the strongest evidence.
- Otherwise, use the exact test that failed and now passes, written as pseudocode, or the console output that changed.
- For changes with no UI (a migration, a background job, a refactor), everything except the screenshot applies.

## Merge Danger: one-way or two-way door, plus blast radius

Merge Danger states whether the change is a **one-way door** or a **two-way door**, and its **blast radius**.

- A two-way door is cheap to reverse.
- A one-way door is not. Examples: a destructive migration, a public API removal, a hard-to-reverse decision.
- Blast radius names what could break if the change is wrong: layout shift, consumers of an API, mobile responsiveness.
- The door call is the leading idea. It turns "is this safe to merge?" from a gut feeling into a stated claim the reviewer can disagree with.
- It also tells the reviewer where to spend their human review. Skim a two-way door with a small blast radius, and read a one-way door slowly.
- Every PR states a door and a blast radius, and the one-way doors are the ones to slow down on.

## Trusting the agent's door call

The agent that wrote the change is the one grading it, so Matt's guidance is to be most suspicious when it says "two-way, small blast radius". The diff often hides whether a change can be reversed.

- A user's example, cited in the essay: "rolling back a commit won't unsend a batch of emails".
- A flagged rollout stays two-way only until the first write lands in the new format.
- The skill gives the agent a definition (destructive actions and hard-to-reverse decisions are one-way), not a checklist. The Merge Danger line deserves the closest check.
- Two mitigations:
  - Make sure the agent has the ticket or spec in front of it, not just the diff.
  - Write down the changes the repo always treats as one-way (schema migrations, anything that ships outward or deletes) where the agent will read them before it makes the call.

## Known limits and how to work around them

- **Opening the PR:** `pr` does not do it. `implement` ends by committing to the current branch. `implement-spec` is the exception: it opens a draft PR when the issue tracker closes work through PRs or when asked. Requests for a `/to-pr` skill, or for `implement` to open a PR, are still open proposals. One user's workaround is a one-sentence local override of `implement` telling it to open a PR.
- **Repo PR templates:** `pr` has its own template and does not look for `.github/pull_request_template.md`. By default the agent gets two competing instructions for the same document. Matt's suggested fix is to settle it in the repo's agent docs, for example by filling the repo template and putting Summary, Evidence and Merge Danger under it.
- **LLM disclosure:** the skill does not mark the body as LLM-written. One user's approach is a standing instruction in the repo's agent docs that everything the agent posts ends with a disclosure line. That rule belongs in the repo, where it covers everything the agent posts, rather than in the template for one kind of document.
- **Reviewer complaint it targets:** "a long summary but all I need to know is what changed, how it was verified, what could break, and whether it's safe to merge."

## Signals that it's working

- You can tell what the PR changes from the Summary visual alone, before opening the diff.
- The body has no preamble.
- The Evidence section shows a before and an after, not a claim that tests pass.
- Every PR states a door and a blast radius.
