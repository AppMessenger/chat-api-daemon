FROM ubuntu:14.04

MAINTAINER Martin Wagner (mawalu)

ENV DEBIAN_FRONTEND noninteractive

WORKDIR /build

# Install dependecies
RUN apt-get update && apt-get install -y php5 php5-dev php5-cli php5-json php5-mcrypt php5-sqlite php5-curl php5-gd pkg-php-tools git nodejs && apt-get clean && rm -rf /var/lib/apt/lists/*

# Get sourcecode from github
RUN git clone https://github.com/mgp25/curve25519-php.git && git clone https://github.com/allegro/php-protobuf.git

# Build and install curve25519 php extension
RUN cd /build/curve25519-php && phpize && ./configure && make && make install && echo 'extension=curve25519.so' > /etc/php5/mods-available/curve25519.ini

# Build and install php-protobuf
RUN cd /build/php-protobuf && phpize && ./configure && make && make install && echo 'extension=protobuf.so' > /etc/php5/mods-available/protobuf.ini

# Enable php modules
RUN php5enmod mcrypt curve25519 protobuf

