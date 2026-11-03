## Starting a feature with a vague idea and grilling it into shape

- Matt's example: his course video manager (React Router, TypeScript, Node, Drizzle ORM, Postgres, Vitest, run locally). About 1,200 commits and 637 closed issues.
- The feature: create real lessons directly instead of ghost-then-materialize, delete real lessons directly, and add "ghost courses" with no file path.
- He starts with a loose, dictated brain dump and invokes his "Grill Me" skill, which interviews him one question at a time.
- He says always explain the why, not just the what: "if it doesn't know the why, then it can't suggest alternatives." His why: plan courses freely without committing to a file-system shape.
- Grill Me checks the code before asking, so questions answerable from the codebase get answered there. It spawns an explore sub-agent whose summary returns to the parent, which is token-efficient.
- He used the "by the way" side-question command to ask about the course write service without polluting chat history.
- He chose to put both features in one PRD, a decision he calls "arbitrary."
- His rule on interviews: if the AI can answer from code, it should look first rather than ask.

## Ubiquitous language as the shared vocabulary with the LLM

- Matt has been reading Domain-Driven Design and adopted a ubiquitous language glossary file. He is the domain expert and the LLM is the dev, so they need precise shared terms.
- Terms in his glossary:
  - ghost lesson: exists in the database but not on the file system.
  - materialize: turning a ghost entity real by creating its on-disk representation.
  - materialization cascade: the chain reaction when materializing a lesson inside a ghost course (assign file path to course, materialize section, materialize lesson).
- The file also lists aliases to avoid, such as "create on disk" and "realize".
- Payoff: he can say "there's a bug inside the materialization cascade" and the agent knows exactly what he means, and function names become easy.
- After the grilling session he has the LLM update the glossary and commits it himself.
- He notes the glossary still lists the old, deprecated plan entities.

## Decisions made during the grill session

- A ghost course has no file path, so its sections and lessons are ghosts.
- Adding a real lesson to a ghost course forces a modal asking for the course file path, then cascades: course, section and lesson all become real.
- The app only points at an existing directory. It does not create the repo.
- Section state is derived from its lessons. Any real lesson makes it a real section, which is just a directory.
- Schema change: the courses file path becomes nullable. That is the only schema change.
- Once a course has a file path it stays real forever, even if all its real lessons are deleted or converted.
- Ghost courses still need versions because sections and lessons hang off them. The publish and export actions are hidden for ghost courses.
- Real lessons get both "convert to ghost" and a direct "delete", which purges disk and DB in one step.
- The final scope was eight bullet points, which took about 22 minutes of video. His point: the more you do here, the less you need to guide the LLM later.
- He weighs UI trade-offs with the model by asking for the trade-offs of each option, and says he sometimes drives the conversation himself.
- He considered prototyping UI variants but chose to build one version and give feedback afterwards.
- He praises question-and-answer format because it co-locates question and answer, which the attention mechanism handles well.

## Turning the conversation into a PRD and issues

- Next skill: write a PRD. It explores the codebase again, then sketches the major modules and surfaces them for review.
- Matt cares about module interfaces more than internals, and wants modules that are testable. He agreed with a new method on the course write service ("materialize course and lesson") rather than overloading the existing materialize ghost method with a parameter.
- He pushed back on deprecating the plans entity inside this PRD.
- Tests go where harnesses already exist, mainly the course write service. When the model claimed no harness existed, he said "look harder" and it found a suite of e2e tests that use a test database and a temporary Git repo.
- Course write service is built with Effect, which he says makes units easy to test. He uses it for every backend thing.
- The PRD is filed as a GitHub issue. He does not review it, trusting LLMs to summarize the conversation faithfully.
- The PRD contains user stories, implementation decisions and testing decisions. The testing section nudges the agent toward TDD and feedback loops.
- Then "PRD to issues" splits it into vertical slices with blocking relationships. The first pass gave six; he merged two small ones to get four.
- His sizing rule: not too small, because each issue costs spinning up a whole agent, and not too large.
- Issues link to the parent PRD, give acceptance criteria and blockers, and cite user stories. He says the PRD is the destination and the issues are the journey. He does not review the issues either.
- By the 15-minute mark of the grilling, context was only about 40K tokens.
- He skips the ask-user-question tool because he dislikes its UI, and not calling a tool is more token-efficient than wrapping JSON.

## Running the AFK agent (Ralph loop) in Docker

- He runs a Ralph loop with his in-progress library, provisionally named Sandcastle. It spins up a Docker container, mounts the working directory, runs Claude inside, and extracts the commits as patches applied to his local repo.
- A Dockerfile and a prompt are all that is needed. The loop takes a list of issues and the last few commits. Command: `pnpm ralph`, max 100 iterations.
- The agent picks an issue from GitHub, works it, commits and closes it. It finished after five iterations, producing roughly six commits with detailed messages.
- The prompt says to skip issues labeled human-in-the-loop.
- Tests and type checks run on every commit; this is crucial to the loop working.
- "Day shift and night shift" idea, credited to a friend: humans think, grill, and write PRDs by day; the agent implements AFK. While it runs he starts another grilling session.
- He says the approach only seems slow because you are extracting ideas from your head, and agents work on earlier sessions in parallel.
- He would like to parallelize loops with a team of agents but likes the gaps for deep focus.

## QA via generated plan and a feedback button

- He opens a fresh Claude session and prompts: take the last five commits and create a QA plan, saved as a GitHub issue, with a step-by-step guide to test every part. He has no skill for this yet and thinks it applies to almost any user-facing change.
- He rebuilds and runs the app locally and works through the plan himself, saying watching someone do QA is boring.
- His in-app feedback button turns dictated feedback into a GitHub issue. AI generates the title, and the route it was submitted from is included. That is enough for Ralph to do a good job.
- He relabels the QA-plan issue as human-in-the-loop so Ralph ignores it, and later closes it so it does not become the agent's source of truth.
- While he QAs, Ralph fixes earlier issues in the background. About 8 minutes of QA produced 6 issues.
- Issues found:
  - The add-course modal should only create a ghost course, with ghost terminology hidden from the UI.
  - Creating a ghost course showed a minified React error, did not navigate, left the modal open and had no loading state.
  - Separate "create ghost lesson" and "create real lesson" menu items felt wrong; he replaced them with one add-lesson modal with an "also create this on the file system" checkbox.
  - Delete of real lessons needed a confirmation modal with file details.
  - If the course repo is not a Git repository and a step fails, the created directory must be rolled back so the file system and database stay in sync.
- The UI choice only became clear in the real app, which he says could have been a prototype phase but he is fine jumping to code.
- His argument against specs-to-code: QA surfaces edge cases that are "really hard to plan for before."
- Final tally: 14 commits across the build, about 8 Ralph iterations.

## How Matt reviews AI output

- He barely reads the code. He reviews inputs and outputs, interface changes and module shapes, and pokes at the code now and then to check direction.
- Philosophy: treat Claude like a teammate you delegate to, focus on architecture and feedback loops, and do not over-plan up front.
- He keeps a flexible backlog, so he can queue bug fixes at any time and Ralph works through them while he continues QA.
- He notes explore sub-agent calls are slow and wishes they were faster.
