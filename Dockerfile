FROM mawalu/chat-api-base:latest

MAINTAINER Martin Wagner (mawalu)

ENV DEBIAN_FRONTEND noninteractive

COPY . /app

EXPOSE 8080 8081

WORKDIR /app/server

RUN apt-get update && apt-get install -y nodejs npm
RUN npm install

CMD /usr/bin/nodejs index.js
