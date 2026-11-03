## Generic is an adjective: the vocabulary of type arguments and type parameters

Matt argues that "there is no such thing as a 'generic'". Generics trip people up because "generic" is treated as a noun when it is an adjective.

- Valid phrases: generic types, generic functions, generic classes.
- You cannot "pass", "declare" or "infer" a generic.
- The angle-bracket syntax looks like "a generic", but it appears on functions, function calls, types and type declarations, so the word is too overloaded to point at one thing. That overload is why the concept is hard to grasp.
- His fix: remove the noun from your vocabulary and use "type argument" and "type parameter" instead.
- One concession: the plural "generics" is too ingrained to remove. He treats it as shorthand for "generic types, generic functions and generic classes".

His definition: "**generic** - _adj_: a type, function, or class that declares one or more type parameters."

## Type arguments: what you pass in

A type argument works like a function argument. You can pass it to a function, class or type.

- `useState<string>()` does not pass "a generic". It passes the type argument `string`.
- `Record<string, number>` receives two type arguments: `string` is the first, `number` is the second.
- Not everything accepts type arguments:
  - `PropertyKey<string>` errors with "Type 'PropertyKey' is not generic."
  - `encodeURIComponent<string>()` errors with "Expected 0 type arguments, but got 1."
  - `new Event<string>()` gives the same "Expected 0 type arguments, but got 1" error.
- What decides whether something can receive type arguments is whether it declares type parameters.

## Type parameters: what you declare

A type parameter works like a function parameter. It declares that a type, function or class can receive a type argument.

- In `type Maybe<T> = T | null | undefined;`, `Maybe` declares one type parameter, `T`.
- Because `T` is declared, `Maybe` must be given a type argument. Writing `type Example = Maybe;` errors with "Generic type 'Maybe' requires 1 type argument(s)."
- `Maybe` is therefore a generic type.
- `PropertyKey` is not generic. The compiler's own error says "Type 'PropertyKey' is not generic."
- Matt's summary: generic types are simply types that declare type parameters.

## Generic functions and generic classes

Functions and classes can declare type parameters too. When they do, they are generic functions and generic classes and can receive type arguments.

```ts
const myFunc = <T>() => {
  // implementation...
};
myFunc<string>();

class MyClass<T> {
  // implementation...
}
new MyClass<string>();
```

- The most popular use is giving type information to third-party libraries.
- `const [message, setMessage] = useState();` gives `message` the type `undefined`, because `useState` has nothing to go on.
- Passing a type argument fixes it: `useState<string>()` gives `message` the type `string | undefined`.

## Inferring type arguments from runtime arguments

Generic functions and generic classes behave differently from generic types. `myFunc()` and `new MyClass()` raise no error without a type argument, but a bare `Maybe` does.

- Matt's explanation: if you don't pass a type argument to a generic function or class, TypeScript tries to "infer it from the runtime arguments".
- A simplified declaration of `useState`:

```ts
declare function useState<T>(
  initial?: T
): [T, (newValue: T) => void];
```

- It takes `T` as a type parameter and returns a tuple of `T` and an updater function.
- `useState("Hello!")` infers `T` as `string`, so `message` is `string`.
- `useState(1)` infers `T` as `number`, so `id` is `number`.
- Inference needs a runtime argument to work from. With none, the type argument has to be passed explicitly.
- Generic types have no runtime arguments to infer from, which is why they always require explicit type arguments.
