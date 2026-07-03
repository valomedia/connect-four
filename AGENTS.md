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
- `npm run lint` - run ESLint across the repository.
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
- Do not hand-edit generated build output such as `dist/`.

## Testing
- Run `NODE_ENV=test npm run test` for component and game behavior changes.
- Run `npm run lint` for TypeScript,
  React,
  and hook rule checks.
- Run `npm run build` when changes affect TypeScript types,
  Vite config,
  public assets,
  or production build behavior.
