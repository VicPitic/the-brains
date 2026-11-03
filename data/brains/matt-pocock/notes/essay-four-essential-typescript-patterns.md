## Branded types as validation boundaries

Matt presents branded types as one of four essential TypeScript patterns, a pattern that separates "using TypeScript" from "knowing TypeScript". Branded types assign different "labels" to values.

- Example: `type Password = Brand<string, 'Password'>`.
- A function like `takesInPassword(password: Password)` errors when passed a plain string such as `'4123123'`.
- It does not error when the value is branded: `'4123123' as Password`.
- The `Password` type can only be satisfied by a value that has been branded as `Password`.
- This creates validation boundaries in the app's code: validate that something is a valid password once, then safely pass it around the application.

## Typing globals with `declare global`

Matt argues that understanding how the global type scope works in TypeScript is critical. His reasoning: "Love them or hate them, globals are a part of the way we use JavaScript." If globals are used in JavaScript, they need to be described in TypeScript.

- `declare global` types functions and variables directly in the global scope:
  ```ts
  declare global {
    function myFunc(): boolean;
    var myVar: number;
  }
  console.log(myVar);
  console.log(myFunc());
  ```
- The same techniques add types to `process.env`, type `Window`, and create your own global types.

## Type predicates for narrowing

Type predicates let a function declare that its boolean return value describes one of its arguments.

- Example: filtering `undefined` out of an array.
  ```ts
  const values = ["a", "b", undefined, "c", undefined];
  const filteredValues = values.filter(
    (value): value is string => Boolean(value),
  );
  // filteredValues is now string[]
  ```
- Without the `value is string` predicate, `filter` does not narrow the element type. With it, the result is `string[]`.
- Matt's framing: both type predicates and assertion functions "improve TypeScript's ability to narrow your code".

## Assertion functions

Assertion functions work similarly to type predicates, but throw an error inside the function to "assert" that the value passed corresponds to a certain type.

- Example:
  ```ts
  function assertUserIsAdmin(
    user: NormalUser | AdminUser,
  ): asserts user is AdminUser {
    if (user.role !== "admin") {
      throw new Error("Not an admin user");
    }
  }
  ```
- After calling the function, TypeScript treats `user` as `AdminUser` for the rest of the scope.
- Use a type predicate when the function returns a boolean you branch on. Use an assertion function when you want to throw on failure and keep going with a narrowed type.

## Classes and the builder pattern

Matt's fourth pattern is classes, which he acknowledges is surprising ("Classes?! Yes."). The humble ES6 class, in TypeScript's hands, is an amazing tool for the builder pattern.

- The builder pattern is at the core of tRPC, one of TypeScript's most popular libraries.
- Combined with assertion functions, a class can type its own shape "from inside the class itself":
  ```ts
  export class SDK {
    loggedInUser?: User;

    constructor(loggedInUser?: User) {
      this.loggedInUser = loggedInUser;
    }

    assertIsLoggedIn(): asserts this is this & { loggedInUser: User } {
      if (!this.loggedInUser) {
        throw new Error("Not logged in");
      }
    }
  }
  ```
- After `sdk.assertIsLoggedIn()`, `sdk.loggedInUser` is narrowed from `User | undefined` to `User`, using `asserts this is this & { ... }`.

## Why classes still matter in library code

Matt says classes are often misaligned and misunderstood, and anticipates the objection: "I thought we used hooks now??"

- His position: "when you're writing TS in library-land, classes are a force of pragmatic utility that you can't sleep on."
- The distinction is between application code (where hooks dominate) and library code (where classes enable patterns like builders and self-narrowing assertion methods).

## Shared patterns as a team advantage

Matt argues that having a shared set of core patterns is "an absolute super power for any team". The docs teach the pieces (generic functions, conditional types, type helpers), but developers in the wild combine those pieces into patterns.

- The four patterns covered: branded types, globals, assertion functions and type predicates, and classes.
- He promotes his Advanced Patterns workshop, available as part of the Total TypeScript Core Volume, as the way to get a team onto these shared patterns.
