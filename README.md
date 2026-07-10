# Connect Four

Toy implementation of the connect four kids game,
used as a sandbox for training and coding challenges.

## Development container

This repository includes a Docker-backed devcontainer
so the full npm-based development workflow can run away from the host system.
Open the project with VS Code Dev Containers
or any compatible devcontainer client.
The container uses Node.js 22,
installs dependencies with `npm ci --include=dev`,
and installs Chromium for Playwright integration tests during post-create setup.

The devcontainer runs as the non-root `node` user,
does not mount the host Docker socket,
and keeps `node_modules`,
the npm cache,
and the Playwright browser cache in Docker named volumes.
Its one-time setup uses sudo only to make those named volumes writable,
then removes passwordless sudo before running `npm ci`.
That keeps package-manager side effects inside Docker while leaving the source tree editable.

Common commands inside the container:

- `npm run dev` - start the Vite development server on port 5173.
- `npm run lint` - run ESLint.
- `NODE_ENV=test npm run test` - run the Vitest suite once.
- `npm run test:integration` - run the Playwright integration tests.
- `npm run build` - typecheck and build the production app.
