# JavaScript Complete Course

This is a complete course to become an advanced JavaScript developer. Here you will find all you need to know to develop any type of application (web, mobile, cli, etc) from scratch using JavaScript.

I will cover both Frontend and Backend related topics. You will learn the importance of testing your code, and how to do it, how to build your own Web HTTP Server, and develop dynamic and responsive web/mobile applications.

This course will be developed iteratively so you might not find everything yet. I plan to cover everything you might need to learn javascript from beginner to advanced and land a job, 100% free. It's impossible to cover every single topic, and it will also be a waste try to learn every single detail of a technology that's continuously evolving. Rather, I'll focus on the core concepts you need to understand to be able to adapt to newer features and best practices, once you get a solid basis of JavaScript and programming in general, you'll be able to solve almost anything with some logical thinking and online searches.

The lessons will probably have some extra attachments that may come in handy if you want to learn faster or get a deeper understanding in a particular subjet. Those attachments will be available at a modest price. Consider it like a donation more than anything else, if you think one of that resources would be extremely useful for everybody and should be free, please let me know, as my main concern is to let everybody know and access valuable information.

At the end of this README you'll find my own word of advice on how to approach this content, and how to get the most of it. I strongly suggest you to read it if you are a newcomer to programming in general.

## TOC

### 1.Introduction to Programming

* [What is JavaScript and ECMAScript](./intro/README.md)
* [HTML, CSS and JavaScript](./intro/html-css.md)
* [What is an API](./intro/apis.md)
	* Web APIs & Web Services
	* Browser API
  * Node API

### 2.JavaScript Fundamentals

* [Lenguage Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)
* [Variables: Block-level vs Function-level scope](./vanilla/vars.md)
* [Strict mode](./vanilla/strict.md)
* [Objects in detail](./vanilla/objects.md)
* [Constructor and Prototype](./vanilla/proto.md)
* [`this` keyword](./vanilla/this.md)
* [Inheritance and Prototype Chain](./vanilla/proto-chain.md)
* [Built-in Collections](./vanilla/collections.md)
* [Hoisting](./vanilla/hoisting.md)
* [Promises](./vanilla/promises.md)
 
### 3. Node

* [Node, event-driven, non-blocking I/O model](./nodejs)
* [Event Loop](./nodejs/eventloop.md)
* [Asynchronous Code](./nodejs/asynchronous.md)
	* [Callbacks](./nodejs/callbacks.md)
	* [Promises](./nodejs/promises.md)
	* [async/await](./nodejs/async-await.md)
* [Buffers](./nodejs/buffers.md)
* [Streams](./nodejs/streams.md)
* [Backpressuring in Streams](./nodejs/backpressuring.md)
* [Event Emitters](./nodejs/event-emitters.md)
* [Anatomy of HTTP Transaction](./nodejs/http-anatomy.md)

## How to approach

In my humble opinion, based on some years learning multiple programming languages (C, C++, Java, JavaScript, Python, Golang), multiple frameworks (Express, Angular, React, jQuery, React-Native, Django, Flask, Boostrap, Materialize, etc), and applying those in projects of all sizes, I came to find that the most efficient way to learn a new language and be productive with it fast, is to focus on some things more than others.

### What to focus on

* __Syntax rather than semantics__: how to form a valid sentence rather than how does a specific library declares it functions or even standard library, those you can always search online.
* __Ugly first__: don't focus on language best practices from day one, rather focus on getting the job done first. This will help you later while trying to learn way one solution may be better than other in different contexts.
* __Name your problems__: one of the most important things to learn, is how to search for answers and already implemented solutions. You can't search for a solution if you don't know how to describe the problem you are trying to solve. Always have a clear understanding of what problem you are addressing at any given time.
* __Divide and conquer__: we can all agree that usually searching "how to build a webpage" won't give you a clear answer on how to build your specific webpage with its unique requirements and so. Here's the importance of knowing how to describe a problem as smaller pieces, so that if you can solve this smaller pieces, you can then combine them to give a proper solution to the bigger problem. Try to think of any problem you need to face, as smaller problems. Following the example of the webpage, we could think of, how to insert javascript into html, how to create a responsive navbar, how to create a contact form, how to navigate between pages, etc...
* __Focus on processes, rather than tools__: there will always be a more trending, cooler, "better" tool that gives a solution to one of your specific problems. Try to focus on the "process" behind the solution, what the programming language lets you do, its features and capabilities, you can search for the tool that works best for you if you know which type of process/feature you are trying to accomplish. For example, it's way more important knowing that JavaScript has frameworks built on top of it that provides WebSockets / RealTime communication capabilities, for example if you are trying to build a chat, rather than knowing there's a library called socket.io that implements this. This way your critical and creative thinking don't get restricted with a library capabilities but rather the bigger capabilities of the language, and it will be just a matter of looking for libraries or already implemented solutions that suits your need, or even build your own tools.
