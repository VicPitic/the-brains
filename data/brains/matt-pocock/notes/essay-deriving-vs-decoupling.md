## When Matt derives a type versus decouples it

- Derived types (`interface extends`, union types, `Pick`, `Omit`) create a one-way relationship. The derived type inherits from the source, so changes to the source ripple down, but the derived type can't modify the source.
- Deriving couples the derived type to the source. Deriving from another derived type can create long coupling chains that are hard to manage.
- Matt frames the decision as being "all about reducing your future workload":
  - Will updates to one type need to ripple to the other? Derive.
  - Are they so unrelated that coupling could create more work later? Decouple.

## Decoupling props from a data type: the `AvatarImage` example

- Setup: a `User` type in `db.ts` with `id`, `name`, `imageUrl` and `email`. An `AvatarImage` component only uses `imageUrl` and `name`.
- Matt's principle: make functions and components require only the data they need, which stops unnecessary data being passed around.
- The derived option is `type AvatarImageProps = Pick<User, "imageUrl" | "name">`. The problem is that `AvatarImageProps` now depends on the shape of `User` and on its existence in `db.ts`. Moving `User` or splitting it into separate interfaces means revisiting `AvatarImageProps`.
- The decoupled option is `type AvatarImageProps = { imageUrl: string; name: string }`. `User` can then be moved, split or deleted without affecting `AvatarImageProps`.
- Matt prefers decoupling here because `User` (a data type) and `AvatarImage` (a UI component) are separate concerns with different responsibilities and different reasons to change. Decoupling makes `AvatarImage` more portable and easier to maintain.

## Resisting the urge to feel clever with `Pick`

- Matt says deriving can make you feel "clever". `Pick` tempts because it uses a more advanced TypeScript feature, which feels good to apply.
- His advice: "often, it's smarter to do the simple thing, and keep your types decoupled."
- The title's point is that being a TypeScript wizard isn't always the right move. Advanced type manipulation isn't a goal in itself.

## When deriving is the right call: shared concern

- Matt says deriving makes the most sense when the coupled code shares a common concern.
- Example: an `as const` object and its union type.
  - `const albumTypes = { CD: "cd", VINYL: "vinyl", DIGITAL: "digital" } as const;`
  - `type AlbumType = (typeof albumTypes)[keyof typeof albumTypes];`
  - Decoupling would mean writing `type AlbumType = "cd" | "vinyl" | "digital"` and maintaining two closely related sources of truth. Because the two are closely related, deriving is better.

## When deriving is the right call: directly related types

- Example: `type UserWithoutId = Omit<User, "id">`, used in `updateUser = (id: string, user: UserWithoutId)`.
- The concerns are closely related. Matt says decoupling them "would make our code harder to maintain and introduce more busywork into our codebase."
- Contrast with `AvatarImageProps`: `UserWithoutId` is still a variant of the same data model, so a change to `User` should ripple through. `AvatarImageProps` belongs to a different layer (UI), so it shouldn't.

## What counts as a derived type

- `interface AlbumDetails extends Album` inherits all of `Album`'s properties, so changes to `Album` trickle down.
- `type Shape = Triangle | Rectangle` is derived from its members. `Shape` can't modify `Triangle` or `Rectangle`, but changes to them ripple into `Shape`.
- Matt's framing: DRY ("Don't Repeat Yourself") applies to types as well as variables and functions, but the coupling it introduces has a cost.
