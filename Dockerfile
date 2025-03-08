# syntax=docker/dockerfile:1

ARG IMAGE_REGISTRY_BASE_URL

FROM ${IMAGE_REGISTRY_BASE_URL}/node:22.9-alpine3.21 AS base

LABEL maintainer="Bongani Masuku <bongani@1702tech.com>"

RUN apk add --no-cache \
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
  && rm -rf /var/cache/apk/* /tmp/*

RUN update-ms-fonts \
  && fc-cache -f

FROM base AS build

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY ./src ./src
COPY ./package.json ./package.json
COPY ./tsconfig.json ./tsconfig.json
COPY ./.puppeteerrc.cjs ./.puppeteerrc.cjs

RUN npm run clean:all \
  && npm i \
  && npm run build

FROM base AS api

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

RUN mkdir -p /home/node/Downloads \
  && mkdir -p /home/node/app \
  && chown -R node:node /home/node/Downloads \
  && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY --from=build /home/node/app/lib ./lib
COPY --from=build /home/node/app/types ./types
COPY --from=build /home/node/app/node_modules ./node_modules
COPY --from=build /home/node/app/package.json ./package.json
COPY --from=build /home/node/app/package-lock.json ./package-lock.json
COPY --from=build /home/node/app/.puppeteerrc.cjs ./.puppeteerrc.cjs

RUN npm i puppeteer@13.5.0

USER node

ENTRYPOINT [ "sh", "-c", "npm run serve" ]
