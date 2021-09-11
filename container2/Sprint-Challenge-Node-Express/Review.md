# Review Questions

## What is Node.js?

Node.js is a run time environment for running JavaScript outside of the browser.

## What is Express?

Express is a framework for Node.js which we use to build servers.

## Mention two parts of Express that you learned about this week.

In Express, we have access to methods built into the library that allow us to setup a server, like listen() which lets us begin running our server on a specific local port while developing. We can also use the built in methods to run CRUD operations, like those used in front end development, to receive client requests and return data or error handling, with methods like get(), post(), put() and delete().

## What is Middleware?

Middleware is an extra layer of tools that allow us to expand and customize the capabilities of Express, in this case. The data is run through our middleware before moving onto the request, and allows us to do things like parse, log information, or make changes to the data. We can use the built in middleware, third party middleware or even write our own custome middleware.

## What is a Resource?

Resources are the different requests and function calls we write within Express, that allow us to send and receive data.

## What can the API return to help clients know if a request was successful?

A status 200 as well as data, such as the updated information if a client is requesting a put operation or the newly created object if the client is requesting a post operation.

## How can we partition our application into sub-applications?

We can use routers to further organize our server resources.

## What is express.json() and why do we need it?

express.json() is a built in middleware of the express library, that accepts an object or an array and parses that data into JSON before sending the response back to the client.

