# Event Emitters

The core of Node.js is Event-Driven programming, which we can achieve with the `EventEmitter` class.

## Events & Emitters

Much of the Node.js core API is built around an indiomatic _Asynchronous Event-Driven Architecture_, in which certain kinds of objects (called '_emmiters_') emit named events that cause `Function` objects ('_listeners_' to be called).

For instance, a `net.Server` object emits an event each time a peer connects to it, a `fs.ReadStream` emits an event when the file is opened, a `stream` emits an event whenever data is available to read.

All objects that emit events are instances of `EventEmitter` class. These objects expose an `eventEmitter.on()` function that allows one or more functions to be attached to named events emitted by the objects.

When the `EventEmitter` object emits an event, all of the functions attached to that specific event are called _synchronously_. Any values returned by the called listeners are _ignored_ and will be discarded.

### Example

```javascript
const EventEmitter = require('events')

class myEventEmitter extends EventEmitter {}

const emitter = new myEventEmitter()
emitter.on('event', () => console.log('Event ocurred!'))
emitter.emit('event')

// Event occured!
```

### Passing arguments to listeners

```javascript
const EventEmitter = require('events')

class myEventEmitter extends EventEmitter {}

const emitter = new myEventEmitter()

emitter.on('event', function(a, b) {
	console.log(a, b, this, this === emitter);
	// Prints:
	//   a b MyEventEmitter {
	//     _events: { event: [Function] },
	//     _eventsCount: 1,
	//     _maxListeners: undefined
	//	} true
  });
emitter.emit('event', 'a', 'b');
```

It is possible to use ES6 Arrow functions, however, when doing so, the `this` keyword will no longer refernce the `EventEmitter` instance.

```javascript
const EventEmitter = require('events')

class myEventEmitter extends EventEmitter {}

const emitter = new myEventEmitter()

emitter.on('event', (a, b) => {
	console.log(a, b, this);
	// Prints: a b {}
  });
emitter.emit('event', 'a', 'b');
```

## Async vs Sync

The `EventEmitter` calls all listeners synchronously in the order in which they were registered. This helps havoid race conditions and logic errors.

When appropriate, listener functions can switch to an asynchronous mode of operation using `setImmediate()` or `process.nextTick()` methods.

```javascript
const myEmitter = new MyEmitter();
myEmitter.on('event', (a, b) => {
  setImmediate(() => {
    console.log('this happens asynchronously');
  });
});
myEmitter.emit('event', 'a', 'b');
```

## Handling events only once

```javascript
const myEmitter = new MyEmitter();
let m = 0;
myEmitter.once('event', () => {
  console.log(++m);
});
myEmitter.emit('event');
// Prints: 1
myEmitter.emit('event');
// Ignored
```

## Error Events

The typical action is for an `'error'` event to be emitted. If an `EventEmitter` _does not_ have at least one listener registered for the `'error'` event, and an `'error'` event is emitted, the error __is thrown__, a stack trace is printed, and the Node.js process exits.

```javascript
const myEmitter = new MyEmitter();
myEmitter.emit('error', new Error('whoops!'));
// Throws and crashes Node.js
```

## Capture rejections of promises

Using `async` functions with event handlers is problematic, because it can lead to unhandled rejections in case of a thrown exception:

```javascript
const ee = new EventEmitter();
ee.on('something', async (value) => {
  throw new Error('kaboom');
});
```

## NodeJS Internally

NodeJs internally uses event emitters widely across its environment, for example streams.

Streams extend event emitters.

```js
import { createReadStream } from "fs";

let chunkIndex = 0;
const readStream = createReadStream("./data.txt");

readStream.on("open", () => {
    console.log("Started Reading...");
});

readStream.on("end", () => {
    console.log("Completed Reading...");
});

readStream.on("data", chunk => {
    console.log("Chunk: " + ++chunkIndex);
    console.log("-----------------------------------------");
    console.log(chunk);
    console.log("\n");
});
```

When executed, you'd get code like the following:

```text
Started Reading...Chunk: 1
----------------------------------------------------------
<Buffer 4c 6f 72 65 6d 20 69 70 73 75 6d 20 64 6f 6c 6f 72 20 73 69 74 20 61 6d 65 74 2c 20 63 6f 6e 73 65 63 74 65 74 75 72 20 61 64 69 70 69 73 63 69 6e 67 ... >Chunk: 2
----------------------------------------------------------
<Buffer 74 20 6e 75 6e 63 20 76 69 74 61 65 20 66 65 72 6d 65 6e 74 75 6d 2e 20 49 6e 20 75 74 20 61 72 63 75 20 74 65 6d 70 6f 72 2c 20 66 61 75 63 69 62 75 ... >Chunk: 3
----------------------------------------------------------
<Buffer 20 76 69 74 61 65 2c 20 65 67 65 73 74 61 73 20 69 64 20 73 65 6d 2e 20 44 6f 6e 65 63 20 75 74 20 75 6c 74 72 69 63 69 65 73 20 6c 6f 72 65 6d 2c 20 ... >Completed Reading...
```

Nodejs internally extends `EventEmitter`, exposes custom predefined events (`data`, `open`, `end`), and emits events automatically when required.
