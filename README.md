# Connect Four

A small Vite, React, and TypeScript implementation of the classic Connect Four game.
Players take turns dropping red and blue tokens into a seven-column board until one player connects four tokens in a row, column, or diagonal.
The repository also serves as a sandbox for training and coding challenges.

## Requirements

- Node.js 22 or higher
- npm

## Getting started

Install dependencies from the lockfile:

```sh
npm ci --include=dev
```

Start the local development server:

```sh
npm run dev
```

Then open the Vite URL printed in the terminal.

## Available scripts

- `npm run dev` - start the Vite development server.
- `npm run lint` - run ESLint across the repository.
- `npm run docs` - validate doc-comments and regenerate Markdown API documentation.
- `npm run test:docs` - test documentation validation and the commit hook in a temporary Git repository.
- `NODE_ENV=test npm run test` - run the Vitest and React Testing Library tests once.
- `npm run test:integration` - run the Playwright browser integration tests.
- `npm run build` - type-check the project and create a production build in `dist/`.
- `npm run preview` - preview the production build locally.

## API documentation

Browse the [generated API reference](docs/api/README.md).
TypeDoc and `typedoc-plugin-markdown` generate it from exported application APIs in `src/`.
The React mounting entry point, tests, and test setup are excluded.

Dependency installation also installs the Husky pre-commit hook.
On every commit, the hook runs `npm run docs`
and stages only the generated `docs/api/` directory, including removal of obsolete pages.
Missing doc-comments or other TypeDoc warnings block the commit.
Document modules with `@module`, exported declarations and properties with `/** ... */`,
parameters with `@param`, and type parameters with `@typeParam`.
Inline parameter properties also need doc-comments.
The local validation plugin covers declarations that TypeDoc's built-in missing-comment check skips.

Stage or stash all changes under `src/`, `scripts/`, and `.husky/`,
as well as changes to package files, `typedoc.json`, and root `tsconfig*.json` files before committing.
The hook rejects unstaged or untracked documentation inputs rather than generating docs from code
that is not part of the commit.
Ignored source files also block the commit because TypeDoc can discover them.
Unrelated files are never staged automatically.

Do not edit `docs/api/` by hand; update the source comments and run `npm run docs` instead.
Source links are disabled so generated Markdown does not depend on the current Git commit.
If Git hooks were not installed, run `npm run prepare` to install them.

## Project structure

- `src/main.tsx` - React application entry point.
- `src/App.tsx` - top-level game page.
- `src/components/` - board and square components with colocated tests and styles.
- `src/test/setup.ts` - shared Vitest test setup.
- `tests/integration/` - Playwright end-to-end tests.
- `public/` - static assets copied into the Vite build.

## Development notes

Generated build output in `dist/` should not be edited by hand.
Component styling lives beside the component it belongs to, and internal component imports use explicit `.tsx` extensions.
