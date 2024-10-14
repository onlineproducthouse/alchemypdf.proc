# syntax=docker/dockerfile:1

ARG IMAGE_REGISTRY_BASE_URL

FROM ${IMAGE_REGISTRY_BASE_URL}/node:22.9-alpine AS builder

LABEL maintainer="Bongani Masuku <bongani@1702tech.com>"

RUN mkdir -p /home/node/app/ && chown -R node:node /home/node/app

WORKDIR /home/node/app/

COPY ./src ./src
COPY ./package.json ./package.json
COPY ./tsconfig.json ./tsconfig.json
COPY ./.puppeteerrc.cjs ./.puppeteerrc.cjs

RUN npm run clean:all && npm i && npm run build

FROM ${IMAGE_REGISTRY_BASE_URL}/node:22.9 AS api

RUN apt-get update
RUN apt-get install -y gconf-service libasound2 libgbm-dev libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libnss3 lsb-release xdg-utils wget

WORKDIR /home/node/app/
RUN chown -R node:node /home/node/app/

COPY --chown=node:node --from=builder /home/node/app/lib ./lib
COPY --chown=node:node --from=builder /home/node/app/types ./types
COPY --chown=node:node --from=builder /home/node/app/node_modules ./node_modules
COPY --chown=node:node --from=builder /home/node/app/package.json ./package.json
COPY --chown=node:node --from=builder /home/node/app/.puppeteerrc.cjs ./.puppeteerrc.cjs

USER node

RUN npx puppeteer browsers install chrome

ENTRYPOINT [ "sh", "-c", "npm run serve" ]