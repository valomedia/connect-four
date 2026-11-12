# AGENTS.md – Connect Four

## Project
- This repository is a small Vite,
  React,
  and TypeScript implementation of the Connect Four game.
- It uses ES modules (`"type": "module"`) and npm lockfile-based dependency management.

## Commands
- `npm ci --include=dev` - install dependencies from `package-lock.json`,
  including lint,
  test,
  and build tooling in shells where `NODE_ENV=production`.
- `npm run dev` - start the Vite development server.
- `NODE_ENV=test npm run test` - run the Vitest test suite once.
- `npm run test:integration` - run the Playwright browser integration tests.
- `npm run lint` - run ESLint across the repository.
- `npm run docs` - validate doc-comments and regenerate `docs/api/` with TypeDoc.
- `npm run test:docs` - test doc-comment enforcement and the Git hook in an isolated repository.
- `npm run build` - run TypeScript project builds and create the Vite production build.
- `npm run preview` - preview the built Vite app locally after a build.

## Structure
- `src/main.tsx` - React entry point that mounts `<App />`.
- `src/App.tsx` - top-level game page and board container.
- `src/components/Board.tsx` - game board state,
  turn handling,
  win detection,
  and reset behavior.
- `src/components/Square.tsx` - individual board square button.
- `src/components/*.test.tsx` - colocated React Testing Library and Vitest tests.
- `src/test/setup.ts` - shared Vitest setup for cleanup and jest-dom matchers.
- `tests/integration/*.spec.ts` - Playwright browser integration tests.
- `public/` - static assets served by Vite.

## Working rules
- Preserve the existing copyright headers when editing source,
  test,
  config,
  or stylesheet files that already have them.
- Keep component styles colocated with their component CSS files.
- Internal React component imports in this codebase use explicit `.tsx` extensions.
- Prefer function declarations for React components and local helpers,
  matching the existing component style.
- Do not hand-edit generated build output such as `dist/` or generated API docs in `docs/api/`.
- `npm ci --include=dev` installs the Husky pre-commit hook through `prepare`.
  The hook regenerates and stages only `docs/api/`.
  Stage or stash all source and documentation-tooling changes before committing;
  the hook rejects unstaged or untracked inputs, including ignored source files.
- Exported application APIs need doc-comments,
  including modules (`@module`), properties, parameters (`@param`),
  type parameters (`@typeParam`), and inline parameter members.
  `typedoc.json` excludes the mounting entry point and tests.
  `scripts/validate-doc-comments.mjs` supplements TypeDoc's native validation gaps.

## Testing
- Run `NODE_ENV=test npm run test` for component and game behavior changes.
- Run `npm run test:integration` for end-to-end browser coverage.
- Run `npm run lint` for TypeScript,
  React,
  and hook rule checks.
- Run `npm run build` when changes affect TypeScript types,
  Vite config,
  public assets,
  or production build behavior.
