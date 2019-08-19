FROM nginx:alpine

COPY ./ /var/www/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
WORKDIR /var/www/html
