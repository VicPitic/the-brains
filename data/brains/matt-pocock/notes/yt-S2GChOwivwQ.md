## Why Matt thinks you should learn Effect, and how he got there

- He had been asked for about 18 months whether he likes, uses or recommends Effect. After actually trying it, he concludes "I think you should learn effect."
- He calls it "maybe the most TypeScript of all TypeScript libraries".
- It maximizes type safety, including type-safe errors, and makes code more composable, reusable and testable.
- He thinks of it as a backend-oriented framework for robust applications. It can technically run on the front end.
- He lists three odd properties: unreadable syntax, a batteries-included framework, and an enormous learning curve.
- He says: "Personally, I feel like I'm writing some of the best code in my career using effect."

## The syntax: ugly, but treat it like a separate language

- Effect code uses generators. `Effect.gen` takes a generator function, and `yield*` resolves other effects (for example fetching a transaction amount and a discount rate, then yielding a calculation effect).
- Matt admits his first reaction was horror, and says viewers will feel the same.
- His analogy is Tailwind: long, ugly class names that turn out to be nice to use once you write them.
- The "disgusting syntax" enables "TypeScript magic that I have never seen from any other library".
- He suggests thinking of Effect as a separate language that still works with normal TypeScript tooling: Prettier, TypeScript, ESLint.

## Type-safe errors tracked across the whole call stack

- His first use was in his work monorepo, in audio and video workflows.
- In his demo, `extractAudioFromVideo` is an `Effect.fn` taking a file name. If the file name doesn't end in `.mp4`, it doesn't throw. It does `yield*` on a custom error, `IncorrectFileNameError`, which has a name and custom attributes.
- Hovering the function shows an Effect type that tracks the success type (a string) and the possible errors (only `IncorrectFileNameError`).
- Errors propagate to callers. A workflow that calls `extractAudioFromVideo` and `AI.transcribeAudio` ends up typed with `IncorrectFileNameError | TranscribeAudioFailedError`.
- This works over "a potentially infinite call stack".
- Handling errors:
  - Pipe into `Effect.catchTag`, which only catches the named error. Autocomplete shows the remaining options.
  - In his demo he logs `error.message` and resolves the failure as a success. He notes you can handle it any way you want.
  - He can move the same handling up into `extractAudioFromVideo`. It acts like "a type-safe try catch", and the handled error disappears from the resulting Effect type.
- He says homebrewed Result types he has built "haven't felt as flexible as effect", and the difference is "night and day". He may make a video comparing his homebrew version with Effect's error handling.

## Dependency injection is what beat Neverthrow for him

- Neverthrow, a library for type-safe error handling, could imitate some of Effect's error handling. For a long time he asked "can I just do this with Neverthrow?" He changed his mind after seeing Effect's dependency injection.
- Services are classes that extend `Context.Tag`-style definitions. His demo `AIService` has one method, `transcribeAudio`. It fails half the time with `TranscribeAudioFailedError` and otherwise returns a fake transcription.
- Inside a workflow, `yield* AIService` gives access to the service.
- The third type parameter of `Effect<A, E, R>` tracks requirements. Hovering the workflow shows `AIService` there, and removing the code that uses it reverts the type to `never`.
- If you pipe to `Effect.runPromise` without providing the dependency, you get a compile error: "type AI service is not assignable to type never".
- Providing implementations:
  - `Effect.provide(AIService.Default)` supplies the default implementation (you can cmd-click through to it).
  - `Effect.provideService(AIService, ...)` supplies a different one, for example a mock that always succeeds.
- Running: call `Effect.runPromise` or `Effect.runSync`.
- Benefits he describes:
  - Code is modular and easy to test.
  - In a relatively simple local app he has defined about 30 services. He can test them independently, mock them in tests, or run integration tests across several.
  - Effect generators let him focus on business logic, which makes it trivial to test.
  - His flow is to write the business logic first, creating "typed holes" in the app that he implements later.
- He says this DI story is what "takes it over the top of rivals like Neverthrow", along with being fully type-safe end to end.

## The batteries: what you get for the investment

- He says Effect is "a big fat batteries included standard library", not a lean core.
- Features he names:
  - Resource management.
  - Observability: `Effect.fn` wraps code in an OpenTelemetry span automatically, exportable to a trace viewer. He spots a mistake in his demo, where the span name should be `extractAudioFromVideo`, because the span takes its name from that string.
  - Type-safe access to process environment variables through config.
  - A cron module for scheduling.
  - State management, batching and caching.
  - Concurrency through a fiber model. It is like working with promises (such as `Promise.all`), but errors and dependencies stay tracked.
  - Streams, which he hasn't dived into.
  - Testing with test clocks.
  - Data types such as Either, Exit, Option and Cause.
  - A full schema validation library.
  - Pre-made solutions for common application designs such as APIs.
- His point is that investing in Effect gets you pre-made solutions to hard problems.

## Objections: functional programming, Rust, and incremental adoption

- **"Isn't this functional programming?"**
  - He says "technically yes, but hell no."
  - He thinks FP is "so burnt out as a brand" that it shouldn't describe anything.
  - He finds the FP community "pretty gatekeepy" and maths-driven in ways he can't connect with.
  - Effect is technically a monad, but "you won't find the word monad at all in effect docs". He agrees with the docs consciously moving away from FP branding and language.
- **"Why not write your program in Rust?"**
  - You could, if you accept longer compile times and a harder learning curve for a faster program.
  - He thinks TypeScript has space for a library tackling these problems.
  - The case: a team with a hardcore backend project and only TypeScript developers can train them on Effect instead of hiring Rust devs, and end up with "a pretty decent code base". He sees that as where Effect shines.
  - He says the TypeScript ecosystem is "the best in the world in my opinion", and Effect users get it for free.
- **Incremental adoption**
  - The more Effect in a system, the better, since error handling inside that blob is type-safe.
  - You can also have smaller type-safe blobs.
  - Running non-Effect code from inside Effect is easy. Legacy code and non-effectful external libraries can sit in contained areas.
  - He says the adoption story is "actually really good" and much better than it would be with Rust.
