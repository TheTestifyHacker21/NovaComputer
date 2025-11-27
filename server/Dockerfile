FROM node:alpine
WORKDIR /app
COPY package*.json ./

RUN npm install
COPY . .

EXPOSE 4030

CMD ["node", "index.js"]