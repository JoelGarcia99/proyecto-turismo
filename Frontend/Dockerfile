FROM node:lts-alpine3.16

WORKDIR /frontend
COPY package.json ./
COPY package-lock.json ./

# installing bash
RUN apk update && apk add bash

RUN npm install

COPY . ./

CMD ["npm", "start"]

