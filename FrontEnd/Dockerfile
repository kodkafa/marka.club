FROM nginx:stable-alpine
RUN rm -r /etc/nginx/conf.d/*.*
COPY ./conf.d/default.conf /etc/nginx/conf.d/
COPY ./build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
