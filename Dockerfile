# Used only to produce the static build/ output — Jenkins extracts it via
# `docker cp` and rsyncs it to the server. Nginx on the server serves the
# files straight from a mounted volume (see deploy/docker-compose.yaml), so
# this image is never deployed or pushed to a registry.
FROM node:22-alpine AS build
WORKDIR /app

ARG REACT_APP_BASE_URL

ENV REACT_APP_BASE_URL=$REACT_APP_BASE_URL

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build
