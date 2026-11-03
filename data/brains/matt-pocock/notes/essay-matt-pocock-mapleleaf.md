## Why Matt moved from JavaScript to TypeScript-first (feedback loops and "time to error")

- Matt argues TypeScript's main gift is a much shorter "time to error". The gap between making a mistake and learning about it is smaller than in JavaScript.
- In TypeScript he gets a red squiggly the moment he calls a function wrong. In JavaScript the call may be accepted, the returned value is slightly off, and the feedback never arrives when he needs it.
- Working in TypeScript, he can spend about 10 minutes in the IDE before tabbing to the browser, and still know whether the code will work. In plain JavaScript it was "make a change, tab over" in a loop.
- "As web devs, we love a good feedback loop." He wants the loop inside the IDE, without switching context.
- TypeScript removes the minimum time JavaScript builds in: tabbing over, checking the browser console, refreshing. "Your tools are working at the speed that you are."
- He says it makes him less scared of the results of his code, because things feel more predictable.
- He suggests new developers should learn TypeScript syntax alongside JavaScript, since TypeScript is becoming ubiquitous. The blocker is material: most beginner content is JavaScript-only, and he may build "TypeScript as your first language" material.
- He describes TypeScript as feeling like pair programming, "in dialogue with something". He likens it to an English teacher who marks errors as you write.
- Failing early matters to him: fail in the IDE, "don't fail it in your browser console. Don't fail it in production."

## Think in data structures and types first; discriminated unions and "all possible futures"

- Matt says TypeScript pushes you to think about data structure before writing runtime code. Writing the types first can give "a lot of extra velocity going forward".
- You can blast a codebase with `any` and get a JavaScript-like experience, but he works at the data-structure level instead.
- He describes union types as letting TypeScript see "into every possible future of your code", like Dr. Strange looking through futures for the one that works or fails.
- A discriminated union is an object with a discriminator property, such as `type`, that is A or B. If `type` is A the object has one set of properties (say, a number). If it is B it has another (say, a string).
- The shift is from "are these optional" to "do these belong to two different types of objects?"
- His example is component props. A modal with a "create" type takes different props than other modal types. TypeScript then checks all possible futures inside and outside the component.
- He links this to state machines: "TypeScript helps you prevent impossible data and finite state machines and state charts help you prevent impossible states." They feel "of a piece".

## Runtime validation with Zod: TypeScript only gives the feeling of safety

- Matt says "TypeScript is not actually type safe. It just gives you the feeling of being type safe." JavaScript lets you break the types easily (`any`, assertions, external data).
- Zod is a runtime schema validation library that makes runtime match compile time. He also names Yup and Ajv.
- It suits mundane jobs like form validation and checking what is passed to API endpoints.
- It also fits the edges of an app. For a third-party API you are not sure you trust, validate the response with a schema.
- If the data is wrong, it fails at that point, early, "without infecting your app".
- He says the hardest errors to debug are unprotected inputs that surface later as "undefined is not a function".
- His summary: runtime validation makes you think more about the edges of your application and makes it more robust.

## Avoid codegen when inference can do the job (XState, GraphQL codegen, tRPC, Prisma)

- At XState, the library's config was "an enormous object", which is hard to infer types from. "TypeScript lives off function calls."
- XState's API had to stay stable (it stayed on version 4), so a new API was not an option. Matt built XState CodeGen (typegen) to fix the types instead.
- It used an AST parser to find the state machine in a file and generate more powerful types. It later shipped as a VSCode extension at Stately.
- He says codegen with an AST parser gives "Thanos level power" because you can get any inference you want, beyond TypeScript's limits.
- His rule: "if you can avoid it, it's always better to avoid it."
- GraphQL codegen needs a sidecar process next to the dev server to convert the GraphQL DSL into TypeScript. That is a slightly worse experience than pure TypeScript inference.
- tRPC needs no dev script. A well-designed API gives inference between front end and back end. His conclusion: avoid the codegen step if you can.
- Prisma is a "good codegen" case. It prints types into node_modules, which you can pull out.
- He asks whether a nav bar should use the exact database `User` type or redeclare it. In JavaScript you never face that question, and TypeScript adds a layer of design thinking.
- He also says the hardest part of AST work and VSCode extension development is the lack of guidance. You have to live off examples. He uses Babel and astexplorer.net.
- His in-progress VSCode extension puts a blue squiggle under TypeScript syntax the developer hasn't seen, such as conditional types. Hovering shows an explanation, powered by an AST parser.

## Generics as the key to library design and developer experience

- Matt says functions put a barrier in TypeScript inference because they declare a contract. Generics pull inference back in. They infer a function's output from its input, or infer one input from another.
- Libraries need generics to support many use cases. Data-fetching libraries have a dynamic fetch result and arguments. Form libraries have a dynamic form state.
- He draws a divide between app types and library types. An app is mostly a consumer of library types. The most painful errors come from not understanding library types or not being able to read declaration files.
- Declaration files and "find definition" walls can be terrifying to newcomers. He says "this stuff is not as hard as it seems."
- Adding a generic to a function means callers don't need to annotate anything. "If you do it, other folks won't have to." In use it is "literally just JavaScript."
- His example of a senior-level contribution is a generic table component that accepts any data and renders a table. This gives teammates a developer experience they couldn't imagine before.
- He is scanning open source apps with his AST parser for advanced generics and finds a surprising amount. Building small shared libraries across an organization also requires advanced TypeScript.
- He pushes back on "avoid hasty abstractions": the right abstraction, with TypeScript tying it together, can raise team velocity a lot.
- Carl and MapleLeaf, not Matt, supplied the idea that this is what a "10x developer" is. Matt's own joke was "a DX developer", and he finds it satisfying to help colleagues.

## TypeScript as guardrails for AI coding tools

- Matt says that with tools like GitHub Copilot and ChatGPT, it will be even more important to have tools like TypeScript.
- Its job is to "hold the hand of experimental AI stuff" and act as guardrails, so the output isn't random code.
- He likes the feeling that he "could turn up to work drunk and TypeScript would still prevent me from doing mistakes."
- He contrasts TypeScript's sense of dialogue with JavaScript's feeling of working alone.

## Teaching background and the Total TypeScript course (January 2023)

- Matt was a singing teacher and voice coach for about six years, with a master's, and ran a YouTube channel teaching accents. He moved into development about six years before this talk.
- He says teaching made it easier to explain things to non-technical people. He moved from junior to mid to senior to lead faster than expected because he was put in front of clients more often.
- While coaching he built small web apps (flashcards, web audio tools) in the gaps between lessons. He had no production experience but knew odd corners of the DOM and web APIs from reading MDN.
- He was drawn to state machines because they had academic backing and were around 40 to 50 years old. State charts came from David Harel. To him they felt like a teaching pedagogy.
- Career path: XState core team and Stately (visual tooling for state machines), then Vercel as developer advocate, where he helped launch TurboPack and worked on TurboRepo. He then went independent.
- Total TypeScript (totaltypescript.com):
  - Module 1 launched December 2022 and covers transforming types into other types.
  - Module 2, dropping soon, is an intro to generics.
  - Module 3 is planned on advanced patterns.
  - Plans for 2023 include more modules, a free beginner's course and quality free materials.
- Books he named: Josh Goldberg's TypeScript book and Effective TypeScript.
- Productivity note: he calls himself "a bit of a productivity freak" who looks for ways to code faster.
