# Streams

Abstract interface for working with streaming data in Node.js. Streams can be redeabla, wirtable, or both.

All streams are instances of `EventEmitter`.

## Types

* __Writable__: streams to which data can be written (e.g, `fs.createWriteStream()`)
* __Readabla__: streams from which data can be read (e.g, `fs.createReadStream()`)
* __Duplex__: streams that are bot _Readabla_ and _Writable_ (e.g, `net.Socket`)
* __Transform__: _Duplex_ streams that can modify or transform the data as it is written and read (e.g, `zlib.createDeflate()`)

### Object Mode

All streams created by Node.js APIs operate exclusively on strings and `Buffer` (or `Uint8Array`) objects. It is possible, however, for stream implementations to work with other types of JavaScript values (with the exception of `null`). Such streams are considered to operate in '_Object Mode'_.

Stream instances are switched into object mode using the `objectMode` option when the stream is created.

### Buffering

Both _Writable_ and _Readable_ streams will store data in an internal buffer that can be retrieved using `writable.writableBuffer` or `readable.readableBuffer`, respectively.

## Writable Streams

* HTTP requests, on the client
* HTTP responses, on the server
* fs write streams
* zlib streams
* cypto streams
* TCP sockets
* child process stdin
* process.stdout, process.stderr

Some of those, are actually _Duplex_ streams that implement the _Writable_ interface.

## Readable Streams

* HTTP responses, on the client
* HTTP requests, on the server
* fs read streams
* zlib streams
* crypto streams
* TCP sockets
* child process stdout and stderr
* process.stdin
