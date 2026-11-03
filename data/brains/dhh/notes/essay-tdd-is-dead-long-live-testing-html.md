## Why DHH stopped writing software test-first

- DHH credits TDD for opening his eyes to automated regression testing and the "tranquility of a well-tested code base" and the confidence it gives people changing software.
- He treats test-first as "training wheels" that taught him to think about testing at a deeper level, which he quickly left behind.
- Over the years he watched the test-first rhetoric get "louder and angrier" and more mean-spirited. He compares test-first fundamentalism to abstinence-only sex ed: "An unrealistic, ineffective morality campaign for self-loathing and shaming."
- He describes a yoyo cycle: he would try test-first for a few weeks, feel pride when he followed it, then drop it when it started hurting his designs, and feel despair, like "falling off the wagon."
- He regrets that in public he only alluded to not doing test-first, or even kept supporting it as "the right way."
- His declaration: "My name is David, and I do not write software test-first." He refuses to apologize for it or hide it.

## TDD as a litmus test and identity

- DHH suggests test-first may have been a counterintuitive ram to break down the industry's "sorry lack of automated, regression testing," or a parable never meant as a literal description of day-to-day software writing.
- He argues it was soon corrupted into a hammer to beat down nonbelievers, declare them unprofessional and unfit to write software, and used as a litmus test.
- TDD was so successful that it is woven into programmer identities: "TDD is not just what they do, it's who they are."
- He expects "serious deprogramming" ahead for the community, and says it will take time.
- Rather than dance on its grave, he prefers to honor test-first's contributions as an important phase in history, then move on.

## What test-first does to system design

- DHH says to take a hard look at what test-first does to the integrity of your system design, and that honestly considering it is "not an unqualified good" is like taking the red pill.
- The design justification for test-first is that unit tests drive code design. That pushes a primary focus on unit tests.
- To keep unit tests fast, people avoid anything "slow": the database, file IO, or going through the browser to test the whole system.
- The result is an overly complex web of intermediary objects and indirection. He calls some of the architecture "truly horrendous monstrosities": a "dense jungle of service objects, command patterns, and worse."

## How DHH tests Rails applications

- He rarely unit tests in the traditional sense, where all dependencies are mocked out and thousands of tests can finish in seconds. He says it has not been a useful way to test Rails applications.
- He tests Active Record models directly, letting them hit the database, using fixtures.
- On top of that he has a layer of controller tests, but he would rather replace those with higher-level system tests through Capybara or similar.

## Rebalancing the testing spectrum toward system tests

- Step one is admitting there is a problem; step two is rebalancing the testing spectrum from unit to system tests.
- The direction he sees: less emphasis on unit tests, since test-first is no longer a design practice, and more emphasis on slower system tests.
- He notes system tests no longer need to be so slow, thanks to advances in parallelization and cloud runner infrastructure.
- At the time of writing, Rails had no default answer in the stack for full system tests. He called that "a mistake we're going to fix," and suggested trying Capybara in the meantime to see where Rails was heading.

## Avoid replacing one testing religion with another

- DHH warns against rushing into another testing religion and imagines the golden calf of 'system tests only!'. He says: "Please don't go there."
- His closing line: "Long live testing." The point is to keep testing and drop the dogma that test-first is the one true design method.
- He points readers to James Coplien's "Why Most Unit Testing is Waste" and to his own RailsConf keynote on Writing Software (Parts 1 and 2) for more.
