## TypeScript types are erased at compile time and leave no runtime trace

- Matt addresses a common misconception from people new to TypeScript: that its types exist at runtime. He says they don't.
- The belief feels natural to developers coming from other strongly-typed languages, where types are a fundamental part of the language and influence runtime behavior.
- TypeScript is designed to compile down to JavaScript, which has no type system. Types exist only to help catch errors at compile time.
- Matt notes you will have "thousands of lines of type declarations" in a program, yet none appear in the emitted JavaScript.
- Types and interfaces such as `Person` and `Animal` vanish from the transpiled output, leaving only the object literals.

## Type assertions do not check anything at runtime

- Type assertions tell TypeScript you know more about a value than it does, but they leave no runtime code.
- Asserting that a value is a `number` doesn't make it one. TypeScript trusts the assertion, and if the value is actually a string, you get a runtime error.
- Matt gives this as the reason assertions are discouraged in TypeScript: they can cause runtime errors if you're not careful.

## Function parameter types give no runtime guarantee

- Types on a function's parameters describe the expected shape, but don't ensure the function is called with the right arguments.
- In his `add` example, the emitted JavaScript contains no extra code to validate arguments.
- The practical takeaway: data crossing a boundary (user input, network responses, `JSON.parse`) isn't checked by type annotations alone, since the annotations are erased.

## The exceptions: enums, namespaces and parameter properties

- Matt names three features that do have a runtime representation: enums, namespaces, and parameter properties. The emitted JavaScript contains real code for them.
- Most other TypeScript features disappear at runtime, but these three can be used in the running program.
- These features are old, added when JavaScript was seen as relatively stagnant and TypeScript was attractive for supplying missing features like enums, classes and namespaces.

## Why TypeScript no longer adds runtime features

- JavaScript is now in a much healthier place: classes are built in, and modules are an improved version of namespaces.
- Matt notes that enums might arrive in JavaScript someday, citing a proposal by rbuckton (`github.com/rbuckton/proposal-enum`).
- TypeScript now sees its job as adding types to JavaScript, not adding new language features.
- Matt states that if enums, namespaces or parameter properties were proposed today, "they wouldn't be added to TypeScript."
- His rule of thumb: think of TypeScript as just adding types to JavaScript, with the exception of enums, namespaces and parameter properties.

## Related follow-ups Matt links to

- `--erasableSyntaxOnly` (TypeScript 5.8): a flag that enforces pure type annotations by disabling enums, namespaces and parameter properties. This is the tooling expression of the "types only" rule of thumb.
- Node.js type stripping (Node 23): Node can run TypeScript by default, which fits with TypeScript being erasable type annotations over JavaScript.
