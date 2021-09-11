# Use the correct base image
FROM node:10-alpine

# Change Directories Before Copying Files
WORKDIR /app 
COPY . /app

# Install dependencies and you are ready to go!
RUN npm install
CMD ["npm", "start"]