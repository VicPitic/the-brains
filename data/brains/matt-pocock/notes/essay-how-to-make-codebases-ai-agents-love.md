## Codebases are the biggest lever on AI agent output, more than prompts or AGENTS.md

- Matt says AI is not a super-powered developer; it is "a new starter with no memory". Every spawned agent is like the guy from Memento stepping into the codebase asking "Okay, I'm here, what am I doing?"
- He argues the codebase, "way more than your prompt or your `AGENTS.md` file", is the biggest influence on AI's output.
- A badly designed codebase costs you in three ways:
  - **Poor feedback loops:** the agent doesn't get feedback fast enough to know whether its change did what it intended.
  - **Hard to navigate:** the agent struggles to make sense of things, find files, and work out how to test them.
  - **Cognitive burnout:** you end up holding the AI and the codebase together by patching it manually.

## What an AI agent actually sees in a typical codebase

- A human has a mental map: modules (each exporting a function, variable or component) grouped into areas like thumbnail editor, video editor, authentication, CRUD forms.
- The AI doesn't have that map. It sees disparate modules that can all import from each other, with no groupings or relationships, and a file system that is "all jumbled together".
- Matt notes you may spawn 20+ new starters a day to read and change your codebase, so it has to be friendly and navigable for them.
- His fix: make the file system and design of the codebase match the internal map you already have of it.

## Deep modules: lots of implementation behind a simple interface

- The best way Matt has found to match the code to the mental map is **deep modules**, an idea from "A Philosophy of Software Design": lots of implementation controlled by a simple interface.
- Instead of many small modules that import each other freely, you have big chunks of functionality with simple, controllable interfaces. Any exports must come through that interface.
- He describes the common alternative as "a web of interconnected shallow modules": hard to navigate, hard to test, and hard to keep in your head.
- He thinks most codebases are probably not ready for AI for this reason.

## Grey box modules: you own the interface, AI owns the implementation

- Deep modules create a natural seam. You carefully design and control the interface and delegate the implementation inside to AI.
- You write tests that lock down the module's behavior, so you don't need to look inside. You can look inside to apply taste, influence the outcome, or improve performance, but as long as tests pass you needn't care.
- Matt calls these **grey box modules**: "You own the interface. AI owns the implementation. Tests keep it honest."
- Tests and feedback loops are essential because they are how the AI "new starters" know whether their changes work.

## Navigability and reduced cognitive load

- **Progressive disclosure of complexity:** give each module its own folder with a clear public interface. The AI can see all services on the file system, read their types, and understand what they do without digging into the implementation. The interface sits at the top and explains the module; you look inside only when needed.
- **Less to hold in your head:** instead of hundreds of interrelated modules, you keep "seven or eight chunks". The AI manages what's inside each one; you design the interfaces and how they fit together.
- He stresses this is "a million miles from vibe coding". You still apply taste at the boundaries, deciding what goes into which module.
- Planning tip: think about module boundaries from your PRDs through to your implementation issues.

## Good practice stays good practice, and TypeScript enforcement

- Matt says this is nothing new: it is how good codebases have been designed for 20 years, and "what works for humans is also great for AI".
- He mentions an `/improve-codebase-architecture` skill that audits and refactors a codebase toward these patterns.
- Some languages make module boundaries easier to enforce than others. In TypeScript, "it's not easy to enforce these boundaries", so he has been "using Effect more and more because it makes modularizing your codebase simple".
