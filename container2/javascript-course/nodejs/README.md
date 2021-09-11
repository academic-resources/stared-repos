# Node

JavaScript runtime built on top of Chrome's V8 JS Engine.

* Asynchronous promised-based style.
* Event-driven (Call Stack, Callback Queue, and Event Loop).
* Non-Blocking I/O.

## Under the hood

* V8 Engine
	* __Just-In-Time Compiler__
	* Pros of both interpreted and compiled languages
	* Written in C++
* Access to underlying OS using high-performance C++ modules (libuv)
	* File system
	* Networking
	* Concurrency

## Meta Model

In its most basic form, JS is a Synchronous, Blocking, and Single-Threaded language, in which only one operation can be in progress at a time.

BUT, web brosers, and runtime environments (such as Node.js), define APIs that allow us to register functions that should not be executed synchronously, and should instead be invoked asynchronously when some kind of event occurs. This means you can let your code do several things at the same time without stopping or blocking the main thread.

If you are doing operations like querying a database and using results to populate templates, it is better to push this off the main thread and complete the task asynchronously.

## Event-Driven, Non-Blocking I/O Model

This is what makes Node so great.

For this, Node privdes the __Event Loop__.

### Event Driven

__Event-Driven Programming__ is a computer programming paradigm in which control flow of the program is determined by the occurrence of events.

These events are monitored by code known as an _Event Listener_ that, if it detects that iss assigned event has occurred, runs an _Event Handler_, typically a callback function or method. This handler deals with the event by responding to it with program execution.

> Responses only run once we get a request

### Non-Blocking

Blocking is when execution of additional JS in Node.js process must wait until a non-JS operation completes.

All I/O methods in Node.js standard library provide __asynchronous versions__, which are __non-blocking__, and accept callback functions.

> Blocking methods execute synchronously, and non-blocking methods execute asynchronously.

### Concurrency

JS execution in Node.js is single threaded, so Concurrency refers to the __Event Loop's capacity to execute JS callback functions after completing other work__. Any code that is expected to run in a concurrent manner must allow the Event Loop to continue running as non-JS operations, like I/O, are ocurring.

As an example, consider a case where each request to a web server takes 50ms to complete and 45ms of that 50ms is database I/O that can be done asynchronously. Choosing non-blocking asynchronous operations frees up that 45ms per request to handle other requests.
