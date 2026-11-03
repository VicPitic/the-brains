## Method shorthand is bivariant, so it can cause runtime errors TypeScript misses

- Matt says TypeScript has two ways to annotate a function on an object: method shorthand (`version1(param: string): void;`) and object property syntax (`version2: (param: string) => void;`).
- They look equivalent, but he argues method shorthand "should be avoided in almost all cases", crediting his friend Andarist's tweet for the insight.
- The core problem: method shorthand can produce runtime errors that TypeScript fails to catch.
- The cause is that method shorthand is bivariant: the method accepts a parameter type that is either narrower or wider than the declared one.
- Object property syntax only accepts a type that is wider or equal (the strict, contravariant check), which is what people expect.

## Worked example: the Dog / SmallDog runtime error

- Matt declares `interface Dog { barkAt(dog: Dog): void; }` and `interface SmallDog extends Dog { whimper: () => void; }` ("Only small dogs whimper in this universe").
- With method shorthand, this compiles with no error:
  - `const brian: Dog = { barkAt(smallDog: SmallDog) { smallDog.whimper(); } };`
  - `brian` now narrows the parameter to `SmallDog` even though `Dog` says it accepts any `Dog`.
- A normal dog is then created: `const normalDog: Dog = { barkAt() {} };`
- Calling `brian.barkAt(normalDog)` fails at runtime, because `.whimper()` does not exist on `normalDog`.
- Matt's framing: "this is TypeScript failing to prevent a runtime error", and it is all because of method shorthand.
- The same bug occurs with `type` aliases, not just `interface`. His `type` version uses `type SmallDog = { whimper: () => void } & Dog;` and still compiles and still throws at runtime.

## The fix: use object property syntax

- Change the declaration to `barkAt: (dog: Dog) => void;`.
- Now assigning `barkAt(dog: SmallDog) {}` to a `Dog` errors with: "Type '(dog: SmallDog) => void' is not assignable to type '(dog: Dog) => void'... Property 'whimper' is missing in type 'Dog' but required in type 'SmallDog'."
- Matt calls this "more in line with what we expect".
- The implementation can still be written with method shorthand or an arrow function. Only the type declaration's syntax matters for the check.

## Common misconception: this is not arrow functions vs function declarations

- Matt says people often assume the two syntaxes are about arrow functions versus function declarations. They are not.
- Both type syntaxes accept either kind of implementation:
  - A `methodShorthand(param: string): void` member can be assigned an arrow function.
  - An `objectProperty: (param: string) => void` member can be assigned a function declaration.
- His example uses `function functionDeclaration(param: string) {}` and `const arrowFunction = (param: string) => {};` assigned across both member styles in an `Obj[]`.
- The difference is only in how the type is declared, which controls variance, not in what function form you pass in.

## Enforce it with the ESLint rule

- Matt recommends `@typescript-eslint/method-signature-style`, configured as `"@typescript-eslint/method-signature-style": ["error", "property"]`.
- The rule enforces object property syntax for method signatures across a codebase.
- If you see "Shorthand method signature is forbidden. Use a function property instead.", this rule is why. In his words, "some clever person has set up this rule to prevent you from doing so."

## Legitimate use cases are rare

- TypeScript keeps method shorthand because occasionally you want bivariance on a function declaration.
- Matt admits he is "not quite sure" what those reasons are.
- He points to Michael Arnaldi, one of the authors of EffectTS, who had a good read on the situation in a Twitter thread.
- Net position: default to object property syntax, and treat method shorthand as something to avoid unless you have a specific reason for bivariance.
