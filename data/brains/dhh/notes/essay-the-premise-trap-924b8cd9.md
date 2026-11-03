## The premise trap in collaboration

- The hardest part of working with junior programmers, in open source or at work, is avoiding the "premise trap".
- The trap is when the fundamental assumptions baked into the first draft of the code go unquestioned until far too much time has been spent improving the implementation.
- DHH sees the same dynamic with AI: it is "like a superb junior programmer", with encyclopedic knowledge of syntax and APIs but the same tendency toward overly-complicated, subtly-defective solutions.
- The fix is to question the premise of a draft early, before polishing the implementation.

## What AI-written code looks like today

- DHH has yet to see any AI model he has used over the past year produce great code in domains he knows very well.
- There are occasional glimmers, as with promising juniors, but taken as a whole the solutions almost always need material rework, and that is when the premise trap "claps".
- The same problems show up in both Ruby and JavaScript output, so he doubts it is specific to one language.
- Recurring problems:
  - Pulling in needless dependencies.
  - Overly-verbose presentation.
  - Architectural dead ends.
- He hears the same from non-programmers using AI to build whole systems: a prototype appears in minutes, which is "an incredible rush", but getting it to something reliable becomes a one-step-forwards-two-steps-backwards dance. He compares it to getting catfished by a barely qualified junior on Upwork.

## Why the models write mediocre code

- The training data is the cause: endless basic online tutorials, simplified Stack Overflow answers, and the fact that a fair chunk of internet programming content is made by "the blind leading the blind".
- Senior human programmers started on the same information diet.
- They moved up to mastery by working on proprietary code bases, where the trade-offs absent from tutorial-style code reveal themselves and demand to be weighed "with finesse".
- DHH thinks the next big leap under the current paradigm probably won't come until models are exposed to a vast corpus of proprietary, corporate code. How that would happen is not clear to him.

## How senior programmers should use AI

- Treat AI as you would a junior programmer.
- It is rarely going to save time to ask it for an entire system, or even a subsystem, if you care about the final quality of the architecture or implementation.
- Verifying the assumptions baked into its approach takes as much time as understanding the choices would if you did the work yourself.
- This is the premise trap applied to AI: reviewing and reworking a flawed foundation costs as much as building it right.

## Staying bullish without lowering standards

- He reads the junior-programmer parallel as potentially bullish: AI may follow the human progression tree and graduate to senior-level competence in code aesthetics, novel problem reasoning, and architectural coherence. He hopes so.
- He remains bullish on AI writing code for everyone, but realistic about its current abilities.
- Risk to watch for: senior programmers, himself included, being lured into signing off on slop.
- Leaning too much on AI writing code for you, rather than teaching it how, saps stamina for continued learning.
- He closes with: "May this piece age badly within a few short years!"
