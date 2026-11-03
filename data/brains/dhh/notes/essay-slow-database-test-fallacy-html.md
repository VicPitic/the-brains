## Slow database tests are a 1990s heuristic

- DHH rejects the TDD rule that a "unit test" must not touch the database or other external interfaces like the file system. The rule was justified by speed, and that justification no longer holds.
- It was probably true "in 1997" when tests connected to a mainframe database or "some Oracle abomination". In 2014 you can run MySQL or PostgreSQL locally off a fast SSD, and nearly every development machine has lots of RAM, an SSD and a fast CPU.
- General principle: heuristics adopted in one era of computing do not necessarily apply in the next. Anything based on a definition of "slow" should be revisited frequently, because "sound lessons can turn unsound very quickly".
- Avoiding the database in tests is far from free in most MVC systems. It needs extra indirection and layers that scar the code base and hurt clarity (see his "test-induced design damage" essay).
- That damage may have been worth it when a full database-hitting suite took hours. It is not worth it when the suite takes a few minutes.
- His advice: "Don't pervert your architecture in order to prematurely optimize for the performance characteristics of the mid-nineties." Embrace modern hardware and keep a code base "unharmed by test-induced design damage".

## Basecamp test suite numbers

- All Basecamp model tests run in 80 seconds: 3333 assertions, all hitting the database, all going through Active Record, all using Rails test fixtures.
- The entire suite runs in 4 minutes 30 seconds. It includes controller and integration tests that also go through the database and fixtures.
- That suite has a 1:1 test:code ratio.
- These figures are the evidence that a database-backed suite is fast enough for a good feedback cycle.

## Run only the tests for the code you changed

- Anticipated objection: 80 seconds is too long to wait after every model change. DHH's answer: nobody should run the whole harness for every line change in a model.
- He runs just the suite for the model in question.
- If you have so little confidence in the locality of your changes that you must run everything each time, "the tests are indeed telling you that the system has overly high coupling".
- Run the full 80-second suite when the feature is ready to check in, or when taking a break, to make sure nothing broke in a far-away model.
- Combined, the two modes (targeted while working, full suite before check-in) give confidence to change things "without the anxiety of breaking stuff left and right". He says that is "the true power of testing".

## Spring and persistent test processes

- For large Rails apps, running a single model's tests used to be painful because Rails booted the whole application each time. Basecamp took about 5 seconds to boot, which was enough to be annoying.
- Rails adopted a persistent test process through the Spring preloader.
- He compares reloading the whole application and framework on every test run to CGI: it was a bad model for any complicated web application, and it is a bad model for running tests.
- With Spring, the entire test suite for the Basecamp Person model (52 cases, 111 assertions) runs in just under 4 seconds from start to finish. He calls that plenty fast for a great feedback cycle.

## Why fixtures are fast: transaction rollback

- Part of the speed comes from Rails test fixtures. Default Rails fixtures are reset per test case so each case runs in isolation, but this is done with a transaction wrapper.
- Before each test case: BEGIN TRANSACTION. At the end of the case: ROLLBACK TRANSACTION.
- DHH calls this "crazy fast", with no setup penalty per test.
- He lists fixtures as a "killer Rails feature" and one reason hitting the database in every test stays cheap.
