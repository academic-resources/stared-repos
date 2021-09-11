Some of the problems that we have faced in the industry of exposing our code, getting it deployed, is it works great in one environment and in another environment it doesn't work at all, or someone updated the server and it changed everything.

One of the solutions for distribution not being equal is Docker.

## [Docker](https://docs.docker.com/)

#### Paradigm of Docker:

- Docker gives you an image and it goes to that image (which is kind of like a virtual machine or container) and deploys from that container and exposes the URL through that container
  - Everything you do with Docker is built from a simple Docker file that you put in your application
- Something that works on your machine should work the same on others
- Can build a Docker container for any server environment
  - PHP environment
  - Node environment
  - etc.
- Will create a run-time environment for the dependencies and packages you give it.
- Piggybacks off your operating system and layers on top of it in containers and so you build your image and the image gets served out of the containers

#### In terms of distribution:

- Instead of having a single address where your environment could live and servers distributed around the world, you can think of it as an apartment complex where Docker can run as the architecture of the apartment complex and each container can be an individual apartment in the apartment complex.
- You get a lot of distribution that's even and the same in every environment you run it.

```
- mkdir docker-explore
- cd docker-explore
- npm init
- npm install --save express body-parser
- touch Dockerfile
- touch server.js
```

#### server.js

```
const express = require('express');
const bodyParser = require('body-parser');

const server = express();
server.use(bodyParser.json());

server.get('/', (req, res) => {
    res.json({ success: 'Hello world!' });
});

server.listen(3000, () => {
    if (err) console.log(err);
    console.log('server is running on 3000');
})
```

### Everything you do with Docker lives and dies in this file:

#### Dockerfile:

```
/* image you want to build off of (baseImage)
    8.7 is the version of Node being used
    Sometimes Docker can't work with latest version
    Environment you'll build on */

FROM node:8.7

/*  set working directory for any subsequent
    add, copy, command -- entrypoint

    working directory is the root
    Where you'll start building this to */

WORKDIR /

/*  at the root, copy package.json and package-lock.json files.
    lock allows you to stay synchronized in your teams
    copied to the root of the project
    will be copied from the project to the docker container
    Copy package.json/package-lock.json into root
    COPY package.json package-lock.json ./ */

RUN npm install

/*  wildcard of two dots
    take everything given to you and copy it over to the container
    Copy modules over into the image */

COPY . .

/* expose the port you're running from */

EXPOSE 3000

/* run npm start */

CMD("npm", "start")
```

#### in package.json:

```
"scripts": {
    "start": "node server.js"
}
```

## Docker

- Need to install on local machine
- Make sure it's up and running
  - It's keeping a daemon server alive on your machine
- Associated with your Docker account (so need to have Docker account)

#### Commands used to get image built:

```
/* to build image */

docker build -t docker-explorer .

/* tell docker which port to expose */

docker run -p 49161:3000 -d docker-explorer

/* returns hash that you can use to run the docker exec command that allows you to look inside container */

docker exec -it ${hash}

ls
```

##### output of ls:

```
- Dockerfile
- bin
- boot
- dev
- etc
- home
- lib
- lib64
- home
- media
- mnt
- node_modules
- opt
- package-lock.json
- package.json
- proc
- root
- run
- sbin
- server.js
- srv
- sys
- tmp
- usr
- var
```

`curl -X GET http://localhost:49161`
Project on localhost:49161, but localhost:3000 not running

Docker is taking port 3000 and running its own port.
Right now running locally, not online

With the use of Docker, you can safely say what it looks like on the local host, it will look like on the world wide web.

[Docker Repo](https://github.com/LambdaSchool/DevOps-Deployment-Mini)

##### Google Cloud Platform

- $300 in credits which you won't burn through in any of the apps you create at Lambda or for the first year or whatever
