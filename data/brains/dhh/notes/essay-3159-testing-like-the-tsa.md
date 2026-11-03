## Tests have a cost, so the benefit must exceed it

- DHH argues that testing has a price, the way every line of code does: "it takes time to write it, it takes time to update it, and it takes time to read and understand it."
- The benefit derived must be greater than the cost to make it. In the case of over-testing, he says that is by definition not the case.
- He frames the question as: "What's the cost to prevent a bug?" If it takes 1,000 lines of validation testing to catch the one time someone removed `validates_presence_of :name`, it was not worth it.
- The exception is critical systems (his joke example is an airport control system launching rockets to Mars). Most applications are not that.
- He rejects the "if we catch just one bug, isn't it worth it?" argument. In his words: "This line of argument is how we got the TSA", which squandered billions "fondling balls and confiscating nail clippers."
- He calls the result "coverage theater of quality" and says very few applications run at a level of criticality that warrants testing everything.

## Learn what not to test early, before bad habits set in

- Discovering test-driven development feels like entering a better world with less stress and insecurity, and DHH says that is worth celebrating.
- The harder lesson is knowing what not to test. A beginner need not worry on day one, but should start picking it up by day two.
- Humans are creatures of habit. Forming over-testing habits early makes them hard to shake later, and "shake them you must."
- Over-testing is hard to call out because it does not boil down to a catchy phrase. Test-first and red-green are succinct and sexy, which helped TDD reach center stage.
- Testing only what is useful "takes nuance, experience, and dozens of fine-grained heuristics."
- He wishes one or two of the hundreds of TDD getting-started books focused on taming the beast rather than repeating the same bowling and bacon examples.

## Seven rules of thumb for testing a typical Rails app

DHH presents these as deliberately nuance-free opinions for a typical Rails application:

1. Don't aim for 100% coverage.
2. Code-to-test ratios above 1:2 are a smell, above 1:3 a stink.
3. You're probably doing it wrong if testing takes more than 1/3 of your time, and definitely wrong if it takes more than half.
4. Don't test standard Active Record associations, validations, or scopes.
5. Reserve integration testing for problems that come from integrating separate elements. Don't integration test what a unit test can cover.
6. Don't use Cucumber unless you live in the "magic kingdom of non-programmers-writing-tests."
7. Don't force test-first on every controller, model, and view. His own ratio is typically 20% test-first and 80% test-after.

## Test as little as needed for a given level of confidence

- DHH endorses Kent Beck, "the man who deserves the most credit for popularizing test-driven development."
- The quote he leans on: "I get paid for code that works, not for tests, so my philosophy is to test as little as possible to reach a given level of confidence."
- Beck's corollary, which DHH endorses: "If I don't typically make a kind of mistake (like setting the wrong variables in a constructor), I don't test for it."
- The goal is working software, and tests are a means to that end.

## Weigh both criticality and likelihood of a mistake

- In reply to a commenter arguing for testing anything that would cost money if it failed, DHH agrees criticality matters but says it is not the only factor.
- "If you don't also consider the likelihood of a mistake, you're definitely TSA testing."
- A trivial declaration that you are unlikely to get wrong is not worth a test, even when the nominal consequence of failure sounds serious.
- He applies the same heuristics to everything he writes, whether a framework used by thousands (Rails) or an app used by millions (Basecamp).

## Client-side testing costs more, so test less there

- DHH agrees the burden of automated testing on the client side is much higher, and says "much TOO high."
- Applying the cost/criticality logic ("much greater cost, much lower criticality = much less testing"), 37signals does not test nearly as much on the client side as on the server side.

## Integration tests and Cucumber don't replace design

- Integration tests are for problems arising from integrating separate elements, not for re-covering what unit tests already cover. Cucumber is not required to write integration tests.
- Pushing back on claims that Cucumber or integration tests help "design" the app, DHH says figuring out what the app should do is what designers are for. If you haven't worked that out before writing tests, "it's too late."
- He sees little value in pinning down a feature with an a priori integration test: a feature can be implemented in many ways depending on how the design is constructed.
- He says that argument mainly helps teams without designers, and dislikes the idea that designers just produce the CSS.
- He asks how integration testing helps design a system's internals, given that its whole point is to treat the system as a black box.
- For unit tests, the way tests help him is by ensuring he doesn't regress while refactoring. He considers that the key attribute of testing and files it under "don't create bugs", not "helped me design."
