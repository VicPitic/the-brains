## Inferred types vs explicit return types

- Matt prefers inferred types because they are the most likely to be correct. On XState, types for state machines were so complex and threaded through so many functions that annotating them by hand was "way more trouble than it's worth", since it overrides what the system already knows.
- He sees explicit return types as useful mainly when you want to lock down a function that is used in many places.
- TypeScript is clever enough to work out the correct type from your if statements and switches.
- To pick one member out of a union (say a Square from Circle, Triangle, Square, null, undefined), he lists several routes:
  - a custom type predicate, such as `isSquare`
  - an `in` check on a property
  - a discriminated union with a `type` field, then `if (object.type === "square")`

## Using `any` pragmatically

- Matt describes a mid-wit bell curve meme: beginners use `any`, the angry middle says "you can't use any", and experts use `any` again.
- If the outside of a function is properly typed, `any` inside it matters little, especially if the function is tested.
- He calls `any` "just another tool" to be used sparingly, not all over.
- Libraries such as Zod, tRPC and React Query have `any`s in their code because the types are so complex that TypeScript cannot keep up. He compares it to "locking TypeScript in a cupboard for that line".
- If you are going to come back and fix it, `any` is fine for now. If you won't revisit it, spend the time to type it properly.

## The biggest TypeScript mistake: not reading the errors

- Matt says the biggest mistake is getting scared of errors and not reading them.
- A console stack trace puts the most relevant information at the top. A TypeScript error is in reverse: the least relevant information comes first, and the failed comparison sits at the very bottom.
- People read the first line, see an unfamiliar third-party type, and give up. His advice is to read the error from the bottom up, because the bottom shows what actually failed.
- The error language is also very precise and based on the AST (abstract syntax tree), using words like "identifier" and "name property", which is unfamiliar unless you have seen lots of these errors.
- His VS Code extension TS Error Translator rewrites errors into plain English.
- The Total TypeScript extension adds a second feature: a small blue hint on complex syntax such as generics, with a link to the relevant docs.

## How Matt got into TypeScript: API contracts and a generic table

- At a job (the same one where he adopted hooks) a small front-end team was chasing a large back-end team. The API kept changing, with casing wrong, fields unexpectedly null, and contracts shared as Json pasted into a Google doc.
- He wanted GraphQL for a proper contract. When that did not work, he went for TypeScript instead.
- He described the API interfaces in TypeScript, replaced the Google doc, and built a proof of concept in which fetched data flows down through the app with those interfaces.
- His teammates reacted with "we're just never going to ship a bug again", since their bugs mostly came from faulty API responses. Velocity went up.
- His first TypeScript component was a generic table component whose render-row function changed based on the data passed in. That let them drop many type annotations.
- At a later job he converted a fully JS React Native app to TypeScript, and then XState exposed him to advanced types.
- The moment he fell for TypeScript was his first refactor: when the data shape changed, he changed the interface and a four-hour job became a five-minute job, because TypeScript showed everywhere that needed updating. It "felt like cheating".

## Adopting TypeScript in an existing JavaScript project

- Matt's view is that TypeScript does not have to be all or nothing. Many projects keep a typed core (utilities, API methods, database access) at the center of the tree, with the leaf components still in JavaScript.
- JSDoc comments can give you the autocomplete without TypeScript itself.
- For him, coding without TypeScript feels like "coding in low power mode", "semi-skimmed coding", and like losing a friend.
- He says TypeScript is sticky: people who get into it do not go back to JavaScript when they are under deadline pressure, unlike practices such as unit testing or TDD that people drop on the next project.
- Generous abstractions are a benefit. A generic group-by function can be used across a code base, and consumers get inference without annotating.
- If a team is hesitant, he suggests asking whether you hit "can't call that because it's undefined" issues. If you do, TypeScript will help, and most projects grow complex enough to need it.
- For doubters, he recommends:
  - trying it on a toy project
  - installing his VS Code extension
  - reading the TypeScript handbook cover to cover, which he finds good as a beginner experience though it lacks coverage in places
- He says he no longer spends time arguing that TypeScript is good, because it is already in nearly every conversation in the industry.

## New in TypeScript 5.2: the `using` keyword

- The `using` keyword reached stage 3 at TC39 and arrives in TypeScript 5.2 (the beta was due within a few weeks of this June 2023 recording).
- If the returned value has a `Symbol.dispose` method (or `Symbol.asyncDispose`), the resource is closed automatically when the variable leaves scope. So `using database = getDb()` replaces a try/catch/finally that closes the connection.
- It guards against forgetting to close connections, which can leave hundreds open and crash a database.
- He gives WebSockets and file reading as other uses, such as opening a socket for one call and closing it again.
- It is inspired by C#, where it is a very popular feature.

## React: hooks, effects and state machines

- Matt put hooks into production the day they were announced, with no documentation, because they solved duplicated code in his project. He says he has "never looked back" and does not understand most criticisms of hooks.
- He views hooks as something like a domain-specific language for the React environment.
- He says old patterns such as `shouldComponentUpdate` bought performance but cost robustness and maintainability.
- `useEffect` gave "an amazingly simple API that was an extremely sharp knife": cut yourself easily, but good abstractions if you are skilled.
- He often reached for XState instead of `useEffect` because a state chart makes the lifecycle easy to follow, "if you've got it in a freaking PNG".
- On signals: he likes Ryan Carniato's framing that signals are effects used to update the DOM and create bindings. He has not used them, having focused on XState's React integration, and would like to see state machines combined with signals.
- Tailwind over vanilla CSS: he is "terrified of the Cascade". Tailwind fits the component model, and since adopting it three or four years ago the CSS bugs have gone away. The VS Code extension gives smart autocomplete, and Tailwind Merge combines variants.
- He has never used `git rebase`, only merges.

## Total TypeScript and his teaching approach

- Matt has been a full-time TypeScript educator for about a year, working mostly through Twitter, YouTube and courses. Before that he did developer advocacy at Vercel and worked on XState at Stately.
- Total TypeScript has a free beginners tutorial and a free "beginners with React" tutorial, produced to the same standard as the paid material but shorter.
- His format is practical: about a minute of video, then a small task for you to do, then he shows how he would have done it.
- He dislikes "40 hours of content" video courses, saying "there's no way I'm gonna do that".
- The site's wizard illustrations come from illustrator Michelle Holick, who produced them from scratch with no notes from him. He said the artwork inspired the rest of the site.
- Before development he was a voice and singing teacher for about six years, with a master's in voice and singing, teaching accents, public speaking and Shakespeare. He says this is why he can hold his own in front of clients and why the teaching itch is now scratched.
