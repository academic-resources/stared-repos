# Contents

Idea: I will cover everything from intermediate and advanced MDN Javascript documentation
and then go through Javascript Guide for experienced programmers.
This guide will serve better for people with at least a minimal understanding of what
programming and object-oriented paradigm is about, but even if you don't, you should be
able to follow along.

#### Section 1 - Introducing JS

* What is Javascript
* HTML, CSS and Javascript
* Interpreted versus Compiled
* Server-side vs Client-side code
* Dynamic vs static
* History and ECMAScript
* ECMAScript Milestones
* What is an API
* Web APIs / Web Services
* Browser API
* Node API
* Third-party API

### Section 2 - JS Fundamentals
* Variables
* Dynamic Typing
* Types
  * Primitives
    * Number
    * BigInt
    * String
    * Boolean
    * Symbol (ES2015)
  * Object
    * Function
    * Array
    * Date
    * RegExp
    * Math
    * Error
  * undefined
  * null
* Operators
* Control structures
  * if else else-if
  * do-while
  * while
  * for variants
    * for loop
    * for in
    * for of
  * short circuit operators (&& ||)
  * ternary operator
  * switch case break
  * Array forEach
* STRICT MODE
  
### Section 3 - Introducing Objects
* Objects fundamentals
    * Data property
    * Accessor property
* Custom Objects
* Closures
* DEMO (EXTRA)

### Section 4 - Built-in objects
* Fundamental objects
* Value properties
* Function Properties
* Numbers and dates
* Text processing
* Indexed collections
* Keyed collections
* Structured data
* Control abstraction objects
* Reflection
* Internationalization
* WebAssembly
* arguments (other)

#### Section 4.1 - Fundamental objects
* Object
* Function
* Boolean
* Symbol
* Error
    * AggregateError
    * EvalError
    * InternalError
    * RangeError
    * ReferenceError
    * SyntaxError
    * TypeError
    * URIError
    
#### Section 4.2 - Numbers and Dates
* Number
* BigInt
* Math
* Date

#### Section 4.3 - Text Processing
* String
* RegExp

#### Section 4.4 - Indexed Collections
* Typed Array
* Array-like constructs

#### Section 4.5 - Keyed Collections
* Map
* Set
* WeakMap
* WeakSet

#### Section 4.6 - Structured data
* ArrayBuffer
* SharedArrayBuffer
* Atomics
* DataView
* JSON

#### Section 4.7 - Control abstraction
* Promise
* Generator
* GeneratorFunction
* AsyncFunction

#### Section 4.8 - Reflection
* Reflect
* Proxy

#### Section 4.9 - Internationalization
* Intl

#### Section 4.10 - WebAssembly
* WebAssembly
--- 

#### What is Javascript

JavaScript (JS) is a interpreted/just-in-time compiled programming language with first-class functions.

> A programming language is said to have First-class functions when functions are treated
> like any other variable

JS is a prototype-based. multi-paradigm, single-threaded, dynamic language.

While it is most well-known as the scripting language for Web pages, many non-browser
environments also use it, including Adobe Acrobat, Adobe Photoshop, SVG images, Yahoo's
Widget engine, server-side environments such as Node.js, NoSQL databases like open source
Apache CouchDB, embedded computers, complete desktop environments like GNOME, and others.

JavaScript supports object-oriented programming with object prototypes
instead of classes (see prototype inheritance). 

JavaScript also supports functional programming, because functions are
objects they may e stored in variables and passed around like any other object,
and imperative styles. 

Unlike most programming languages, it has no concept of input or output. It is designed to run
as a scripting language in a host environment, and it is up to the host environment to provide 
mechanisms for communicating with the outside world.

#### HTML, CSS and Javascript

Javascript allows you to implement complex features on web pages, every time a web page
does more that just sit there and display static information for you to look at, like displaying
timely content updates, interactive maps, animated 2D/3D graphics, scrolling video jukeboxes,
etc, you can bet that JavaScript is probably involved.

It is the third layer of the layer cake of standard web technologies.

* HTML is the markup language that we use to structure and give meaning to our web
content, for example defining paragraphs, headings, or embedding images and videos.
* CSS is a language of style rules that we use to apply styling to our HTML content,
for example setting background colors and fonts, and laying out our content in columns.
* JavaScript is a scripting language that enables you to create dynamically updating
content, control multimedia, and pretty much everything else.

#### Interpreted versus Compiled code

In __Interpreted__ languages, the code is run from top to bottom, and result of running the code
is immediately returned. You don't have to transform the code into a different form before running it.

__Compiled__ languages are transformed (compiled) into another form before they are run. For
example C/C++ are compiled into assembly language that is then run by the computer.

Javascript is a __lightweight interpreted language__. Web browser receives the JS code in its
original text form and runs the script from that. From a technical standpoint, most modern
JS interpreters actually use a technique called __just-in-time compiling__ to improve performance.
Javascript code gets compiled into a faster, binary format while the script is being used, so
that it can be run as quickly as possible. However, JS is still considered an interpreted language,
since compilation is handled at run time, rather than ahead of time.

#### Server-side vs Client-side code

__Client-side__ code is code that is rn on the user's computer, for example, when a web page is
viewed, the page's client-side code is downloaded, then run and displayed by the browser.

__Server-side__ code on the other hand is run on he server, then its results are downloaded and
displayed in the browser for example.

Javascript can be used both as client-side and server-side language, for example in Node.js
environments.

#### Dynamic versus Static code

__Dynamic__ is used to describe both client-side and server-side languages, and it refers to the
ability to update the display of a web-page/app to how different things in different
circumstances, generating new content as required. Server-side code dynamically generates
new content on the server, e.g. pulling data from a database, whereas client-side JS
dynamically generates new content inside the browser on the client, e.g. creating a new HTML
table, filling it with data requested from the server, and displaying the table in a web page.

A web page/app with no dynamically updating content is referred to as __Static__, it shows the
same content all the time.

#### History

JavaScript was created in 1995 by Brendan Eich while he was an engineer at Netscape and first
released with Netscape 2 early in 1996. Several months later, Microsoft released JScript with
IE3. Several months after that, Netscape submitted JavaScript to Ecma International, a European
standards organization, which resulted in the first edition of the ECMAScript standard that
year.

The standard received a significant update as ECMAScript edition 3 in 1999, and it has stayed
pretty much stable ever since. ECMAScript edition 5 was published in December of 2009, and
for the 6th major edition of the standard, it was published in June of 2015.

ECMAScript core editions:

# Section 2 - APIs Intro

#### What is an API

Application Programming Interface is an interface or communication protocol between different parts
of a program intended to simplify the implementation and maintenance of software. Often
includes specifications for routines, data structures, object classes, variables or remote
controls.

In building applications, an API simplifies programming by abstracting the underlying
implementation and only exposing objects or actions the developer needs. The API describes
and prescribes the "expected behavior" (a specification) while the library is an "actual
implementation" of this set of rules.

The separation of the API from its implementation can allow programs written in one language
to use a library written in another.

Remote APIs allow developers to manipulate remote resources through protocols, specific
standards for communication, therefore are useful in maintaining the object abstraction in
object-oriented programming, a method call, executed locally on a proxy object, invokes the 
corresponding method on the remote object, using the remote protocol, and acquires the result
to be used locally as return value.

APIs provide you with ready-made sets of code building blocks, you can separate them in third-party
APIs and APIs related to your host environment (e.g Browser/Node);

#### Web APIs / Web Services

Web APIs, APIs used in the context of web development, are typically defined as a set of
specifications, such as HTTP (Hypertext Transfer Protocol) request messages, along with a
definition of the structure of response messages, usually in JSON (JavaScript Object Notation).

The recent trend (so called Web 2.0) has been moving away from SOAP (Simple Object
Access Protocol) based Web APIs/Web Services and SOA (Service-oriented architecture)
towards more direct REST (Representation State Transfer) style web resources and ROA
(Resource-oriented Architecture).

#### Browser APIs

Browser APIs are built into your web browser, and are able to expose data from the 
surrounding computer environment, or do useful complex things. For example:

* `DOM (Document Object Model) API`: allows you to manipulate HTML and CSS, creating,
removing and changing HTML, dynamically applying new styles to your page, etc.
* `Geolocation API`: retrieves geographical information.
* `Canvas` and `WebGL` APIs: create 2D and 3D graphics.
* Audio and Video APIs like `HTMLMediaElement` and `WebRTC`: play audio and video
right in a web page, or grab a video from your web camera and display it on someone else's
computer.

#### Node APIs

Node.js is a JS runtime built on Chrome's V8 JavaScript engine, we'll get into details of this
later on the course. Node.js will serve as a host environment, to run JavaScript outside the
web browser, and just the same as it, it will provide methods to expose data from the
surrounding computer environment and underlying OS (file system, networking and concurrency).

#### Third-party APIs

Not built into your host environment by default and you generally have to grab their code and
information from somewhere on the Web. For example:

* `Twitter API`: do things like displaying your latest tweets on your website.
* `Google Maps API` and `OpenStreetMap API`: embed custom maps into your website.

