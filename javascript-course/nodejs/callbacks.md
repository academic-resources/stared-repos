# Callbacks

Node.js, being an asynchronous platform, doesn't wait around for things like file I/O to finish, Node.js uses callbacks. A callback is a function called at the completion of a given task, this prevents any blocking, and allows other code to be run in the meantime.

```js
function processData (callback) {
  fetchData(function (err, data) {
    if (err) {
      console.log("An error has occurred. Abort everything!");
      return callback(err);
    }
    data += 1;
    callback(data);
  });
}
```

Callbacks are the foundation of Node.js, as they give you an interface with which to say _"and when you're done doing that, do all this"_. This allows you to have as many IO operations as your OS can handle happening at the same time.

## Error first, callback convention

* Callback is last argument of functions
* If error, invoke callback with error as first argument
* If not error, invoke callback with first argument as null

```js
function asyncOperation ( a, b, c, callback ) {
  // ... lots of hard work ...
  if ( /* an error occurs */ ) {
    return callback(new Error("An error has occurred"));
  }
  // ... more work ...
  callback(null, d, e, f);
}

asyncOperation ( params.., function ( err, returnValues.. ) {
  //This code gets run after the async operation gets run
});
```

## Examples

### After processing, do something

```js
function asyncCallback (callback) {
	console.log('Start processing...')	

	const delta = new Date()
	delta.setSeconds(delta.getSeconds() + 2)

	while (delta > new Date()) {
		// wait
	}

	console.log('Finish processing')

	callback()
}

function cb () { console.log('After processing callback') }

asyncCallback(cb)
```

```
// Output:
Start processing...
Finish processing
After processing callback
```

### Asynchronous processing

