# syntax=docker/dockerfile:1

ARG IMAGE_REGISTRY_BASE_URL

FROM --platform=linux/amd64 ${IMAGE_REGISTRY_BASE_URL}/node:20.14-alpine AS builder

LABEL maintainer="Bongani Masuku <bongani@1702tech.com>"

RUN mkdir -p /src

COPY ./src /src/src
COPY ./yarn.lock /src/yarn.lock
COPY ./package.json /src/package.json
COPY ./tsconfig.json /src/tsconfig.json
COPY ./.puppeteerrc.cjs /src/.puppeteerrc.cjs

WORKDIR /src

RUN yarn clean \
  && yarn clean:modules \
  && yarn \
  && yarn build

FROM --platform=linux/amd64 node:20.14 AS api

RUN apt-get update
RUN apt-get install -y gconf-service libasound2 libgbm-dev libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libnss3 lsb-release xdg-utils wget

RUN mkdir -p /app
RUN chown -R node:node /app/

COPY --chown=node:node --from=builder /src/lib /app/lib
COPY --chown=node:node --from=builder /src/types /app/types
COPY --chown=node:node --from=builder /src/node_modules /app/node_modules
COPY --chown=node:node --from=builder /src/package.json /app/package.json
COPY --chown=node:node --from=builder /src/.puppeteerrc.cjs /app/.puppeteerrc.cjs

WORKDIR /app

USER node

RUN npx puppeteer browsers install chrome

ENTRYPOINT [ "sh", "-c", "yarn serve" ]