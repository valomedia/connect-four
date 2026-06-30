# AGENTS.md

## Project Overview

Connect Four is a small React and TypeScript game built with Vite.
Use this repository as a focused frontend codebase:
keep changes small,
prefer direct component updates,
and avoid adding new framework layers unless an issue explicitly asks for them.

## Setup and Commands

- Install dependencies with `npm ci`.
- Run tests with `npm run test`.
- Run linting with `npm run lint`.
- Run the production build and typecheck with `npm run build`.
- Use `npm run dev` only for local manual testing.

Run the narrowest command that proves your change,
then run broader checks when touching shared game logic,
configuration,
or dependencies.

## Code Style

- Use TypeScript and React function components.
- Keep source files as ES modules.
- Use explicit relative extensions for local TypeScript imports,
  matching the existing `./Component.tsx` style.
- Keep component state and game logic easy to read.
  Prefer named helper functions over dense inline expressions.
- Follow the repository's four-space indentation in TypeScript and CSS.
- Match the surrounding style in configuration files.
- Preserve existing copyright headers in source files.
- Put component-specific styles beside the component that uses them.

## Testing Guidance

- Add or update Vitest tests for behavior changes.
- Prefer React Testing Library queries that reflect user-visible behavior.
- Keep tests colocated with the component under test.
- Verify game-rule changes with tests for token placement,
  turn order,
  winning states,
  and reset behavior when relevant.

## Repository Hygiene

- Do not commit generated build output such as `dist/`.
- Do not add secrets,
  credentials,
  or environment-specific files.
- Keep `package-lock.json` in sync when dependencies change.
- Do not introduce new dependencies for simple UI or game-logic changes
  without a clear need.
