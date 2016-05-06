FROM mawalu/chat-api-base:latest

MAINTAINER Martin Wagner (mawalu)

ENV DEBIAN_FRONTEND noninteractive

COPY . /app

EXPOSE 8080 8081

RUN apt-get update && apt-get install -y nodejs npm

RUN curl https://getcomposer.org/composer.phar -o /bin/composer && chmod +x /bin/composer
RUN cd /app/client && composer install --ignore-platform-reqs

WORKDIR /app/server

RUN npm install

CMD /usr/bin/nodejs index.js
