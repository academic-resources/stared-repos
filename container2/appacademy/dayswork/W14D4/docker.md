# GENERAL

### Info

```
$ docker version
$ docker info
```

# CONTAINERS

### Create and run a container

```
$ docker container run -it -p 80:80 --name myname nginx
$ docker container run -it --name myname nginx bash
$ docker container run -d -p 80:80 --name myname nginx
$ docker container run -d -p 3306:3306 --name mysql --env MYSQL_ROOT_PASSWORD=123456
$ docker container run --rm -it --name myname ubuntu **NOTE** bash by default on ubuntu
$ docker container run -it alpine sh **NOTE** sh instead of bash on alpine
$ docker container run -d --name myname --network mynetworkname nginx
$ docker container run -p 80:80 -v $(pwd):/usr/share/nginx/html nginx
$ docker container run -d --net funtime --net-alias party elasticsearch:2
```

### List running containers

```
$ docker container ls
$ docker container ls -a
$ docker ps
```

### Start/Stop/Remove containers

```
$ docker container start -ai ubuntu
$ docker container stop [ID]
$ docker stop $(docker ps -aq) **NOTE** stops all
$ docker rm $(docker ps -aq) **NOTE** removed all
$ docker container rm [ID]
$ docker container rm -f [ID]
$ docker container rm [ID] [ID] [ID]
```

### Container info

```
$ docker container logs [NAME]
$ docker container top [NAME]
$ docker container inspect [NAME]
$ docker container inspect --format '{{ .NetworkSettings.IPAddress }}' [NAME]
$ docker container stats [NAME]
$ docker container port [NAME]
```

### Inside Container Shell

```
$ docker container exec -it mysql bash
```

# IMAGES

```
$ docker image ls
$ docker pull [IMAGE]
$ docker image rm [IMAGE]
$ docker rmi $(docker images -a -q)  **NOTE** remove all
$ docker image tag nginx myrepo/nginx
$ docker image history <IMAGENAME>
$ docker image inspect <IMAGENAME>
```

### Popular Images

```
NGINX:  nginx
APACHE: httpd
MONGODB: mongo
MYSQL: mysql
```

# NETWORKS

```
$ docker network ls
$ docker network inspect [NETWORK_NAME]
$ docker network create [NETWORK_NAME]
$ docker network connect [NETWORK_NAME] [CONTAINER_NAME]
$ docker network disconnect [NETWORK_NAME] [CONTAINER_NAME]
```

#DOCKERHUB

```
$ docker image push myrepo/nginx
$ docker login
$ docker image tag myrepo/nginx myrepo/nginx:newtag
```

# DOCKERFILE PARTS

- FROM - The os used. Common is alpine, debian, ubuntu
- ENV - Environment variables

RUN - Run commands/shell scripts, etc

```
RUN ln -sf /dev/stdout /var/log/IMAGENAME/access.log \
&& ln -sf /dev/stderr /var/log/IMAGENNAME/error.log
```

- EXPOSE - Ports to expose
- CMD - Final command run when you launch a new container from image
- WORKDIR - Sets working directory (also could use 'RUN cd /some/path')
- COPY # Copies files from host to container

```
$ docker build . -t <NEWIMAGENAME>
$ docker image build -t [REPONAME] .  **NOTES** in same dir as Dockerfile
$ docker image build -t nginx-website
```

# VOLUMES

```
$ docker volume ls
$ docker volume prune
$ docker volume inspect mysql-db
```

# BIND MOUNTS

```
docker run -d --name nginx\
 --mount type=bind, source=/Users/rosekoron/rad,target=/rad \
 nginx
```

# DOCKER COMPOSE

### 1. docker.compose.yml - Describes solutions for

- containers
- networks
- volumes

```
version: '3'

services:
  jekyll:
    image: bretfisher/jekyll-serve
    volumes:
      - .:/site
    ports:
      - '80:4000'
```

```
docker-compose up
docker-compose up -d
docker-compose down
```
