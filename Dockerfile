# syntax=docker/dockerfile:1

ARG IMAGE_REGISTRY_BASE_URL

FROM ${IMAGE_REGISTRY_BASE_URL}/golang:1.19-alpine AS builder

LABEL maintainer="Bongani Masuku <bongani@1702tech.com>"

RUN mkdir -p /src

WORKDIR /src

COPY ./src ./src
COPY ./package.json ./package.json
COPY ./tsconfig.json ./tsconfig.json
COPY ./yarn.lock ./yarn.lock

RUN yarn && yarn build

FROM builder

RUN mkdir -p /app

WORKDIR /app

COPY --from=builder /src/lib /app/lib
COPY --from=builder /src/types /app/types
COPY --from=builder /src/node_modules /app/node_modules

ENTRYPOINT [ "sh", "-c", "yarn serve" ]