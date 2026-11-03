## Building a `partial`-style fixture helper to replace `as` in TypeScript tests

Matt's problem: tests often need to pass less than a function's full type, which forces `as` casts. In the stream he works on a small library (repo "test utils", renamed later to "mock utils") to fix this with a type-safe alternative.

Matt's example: `type User = { id: string; name: string; reports: ... }`, and a function `(user: User) => ...` that only reads `user.id`. To test it you'd normally build the whole object or cast. Cast-based test data is the thing he wants to avoid.

The API he demonstrates:
- `fromPartial(...)`: you pass a deep partial of the expected type and it is accepted where the full type is expected. Nested objects (e.g. `reports` inside `User`) can be partial too. He notes it "looks at the expected type of the parameter" and satisfies that, "reversing what TypeScript usually does in that position".
- `fromAny(...)`: accepts anything. Less safe, for cases where you really need to pass off-type data.
- `fromExact(...)`: acts like an identity function and forces the exact type, so you must pass every required property (e.g. `reports`).
- `createMock` (earlier `createBase`): defines a reusable base fixture for a type, with `fromPartial`-style overrides. Example he builds is a `Request` from node where only `body` is set.
- Nothing generates fake data. The helpers only make the data you pass type-acceptable. "This is exactly the same as `as User`" at runtime, but more palatable and ergonomic.

## Why `as` feels bad, and why a helper is justified

Matt works through why `as` is the wrong tool here:
- It "doesn't indicate intent" and "feels like a hack"; developers are trained not to use it.
- You must manually write out the target type. With `fromPartial` the type is inferred from the slot you pass into.
- He explicitly asks whether a library should exist just because you dislike a syntax. His answer: people ask him "all the time" how to solve this problem, and he'd have found it useful himself.
- A commenter noted `fromPartial` feels closer to `satisfies` than `as`, which Matt agrees with. He also says that if you're going to trick the compiler, it's good to be explicit about that.
- He notes the pain-point survey result: when he asked people what hurt about testing in TypeScript, they said this should be fixed.
- He mentions Zod-based mock generators (zod-mock) as a good tool when you do want generated data from a schema.

## Naming discussion

Naming takes a large part of the stream, and Matt treats it as a core design problem.
- Candidates for the creator function: `createBase`, `createMock`, `createFixture`, `createScaffold`, `createPartial`, `stub`, `fake`, `core entity mock`.
- Why not "mock"/"stub": they imply behavior (mocking a class or endpoint), and he is not mocking behavior, only supplying dummy data. "Fixture" fits dummy data better, which pushes him toward it; he ends up changing the README and code to `createFixture`.
- He liked the names `fromAny`, `fromPartial`, `fromExact`, and kept them.
- A commenter pointed out that Cypress already has a fixture function.
- He dislikes generic names, wants a "boring" package name, and rejected naming it after himself. The package ends up as "mock utils" (he jokes about "mocky tills") and he says he is not calling it `faux` or `poMock`.
- A viewer's remark that he'd drop the underscored `_base` private concept led Matt to remove it, since he didn't need it.
- Reference point: Zod's naming (`z.object`, `z.string`) works well because the concepts are already familiar, and he compares it to tRPC's "procedures". He recalls that naming dominated his work on XState: "90% of it was picking the names of stuff".

## Experiment: Proxy-based runtime safety (and why he shelved it)

A viewer suggests the fixture could be a `Proxy` that throws if a test accesses a property it didn't define. Matt calls this "a genius idea" because it adds runtime safety on top of type safety, and he'd never used `Proxy` before.

What he tried:
- Test: `fromPartial({})` passed to a function that reads `input.id` should throw.
- `new Proxy(target, { get(target, prop, receiver) {...} })`, throwing when `prop` isn't in the mock.
- Problems hit when used with Vitest's `toEqual`: it probes properties such as the symbol iterator and `$$typeof`-style checks (a viewer found `nodeType`/`asymmetricMatch`), causing "not found" throws. He tried ignoring symbols and adding `ownKeys`/`has` traps (suggested by chat) with limited success.
- A viewer later identified the culprits as property names Vitest's equality code accesses. After the first hour Matt returned and added a `protectedKeys` list (including `asymmetricMatch`-style keys) that the proxy lets through. That made the test pass.
- Recursion: he then wrote a failing test for nested access (`input.foo.id` should also throw) as the next step.

At the first stop he commented the proxy code out so he could ship, and said the proxy idea "feels funky" because it risks making tests fail for strange reasons. Later he re-enabled it with the protected-keys fix and opened a PR titled roughly "add proxy behavior to fromPartial".

## Shipping a small TypeScript library: the checklist

Matt walks through his setup (this is the third time he's done it on stream):
- Turborepo monorepo, so `pnpm turbo dev|build|lint|test` runs everything.
- CI (GitHub Actions): checkout, set up pnpm, set up Node with pnpm cache, install, run `lint build test` through Turbo. The whole CI run took about 15 seconds.
- Release workflow using Changesets: a `publish` workflow runs a `release` script (Turbo build, lint, test, then `changeset publish`). `changeset init`, set `access: public` in `config.json` (he forgot this last time), and add a first patch changeset.
- Repo settings: allow GitHub Actions to create pull requests, and add an npm token as a repo secret (a granular access token with read/write rights).
- Merging the generated "version packages" PR publishes to npm.
- First publish failed because the workflow wasn't passing `NPM_TOKEN`; after fixing that it published. He then fixed `.npmignore` so the package didn't ship `.github` or the changelog.
- He prefers Vitest ("what the industry is moving to"), and likes small helper libraries rather than maintaining large ones.
- He uses Changesets over semantic-release because a former colleague used it; he hasn't tried semantic-release.
- A GitHub Actions VS Code extension gives autocomplete for workflow files.

## Opinions on tooling mentioned in passing

- Monorepos: "they're great"; he used to be developer advocate for Turborepo, which solves scheduling and caching.
- Turbopack: he was on the team that shipped it and wrote its initial docs. It is a webpack-level bundler where the Turbo engine caches the result of every function (read file, bundle, concatenate) and parallelizes across cores, so a change to one file only recomputes that part. He predicts Vite will eventually use Turbopack, but says he has no inside information.
- Wallaby/Quokka-style live test runners: he's not sure about them since the Vitest and Jest versions "never quite work as well as I want".
- Mutation testing (Stryker): mentioned but he gave no verdict.
- He thinks TypeScript will always compile to JavaScript and won't become the base language of the web.
- On library authoring in TypeScript: "not pretty from the library side"; conditional types in particular show TypeScript is "still early on" in what it wants to be.
- His own video workflow: roughly 25 minutes of footage cut to 5 using a script that drops OBS output into DaVinci Resolve with silence-cutting, about 1.5 hours end to end. He also mentions a CLI he wrote ("Matt CLI") that wraps the GitHub CLI with custom prompts, open source in his repo.
