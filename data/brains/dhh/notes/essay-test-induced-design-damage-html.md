## Core claim: "hard to unit test" does not mean "poorly designed"

- DHH rejects the TDD maxim that "Code that's hard to test in isolation is poorly designed." He grants it is sometimes true, since difficulty testing can point to tangled responsibilities.
- He denies it is always true. In his view you can have well-designed code that is hard to unit test.
- He treats the maxim as the source of "test-induced design damage": changes made to facilitate (a) easier test-first, (b) speedy tests, or (c) unit tests, which harm the clarity of the code.
- The harm is usually "needless indirection and conceptual overhead", code "warped out of shape solely to accomodate testing objectives."
- Faithful TDD'ers reject that this is possible. He says a true believer sees only good from these concessions, so TDD has been "rammed down people's throats as the savior of professional programming."
- He suggests the long absence of debate came from post hoc rationalization: if red-green-refactor is the guiding light for all design, any sacrifice seems trivial ("Who cares if you need two or three extra layers of indirection to unit test a controller?"). The "TDD is dead" uprising grew under that regime.

## Hexagonal architecture in Rails as a case of test-driven pattern application

- His example is the late Jim Weirich's demonstration of hexagonal architecture in Rails. He notes Jim was a pragmatic programmer, did not necessarily buy into it as a general approach, and that he misses him dearly.
- The justifications in that talk are all about testing: faster tests without touching the database, and testing controller logic without dependent context.
- To get there, the simple controller is forbidden from talking directly to Active Record and must go through a Repository. The action is hollowed out into a Command object, which calls back into the controller through the Listener pattern.
- His verdict: "This is not better." The code suffered "tremendous design damage" for two goals, faster tests and easy-to-mock unit-tested controllers.
- He says the same rationalization runs through other attempts to draw boundaries between "your application" and Rails.
- The hexagonal pattern itself is not to blame. It may fit systems where the web is one adapter among many on equal terms (regular GUIs, voice control) that cannot just go through a web API.
- What he objects to is applying hexagonal, boundaries and ports-and-adapters to Rails apps for the purpose of testing: "test-driven pattern application."
- A Repository over Active Record only disconnects the app from the database for "fast test" purposes. If you ignored the tests, you would not look at the after code and say "BETTER!"

## Controllers and views: integration and system tests, not unit tests

- Unit testing Rails controllers (or similar MVC) is a mistake in his view. A controller's job is to integrate the user's request with the model's response within the context of a session.
- Mocking all of that away just to check whether it sends this redirect or that notice "doesn't make the least bit of sense." Controllers are meant to be integration tested.
- People get pulled into unit testing by default because the testing pyramid prescribes the unit level as the focus.
- Unit testing views is "equally folly." That motivation drives interest in Presenters, which he says have occasional legitimate uses.
- The view is the top layer of the MVC cake, so the right testing metaphor for most of it is end-to-end system testing.
- Resist extracting session logic (such as permission checks) or auxiliary views (like emails) into a command object just to mock boundaries and get "fast tests."
- "It's skinny controllers, not anemic controllers, we're looking for. And private methods on controllers are not evil."

## Model tests should hit the database

- The fear of letting model tests talk to the database is outdated. Decoupling is "simply not worth it any more, even if it may once have been."
- Rails now runs a persistent console process, so the 1.2s framework boot overhead from Jim's example is gone.
- Test fixtures combined with transaction-wrapped test cases make database-backed tests very fast. He promised a separate post on "Effective test fixtures".
- Technique: avoid expensive setup per case by tailoring prototypical fixtures to each case, changing the single piece of state needed.
- If model tests are still slow, he asks whether you are "testing like the TSA." Delete redundant or anemic tests, since a test base needs regular pruning like the rest of the code.

## Outside-in BDD does not fix it

- BDD proponents may say the goal is outside-in rather than testing units. He is "in general far more sympathetic to the goals of BDD."
- But as long as it is done under the test-first regime, it still tends to lead to excessive mocking and artificial boundaries, at least in the usage he has seen in the wild.

## Where to put testing emphasis, and letting design drive tests

- His three-part summary for Rails/MVC:
  1. Test models with intricate logic through model tests, not separated from the database.
  2. Test controllers with integration tests.
  3. Test views through system/browser tests, especially when JavaScript powers the view.
- The emphasis depends on the app. A simple model layer with a complex UI should be system-test heavy and model-test light: "This is not a sin."
- If controllers do little interesting work, they may not need test-driving at all when system tests cover them. With little notable JavaScript, integration tests may be the right place.
- Principle: "you do not let your tests drive your design, you let your design drive your tests." The design points to which MVC layer deserves the most tests.
- Once design is no longer driven primarily by tests, the question changes: "how can I make it better" means "how can I make it clearer, not how can I test it faster or more isolated."
- Closing advice: "The design integrity of your system is far more important than being able to test it any particular layer. Stop obsessing about unit tests, embrace backfilling of tests when you're happy with the design, and strive for overall system clarity as your principle pursuit."
