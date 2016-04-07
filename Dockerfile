FROM mawalu/chat-api-base:latest

MAINTAINER Martin Wagner (mawalu)

COPY . /app

EXPOSE 8080 8081

WORKDIR /app/server

RUN npm install

CMD /usr/bin/nodejs index.js
