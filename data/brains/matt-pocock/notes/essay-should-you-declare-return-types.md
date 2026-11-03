## Return type annotations on top-level functions

Matt recommends a `.cursor/rules` addition that tells an AI assistant to declare return types on functions declared at the top level of a module.

- The rule text he shares: "When declaring functions on the top-level of a module, declare their return types. This will help future AI assistants understand the function's purpose."
- Example from the rule: `const myFunc = (): string => { return "hello"; };`
- The stated motivation is helping future AI assistants understand the function's purpose.
- The rule as written applies to functions declared at the top level of a module.

## Exception: components that return JSX

Matt's rule carves out one exception to the return-type convention.

- React components that return JSX do not need a declared return type.
- His reasoning: "as it is always JSX", so an annotation adds no information.
- Example from the rule: `const MyComponent = () => { return <div>Hello</div>; };` with no return type.

## Writing rules for AI coding assistants

The essay is a short, copyable example of how Matt encodes TypeScript conventions as instructions for an AI coding agent.

- Rules live in `.cursor/rules` and are written as plain-language guidance plus a short code sample showing the preferred form.
- This rule states the convention, gives a reason, and includes an explicit exception.
- Matt links this to his larger set of Cursor rules, which focus on TypeScript language features, documentation, structure (like Result types), teaching the AI nuances such as `noUncheckedIndexedAccess`, and practical habits, rather than specific frameworks.
- He distinguishes shareable, project-specific Workspace Rules (versioned in Git) from personalized Global Rules (living in your IDE) that tailor the AI to an individual's style and workflow.
- His stated goal in sharing the ruleset is to kickstart a discussion on what makes effective AI coding guidance for TypeScript, since he found existing community rules lacking.
