## TypeScript enums: the three kinds and how they differ

- TypeScript lets you declare three kinds of enum values: numeric (`Draft = 0`), string (`Draft = "Draft"`), and inferred (`Draft` alone, which becomes 0, 1, 2...).
- Matt likes enums as a concept and "would really like JavaScript to have them", but TypeScript's implementation is "weird enough" that he does not recommend them.
- Inferred enums are numeric enums with the values left implicit, so they inherit every numeric-enum quirk.

## Numeric enums generate a two-way mapping; string enums do not

- For `enum PackStatus { Draft = 0, Approved = 1, Shipped = 2 }`, `Object.keys(PackStatus)` returns 6 entries: `[0, "Draft", 1, "Approved", 2, "Shipped"]`.
- The cause: TypeScript emits both a value-to-key and a key-to-value mapping for numeric enums.
- String enums skip the reverse mapping, so `Object.keys` gives the expected 3 keys: `["Draft", "Approved", "Shipped"]`.
- Matt's takeaway: the two kinds produce different runtime objects, so iterating over an enum behaves differently depending on its type.

## Numeric enums accept raw numbers; string enums do not

- With a string enum, a function taking `status: PackStatus` rejects the raw string. `logStatus("Draft")` errors with "Argument of type '"Draft"' is not assignable to parameter of type 'PackStatus'". Matt calls this "correctly!"
- With a numeric enum, the same function accepts a raw number: `logStatus(0)` raises no error. Matt's reaction in the post: "WHAT?"
- Net effect: numeric enums leak their underlying number type, so the type check does not enforce use of the enum values.

## Mixing string and numeric members in one enum

- TypeScript allows a single enum to mix string and numeric members, for example `Draft = "Draft"`, `Approved = 2`, and `Shipped` inferred as 3.
- Matt calls this "hilarious" and says plainly: "Don't do this."

## Enums are nominally typed, which breaks "JavaScript with types"

- Matt's most subjective complaint: "I like my TypeScript to be just JavaScript with types. Enums feel like they break that rule."
- Enums are nominal rather than structural. One enum cannot stand in for another, even when the values are identical. `PackStatus2.Draft = "Draft"` is rejected where `PackStatus` is expected, with "Argument of type 'PackStatus2' is not assignable to parameter of type 'PackStatus'".
- This holds even when the second enum references the first: `enum PackStatus2 { Draft = PackStatus.Draft }` still errors.
- This is out of step with how the rest of TypeScript works, where compatibility is based on shape.

## Open bugs and the cost of the implementation

- At the time of writing, there were 71 open issues labelled as bugs related to enums in the TypeScript repo.
- Matt has "heard hints from the TS team" that many of these are uncloseable because of the way enums are implemented.

## What Matt does about enums in practice

- In an existing codebase, if he sees an enum he is unlikely to rip it out. If it uses inferred values, he will probably make the values explicit.
- He would not add an enum to a fresh codebase.
- If you are desperate to use enums, he strongly recommends string enums only: "They're explicit, behave more like enums, and look more like their transpiled code."
- His preferred alternative is `as const` objects used as JavaScript-style enums, covered in the "Deriving Types" chapter of his book *Total TypeScript Essentials*, in the section on using `as const` for JavaScript-style enums.
- Related post on the site: TypeScript 5.8 ships the `--erasableSyntaxOnly` flag, which disables enums, namespaces and parameter properties to enforce pure type annotations.
