## Defaults: `type` over `interface`

- Matt's default is `type`. He recommends reaching for `interface` only when a specific interface feature is needed, mainly `extends`.
- Type aliases (`type` keyword) can express any type: unions, mapped types, conditional types. Interfaces can't.
- Example: `type StringOrNumber = string | number;` can't be written as an interface.
- He argues the `type` vs `interface` difference is small enough that either works "without many problems", and the TypeScript docs agree it's personal preference.
- He disagrees with the TS team's default, which is `interface` first and `type` only when needed. His advice is the opposite: "I'd recommend you use `type` by default. It's a little more flexible and a little less surprising."
- His reason: declaration merging and implicit index signatures are "surprising enough that they should scare you off using interfaces by default."

## Use interfaces for object inheritance

- When objects inherit from each other, Matt uses interfaces.
- Example: `interface User extends WithId { name: string }`.
- The same thing works with type aliases via an intersection (`type User = WithId & { name: string }`). Both flag excess properties like `wrongProperty: 123`. The intersection version is "perfectly fine code" but "slightly less optimal".
- The reason is type-checking speed. With `extends`, TypeScript can cache the interface by name in an internal registry, so later checks are faster. With `&`, it can't cache by name and has to compute the type nearly every time.
- It's a small optimization, but it adds up if the interface is used many times.
- The TypeScript performance wiki recommends preferring interfaces over intersections, and Matt agrees.
- This is the one case where he recommends `interface`, but he still doesn't recommend it as the default.

## Declaration merging

- When two interfaces with the same name are declared in the same scope, TypeScript merges them.
- Example: one `interface User { name: string }` plus another `interface User { id: string }` produces a single `User` requiring both. A `const user: User = { id: "123" }` then errors with "Property 'name' is missing".
- Two `type User = {...}` declarations in the same scope error with "Duplicate identifier 'User'". This is safer.
- Matt notes merging is intended behavior and a necessary language feature. It's used to model JavaScript libraries that modify global objects, such as adding methods to `string` prototypes.
- If you aren't prepared for it, it "can lead to really confusing bugs".
- His mitigation: add ESLint and turn on the `no-redeclare` rule from typescript-eslint.

## Implicit index signatures

- Type aliases have an implicit index signature (Matt describes it as `Record<PropertyKey, unknown>`). Interfaces don't. So object types declared with `type` are assignable to types with an index signature, but interfaces aren't.
- The error looks like: "Index signature for type 'string' is missing in type 'x'".
- Example:
  - `interface KnownAttributes { x: number; y: number }`
  - `type RecordType = Record<string, number>`
  - Assigning a `KnownAttributes` value to `RecordType` fails with "Index signature for type 'string' is missing in type 'KnownAttributes'".
- Why it errors: an interface could later be extended, for example with a property that doesn't match the `string` key or `number` value.
- Two fixes:
  - Add an explicit index signature to the interface: `[index: string]: unknown;`
  - Change it to `type KnownAttributes = { x: number; y: number }`, which then assigns to `Record<string, number>` fine.
- Matt's reaction: "Isn't that strange!"

## Quick rules summary

- Use types by default until you need a specific interface feature like `extends`.
- Interfaces can't express unions, mapped types, or conditional types. Types can express any type.
- Interfaces can use `extends`. Types can't, though intersections with `&` give a similar result.
- For objects that inherit from each other, use interfaces. `extends` makes the type checker run slightly faster than `&`.
- Same-named interfaces in the same scope merge, which can cause unexpected bugs.
- Type aliases have an implicit index signature that interfaces lack, which comes up occasionally.
