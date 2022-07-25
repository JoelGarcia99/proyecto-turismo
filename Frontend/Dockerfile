FROM node:lts-alpine3.15

COPY src /frontend/src
COPY package.json /frontend/package.json
COPY package-lock.json /frontend/package-lock.json
COPY postcss.config.js /frontend/postcss.config.js
COPY tailwind.config.js /frontend/tailwind.config.js

COPY public /frontend/public

WORKDIR /frontend

RUN npm install
