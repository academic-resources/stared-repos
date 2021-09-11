# What is JavaScript

JavaScript (JS) is an interpreted/just-in-time compiled programming language with first-class functions.

While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, including Adobe Acrobat, Adobe Photoshop, SVG images, Yahoo's Widget engine, server-side environments such as Node.js, NoSQL databases like open source Apache CouchDB, embedded computers, complete desktop environments like GNOME, and others.

JavaScript was created in 1995 by Brendan Eich while he was an engineer at Netscape and first released with Netscape 2 early in 1996. Several months later, Microsoft released JScript with IE3. Several months after that, Netscape submitted JavaScript to Ecma International, a European standards organization, which resulted in the first edition of the ECMAScript standard that year.

The standard received a significant update as ECMAScript edition 3 in 1999, and it has stayed pretty much stable ever since. ECMAScript edition 5 was published in December of 2009, and for the 6th major edition of the standard, it was published in June of 2015.

## Important Concepts

* Interpreted/Just-in-time Compiled
* Scripting language
* Sever-side/Client-side
* First Class Functions
* Object-Oriented
* Prototype-based
* Multi-Paradigm
* Single-threaded
* Dynamic language

### Interpreted/Just-in-time Compiled

Javascript is a lightweight interpreted language. Web browser receives the JS code in its original text form and runs the script from that. From a technical standpoint, most modern JS interpreters actually use a technique called just-in-time compiling to improve performance. Javascript code gets compiled into a faster, binary format while the script is being used, so that it can be run as quickly as possible. However, JS is still considered an interpreted language, since compilation is handled at run time, rather than ahead of time.

### Scripting language

Unlike most programming languages, it has no concept of input or output. It is designed to run as a scripting language in a host environment, and it is up to the host environment to provide mechanisms for communicating with the outside world.

### Server-side/Client-side

Client-side code is code that is run on the user's computer, for example, when a web page is viewed, the page's client-side code is downloaded, then run and displayed by the browser.

Server-side code on the other hand is run on he server, then its results are downloaded and displayed in the browser for example.

Javascript can be used both as client-side and server-side language, for example in Node.js environments.

### First Class Functions

A programming language is said to have First-class functions when functions are treated like any other variable.

### Object Oriented

Anything you look at in a piece of JavaScript code has a good change of being an object. Only five primitve types are not objects: `number`, `string`, `boolean`, `null` and `undefined`. Functions are objets too, they can have properties and methods.

When you define a variable, you are already dealing with objects. First, the variable automatically becomes a property of an internal object known as _Activation Object_ (global object), second, this variable is actually also object-like because it has its own properties (attributes).

There are two types of objets:
* _Native_: described in the ECMAScript standard, that can be further categorized as built in or user-defined.
* _Host_: defined by the host environment (for example, the browser environment, window and all the DOM objects)

### Prototype-based

JavaScript supports object-oriented programming with object prototypes instead of classes (see Prototype Inheritance).

#### No Classes Previous to ES6

You create a blank object when you need one and then start adding interesting members to it. You compose objects by adding primitives, functions or other objects to them as their properties, though every objects comes with a few built-in properties already.

#### Prototypes

JavaScript does have __inheritance__ that can be accomplished in various ways, which usually make use of prototypes.

A __prototype__ is an object, and every function you create automatically gets a prototype property that points to a new blank object, that is almost identical to an object created with an object literal or `Object()` constructor, except that its constructor property points to the function you create and not to the build-in `Object()`.

### Multi-Paradigm

JavaScript also supports functional programming, because functions are objects they may be stored in variables and passed around like any other object, and imperative styles.

### Dynamic

Dynamic is used to describe both client-side and server-side languages, and it refers to the ability to update the display of a web-page/app to how different things in different circumstances, generating new content as required. Server-side code dynamically generates new content on the server, e.g. pulling data from a database, whereas client-side JS dynamically generates new content inside the browser on the client, e.g. creating a new HTML table, filling it with data requested from the server, and displaying the table in a web page.

A web page/app with no dynamically updating content is referred to as Static, it shows the same content all the time.

## ECMAScript Historical

* ECMAScript 1 (1997)
* ECMAScript 2 (1998)
* ECMAScript 3 (1999)
* ECMAScript 4 (never released)
* ES5 - ECMAScript 5 (2009)
* ECMAScript 5.1 (2011)
* ES6 - EMCAScript 2015 (Promises, Biggest update, decided to do a release every new year)
* ECMAScript 2016
* ECMAScript 2017 (async/await)
* ECMAScript 2018

### ES6 (2015)

[Features: Overview & Comparison](http://es6-features.org/#Constants)

ES6 can't compile directly in browsers, so we need a compiler such as _babel_ from ES6 to ES5.

* __Constants__ `const`
* __Scoping__ (without hoisting)
    * Block-Scoped Variables: `let`
    * Block-Scoped Functions definitions
* __Arrow Functions__
    * Expression Bodies
    * Statement Bodies
    * Lexical `this` (__!__)
* __Extended Parameter Handling__
    * Default Parameter Values `function f (x=1)`
    * Rest Parameter `function f (x, y, ...a)`
    * Spread Operator `var other = [1, 2, ...params]`
* __Template Literals__
    * String interpolation and Raw String Access `${var}`
* __Extended Literals__
    * Binary & Octal Literal
    * Unicode String & RegExp Literal
* __Enchanced Regular Expressions__
    * Sticky Matching
* __Enhanced Object Properties__
    * Property Shorthand: `obj = { x, y }`
    * Computed Property Names
    * Method Properties: support for regular and generator functions notation in object property definitions
* __Destructing Assignment__
    * Array Matching
    * Object Matching
        * Shorthand
        * Deep Matching
    * Array and Object default values
    * Parameter Context Matching (Destructing Assignment
    * Fail-Soft Destructing
* __Modules__
    * Value Export/Import
    * Default & Wildcard
* __Classes__
    * Class Definition
    * Class Inheritance
    * Class From Expressions
    * Base Class Access
    * Static Members
    * Getter / Setter
* __Symbol Type__
    * Symbol Type (unique and immutable data type tob eused as an identifier for object properties)
    * Global Symbols
* __Iterators__
    * Iterator & For-Of Operator
* __Generators__
    * Generator Function, iterator Protocol
    * Generator Function, Direct Use
    * Generator Matching
    * Generator Control-FLow
    * Generator Methods
* __Data Structures__
    * Map / Sett
    * WeakMap / WeakSet
    * Typed Arrays
* __New Built-In Methods__
    * Object Property Assignment `Object.assign`
    * Array Element Finding `arr.find` `arr.findIndex`
    * String Repeating `str.repeat`
    * String Searching `str.startsWith` `str.endsWith` `str.includes`
    * Number Type Checking `.isNan()` `.isFinite()`
    * Number Safety Checking `.isSafeInteger()`
    * Number Comparison (Availability of a standard Epsilon value)
    * Number Truncation `Math.trunc`
    * Number Sign Determination `.sign`
* __Promises__
* __Meta-Programming__
    * Proxying
    * Reflection
* __Internationalization & Location__
    * Collation
    * Number Formatting
    * Currency Formatting
    * Date/Time Formatting

### ES7 (2016)

They decided to release a new version of ECMAScript every year starting in 2015. A yearly update means no more big releases like ES6.

* Array.prototype.includes()
* Exponentiation operator

### ES8 (2017)

* __Async Functions__
    * Async
    * Await
* __Shared memory and atomics__
    * Atomics
    * SharedArrayBuffer
    * [More info](https://2ality.com/2017/01/shared-array-buffer.html)
* Object.values
* Object.entries
* Object.getOwnPropertyDescriptors
* String padding
* Trailing commas in function parameters lists and calls

### ES9 (2018)

* [__Asynchronous Iteration__](https://2ality.com/2016/10/asynchronous-iteration.html)
* __Rest/Spread properties__
* __Promise.prototype.finally__
* Template literal revision
* RegExp features
    * [Named capture groups](https://2ality.com/2017/05/regexp-named-capture-groups.html)
    * [Unicode property escapes](https://2ality.com/2017/07/regexp-unicode-property-escapes.html)
    * [Lookbehind assertions](https://2ality.com/2017/05/regexp-lookbehind-assertions.html)
    * [s(dotAll) flag](https://2ality.com/2017/07/regexp-dotall-flag.html)

