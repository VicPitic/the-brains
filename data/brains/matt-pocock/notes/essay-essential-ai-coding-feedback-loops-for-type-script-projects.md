## Why AI agents need feedback loops

- Matt says feedback loops let an AI coding agent verify its own work, and they matter most when the agent runs independently.
- His examples of independent work are AFK coding, such as with Ralph Wiggum.
- Agents don't get frustrated by repetition. When code fails type checking or tests, the agent "simply tries again".
- Because of this, he treats feedback loops, and pre-commit hooks especially, as "incredibly powerful" for AI-driven development.

## TypeScript type checking as free feedback

- Matt calls TypeScript "essentially free feedback for your AI" and says to use it over JavaScript.
- Setup: add a `typecheck` script to `package.json` that runs `tsc`.
- Type checking catches errors the AI would never find without testing in a browser.

## Automated tests for logical errors

- Matt uses a test framework such as Vitest to catch logical errors that types can't.
- Setup: add a `test` script that runs `vitest`.
- He says basic unit tests covering core functionality are enough to keep the AI on track. They don't need to be exhaustive.

## Husky pre-commit hooks to enforce the loops

- Matt uses Husky to enforce the feedback loops before every commit, so the agent can't skip them.
- Install and initialize:
  - `pnpm install --save-dev husky`
  - `pnpm exec husky init`
- His `.husky/pre-commit` file runs all checks in order:
  - `npx lint-staged`
  - `npm run typecheck`
  - `npm run test`
- If any step fails, the commit is blocked and the AI gets an error message, which it can then act on.

## Automatic formatting with lint-staged and Prettier

- Matt runs Prettier through lint-staged so formatting happens automatically at commit time.
- Install: `pnpm install --save-dev lint-staged`
- `.lintstagedrc` config: `{ "*": "prettier --ignore-unknown --write" }`
- This runs Prettier on all staged files and restages them, so all AI-generated code conforms to the project's formatting standards.
- He notes ESLint could also run here, since it works nicely with lint-staged.

## Giving the agent access to the running frontend

- Matt calls another powerful feedback loop making sure the LLM can access your running dev server locally, so it can check the frontend.
- He points to a video of his that shows how to set that up.
