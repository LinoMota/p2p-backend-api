FROM node:16-alpine

WORKDIR /usr/app/src

COPY src ./src/
COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .

RUN npm i 
RUN npm run build

RUN rm -rf src


CMD [ "npm", "start"]
