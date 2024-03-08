FROM php:7.2-apache
LABEL version="1.0" maintainer="CodeQuestApp - team"
RUN docker-php-ext-install mysqli && \
    docker-php-ext-install pdo pdo_mysql
COPY ./ /var/www/html/
EXPOSE 80