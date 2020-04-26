FROM nginx:stable-alpine
RUN rm -rf /etc/nginx/conf.d
COPY default.conf /etc/nginx/conf.d
COPY ./build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
