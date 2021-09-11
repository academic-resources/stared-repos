# Event Loop

Event loop is what allows Node.js to perform non-blocking I/O operations, by offloading operations to the system kernel whenever possible.

Since most modern kernels are multi-threaded, they can handle multiple operations executing in the background. When one of these operations completes, the kernel tells Node.js so that the appropriate callback may be added to the __poll__ queue to eventually be executed.

## Event Loop Explained

When Node.js starts, it initializes the event loop, processes the provided input script which may make async API calls, schedule timers or call `process.nextTick()`, then begins processing the event loop.

The following diagram shows a simplified overview of the event loop's order of operations.

```
   ┌───────────────────────────┐
┌─>│           timers          │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘
```

Each phase has a FIFO queue of callbacks to execute, generally, when the event loop enters a given phase, it will perform any operations specific to that phase, then execute callbacks in that phase's queue until the queue has been exhausted or the maximum number of callbacks has executed, moving to the next phase and so on.

Between each run of the event loop, Node.js checks if it is waiting for any asynchronous I/O or timers and shuts down cleanly if there are not any.

## Phases Overview

### Timers

> Executes callbacks scheduled by `setTimeout()` and `setInterval()`.

A timer specifies the __treshold__ after which a provided callback may be executed rather than the __exact__ time a person wants it to be executed.

Timers callbacks will run as early as they can be scheduled after the specified amount of time has passed, however, OS scheduling or the running of other callbacks may delay them.

_Technically, poll phase controls when timers are executed_.

### Pending callbacks

> Executes I/O callbacks deferred to the next loop iteration.

This executes callbacks for some system operations such as types of TCP errors. For example, if a TCP socket receives `ECONNREFUSED` when attempting to connect, some nix systems want to wait to report the error. This will be queued to execute in this phase.

### Idle, Prepare

> Only used internally.

### Poll

> Retrieve new I/O events, execute I/O related callbacks (almost all with the exception of close callbacks, the ones scheduled by timmers, and `setImmediate()`).

This phase has two main functions:

1. Calculating how long it should block and poll for I/O
2. Processing events in the __poll__ queue

When the event loop enteres the poll phase and _there are no timers scheduled_ one of two things will happen:

* If the poll __queue is not empty__, the event loop will iterate through its queue of callbacks executing them synchronously until either the queue has been exhausted, or the system-dependent hard limit is reached.

* If the poll __queue is empty__, one of two more things will happen:
	
	* If scripts have been scheduled by `setImmediate()`, event loop will end the Poll phase and continue to Check phase.

	* If scripts have not been scheduled by `setImmediate()`, the event loop will wait for callbacks to be added to the queue, then execute them immediately.

Once the poll queue is empty, __the event loop will check for timers whose time tresholds have been reached__. If one or more timers are ready, event loop will wrap back to the Timers phase to execute those timers' callbacks.

### Check

> `setImmediate()` callbacks are invoked here

This phase allows a person to execute callbacks immediately after the Poll phase has completed. If the poll phase becomes idle and scripts have been queued with `setIMmediate()`, the event loop may continue to the Check phase rather than waiting.

`setImmediate()` is actually a special timer that runs in a separate phase of the event loop. It uses a __libuv API__ that schedules callbacks to execute after the poll phase has completed.

Generally, as the code is executed, Event Loop will eventually hit the Poll phase where it will wait for an incoming connection, request, etc. However, if a callback has been scheduled with `setImmedaite()` and the Poll phase becomes idle, it will end and continue to the Check phase rather than waiting for poll events.

### Close Callbacks

> Some close callbacks, e.g. `socket.on('close', ...)`.

If a socket or handle is closed abruptly (e.g. `socket.destroy()`), the `'close'` event will be emitted in this phase. Otherwise, it will be emitted via `process.nextTick()`.

## `setImmediate` vs `setTimeout`

* `setImmediate` is designed to execute a script once the current Poll phase completes.
* `setTimeout` schedules a script to be run after a minimum treshold in ms has elapsed.

If you move two calls within an I/O cycle, the immediate callback is always executed first, independently of how many timers are present.


## `process.nextTick()`

It is not technically part of the Event Loop. Instead, the `nextTickQueue` will be processed after the current operation is completed, regardless of the current phase of the event loop. Here, an _operation_ is defined as a transition from the underlying C/C++ handler, and handling the JavaScript that needs to be executed.

Any time you call `process.nextTick()` in a given phase, all callbacks passed to `process.nextTick()` will be resolved before the Event Loop continues. This can create some bad situations because __it allows you to 'starve' your I/O by making recursive `process.nextTick()` calls__, which prevents the Event Loop from reaching the Poll phase.

### Why would that be allowed?

Part of it is a design philosohpy where an API should always be asynchronous even where it doesn't have to be.

```js
function apiCall(arg, callback) {
  if (typeof arg !== 'string')
    return process.nextTick(callback,
                            new TypeError('argument should be string'));
}
```

What we're doing is passing an error back to the user but only _after_ we have allowed the rest of the user's code to execute.

This way, we guarantee that `apiCall()` always runs its callback after the rest of the user's code and before the event loop is allowed to proceed.

To achieve this, the JS call stack is allowed to unwind then immediately execute the provided callback which allows a person to make recursive calls to `process.nextTick()` without reaching `Range Error: Maximum call stack size exceeded from v8`.

This philosohpy can lead to some potentially problematic situations.

```js
let bar;

// this has an asynchronous signature, but calls callback synchronously
function someAsyncApiCall(callback) { callback(); }

// the callback is called before `someAsyncApiCall` completes.
someAsyncApiCall(() => {
  // since someAsyncApiCall hasn't completed, bar hasn't been assigned any value
  console.log('bar', bar); // undefined
});

bar = 1;
```

### Why use `process.nextTick()`

1. Allow users to handle errors, cleanup any then uneeded resources, or perhaps try the request again before the event loop continues.
2. At times it's necessary to allow a callback to run after the call stack has unwound but before the event loop continues.

For example, running a function constructor that was to, say, inherit from `EventEmitter` and it wanted to call an event within the constructor.

```js
const EventEmitter = require('events');
const util = require('util');

function MyEmitter() {
  EventEmitter.call(this);
  this.emit('event');
}
util.inherits(MyEmitter, EventEmitter);

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('an event occurred!');
});
```

You can't emit an event from the constructor immediately because the script will not have processed to the point where the user assigns a callback to that event. So, within the constructor itself, you can use `process.nextTick()` to set a callback to emit the event after the constructor has finished, which provides the expected results:

```js
const EventEmitter = require('events');
const util = require('util');

function MyEmitter() {
  EventEmitter.call(this);

  // use nextTick to emit the event once a handler is assigned
  process.nextTick(() => {
    this.emit('event');
  });
}
util.inherits(MyEmitter, EventEmitter);

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('an event occurred!');
});
```

## `process.nextTick()` vs `setImmediate()`.

* `process.nextTick` fires immediately on the smae phase
* `setImmediate` fires on the following iteration or 'tick' of the event loop.
