[Repo](https://github.com/LambdaSchool/DevOps-Deployment)

### Walkthrough for setting up Kubernetes Google Cloud Platform Environment and automate a build pipline for deployment

Use Docker to contain code environment

- Node application

Use Google Platform to expose to world wide web

Kubernetes to cluster it so it can exist on a server for use across the world.

You can basically make as many clusters as you want.

Some of the gotchas about Kubernetes:

- Initially you've signed up for Google Cloud Platform, they give you a $300 credit
- If you have a lot of traffic to your website and a lot of applications up and running, you could burn through the credit quickly and the credit card you used to sign up for your account could be potentially charged.
  - Would take a lot. Don't think any of our applications here would do that
  - You'll be fine if you're just using it for toy problems, but keep an eye on it.

### Steps:

- Creating an account on Google Cloud Platform
  - Have to give them your credit card info, not everyone comfortable doing that
- Getting a GCP SDK up and running locally
  - Anything you can do in the command line, you can do in the GUI, but recommend learning command line first
- Creating a GCP project
- Building and creating a Docker image of the included backend and frontend repos
- Creating an deployment specification file
  - YML file
- Creating a Kubernetes cluster to deploy our Docker images
  - Cluster could live in multiple different environments around the world and we're serving it up from this time zone
  - Can turn on auto-scaling features that allow for load-balancing
    - Load balancing: If you have thousands of people hitting your project at the same time, a load balancer can split off that traffic to another place.
      - You never get the application served up from the same place at the same time.
      - If you load balance to four-five different servers around the world, it helps distribute the application and helps with downtime
      - Will be a lot more streamlined if your sysadmin or devOps guy sets up a load balancer because you can handle heavier traffic
        - That's what the idea of clustering is.
    - Same Docker image, so it'll be serving up the same thing
- Exposing newly deployed server to the internet
- Scaling up the service

##### Gotcha:

- Need to initialize
- Set up processes so you have the software enabled in their cloud platform so your command line would work.
  - VM instance, Kubernetes Engine, etc.
  - Otherwise, 404 error of sadness

`gcloud`
If you get some sort of error or run a command and you have the ability to run gcloud, you've installed SDK properly and your command line interface is up and ready to go.

`gcloud --help` will show you all the things you can do with the gcloud command

`gcloud components install kubectl`
Telling GCloud what project to interface with:
set

### Create GCP Project

GUI:

- Provides analytics
- Provides project data - project name, Project ID, etc.
- Gives the option to change administrative rights/authentication

console.cloud.google.com

- Add new project
  - Will get Project ID
- Create environment variable
  - Ryan had trouble setting one, so will use project ID wherever he needs to use it.

### Building and Running a Docker Image

Dockerfile:

```
FROM node:8.7
COPY package.json package-lock.json ./
WORKDIR /
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm", "start"]
```

server.js:

```
/*******************************
* Express Setup
 **********************************/
const express = require('express');
const app = express();
/*******************************
* Server!
 *******************************/
 const PORT = 8080;
 const HOST = '0.0.0.0';
 const server = app.listen(PORT, HOST, () => {
     console.log('sever online');
 });

 /*******************************
 * Endpoint
 ********************************/

 app.get('/', (req, res) => {
     res.send('Hello World\n');
 });

 app.get('/version', (req, res) => {
     res.send('1.0.0\n');
     Array.forEach(req, (key) => {
         axios.get('myspecialserver/requestdistributor', (result) => {
             axios.get('database', (result) => {
                 // all this stuff takes a really long time
             });
         });
     });
 });
```

`docker build -t gcr.io/${PROJECT_ID}/${DOCKER_IMAGE_NAME}`
gcr - Google Container Registry

`docker run -d -p 8080:8080 gcr.io/${PROJECT_ID}/${DOCKER_IMAGE_NAME}`

### Initializing Kubernetes Cluster

- Ryan used the GUI instead of the command line (command line instructions did not work for him)
  - Go inside project
    - Open up Kubernetes Engine tab
    - Provide name of cluster
    - Provide timezone

`gcloud container clusters get-credentials ${CLUSTER_NAME} --zone="${YOUR TIMEZONE HERE}"`

If you're working on multiple projects with your GCP, you need to tell your command line interface what project you're working on:

- `gcloud config set project ${PROJECT_NAME}`

### Upload Docker Image to Google Container Registry

`gcloud docker -- push gcr.io/${PROJECT_ID}/${DOCKER_IMAGE_NAME}`

### Create Deployment Specification File

yml - YAML Ain't Markup Language

- Human friendly data serialization standard for all programming languages
- Key/value pairs
  - Thing on the left is title, right is executable
- Creating file to give Google Cloud Platform the instructions needed
  - Instructions we provide in this file and the commands we use to run it will take these instructions, combine them with the deployment pipeline and send everything to the world wide web and expose it to a port somewhere

deployment.yml

```
apiVersion: apps/v1beta1
kind: Deployment
metadata:
  name: ${PROJECT_ID} # You'll need to manually type this out. The environment variable won't work
spec:
  replicas: 2
  template:
    metadata:
      labels: # labels to select/identify the deployment
        app: ${PROJECT_ID}
    spec:     # pod spec
      containers:
      - name: ${PROJECT_ID}
        image: gcr.io/${PROJECT_ID}/${DOCKER_IMAGE_NAME}:v1  # image we pushed
        ports:
        - containerPort: 8080
```

### Create Cluster to Deploy Docker Images

`kubectl create -f ${NAME_OF_YML_FILE}.yml --save-config`

Get deployments:
`kubectl get deployment`

Pods:
`kubectl get pods`
Will return pods - how many depends on the number of replicas in yml file

Ability to take Docker container, put it on a server, leverage the cluster to go spread it to the world wide web. Will expose public IP of the server.

Recap of What We've Done:

- Created a project on Google Cloud Platform
- Created a Docker image that will open up some sort of port to the project
- Took the Docker image and gave it to a cluster owned by Google Cloud Platform and Kubernetes
- That cluster will be a phyiscal server somewhere in the world (or multiple servers in the world)
  - We can replicate and clusterize that as many times as we'd like
    - Associated cost - you need to pay for the spaces available on the server

Now we're going to expose our cluster to the world and it'll give us a port to access.

### Expose Service to the World Wide Web

The flag LoadBalancer is in place because as one piece of traffic hits the public IP, send it over to this cluster, this pod. If another human hits this IP, send it to that pod. And it balances the load. You could have 5000 users, but 2500 will be split between each pod

- Usually you'd have dozens of pods that are serving this instance up, creating this sample machine, this runtime environment for your code

`kubectl expose deployment ${NAME_OF_DEPLOYMENT} --type="LoadBalancer"`

- Will instantiate Kubernetes service that handles a Google Cloud load balancer to manage traffict to your exposed containers

`kubectl get services`

- get public IP of your service

###### Do we have 2 virtual PCs so to speak?

##### Yes. We have deployed to a cluster that will create two pods where our app can live in those pods and it's using Docker to create the same environment for those pods. And then the load balancer is balancing traffic.

Public IP address is now hosting web application

- Can be aliased to a domain name of your choice
- Need to find a domain name service and grab a free domain and prop it up and say point this traffic to this domain right here and let Google Cloud Platform do the rest

We now have a public runtime environment for our Node application.
We also have a local environment that we're using Docker to build and launch.

As you continue to play around with these things, know there are a lot of things to continue to learn, but following these steps you could potentially do the same thing with your back-end and eventually once you walk through the same type of process with your front-end project you could see how it could expose a React application. And then you can get those two to talk to each other across the world wide web, knowing that you're going to have to learn a lot about environment variables and production versus development.

###### Could we Docker a DB server like Mongo?

##### Yes. You would have to serve up your Mongo instance and if you're going to be dumping a bunch of files into Google Cloud Platform, you might be better suited to use another third-party service for Mongo instance. For example, mLab has a good free tier.

Docker is so robust, you can do anything with Docker.

- If we're taking this Docker file and all we're doing is saying 'RUN npm install', we're saying copy over our package.json, package-lock. RUN 'npm install' could go and be npm run mongo up and you could create the command that executes a file and it will create a Mongo instance and wherever it saves, you could save it into the local file system in a data file. You could create a data folder and then you point your Mongoose connect commands and everything. This Docker file could then go and run another command similar to that command. If you have npm start or you give it another command, you can say 'npm run db' and it can go and execute - you can automate that process as well.

For prototyping, mLab and MongoDB Atlas

- MongoDB Atlas has Google Cloud Platform integration
- A few bucks a month for hosting

mLab

- Free tiered account

  - All you have to do is take your server and instead of connecting to your mongo localhost

- Create new project
  - Integration with Google Cloud Platform
  - 0.5GB storage for free
- Mongo documents are cheap (in the sense that they're so small in size)
  - Under your project, if you want to connect and authenticate a user
    - Instead of connecting to localhost URL, use URL provided.
      Example: `mongodb://<dbuser>: <dbpassword>@ds239128.mlab.com:39128/cs5-show-n-tell`

Firebase is a back-end as a service

- Do a lot less server-side coding with it
  - Say you want to store documents in a certain place and it will give you a URL for you to basically perform AJAX requests to
    - Very rich in terms of the ability (can do many, many things with it)
- Really cool real-time database environment
  - Instead of constantly sending data up and getting data back, you're subscribing to an event type system
    - Real-time: If you update something on the server on the database, everything subscribed to the same server as a client, you can see it instantaneously

###### Firebase is like a Remote State management?

##### So it's like state management but data persistence because your JSON objects get stored up in Firebase and they have a GUI too.

- You subscribe things you want and you get information from it

You could accomplish similar deployment features as Docker with a virtual machine like Vagrant

```
# Delete the Kubernetes load balancer service
kubectl delete service/${NAME_OF_DEPLOYMENT}

# Delete the Kubernetes deployment itself
kubectl delete deployment/${NAME_OF_DEPLOYMENT}

# Delete your GCP cluster
gcloud container lusters delete ${NAME_OF_CLUSTER} --zone="${TIME_ZONE}"
```

If you make changes to your yml file, can run: `kubectl apply -f {NAME_OF_YML_FILE.yml}`
to force the apply
