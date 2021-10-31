FROM node:latest as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ ./

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
ARG CONF_FILE=localhost
ADD ${CONF_FILE} /etc/nginx/sites-available/localhost
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
