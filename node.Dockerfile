FROM node:20-alpine
WORKDIR /app
COPY ./discord-example-app/package*.json ./
RUN ls /app
RUN npm install

EXPOSE 3001
CMD ["node", "app.js"]