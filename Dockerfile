# syntax=docker/dockerfile:1

# ARG IMAGE_REGISTRY_BASE_URL

# Stage - base
FROM ${IMAGE_REGISTRY_BASE_URL}/node:22.9 AS base

LABEL maintainer="Bongani Masuku <bongani@1702tech.com>"

# Install Google Chrome Stable and fonts
# Note: this installs the necessary libs to make the browser work with Puppeteer.
RUN apt-get update \
  && apt-get install -y wget gnupg \
  && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
  && apt-get update \
  && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
  --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*

# Stage - builder
FROM base AS builder

RUN mkdir -p /home/node/app/ \
  && chown -R node:node /home/node/app

WORKDIR /home/node/app/

COPY ./src ./src
COPY ./package.json ./package.json
COPY ./tsconfig.json ./tsconfig.json
COPY ./.puppeteerrc.cjs ./.puppeteerrc.cjs

RUN npm run clean:all \
  && npm i \
  && npx puppeteer browsers install chrome \
  && npm run build

# Stage - api
FROM base AS api

RUN mkdir -p /home/node/app/ \
  && chown -R node:node /home/node/app

WORKDIR /home/node/app/

COPY --chown=node:node --from=builder /home/node/app/.cache ./.cache
COPY --chown=node:node --from=builder /home/node/app/lib ./lib
COPY --chown=node:node --from=builder /home/node/app/types ./types
COPY --chown=node:node --from=builder /home/node/app/node_modules ./node_modules
COPY --chown=node:node --from=builder /home/node/app/package.json ./package.json
COPY --chown=node:node --from=builder /home/node/app/.puppeteerrc.cjs ./.puppeteerrc.cjs

USER node

ENTRYPOINT [ "sh", "-c", "npm run serve" ]
