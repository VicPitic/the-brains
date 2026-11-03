## Why the React types live in DefinitelyTyped, not in React

- React is written in Flow, so the TypeScript types are bolted on from outside as `@types/react`, published from the single DefinitelyTyped repo. Rewriting React in TypeScript would need a big justification.
- Sebastian Silbermann (the main maintainer of the React types) says the repo's big pro is that a change to the React types gets tested against every other types package, so untested changes don't ship.
- Moving the types into the React repo would lose that infrastructure. Dimitri's paid work on the types wouldn't carry over, and he would have to watch the whole noisy React repo.
- Matt asked whether the types could live in the React repo, as Jest, Immutable.js and Yarn do with types maintained in parallel to non-TypeScript code. Sebastian's answer: React releases are too rare. Types changes like new HTML attributes or tighter literal unions need a faster cadence.
- Matt points out that a PR merged to the React types ships quickly, whereas waiting on a React release would take months.
- Decoupling also lets people upgrade React's runtime without a types upgrade. Sebastian says "I would encourage people to upgrade the runtime and deal with the types later", and warns this is hard to teach without ending up with `any`s and ts-expect-errors everywhere.

## Versioning types alongside a runtime library

- Matt notes SemVer is well defined for runtime but not for types. Removing a function export is clearly major; removing an exported type is murkier.
- The React types keep major and minor matching React, while the patch number is completely decoupled. There may be around 80 type patches with zero React patches.
- Types can lag the runtime minor. React was on 18.2 while the types said 18.0, because 18.1 and 18.2 added no new features. Matt notes this makes it hard to know which minor of the types to pin when stuck on an old version. Sebastian agrees they should bump the minor anyway to avoid the confusion.
- Matt says it would feel strange to have React 18 with React types 26, so the types are tied to React's major.
- Sebastian's own SemVer rules for types:
  - Removing an exported utility type is a breaking change, but he argues you should just keep it and mark it deprecated.
  - Constraining a type further (a `string` becoming two literals) is breaking, "but it's kind of what you want from the types".
  - The TypeScript team's position is that every change is a breaking change, so it can't map to SemVer.

## What counts as a breaking change in types

- Sebastian's example: adding an attribute to a shared HTML attributes interface broke users who had extended that interface with a same-named prop of a different type. CI went red, which is "a breaking change in the literal sense". Adding any property to an interface can do this.
- Matt's framing: when the new types are more truthful and accurate, the errors they uncover are good errors, not breakage.
- Sebastian weighs the fix cost. The fix there was wrapping the extended interface in `Omit`, a minor change.
- Changes that break types for users, like changing the generic parameters of `useReducer`, wait for the next React major. Sebastian tested one on his work codebase, found 10 to 15 breakages, and decided to hold it for React 19 even though it gave better contextual typing and removed an overload.
- Implicit children is the precedent. It was held back from 17 and removed in 18, merged on release day after about two years of waiting.
- Sebastian's balance: avoid piling up breaking changes in one major, because people get put off upgrading React when the types break. TypeScript is so ubiquitous that "if it doesn't work in TypeScript, many people don't consider it as working at all".
- Matt's takeaway: trying to break as few things as possible has a cost, but the reasoning is sound.

## Typing the DOM: why React can't inherit lib.dom.d.ts

- Matt asks why React doesn't reuse TypeScript's `lib.dom.d.ts`. Sebastian says the two describe different things.
  - `lib.dom.d.ts` types DOM interface properties, such as `HTMLBodyElement` for `document.body`.
  - React's types describe HTML attributes. The two don't map one to one.
- Example: the HTML attribute is `class` but the interface property is `className`. React's handling is inconsistent, mostly following properties but sometimes making things up, like `defaultChecked`.
- Sebastian says there's no library for HTML attributes that React could use instead.
- Matt recalls the TypeScript team including DOM features that are supported in a few browsers.
- Sebastian's rules for adding attributes:
  - Experimental or single-browser attributes get a "no". Users can augment the types themselves, and the React TypeScript cheat sheet documents how.
  - Attributes React doesn't forward to the DOM the way you'd expect are left out. His example is `inert`, which in React takes a string rather than `true`, so typing it as the browser-style boolean would give the wrong runtime behavior.
- The React types sit between the DOM and React's runtime, communicating what actually works in React.

## How JSX is typed, and what's changing for async server components

- Matt asked Sebastian to explain how TypeScript understands JSX. Sebastian's explanation:
  - TypeScript looks at the global/scoped `JSX` namespace and asks two questions. For classes, is it assignable to the element class? For function components, does it return `JSX.Element` or `null`?
  - That hardcoded check is why a component can't return a string, boolean, array, number or a Promise. If the lookup fails, types fall back to `any`.
- The problem: async server components can't be typed by the React types alone because these checks are hardcoded in the TypeScript compiler.
- Sebastian says TypeScript 5.1 changes how this is inferred. Instead of hardcoded checks, it will ask the JSX factory (historically `React.createElement`) what it accepts.
- Once that lands:
  - The React types control what a function component may return, so async components returning a Promise, or returning context, become possible.
  - The `createElement` typings could be simplified. They have eight overloads and an old to-do, and typing every host element like `div` and `input` is expensive.
- Performance is the risk. Deeply nested JSX means deeply nested factory calls the type checker has to instantiate. Sebastian says TypeScript tried this about three years ago and backed off over poor performance on deep trees. Server components and promises now make fixing it more pressing.
- Matt asks whether this would let children pick up generics from their parent, a typed child. Sebastian says people want it but it would need careful testing and may stay out of reach, or ship as an opt-in for people who accept the cost.

## Legacy mistakes: `useRef`

- Sebastian won't call them mistakes, because the types are 8 or 9 years old and things evolve. His example is `useRef`, whose typings evolved from `createRef`, which was built for class components under different constraints. It carries a lot of footguns.
- The fix is ready but is waiting on the React 19 major.
- People get disappointed that they have to wait. Matt's reply: "That's the common thread with all of this. People are disappointed", and it's inherent to the job.

## Contributing to the React types

- Mechanics of the DefinitelyTyped workflow, as Sebastian describes it:
  - The authors list in `index.d.ts` is used to ping the right people on any PR touching that package.
  - File PRs as drafts first. React's CI takes about an hour because it tests against roughly 700 packages. Marking a PR ready for review pings all the authors.
  - Once someone approves, a "ready to merge" comment makes DefinitelyTyped auto-merge and auto-publish.
- Start a conversation via GitHub Discussions, not Issues, because discussions allow threaded replies. Put the package name in brackets in the title, like `[react]`, so the right authors are pinged.
- Keep discussion in the open rather than on Discord, so PRs can link back to the context.
- Matt asked whether this process is documented. Sebastian admits it's mostly in the readme and assumed knowledge.
- Matt says contributors don't get a changelog for types packages. Sebastian agrees this is missing, since each change is just a new version and he doesn't see a way to go from a version to its PR. He'd like the publisher to generate changelogs from commits and PR descriptions.
- The hardest part of the job, in Matt's telling, is that everyone has a different idea of how strict types should be, and you "only hear about the problems you cause, not the services you provide".
- Matt gives a personal example of the cost. He burned out at his peak, and recalls a three-week thread about a `props with children` type that resolved only on a call, when it turned out the disagreement came down to how a non-native English speaker read the word "with".
- Sebastian's call for help: the remaining work is complicated, so fresh eyes asking "why do we have this?" are the most useful contribution, and he reads every notification. He is largely working alone and tunnel-visioning.
