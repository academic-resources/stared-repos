# Async - Await

Async functions and the `await` keyword, are part of the so-called ECMAScript 2017 (ES6).

These featuers basically act as __syntactic sugar on top of promises__, making asynchronous code easier to write and to read afterwards. They make async code look more like old-school synchronous code.

## `async` keyword

`async` keyword, which you put in front of a function declaration to turn it into an async function, which is a function that knows how to expect the possibility of the `await` keyword being used to invoke asynchronous code.

```javascript
async function hello() { return 'Hello' };
hello()

// alternative
let hello = async function() { return 'Hello' };
let hello = async () => 'Hello'
```

Invoking `hello()` now returns a promise. And you can actually consume the value returned when the promise fulfills.

```javascript
hello().then(console.log)
// Hello
```

## `await` keyword

`await` only works inside async function. This can be put in front of any async promise-based function to pause your code on that line until the promise fulfills, then return the resulting value. __In the meantime, other code that may be waiting for a chance to execute gets to do so__.

```javascript
// Trivial example
async function hello() {
  const greeting = await Promise.resolve("Hello");
  return greeting;
};

hello().then(console.log);
// Hello
```

## Error handling

You can use synchronous `try...catch` structure with `async`/`await`.

```javascript
async function myFetch() {
  try {
    let response = await fetch('coffee.jpg');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      let myBlob = await response.blob();
      let objectURL = URL.createObjectURL(myBlob);
      let image = document.createElement('img');
      image.src = objectURL;
      document.body.appendChild(image);
    }
  } catch(e) {
    console.log(e);
  }
}

myFetch();
```

But you can also attach `.then()` and `.catch()` blocks instead of using the `try...catch` block. The `catch()` block will catch errors occurring in both the async function call and the promise chain.

## Awaiting a `Promise.all()`

`async`/`await` is built on top of promises, so it's compatible with all the features offered by promises. This includes `Promise.all()`, you can happily await a `Promise.all()` call to get all the results returned into a variable in away that looks like simple sycnhronous code.

## The downsides of async/await.

Makes code look synchronous, and in a way it makes it behave more synchronously, and in a way it makes it behave more synchronously. The `await` keyword __blocks execution of all the code that follows until the promise fulfills__, exactly as it would with a synchronous operation. It does __allow other tasks to continue to run in the meantime, but your own code is blocked__.

Each `await` will wait for the previous one to finish, whereas actually what you want is for the promises to begin processing simultaneously, like they would do if we weren't using async/await.

There is a pattern that can mitigate this problem, setting off all the promise processes by storing the `Promise` object in variables, and then awaiting them all afterwards.

```javascript
function timeoutPromise(interval) {
  return new Promise((resolve, reject) => {
    setTimeout(function(){
      resolve("done");
    }, interval);
  });
};

async function timeTest() {
  await timeoutPromise(3000);
  await timeoutPromise(3000);
  await timeoutPromise(3000);
}

let startTime = Date.now();
timeTest().then(() => {
  let finishTime = Date.now();
  let timeTaken = finishTime - startTime;
  console.log("Time taken in milliseconds: " + timeTaken);
});

// ~ 9000
```

Here we simply await all three `timeoutPromise()` calls directly, making each one process for 3 seconds. Each subsequent one is forced to wait until the last one finished, waiting for a total runtime of around 9 seconds.

An alternative is __storing the tree Promise objects in variables__, which has the effect of __setting off their associated processes all running simultaneously__.

```javascript
async function timeTest() {
  const timeoutPromise1 = timeoutPromise(3000);
  const timeoutPromise2 = timeoutPromise(3000);
  const timeoutPromise3 = timeoutPromise(3000);

  await timeoutPromise1;
  await timeoutPromise2;
  await timeoutPromise3;
}

let startTime = Date.now();
timeTest().then(() => {
  let finishTime = Date.now();
  let timeTaken = finishTime - startTime;
  console.log("Time taken in milliseconds: " + timeTaken);
});

// ~ 3000
```

Next, we await the results, and because the promises all started processing at essentially the same time, the promises will all fulfill at the same time, waiting for a total run time of around 3 seconds.

You can get similar results with `Promise.all()`.

```javascript
async function timeTest() {
	const res = await Promise.all([
		timeoutPromise(3000),
		timeoutPromise(3000),
		timeoutPromise(3000)
	]);
	return res
}
```
