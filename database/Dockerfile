FROM mariadb:10.4.11

ADD ./sql /docker-entrypoint-initdb.d

ENV MYSQL_ROOT_PASSWORD test
ENV MYSQL_DATABASE Pinder
ENV MYSQL_USER user
ENV MYSQL_PASSWORD test

RUN apt-get update && apt-get -y install vim

EXPOSE 3306

CMD ["mysqld"]
