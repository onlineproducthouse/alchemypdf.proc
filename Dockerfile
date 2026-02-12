# syntax=docker/dockerfile:1

ARG IMAGE_REGISTRY_BASE_URL

FROM ${IMAGE_REGISTRY_BASE_URL}/node:25.2.1-slim AS base

LABEL maintainer="Bongani Masuku <bongani@1702tech.com>"

RUN apt-get update && apt-get install -y \
  chromium \
  fonts-liberation \
  libappindicator3-1 \
  libatk-bridge2.0-0 \
  libatk1.0-0 \
  libcups2 \
  libdbus-glib-1-2 \
  libgbm1 \
  libnss3 \
  lsb-release \
  xdg-utils \
  wget \
  --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*

FROM base AS build

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY ./package.json ./package.json
COPY ./packages/api ./packages/api
COPY ./packages/config ./packages/config
COPY ./packages/constants ./packages/constants
COPY ./packages/contracts ./packages/contracts
COPY ./packages/processor ./packages/processor
COPY ./packages/utilities ./packages/utilities

RUN npm run clean \
&& npm i \
&& npm run build

FROM base

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

RUN mkdir -p /home/node/Downloads \
&& mkdir -p /home/node/app \
&& chown -R node:node /home/node/Downloads \
  && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY --from=build /home/node/app ./

USER node

ENTRYPOINT [ "sh", "-c", "npm run proc" ]
