## Where Matt says to use Zod: validate by how much you trust the input

Matt frames the decision around the inputs to an app: points where data is injected and is unknown at runtime. His rule is a three-way split by trust and control:
- Inputs you don't trust: use Zod.
- Inputs you trust but don't control: validate them with Zod.
- Inputs you trust and control: he usually doesn't validate them with Zod.

If he were building an app with any unknown inputs, he'd "add Zod right away".

## Untrusted inputs: CLIs, public APIs, forms, sockets, localStorage

Examples of inputs he treats as untrustworthy:
- A CLI argument, e.g. `matt run <something>`, which is unknown at runtime and might not exist.
- A public-facing API's path `:id`, REST method, headers, search params and request body (all of which anyone can ping, so unvalidated ones can be attack vectors).
- Forms (login forms, CRUD forms), websocket connections, and `localStorage` (users can manipulate it, or it may be out of date).

For a simple script he parses `process.argv` with a tuple schema:
- `z.tuple([z.any(), z.any(), z.string()])` is parsed against `process.argv`, which usually has two useless leading arguments before the dynamic one.
- `name` is then inferred as `string` with no other work.
- For more complex CLIs he points to `commander`.

## Validating a public API request with safeParse

For an Express handler, Matt builds a schema covering the whole request:
- `body`: `z.object({ email: z.string().email() })` ensures the email exists and is an email.
- `headers`: `z.object({ authorization: z.string() })` ensures the authorization header is present.

He calls `CreateUserSchema.safeParse(req)` rather than `.parse`, so nothing is thrown:
- If `!result.success`, return `res.status(400).send(result.error)`.
- Otherwise read `result.data.body.email` safely.
- He notes Zod's errors are "really nice, readable", so the caller knows what went wrong.

## Trusted but uncontrolled inputs: third-party APIs

For services you rely on but don't control (GitHub, YouTube, other teams' APIs), Matt still validates:
- If the API changes shape, it can cause subtle bugs. He's lost hours assuming his own code was wrong before realizing the API returned something unexpected.
- Zod still errors in your app, but the error is thrown early, right when data enters, which makes it much easier to debug.
- APIs controlled by other teams in the same organization are debatable; depending on culture he'd consider Zod an option.

Costs he acknowledges:
- Bundle size: Zod is 12kb gzipped (per his cited Bundlephobia link for zod 3.20.2), too large for some apps.
- Validation is inevitably slightly slower than not validating, so skip it if critical-path performance matters.

His weighting: in most apps he's built, robustness is the key concern. "Impossible data", meaning data you don't expect, has probably been the most frequent cause of bugs in his dev life, so he validates any input that's remotely untrustworthy.

## Controlled inputs: frontend calling your own fullstack API

The hard case is a fullstack app (Remix, Next.js, SvelteKit, Nuxt) whose frontend fetches from its own API endpoint, which is likely already Zod-validated.
- Version drift: a user keeps a tab open (e.g. a finance app with charts refreshing every 10 seconds), you redeploy with breaking backend changes, and the stale frontend starts breaking.
- Zod on the frontend would error as soon as drift happens and could prompt the user to refresh.
- Matt usually opts not to use Zod here. The app is typically just a browser refresh from a better experience, and nothing security-sensitive is exposed to frontend code, so the blast radius is small.
- He calls it up for debate: you may want to check all incoming data so you error on any version drift.

## Learning resource

Matt points to his free 10-exercise Zod tutorial on Total TypeScript for learning Zod.
