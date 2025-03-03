FROM node:20-alpine
WORKDIR /app
COPY * ./
RUN apk add bash vim
RUN npm install

