## Why TDD pressures lead to over-testing

- DHH says TDD nudges rather than forces, and he is looking at the drawbacks because "nothing is free."
- The rule "never write a line of production code without a failing test first" sounded reasonable to him at first, but he disliked the results: teams chasing a ratio of four lines of test code per line of production code.
- He argues that large multiples of test code make behavior harder to change, because tests are still code that must be kept in sync.
- Behavior-driven style is an improvement over plain method tests. But tests only stay stable when you refactor. Most of his code changes alter behavior, and if every production line changed means four test lines changed, something's not right.
- He asks what the right ratio is, and ties it to "the nines": some code deserves five nines of coverage, other code maybe 80% or 60%. He says he hears little support for that view and a lot for "every line of production code should have a failing test."

## Over-testing declarative Rails code

- DHH's example is ActiveRecord validations, where one declarative statement says an attribute must be present.
- He has seen people write about five lines of test code for that one statement, as a unit test, again in a functional test, and again in a system test. His reaction: "wait a minute, this is not worth it."
- The strict rule implies you cannot add an association or validation to a model without a failing test first. He is comfortable with significantly less than 100% coverage, and these declarations have not broken often enough to justify the effort.
- He wants more nuance than "every production line needs a failing test first," and thinks pressing on where the line sits for what "couldn't possibly break" is worth exploring.
- Martin Fowler's heuristics (which DHH engaged with): comment out a line, or flip an operator, and ask whether some test fails. Don't test simple getters. Assume the library works unless it is wonky.

## Test-to-code ratio depends on context, not a target

- DHH's concern is that a test-to-code ratio is not a good goal. He sees Fowler's view as agreeing that calibration comes from experience.
- DHH says the right amount of testing differs by audience. A consulting team handing a codebase to unknown developers tends to be paranoid and bolt everything down. A product team with a stable, low-rotation team of known quality can be fine with 60% or 80% coverage that buys enough confidence to change code and catch errors.
- He says people who have handed over ten codebases and seen the results will think this is crazy, and that introducing this nuance would be a vast improvement on the staple "every line needs a failing test" claims.
- He did not defend the "every line" rule as a general discipline.

## Tests versus code as the authority

- Documentation used to be the top of the chain of authority, and the industry rejected that. DHH hears from some quarters that tests are now at the top: read the tests first, and the code is secondary.
- He finds this as spurious as the documentation version.
- He says the code should always be the top level of authority. That is what has helped him understand systems, and it is the pressure that leaves code in a better state.
- Putting tests above code means energy flows toward the test code and away from the production code.

## Red-green-refactor and where attention goes

- DHH's observation: the dopamine of the loop comes from flipping red to green, not from the refactor step. It ends up red, green, (parentheses, refactor), which he compares to play video games, then eat your vegetables.
- The result is under-refactoring and too little focus on code clarity and cleanest-possible code.
- This is part of the same dynamic as test-induced damage: a pressure on attention rather than a mandate.

## Quantifiable metrics as a honey trap

- DHH notes that test speed, coverage and ratio are easy to measure, while design quality is hard to quantify and subjective, so it is tempting to chase what can be counted.
- He says these are not even secondary for him when developing a system. Near the top he puts the design and clarity of the system, and above that building something valuable to a user.
- He calls it a "honey trap" and a "siren call," and says the point of naming it is to be aware when a team is chasing the wrong things.

## Tooling infrastructure and Cucumber

- He objects to an over-focus on the testing infrastructure, which he says glorifies the test environment to the detriment of the code itself.
- Cucumber is his main example, with RSpec to a lesser extent. He says: "I really have a reserved a special place in hell for anybody who forces other people to use cucumber."
- The one exception is a narrow, "largely imaginary" sweet spot where tests are written together with non-technical stakeholders. He thinks seeing that in the wild is rarer than catching unicorns.
- He sees all of this as symptoms of TDD being a very addictive practice that can pull people into these traps.

## Why the dark side of TDD gets discussed now

- DHH argues the upside of TDD has been explored in immense detail over the past decade, while the downsides have barely been discussed.
- He compares it to selling Rails: when you sell something that breaks existing paradigms, you present it in the best light. Once the sale is made, you should be willing to reveal the darker side.
- He says TDD has largely won as an accepted principle in his Rails circle, so it is no longer the same battle as a decade ago, and it is hard to shift the conversation because it has brought so much good. He acknowledges that many places still fight the initial battles.
- He says Rails was designed with testing in mind, as a framework built to be testable.
