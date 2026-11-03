## Philosophy: testing is for confidence, not fast tests

- DHH says he is not anti-testing: Basecamp has "tens of thousands of written lines of test code" and he is not comfortable shipping new features without a suitable amount of automated testing.
- His past "TDD is dead" criticism (the RailsConf keynote and the conversation with Kent Beck and Martin Fowler) was about what TDD and unit-testing dogma do to the code itself, not about testing.
- He rejects the classic unit-test ideal of testing one thing in total isolation with everything else stubbed out "in the name of speedy tests". He says it is not a good trade against the cadre of mocks, stubs and dummy objects it requires.
- "The purpose of developing software is not to have fast tests." The purpose of tests is high confidence that shipped features are of high quality and that the common paths don't break.
- He prefers testing the real things (real database, real HTML generation in controllers). Those are slower, but the cost can be mitigated and tests made "fast enough".
- He also values exploratory QA by humans who were not part of development, as a separate practice.

## Model tests: real objects, fixtures, minimal stubbing

- The example is the Basecamp documents feature plus the lockable concern, which lets only one user edit a document at a time. The behavior lives in the shared `Recording` class, which many content types (documents, to-do lists, uploads) can use.
- Tests are not pure unit tests. Recording a document hits the database and fires callbacks from other concerns, and DHH says that doesn't matter because it is "fast enough".
- Principle: test the real thing and "mock and stub as little as you can get away with", so tests stay close to the metal and readable, without accidental setup complexity.
- Setup is minimal: a `setup` method sets the current person (via the Current globals pattern) so actions are attributed to someone.
- No factories. Basecamp uses stock Rails fixtures: a base world of ready-made records (for example a bucket, a project, a recording) to pluck from. Tests don't first set up what they don't care about.
- Only things specific to the test are created inline. In the versions test, the new documents are created in the test because they are particular to the feature, not fixtures.
- Lock tests live in `test/models/recording/lock_test.rb`. They ignore the many other concerns on `Recording`, which are allowed to run with their callbacks. The test focuses only on the one aspect, the lock association and its DSL.
- Versions example: documents are immutable and recordings are mutable. The test updates a recording, asserts the latest recordable is the new one, and asserts the previous version is still reachable. It uses `travel 5.seconds` between writes because versions are ordered by `created_at`, and real edits are always at least a second apart.

## Speed: fast enough, and why he accepts the cost

- The document model tests (4 tests) ran in about 2 seconds, roughly half a second per test, and the lock tests (4 tests) in about a second. He acknowledges you could get to around 100 ms per test, but says "for me that's not worth the trade-off".
- Spring, the preloader, keeps a persistent Rails process so the app isn't booted on every run.
- Tests are single-core for now. He announces that Rails 6 will add parallelized test execution, which matters more for larger suites.

## Assertions: only assert and assert_equal

- For model tests he sticks to two stock assertions: `assert` and `assert_equal`. He extracts domain-specific assertions only when they need a lot of setup or are complicated.
- He rejects the "one assertion per test" rule: "I don't ascribe to that idea at all." You should have all the assertions you need to feel comfortable about one aspect, and "there's no upper ceiling".
- The smallest thing to test in a controller is a whole action, so the whole action gets tested. His `create` test ends up with three assertions.

## Controller tests: integration tests, not isolated

- He deliberately does not test a controller action in isolation with everything stubbed. That would run fast but "wouldn't test a whole lot and wouldn't test whether the pieces actually work together".
- Controller tests inherit from Rails integration tests, so they are effectively integration tests, and he prefers them comprehensive even though they are slower.
- Documents controller flow: the test first requests the `new` action and asserts a 200. The controller does almost nothing there, but the view renders the application layout, the show template, and compiles assets (JavaScript, CSS). That confirms the form works. A custom assertion checks the breadcrumbs.
- It then posts to `create` with the full parameters, follows the redirect, and asserts it lands on the new document page with an `h1` of "hello world".
- Speed: the 10 documents controller tests ran in about 7 seconds. He calls that "a very worthy trade-off" for testing the whole stack from HTTP request to database write.
- He stops short of driving a real browser, which adds "an order of magnitude of delay". Browser-driven tests are worth it only when you need to test JavaScript behavior; for plain HTTP requests and responses, checking the HTML programmatically is a fair trade-off.

## Generic controllers and fixtures through the recordings pattern

- The locks controller is generic and acts on any recordable (documents, to-do lists, other content). He cites it as the payoff of applying concerns through generic objects to concrete ones.
- Its tests cover the scenarios: the page shows locked when another user (Jason) holds the lock, shows "already locking" when you hold it, and the unlock and force-unlock paths. The tests do not care which fixture recording they use, only that it is lockable.
- Integration tests use a `sign_in_as` style setup that sets up the current user. Each test has about two assertions on average, and several is normal.
- Fixtures keep this readable: there are only 4 document fixtures, and since every piece of content has a corresponding recording there are more recording fixtures (for example the introduction document). All the busywork is done up front, so a reader of the test doesn't have to wade through setup.
