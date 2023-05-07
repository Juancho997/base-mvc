FROM node:16-alpine3.14
WORKDIR /usr/src/app

COPY package*.json ./
COPY . .

RUN npm i  
RUN npm run build 

CMD ["node", "build/index.js"]

