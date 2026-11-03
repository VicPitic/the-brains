## Why Matt prefers TypeScript over plain JS and JSDoc

- Matt says TypeScript "saved my life" on a React project that kept falling behind in plain JavaScript. After adopting it, the team "almost doubled" its velocity, mostly by removing a whole class of bugs.
- The front-end team received complex data structures from a back end whose contracts kept changing (a boolean became a string, uppercase "P" became lowercase "p"). In JS they had to check every change against the runtime by hand.
- With TypeScript, a changed contract produced red squiggles wherever it mattered. Some fixes could be refactored automatically. Tasks that took hours became type-level checks, and he no longer needed to test in the runtime.
- Against the argument for JSDoc, he says JSDoc is verbose, "way too verbose," and has weaker IDE support. TypeScript gives "a more complete experience."
- He is relaxed about the extra step: when coding in TypeScript he feels "in a bubble," like "a sensory deprivation tank." In JS, even with JSDoc, he has to "work harder."
- He prioritizes the feeling of safety: "I just can't make a mistake." Good tools let you "basically code while drunk" because they catch every mistake immediately.

## Is TypeScript forcing complexity on you? Matt's rebuttal

- Matt rejects the claim that TypeScript was built as "a scripting language for C#" and pushes back on it repeatedly. In his view it is a different tool now: "it is becoming more JavaScript."
- Any JavaScript project can go into TypeScript without further changes. You can cast things as `any` and add annotations to functions. You "don't necessarily need to embrace classes or inheritance."
- Classes exist in JavaScript before TypeScript. TypeScript doesn't force them on you.
- His one concession is the `enum`. It is a TypeScript-specific feature that compiles to runtime JavaScript. He says the team "regret" adding it and "wouldn't do that anymore." The team has "calibrated itself" to support what JavaScript can already do rather than impose new patterns.
- He doesn't accept that TypeScript adds design patterns JS lacks. Apart from `enum`, he says, it doesn't.
- On generics: they exist only at the type level, not as runtime code.
- On the "raises the floor" objection, he agrees TypeScript raises the floor, but argues a higher floor means a better product. You can teach TypeScript on the job; a few annotations are quick to pick up, perhaps "20 minutes" with the start of the handbook.

## Inference is TypeScript's real strength

- He calls inference "the thing that typescript is really really good at."
- Example: given an `unknown` variable, `if (typeof thing === "string")` types it as a string inside that block.
- He argues TypeScript "understands JavaScript's type system incredibly well" and does "deep, interesting inference" that gets better over time.
- It "doesn't impose any constraints on what you want to build." You can build anything in JavaScript with TypeScript.
- Mentions that JSDoc only provides syntax. The checking is done by `tsc`, so JSDoc without `tsc` gives no real benefit.
- Notes that the TypeScript team ships something new in nearly every minor version.
- Mentions the TC39 "type annotations in JavaScript" proposal (presented at JSConf), which would let annotations sit in JS and be checked with `tsc`. He was interested in it.

## Hard types, library authors and the app-user divide

- He maintains XState's TypeScript surface ("xdate" in the transcript; the library is described as one of the most complicated TypeScript libraries out there). He has worked on it for about a year and a bit.
- To make the TypeScript experience good for users, the team has to "bend over backwards" and "go deep into the language." Colleague Andarist did much of the deep work and reported TypeScript bugs found along the way.
- Meta-programming heavy libraries (the panel's example was Objection.js, an ORM) produce type definitions that "look like an alien language." Generics, `extends`, `infer` and angle brackets in odd places can look "bamboozling and terrifying."
- Matt's framing: there is a divide between app users and library authors. Most TypeScript users won't touch complicated generics; that is "the work of library people".
- He worries that the syntax itself puts people off, even though the primitives are fairly simple once you know the syntax.
- He created a VS Code extension, the TypeScript Error Translator, to decode TSC errors, which he says can be "terrifying."

## Types first, then implementation

- Matt's workflow: when building something new, he thinks about the data first, declares the types in TypeScript, and only then designs the flow and the API. TypeScript "makes me think data flow first, types first and implementation later."
- A panelist countered that Rob Pike criticizes exactly this (types first leads you to get types wrong before you know how the program works). Matt did not concede the point and said he found the idea fascinating.
- On testing: a panelist argued unit tests do not replace type checking, and Matt did not disagree. Matt said he was surprised the discussion hadn't gone the "just unit test your JavaScript" route that critics usually take.

## Branded types and wrapping up

- He confirms TypeScript can do "branded" types (new types): for example, an alias on `number` so an imperial value can't be mixed up with a metric one.
- He has used the same trick with strings: entity IDs mapped to different types, so you can't pass a user ID where a post ID is expected. He calls this "very very powerful" and notes it is compile-time only, with no runtime equivalent.
- Panelist asked about a hypothetical subset of TypeScript that is one-to-one with JavaScript output. Matt did not argue for it.
- Closing view: compilation is sometimes hurtful and sometimes overkill, but "typescript gives you enough to make the compilation worth it," especially with the integrated tooling.
- His course (Advanced TypeScript) is at mattpocock.com; he is on Twitter at @mattpocockuk, and works at Stately AI on state machines and statecharts with a visual editor that compiles to code.
