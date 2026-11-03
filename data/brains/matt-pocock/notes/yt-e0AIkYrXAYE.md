## Phase one: the 2022 "interfaces are the bomb" view, and what Matt got wrong

- In 2022 Matt believed interfaces were faster than types, citing the TypeScript performance wiki.
- He now says he misread it: the wiki contrasts interfaces with **intersections**, not interfaces with types. It carries the warning "read carefully before you jump to conclusions on this page," which he wishes 2022 Matt had read.
- The wiki's comparison: `type Foo = Bar & Baz & { someProp: string }` versus `interface Foo extends Bar, Baz { someProp: string }`. The `extends` form is significantly faster to compile.
- Declaring a basic object as an interface versus a type gives no performance difference. The difference only appears when object types are combined.
- He also ran a 2022 benchmark of a thousand types versus a thousand interfaces. It found no difference in pure type count, which contradicted his hypothesis, and he did not change his hypothesis. He calls that "the folly of youth."

## Why interface extends beats intersections

- Interface `extends` gives a hierarchical relationship, so TypeScript can check at each level. Intersections "smoosh" types together and are harder to compile.
- Behavior difference with conflicting properties: if `Bar` has `id: string` and `Baz` has `id: number`, the intersection allows it silently and `id` becomes `never`.
- With `interface Result extends Bar, Baz`, TypeScript errors immediately: "Interface result cannot simultaneously extend types bar and baz. Named property ID of types bar and baz are not identical."
- So the interface form is both cheaper to compile and stricter, catching the conflict where the intersection hides it.

## Real-world evidence that intersections hurt performance

- Matt says the advice is absolutely still relevant, and it took him a long time to collect real-world data because cases are rare.
- His example, from his article "This pattern will wreck your React app's TS performance": creating a button type with all properties of the original button plus one extra property.
- Doing this with an intersection, repeated across a very large codebase, can wreck TypeScript performance. Switching to `interface extends` gives a large speedup.
- The data came from Jonas, then at Sentry, who said they halved their compile times and made developer experience reflect type changes instantly.
- Takeaway: interface extends versus intersections matters. Types versus interfaces as plain object declarations does not.

## Phase two: it doesn't matter which one you use, as long as you're consistent

- Matt's second position: pick a convention, such as interfaces for objects and types for everything else, or types for everything. Either is fine if consistent.
- Interfaces carry features he thinks most people don't need when just defining an object shape.
- **Declaration merging** is the main pain. Two `interface Animal` declarations in one scope merge, so a value needs both sets of properties.
- He has worked in 1,000-line files with an `Event` interface at the top and another at the bottom that overrode each other, and he didn't spot it for about 20 minutes.
- Mitigation: turn on the typescript-eslint rule `no-unsafe-declaration-merging`. TypeScript still merges, but ESLint gives an error.
- Declaration merging is a critical feature for things like appending to `window`, so it exists for good reason.

## The index signature gotcha with interfaces

- Matt covers this in his Total TypeScript article on type versus interface. It surfaced when the creator of AngularJS (Miško) asked him a question on Twitter that he couldn't solve.
- Example: `interface KnownAttributes { x: number; y: number }`, then a variable of that type, then a `Record<string, number>`-style target (an index signature).
- Logically the interface should be assignable, but it isn't. The reason: an interface could later be extended by declaration merging with a property that breaks the string key / number value contract.
- Fixes: add an extra index signature to the interface, or simply declare it with `type` instead. A type alias can't be merged later, so it is assignable.
- Matt notes it comes up so rarely that it took the AngularJS creator contacting him before he noticed it.

## Phase three: the current recommendation

- Matt's phase three: use types unless you need a specific feature of interfaces. Use an interface when a type needs to extend another type, or when a class implements/extends it.
- There is no performance difference between a plain type and a plain interface.
- He now changes the recommendation again: the declaration-merging risk is handled by the ESLint rule, and the index signature issue is rare. The biggest danger is "the slow degradation of your TypeScript performance due to more intersections."
- Old recommendation: "default to type until you need a feature of interface." New recommendation: "default to interface until you need a feature of types."
- Practical rule he emphasizes most: **default to `interface extends` over intersections**.
- For typing a single standalone object, it does not matter: "Make it a type on Tuesday and an interface on Wednesday. Who cares?"

## Performance still matters despite the Go port

- TypeScript is about to get roughly 10 times faster with its port to Go.
- Matt reports that Anders Hejlsberg told him you should still think about performance: a bigger TypeScript budget doesn't mean your types should be any less performant. Matt says to trust Anders over himself.
- Meta lesson Matt draws: he was wrong in 2022, ignored his own benchmark result, and has now flip-flopped enough that he cares less about the plain type-versus-interface question.
