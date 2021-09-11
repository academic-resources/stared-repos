# Buffers

## Why Buffers

Pure JS, does not handle straight binary data very well. This is fine on the browser, where most data is in the form of strings. However, Node.js servers have to also deal with TCP streams and reading and writing to the filesystem, both of which make it necessary to deal with purely binary streams of data.

## What are Buffers

`Buffer` class in Node.js is designed to handle raw binary data. Each buffer corresponds to some raw memory allocated outside V8.

Buffers act somewhat like arrays of integers, but aren't resizable and have a whole bunch of methods specifically for binary data.

The integers in a Buffer each represent a byte and so are limited to values from 0 to 255 inclusive. When using `console.log()` to print the `Buffer` instance, you'll get a chain of values in hexadecimal values.

## Where You Se Buffers.

In the wild, buffers are usually seen in the context of binary data coming from streams, such as `fs.createReadStream`.

## Ussage

### Creation

```js
var buffer = Buffer.alloc(8);
// This will print out 8 bytes of zero:
// <Buffer 00 00 00 00 00 00 00 00>

var buffer = Buffer.from([ 8, 6, 7, 5, 3, 0, 9]);
// This will print out 8 bytes of certain values:
// <Buffer 08 06 07 05 03 00 09>

var buffer = Buffer.from("I'm a string!", "utf-8");
// This will print out a chain of values in utf-8:
// <Buffer 49 27 6d 20 61 20 73 74 72 69 6e 67 21>
```

### Writting

```js
var buffer = Buffer.alloc(16)

buffer.write("Hello", "utf-8")
```
	