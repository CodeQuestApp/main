FROM mariadb:latest
LABEL version="1.0" maintainer="CodeQuestApp - team"
COPY database.sql /docker-entrypoint-initdb.d/
ENV MARIADB_ROOT_PASSWORD=example
ENV MARIADB_USER=adumolie_bd
ENV MARIADB_PASSWORD=adumolie_bd
EXPOSE 3306

