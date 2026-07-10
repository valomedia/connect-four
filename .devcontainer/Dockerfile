# syntax=docker/dockerfile:1

FROM mcr.microsoft.com/devcontainers/typescript-node:1-22-bookworm

ARG PLAYWRIGHT_VERSION=1.61.1

COPY prepare-volumes-and-drop-sudo.sh /usr/local/bin/connect-four-devcontainer-prepare-volumes

RUN npx --yes playwright@${PLAYWRIGHT_VERSION} install-deps chromium \
    && npm cache clean --force \
    && chmod 0755 /usr/local/bin/connect-four-devcontainer-prepare-volumes
