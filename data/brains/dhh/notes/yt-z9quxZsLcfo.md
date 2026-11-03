## DHH's definition of unit testing and why isolation is not required

- DHH says that a lot of the trouble he saw in the Rails world around TDD came down to how people defined "unit test". The prevailing definition was: no collaborators, no database, no file system, and a whole suite fast enough to finish "in a blink of an eye".
- He cites arguments that if the entire suite takes more than 300 milliseconds it is "way too slow".
- That definition did not match what he found useful, and he says he "wasn't getting anything useful out of unit tests that weren't talking to any collaborators".
- He separates TDD from unit testing: TDD is often used to drive unit tests, but the two are not the same thing.
- His complaint is aimed at the prevailing, mock-heavy definition promoted by people currently speaking in the programming community. He says it did not come from Kent Beck or Martin Fowler.
- He describes that definition as "very moralistic" about one specific technique for reaching the shared goal.

## Test-induced damage: mocks and architecture

- DHH argues that if you want everything in the suite to be extremely fast, you must talk to mocks and avoid touching many layers at once.
- This pushes you toward a mock-friendly architecture: repositories, hexagonal patterns, and other structures that make it easy to stub your way out of every dependency and turn every test into a unit test.
- Example in an MVC framework like Rails: stub out everything in the controller, talking to the view and the model, and call that great. He did not find it great.
- He calls this "test induced damage": the architecture suffers from the drive to unit test everything, and that drive arrives through the TDD pipe.
- Core fallacy he wants to take "a real big swing at": the idea that a system that is easier to unit test is a better-designed system. He says he saw a lot of code where this was not true. The code was not better, and it was full of "three streets of mock".
- Concrete casualty: people discarded productive patterns like Active Record because they did not fit unit tests that must run in 300 milliseconds, cannot talk to the database, and must be isolated. He says teams "had to throw out all this productive work" to worship at "the altar of a test driven design".
- Higher-priority principles than testability: is the system clear, is it understandable.
- Questions he flagged for the follow-up session: in what ways can a desire to TDD damage an architecture, and how do you evaluate whether hexagonal Rails code is really better than his approach.

## Red-green-refactor as a mandate rather than a preference

- DHH's third concern is the red-green-refactor loop. His issue is personal: it felt "less optional more of a mandate", and he never used it for the bulk of his work.
- On some occasions the flow worked and was good. For a lot of the code he wrote, it "was just not an enjoyable way to do it" and he did not feel he got to a better place by going through it.
- He says writing the test first and watching it fail, for every piece of code before moving on, was not a natural or pleasurable flow, even after getting familiar with it.
- He contrasts brain styles. Some people think by stating the hypothesis first and filling in the implementation. He thinks by writing the code out: "it's a much more tactile experience". He has a hard time writing a test first "if I don't have to see it first".
- He compares this to why some people enjoy Python and others Ruby: people have different ways of looking at things and feeling good about them.
- When TDD flow works for him: work with "a very clear input and a very clear desired output", little environment or context, nearly algorithmic. In that case he actually likes the flow.
- Much of his work is not like that, and the question becomes what he is willing to sacrifice to get the flow. His answer is "I'm not willing to sacrifice that much". Forcing other kinds of programming into that mode leads to "nasty hacks" and "really bad tradeoffs" in code design and productivity.

## Confidence, programmer happiness and self-testing code

- DHH ties programmer happiness (Ruby's mission) to feeling confident in your code, confident making changes, and confident it will work. He says confidence is only one part of that picture.
- He agrees with the early extreme programming rule that you are not done until you also have tests for a piece of functionality.
- The goal everyone shares: confidence about making changes and a self-tested system that runs from a single command.
- His objection is tying that goal to a single path. He is "not a fan of tying oh you deserve to be confident to TDD".
- He describes the community mistake: people believe you cannot have confidence or deliver incremental functionality with tests unless you take the "well-paved road of TDD".
- He objects to the framing in which self-testing code is just a "byproduct", "side benefit" or "leftovers" of driving design through tests. He says that framing is what made it moralistic: talks about whether you are "being professionals" turned on whether you write tests first or second.
- Martin Fowler's distinction, which DHH says he finds helpful: self-testing code (one command, whole system tested, in acceptable time, enabling refactoring with confidence) is the primary benefit, and TDD is one particular technique for reaching it. DHH says the two get conflated and need to be teased apart, and that most people "throw it all into one big pot" labeled TDD.
- He says the community needs "a reboot": TDD should not mean self-testing code plus red-green-refactor plus mocks plus unit testing everything.

## Mocks, trade-offs and the case against mock-heavy suites (Kent Beck and Martin Fowler's positions DHH agrees with)

- DHH asks both guests how much they would sacrifice to stay in the TDD flow, including whether they use heavy mocking.
- He notes that you can reduce any work to pure input and output if you work hard enough at removing dependencies and environment. The mocking approach does exactly that. The question for him is whether the flow is worth that cost as a general case.
- He agrees with the guests' view that there are different schools of thought on isolation versus non-isolated unit tests, and that people have different preferences.
- Kent's and Martin's stated practice, which DHH accepts as consistent with his own: they use almost no mocks. If efficient testing with the real thing is hard, Kent finds another way to build a repeatable feedback loop.
- DHH did not offer his own detailed rule here beyond rejecting mock-heavy design and the unit-test-everything paradigm. His position is trade-offs: do not warp the design to make code testable.

## Mixed practice and where TDD fits for DHH

- DHH is clear he is not against testing. He is against the claim that one flow and one style of unit test is the only legitimate way to get there.
- His stated positions across the discussion:
  - Tests alongside the code from the start are right. The early XP rule of not done until the tests exist and pass is something he is "completely on board with".
  - TDD is one path to confidence, not the path.
  - Use the TDD flow where the work is algorithmic and well specified. Do not impose it where the work is entangled with environment, data and framework.
  - Do not drive architecture from testability, since doing so produced worse code in the Rails examples he cites.
- He says the aim of the series was to clarify definitions. He did not want a "Duke out", and he found he and the guests were "at the same page" on much of the substance.
- Agenda for the next installment, as he framed it: how TDD can damage an architecture, and whether the hexagonal-style Rails code its advocates prefer is really better.
