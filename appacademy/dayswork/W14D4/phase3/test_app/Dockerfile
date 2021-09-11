FROM node:12.4.0-alpine

EXPOSE 3000
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app  
RUN npm install
COPY . /app


CMD ["npm",  "start"]