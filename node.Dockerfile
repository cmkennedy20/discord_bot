FROM node:20-alpine
WORKDIR /app
COPY ./coc-bot/package*.json ./
RUN apk add bash vim
RUN npm install

CMD ["node", "app.js"]
