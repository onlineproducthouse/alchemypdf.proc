# syntax=docker/dockerfile:1

ARG IMAGE_REGISTRY_BASE_URL

FROM --platform=linux/amd64 ${IMAGE_REGISTRY_BASE_URL}/node:22.9 AS builder

LABEL maintainer="Bongani Masuku <bongani@1702tech.com>"

RUN apt-get update
RUN apt-get install -y gconf-service libasound2 libgbm-dev libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libnss3 lsb-release xdg-utils wget

RUN mkdir -p /app && chown -R node:node /app/

COPY --chown=node:node ./src /app/src
COPY --chown=node:node ./yarn.lock /app/yarn.lock
COPY --chown=node:node ./package.json /app/package.json
COPY --chown=node:node ./tsconfig.json /app/tsconfig.json
COPY --chown=node:node ./.puppeteerrc.cjs /app/.puppeteerrc.cjs

WORKDIR /app

RUN corepack enable && yarn set version berry && yarn && yarn build

RUN npx puppeteer browsers install chrome

ENTRYPOINT [ "sh", "-c", "yarn serve" ]