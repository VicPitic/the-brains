## Matches data to UI with discriminated unions, not bags of optionals

Matt warns against modelling frontend state as a "bag of optionals": one object with a `status` field plus optional `error?` and `data?` properties.

- Example type: `{ status: "loading" | "error" | "success"; error?: Error; data?: { id: string } }`.
- It permits impossible shapes: `status: "success"` with no `data`, or `status: "loading"` with an `error` attached.
- Optional properties suit values that may or may not be present. Here presence is fully determined by status:
  - `loading`: never `data` or `error`.
  - `success`: `data` always present.
  - `error`: `error` always present.
- His framing: most frontend complexity is handling the many states an app can be in, and "handling states starts with how they're represented in types".

## Building the discriminated union step by step

Matt's method is to scaffold first, then fill in each branch.

- Start with a union of objects that each carry only a `status` literal: `"loading"`, `"success"`, `"error"`.
- Add each branch's own data:
  - `{ status: "loading" }`
  - `{ status: "success"; data: { id: string } }`
  - `{ status: "error"; error: Error }`
- Impossible states now fail to compile:
  - `{ status: "success" }` errors with "Property 'data' is missing".
  - `{ status: "loading", error: new Error("Eek!") }` errors because `error` does not exist on that branch.
- He says the type "now properly represents all the possible states of the feature".

## Why destructuring fails until you discriminate

A common stumbling block is destructuring the union before narrowing it.

- Code: `const { status, data, error } = state;` where `state: State`.
- TypeScript reports "Property 'data' does not exist on type 'State'" (and the same for `error`).
- Reason: until the union is discriminated, only properties shared by every member are available, which here is just `status`.
- Fix: check the discriminant first, then destructure.
  - `if (state.status === "success") { const { data } = state; }`
- Matt calls this strictness "a feature, not a bug". It pushes developers to think in terms of states and to access data only in the states where it exists.
- He uses React in the example but says the idea applies to any frontend framework.

## Discriminated unions for component props

Matt extends the same idea from state to props: when a component renders in two slightly different ways, use a discriminated union on a `variant` field.

```ts
type ModalProps =
  | {
      variant: "with-description-and-button";
      buttonText: string;
      description: string;
      title: string;
    }
  | {
      variant: "base";
      title: string;
    };
```

- `buttonText` and `description` are required only when `variant` is `"with-description-and-button"`.
- The `base` variant takes only `title`, so callers cannot pass half a configuration.
- His summary: thinking in discriminated states replaces a "big optional bag of data" with a clear understanding of the connections between data and UI.
