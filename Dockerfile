FROM  nginx:latest
VOLUME ./builds/BwSi5yiA/0/javapro17/javapro_teams_frontend_original:/etc/nginx/sites-available
VOLUME ./builds/BwSi5yiA/0/javapro17/javapro_teams_frontend_original/dist:/var/www
VOLUME ./logs/nginx:/var/log/nginx
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
