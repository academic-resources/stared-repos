FROM node:8.4

COPY . /app

WORKDIR /app

RUN npm install --silent

EXPOSE 3000/tcp

CMD ["npm", "start"]