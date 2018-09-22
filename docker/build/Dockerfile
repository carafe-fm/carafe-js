FROM node:8.12

COPY entrypoint.sh /usr/bin/entrypoint.sh

ENV PATH="/var/www/html/node_modules/.bin:${PATH}"
WORKDIR /var/www/html

ENTRYPOINT ["entrypoint.sh"]
