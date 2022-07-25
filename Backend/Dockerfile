#
# # MongoDB Compiler 
# #
FROM php:8.1-cli as mongodb
ENV ACCEPT_EULA=Y
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update \
    && apt-get install -y \   
    zip \
    libssl-dev \
    pkg-config \
    # remove apt cache
    && rm -rf /var/lib/apt/lists/*
# installing mongodb extension
RUN pecl install mongodb-1.12.0
RUN echo 'extension=mongodb.so' > /usr/local/etc/php/conf.d/mongodb.ini

RUN echo "Installing composer"
RUN cd ~
RUN curl -sS https://getcomposer.org/installer -o /tmp/composer-setup.php

RUN echo "Creating hash key"
RUN HASH=`curl -sS https://composer.github.io/installer.sig`

RUN echo "Verifying script"
RUN php -r "if (hash_file('SHA384', '/tmp/composer-setup.php') === '$HASH') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"

RUN echo "Making composer global"
RUN php /tmp/composer-setup.php --install-dir=/usr/local/bin --filename=composer


# copying everything except the vendor folder
RUN mkdir /backend
WORKDIR /backend
COPY . .

RUN composer install --no-interaction
