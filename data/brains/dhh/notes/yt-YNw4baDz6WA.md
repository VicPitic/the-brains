## Programmers who test their own code become overconfident and drop QA

- DHH says TDD was so successful at giving programmers confidence that many shops cut their QA people. Basecamp was one: it only added someone in QA about two years before this 2014 discussion.
- He thinks this gave programmers overconfidence in the quality they can reach through testing. Some then shipped software of lower quality.
- He grants the old model was broken: throwing code over the wall to a QA department you don't care about leaves someone else cleaning up after you. He thinks the pendulum has now swung too far the other way.
- His claim: "I don't think you can work on anything of material quality and produce great software without having somebody who's not you test it."
- A non-programmer tester is valuable because they don't know how you implemented it and aren't thinking about the happy path. They are just trying to break it before users do.
- He is disappointed that exploratory testing and non-programmer testing have drifted out of the conversation.

## A generation that equates quality with green automated tests

- DHH sees a generation of programmers who never knew the 1990s battles. They have only known programmers being responsible for quality, and they read quality as automated tests. He calls that better than what came before, but a shallow understanding of quality.
- Green tests do not show you the real problems. Users upload things you never accounted for.
- His example: nobody reasonable would upload a 2 GB file into a field, but someone will. He had only tested with 5 MB files and never accounted for the back-end processing taking 50 seconds.
- 100% coverage with bugs still shipping produces cognitive dissonance in programmers, because "this is not supposed to be possible."
- Passing your own tests can feel good and become a plateau, so programmers don't see how many levels of quality remain above it.

## Production feedback: customer service and being on call

- DHH treats real-world feedback as part of the feedback loop, beyond the tests you write yourself. It is often ugly, and people don't want to see it.
- A worse failure is when that feedback never reaches the programmers. This happens when customer service doesn't relay "the atrocities that you've pushed out into the world."
- For about 10 years at Basecamp there was an inherent conflict. Programmers didn't want to be on call or deal with customer complaints because it dragged on their work.
- He says that is exactly the feedback loop they need, in the same way TDD once showed programmers how poor their code was.

## Trade-offs: testing has costs, and nobody talks about them

- DHH says the TDD conversation has shown only a positive bar: faster tests, more tests, better tests. Minutes beat hours, seconds beat minutes, milliseconds beat seconds.
- He argues that chasing improvement this way blinds people to the fact that a trade-off means giving up something valuable. The cost can be time, complexity or overhead.
- When he says "testing does damage," some programmers look at him as if the idea were inconceivable. They only see more tests, better tests, faster tests.
- He says you have to understand the drawbacks and what you give up, and decide whether those things are worth giving up.

## Diminishing returns and criticality

- DHH compares test coverage to operations uptime. At Basecamp, reaching 98.5% uptime felt impressive and reaching 99% felt like a milestone. Each step further cost exponentially more.
- Likewise, going from 80% coverage to 99% is far more expensive, and each further nine costs exponentially more again.
- He uses criticality to decide how far to go. NASA launch software or pacemaker software should chase 99.999%. Glue code between services for an exploratory web app should not chase five nines of reliability or coverage.
- He sees a contradiction in holding both positions. You cannot say "we need 100% coverage because that's our design methodology" and also say the trade-off depends on the criticality of the domain.
- He also cannot reconcile the stance that you should never write a line of production code before a failing test with a real cost/benefit trade-off. To him those two don't go together.

## Accepting a quality trade-off deliberately

- Responding to the point that startups can now run without QA, DHH agrees that is fine "as long as" you hold the mindset that you are willfully trading some quality for speed. His version is "run fast, break things, maybe we're not going to be around tomorrow."
- The problem he sees is not the trade-off itself. It is programmers who have internalized programmer testing so completely that they don't recognise the value of anything else.
