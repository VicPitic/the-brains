## Why `any` is dangerous and how it spreads

- Matt says any `any` in a codebase is "a cause for concern" because it disables type checking on whatever it's assigned to.
- Passing an `any` to a function parameter means nothing can be guaranteed about that parameter. In his `groupBy(arr: any[], key: any)` example, there is no way to know that `item` is an object or that it has a property matching `key`.
- An `any` also "leaks" across an application. A function that returns `any` disables type checking in every place its result is used.
- In his example, `result` comes back as `any`, so `result[20].foreach(...)` (misspelled `forEach`) and `item.name` both go unchecked. A call like `groupBy(array)` with a missing argument also slips through.

## Why `any` gets added in the first place

- One reason is trying to fix a bug the developer doesn't understand. Matt notes TypeScript has "plenty of hard edges that can feel unintuitive for beginners."
- His example: looping over `const keys = ["a", "b"]` and assigning `obj[key] = key` on `const obj = {}` errors with "Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{}'." Annotating `const obj: any = {}` makes the error vanish, but it is the wrong fix.
- Better fixes depend on how specific the type should be:
  - `const obj: Record<string, string> = {}` types the properties as any string.
  - `const keys = ["a", "b"] as const;` with `const obj = {} as Record<typeof keys[number], string>` types `obj` with exactly the keys `'a'` and `'b'`.

## Not enough generics is another source of `any`

- Matt's second cause: not using enough generics. He asks the reader to imagine TypeScript had no generics and to try typing `groupBy` as an untyped function: "How on earth do you type this function?"
- Without generics, the only way to avoid `any` is to fall back to `unknown`, which creates a different set of problems.
- Core claim: if you are concerned about `any`s in a codebase, you need to know generics.

## Replacing `any` with `unknown` just moves the problem

Matt walks through trying to type `groupBy` without `any` or generics:

1. Start with `arr: Record<string, unknown>[]` and `key: string`. This errors with "Type 'unknown' cannot be used as an index type" at `result[resultKey]`.
2. Cast with `item[key] as string`. This errors with "No index signature with a parameter of type 'string' was found on type '{}'."
3. Annotate `const result: Record<string, unknown[]> = {}`. The errors go away.

The outcome is that `groupBy(array, "age")` always returns `Record<string, unknown[]>`.

- **The upside ("HELL YES"):** this beats `any` because it gives proper type safety on the result's values. A misspelling like `result[20].foreach` now errors with "Did you mean 'forEach'?"
- **The downside:** "we've just changed the problem." Instead of `any`s spreading, `unknown`s spread.

## Why `unknown` is "yelly" and validation is runtime bloat

- Matt calls `unknown` "extremely 'yelly'." It errors whenever you access a property on it (`item.name`) or assign it to a more specific type like `{ name: string; age: number }`.
- You can narrow it with validation: check `typeof item === "object"`, that `item` is truthy, `"age" in item`, `"name" in item`, then `typeof item.age === "number"` and `typeof item.name === "string"`.
- But when you already know for sure that `item` has a `name` and an `age`, this validation is "pointless runtime bloat."
- His recap:
  - Unnecessary `any`s are bad because they cause bugs.
  - Unnecessary `unknown`s are bad because they bloat runtime code with boilerplate.
  - Typing a utility function to return the `unknown`s in the right place is "NOT easy."

## Generics are the way out of the any/unknown Catch-22

Matt's generic version of `groupBy`:

```ts
const groupBy = <
  TObj extends Record<string, unknown>,
  TKey extends keyof TObj
>(
  arr: TObj[],
  key: TKey
) => {
  const result = {} as Record<
    TObj[TKey] & PropertyKey,
    TObj[]
  >;
  arr.forEach((item) => {
    const resultKey = item[key] as TObj[TKey] &
      PropertyKey;
    if (result[resultKey]) {
      result[resultKey].push(item);
    } else {
      result[resultKey] = [item];
    }
  });
  return result;
};
```

- `TObj` captures the shape of the array's items. `TKey extends keyof TObj` restricts `key` to a real property of those items.
- The return type is `Record<TObj[TKey] & PropertyKey, TObj[]>`, so `groupBy(array, "age")` gives items typed as `{ name: string; age: number }`.
- Matt admits the code is "extremely complex," but says it "perfectly describes the behaviour of the function."
- Payoff for consumers: `result[20].forEach((item) => console.log(item.name, item.age))` has "no errors, no validation needed." Consumers never have to think about `any` or `unknown`.
- Matt's pitch: Total TypeScript Core Volume has a workshop module on generics aimed at helping developers avoid suboptimal code that brings uncertainty into an app.
