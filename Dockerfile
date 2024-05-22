FROM node:lts-alpine

WORKDIR /app

COPY . /app

RUN npm install

ARG PORT_BUILD=3000
ENV PORT=$PORT_BUILD
ENV DB_CONNECTION_KEY=mongodb+srv://devinicius:Dorythos%40561@maincluster.9m6fqz6.mongodb.net/snow_pet

EXPOSE $PORT_BUILD

CMD [ "npm", "start" ]
