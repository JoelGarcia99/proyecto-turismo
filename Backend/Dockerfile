FROM node:lts-alpine3.16

WORKDIR /backend
COPY package.json ./
COPY package-lock.json ./

# installing bash
RUN apk update && apk add bash

RUN npm install
RUN npm install --global nodemon

COPY . /

CMD ["npm", "run", "dev"]

