FROM node:24

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

# Run as the image's built-in unprivileged `node` user (uid 1000). It matches
# the typical host user, so anything the dev server writes into the bind-mounted
# project is owned by the host user instead of root.
RUN chown node:node /app
USER node

COPY --chown=node:node package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
