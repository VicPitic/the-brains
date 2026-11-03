## Why TypeScript tests need looser typing than application code

Matt argues that test code does not need the same strictness as application code. A broken type in an app often means a user finds a bug in production. A broken type in a passing test is different:

- It might signal the test is wrong, so it is worth a check.
- Once verified as fine, fixing it feels like "meaningless busywork".
- In many codebases a huge share of the code is tests, so strict typing there adds a lot of friction for little safety.

## Testing wrong inputs forces unsafe assertions

Some tests must check that a function behaves correctly when it receives the wrong thing. Matt's example is a function typed `(a: string): void` that throws `"Oh dear!"` when `typeof a !== "string"`. The test needs to pass a number.

- The usual approach is `func(123 as any)` inside `expect(() => ...).toThrow()`.
- If ESLint bans `any` in tests, the workaround is `123 as unknown as string`.
- Matt calls this double assertion "extremely un-ergonomic", for something "extremely common" in heavily tested codebases.

## Mocking large types where only a few properties matter

Another frequent pain: testing a function that takes a type with many properties when the test only cares about a few.

- Typical case: external-library types such as `express` `Request` and `Response` in a handler `(req: Request, res: Response): void`.
- A test may only need `req.body`, but TypeScript demands the whole `Request`.
- The result is repeated `as unknown as Request` casts.
- Each test file also has to import the type just to cast to it, which Matt describes as "a thousand tiny cuts".

## `shoehorn`: a first-class way to pass the wrong type

Matt says he has been through dozens of open-source application codebases, and every one with a large test suite had this problem. His fix is a library, `shoehorn` (`@total-typescript/shoehorn`, on npm and GitHub at `total-typescript/shoehorn`).

- It gives tests a sanctioned way to pass the wrong or partial type, replacing ad hoc `as any` and `as unknown as X`.
- Its `fromPartial` helper takes a partial object and returns something accepted where the full type is expected.

Example from the article:

```ts
import { fromPartial } from "@total-typescript/shoehorn";

it("Should get the user", () => {
  handler(
    fromPartial({
      body: {
        id: "123",
      },
    }),
    fromPartial({})
  );
});
```

- The request mock supplies only `body: { id: "123" }`.
- The response mock is an empty `fromPartial({})`.
- No explicit `Request` or `Response` import or cast is needed in the test.
