## Rule 1: colocate or inline single-use types

- A type used in only one place goes in the same file where it's used.
- Matt's classic example is component props: for `MyComponent` taking `foo` and `bar`, he declares `interface Props { foo: string; bar: number }` in `MyComponent.tsx`, right above the component.
- He finds a separate `MyComponent.types.ts` "pretty unintuitive to work with". When working on a component he is usually editing its implementation and its types together, and two files makes that harder.
- When a type is truly single-use, he says don't be afraid to inline it, e.g. `(props: {foo: string; bar: number}) => {...}`.
- Teams often resist inlining because it feels "messy". Matt's view: you don't always need to extract a separate `type` or `interface`, inlining is absolutely fine, and it's very low-cost to pull it out into a named type later if you need to.

## Rule 2: move shared types to the smallest shared location

- A type used in more than one place should move to a shared location.
- His mental model: think of types in an application as functions. A function used by multiple modules gets moved to a shared location, and the same goes for types.
- In practice he creates a `*.types.ts` file in an appropriate spot in the app.
  - Types shared across the whole app: `src/shared.types.ts`.
  - Types only used inside the components folder: `src/components/components.types.ts`.
- The principle: "I share the type across the smallest number of modules that need it." The types file sits as close as possible to the code that uses it, not in a global dumping ground.

## Rule 3: put types shared across a monorepo in a shared package

- A type used in more than one package of a monorepo should move to a shared package.
- Example layout: `apps/app`, `apps/website`, `apps/docs`, plus `packages/types/src/shared.types.ts` holding the types all three apps share.
- How the shared package is implemented depends on how the monorepo is structured.
- Matt points to a guide on internal packages he wrote for the Turborepo docs while at Vercel as a starting point for setting this up.

## Summary of the approach

Matt's three rules, in order of escalating scope:

1. Colocate (or inline) single-use types.
2. Move shared types to a shared location, as narrowly scoped as possible.
3. Move types shared across a monorepo to a shared package.

He presents this as an opinionated take that, for most developers, will confirm existing intuitions, and which makes for "a well-structured codebase". The underlying idea is the same one used for implementation code: a type lives with its code until a second consumer appears, then it moves up exactly as far as needed.
