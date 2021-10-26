FROM node:alpine
WORKDIR /usr/app/front
EXPOSE 8080
COPY ./ ./
RUN npm install
CMD ["npm", "start"]
