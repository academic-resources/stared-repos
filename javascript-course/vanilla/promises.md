# Promises

The `Promise` object represents the eventual completion (or failure) of an asynchronous operation, and its resulting value.

## Description

A `Promise` is a proxy for a value not necessarily known when the promise is created. It allows you to associate handlers with an asynchronous action's eventual success value or failure reason.

> Essentially, a promise is a returned object to which you attach callbacks, instead of passing callbacks into a function.

This lets asynchronous methods return values like synchronous methods: instead of immediately returning the final value, the asynchronous method returns a _Promise_ to supply the value at some point in the feature.

## States

A `Promise` is in one of these states:

* pending
* fulfilled
* rejected

When either its fulfilled or rejected, associated handlers queued up by a promise's then method are called. If promise has already been fulfilled or rejected when a corresponding handler is attached, the handler will be called, so there is no race condition between an asynchronous operation completing and its handlers being attached.

As `Promise.prototype.then()`, `Promise.prototype.catch()` and `Promise.prototype.finally()` methods return promises, they can be chained.

An action can be assigned to an already "settled" promise. In that case the action (if appropriate) will be performed at the first asynchronous opportunity. Note that promises are guaranteed to be asynchronous. Therefore, an action for an already "settled" promise will occur only after the stack has cleared and a clock-tick has passed. The effect is much like that of setTimeout(action,10).

```js
const promiseA = new Promise( (resolutionFunc,rejectionFunc) => {
    resolutionFunc(777);
});
// At this point, "promiseA" is already settled.
promiseA.then( (val) => console.log("asynchronous logging has val:",val) );
console.log("immediate logging");

// produces output in this order:
// immediate logging
// asynchronous logging has val: 777
```

## Error Handling

Handling a rejected promise too early has consequences further down the promise chain. Sometimes there is no choice, because an error must be handled immediately.

On the other hand, in the absence of an immediate need, it is simpler to leave out error handling until a final `.catch()` statement.

The termination condition of functions determines the "settled" state of the next promise in the chain. Any termination other than a throw creates a "resolved" state, while terminating with a throw creates a "rejected" state.

