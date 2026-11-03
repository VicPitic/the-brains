## Why `any` is banned by default, but needed in type argument constraints

- Matt says `any` "disables all of TypeScript's features - type checking, autocomplete, and safety." It lets you treat a value as JavaScript.
- Example: `const myFunction = (input: any) => { input.someMethod(); }; myFunction("abc");` fails at runtime.
- He says most of the community rightly considers `any` harmful, and the typescript-eslint `no-explicit-any` rule exists to stop it. That can put developers off `any` entirely.
- He still says there are advanced cases where `any` is "always the right choice".

## Type argument constraints: use `any[]` and `any`, not `unknown`

- Matt's example is re-implementing the `ReturnType` utility, a generic type that takes a function type.
- With `T extends (...args: unknown[]) => unknown`, it works for functions with no arguments.
- It breaks once the function has a parameter such as `(input: string) => void`. The error is "Type 'unknown' is not assignable to type 'string'", because function parameters are checked contravariantly.
- The accidental result is a `ReturnType` that only accepts functions whose parameter is `unknown`.
- The fix is `type ReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : never;`
- He says this is safe because you are "deliberately declaring a wide type": "I don't care what the function accepts, as long as it's a function."

## Returning conditional types from generic functions

- Matt notes TypeScript's narrowing is weaker than we'd like in some places.
- Example: `youSayGoodbyeISayHello(input: "hello" | "goodbye")` returns `"hello" | "goodbye"`, not the precise literal.
- The fix is a generic `TInput extends "hello" | "goodbye"` with a conditional return type: `TInput extends "hello" ? "goodbye" : "hello"`. Callers then get `"goodbye"` for `"hello"` and `"hello"` for `"goodbye"`.
- Problem: inside the function body, TypeScript can't match the conditional type to the runtime `if (input === "goodbye")` logic. Returning `"hello"` or `"goodbye"` errors with "Type '"hello"' is not assignable to type 'TInput extends "hello" ? "goodbye" : "hello"'."
- He first shows two ways to force it with `as`: casting to the full conditional type, or extracting a named generic type `YouSayGoodbyeISayHello<TInput>` and casting to that.

## Using `as any` inside generic functions, backed by a unit test

- Matt says "in these situations, it often makes more sense to use `as any`": `return "hello" as any;` and `return "goodbye" as any;` in the function body, with the conditional return type kept on the signature.
- He admits this makes the function less type-safe, since you could accidentally return `"bonsoir"`.
- His trade-off: it's "often better to use `as any` and add a unit test for this function's behavior". Because of TypeScript's limitations here, "this is often as close as you'll get to type safety."
- He says there are several other cases where you need `any` inside generic functions to get around TypeScript's limitations, and that this is fine to him.

## Policy: ban `any`, with `eslint-disable` for the exceptions

- Matt's answer to whether you should ban `any` from your codebase is yes, on balance.
- Turn on the ESLint rule that prevents it and avoid `any` wherever possible.
- The legitimate cases are worth using `eslint-disable` to get around.
- He suggests bookmarking the article and attaching it to PRs when you feel the need to use `any`.
- He invites readers to share other legitimate use cases.
