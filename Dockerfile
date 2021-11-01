FROM node:latest as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .


FROM nginx:latest as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
