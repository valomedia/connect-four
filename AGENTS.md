# AGENTS.md – Connect Four

## Project overview

This repository is a small Connect Four game built with Vite, React, and TypeScript.
The browser entry point is `src/main.tsx`,
which renders `src/App.tsx` and the game board in `src/components/Board.tsx`.

## Setup and commands

- Install dependencies with `npm ci --include=dev`.
- Start the local Vite dev server with `npm run dev`.
- Run linting with `npm run lint`.
- Run the Vitest test suite with `npm run test`.
- Run the production build and TypeScript project check with `npm run build`.

Before handing off code changes,
run the smallest relevant check.
For component behavior changes,
prefer `npm run test` plus `npm run lint`.
Run `npm run build` when TypeScript configuration,
bundling,
or dependency changes could affect production output.

## Repository layout

- `src/main.tsx` mounts the React app.
- `src/App.tsx` provides the top-level page shell.
- `src/components/` contains game UI components,
  colocated CSS,
  and colocated `*.test.tsx` files.
- `src/test/setup.ts` configures React Testing Library cleanup and `jest-dom` matchers for Vitest.
- `public/` contains static site assets.
- `.github/workflows/ci.yml` defines the GitHub Actions lint,
  test,
  and build checks on Node.js 22.

## Code style

- Use ES modules and TypeScript throughout the app.
- Keep React components as named `function` declarations with a default export,
  matching the current component files.
- Keep source imports explicit,
  including `.tsx` extensions for local component imports where the project already uses them.
- Keep component styles in colocated CSS files beside the component when practical.
- The TypeScript app config is strict;
  avoid unused locals,
  unused parameters,
  and unchecked side-effect imports.
- Do not hand-edit generated output such as `dist/`,
  or dependency directories such as `node_modules/`.

## Testing guidance

- Tests use Vitest, React Testing Library, `@testing-library/user-event`,
  and `@testing-library/jest-dom`.
- Add or update colocated `*.test.tsx` files for component behavior changes.
- Prefer user-visible queries such as roles and text over implementation details.
- Keep tests deterministic and avoid relying on a running Vite dev server.
