FROM node:14-alpine

RUN apk update && apk add python3 g++ make && rm -rf /var/cache/apk/*
WORKDIR /usr/src/app

COPY package.json .
RUN yarn --frozen-lockfile

ENV MONGODB_URI "mongodb://mongo:27017/race"
COPY . .
RUN yarn
CMD ["yarn", "dev"]
