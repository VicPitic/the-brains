## Why DHH thinks system tests have failed

- DHH introduced the default system test setup in Rails 5.1 in 2016 with "high hopes". The theory: tests that drive a headless browser through the real interface give more confidence that the whole machine works, and as black-box tests they should survive implementation changes.
- In practice he has found none of this true. System tests "remain as slow, brittle, and full of false negatives as they did a decade ago."
- His bottom line: "I've wasted far more time getting system tests to work reliably than I have seen dividends from bugs caught." Most of the time they are no longer worth the effort.
- He gives several reasons for the malaise:
  - Browsers are complicated.
  - UI driven by JavaScript is prone to timing issues.
  - Working out WHY a black-box test failed is often surprisingly difficult.

## What automated testing is for, and why system tests don't serve it

- DHH says we automate testing for three reasons: a quick feedback loop on changes, catching regressions, and most of all, becoming confident that the system works.
- These goals are valid, but he argues system testing is not the best way to fulfill them.
- Business logic is better and more cheaply tested with model and controller tests, not system tests.
- The sticky problem is testing UI logic, which means testing JavaScript. He says he is "not sure we're there yet on the automated front."

## What to keep: a small top-level smoke test

- DHH is not saying to throw out every system test. He says to cut "probably most of them."
- System tests work well as a top-level smoke test. Their end-to-end nature tends to catch not domain model or business logic problems, but a configuration or interaction problem that stops the system from loading at all.
- Catching that kind of failure early and cheaply is good.

## Human tests beat automation for UI logic

- The method that gives DHH the most confidence that UI logic is good is not system tests but "human tests": literally clicking around in a real browser by hand.
- Half the time, UI testing is not only "does it work" but also "does it feel right". In his words, "No automation can tell you that."
- He recommends embracing the human element of system testing (linking 37signals' piece on the value of human exploratory testing).
- He leaves open that AI might take over this task one day, but says "as of today, I think we're better off dropping the automation."

## Applying it at HEY: cutting 300-odd system tests

- HEY has some 300-odd system tests today. 37signals is doing a "grand review" to cut that number way down.
- DHH says the sunk cost fallacy kept the team running "this brittle, cumbersome suite for too long."
- The plan is to cut losses and reduce system tests to a much smaller part of the confidence equation, leaning on model and controller tests for logic and manual exploration for UI behavior.
