## What generics are: type-level functions

- Matt describes generics as covering "a couple of different patterns". The first is the generic type: a type that takes arguments, like a function.
- Example: `type MyGeneric<TData> = { data: TData }`. Passing `{ firstName: string }` gives `data: { firstName: string }`; passing `string` or `number` gives `data: string` or `data: number`.
- Leaving out the argument errors with "requires one type argument".
- He calls these "type helpers", "type functions" you use to build other types.
- He says TypeScript without generics "would be absolutely awful", and that most developers have used thousands of them without writing one.
- Benefits he names: abstractions, more DRY code, and no excess type annotations.

## Generic functions: a type helper mapped onto a function

- Starting problem: a `makeFetch(url)` function returns `Promise<any>`. Typing the result means putting an annotation on the caller's side, e.g. `{ firstName: string; lastName: string }`.
- Fix: declare a type parameter on the function, `makeFetch<TData>(url: string): Promise<TData>`.
- Callers then pass a type argument and a runtime argument: `makeFetch<{ firstName: string; lastName: string }>("/api")`.
- His definition: "a generic function is just a normal function with a type helper mapped on top of it".

## Generics you already use in the language and in React

- `new Set()` is inferred as `Set<unknown>`, so adding a number and a string both pass. Writing `new Set<number>()` makes the string an error.
- He tells you to Cmd-click into the built-in declaration to see that `Set` is generic.
- Many parts of JavaScript and React need explicit type arguments even when you pass no runtime generic argument: `useState`, `useRef`, `useReducer`, `createContext`.

## Inference: the source of the magic

- Example: `addIdToObject<TObj>(obj: TObj)` returns `TObj & { id: string }`.
- Passing `{ firstName: "...", lastName: "..." }` with no type argument works. TypeScript looks at the runtime arguments and infers `TObj` as `{ firstName: string; lastName: string }`.
- Autocomplete for `.id` on the result still works.
- He calls this "a central idea in understanding generics": type arguments can be inferred without you passing them.
- It is "the source of a lot of the magic". The original version duplicated the object's shape in both a type argument and the runtime argument; inference removes that.

## Constraints with `extends`

- `GetPromiseReturnType<T> = Awaited<ReturnType<T>>` fails with "Type T does not satisfy the constraint".
- Reason: `ReturnType` only accepts functions. Its declaration has an `extends` clause on `T` (a constraint).
- The fix is to give `T` the same constraint, so only functions can be passed. Passing `string` then errors.
- Constraints can be anything: `T extends string`, `number`, `boolean`.
- Example 2: `getKeyWithHighestValue<TObj extends Record<string, number>>(obj: TObj)`. `Object.keys` errors on an unconstrained `TObj`, because you can't call it on a number or string. The constraint also stops callers passing booleans as values.
- Inference is kept: the result key is still typed `"a" | "b" | "c"`, while the value is `number`.
- His rule: "when you have a generic function you're usually going to want to put a constraint on this". It controls what callers can pass and means you need less logic inside the function.

## Linking arguments: multiple type parameters and `keyof`

- Problem: `getValue(obj, key)`.
- His first question: "what do I need to capture in the type arguments in order to do everything I need to do at the type level".
- Step 1: capture the object as `TObj`.
- Step 2: type `key` as `keyof TObj`. This gives autocomplete on `"a" | "b"`, and adding `c: true` extends it.
- Step 3: the return type is then a union of all value types, e.g. `string | number | boolean`, because the key is treated as `"a" | "b" | "c"`.
- Fix: a second parameter, `<TObj, TKey extends keyof TObj>`, with `key: TKey` and return `TObj[TKey]`.
- Now `"a"` gives `number`, `"b"` gives `string`, `"c"` gives `boolean`.
- Using `TKey` directly to index without the constraint errors ("cannot be used to index type") and loses autocomplete.
- He says this "inference happening between the arguments of your functions which then maps on to the return type" lets types propagate "beautifully through your app".

## Casting inside generic functions with `as`

- Example: a typed `objectKeys<TObj>(obj: TObj): Array<keyof TObj>`. `Object.keys` returns `string[]`, which is incompatible.
- Matt's fix is `Object.keys(obj) as Array<keyof TObj>`.
- He knows the usual advice is to avoid `as`, but says "in this case it's actually what you need to do".
- His reasoning: inside generic functions "you know better than TypeScript", which "is going to lose its way in really complicated generic signatures".
- Many libraries add `as any` to make the return type match, and he calls this "absolutely fine to do inside a highly generic function".

## Default type parameters

- Example: `createSet<T>()` where `T` is not referenced by any argument, so it can't be inferred and falls to `unknown`.
- Needing a `Set<string>` by default, he uses a default type parameter: `createSet<T = string>()`.
- With no type argument you get `Set<string>`. Passing one overrides the default.
- This is the TypeScript equivalent of default parameters in JavaScript.

## Inferring from libraries like Zod

- Example: `makeZodSafeFetch`, which returns `{ firstName, lastName }` but is not safe at runtime, since `TData` is only an assertion.
- He takes a Zod schema as the argument: `schema: z.Schema<TData>`. Zod's `Schema` has type arguments, and `TData` is the output type.
- At runtime: fetch the URL, call `res.json()`, then `schema.parse(result)`.
- Pass `z.object({ firstName: z.string(), lastName: z.string() })` and drop the explicit type argument. The result is still inferred correctly.
- Adding a field to the type without the schema errors. The function is safe at the type level and at runtime.
- His takeaway: "if you concentrate your types, your advanced TypeScript, in one place it means that the users of your function don't really need to worry about it at all".
- He plugs Total TypeScript, which has a module on generics that is about a five-hour workshop.
