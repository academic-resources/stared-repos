FROM node:alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


# Copy into nginx server
FROM nginx

EXPOSE 80

COPY --from=builder /app/build /usr/share/nginx/html