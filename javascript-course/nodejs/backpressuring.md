# Backpressuring in Streams

Buildup of data behind a buffer during data transfer.

When the receiving end of the transfer has complex operations, or is slower for whatever reason, there is a tendency for data from the incoming source to accumulate, like a clog.

To solve this problem, there must be a delegation system in place to ensure a smooth flow of data from one source to another.

## Too Much Data, Too Quickly

There are instances where a `Readable` stream might give data to the `Writable` much too quickly.

When that occurs, the consumer will begin to queue all the chunks of data for later consumption, and more data must be kept in memory until the entire process has completed.

Writing to a disk is a lot slower than reading from a disk, thus, when we are trying to compress a file and write it to our hard disk, backpressure will occur because the write disk will not be able to keep up with the speed from the read.

If a backpressure system was not present, the process would use up your system's memory, effectively slowing down other processes, and monopolizing a large part of your system until completion.

* Slowing down al other current processes
* Very overworked garbage collector
* Memory exhaustion

## Backpressure

Different functions to transfer data from one process to anothrer.

In Node.js, there is an internal built-in function called `.pipe()`, and other packages out there too.

Ultimately though, at the basic level of this process, we have two separate components, the _source_ of the data and the _consumer_.

When `.pipe()` is called from the source, it signals the consumer that there is data to be transferred. The pipe function helps to set up the appropriate backpressure closures for the event triggers.

In Node.js the source is `Readable` stream and the consumer is the `Writable` stream. The moment that backpressure is triggered can be narrowed exactly to the return value of a `Writable`'s `.write()` function.

In any scenarioo where the data buffer has exceeded the `highWaterMark` or the write queue is currently busy, `.write()` will return `false`, and the backpressure system kicks in, pausing the incoming `Readable` stream from sending any data and wait until the consumer is ready again. Once the data buffer is emptied, a `drain` event will be emitted and resume the incoming data flow.

__Node.js does all of this automatically for you__.
