FROM node:18.20-alpine as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install -g yarn --force
RUN yarn
COPY . .
RUN yarn build

FROM nginx:alpine
COPY --from=build /app/dist/product-management-frontend/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
