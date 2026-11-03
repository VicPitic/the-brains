## Three separate things people call "generics"

Matt argues that what developers lump together as "generics" in TypeScript is really three separate concepts:

- Passing types to types, e.g. `Partial<{ id: string; name: string }>`
- Passing types to functions, e.g. `new Set<string>()`
- Inferring types from arguments passed to functions, e.g. `objKeys({ a: 1, b: 2 })` giving `("a" | "b")[]`

He sums it up with one example of each: `DataShape<T>`, `createSet<string>()` and `useState(0)`. Separating them is what makes generics easier to learn.

## Passing types to types: the "type function"

Matt treats a generic type as a "type function" that takes a type argument and returns a new type.

- The problem: `GetUserData`, `GetPostsData` and `GetCommentsData` each repeat the same shape, `data: {...}` plus `error?: ErrorShape`, where `ErrorShape` is `{ message: string; code: number }`.
- The OOP-style fix is a base interface (`DataBaseInterface { error?: ErrorShape }`) that each interface extends. It works but is verbose.
- The more concise fix is a generic type:

```ts
type DataShape<TData> = {
  data: TData;
  error?: ErrorShape;
};

type GetUserData = DataShape<{ id: string; name: string }>;
type GetPostsData = DataShape<{ id: string; title: string }>;
```

- The angle brackets in `<TData>` add a type argument. The name is arbitrary, "just like an argument to a function".
- Generic types can take multiple type arguments, defaults for type arguments, and constraints that limit which types can be passed.
- He flags this syntax as important because it comes up again in the function patterns.

## Passing types to functions

Functions can accept type arguments the same way types do. Matt's example:

```ts
const createSet = <T>() => {
  return new Set<T>();
};

const stringSet = createSet<string>();
// Set<string>
const numberSet = createSet<number>();
// Set<number>
```

- `<T>` goes before the parentheses in the declaration, and is passed on to `Set<T>`, which itself accepts a type argument.
- Calling `createSet<string>()` gives a Set that only accepts strings, so `stringSet.add(123)` errors with "Argument of type 'number' is not assignable to parameter of type 'string'."
- This is the second meaning of "generics": manually passing types to functions.
- The React equivalent is `useState<number>(0)`, which gives `index: number`.
- At this stage `createSet` takes only type arguments, no runtime arguments.

## Inferring types from arguments

Matt builds on `createSet` by adding a runtime argument typed as `T`:

```ts
export const createSet = <T>(initial: T) => {
  return new Set<T>([initial]);
};
```

- Manually passing a type still works, and is checked against the argument: `createSet<number>("pocock")` errors because a string isn't assignable to `number`.
- The key point: "TypeScript can infer the type of `T` from `initial`." The type argument is inferred from the runtime argument.
- So `createSet("matt")` gives `Set<string>` and `createSet(123)` gives `Set<number>`, with no angle brackets needed.
- Hovering over the call shows `<string>` being inferred, as in `createSet: <string>(initial: string) => Set<string>`.
- This explains the React behavior that confuses people: `useState(0)` infers `number` without `useState<number>(0)`. The hover tooltip shows `useState<number>(initialState: number | (() => number))`.
- He introduces it as "WHAT IS THIS SORCERY" and then explains it as ordinary inference from arguments.

## Constraining and typing a generic with `objKeys`

Matt's `objKeys` example combines inference with extra generic features:

```ts
const objKeys = <T extends object>(obj: T) => {
  return Object.keys(obj) as Array<keyof T>;
};

const keys = objKeys({ a: 1, b: 2 });
// ("a" | "b")[]
```

- `T extends object` constrains `T` so it can be passed to `Object.keys`, which only accepts objects.
- The return type is forced to `Array<keyof T>`, because `Object.keys` normally returns `string[]`.
- Because `T` is inferred from the argument, the caller gets the precise union of literal keys without writing any type arguments.

## Where Matt points learners next

- If the post "went over your head", he sends beginners to the free TypeScript Beginners tutorial on Total TypeScript.
- To go deeper into patterns, he points to the Total TypeScript Pro Workshops.
