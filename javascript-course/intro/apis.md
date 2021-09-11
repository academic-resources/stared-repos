# What is an API

Application Programming Interface is an interface or communication protocol between different parts of a program intended to simplify the implementation and maintenance of software. Often includes specifications for routines, data structures, object classes, variables or remote controls.

In building applications, an API simplifies programming by abstracting the underlying implementation and only exposing objects or actions the developer needs. The API describes and prescribes the "expected behavior" (a specification) while the library is an "actual implementation" of this set of rules.

The separation of the API from its implementation can allow programs written in one language to use a library written in another.

Remote APIs allow developers to manipulate remote resources through protocols, specific standards for communication, therefore are useful in maintaining the object abstraction in object-oriented programming, a method call, executed locally on a proxy object, invokes the corresponding method on the remote object, using the remote protocol, and acquires the result to be used locally as return value.

APIs provide you with ready-made sets of code building blocks, you can separate them in third-party APIs and APIs related to your host environment (e.g Browser/Node);

## Web APIs / Web Services

Web APIs, are APIs used in the context of web development, typically defined as a set of specifications, such as HTTP (Hypertext Transfer Protocol) request messages, along with a definition of the structure of response messages, usually in JSON (JavaScript Object Notation).

The recent trend (so called Web 2.0) has been moving away from SOAP (Simple Object Access Protocol) based Web APIs/Web Services and SOA (Service-oriented architecture) towards more direct REST (Representation State Transfer) style web resources and ROA (Resource-oriented Architecture).

## Browser APIs

Browser APIs are built into your web browser, and are able to expose data from the surrounding computer environment, or do useful complex things. For example:

* __DOM (Document Object Model)__ API: allows you to manipulate HTML and CSS, creating, removing and changing HTML, dynamically applying new styles to your page, etc.
* __Geolocation__ API: retrieves geographical information.
* __Canvas and WebGL__ APIs: create 2D and 3D graphics.
* __Audio and Video__ APIs like HTMLMediaElement and WebRTC: play audio and video right in a web page, or grab a video from your web camera and display it on someone else's computer.

## Node APIs

Node.js is a JS runtime built on Chrome's V8 JavaScript engine, we'll get into details of this later on the course. Node.js will serve as a host environment, to run JavaScript outside the web browser, and just the same as it, it will provide methods to expose data from the surrounding computer environment and underlying OS (file system, networking and concurrency).

## Third-party APIs

Not built into your host environment by default and you generally have to grab their code and information from somewhere on the Web. For example:

* Twitter API: do things like displaying your latest tweets on your website.
* Google Maps API and OpenStreetMap API: embed custom maps into your website.
