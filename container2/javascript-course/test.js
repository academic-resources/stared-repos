const EventEmitter = require('events')

class myEventEmitter extends EventEmitter {}

const emitter = new myEventEmitter()

emitter.on('event', (a, b) => {
	console.log(a, b, this);
	// Prints: a b {}
  });
emitter.emit('event', 'a', 'b');