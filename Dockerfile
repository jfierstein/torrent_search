FROM node:7.7

COPY package.json .
RUN npm install

COPY . .

CMD node app.js | node_modules/.bin/bunyan
