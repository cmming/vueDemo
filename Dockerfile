FROM nginx:alpine

COPY dist /var/www/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /var/www/html
