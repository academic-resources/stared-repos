/*
The `Promise` object represents the eventual completion (or failure) of an
asynchronous operating, and its resulting value.

A Promise is a proxy for a value not necessarily known when the promise
is created. It allows you to associate handlers with an asynchronous
action's eventual success value or failure reason. This lets asynchronous
methods return values like synchronous methods, instead of immediately
returning the final value, asynchronous method returns a promise to supply
the value at some point in the feature.

A Promise is in one of these states:
- pending: initial state
- fulfilled: completed successfully (value)
- rejected: operation failed (error)

When either of these options happens, the associated handlers queued up
by a promise's then method are called. If the promise has already been
fulfilled or rejected when a corresponding handler is attached, the handler
will be called, so there is no race condition between an asynchronous operation
completing and its handlers being attached.

As the `Promise.prototype.then()` and `Promise.prototype.catch()` methods
return promises, they can be chained.
 */

/*
SYNTAX

new Promise(executor);

+ executor
A function that is passed with `resolve` and `reject` arguments.
The executor function is executed immediately by the Promise
implementation, passing resolve and reject functions (even before
the Promise constructor returns the created object).

The resolve and reject functions, when called, resolve or reject
the promise respectively. The executor normally initiates some
asynchronous work, and then, once that completes, either calls
resolve or reject. If an error is thrown in the executor function,
the promise is rejected. Return value of the executor is ignored.
 */

/*
+ Promise.all(iterable)
Wait for all promises to be resolved or for any to be rejected.
If returned promise resolves, it is resolved with an aggregating array
of the values from the resolved promises, in the same order as defined
in the iterable.
If it reject, it is rejected with the reason from the first promise
that was rejected.

+ Promise.allSettled(iterable)
Wait until all promises have settled (each may resolve or reject).
Returns a promise that resolves after all of the given promises have
been settled, with an array of objects that each describe the
outcome of each promise.

+ Promise.race(iterable)
Wait until any of the promises is resolved or rejected.
If resolves, it is resolved with the value of the first promise that resolved.
If rejects, it is rejected with the reason from the first promise that was rejected.

+ Promise.reject(reason)
Returns a new Promise object that is rejected with the given reason

+ Promise.resolve(value)
Returns a new Promise object that is resolved with the given value.
If value is a thenable (i.e. has a then method), the returned promise
will "follow" that thenable, adopting its eventual state. Otherwise,
the returned promise will be fulfilled with the fvalue.
 */

/*
PROTOTYPE

+ catch()
appends a rejection handler callback to the promise, and returns a new
promise resolving to the return value of the callback if its called

+ then()
appends fulfillment and rejection handler to the promise, and returns a new
promise resolving to the return value of the called handler

+ finally()
appends a handler to the promise, and returns a new promise which is resolved
when the original promise is resolved.
 */
