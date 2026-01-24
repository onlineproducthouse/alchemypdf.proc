# syntax=docker/dockerfile:1

ARG IMAGE_REGISTRY_BASE_URL

FROM ${IMAGE_REGISTRY_BASE_URL}/node:25.2.1 AS base

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

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

RUN mkdir -p /home/node/Downloads \
  && mkdir -p /home/node/app \
  && chown -R node:node /home/node/Downloads \
  && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY --from=build /home/node/app/node_modules ./node_modules

COPY --from=build /home/node/app/packages/api/lib ./packages/api/lib
COPY --from=build /home/node/app/packages/api/types ./packages/api/types

COPY --from=build /home/node/app/packages/config/lib ./packages/config/lib
COPY --from=build /home/node/app/packages/config/types ./packages/config/types

COPY --from=build /home/node/app/packages/constants/lib ./packages/constants/lib
COPY --from=build /home/node/app/packages/constants/types ./packages/constants/types

COPY --from=build /home/node/app/packages/contracts/lib ./packages/contracts/lib
COPY --from=build /home/node/app/packages/contracts/types ./packages/contracts/types

COPY --from=build /home/node/app/packages/processor/lib ./packages/processor/lib
COPY --from=build /home/node/app/packages/processor/node_modules ./packages/processor/node_modules
COPY --from=build /home/node/app/packages/processor/types ./packages/processor/types
COPY --from=build /home/node/app/packages/processor/.puppeteerrc.cjs ./packages/processor/.puppeteerrc.cjs

COPY --from=build /home/node/app/packages/utilities/lib ./packages/utilities/lib
COPY --from=build /home/node/app/packages/utilities/types ./packages/utilities/types

RUN npm i puppeteer@13.5.0

USER node

ENTRYPOINT [ "sh", "-c", "npm run proc" ]
