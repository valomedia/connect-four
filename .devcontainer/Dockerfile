# syntax=docker/dockerfile:1

FROM mcr.microsoft.com/devcontainers/typescript-node:1-22-bookworm

COPY prepare-volumes-and-drop-sudo.sh /usr/local/bin/connect-four-devcontainer-prepare-volumes

RUN npx --yes playwright install-deps chromium \
    && npm cache clean --force \
    && chmod 0755 /usr/local/bin/connect-four-devcontainer-prepare-volumes
