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
- `NODE_ENV=test npm run test` - run the Vitest and React Testing Library tests once.
- `npm run test:integration` - run the Playwright browser integration tests.
- `npm run build` - type-check the project and create a production build in `dist/`.
- `npm run preview` - preview the production build locally.

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
