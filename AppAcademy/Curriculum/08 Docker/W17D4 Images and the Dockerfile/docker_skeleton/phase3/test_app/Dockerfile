# FROM ubuntu:16.03
FROM node:10-alpine

# RUN apt-get update \
#   && apt-get upgrade -y 
  # && apt-get install -y nodejs \
  # && cd /app && npm install
# RUN apt-get install -y nodejs ssh mysql

WORKDIR /usr/local/bin/

COPY . /usr/local/bin/

RUN npm install

# ADD . /app

EXPOSE 3000:3000

# CMD mysql & sshd & npm start
CMD ["npm", "start"]