# Use this empty Dockerfile!

# This dir contains a Node and Express app, you need to get it running in a container
# No modifications to the app should be necessary, only edit this Dockerfile

# Overview of this assignment:
# Use the instructions from the developer below to create a working Dockerfile.

# Instructions from the app developer:
# 1. You should use the 'node' official image, with the alpine 6.x branch
# 2. This app listens on port 3000
# 3. Then it should use alpine package manager to install tini: 'apk add --update tini'
# 4. Then it should create a new directory for app files using 'mkdir -p /usr/src/app'.
# 5. Node uses a "package manager", so this Dockerfile will need to copy in the 'package.json'
# file and put that data in a file with the same name. Make sure this data is 
# going into the folder you just created. 
# 6. Then it needs to run 'npm install' to install dependencies from that file
# 7. To keep it clean and small, run 'npm cache clean --force' after above
# 8. Then it needs to copy in all files from current directory
# 9. Then it needs to start container with command 'tini -- node ./bin/www'.
# Lookup the CMD syntax if you need a reminder. 
# In the end you should be using FROM, RUN, WORKDIR, COPY, EXPOSE, and CMD commands.

FROM node:6.17-alpine

RUN apk add --update tini \
  && mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN npm install \
  && npm cache clean --force

COPY . /usr/src/app

EXPOSE 80:3000

CMD [ "tini", "--", "node", "./bin/www" ]