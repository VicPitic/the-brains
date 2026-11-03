## Why a codebase's structure shapes AI output more than prompts do

Matt's thesis is that the codebase itself is the biggest influence on AI output, bigger than the prompts or the agents.md file. If it is designed wrong, it costs in three ways:
- The AI gets slow feedback, so it can't tell whether a change did what it intended.
- The AI struggles to find files, make sense of things, and work out how to test them.
- The developer hits cognitive burnout from holding the AI and the codebase together in their head.

His position is that "software quality matters more than ever". How easy a codebase is to change determines how well AI changes it. The software best practices known for 20 years "still hold more true than ever". He frames this for "real engineers solving real problems", not vibe coders.

## The AI is a new starter with no memory

Matt tells people to stop treating AI as a superpowered developer heading toward AGI. Its relevant limitation is that it is a new starter in your codebase every time. He compares it to the guy from Memento who steps in and asks "Okay, I'm here. What am I doing?"
- It has no memory and has not experienced the codebase before.
- You may spawn 20 or more of these new starters a day to look at the code and make changes.
- So the codebase needs to be friendly and ready for new starters. What works for onboarding humans is also great for AI.

## Match the file system to the map in your head

Matt describes the typical codebase as many small modules, each exporting functions, variables, or components. The developer holds a mental map of natural groupings: a thumbnail editor feature, a video editor feature, authentication, CMS CRUD forms.
- That map usually isn't reflected in the file system. Modules are jumbled together, and any export can be imported anywhere with nothing stopping it, producing relationships between things that don't relate.
- The developer understands the map. The AI sees only a bunch of disparate modules, with no natural groupings or relationships.
- His first assertion: the file system and design of the codebase must match the internal map the developer has of it.
- The point is findability. If a prompt mentions something in the video editor section, the AI should be able to find it easily, without knowing every function and module up front.

## Deep modules from A Philosophy of Software Design

Matt's best answer is deep modules, from the book A Philosophy of Software Design. A deep module has lots of implementation controlled by a simple interface.
- In graph terms, instead of many small modules you get big chunks with simple, controllable interfaces.
- Every export from a chunk has to come through that interface.
- This makes the system easier to navigate, change, and test.
- He warns against lots of little shallow modules: tiny testable units that are hard to keep in your head, grouped and interrelated only loosely. That is the "web of interconnected shallow modules" he says most codebases have.

## Gray box modules: delegate the inside to AI

Reading about deep modules, Matt saw a seam where he could put AI in control. He doesn't much care what happens in the implementation, only the interface.
- The interface is the publicly accessible API, which he carefully controls and applies taste to.
- The inside is delegated to AI, with tests that completely lock down the module's behavior.
- These are "gray box" modules. He doesn't need to look inside, but can if he wants to influence the outcome, apply taste to the implementation, or improve performance. As long as the tests are good, he doesn't need to care.
- This is "still a million miles away from vibe coding". You must apply taste at the module boundaries: deciding what goes into which module.

## Three benefits: navigability, less burnout, proven practice

1. **Navigability and progressive disclosure.** Call each module a service (video editor service, thumbnail service). Document each in its own folder, with the public interface obvious in a types section. The AI can see the services on the file system and read the exported types before touching the implementation, then trust what is returned without looking inside. The interface at the top explains what the module does, and you look inside only when you need to change or understand it more deeply.
2. **Less cognitive burnout.** Instead of tracking interrelationships between many modules, he can "keep kind of like seven or eight lumps of stuff in my head". The AI manages the inside, and he worries only about designing the interfaces and how they fit together.
3. **It's what good codebases were always supposed to be.** This is a 20-year-old practice, and what works for humans also works for AI.

## TypeScript, Effect, and planning around module boundaries

- In TypeScript and JavaScript, it is "not that easy" to make modules with real service boundaries. Some languages make this easier than others.
- He gives a shout-out to Effect. He is using it "way more than I did" when he posted his video on it a few months earlier, and says it makes this modularizing of a codebase simple.
- Think about modules and interfaces in every coding session: when writing PRDs, when turning PRDs into implementation issues, think about which modules are affected, how their interfaces change, and how they will be tested.
- Tests and feedback loops are essential for AI, as for any new starter. A well-tested codebase lets them see how their changes ripple out.
