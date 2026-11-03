## Why DHH rejects the "computer scientist" self-image

- DHH learned to program around age 20, about 3 years before he released Rails. He argues the you must have programmed for 10 years idea is a myth: "Turned out fine."
- He tried to learn programming three or four times (typing in magazine programs at 6, AMOS and Easy AMOS, assembler after the 1993 demo party at The Gathering) and failed each time because it was framed as computer science and hard science.
- He got an F on his high school math final and says math and physics never appealed to him. He credits this with "inoculating" him against believing he would discover algorithms or make low-level breakthroughs.
- What he wanted to build was information systems: tools, to-do lists, social networks. He says most programmers do the same and are nothing like Linus working on the kernel.
- He calls the computer science prism harmful for information-system work. A Steinway maker is not a great pianist, and a great computer scientist is not automatically a great writer of information systems.
- Picking heroes who are nothing like you "sets yourself up for a bad time for the whole ride."

## Software development is closer to French poetry than physics

- DHH says most programs read like 17th century French poetry or forensics: subjective interpretation of what someone meant, not empirical truth.
- He calls "laws" such as the Law of Demeter pseudoscience when presented as universal truths about good programs, with the only debate being professional versus amateur.
- Believing you can discover laws of programming lulls you into treating certain practices as beyond debate.
- He rejects the claim that programmers working on subjective material can sneer at other subjective fields.

## Software methodologies are like diets

- Diet books are among the most popular books on Amazon because people want to be told how to cheat the basics. DHH says software developers behave the same way.
- Diets rest on anecdotes, tiny sample sizes and uncontrolled variables, yet each announces an absolute truth (the 10-day green smoothie cleanse, the super shred diet).
- Most people feel a bit insecure about their body at some point, and most developers feel insecure about their code. That makes them ripe for someone to say "your code is dirty, you are an amateur, I have the path to clean code."
- This "hits a lot of people right in the imposter plexus."
- The real answer is boring and hard, like diet and exercise: read a lot of code, write a lot of code, aim for clarity.

## Why DHH rejects test-first design (TDD)

- He calls TDD "the most successful software diet of all times." He tried it multiple times, felt guilty about it for a long time, and never saw better code come out when tests drove his design.
- For years he assumed he was doing it wrong. His point: "Just because everybody's doing TDD wrong doesn't mean that there's not anything wrong with TDD."
- TDD's principles are about test-first design, not about having tests. Having tests is just a side benefit.
- The measure of quality in TDD, he says, is whether code is easier to test. He calls that a poor measure with much higher ideals available.
- Kent Beck is quoted approvingly: "I get paid for code that works, not for tests. So, my philosophy is to test as little as possible to reach a given level of confidence." DHH thinks Kent's current view is more sensible than what most TDD advocates run with.

## Code examples where testability makes design worse

- **Person#age**: the original uses `Date.today` directly and the test uses `travel_to` to stub the date, which is easy in Ruby. The "shaped up" version injects the date as a parameter with a default of today. DHH says it is easier to test but not simpler or clearer.
- Injecting the dependency down through several methods muddies the code further. He says arguing it's only one dependency is exactly the thinking that leads down a nasty path.
- **Rails controller**: a standard controller depends on a before action for permissions, builds an object, sends an email and responds. It directs the world, so it is hard to unit test in isolation. Extracting a `PersonCreationCommand` and injecting everything makes it testable, but he asks whether it is clearer for understanding what the system does.
- He compares this to Struts 1.2, where each action was its own object. They were easy to test and produced a million objects, so the system was harder to reason about. He calls the results zombie astronaut architectures.
- Same pattern with Active Record: pushing logic out so models are just data access objects, so tests are simple and fast, puts "test, test fast, oh, your architecture" in the wrong order.

## Test at a coarser level: models, controllers, and especially systems

- DHH quotes James Coplien's white paper "Why Most Unit Testing Is Waste": "Splitting up functions to support the testing process destroys your system architecture and code comprehension along with it. Test at a coarser level of granularity."
- He is not against tests. He is against deriving design from unit tests. Regression tests after the fact are valuable.
- Rails already moved up a level: the directory is `test/models`, not `test/unit`, so model tests touching the database are not a problem. "You can make anything fast if it doesn't have to work."
- Basecamp lost real customer data (attachments lost when editing an object and its attachments) while being heavily unit tested at the unit level. All tests passed because there was no system test for that flow.
- Most TDD proponents focus on units where they drive design and little on the system level, which is what people care about: "Does the whole thing work?"
- Fixtures: people hate them when they want to isolate one unit, but fixtures spin up a small world and work well when you test at the level of models, controllers and systems.
- He still writes test-first occasionally, for example for a translator where input and desired output are clear. Most information-system design is not like that, because he is still working out what the system should do.

## Coverage, test ratio and speed are the wrong scoreboard

- In arguments on Hacker News and elsewhere, he finds people judge design almost only by test coverage, test ratio and test speed.
- A 1:4 ratio (four lines of test per line of production code) makes the system five times as large and five times as complex to reason about. He asks why that is a point of pride.
- Fast suites with 100% coverage often test little of the system. Decoupling to isolate tests from HTML and the database adds indirection, and "this decoupling is not free" because of conceptual overhead.
- Why people cling to these metrics: they come from the engineering and hard-science prism, and they are easy to measure to six decimals. He cites the quote that something being easy to measure does not make it important.
- Cost is not value: people who invested heavily in testing defend it, but expensive and time-consuming does not mean valuable.
- Aaron Patterson trolled him at dinner with "TLDR, just don't test." DHH's reply: regression testing has value, test-first design rarely does.

## Write software like a writer: clarity above all

- DHH says "software writer" is a more apt identity than "software engineer" for most of the work: adding features to Basecamp, doing forensics on bugs, reading a plug-in. He wears the engineering hard hat only for performance work (change, measure, keep or revert).
- Clarity means being succinct without being terse, using the smallest words and least conceptual overhead that get the job done. Convolution gives no bonus points in writing and should not in code.
- Putting clarity above testability settles many arguments. It is liberating: complaints that Active Record is too big or has too many methods stop mattering. "Is it more readable? Is it more clear? That's the only thing that matters."
- Ruby's `unless` was his lightbulb moment: it duplicates `if not` purely for readability.
- Clarity has no metric. "I know it when I see it." You develop an eye the way he did in photography after thousands of photos, by doing it a lot, not by memorizing patterns.
- To develop it: decide clarity matters first, then read a lot of code and write a lot of code.

## How DHH builds the eye: read code, rewrite code, delete

- When starting Rails he read the entire Ruby standard library, partly because documentation was poor. Today `bundle open <gem>` opens any gem in the editor, and he encourages reading complete gems you did not write.
- By Sturgeon's Revelation, 90% of code is crap, and reading poor code teaches him the most about what clarity is. He rewrites bad classes and methods to find out what he cares about.
- In the code-submission arguments he has had online, applying three patterns to a poor piece of code usually just moved the same code into different boxes. The code was missing a rewrite, not patterns.
- "I didn't have time to write a short letter, so I wrote a long one instead" describes much bad code. Any first version is a draft.
- A high school teacher told him that if you wrote it down, you should rewrite it. He says most people skip that step with code.
- Rewriting means omitting needless concepts, patterns, practices and classes. The delete key is his "number one tool for improving code."
- His closing advice: forget about patterns and TDD for a while, focus on the code in front of you, and ask how to write it simpler.
