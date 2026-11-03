## Why Matt avoids TypeScript enums

- Matt says it's fashionable to bash TypeScript's `enum` keyword (the keyword, not the concept of enums). He recommends ignoring enums and forgetting they exist.
- Enums are not native JavaScript. They were added early to give TypeScript a C#, object-oriented feel.
- Matt cites an interview with Anders Hejlsberg: with a green field, TypeScript probably wouldn't include enums again.
- He doesn't teach enums in Total TypeScript, his paid course, "that's how little I think of them".
- In PRs, he says to flag enums and suggest `as const`, but not to reject them. Monitor when enums enter the codebase and check whether they're really necessary.
- He'd revisit the question if enums land natively in JavaScript (there is an ECMAScript proposal). Native enums would be better documented and more predictable.

## Enums behave unpredictably at runtime

- With `enum LogLevel { Debug, Warning, Error }`, the values default to 0, 1, 2. You'd expect a runtime object like `{ Debug: 0, Warning: 1, Error: 2 }`.
- The transpiled JavaScript is an immediately invoked function expression (an "iffy") that assigns both directions: `LogLevel[LogLevel["Debug"] = 0] = "Debug"`.
- The result also has reverse mappings: `{ Debug: 0, 0: "Debug", Warning: 1, 1: "Warning", ... }`.
- So `Object.values(LogLevel)` returns `0, "Debug", 1, "Warning", ...`, which is "totally not what you expect" if you treat it like an object.
- String enums (`Debug = "Debug"`) produce a plain object, but you must assign every member manually. Matt says that defeats the point of an enum, since members otherwise get assigned automatically.

## Enums are nominally typed in a structural type system

- An enum works as both a runtime value and a type, so a function can take `level: LogLevel`.
- You must call it with `LogLevel.Debug`. Passing the string `"debug"` fails even though the value is the same.
- TypeScript is a structural type system: it cares about values, not names. Enums break this rule and make it nominal.
- Given `LogLevel` and `LogLevel2` with identical values, `LogLevel2.Debug` can't be assigned to a `LogLevel` parameter.
- Matt says this "doesn't really fit with me", since he thinks of TypeScript as structural.
- The benefit people cite: easy refactors. Renaming members updates everywhere, and it works well in VS Code. Matt notes enthusiasts name this as their number one reason.

## Const enums are better but still not recommended

- Adding `const` (`const enum LogLevel`) makes the enum disappear at runtime. Its values are inlined wherever it's used.
- Matt calls this a decent compromise: no confusing runtime structure, type safety kept, refactors as easy as with normal enums.
- The TypeScript docs have a whole section on const enum pitfalls and pretty much say you probably shouldn't use them.
- Matt says never use them in library code: they are "really dangerous if you don't control the compiler that's emitting them".
- The edge cases are enough to scare him off recommending them, given there are simpler alternatives.

## The alternative: a plain object with `as const`

- Matt uses (and has seen across open source and application code) a plain old JavaScript object (POJO) with `as const`:

```ts
const LogLevel = {
  Debug: "debug",
  Warning: "warning",
  Error: "error",
} as const;

type LogLevel = (typeof LogLevel)[keyof typeof LogLevel];
```

- The type is extracted from the object values, so `LogLevel` is `"debug" | "warning" | "error"`.
- A function taking `level: LogLevel` accepts either `LogLevel.Debug` or the literal `"debug"`.
- You don't have to import the object every time you want to pass a value.
- It fits structural typing: the function only cares about the value, and everything works at the type level as you'd expect at runtime.
- The runtime object is exactly what you wrote, with no reverse mappings or IIFE.

## `as const` is more flexible: keys as the source of truth

- You can extract the type from the keys instead of the values.
- Example: an object mapping levels to human-readable titles, with `LogLevel` extracted via `keyof typeof`.
- In a `log` function, you receive the level and index into the object to prefix the message with its human-readable title.
- Matt says he has done this "dozens of times" in application code: a mapping from a semantic key to the thing it represents.
- Examples he gives: component variants, screen sizes, languages.
- Doing the same with an enum takes more code: declare the enum, declare the titles map keyed by it, extract the enum type, then use the enum in the function.
- Matt's verdict: `as const` does this "a lot better, a lot cleaner", and it is the killer feature over enums.
