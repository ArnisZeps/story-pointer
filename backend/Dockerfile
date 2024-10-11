FROM node:18-alpine

WORKDIR /usr/src/app

COPY /app/package*.json .

RUN npm ci

COPY /app/ .

RUN ls -la

EXPOSE 4000

CMD ["node", "index.js"]
