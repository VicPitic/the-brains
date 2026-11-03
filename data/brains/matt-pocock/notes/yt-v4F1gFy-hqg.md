## Deep modules beat shallow modules for AI-friendly, testable codebases

- Matt draws on John Ousterhout's *A Philosophy of Software Design*: a bad codebase is a complex one, meaning anything in the structure that "makes it hard to understand and modify the system." Good codebases are easy to change.
- He prefers relatively few large, deep modules with simple interfaces over many shallow modules.
  - Deep module: lots of functionality hidden behind a simple interface. You can look inside if you want to, but you don't need to.
  - Shallow module: little functionality behind a complex interface.
- AI is "really good at creating codebases" full of shallow modules (many tiny blobs), and those are hard for it to explore. It may not reach the right module in time or may miss dependencies, so it doesn't understand what the code does.
- Matt's fix is a reusable skill, "Improve codebase architecture": explore the codebase, look for related code, and wrap it in a deep module.
- Deep modules are testable because the boundary is simple. You test and verify at the interface, which makes the codebase "reward" TDD.
- Matt says good codebases are easy to test, so the better the codebase, the better the feedback loops, and the better the code the LLM produces.

## Design the interface, delegate the implementation

- Shipping more code than ever leaves Matt's brain unable to keep up. He says he's more tired than ever in his development career, and a codebase of shallow modules makes it worse because both he and the AI must hold everything in their heads.
- With deep modules he treats each one as a "gray box." He designs the interface carefully, controls it closely, and leaves the implementation to the AI, with less review of the internals.
- He caveats this: it works for less critical modules, not for things like finance.
- Conditions he sets: a testable boundary outside the module, and understanding its purpose well enough to design it from the outside.
- His summary: "Design the interface, delegate the implementation." He says this saved his brain.
- He needs to know the module map really well. It should be part of the ubiquitous language and built into planning skills. His write-a-PRD skill specifies module changes and how each module's interface is modified.
- He cites Kent Beck: "Invest in the design of the system every day."

## Why specs-to-code fails and why code is not cheap

- Matt describes the specs-to-code movement: write a spec, have AI generate code, and when something is wrong, edit the spec and re-run the "compiler" without looking at the code.
- He tried it. Each re-run produced worse code, ending in garbage. He calls it "vibe coding by another name."
- He ties this to software entropy from *The Pragmatic Programmer*. If every change considers only that change and not the whole system's design, the codebase gets worse and worse.
- He rejects the premise that "code is cheap." His view: "bad code is the most expensive it's ever been." A codebase that is hard to change can't capture what AI offers, while AI does very well in a good codebase.
- His thesis: good codebases matter more than ever, so software fundamentals matter more than ever.
- Specs-to-code divests from system design, while he wants to invest in it.
- His model of roles: AI is a tactical programmer, "a sergeant on the ground making the code changes." Someone must think at the strategic level, and that's the human. It requires fundamentals engineers have used for 20+ years.

## Failure mode: the AI didn't build what I wanted (Grill Me)

- Cause, per *The Pragmatic Programmer*: no one knows exactly what they want, and there is a communication barrier between you and the AI. The AI's conversation with you is its requirements gathering.
- He cites Frederick P. Brooks' *The Design of Design* and the "design concept": the ephemeral, invisible theory of the thing being built that floats between collaborators. It isn't an asset or a markdown file. When AI goes wrong, he and the AI don't share a design concept.
- His skill, "Grill Me": "Interview me relentlessly about every aspect of this plan until we reach a shared understanding. Walk down each branch of the design tree, resolving dependencies between decisions one by one."
  - A few lines make the AI ask 40, 60, or even 100 questions, turning it into an adversary.
  - The skill's repo has around 13,000 stars.
  - The resulting conversation can become a PRD, or for small changes, issues directly, which an AFK agent then picks up.
- He believes it's better than the default plan mode in Claude Code, which is "extremely eager to create an asset" and start working. He prefers reaching a shared design concept first.

## Failure mode: the AI is too verbose (ubiquitous language)

- Verbosity feels like talking at cross-purposes with the AI. It resembles a developer working with a domain expert (his example: microchips) when no shared vocabulary exists, so terms get mistranslated into code neither side understands.
- Matt turned to domain-driven design (DDD), which he's still exploring but says is "music to my ears." Its concept is the ubiquitous language: developer conversations, code, and domain expert conversations all derive from the same domain model.
- In practice it's a markdown file listing the terms you and the AI share. Use those terms consistently in code, in talking about code, with domain experts, and with AI.
- His skill: the "ubiquitous language" skill scans the codebase for terminology and generates a markdown file of tables. He passes it to the AI and keeps it open himself while grilling and planning.
- Reading the AI's thinking traces, he found it improves planning, lets the AI think less verbosely, and makes implementation align better with what was planned. He calls it a "powerhouse."

## Failure mode: it built the right thing but it doesn't work (feedback loops and TDD)

- Obvious fixes: static types ("if you're not using TypeScript, that's crazy"), giving the LLM browser access for front-end apps, and automated tests.
- Even with these loops, LLMs use them badly compared to a veteran developer. They produce a huge amount of code, then think to type check or run a test afterward.
- *The Pragmatic Programmer* calls this "outrunning your headlights." The rate of feedback is your speed limit, so take small deliberate steps and test as you go.
- His third skill: TDD. It forces the LLM into small steps: write a test, make it pass, then refactor with design in mind.
- Testing has always been hard because of interdependent decisions: unit size, what to mock, which behaviors to test. A very large unit may be flaky, and testing one unit means mocking another.
- His conclusion from years of thinking about it: good codebases are easy to test, which leads to deep modules.

## Where to find his skills and training

- The skills are in his GitHub repo, mattpocock/skills (spoken as "macpocockskills" in the transcript).
- He teaches a course on Claude Code for real engineers, and also publishes on YouTube, on Twitter, and at aihero.dev, where he has a newsletter.
