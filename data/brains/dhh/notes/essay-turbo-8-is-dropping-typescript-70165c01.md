## Dropping TypeScript from Turbo 8: the decision

- DHH announced in September 2023 that Turbo 8 drops TypeScript, and says he is glad to do it.
- He has never been a fan of TypeScript, "not after giving it five minutes, not after giving it five years".
- Many people love adding explicit, compiler-checked types to JavaScript, and he acknowledges TypeScript has been a big success for Microsoft.
- He frames the move as a personal preference for his own code, not a call to convert anyone.

## Why he prefers plain modern JavaScript

- He likes JavaScript, calling it his second favorite language after Ruby, though "a distant second".
- He did not always feel this way. Proper classes and the other improvements since ES6 made it "a real joy to write".
- He does not think JavaScript suits most server-side web app work, but respects people who feel differently.
- Browsers can interpret modern JavaScript with no compiler at all, which he sees as good fortune.

## What bothers him about TypeScript

- It adds an explicit compile step, which gets in the way of running JavaScript directly in the browser.
- It "pollutes the code with type gymnastics" that add very little joy to his development experience and often considerable grief.
- His summary of the experience: "Things that should be easy become hard, and things that are hard become `any`."

## Why people rarely change their mind on typing

- He points back to his essay "Programming types and mindsets".
- Few programmers want their opinion on typing changed.
- Most people are drawn strongly to typing or to dynamic languages early in their career, then spend the rest of it rationalizing "The Correct Choice" to themselves and others.
- He is not trying to persuade anyone, in line with that view.

## Compatibility: mix and match

- He credits the TypeScript team for realizing a full take-over of JavaScript was never going to happen, so complete compatibility with JavaScript was built in from the start.
- Dropping TypeScript from Turbo does not stop anyone from writing client code in TypeScript or using libraries that employ it.
- He calls this ability to mix and match "wonderful".

## JavaScript as a language of necessity

- He contrasts Ruby, a language of choice on the server, with JavaScript, a language of necessity on the client.
- Dialects can be compiled into JavaScript, but running code in the browser still means running JavaScript.
- Given that, he sees being able to write it "free of any tooling, and free of any strong typing" as a blessing.
- His sign-off: TypeScript can bring rigor and satisfaction to its tribe, while the rest of us enjoy JavaScript "free of strong typing", in the spirit it was originally designed.
