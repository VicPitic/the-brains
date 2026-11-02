## The core claim: the harness decides quality, not the model

- Simon runs several SaaS products and a YouTube channel with a team of AI agents handling support, product development and marketing, including video production.
- He has moved those agents between GPT, Kimi, GLM, Fable and weaker models. Each produces different work, but "none of them gets to decide what our company accepts."
- His thesis: "whenever you see companies doing really well with AI, it's almost never because of the model and always because of the quality of the harness." A better model can improve output, but "it still doesn't own the company standard. Your company does."
- He built five layers of custom harness around the agent team. With them, older Opus models or small models like Qwen or DeepSeek still produce very good work. Without them, even GPT-5.6 and Fable produce sloppy work and drag you into tedious review.
- His advice for beginners: give this video's transcript to an existing agentic system (OpenClaw, Hermes), ask where each layer would help company operations, and have it set them up.

## Layer 1: eval classifiers (separate doing the work from judging it)

- Problem: an agent can repeat your rules back, still break them, and then spot the exact mistakes when asked to review afterwards. Following instructions and judging the result in one pass is hard, so he splits them into separate jobs.
- An eval checks one piece of work against one standard and returns a simple verdict, like a unit test for AI work.
- Deterministic evals are plain code (missing field, failed test). Judgment evals use another model with a system prompt that has one job: inspect this input against these rules and classify it. Input is the work, the rule, and a few pass/fail examples. Output is one class (usually approved or rejected, or a score) plus the reason and evidence.
- YouTube script example: each chapter runs three independent checks:
  - **Slop gate** (deterministic): a phrase blacklist ("this is the part where") plus regexes for patterns like "it's not X, it's Y". No AI needed.
  - **Voice check** (AI): compares the chapter with a large collection of his past scripts for style and tone.
  - **Job check** (AI): does the chapter do its job (intro creates tension and makes a clear promise; a middle chapter advances the argument and sets up the next part), using past scripts and official YouTube writing guidance.
- A rejection returns the exact reason. These evals send the writing agent back to redo its work "more than a hundred times on average" before a script reaches him, so he spends his time on argument and taste instead of nitpicking.
- The same principle is applied to scripts, code, support replies and research.

## Layer 2: schema contracts (define "done" in a machine-checkable format)

- Problem: an agent can finish a task without returning what the next step needs. The work looks complete, but the evidence was never saved and the handoff falls apart. A vague definition of finished work lets the agent fill in the blanks.
- His analogy: you wouldn't hire a contractor to "renovate the office and make it look kind of nice." You agree on deliverables, evidence and format.
- Implementation: give the model a JSON schema listing fields, what belongs in each, and which are required (OpenAI's structured outputs is one implementation). Required only means the field exists, so add tighter rules: ID formats must match, reproduction steps can't be empty, at least one log or trace must be attached. Normal software validates this and rejects bad handoffs immediately.
- Example, a support-to-technical handoff for a login bug needs: customer ID, account ID, exact reproduction steps, expected vs actual behavior, and logs or traces from the failed request.
- Predictable placement lets a separate eval judge whether the logs actually support the claimed cause without digging through a long conversation.
- Used for research, code delivery, sponsor qualification and production handoffs.
- A valid schema can still contain garbage (wrong request's logs, misread logs), so evals still run after contract validation.

## Layer 3: purpose-built tools (least privilege)

- Problem: people give an agent a general database tool or broad API credentials and write "only use it when necessary" in the prompt. He calls this insane, since you wouldn't give a human employee that access. His analogy: sending someone to collect a box from one storage room with the master key to the office.
- Principle of least privilege (NIST: you get only the access you need for the job).
- A purpose-built tool exposes one narrow company action. Normal software handles permissions, validation, filtering and formatting. The model only requests a tool call; software checks the inputs, the agent's permissions, and whether a human must approve before anything runs.
- Sponsor-inquiry agent example: it can list active sponsor conversations, fetch one specific conversation, read the content schedule and allowed price ranges, and prepare a reply for approval. It cannot browse unrelated records, pull other customers' conversations, or send the reply itself. No tool exists for those actions.
- Product development: no agent can push broad changes to production or write directly to the production database.
- "The system prompt isn't our security boundary. The capability simply isn't available."
- This matters most for frontier models like GPT-5.6 and Fable, which are very smart and "very, very eager to go out of their way."
- Narrow toolsets exist for support, publishing, development, analytics and finance.
- Side note: software your agents use needs proper APIs, or you end up with workarounds that break these boundaries. His SaaS products (FeedHive, Aidbase) are built for humans and agents with APIs, MCPs and connectors for OpenClaw and Claude Code. FeedHive lets agents and humans create, review and publish together; Aidbase has a public API, customizable ticket forms and inboxes for support. (Founder's Deck is a one-time purchase bundling four tools.)

## Layer 4: deterministic workflows (software controls the sequence)

- Problem: models are probabilistic, so the same job can yield different decisions. That's fine for interpreting research, but terrible when the agent decides an approval "feels optional that day," skips a failed check or publishes early. An apology afterwards is worthless.
- His analogy: pilots use checklists after thousands of hours. The AI makes judgments inside a job; normal software controls the order of jobs.
- Bug-fix example (FeedHive post composer), as workflow states:
  1. **Reproduction:** agent must reproduce the bug and return exact steps plus failure evidence.
  2. **Regression test:** it writes a test and shows that it fails; an eval or human reviewer checks that the test actually captures the original bug.
  3. **Implementation:** only after approval, the agent changes code in an isolated workspace.
  4. **Verification:** the regression test and the broader suite must pass, and the original reproduction steps are rerun with the result attached. Any failure or missing evidence sends the task back.
  5. **Review:** a human inspects the diff, the failing-before test and the passing evidence. Only his approval lets the workflow merge.
- Allowed moves between states are transition rules. The agent decides how to fix the code, but cannot decide reproduction was unnecessary, swap in an easier test, or declare victory because the patch looks sensible.
- Also used for support, escalation, sponsor replies, social publishing and YouTube videos. "It never gets to improvise our company process."

## Layer 5: failure replay (regression tests for agent mistakes)

- Problem: the same mistakes returned after being fixed. Adding a prompt instruction felt like a fix, but weeks later a model or tool change brought the issue back, so you pay for the same lesson twice.
- Example: a research agent returned a claim with every schema field filled, but the cited source didn't support the claim. Fixing that one result is easy; three weeks later a new model made the same mistake in another document and nobody remembered the case. Aviation turns lessons into checklists, training or aircraft design, and he wanted the same.
- What he saves per failure: the original task, the bad claim, the source that failed to support it, and the exact reason the eval should have rejected it.
- Two replays:
  - **Eval replay:** feed the old bad claim and source into the current eval; it must still reject it. Rerun old cases before any eval change goes live.
  - **Producer replay:** before moving research to a smaller or cheaper model, give it the original research task again. It must produce fresh research with claim, URL and supporting excerpt, and the eval checks that the excerpt proves the claim. Fabricated sources, wrong passages or confident claims with no evidence fail the switch. Adjust the prompt or harness and rerun until "the old failure stays dead."
- The failure library covers missing delivery evidence, wrong tool selection, actions outside permissions and sloppy writing patterns.
- Model-switching test: public benchmarks show how a model does on someone else's test; he cares whether a model survives the mistakes that already cost his company time. "This is the test I care about before I let any new model anywhere near my business."
