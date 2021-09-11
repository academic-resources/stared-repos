# NodeJS
# Index
This notebook is a reference guide for backend development using Node. If you are learning from scratch, you can follow this sequentally: read introduction first, then fundamentals topics, and intermediate. If you are here just trying to learn something new or looking for an specific topic, feel free to use the index and go to the section that better suits your needs, as each module is intended to be isolated and self-explained, the order is just an arbitrary recomendation.

The `book` tag you'll find in some sections, is for sections that serve as a 'index' for the main topics covered in the correspondent book. Those sections will be listed first. 

Book references
* [Book: NodeJs Complete Reference Guide](#book--nodejs-complete-reference-guide)

Projects Reference
* [Fundamentals: Reference projects](#fundamentals--reference-projects)

Introduction
* [Introduction: Node](#introduction--node)
* [Introduction: Node Internals](#introduction--node-internals)
* [Introduction: Event Loop](#introduction--event-loop)
* [Introduction: Nodemon](#introduction--nodemon)
* [Introduction: Debugging](#introduction--debugging)
* [Introduction: Express](#introduction--express)
* [Introduction: RESTful frameworks](#introduction--restful-frameworks)
* [Introduction: REST](#introduction--rest)
* [Introduction: Boilerplates setup](#introduction--boilerplates-setup)
* [Introduction: Why and how to use Linter](#introduction--why-and-how-to-use-linter)
* [Introduction: MVC](#introduction--mvc)
* [Introduction: Backend Architecture Introduction](#introduction--backend-architecture-introduction)

Fundamental level
* [Fundamentals: Testing](#fundamentals--testing)
* [Fundamentals: Testing Node](#fundamentals--testing-node)
* [Fundamentals: Middlewares](#fundamentals--middlewares)
* [Fundamentals: Upload files](#fundamentals--upload-files)
* [Fundamentals: Authentication](#fundamentals--authentication)
* [Fundamentals: Common HTTP Req and Res](#fundamentals--common-http-req-and-res)
* [Fundamentals: Sending Emails](#fundamentals--sending-emails)
* [Fundamentals: Environment Variables](#fundamentals--environment-variables)
* [Fundamentals: Deploying Apps](#fundamentals--deploying-apps)
* [Fundamentals: Heroku Deployment](#fundamentals--heroku-deployment)

Architectural Patterns
* [Intermediate: Architectural Patterns](#intermediate--architectural-patterns)

Intermediate level
* [Intermediate - Socket.IO and WebSockets](#intermediate---socket-io-and-websockets)
* [Intermediate: Chat libraries](#intermediate--chat-libraries)
* [Intermediate: WebSocket Protocol](#intermediate--websocket-protocol)
* [Intermediate: Unit testing (Mocha)](#intermediate--unit-testing--mocha)
* [Intermediate: Routes testing (Supertest)](#intermediate--routes-testing--supertest)

Advanced Level
* [Advanced: Enchance performance](#advanced--enchance-performance)
* [Advanced: Data Caching with Redis](#advanced--data-caching-with-redis)
* [Advanced: Automate Integration Testing](#advanced--automate-integration-testing)
* [Advanced: Continuous Integration](#advanced--continuous-integration)
* [Advanced: Scalable Image Upload](#advanced--scalable-image-upload)


Docker Containers
* [Advanced: Docker](#advanced--docker)
* [Advanced: Docker Compose](#advanced--docker-compose)
* [Advanced: Multi-Container App](#advanced--multi-container-app)

CI/CD
* [Advanced: CI/CD AWS & Travis](#advanced--ci-cd-aws---travis)

Kubernetes
* [Advanced: Kubernetes](#advanced--kubernetes)
# Introduction: Node
Node.js is a JavaScript runtime built on [Chrome's V8 Javascript engine](https://v8.dev/).

* Asynchronous promised-based style
* Event-driven (Call Stack, Callback Queue, and Event Loop)
* Non-Blocking I/O


 ### Under the hood

 #### V8 Engine

* JavaScirpt is a high-level language 
* Compiler turns high level code into machine code
* Why V8 Engine instead of compiler?
    * __Just-in-Time__ Compiler
    * Pros of both interpreted an compiled languages
    * Written in C++

---

 ### What makes Node so great?

 #### Event-driven, non-blocking I/O model

What is __event-driven programming__? it's a computer programming paradigm in which control flow of the program is determined by the occurrence of events. These events are monitored by code known as an event listener that, if it detects that its assigned event has occurred, runs an event “handler”, typically a callback function or method. This handler deals with the event by responding to it with program code. The responses only run once we get a request — __that’s__ event driven programming. For this, Node provides the __event loop__. 

Blocking methods execute synchronously and __non-blocking methods execute asynchronously__.

[EVENT LOOP IN DETAIL](https://medium.com/@gaurav.pandvia/understanding-javascript-function-executions-tasks-event-loop-call-stack-more-part-1-5683dea1f5ec)

---

 #### The Event Loop

The event loops result in callback type programming. In simple terms it’s where you end up splitting your program in to smaller & smaller chunks until each chunk is mapped to operation with data.

 ##### Promises style programming

When a function will return a promise object that will return something in the future. It promises that it will do something for you. You can also chain promises together and it really helps simplify your code.

 ##### Event emitters 

An Event emitter, as it sounds, is just something that triggers an event to which anyone can listen. Different libraries offer different implementations and for different purposes, but the basic idea is to provide a framework for issuing events and subscribing to them.

In node.js an event can be described simply as a string with a corresponding callback. An event can be “emitted” (or in other words, the corresponding callback be called) multiple times or you can choose to only listen for the first time it is emitted.

---

 ##### Call Stack 

* Javascript goes through a program sequentially
* Flow of execution is synchronous
    * May delay execution of other functions 

 ##### Node API 

* Node.js does __support asynchronous behavior__.
* Asynchronous event-based system 
* Call stack is used for the debugging stack trace 

---

 ### Templating 

 #### Middlewares

Middleware is any number of functions that are invoked by the Express.js routing layer before your final request handler is, and thus sits in the middle between a raw request and the final intended route. It basically lets you configure how your express application works.

--- 


 ### PG (Postgres)

```
$ npm install pg --save
```

Configuring Database Pool
# Introduction: Node Internals
    The two most important Node dependencies:

* V8 Engine Project
    * C++ and Javascript
    * Run Javascript outside of browser
* libuv Project
    * 100% C++ Open-source
    * Access to file-system
    * Access to networking
    * Concurrency

Node is written in C++ and Javascript, that provides a series of wrappers (Standard Library) like `http`, `fs`, `crypto`, and `path`, as APIs for the V8 and libuv implementations. 

 #### Node execution hierarchy

* Javascript code we write
* Node's Javascript Side (lib folder in Node repo)
    * `process.binding()`: Connects JS and C++ functions
    * __V8__: Converts values between JS and C++ world
* Node's C++ Side (src folder in Node Repo)
* __libuv__: Gives Node easy access to underyling OS

 ## Threads

Process: instance of a computer program that is being executed. Between a single process we can have multiple threads, that work as simple to-do lists that are run one by one.

`OS Scheduler` decides which thread should be processed.

# Introduction: Event Loop
Pseudocode idea

```javascript
// Node starts

const pendingTimers = [];
const pendingOSTasks = [];
const pendingOperations = [];

// New timers, tasks, operations are recorded from myFile running
myFile.runContents();

function shouldContinue() {
    // Check one: Any pending setTimeout, setInterval, setImmediate
    // Check two: Any pending OS tasks (like server listening to port)
    // Check three: Any pending long running operations (like fs module)

    return pendingTimers.length || pendingOSTasks.length || pendingOperations.length
}

// Entire body executes in one 'tick'
while(shouldContinue()) {
    // 1) Node looks at pendingTimers and sees if any functions
    // are ready to be called (setTimeout, setInterval)

    // 2) Node looks at pendingOSTasks and pendingOperations (threadpool)
    // and calls relevant callbacks

    // 3) Pause execution. Continue when...
    // - a new pendingOSTask is done
    // - a new pendingOperation is done
    // - a timer is about to complete

    // 4) Look at pendingTimers (setImmediate)

    // 5) Handle any 'close' events
}

// Exit back to terminal
```

---

 ### Single Threaded?

Node Event Loop is __Single Threaded__, but some of Node Framework/Std Lib is not and is not executed inside that single thread. We can do other things insde the event loop while those calculations happen.

 ### Libuv Thread Pool

For some of the standard library function calls, the Node C++ side and Libuv __do expensive and heavy calculations tasks totally outside the event loop__. There are 4 other threads on the Libuv __Thread pool__ that can be used.

All `fs` module functions, and some of crypto use it. Depends on OS (Windows vs UNIX based).

_Change the pool size_:
```javascript
process.env.UV_THREADPOOL_SIZE = 2;
```

Libuv can delegate operations to our OS that doesn't use the Thread Pool. (OS Async Helpers)

For example, with the `https` module, request are made by the OS, and there's no blocking of the event loop. OS decides how to use threads. Almost everything around networking for all OS's use the OS's async features.

# Introduction: Nodemon
[Nodemon](https://nodemon.io/) is a utility that will monitor for any changes in your source and automatically restart your server. Perfect for development. Install it using npm.

Just use nodemon instead of node to run your code, and now your process will automatically restart when your code changes. To install, get node.js, then from your terminal run:

```bash
$ npm install -g nodemon
```

 #### Basic setup

Install
``` 
npm i nodemon --save-dev
```

Add to package.json file 

```
"scripts": {
    "start": "node .",
    "dev": "nodemon ."
}

"DevDependecies": {
    "nodemon": <VERSION>
}
```

Run dev enviroment
```
npm run dev
```
# Introduction: Debugging
Use the `debbuger` statement as breakpoints and go to `chrome://inspect`.
# Introduction: Express
Express is a minimal and flexible Node.js web application framework that provides a robust set of features for Web Applications and APIs.
# Introduction: RESTful frameworks
[RESTIFY](http://restify.com/):

A Node.js web service framework optimized for building semantically correct RESTful web services ready for production use at scale. restify optimizes for introspection and performance, and is used in some of the largest Node.js deployments on Earth.

[LOOPBACK](https://loopback.io/)

Offering from StrongLoop, the current sponsor of the Express project. It offers a lot of features and is, of course, built on top of Express.
# Introduction: REST
We will cover the following topics:

* __Representational State Transfer__ fundamentals
* REST with HTTP
* Essential differences compared to classical __SOAP__ based services (Simple Object Access Protocol)
* Taking advange of existing infrastructure 

 ### REST Fundamentals

Back in 1999, Roy Fielding defined a set of principles built around the HTTP and URI standards that give birth to REST. 

Let's look at the key principles around the HTTP and URI standards, sticking to which will make your HTTP application a RESTful service-enabled application:

1. Everything is a resource
2. Each resource is identifiable by a __unique identifier (URI)__
3. Resources are manipulated via standard HTTP methods
4. Resources can have multiple representations
5. Communicate with resources in a stateless manner

The native HTTP protocol (RFC 2616) defines eight actions, also known as HTTP verbs
* GET
* POST
* PUT
* DELETE
* HEAD
* OPTIONS
* TRACE
* CONNECT

See [Fundamentals: Common HTTP Codes](#fundamentals--common-http-req-and-res).

Resource manipulation operations through HTTP requests should always be considered atomic. All modifications of a resource should be carried out within an HTTP request in an isolated manner. After the request execution, the resource is left in a final state, this implicitly means that partial resource updates are not support. You should always send the complete state of the resoure.

Another requirement for your RESTful application to be stateless is that once the service gets deployed on a production enviornment, it is likely that incoming requests are serverd by a load balancer, ensuring scalability and high availability. Once exposed via a load balancer, the idea of keeping your application state at server side gets compromised. You should keep it in a RESTful way, for example, keep a part of the state within the URI, or use HTTP headers to provide additional state-related data.

The statelessness of your RESTful API isolates the caller against changes at the server side. Thus, the caller is not expected to communicate with the same server in consecutive requests. This allows easy application of changes within the server infrastructure, such as adding or removing nodes.

 ### REST Goals

* Separation of the representation and the resource
    * Multiple representations available. It's up to the caller to specify the desired media type and then it's up the server application to handle the representation accordingly
* Visibility
    * Every aspect of it should be self-descriptive and follow the natural HTTP language
* Reliability
    * Which HTTP method are safe and indepmpotent in the REST context
* Scalability
    * Stateless is crucial, as scalign your application would require you to put another piece of hardware for a load balancer, or bring another instance in your cloud environment
    * Is all about serving all your clients in an acceptable amount of time and keep your application running, preventing Denial of Service (DoS) caused by a huge amount of incoming requests
* Performance
    * Time needed for a single request to be processed

 #### Safe HTTP Methods

Considered to be safe provided that, when requested, it does not modify or cause any side effects on the state of the resource

* GET

 #### Idempotent HTTP Methods

Consdired to be idempotent if its response stays the same, regardless of the number of times it is requested. 

* GET
* PUT
* DELETE

 ### Working with WADL

Description language called __Web Application Definition Language__. This is an optional XML description of the interface of the service and defines an endpoint URL for invocation. Similar to WSDL for SOAP web services.

 ### Documenting with Swagger

Public APIs exposed on the web should be well documented. The [Swagger project](https://swagger.io/) addresses the ned for neat documentation of RESTful APIs. It defines a meta description of an API from an almost human-readable JSON format within a `swagger.json` file.
# Introduction: Boilerplates setup
Go ahead and start coding with these templates

* [MERN](https://medium.com/javascript-in-plain-english/full-stack-mongodb-react-node-js-express-js-in-one-simple-app-6cc8ed6de274)

* [Express + React](https://github.com/bradtraversy/react_express_starter)

* [Express + React + Redux](https://github.com/bradtraversy/react_redux_express_starter)
# Introduction: Why and how to use Linter
This [note in Medium](https://medium.com/the-node-js-collection/why-and-how-to-use-eslint-in-your-project-742d0bc61ed7) will probably explain it better than me!
# Introduction: MVC
__Model__ hold the application data, changing it as instructed by the __Controller__ that coordinates (routing) the response for each URL, and supplying data requested by the __View__.

The API of the modules in the models direcotry will provide functions to Create, Read, Update and Delete/Destroy data items (__CRUD__), the four basic operations of persistent data storage, and other functions necessary for the View code to do its thing. 
# Introduction: Backend Architecture Introduction
The front-end is the code that is executed on the client side. This code (typically HTML, CSS, and JavaScript) runs in the user’s browser and creates the user interface.

The back-end is the code that runs on the server, that receives requests from the clients, and contains the logic to send the appropriate data back to the client. The back-end also includes the database, which will persistently store all of the data for the application. This article focuses on the hardware and software on the server-side that make this possible.

Review [REST and HTTP](Software-Theory.md#rest) if you want to refresh your memory on these topics. These are the main conventions that provide structure to the request-response cycle between clients and servers.

Let’s start by reviewing the __client-server relationship__.

 ### What are the clients?
The clients are anything that send requests to the back-end. They are often browsers that make requests for the HTML and JavaScript code that they will execute to display websites to the end user. However, there many different kinds of clients: they might be a mobile application, an application running on another server, or even a web enabled smart appliance.

 ## What is a back-end?
The back-end is all of the __technology required to process the incoming request and generate and send the response to the client__. This typically includes three major parts:

 ### The server 

This is the computer that receives requests. Though there are machines made and optimized for this particular purpose, any computer that is connected to a network can act as a server.


 ### The app 
This is the application running on the server that listens for requests, retrieves information from the database, and sends a response. It contains logic about how to respond to various requests based on the __HTTP verb__ and the __URI__ (Uniform Resource Identifier). The pair of both of them is called a __route__ and matching them based on a request is called __routing__.

Some of these handler functions will be __middleware__. In this context, middleware is any __code that executes between the server receiving a request and sending a response__. These middleware functions might modify the request object, query the database, or otherwise process the incoming request. Middleware functions typically end by passing control to the next middleware function, rather than by sending a response.

Eventually, a middleware function will be called that ends the request-response cycle by sending an HTTP response back to the client.

Often, programmers will use a framework like Express or Ruby on Rails to simplify the logic of routing. For now, just think that each route can have one or many handler functions that are executed whenever a request to that route (HTTP verb and URI) is matched.

 ###The database

Databases provide an interface to save data in a persistent way to memory. Storing the data in a database both reduces the load on the main memory of the server CPU and allows the data to be retrieved if the server crashes or loses power

Many requests sent to the server might require a database query. A client might request information that is stored in the database, or a client might submit data with their request to be added to the database.

---

 ## What kinds of responses can a server send?
The data that the server sends back can come in different forms. For example, a server might serve up an HTML file, send data as JSON, or it might send back only an HTTP status code. You’ve probably seen the status code “404 - Not Found” whenever you’ve tried navigating to a URI that doesn’t exist, but there are many more status codes that indicate what happened when the server received the request.


 ## What is a Web API, really?
An API is a collection of clearly __defined methods of communication between different software components__.

More specifically, a Web API is the interface created by the back-end: the __collection of endpoints and the resources these endpoints expose__.

A Web API is defined by the types of requests that it can handle, which is determined by the routes that it defines, and the the types of responses that the clients can expect to receive after hitting those routes.

One Web API can be used to provide data for different front-ends. Since a Web API can provide data without really specifying how the data is viewed, multiple different HTML pages or mobile applications can be created to view the data from the Web API.

---

 ## Other principles of the request-response cycle

* The server typically cannot initiate responses without requests!
* Every request needs a response, even if it’s just a 404 status code indicating that the content was not found. Otherwise your client will be left hanging (indefinitely waiting).
* The server should not send more than one response per request. This will throw errors in your code.


 ###  Example: Mapping out a request
Let’s make all of this a bit more concrete, by following an example of the main steps that happen when a client makes a request to the server.

1. Alice is shopping on SuperCoolShop.com. She clicks on a picture of a cover for her smartphone, and that click event makes a GET request to http://www.SuperCoolShop.com/products/66432.

Remember, GET describes the kind of request (the client is just asking for data, not changing anything). The URI (uniform resource identifier) /products/66432 specifies that the client is looking for more information about a product, and that product, has an id of 66432.

SuperCoolShop has an huge number of products, and many different categories for filtering through them, so the actual URI would be more complicated than this. But this is the general principle for how requests and resource identifiers work.

2. Alice’s request travels across the internet to one of SuperCoolShop’s servers. This is one of the slower steps in the process, because the request cannot go faster than the speed of light, and it might have a long distance to travel. For this reason, major websites with users all over the world will have many different servers, and they will direct users to the server that is closest to them!

3. The server, which is actively listening for requests from all users, receives Alice’s request!

4. Event listeners that match this request (the HTTP verb: GET, and the URI: /products/66432) are triggered. The code that runs on the server between the request and the response is called middleware.

5. In processing the request, the server code makes a database query to get more information about this smartphone case. The database contains all of the other information that Alice wants to know about this smartphone case: the name of the product, the price of the product, a few product reviews, and a string that will provide a path to the image of the product.

6. The database query is executed, and the database sends the requested data back to the server. It’s worth noting that database queries are one of the slower steps in this process. Reading and writing from static memory is fairly slow, and the database might be on a different machine than the original server. This query itself might have to go across the internet!

7. The server receives the data that it needs from the database, and it is now ready to construct and send its response back to the client. This response body has all of the information needed by the browser to show Alice more details (price, reviews, size, etc) about the phone case she’s interested in. The response header will contain an HTTP status code 200 to indicate that the request has succeeded.

8. The response travels across the internet, back to Alice’s computer.

9. Alice’s browser receives the response and uses that information to create and render the view that Alice ultimately sees!

# Fundamentals: Testing
__Unit testing__: each unit is tested separately, isolating the unit under test as much as possible from other parts of the applications. A common technique is to use mock objects or mock data to isolate individual parts of the applications from one another. Usually __performed by developers__.

__Functional testing__: doesn't try to test individual components, but instead it tests the whole system. Usually __performed by QA or QE team__ (QUality Assurance and Quality Engineering). 

 #### Assert - the basis

Node.js has a useful built-in testing tool, the `assert` module.

 ### Mocha and Chai

[Mocha](https://mochajs.org/) is one o many test frameworks available for Node.js. It help us write test cases and test suites, and it provides a test results reporting mechanism. It was chosen over the alternatives vecause it supports Promises. It fits very well with the Chai assertion library.

Mocha requires that tests be CommonJS modules, a module `esm` exists to load an ES6 module into a CommonJS module.

In `test` directory create a file named `test-model.js` containing this as the outher shell of the test suite:

```javascript
'use strict';

require = require('esm')(module, {'esm':'js'});
const assert = require('chai').assert;

descrie('Model test', function () {
    // ...
});
```
# Fundamentals: Testing Node
We can write basic tests (and of course, more comple ones) with [JEST Framework](https://jestjs.io/) to build our Test Suites and [SuperTest package](https://www.npmjs.com/package/supertest) to work with http requests.

Run script:
```
"test": "env-cmd -f ./config/dev.env jest --watch --runInBand"
```

Flag `--watch` to listen for changes in tests, and `--runInBand` to run test suites isolated and avoid conflicts.

 ### Test cases 

Blueprint test case
```
test('Should convert 0C to 32F', () => {
    const temp = celciusToFahrenheit(0);
    expect(temp).toBe(32);
})
```
Blueprint ASYNC code
```
test('Async test demo', (done) => {
  setTimeout(() => {
    expect(1).toBe(2);
    done()
  }, 2000)
});
```

```
test('Async test demo2', (done) => {
  add(2, 3).then((sum) => {
    expect(sum).toBe(5);
    done()
    })
});
```
# Fundamentals: Middlewares
We get access to use middlewares with `app.use(<middleware>)`

[CHECK EXPRESS API DOCS FOR BUILT-IN MIDDLEWARES!](https://expressjs.com/en/api.html)

Example: 

```
app.use((req, res, next) => {
  if (req.method === 'GET') {
    res.send('GET Requests are disabled')
  } else {
    next()
  }
});
```

---

 ### express.json

```
app.use(express.json());
```
Parse the request body in JSON format as an object, so you can access it using `console.log(req.body)`.
# Fundamentals: Upload files
We will use [MULTER library](https://www.npmjs.com/package/multer) to actually upload files. There's two different approachs for this:

* Save files to your working directory
* Save files as binary data (Buffer) and manually serve them as images

The second approach works better as we can just save the binary raw string in our database, and data will be safer. 

We will also use [SHARP library](https://www.npmjs.com/package/sharp) to convert large images in common formats to smaller, web-friendly JPEG, PNG and WebP images of varying dimensions.
# Fundamentals: Authentication
Tools we use:

* `express-session` middleware: Cache sessions with broser's cookies
* PassportJS: third-party services like Twitter or Facebook
* Restify `restify-server` `restify-client`: for authentication with a RESTful api, doesn't support a Promise-oriented API
* Superagent: `superagent`: to allow asynchronous, promise-based authentication (support for Promise-orientd API)
* Supertestmodels: Superagent companion for unit-testing

You should check documentation for further details, we will only serve particular examples to get a common authentication service up and running but you might need special configurations depending on business logic.

 ### Bcrypt - Password Storage

We should never store passwords as plain text. We'll use [BCRPT Library](https://www.npmjs.com/package/bcrypt) to encode passwords using hashes.

```
npm i bcrypt
```

 ### JSON Web Tokens 

[JWT Library](https://www.npmjs.com/package/jsonwebtoken): manage authenication tokens for active sessions.

```
npm i jsonwebtoken
```

 ### Express Middleware

* Without middleware: new request -> run route handler
* With middleware: new request -> do something -> run route handler
# Fundamentals: Common HTTP Req and Res
Full list [HERE!](https://httpstatuses.com/)

 #### Most common status code 

* __OK__ - 200 
* __Bad Response__ - 404

 #### CRUD Status Codes

* __GET__
    * __OK__ - 200
    * __Bad Response__ - 404

* __POST__
    * OK - 201 + New Object
    * Error - 400 (object not valid)

* __PUT__
    * Ok - 201 + Updated Object
    * __Bad Response__ - 404

* __ DELETE __
    * Ok - 204 + Deleted object id
    * __Bad Response__ - 404 (Request with invalid id)
# Fundamentals: Sending Emails
When a user registers, we'd like to be able to send emails confirming that they did register for example, or maybe just send them institutional news. 

For this we will be using [SendGrid API](https://sendgrid.com/).
# Fundamentals: Environment Variables
Keep production and development environment variables separeted and secured using `.env` files in a `config` folder. 

We will be using [env-cmd Library](https://www.npmjs.com/package/env-cmd) for executing command using an environment from an env file.
# Fundamentals: Reference projects
The following projects will serve you as reference for directory structure and tests.

* [Task-manager](https://github.com/herrera-ignacio/task-manager)
* [Auth-server](https://github.com/herrera-ignacio/auth-server)
* [Chat-app](https://github.com/herrera-ignacio/chat-app)
# Fundamentals: Deploying Apps
We'll cover the following:

* Traditional LSB-compilant Node.js deployment
* Using PM2 to improve reliability
* Deployment to __Virtual Private Server (VPS)__
* Microservice deployment with Docker
* Deployment to a Docker hosting provider

 ### Traditional Linux Service Deployment

* __init script__ to manage background processes using shell scripts in the `/etc/init.d` directory.

Web services have to be:

* _Reliable_: auto-restart if the server process crashes
* _Manageable_: integrates well with system managment practices
* _Observable_: administrator must be able to get status and activity information

The Linux package managment system doens't allow two MySQL instances. Instead, we implement separation in the same MySQL instance by using separate databases with different usernames and access privileges for each database.

The MySQL server must support TCP connections from `localhost`. You can edit the configuration file `/etc/mysql/my.cnf`, to have the following line:

```
bind-address = 127.0.0.1
```
This limits MySQL server connections to the processes on the server.

To send your files to your server, use the following:

```
rsync --archive --verbose ./ root@<server_ip>:/opt/
```

 ### PM2 to manage processes

There are many ways to manage server processes, to ensure restarts if the process crashes, and so on. We'll use [PM2](http://pm2.keymetrics.io/) because it's optimized for Node.js processes. It bundles process management and monitoring into one application.

Please read the documentation to properly install it in your production server.

 ### Microservice deployment with Docker

Docker automates the application deployment within software containers. The Docker implementation creates a layer of software isolation and virtualization based on Linux cgroups, kernel namespaaces, and union-capable filesystems, which blend together to make Docker what it is.

A _Docker Container_ is a running instantiation of a _Docker Image_. An image is a given Linux OS and application configuration designed by developers for whatever purpose they gave in mind. Developers describe an image using a __Dockerfile__, that is a fairly simple-to-write script showing Docker how to build and image. Docker images are designed to be copied to any server, where the image is instatiated as a Docker container.

Docker containerization is ver different from a virtual machine system such as VirtualBox. The processes running inside the container are actually runnin on the host OS. The containerization technology creates the illusion.

Docker ecosystem contains may tools, we'll focus on the following:

* __Docker engine__: Core execution system that orchestrates everything. It runs on a Linux host system, exposing network-based API that client applications ue to make Docker requests, such as building, deploying and running containers.
* __Docker machine__: Client application performing functions around provisioning Docker Engine instances on host computers.
* __Docker compose__: Helps you define, in a single file, a multi-cointainer application with all its dependencies defined.

 ### Installing Docker

We're looking for the Docker __Community Edition (CE)__ Because Docker runs on Linux, it does not run antively on macOS or Windows, and installation on either OS requires installing Linux inside a virtual machine and then running Docker tools within that virtual Linux machine.

 ### Deployment

Docker __Orchestrator__ services automatically deploy and manage Docker containers over a group of machines. Examples of this are Docker Swarm, Kubernetes, CoreOS Fleet and Apache MEsos.

The `docker-mahine` command comes with drivers supporting a lnog list of cloud-hosting providers.

For DigitalOcean, you would use something like thise:

```
docker-machine create --driver digitalocean --digitalocean-size 2gb \
--digitalocean-access-token TOKEN-FROM-PROVIDER sandbox
```
# Fundamentals: Enable ES6 modules (2019)
https://timonweb.com/tutorials/how-to-enable-ecmascript-6-imports-in-nodejs/

Using `esm` babel-less bundle-less JavaScript module loader, instead of the `.mjs` and experimental features.
# Fundamentals: Heroku Deployment
Basic steps for heroku deployment

You must create an account in _heroku_ and download _Heroku CLI_ to use the following commands from your terminal.

Create app
```
heroku create <unique_name>
```

Environment variables
```
heroku config:set key=value
heroku config:unset key
heroku config
```

Take in mind that `PORT` environment variable is handled by heroku and you don't need to specify it.

# Intermediate: Architectural Patterns
For developing an ecosystem of microservices.

* Front Controller
* Layered
* Service Locator
* Observer

 ### Front Controller

The __Front Controller__ pattern is when all requests go for a single point in your architecture, called the __handler__, which then processes and dispatches the requests to other handlers. This is the pattern used by, for example, load balancers and reverses proxies.

It's usefull to scale horizontally and in helping other services not having to know where the controllers are and choosing the one with the lowest load that should handle the request faster. 

 ### Layered

The __Layered pattern__ is common in filesystems and operative system. Consists of creating different layers that go from the raw data through to the data seen by a user.

The idea is to separate the complexity of the different layers, each one not having to know how the others do their stasks.

 ### Service Locator

The __Service Locator__ pattern is actually an anti-pattern. Not considered a good practice because it adds much more complexity to an ecosystem. Consist of a central registry, called a _Service Locator_, where services register their abilities, and other servicies can consult the registry and know where the services they need are located.

Similar to the _Front Controller_, but with added complexity, as you need to contact the Service Locator and the service you need, instead of just making a simple request to a Front Controller. 

 ### Observer

The __Observer pattern__ is used every day in Node.js. It consist of a __Subject__, which mantains a list of dependats, called __Observers__, which get notified of any state change happening on the SUbject.

You can see this happening every time in your web browser when some code attaches an event listener to an object or interface elemen

 ### Publish/Subscribe

Similar pattern, __Pub-Sub__. You have _Subscribers_ that subscribe to a specific event, and then you have _Publishers_ that emit those events. 

The different to the previous pattern may look very thin but is actually important. This pattern involves __third-party service__ and unlike the Observer pattern, __Publishers have no knowledge of the Subscribers__. This removes the need to handle and directly notify the Subscribers.
# Intermediate: Socket.IO and WebSockets
[Socket.IO](https://socket.io/) is a JavaScript library for __realtime__ web applications. It enables realtime, __bi-directional communication__ between web clients and servers. It has two parts: a client-side library that runs in the browser, and a server-side library for Node.js. Both components have a nearly identical API. Like Node.js, it is event-driven.

Socket.IO primarily uses the WebSocket protocol with polling as a fallback option, while providing the same interface. Although it can be used as simply a wrapper for WebSocket, it provides many more features, including broadcasting to multiple sockets, storing data associated with each client, and asynchronous I/O.

# Intermediate: Chat libraries
* [Mustache](https://cdnjs.com/libraries/mustache.js/): Render templates

* [Moment](https://cdnjs.com/libraries/moment.js/): Manipulate time

* [QS](https://www.npmjs.com/package/qs): Query String - Set up room and user names

CDN
```
https://cdnjs.cloudflare.com/ajax/libs/mustache.js/3.0.1/mustache.min.js
https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js
https://cdnjs.cloudflare.com/ajax/libs/qs/6.7.0/qs.min.js
```

Please check the [reference project here!](https://github.com/herrera-ignacio/chat-app)
# Intermediate: WebSocket Protocol
* Websockets allow for __full-duplex communication__. Server can also iniciate communication (request) to clients, without a request from a client before. Client connects to the server and remains connected as long as needed.

* __Separate protocol__ from HTTP.

* __Persistent connection__ between server and client.

# Intermediate: Unit testing (Mocha)
We will be using [Mocha testing framework](https://mochajs.org/) and [Chai Assertion Library](https://www.chaijs.com/).

Install it with `npm i -g mocha`.

You can test Callbacks, Promises, Async/await, and more!

Basic blueprint
```javascript
describe('File to be tested', () => {
    context('function to be tested', () => {
        it('should do something', () => {
            assert.equal(2, 1+1);
        });
        
        it('should do something else', () => {
            assert.deepEqual({name: 'joe'}, {name:'joe'});
        });
    });

    context('another context', () => {});
});
```

Run your tests!
```javascript
mocha ./tests/*.test.js --recursive
mocha ./lib/**/*.test.js
```

 ### Before and After

```javascript
describe('File to be tested', () => {
    before(() => {});
    after(() => {});

    beforeEach(() => {});
    afterEach(() => {});
});
```

---

 ## Chai Basics 

Install it with `npm install --save-dev chai`.

Blueprint
```javascript
const chai = require('chai');
const expect = chai.expect;

describe('File to be tested', () => {
    it('Should compare some values', () => {
        expect(1).to.equal(2);
    });
});
```

Lots of `expect().to` methods!

 #### Chai Promises Addons

Use this for testing async/await functions!

```javascript
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
```

---

 ## Environment Variables & Cross-Env

You might use [cross-env npm package](https://www.npmjs.com/package/cross-env).
Always test that `process.env.NODE_ENV` is DEVELOPMENT! Do not run your tests in staging/production as most of the times, test involves creating and dropping databases.

---

 ## Sinon and Test Doubles

[Sinon](https://sinonjs.org/): test spies, stubs and mocks for JavaScript.

Propery isolate the code you are testing.

 #### Spies

A test spy is a function that records arguments, return value, the value of this and exception thrown (if any) for all its calls. There are two types of spies: Some are anonymous functions, while others wrap methods that already exist in the system under test.

Chai assertion has a handy library: `sinon-chai`, to make assertions related to Sinon.

 #### Stubs

Test stubs are functions (spies) with pre-programmed behavior.

They support the full test spy API in addition to methods which can be used to alter the stub’s behavior.

As spies, stubs can be either anonymous, or wrap existing functions. When wrapping an existing function with a stub, the original function is not called.

__Use a stub when you want to__:

1. Control a method’s behavior from a test to force the code down a specific path. Examples include forcing a method to throw an error in order to test error handling.

2. When you want to prevent a specific method from being called directly (possibly because it triggers undesired behavior, such as a XMLHttpRequest or similar).

 ## Rewire - Access private attributes

Install it with `npm i --save-dev rewire`. 

You can call modules with `rewire` instead of `require`. This will give us access to private methods and attributes.

 ## Test Coverage

Use [Instanbuljs/NYC CLI](https://github.com/istanbuljs/nyc)

You can start using it adding this to your `package.json` scripts:

```json
"coverage": "cross-env NODE_ENV=development nyc --reporter=text npm test"
```
# Intermediate: gitlab-ci variables and node
https://stackoverflow.com/questions/51974396/gitlab-ci-using-a-variable-with-npm-config-set
# Intermediate: Routes testing (Supertest)
We will be using the [Supertest framework](https://github.com/visionmedia/supertest#readme).

Install it
```
npm install supertest --save-dev
```

Once installed it can now be referenced by simply calling `require('supertest')`;

You may integrate it with your Mocha tests.

# Advanced: Enchance performance
Recommended: Use Node in __Cluster__ Mode
Experimental: Use _Worker Threads_

 #### Benchmarking

Use __Apache benchmark__ or `$ ab`.

* `-n`: How many requests
* `-c`: Concurrency (how many at the same time)

Important measures:
* Requests per second
* Time per request

Test command:
```
$ ab -c 50 -n 500 localhost:3000/route
```

 ## Clustering

A Cluster Manager uses __multiple node instance__. It doesn't execute any application code, it's responsable of moderating the instances (start, restart, administrative tasks like serving static files or accessing databases).

We still run a node instance, but the first instance will be refered as the 'Cluster Manager', that will be responsible for launching new __Worker Instances__. Cluster Manager will require the `cluster` module fron the STL.

```
const cluster = require('cluster');
if (cluster.isMaster) {
    cluster.fork();
} else {
    const express = require('express');
    const app = express();
    // ...
}
```

---

 ## PM2

Usefull links
* [Repository](https://github.com/Unitech/pm2)
* [Website](https://pm2.io)
* [Metrics](http://pm2.keymetrics.io/)

Install it

```javascript
npm install -g pm2
```

Run your application

```
pm2 start index.js -i 0
```

0 will make pm2 launch as many instances as logical cores in your CPU.

Stop application

```
pm2 delete index.js
```

Quick summary 
```
pm2 list
```

Detail information
```
pm2 show index
pm2 monit
```

---

 ## Worker Threads

Uses Thread Pools, so we are limited from our CPU power.

[> Web Worker Threads <](https://www.npmjs.com/package/webworker-threads)
# Advanced: Data Caching with Redis
eThis can be done with any database, but I will focus on usage with MongoDB.

When a requst is made to our server, the __route handler__ sees request, and tells Mongoose to get records. Mongoose reaches out to mongodb, fetches data and server responds to the request.

 ### Redis Introduction

In-memory data store, is essentially a tiny database that runs in your machine and writes/reads data really quick. It operates in memory so data doesn't persist when machine stops.

For Node integration, we will use `node-redis`, so we can interact with a Redis Server.

Install Redis on MacOS:

```
brew install redis
brew services start redis
redis-cli ping // check server on
```

The documentation on how to interact with the server, is here: 
https://redis.io/documentation

 #### Redis Gotcha

You can only store __numbers__ and __letters__. You cannot store a plain javascript object.

You can still use `JSON.stringify({...})` and `JSON.parse('{...}')`.

 #### node-redis

_Connect to redis_
```javascript
const redis = require('redis')
const redisUrl = 'redis://127.0.0.1:6379'
const client = redis.createClient(redisUrl)
```

_Setting and getting values_:
```javascript
set('key', 'value');
get('key', (err, val) => console.log(val));
```

---

 ### Cache Keys

We want query keys that are _consistent_ but _unique_ between query executions.

 ### Promisifying function

We'll write the cache logic directly in a demo request for now, but later on it will be isolated. By default the `client.get` provided by redis client doesn't support promises. So we are going to use `promisify` from `util` module to make use of promises.

In this example, the cache key will be the `user.id`.

```javascript
app.get('/api/blogs', requireLogin, async (req, res) => {
    const redis = require('redis');
    const redisUrl = 'redis://127.0.0.1:6379'
    const client = redis.createClient(redisUrl)

    const util = require('util');
    client.get = util.promisify(client.get);

    // Do we have any cached data in redis related
    // to this query?
    const cachedBlogs = await client.get(req.user.id);

    // If yes, then respond to the request right away
    if (cachedBlogs) {
        console.log('SERVING FROM CACHE');
        return res.send(JSON.parse(cachedBlogs));
    }    

    // If no, we need to respond to th request
    // and update our cache to store the data    

    const blogs = await Blog.find({ _user: req.user.id });

    console.log('SERVING FROM MONGO');
    res.send(blogs);

    client.set(req.user.id, JSON.stringify(blogs));
});
```
This won't update cache when new blogs are added (cached values never expire). That's a big issue.
Another issue is that the redis client setup logic, shouldn't be done in the request. 

 ## Cache solution (Refactor)

__Cached values never expire__: Add timeouts to values assigned to reddis and the ability to reset all values tied to some specific event (as adding a new value).

__Cache keys wont work when we introduce other collections or query options__: Figure out a more robust solution for generating cache keys. A solution would be to _stringify the query_ and use it as the key (as the query would be unique).

__Caching code isn't easily reusable anywhere else in our codebase__: Hook in to Mongoose's query generation and execution process. We could take advantage of Javascript Prototypal inheritance, to modify the `Query` mongoose function with a new method.

```javascript
const mongoose = require('mongoose');

const exec = mongoose.Query.prototype.exec;

mongoose.Query.protototype.exec = function() {
    console.log("I'M ABOUT TO RUN A QUERY");

    return exec.apply(this, arguments);
};
```

Making _unique keys_
```javascript
const mongoose = require('mongoose');

const exec = mongoose.Query.prototype.exec;

mongoose.Query.protototype.exec = function() {
    console.log("I'M ABOUT TO RUN A QUERY");

    const key = Object.assign({}, this.getQuery(), {
        collection: this.mongooseCollection.name
    });

    return exec.apply(this, arguments);
};
```

Restore _redis configuration_
```javascript
const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');

const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);
client.get = util.promisify(client.get);
const exec = mongoose.Query.prototype.exec;

mongoose.Query.protototype.exec = function() {
    console.log("I'M ABOUT TO RUN A QUERY");

    const key = Object.assign({}, this.getQuery(), {
        collection: this.mongooseCollection.name
    });

    return exec.apply(this, arguments);
};
```

Cache _implementation_

```javascript
mongoose.Query.protototype.exec = async function() {
    const key = Object.assign({}, this.getQuery(), {
        collection: this.mongooseCollection.name
    });

    // See if we have a value for 'key' in redis
    const cacheValue = await client.get(key);

    // If we do return that
    if (cacheValue) {
        // we need to return a mongoose document, not plain json
        const doc = JSON.parse(cacheValue);

        // application is waiting an array of documents
        return Array.isArray(doc)
            ? doc.map(d => new this.model(d))
            : new this.model(doc);
    }

    // Otherwise, issue the query and store the result in redis
    const result = await exec.apply(this, arguments);
    // result is a mongoose document, not a plain json object
    
    client.set(key, JSON.stringify(result));

    return result;
};
```

 ### Toggleable Cache

```javascript
mongoose.Query.prototype.cache = function() {
    this.useCache = true;
}

mongoose.Query.prototype.exec = async function() {
    if (!this.useCache) {
        return exec.apply(this, arguments) 
    }
}
```

```javascript
app.get('/api/blogs', requireLogin, async (req, res) => {
    const blogs = await Blog
        .find({ _user: req.user.id })
        .cache()
        .limit(10);
}
```

 ### Expire Cache

Automatic expiration
```javascript
mongoose.Query.prototype.exec = async function () {
    // ...

    client.set(key, JSON.stringify(result), 'EX', 10);
}
```

Force expiration with __Hashes Keys__
```javascript
client.hget = util.promisify(client.hget);

// If I want all data to be saved in an specific bucket, I can provide custom key
mongoose.Query.prototype.cache = function (options = {}) {
    this.useCache = true;
    this.hashKey = JSON.stringify(options.key || '');

    return this;
}

mongoose.Query.prototype.exec = async function () {
    // ...
    const cacheValue = await client.hget(this.hashKey, key);
    
    // ...
    client.hset(this.hashKey, key, JSON.stringify(result), 'EX', 10);
}
```

Remove cache using __hashes keys__
```javascript
module.exports = {
    clearHash(hashKey) {
        client.del(JSON.stringify(hashKey));
    }
}
```

Then when creating new data, call this function `clearHash(req.user.id)`.

 ### Automate Cache Cleaning Middleware

Middleware
```javascript
const { clearHash } = require('../services/cache');

module.exports = async (req, res, next) => {
    await next();

    clearHash(req.user.id);
};
```

```javascript
app.post('/api/blogs', requireLogin, async (req, res) => { ... }
```
# Advanced: Automate Integration Testing
We will be using:

* [JEST](https://jestjs.io/)
* [PUPPETEER](https://github.com/GoogleChrome/puppeteer)

Testing Flow:

* Start Jest test suite
* Boot up a 'headless' version of Chromium
* Programatically instruct Chromium to visit routes
* Programatically instruct Chromium to click elements
* Make assertions about content on screen

 ### Set up

Add test command to `package.json`

```
"scripts" : {
    ...
    "test": "jest"
},
...
"dependencies" : {
    "jest": <version>,
    "puppeteer": <version>
}

```

Make a folder in your project source folder called `tests`. 

We'll follow the convention `component.test.js`, for example, if we are testing something in the application header, we would write a file called `header.test.js`.

 ### Launch Chromium instances

```javascript
test('We can launch a browser', async () => {
    const browser = await puppeteer.launch({
        headless: false // watch gui    
    });
    const page = await browser.newPage();
});
```

 ### Chromium navigation

```javascript
await page.goto('localhost:3000');
```

 ### Extracting Page Content

```javascript
const text = await page.$eval('css-class', el => el.innerHTML);

expect(text).toEqual('whatever you want');
```

 ### DRY - Initialization tasks


```javascript
let browser, page;

beforeEach(() => {
    browser = await puppeteer.launch({});
    page = await browser.newPage();
    await page.goto('localhost:3000');
});

afterEach(() => {
    await browser.close();
});
```

 ### Assertion OAUTH Flow

```javascript
test('clicking login starts oauth flow', async () => {
    await page.click('.right a');

    const url = await page.url();

    expect(url).toMatch(/accounts\.google\.com/);
});
```

Take an existing user ID and generate a fake session object with it
```javascript
test('When signed in, shows logout button', async () => {
    const id = '...;launch
    const Buffer = require('safe-buffer').Buffer;
    const sessionObject = {
        passport: {
            user: id
        }
    };
    const sessionString = Buffer.from(
        JSON.stringify(sessionObject)
    ).toString('base64');

    const Keygrip = require('keygrip');
    const keys = require('../config/keys');
    const keygrip = new Keygrip([keys.cookieKey]);
    const sig = keygrip.sign('session=' + sessionString);

    await page.setCookie({ name: 'session', value: sessionString });
    await page.setCookie({ name: 'session.sig', value: sig });
    await page.goto('localhost:3000');

    page.waitFor('a[href="/auth/logout"]');
    const text = await page.$eval('a[href="/auth/loguot"]', el => el.innerHTML)
    expect(text).toEqual('Logout');
});
```
# Advanced: Continuous Integration
__What is CI?__
Process to merge all code changes into a single branch.

__What is a CI server?__
Server than runs automatic checks (tests) on the codebase to ensure that changes haven't broken anything. 

 #### CI Flow

* Developer pushes code to remote repositry
* CI Server detects that a new push of code has occured
* CI Server clones project to a cloud based virtual machine
* CI Server runs all tests
* If all tests pass, CI Server marks build as 'passing' and does some optional followup
    * Send an email
    * Automatically deploy
    * Put notification on Github
    * etc...

 #### CI Providers

Services that provides CI Servers.

The flow we will be using, will focus on __Github__. Others providers, like gitlab, use differents solutions.

* __Travis__ CI (We'll use this!)
* Circle CI
* Codeship
* AWS Codebuild


 ### Travis workflow

Check official documentation!
https://docs.travis-ci.com/

* Push code to Github
* Travis automatically detects pushed code
* Travis clones our project
* Travis runs tests using a `.travis.yml` file
* If tests are OK, Travis sends us an email 

 ### `.travis.yml`

```yml
language: node_js
node_js:
    - "8"
dist: trusty
services:
    - mongodb
    - redis-server
env:
    - NODE_ENV=ci
cache:
    directories:
        - node_modules
        - client/node_modules
install:
    - npm install
    - npm run build // create-react-app
script:
    - nohup npm run start &
    - sleep 3
    - npm run test
```

`nohup`: If the shell is closed, dont kill anything this command creates
`&`: Run this command in a subshell (background)

Check Travis documentation on how to setup your particular database.
# Advanced: Scalable Image Upload
 Big Image Upload Issues
* Where do images get physically stored?
* How do images 'get' to the place they should be stored?
* How do we relate images to a particular element

Solutions
* 1: Store in MongoDB (__BAD__)
* 2: HDD Attached to Hosted Server (__BAD__, Doesnt work well with horizontal scaling)
* 3: Outside Data Store (__GOOD__)
    * Amazon S3 (~0.25usd per GB per month)
    * Azure File Storage
    * Google Cloud Storage

 ### Upload Process Issues 

* We should only allow images to be uploaded

Directly concerned with logic in our API
* Only signed in users should be able to upload
* The uploaded image needs to be tied to the element that's being created

Our server can use a __Temp Storage__, for example, the HDD attached to hosted server. Once this image is totally uploaded to the temp storage, we can transfer the image to our __outside data store__.
This image upload handling is really heavy, and __not very scalable__. To avoid expending more money and resources, we have a workaround.

 ### Upload process solution

1. Client tells server it needs to upload a file to S3. Includes file name and file type
2. Server asks S3 for a _presigned URL_
3. S3 gives server a presigned URL. Works *only* for a file matching the original file name
4. Server sends url to React client
5. React client uploads image file directly to s3 server
6. React client tells server the upload was succesfull
7. Server saves URL of that new image

 #### Security

* URL can only be used for a single file upload
* URL encodes the file name and type of file
* URL can expire
* URL is generated by a secure request between our server and AWS
* URL only works for the S3 bucket it is created for

We should make User Credential with IAM that only have permissions to use S3 Buckets.

 ### Requirements

* [AWS SDK](https://aws.amazon.com/sdk-for-node-js/)
* AWS User Access Keys

```javascript
const s3 = new AWS.S3({
    accessKeyId: keys.accessKeyId,
    secretAccessKey: keys.secretAccessKey
});
```

 #### CORS Issues

A web application executes a cross-origin HTTP request when it requests a resource that has a different origin (domain, protocol, or port) than its own origin.

__We need to allow CORS on the S3 Bucket__, for PUT/POST requests (the request we use to upload images). Only allow localhost as origin. 
# Advanced: Docker
> Docker is a set of platform-as-a-service products that use operating-system-level virtualization to deliver software in packages called containers.

 ### Docker Client

* `docker run <image_name> [-d]` = `docker create <image>` + `docker start <image>`
    * `<command>`: Override default command
    * `-d`: Run in background

* `docker ps [-all]`: List running containers

* `docker system prune`

* `docker stop/kill <container_id>`

* `docker logs <container_id>`

* `docker exec [-it] <container_id> <command>`
    * `-it` = `-i` & `-t`

* `docker exec -it <container_id> sh/bash`: Get a Command Prompt in a Container

* `docker run -it <image> sh`: Starting with a Shell

 ### Docker Server - Custom Images

* __Dockerfile__: Configuration to define how our container should behave
    * Base Image
    * Run some commands to install additional programs
    * Specifiy a command to run on container startup
* Docker Client & Docker Server
* Usable Image!

* `docker build .` and `docker run <image_id>`

Convention TAG: `docker build -t <your_docker_id>/<project_name>:<version/latest> .`

Manual image Generation with _Docker Commit_: `docker commit -c 'CMD ["<comand"] <container_id>`

 ### Real Project Setup

Project Outline
* Create Node JS web app
* Create a Dockerfile
* Build image from dockerfile 
* Run image as container
* Connect to web app from a browser

 #### Dockerfile
```
FROM node:apline

WORKDIR /usr/app

// Install dependencies
COPY ./package.json ./
RUN npm install

// Copy everything then
COPY ./ ./

// Default commands
CMD ["npm", "start"]

```

We don't want to be working by default on the root directory, that's why we use `WORKDIR`. If the folder doesn't exist, it won't be created, and any further commands will be executed here.

Container takes snapshots of FS (filesystem), so any local updates won't be reflected inside the container. To solve this, we need to _rebuild container_. We want to minimize cache busting and rebuilds (we don't want to re-install all depednencies).



 #### Port Mapping

`docker run -p 8080:8080 <image_id>`

What `p` does is routes incoming request `<localhost_port>:<container_port>`.


 #### Volumes

Replicate local changes on container!

```
docker run -p 3000:3000 -v /app/node_modules -v $(pwd):/app <image_id>
```

The first `-v /app/node_modules` is for bookmarking.

Or with __Docker Compose__:

```
services:
    yourservice:
        build: .
        ports:
            - 3000:3000
        volumes:
            - /app/node_modules
            - .:/app
```

 ## Production-Grade Workflow

Flow tools
* Github
    * master branch
    * feature branch
* Travis
    * Pull requests CI
* AWS Elastic Beanstalk
* __Docker__: makes some of these tasks a lot easier!

 ### Development Environment

```
docker build -f Dockerfile.dev .
docker run -p 3000:3000 <container_id>
```

 #### Live updating Tests

Run tests at start
```
docker run -it <container_id> npm run test
```

Run tests on running container (and get access to shell)
```
// get container id
docker ps

// run tests
docker exec -it <container_id> npm run test
```

_Docker Compose_ solution, test will run before `--build` (no access to shell).
```
services:
    yourservice:
        tests:
            build: 
                context: .
                dockerfile: Dockerfile.dev
            volumes:
                - ...
            command: ["npm", "run", "test"]
```

Ussing `attach` (same as docker compose).
```
docker attach <container_id>
```

 ### Production Environment

Web Container
* Production Server - `nginx`
    * index.html
    * main.js

Build Phase 
* Use node:alpine
* Copy `package.json`
* Install dependencies
    * Only the one needed to execute `npm run build`
* `npm run build`

Run phase
* Use nxinx
* Copy over the result of `npm run build`
* Start nginx


__Dockerfile__
```dockerfile
FROM node:alpine as builder
WORKDIR '/app'
COPY package.json
RUN npm install
COPY . .
RUN npm run build

# run phase
FROM nginx
COPY --from=builder /app/build /usr/share/nginx/html

```


# Advanced: Docker Compose
Orchest differnt docker containers to work together. Alternative to Docker CLI Network tools.

* `docker-compose up [--build]` = `docker build .` & `docker run <myimage>`
* `docker-compose up [-d]`: Run in background
* `docker-compose down`: Stop all containers
* `docker-compose ps`: Status of running containers that belong to the `docker-compose.yml` file

 #### Automatic Container Restarts

_Restart Policies_
* no
* always
* on-failure
* unless-stopped

 #### `docker-compose.yml`

Contains all the options we'd normally pass to docker-cli (`build` and `run` commands).

```yml
version: '3'
services: 
    redis-server:
        image: 'redis'
    node-app:
        restart: always
        build: .
        ports:
            - "4001:8081:
```

Docker containers can communicate together by default.
We would connect to the redis server from or node code like this:

```javascript
const client = redis.createClient({
    host: 'redis-server',
    port: 6379
});
```

 #### Override Dockerfile Selection 

```
services:
    yourservice:
        build: 
            context: .
            dockerfile: Dockerfile.dev
```
# Advanced: CI/CD AWS & Travis
 ### `.travis.yml`

```yml
sudo: required
services:
    - docker

before_install:
    - docker build -t <username/project_name> -f Dockerfile.env .

script:
    - docker run -e CI=true <username/project_name> npm run test -- --coverage

```

 ### AWS Elastic Beanstalk

AWS Elastic Beanstalk is an orchestration service offered by Amazon Web Services for deploying applications which orchestrates various AWS services, including EC2, S3, Simple Notification Service (SNS), CloudWatch, autoscaling, and Elastic Load Balancers.[2] Elastic Beanstalk provides an additional layer of abstraction over the bare server and OS; users instead see a pre-built combination of OS and platform.

Elastic Beanstalk is actually delegating hosting to __Elastic Container Service (ECS)__, which has the instructions on how to run single containers.

 #### Travis fo deployment

`.travis.yml`
```
deploy:
    provider: elasticbeanstalk
    region: "us-west-2" // Check URL
    app: your_aws_app_name
    env: your_aws_env_name
    bucket_name: your_bukcet // Check AWS S3
    bucket_path: your_aws_app_name
    on:
        branch: master
    access_key_id:
        secure: $AWS_ACCESS_KEY
```

To automate deployments, you'll need an `AWS_ACCESS_KEY`, for this, check AWS IAM:
* Add User
* Attach preexisting policies
    * AWSElasticBeanstalk full access
* Set the secret key in Travis _Environment Variables_.

 #### EXPOSE Ports on `Dockerfile`

__Dockerfile__
```dockerfile
FROM node:alpine as builder
WORKDIR '/app'
COPY package.json
RUN npm install
COPY . .
RUN npm run build

# run phase
FROM nginx
EXPOSE 80 // This only affects AWS EB, it will map it for incoming traffic!
COPY --from=builder /app/build /usr/share/nginx/html

```
# Advanced: Multi-Container App
Application services:

Need _dev_ `Dockerfiles` for each
* React App
* Express Server
* Worker

Here, we'll specify the __enviornment values__.

Docker compose should set a volume to 'share' files.

 #### Adding Postgres as a Service

`docker-compose.yml`
```yml
version: '1'
services:
    postgres:
        image: 'postgres:latest'
    redis:
        image: 'redis:latest'
    api:
        build:
            dockerfile: Dockerfile.dev
            context: ./server
        volumes:
            - /app/node_modules
            - ./server:/app
        depends_on:
            - postgres
        environment:
            - REDIS_HOST=redis
            - REDIS_PORT=6379
            - PGUSER=postgres
            - PGHOST=postgres
            - PGDATABASE=postgres
            - PGPASSWORD=postgres_password
            - PGPORT=5432
    client:
        build:
            dockerfile: Dockerfile.dev
            context: ./client
        volumes:
            - /app/node_modules
            - ./client:/app
    worker:
        build:
            dockerfile: Dockerfile.dev
            context: ./worker
        volumes:
            - /app/node_modules
            - ./worker:/app
```

 ### Nginx routing 

What does the request start with?
* `/api` redirect to Express Server
* `/` redirect to React Server

For this, we create `nginx/default.conf`:

* Set an `upstream` client at `client:3000`
* Set an `upstream` server at `server:5000`
* Listen on port 80
* If anoyone comes to `/` send them to client upstream
* If anyone comes to `/api` send them to server upstream

```conf
upstream client {
    server client:3000;
}

upstream api {
    server server:5000;
}

server {
    listen 80;

    location / {
        proxy_pass http://client;
    }

    location /sockjs-node {
        proxy_pass http://client;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade
        proxy_set_header Connection "Upgrade";
    }

    location /api {
        rewrite /api/(.*) /$1 break;
        proxy_pass http://api;
    }
}
```

Create `nginx/Dockerfile.dev`

```dockerfile
FROM nginx
COPY ./default.conf /etc/nginx/conf.d/default.conf
```

Add it to `docker-compose.yml` services.
```yml
nginx:
    restart: always
    build:
        dockerfile: Dockerfile.dev
        context: ./nginx

    ports:
        - '3050:80' //access from local 3050 to 80 of container
```

Start everything!

```
docker-compose up --build
```

After any changes make sure you run `docker-compose down`, and then rebuild.

 ## Multi-container deployment

Github flow 
* Push code to github
* Travis automatically pulls repo
* Travis builds a _test_ image, tests code
* Travis builds _prod_ images
* Travis pushes built _prod_ images to Docker hub
* Travis pushes project to AWS EB
* EB pulls images from Docker Hub, deploys

We must make production `Dockerfile` for each service/container.

 #### Multiple Nginx instances

For production, the react/frontend files will be served statically in an nginx instance. So we need to create a it.

Create this file: `client/nginx/default.conf`:
```nginx
server {
    listen 3000;

    location / {
        root /usr/share/nginx/html;
        index index.html index.htm
        try_files $uri $uri/ /index.html; // React-routing
    }

}
```

And then, the _production_ `Dockerfile` for the client:
```dockerfile
FROM node:alpine as builder
WORKDIR '/app'
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /user/share/nginx/html
```

 ## Travis configuration

 #### `.travis.yml`

```yml
sudo: required
services:
    - docker

before_install:
    - docker build -t <username>/<project> -f ./client/Dockerfile.dev ./client

// Run test, if one exit with code 0, travis assumes build failed
script:
    - docker run <username>/<project> npm run test -- --coverage
    - docker run <myotherproject> <myothertests>

after_success:
    - docker build -t <username>/multi-client ./client
    - docker build -t <username>/multi-server ./server
    - docker build -t <username>/multi-woker ./worker
    # Log in to the docker CLI
    - echo "$DOCKER_PASSWORD" | docker -login -u "$DOCKER_ID" -- password-stdin
    # Take those images and push them to Docker Hub
    - docker push <username>/multi-client
    - docker push <username>/multi-server
    - docker push <username>/multi-worker
```

 #### Push images to Docker hub

```
docker login
```

 ## AWS Deployment

 #### Definition files: `Dockerrun.aws.json`

```json
{
    "AWSEBDockerrunVersion": 1,
    "containerDefinitions": [
        {
            "name": "client",
            "image": "<username>/multi-client",
            "hostname": "client",
            "essential": false,
            "memory": 128
        },
        {
            "name": "server",
            "image": "<username>/multi-server",
            "hostname": "api"
            "essential": false,
            "memory": 128
        },
        {
            ....
        },
        {
            "name": "nginx",
            "image": "<usenrame>/multi-nginx",
            "essential": true,
            "portMappings": {   [
                {
                    "hostPort": 80,
                    "containerPort": 80
                }
            ],
            "links": ["client", "server"],
            "memory": 128
        }
    ]
}
```

 #### EB Environment

When you create a new application, you can create a new environment.

 #### Managed Data Service Providers

Your application architecture may look something like this in Production:

* AWS Elastic Beanstalk Instance
    * Nginx
        * Nginx w/Prod Files (React)
        * Express Server
    * Worker
* AWS Elastic Cache
    * Redis
* AWS Relational Database Service
    * Postgres

So the connections on AWS will be like this:
* EB Instance
    * RDS (Postgres)
    * EC (Redis)

So we need to make the following:
1. RDS Database Creation (Postgres)
2. EC Redis Creation
3. Create a custom _Security Group_ (Firewall rules)
    * Here we will allow any incoming traffic on Port 80 from any IP, and from any other AWS service that has this security group
4. Apply Security Group to resources (from EB)
5. Provide Environment Variables on EB
6. Get IAM Keys for Continuous Deployment (Travis Environment Variables)

We add this to the Travis configuration

 #### `.travis.yml`

```yml
deploy:
    provider: elasticbeanstalk
    region: ...
    app: ...
    env: ...
    bucket_name: ...
    bucket_path: ...
    on:
        branch: master
    access_key_id: 
        secure: $AWS_ACCESS_KEY
    secret_access_key:
        secure: $AWS_SECRET_KEY
```

---

 ## AWS Configuration Cheat Sheet

Steps listed are accurate as of 7-11-2019, keep in mind that AWS makes frequent small changes to their UI.

 #### RDS Database Creation

Go to AWS Management Console and use Find Services to search for RDS

Click Create database button

Select PostgreSQL

Check 'only enable options eligible for RDS Free Usage Tier' and click Next button

Scroll down to Settings Form

Set DB Instance identifier to multi-docker-postgres

Set Master Username to postgres

Set Master Password to postgres and confirm

Click Next button

Make sure VPC is set to Default VPC

Scroll down to Database Options

Set Database Name to fibvalues

Scroll down and click Create Database button

 #### ElastiCache Redis Creation

Go to AWS Management Console and use Find Services to search for ElastiCache

Click Redis in sidebar

Click the Create button

Make sure Redis is set as Cluster Engine

In Redis Settings form, set Name to multi-docker-redis

Change Node type to 'cache.t2.micro'

Change Number of replicas to 0

Scroll down to Advanced Redis Settings

Subnet Group should say “Create New"

Set Name to redis-group

VPC should be set to default VPC

Tick all subnet’s boxes

Scroll down and click Create button

 #### Creating a Custom Security Group

Go to AWS Management Console and use Find Services to search for VPC

Click Security Groups in sidebar

Click Create Security Group button

Set Security group name to multi-docker

Set Description to multi-docker

Set VPC to default VPC

Click Create Button

Click Close

Manually tick the empty field in the Name column of the new security group and type multi-docker, then click the checkmark icon.

Scroll down and click Inbound Rules

Click Edit Rules button

Click Add Rule

Set Port Range to 5432-6379

Click in box next to Custom and start typing 'sg' into the box. Select the Security Group you just created, it should look similar to 'sg-…. | multi-docker’

Click Save Rules button

Click Close

 #### Applying Security Groups to ElastiCache

Go to AWS Management Console and use Find Services to search for ElastiCache

Click Redis in Sidebar

Check box next to Redis cluster and click Modify

Change VPC Security group to the multi-docker group and click Save

Click Modify

 #### Applying Security Groups to RDS

Go to AWS Management Console and use Find Services to search for RDS

Click Databases in Sidebar and check box next to your instance

Click Modify button

Scroll down to Network and Security change Security group to multi-docker

Scroll down and click Continue button

Click Modify DB instance button

 #### Applying Security Groups to Elastic Beanstalk

Go to AWS Management Console and use Find Services to search for Elastic Beanstalk

Click the multi-docker application tile

Click Configuration link in Sidebar

Click Modify in Instances card

Scroll down to EC2 Security Groups and tick box next to multi-docker

Click Apply and Click Confirm

 #### Setting Environment Variables

Go to AWS Management Console and use Find Services to search for Elastic Beanstalk

Click the multi-docker application tile

Click Configuration link in Sidebar

Select Modify in the Software tile

Scroll down to Environment properties

In another tab Open up ElastiCache, click Redis and check the box next to your cluster. Find the Primary Endpoint and copy that value but omit the :6379

Set REDIS_HOST key to the primary endpoint listed above, remember to omit :6379

Set REDIS_PORT to 6379

Set PGUSER to postgres

Set PGPASSWORD to postgrespassword

In another tab, open up RDS dashboard, click databases in sidebar, click your instance and scroll to Connectivity and Security. Copy the endpoint.

Set the PGHOST key to the endpoint value listed above.

Set PGDATABASE to fibvalues

Set PGPORT to 5432

Click Apply button

 #### IAM Keys for Deployment

Go to AWS Management Console and use Find Services to search for IAM

Click Users link in the Sidebar

Click Add User button

Set User name to multi-docker-deployer

Set Access-type to Programmatic Access

Click Next:Permissions button

Select Attach existing polices directly button

Search for 'beanstalk' and check all boxes

Click Next:Review

Add tag if you want and Click Next:Review

Click Create User
# Advanced: Kubernetes
 #### What is Kubernetes?

System for running many different containers over multiple different machines.

In Kubernetes, you have 'Clusters', each one with a _Master_ node that controls what each node does, where nodes are virtual machines or physical computers running containers, and where a _Load Balancer_ distributes traffic between those nodes when a _request_ arrives.

 #### Why use Kubernetes?

When you need to run many different containers with different images.

Scaling strategy of Elastic Beanstalk is to replicate machines, but with little control over what each one was doing, using a _Load Balancer_ to manage traffic. This would be inneficient in the previous case.

 ## Work with Kubernetes

 #### Development

* [Minikube](https://kubernetes.io/docs/tasks/tools/install-minikube/): managing the VM __LOCAL__
* [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/): managing containers in node

 #### Production

Alternatives
* (__EKS__):  Amazon Elastic Kubernetes Service
* (__GKE__): Google Cloud Kubernetes Engine
* Do it yourself
# Books to read
To Read:
* Building Bots with Node.js
    * Stefan Buttigieg, Milorad Jevdjenic

Books read:
* Advanced Node.js Development
    * Andrew Mead
* NodeJS Complete Reference Guide
# Book: NodeJs Complete Reference Guide

These are references from the topics I've considered important from differents book I've read so far. 

 ### Node.js complete reference guide

* HTTP Server and Client objects
    * HTTP Client request
    * Calling a REST backend service for heavy computational tasks

* Express
    * Promises and Async functions
    * MVC Paradigm
    * CRUD
    * Scaling up (running multiple servers)

* Mobile-first paradigm
    * Twitter Boostrap
    * Flexbox (12 column grid)

* Logging and debugging
    * Logger (`morgan`)
    * `rotating-file-stream` package
    * `debug` package
    * `uncaughtExceptions`
    * handle `unhandledPromise` with `util`

* CommonJS Modules vs ES6 Modules
    * `app.js` vs `app.mjs`
    * `require` vs `import`
    * `__dirname` vs `import.meta.url`
    * `bin/www` as an ES6 Module

 ##### Data Storage and Retrieval

* Data Storage and Retrieval
    * filesystem
        * Storage in `JSON`
        * `fs-extra` moule, Promised-based function to the `fs` module
        * `get JSON()` and `JSON.stringify(object)`
        * `static fromJSON(json)` and `JSON.parse(json)`
    * Dynamic import of ES6 Modules
        * `require(process.env.NOTES_MODEL ? path.join('.., ...) : 'models'/notes-memory)`
        * `import()` function that returns a Promise that will resolve to the imported module
    * LevelUP
        * Node.js-friendly wrapper around the LevelDB engine by Google (local NoSQL data storage in web browsers)
    * SQLite3
        * Schemas
        * `"sqlite3-setup": "sqlite3 dbname.sqlite3 --init models/schema.sql"`
    * ORM - Sequelize

* SQLite3
    * PROS
        * Lightweight (doesn't require a server)
        * Self-contained
        * No-set-up-required, just `npm install sqlite3`

* MongoDB
    * JSON Documents
    * Mongoose ORM

 ##### Authentication

* `express-session` middleware
* PassportJS
* Restify: `restify-server` `restify-client` (doesn't support a Promise-oriented API)
* Superagent: `superagent` (support for Promise-orientd API)
* Supertestmodels

---
