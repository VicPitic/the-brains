## Why AI produces slop and what a tracer bullet is

- Matt says AI has a natural inclination to sycophancy: it aims to please in all aspects of its behavior ("You're absolutely right!").
- In code, that means it wants to produce complete solutions in one leap. It has an idea of a finished file or feature and writes all the code at once.
- It doesn't stop to validate assumptions or get feedback. It builds entire layers in isolation without testing whether the critical path works.
- The result is "enormous chunks of code that need reworking. Slop", plus a huge review burden on the developer.
- A tracer bullet comes from *The Pragmatic Programmer*: a small, end-to-end slice of functionality that touches all the layers of the system at once. Matt's pitch is to encourage the agent to think in tracer bullets, small pieces built end-to-end.

## "Outrunning your headlights": the failure mode in practice

- Example: asked to build a database service with an API that connects to it, the AI builds all the endpoints (`GET`, `POST`, `PUT`, `DELETE`), request/response models, error handling middleware, authentication, rate limiting and logging infrastructure.
- Only after all that does it try to connect to the database. Then the connection string format is wrong, a column type is incorrect, or the tests don't actually hit the database.
- Matt cites the Pragmatic Programmer's phrase "outrunning your headlights": the AI builds too much in the dark, with no feedback loops to validate assumptions early.
- The developer is left with a large mess to clean up.

## The tracer bullet loop

Instead of building horizontal layers in isolation, build one tiny vertical slice:

1. Build a small feature end-to-end.
2. Test it immediately.
3. Get feedback.
4. Move to the next slice in a fresh context window.
5. Repeat.

- This builds feedback loops into the process rather than churning out features blindly.
- Once a small slice is tested, you can feel confident shipping features that work, "rather than hoping the big layers all fit together."
- Starting each new slice in a fresh context window is part of the loop.

## The prompt that forces the agent to think small

Matt says you must be extremely explicit, because the AI's default is big layers in isolation. He suggests adding this to a Ralph loop or a "build-feature" skill:

```
## Tracer Bullets

When building features, build a tiny, end-to-end slice of the feature first, seek feedback, then expand out from there.

Tracer bullets comes from the Pragmatic Programmer. When building systems, you want to write code that gets you feedback as quickly as possible. Tracer bullets are small slices of functionality that go through all layers of the system, allowing you to test and validate your approach early. This helps in identifying potential issues and ensures that the overall architecture is sound before investing significant time in development.
```

## Worked example: "Reveal in File System" (issue #161)

- Matt used tracer bullets on an issue to add a "Reveal in File System" feature for videos.
- The agent's breakdown:
  1. **Tracer bullet**: a backend endpoint that runs a PowerShell command to reveal a file in Windows Explorer from WSL.
  2. Add the action to the standalone videos context menu.
  3. Add it to the video editor actions dropdown.
  4. Add it to the sidebar video context menu.
- The agent started with the tracer bullet: the backend endpoint wired to one UI location, rather than all four locations at once.
- Matt's point: this let him validate that the core functionality worked before expanding out.

## Why the classics matter more with AI

- Matt notes tracer bullets and test-driven development are old ideas from old books, foundational concepts that formed best practices over decades.
- His complaint: when new technology emerges, people get excited, chase what's shiny, and forget what's proven.
- He argues the principles "apply harder to AI than they ever did to humans." Context window constraints make the discipline non-negotiable, and you can't ignore tracer bullets with an agent the way you might with a human developer, because "the consequences are immediate and visible."
- He says tracer bullets are what his `/prototype` skill automates: answering questions with throwaway code.

## The check Matt recommends before each task

- Ask yourself: "Am I letting it outrun its headlights? Am I getting it to validate assumptions early, or is it building in the dark?"
- His bottom line: force the agent to think small, build end-to-end, get feedback, and move forward with confidence.
