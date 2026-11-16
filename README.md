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
- `NODE_ENV=test npm run test` - run the Vitest and React Testing Library tests once.
- `npm run test:integration` - run the Playwright browser integration tests.
- `npm run build` - type-check the project and create a production build in `dist/`.
- `npm run preview` - preview the production build locally.

## API documentation

Browse the [API reference](docs/api/README.md), generated with TypeDoc's `module` router.
Update source doc-comments and run `npm run docs`; do not edit generated pages.
TypeDoc checks its default set of required declarations, and warnings block commits.

`npm ci --include=dev` configures the native Git hooks in `.githooks/`;
run `npm run prepare` to reinstall them.
The pre-commit hook generates and stages only `docs/api/` from an isolated snapshot of staged files,
leaving unstaged and untracked source changes untouched.
It refreshes the docs working copy only if there are no local doc edits or untracked doc files.

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
