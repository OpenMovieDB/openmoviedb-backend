FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

COPY . .

RUN npm install

RUN npm run build

CMD [ "npm", "run", "start" ]