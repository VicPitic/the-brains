## DHH's position: test-induced design damage from unit-test isolation

- In the 2014 "Is TDD dead?" conversation with Kent Beck and Martin Fowler, DHH points to Jim Weirich's "decoupling from Rails" example as a representative case. It splits a Rails controller into a command-pattern runner, a repository for getting and saving models, and a business-model wrapper around the ActiveRecord object. Each slice can then be unit tested alone.
- He calls the damage "the creation of unnecessary indirection," meaning extra layers of complexity added so code can be unit tested without collaborators.
- Each of these patterns (command, repository, domain wrapper) is damage in his view. He says he sees applications that are worse by the end.
- He says he often sees people reach this design through mock-heavy TDD, where every collaborator is mocked out while testing one thing.
- Hello-world examples can look more complicated when wrapped like this, but he says that's not his point. His point is the unnecessary indirection and layers.

## Mocking rules: only externals, never internals

- DHH's position is stricter than avoid three levels of mocking: he doesn't want even one degree of internal mocking.
- Mocking externals such as a payment gateway is fine.
- When testing a controller, he doesn't want to mock the model. When testing a model, he doesn't want to mock the database.
- He argues that even first-level mocking pushes a design toward injecting patterns, and that the end result is a layer between each of the other layers so each can be mocked.
- Looking at the full layered version, he says "the application is worse off for what you try to do to make it easy to unit test with mocks."

## The cost of more code and indirection

- He argues there is a direct correlation between the size of a code base and the ease with which it can be changed: the larger it is, the harder it is to change.
- Layers of indirection must be kept in sync. In the repository-to-business-object-to-ActiveRecord chain, the repository must be updated every time there's a new interaction with the model, because every call goes through it.
- Before changing a system you must understand it. Code that fits in 10 lines is much easier to understand than 60 lines with three added layers of indirection.
- His general stance: "more code to do same things bad," unless it reflects inherent complexity in the domain. In the example, both versions accomplish the same business goal, so the extra code is pure cost.
- He says he sees a high price for every layer of indirection in understanding, maintenance and evolution.

## Why isolation, not architecture arguments, drives people there

- DHH says tdd's red-green-refactor flow is addictive and gives a lot of dopamine. He thinks people want that feeling everywhere and apply it to all code, and unit testing works best in the traditional no-collaborator sense.
- He argues people end up with a "monstrosity" they never set out to build, reached one test at a time.
- Kent Beck argues the real driver is the desire for isolation, and DHH agrees that isolation is the driver but says people see it as a goal because of unit testing. Isolated code is easier to unit test.
- He rejects the other justifications for hexagonal-style isolation as "laughable" in the general case:
  - "I could turn this into a terminal application" is rarely going to happen, though it fits a narrow case like a flight booking system.
  - Swapping a repository for an in-memory store or a web service is a pipe dream, because the two have completely different characteristics, such as performance.
- In his view the real payoff people get is isolation for testability: mocks and fast unit tests.

## Coupling versus cohesion

- DHH argues coupling and cohesion are often in opposition, not a pair that always go together. Getting very low coupling often damages cohesion.
- He is willing to trade high coupling for high cohesion. His example is a Rails controller that explicitly refers to the model, to authentication code and to a mailer object, with class names hardcoded.
- Those explicit dependencies aren't easily stubbed or swapped. His answer is that such code won't be easily unit testable in the fast, no-collaborator way, and he won't try.
- The payoff is a system that is easy to comprehend and that anyone can jump into and see what's going on.
- He says naming "test induced damage" points out that the drive for testability, with its pull toward isolation and low coupling, can harm other aspects of the trade-off, and he thinks that shouldn't be controversial.

## Testability does not always equal better design

- DHH accepts that testing has sometimes told him something that improved his system, whether via test-first or test-after. He has also had the opposite happen.
- He rejects the equation easily testable, therefore better, calling it the fallacy behind many poor decisions.
- He rejects what he calls "faith-based TDD," the belief that TDD will eventually, with no evidence, lead to the right design. He says he was stuck in that loop and felt bad about himself when he couldn't reach those conclusions.
- He concludes there are cases with no answer. You can't always have both an easily testable design and a good, coherent one, and in many cases TDD takes you to the wrong place, not the better design.
- In his words, he's giving up faith in it as "a universal solution." That is why "tdd as a faith-based programming principle is dead" for him.
- He says people should stop assuming the only thing holding them back is not having thought about it long enough.
