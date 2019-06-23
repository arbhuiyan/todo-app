FROM nginx:1.17
VOLUME ["/var/www"]
ARG APP_VERSION
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
ADD --chown=nginx:nginx dist/app-${APP_VERSION}.tgz /var/www/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]