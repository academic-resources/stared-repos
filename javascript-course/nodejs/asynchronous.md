# Asynchronous

Normally, a given program's code runs sequentially, with only one thing happening at once. If a function relies on the result of another function, it has to wait for the other function to finish and return, and until that happens, the entire program is essentially stopped from the perspective of the user.

This isn't a good use of computer processing power, especially when computers have multiple processor cores available. There's no sense sitting there waiting for something when you could let the other task run along on other processor core and let you know when it's done, which is the basis of __asynchronous programming__. It is up to the programming environment you are using to provide you with APIs that allow you to run such tasks asynchronously.

## Blocking example

```javascript
function expensiveOperation() {
  for(let i = 0; i < 1000000; i++) {
    ctx.fillStyle = 'rgba(0,0,255, 0.2)';
    ctx.beginPath();
    ctx.arc(random(0, canvas.width), random(0, canvas.height), 10, degToRad(0), degToRad(360), false);
    ctx.fill()
  }
}

fillBtn.addEventListener('click', expensiveOperation);

alertBtn.addEventListener('click', () =>
  alert('You clicked me!')
);
```

If you try to click `fillBtn` and then quickly click `alertBtn`, you'll see that the alert does not appear until the circles have finished being rendered.

This is because JS, generally speaking is __single-threaded__.

## Threads

A __thread__ is basically a single process that a program can use to complete tasks. Each thread can only do a single task at once.

## Web Workers

Web workers allow you to send some of the JS processing off to a separate thread, called a worker, but they have their limitations.

A major one is that they are not able to access the DOM. The second problem is that altough code is not blocking, it is still basically synchronous, and it becomes a problem when a function relies on the results of multiple previous processes to a function.

For example, if Task A is doing something like fetching an image from the server, and Task B then does something to the image like applying a filter to it, if you start task A and immediately try to run task B, you'll get an error, because the image won't be available yet.

## Promises

To fix this Web Workers problems, features like Promises allow you to set an operation running (e.g. the fetching of an image from the server) and then wait until the result has returned before running another operation.

```
Main thread: Task A                   Task B
    Promise:      |__async operation__|
```

Since the operation is happening somewhere else, the __main thread is not blocked__ while the async operation is being processed.

## Asynchronous JS

There's two main types:

* Old-style callbacks
* Newer promise-style (async/await syntax sugar)

When you fetch an image from a server, you can't return the result immediately. That means that the following code wouldn't work:

```javascirpt
let response = fetch('myImage.png');
let blob = response.blob();
// display your image blob in the UI somehow
```

This is because you don't know how long the image will take to download, so when you come to run the second line, it will throw an error (ossible intermittently, possible every time) because the `response` is not yet available. Instead, you need your code to wait until the `response` is returned before it tries to do anything else to it.

### Async callbacks

Functions that are specified as arguments when calling a function which will start executing code in the background. When the background code finishes running, it calls the callback function to let you know the work is done, or let you know that something of interest has happened.

An example, is the second parameter of the `addEventListener()` function.

When we pass a callback function as an argument to another function, we are only passing the function's reference as an argument. The callback function is __not__ executed immediately. It is "_called back_" (hence the name) asynchronously somewhere inside the containing function's body. The containing function is responsible for executing the callback function when the time comfes.

Let's look at an example that loads a resource via the `XMLHttpRequest` API:

```javascript
function loadAsset(url, type, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.responseType = type;

  xhr.onload = function() {
    callback(xhr.response);
  };

  xhr.send();
}

function displayImage(blob) {
  let objectURL = URL.createObjectURL(blob);

  let image = document.createElement('img');
  image.src = objectURL;
  document.body.appendChild(image);
}

loadAsset('coffee.jpg', 'blob', displayImage);
```

### Promises

New style of async code. A good example is the `fetch()` API, which is basically a modern version of `XMLHttpRequest`.

```javascript
fetch('products.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        products = json;
        initialize();
    })
    .catch(function(err) {
        console.log('Fetch problem: ' + err.message);
    });
```

Here we see `fetch()` taking a single parameter, the URL of a resource you want to fetch from the network, and __returning a promise__.

The promise is an __object representing the completion or failure of the async operation__.

In escence, it's a way of saying _'I promise to get back to you with the answer as soon as I can'_.

Two `then()` blocks. Both containing a callback function that will run if the previous operation is successful, and each callback receives as input the result of the previous successful operation. Each `.then()` block returns another promise, meaning that you can chain multiple `.then()` blocks, so multiple asynchronous operations can be made to run in order, one after another.

The `catch()` block at the end runs if any of the `.then()` blocks fail, an error objet is made available inside it. Note however than synchronous `try...catch` won't work with promises, altough it will work with `async/await`.

### Promises vs Callbacks

* Promises are essentially a returned objet to which you can attach callback functions, rather than having to pass callbacks into a function.
* You can chain multiple async operations using multiple `.then()` operations, which is much harder to do with callbacks, which often ends up with a messy __pyramid of doom__ also known as __callback hell__.
* Promise callbacks are always called in the strict order they are placed in the event queue.
* Error handling is much better (by single `.catch()` rather than individually handled in each level of the _'pyramid'_).
* Promises avoid inversion of control, unlike old-style callbacks, hich lose full control of how the function will be executed when passing a callback to a third-party library.

## Event Queue

Async operations like promises are put into an __Event Queue__, which runs after the main thread has finished processing so that they __do not block__ subsequent JS code from running.

## Nature of Async Code

```javascript
console.log ('Starting');
let image;

fetch('coffee.jpg')
    .then((response) => {
         console.log('It worked :)')
         return response.blob();
    })
    .then((myBlob) => {
        let objectURL = URL.createObjectURL(myBlob);
        image = document.createElement('img');
        image.src = objectURL;
        document.body.appendChild(image);
    })
    .catch((error) => {
        console.log('There has been a problem with your fetch operation: ' + error.message);
    });

console.log ('All done!');

// Starting
// All done
// It worked :) OR There has been ap roblem with your fetch operation
```

## Timeouts and Intervals

JS has available methods for running code asynchronously after a set time period has elapsed, or at a regular interval.

* `setTimeout()`
* `setInterval()`
