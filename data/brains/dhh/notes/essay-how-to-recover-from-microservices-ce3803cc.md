## How DHH defines when microservices make sense

- DHH admits there may be cases where a microservices-first architecture makes sense, but calls them "few and far in between".
- He says the vast majority of systems are better served by starting and staying with a majestic monolith.
- He cites the Prime Video case study, which "blew up the internet" the day before the essay, as the latest illustration.
- GitHub and Shopify run their main applications as monoliths with millions of lines of code and thousands of programmers collaborating on them.
- His test: if you don't have many more millions of lines of code or thousands of programmers on the same code bases, "exercise extreme caution before even thinking about microservices".
- Maybe at Netflix or Amazon scale some areas make sense.

## Why "it depends" is not enough, and what microservices actually depend on

- DHH says microservices, like any programming pattern, are a tool. "It depends" is technically correct but helps nobody make better decisions, so guidance must say WHAT IT DEPENDS ON.
- Using microservices well usually depends on two things:
  - **a)** A large, complex system that has successfully evolved from a small, simple system.
  - **b)** The ability to identify a part of a clearly modularized design with strong boundaries and no critical-flow dependencies as an extraction candidate. Proceed only IF there are large performance gains from switching implementation approach, OR organizational benefits from placing the module with a whole team that can't easily collaborate with the rest of the system makers.
- Other justifications are possible, but they should be "clearly articulated, rigorously examined, and critically challenged" before embarking on microservices.
- Otherwise you can YOLO and splinter the design, and return to the majestic monolith "when the hangover hurts enough".

## Recovering from premature microservices: stop digging and consolidate critical paths

- **Stop digging.** You can't clean up a mess while still making more of it.
  - Don't introduce new microservices.
  - Pick one existing microservice to be the epicenter that carries all new functionality.
  - Its gravitational pull should eventually swallow most of the other microservices. The key is not making matters worse.
- **Consolidate critical, dependent paths first.** The worst microservice madness is splintering a single, coherent flow (signup, checkout, visiting a single piece of content) across multiple systems.
  - Changes then require coordination across systems, synchronization issues, and more.
  - Start consolidating microservices into macroservices, on the way back to the monolith, here.

## Recovering from premature microservices: leave hotspots for last, prune languages

- **Leave isolated performance hotspots for last.** Microservices done right target a narrow, isolated, performance-critical segment that benefits from a rewrite in a clunkier but faster language.
  - Example: a Rails app with one screen that sees wild load spikes and can't be cached, so you use Rust or Go there. "Well done, you've microserviced with honors!"
  - Caveat: make sure you actually benchmarked to prove the productivity regression was worth it.
- **Prioritize dropping the most esoteric implementations.** Microservices' promise of isolation feeds CIO dreams of "best-in-breed" and the programmer urge to experiment.
  - The result can be 3-5-7 programming languages, even more frameworks, and parallel dependency tracks. This is "murder for conceptual comprehension" and produces the symptom of "nobody understands or can work on the whole system".
  - Rule: most systems should have no more than two backend languages at once. One general-purpose language tuned for programmer productivity, used 99% of the time, and one high-performance language for the last 1% of hotspots, should they ever appear.

## Partition with modules, not networks, and start simple

- DHH calls it a fallacy that if you can't architect a large system with modules and namespaces, you can solve it by partitioning with network boundaries. "No, no, no."
- Building a large, resilient, performant system is hard. Designing one for a novel problem space on day one is impossible.
- He quotes John Gall: "A complex system that works is invariably found to have evolved from a simple system that works. The inverse proposition also appears to be true: A complex system designed from scratch never works and cannot be made to work."
- Simplicity means not inviting distributed systems, "the beast of complexity", to the first dance. A justified distributed system is only possible in good conscience if you started with a simple, monolithic design.

## Reading list and learning order for architecture

- For breaking large problem spaces into domain models, the key tome is Eric Evans' *Domain-Driven Design*.
- Graduate to that strategic level only after mastering tactical programming:
  - Kent Beck's *Smalltalk Best Practices* (for object-oriented languages).
  - Martin Fowler's *Patterns of Enterprise Application Architecture*.
- His analogy: many eager programmers start an Iron Man before they've done a 5K run. He admires the gumption, but says the industry has done them a disservice by not being clearer about the dangers of microservices earlier.
- He doesn't believe, as a general rule, in "learning speed limits". You can always start learning, and if it changes how you view earlier choices, you can change your approach from that day forth.
