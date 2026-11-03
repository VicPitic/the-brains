## Three ways Matt tests TypeScript types

- Matt argues that if you work on library code, you should test your types. Types are a crucial part of the API you expose to users, so you want to be sure the type-level logic works.
- He says testing types is rarely worth it in application development.
- His closing rule: for any library consumed by many people, learning to test types, and getting good at it, is "critical".
- He lists three approaches: vitest, a hand-rolled setup, and `tsd`.

## Testing types with vitest

- Matt calls vitest "extremely powerful and popular" and notes it is already widely used for runtime tests, so it makes sense to use it for types too.
- Vitest ships APIs for testing types, including `assertType` and `expectTypeOf`.
- Example from the essay:

```ts
import { assertType, expectTypeOf } from "vitest";
import { mount } from "./mount";

test("my types work properly", () => {
  expectTypeOf(mount).toBeFunction();
  expectTypeOf(mount).parameter(0).toMatchTypeOf<{ name: string }>();
});
```

- Main benefit: it is built into the test runner, so type tests sit next to runtime tests (colocation).

## Rolling your own with Expect and Equal

Matt's approach when not using vitest is to use type helpers `Expect` and `Equal` to assert exactly what a type narrows to:

```ts
type Expect<T extends true> = T;
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <
  T
>() => T extends Y ? 1 : 2
  ? true
  : false;

const identityFunc = <T>(arg: T) => arg;

it("Should return whatever you pass in", () => {
  const test1 = identityFunc("hello");

  type test = Expect<Equal<typeof test1, "hello">>;
});
```

- A failing type test shows up as a red line in the IDE.
- In CI or as part of the test suite, run `tsc` over the whole suite and check whether any type tests fail.
- `Expect<T extends true>` fails to compile unless `Equal` resolves to `true`, which is what makes the failure visible.

## Asserting that something errors with @ts-expect-error

- Matt uses `// @ts-expect-error` to check that something does not work. The comment looks at the next line and fails if that line has no error.
- Use it to assert that a certain input is rejected:

```ts
const myFunc = <T extends string>(arg: T) => {};

it("Should not accept a number", () => {
  // @ts-expect-error
  myFunc(123);
});
```

- He admits the limitation: it is "not exactly perfect" because it is not granular. You cannot check that a specific error is thrown, only that an error was thrown.

## The tsd library

- Matt points to `tsd` (github.com/SamVerschueren/tsd) as "a really nice library" for testing types.
- He describes it as pretty similar to the vitest runner, but it bundles everything in and is nice to work with.
- He says he has less experience with it, but it is "definitely worth a look".
