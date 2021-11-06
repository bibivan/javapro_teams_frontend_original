FROM  nginx:latest
VOLUME ./:/etc/nginx/sites-available
VOLUME ./dist:/var/www
VOLUME ./logs/nginx:/var/log/nginx
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
