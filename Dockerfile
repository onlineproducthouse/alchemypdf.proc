# syntax=docker/dockerfile:1

ARG IMAGE_REGISTRY_BASE_URL

FROM ${IMAGE_REGISTRY_BASE_URL}/node:25.2.1-alpine AS base

LABEL maintainer="Bongani Masuku <bongani@1702tech.com>"

RUN apk add --no-cache \
  git \
  msttcorefonts-installer \
  font-noto \
  fontconfig \
  freetype \
  ttf-dejavu \
  ttf-droid \
  ttf-freefont \
  ttf-liberation \
  nss \
  harfbuzz \
  ca-certificates \
  chromium \
  envsubst \
  && rm -rf /var/cache/apk/* /tmp/*

RUN update-ms-fonts \
  && fc-cache -f

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
