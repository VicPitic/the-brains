## How AI coding changed Matt's testing and feedback-loop habits

- Matt has written all the software he works on 100% AI-contributed for a few months (as of the March 2026 essay).
- He now spends far more time thinking about integration testing. Example: a CLI tool he uses for teaching lessons was mostly covered by manual QA because it is very Git-dependent, and he assumed he needed GitHub to test it.
- He was wrong; it can be tested fully locally. His fix:
  - Add an end-to-end test suite describing all user stories for how the tool should operate.
  - Build a utility that creates temporary Git environments so the AI can test everything properly.
  - Run the whole suite automatically on every change the AI makes.
- His principle: "Raising test boundaries lets you catch more bugs and work more comfortably with AI agents running code automatically."
- He treats friction as desirable: pre-commit hooks, CI and strong types give the agent real-world context on what works. Every AI change should trigger hooks, CI and type checking so bugs surface immediately. "The more immediate the feedback, the better decisions the agent can make."

## Deep, grey-box modules with simple interfaces

- Matt says AI has no taste for software architecture.
- His heuristic: bad codebases have lots of shallow modules with big interfaces; good codebases have a few big modules with simple interfaces.
  - Deep modules: tiny interface, lots of implementation.
  - Shallow modules: big interface, little implementation.
- Deep modules are easier to test and easier for the AI to work on without you understanding every implementation detail.
- He calls them "grey-box modules": you can look inside if you want, but you are not really supposed to. Break the codebase into large modules, test at the boundaries, and leave the implementation to the AI.
- If a module is deep enough, it becomes easy to "test around the box without worrying about what's inside."

## Using Effect for dependency injection in TypeScript backends

- Matt recommends Effect for TypeScript backends when working with AI agents: "I really cannot recommend `Effect` enough."
- Effect has a first-class concept called services: reusable components that encapsulate common tasks across an application.
- He describes services as complex, deep modules with simple interfaces, so Effect makes the grey-box module pattern straightforward.
- He says it has been invaluable for his work with AI agents.

## Prototyping UI aggressively because AI has no UI taste

- Matt notes demos of AI one-shotting beautiful UIs are common, but AI struggles to iterate on existing brownfield UI.
- His process before committing to a PRD:
  - Ask the LLM for five different options for the UI change.
  - Put them on throwaway routes so he can look at them.
  - Iterate on the prototype without touching real code.
  - Once he lands on something he likes, have the AI implement it properly.

## Meta-programming: automating his own process

- Matt thinks constantly about how to make his agent run automatically, which means defining his own processes and working out what he actually does.
- Building a feature is simple, in four steps:
  1. Add the tests.
  2. Build the feature.
  3. Run the tests and types.
  4. Commit.
- The harder part is everything else: triaging issues, backlog pruning, task prioritization. He says these can be delegated to AI, or the grunt work made automatic while he retains control.

## Doc rot and cognitive load

- Doc rot: people stuff repos with markdown docs, and each time the LLM searches it finds docs that may be outdated. The codebase and documentation diverge and the LLM does not know which to trust.
- His alternative: let the AI generate its own docs during the exploration phase. These are generated just in time, so they never go out of date.
- Cognitive load to keep up with changes is much higher with AI coding, and he agrees this is true.
- Deep grey-box modules help: he trusts the tests and gives changes a cursory glance without understanding every detail. He has noticed less cognitive load when working this way.
- He mostly does not parallelize, since what he builds does not need multiple agents at once. He could see running four or five projects in parallel being "gnarly."
