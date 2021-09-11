# Promises

Essentially, a Promise is an object that represents an intermediate state of an operation.

> A promise that a result of some kind will be returned at some point in the future, without guarantee of exactly when the operation will be complete, but there is a guarantee that when the result is available, or the promise fails, the code you provide will be executed in order to do something else with a successful result, or to gracefully handle a failure case.

## Overview

Promises are a good way to build asynchronous applications when we don't know the return value of a function or how long it will take to return.

They make it easier to express and reason about sequences of asynchronous operations without deeply nested callbacks, and they support a style of error handling that is similar to the synchronous `try...catch` statement.

Most modern Web APIs and Runtime Environment's APIs are promise-based.

## Improvement to callback hell

Promises try to provide a more elegant way than callback hells:

```javascript
hooseToppings(function(toppings) {
  placeOrder(toppings, function(order) {
    collectOrder(order, function(pizza) {
      eatPizza(pizza);
    }, failureCallback);
  }, failureCallback);
}, failureCallback);
```

So we can instead end up with something like the following:

```javascript
chooseToppings()
.then(toppings => placeOrder(toppings))
.then(order => collectOrder(order))
.then(pizza => eatPizza(pizza))
.catch(failureCallback);
```

This is much better:

* Easier to see what is going on.
* We only need a single `.catch()` block to handle all the errors.
* It doesn't block the main thread.
* Each operation is guaranteed to wait for previous operations to complete before running.
    * We can chain multiple asynchronous actions.

## Promise terminology

1. When a promise is created, it is said to be __pending__.
2. When a promise returns, it is said to be __resolved__.
    1. Successfully resolved promise is said to be __fulfilled__. It returns a value, which can be accessed by chaining a `.then()` block onto the end of the promise chain.
    2. Unsuccessful resolved promise is said to be __rejected__. It returns a reason, an error message stating why the promise was rejected. This reason can be accessed by chaning a `.catch()` block onto the end of the promise chain.

## Building Promises

### Promise() constructor

Main situation in which you'll want to do this is when you've got code based on an old-school asynchronous API that is not promise-based, which you want to promis-ify.

```javascript
let timeoutPromise = new Promise((resolve, reject) => {
    setTimeout(function() {
        resolve('Success!');
    }, 2000);
});

timeoutPromise
    .then(message => alert(message))

// or even just
timeoutPromise.then(alert)
```

### Rejecting a custom promise

```javascript
function timeoutPromise(message, interval) {
    return new Promise((resolve, reject) => {
        if (message === '' || typeof message !== 'string') {
            reject('Message is empty or not a string');
        }
        else if (interval < 0 || typeof interval !== 'number') {
            reject('Interval is negative or not a number');
        }
        else {
            setTimeout(() => resolve(message), interval);
        }
    })
}

timeoutPromise('Hello There!', 1000)
    .then(message => alert(message))
    .catch(e => console.log(e))
```