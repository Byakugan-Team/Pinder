FROM mariadb:10.4.11

ADD ./sql/ /docker-entrypoint-initdb.d

RUN apt-get update && apt-get -y install vim

EXPOSE 3306

CMD ["mysqld"]
