## Typescript as an IDE-powered feedback loop

- Matt defines TypeScript as a way of making your IDE more powerful: autocomplete, red squiggly errors, and warnings when code isn't doing what you think.
- JavaScript has no types, so TypeScript adds syntax on top so it can understand your code at a deeper level.
- Its origins: people compiled C# to JavaScript (ScriptSharp) to make big apps workable. Steve Luco and team saw that people wouldn't learn C# just for that, so TypeScript's innovation was also making types familiar to JavaScript developers.
- A type is a contract or constraint. For an add function, `a: number, b: number` is the contract for calling it correctly.
- TypeScript compiles to JavaScript and strips all types, so types don't exist at runtime. Confidence comes from TypeScript checking calls ahead of time.
- Two feedback loops: the JavaScript loop (write, switch to browser or node, run, which can be slow for a third step of a multi-step form) and a much shorter loop inside the IDE.
- Does TypeScript make you slower? Matt says no. Once you're comfortable with types, the shorter loop lets you code much longer before checking in the browser.
- He estimates an experienced JavaScript developer can get productive with TypeScript in about a week to 10 days of focused work.

## The three parts of TypeScript

- Matt describes TypeScript as three things bundled under one name: the language, the CLI (compiler), and the language server in your IDE.
- In an open-source world these would likely be separate packages. They share a name because one Microsoft team of "seven or eight people" builds them together.
- The CLI doesn't have to emit JavaScript. It can just check the whole project.
- His metaphor: TypeScript is like the English language. The language server is a teacher looking over your shoulder with red squiggles, and the CLI is turning in the whole essay to be marked.
- ESLint vs TypeScript: ESLint is single-file and runs rules per file, so it parallelizes. TypeScript checks the whole project because global things (such as which ECMAScript version, e.g. `replaceAll` being ES2023) affect every file.
- TypeScript knows "the type of everything", so it can make much smarter judgments. Some ESLint rules use TypeScript's knowledge.

## Open object types, excess properties, and why TypeScript chose them

- TypeScript has open (non-exact) object types. Flow had exact object types by default.
- Example: a fetch function taking `{ url, timeout? }`. Passing a misspelled `timeOut` as a fresh object literal errors. Put the object in a variable first and pass it, and TypeScript accepts it, even with a thousand extra properties.
- TypeScript treats an object literal passed directly as "fresh" and checks excess properties. Otherwise it only cares that the required properties are present.
- Upside of exact types (Flow): you know exactly which keys exist, so `Object.keys` can be typed precisely. In TypeScript, `Object.keys` returns `string[]` because extra keys are possible.
- Matt's reading of TypeScript's choice: it mirrors object-oriented subtyping. You should be able to pass a Chihuahua where an Animal is expected. He links it to C#'s creator being heavily involved in TypeScript.
- There's no real way to get exact object types in TypeScript. Generic tricks exist but "don't feel good", and fighting the language isn't worth it.
- Real-world gotcha: returning an object with excess properties from a function inside a `useState` updater doesn't error, which people complain about constantly.
- Practical answer: validate at runtime. Zod's `schema.parse` strips excess keys so you know what you're working with.
- His summary: excess properties "can just appear like wild Pokémon all the time".

## Self-documenting APIs with JSDoc

- Matt recommends heavy, high-quality JSDoc comments on APIs and functions, so hovering in the IDE shows what they do, with usage examples and links to related types.
- Story: during night wakeups with his newborn (born January 2024), he made seven or eight PRs to the React types adding JSDoc comments, e.g. for `React.ReactNode`. They were merged.
- He's skeptical of auto-generated API doc sites (TSDoc-style tools). They give "cookie-cutter" output, mirror what's in the IDE, surface internal stuff that shouldn't be documented, and can become an excuse not to write real docs.
- His recommended combo: tons of good JSDoc plus a well-written handwritten docs site.
- Interactive playgrounds depend on the audience. They make sense for visual components or when users get real value; auto-spewing TSDoc onto a site isn't documentation.

## Complex types, DRY, and when to use any

- Complex TypeScript comes from complex JavaScript, since types only describe what the JS does. If types get gnarly, simplify the code first.
- Often the urge to perfect types comes from wanting code to be DRY, creating abstractions (generic functions) so you don't repeat yourself. Matt's advice for a team stuck on types: simplify the JavaScript, write "dumber code", decompose into smaller functions.
- Derived vs decoupled types: an avatar component's props and a database user object shouldn't be linked just because they share fields. Linking them via clever generics couples the system so a change in one place echoes everywhere. He argues for being "stupid" at boundaries.
- Knowing when to use `any` is "game sense", built by experience and understanding TypeScript's mental models (which is what his book targets). "We're not in the business of writing complicated TypeScript, we're in the business of serving users."
- Story: he recently upgraded a package, slapped a few `any`s on the resulting errors, and the upgrade really had broken something.
- Legitimate assertions: telling TypeScript that `document.getElementById('root')` is never null, because you know more than it does. The risk is the reverse, where TypeScript knows more than you.

## The Redux Reselect type story

- Matt tells how Mark Erikson spent about two weeks writing a long, complex generic type for Reselect's `createSelector`.
- TypeScript tests new compiler versions against the ecosystem. During 4.9 testing, that single type was the only thing in the ecosystem that broke.
- Anders Hejlsberg himself rewrote it, shorter, more elegant, faster, and compatible with older versions.
- Matt's takeaway: the TypeScript team are "wizards".

## ts-ignore vs ts-expect-error vs as any

- `@ts-ignore` suppresses every error on the next line. `@ts-expect-error` does the same but errors if the next line has no error, so it cleans up after itself when, say, a dependency is fixed. Matt uses `@ts-expect-error` heavily in his courses to assert something should fail.
- But he says both are sledgehammers: they hide everything on the line, including misspellings, nonexistent variables, and faulty imports.
- His preference in application code: `as any` on the specific node, since it targets one thing, usually the thing you need to get past. There's no "expect error" equivalent for `as any`.
- Why `any` rather than `unknown`: `unknown` is the top type, the "upstanding country lawyer" of the type system that you can't do anything with without narrowing. `any` is assignable to and from everything and disables checking on itself, so it is "the hooligan, the destroyer of types".

## Where TypeScript is heading

- TypeScript won't chase ecosystem trends such as typed file-based routing (Remix-style `$param` filenames feeding `loader` types). It would be possible and useful, but TypeScript has little incentive to bake in a fashion that might turn out to be a bad idea.
- Matt's wish: types in JavaScript itself, via the TC39 types-as-comments proposal (talked about at JSConf Budapest). Types would be ignored by the runtime, with the TypeScript CLI and language server still checking.
- That would remove the whole build step of stripping types and generating source maps. He hit this pain trying to set up the VS Code debugger for TypeScript files, and Node only recently added experimental TypeScript support.
- Advice for learning: function parameter annotations get you about 90% of the way, since most other types are inferred.

## Career, hunger, and teaching

- Matt was a self-employed singing teacher for about 6 years (drama degree, a master's at Guildford School of Acting, later London drama schools), setting up three businesses in three cities. He started because a friend needed a teacher for a singing-lessons site.
- He taught himself to code and moved into development around age 25, going junior to lead in roughly 3 years.
- He then worked on XState, answering GitHub issues and writing articles for about 2 years, growing from roughly 400 to 3,000-4,000 followers, then joined Stately.
- His breakout: in February 2022 he posted a 2-minute, no-cuts video of advanced TypeScript from his XState work and gained 39 followers in an hour. He recorded about 12 tips in one Sunday and queued them out, growing from around 4K to 10K very quickly, then teamed up with Joel Hooks at Egghead.
- He says the growth wave has "crashed a little" since his baby was born, and he is grateful for it (including having more time with his son). He's open to broadening beyond TypeScript, and would even like to return to full-time engineering on a team.
- On hustle: his goal was never to work more but "to work at as high a leverage as possible" so he could earn enough without working much. He frames his 20s as "competence" and 30s as "compassion", and says hustle culture only covers the first.
- On impostor syndrome: fear of not being good enough drove him to consume everything (he cycled to work listening to the Syntax podcast). He advises turning that fear into hunger.
- On heroes: each step up in singing teaching showed him the people above him were "just people", which prepared him for tech, including seeing peers like Kent C. Dodds as regular people.
