FROM node:10.6.0-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# этап production (production-stage)
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY .dockerSettings/nginx/ /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]