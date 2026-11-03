## Generic Result type as a discriminated union

Matt describes a `Result<TResult, TError>` type as "one really nice application of generic types". It has two type parameters and returns a discriminated union:

- Success branch: `success: true` with `data: TResult`
- Failure branch: `success: false` with `error: TError`

The `success` boolean is the discriminant, so checking it narrows the type to the right branch.

## Worked example: createRandomNumber

His example function generates `Math.random()`, a number between 0 and 1.

- If the number is greater than 0.5, it returns `success: true` and `data: 123`.
- Otherwise it returns `success: false` and `error: new Error("Something went wrong")`.
- The return type passes `number` as the data type and `Error` as the error type.

At the call site, checking `result.success` narrows `result.data` to `number`. Inside each branch of the function, TypeScript enforces the correct shape. If he changes the data type to `string`, the compiler errors with "type number is not assignable to type string" unless the returned data matches.

## Why this beats try/catch by default

Matt notes this is how Rust handles errors, and says it means "you don't have to do any try-catching". He concedes you might still need some try/catch, but as the default way to check for errors it is annoying for two reasons:

- The error you get back in a catch block is not type safe, as covered in earlier exercises in the workshop.
- It leads to complicated logic where errors are caught at certain boundaries and "you're not quite sure where they're coming from".

## Explicit control flow

With a Result type, the flow is explicit: ask "is my result a success?" If so, proceed; if not, handle the error. Matt calls this "really, really nice for certain situations when you have really complicated imperative code flow". He frames it as a fit for particular situations rather than a universal replacement for exceptions.
