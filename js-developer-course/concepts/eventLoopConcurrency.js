/*
* JS has a concurrency model based on an EVENT LOOP,
* which is responsible for:
* + executing code
* + collecting and processing events
* + executing queued sub-tasks
*
* RUNTIME CONCEPTS
* This is a theoretical model, modern JS engines implement
* and heavily optimized described semantics.
*
* STACK
* Whenever a functions is called, a frame is created and pushed
* on top of the stack creating a LIFO queue (last one in is first to pop out).
* Each frame contains function's arguments and local variables (closure).
*
* HEAP
* Objects are allocated in a heap which is just a name to denote
* a large, mostly unstructured, region of memory.
*
* QUEUE
* Js runtime uses a message FIFO queue, which is a list of messages
* to be processed. Each message has an associated function which
* gets called in order to handle the message.
*
* At some point during the event loop, runtime starts handling messages
* on the queue, starting from the oldest one. Message is removed from the
* queue and its corresponding function is called with the message as an
* input parameter. As always, calling a function creates a new stack frame
* for that function's use.
*
* The processing of functions continues until the stack is once again empty.
* Then, the event loop will process next message in the queue (if there is one).
*
* EVENT LOOP
* Will wait synchronously for a message to arrive if one is not already
* available and waiting to be handled.
*
* RUN-TO-COMPLETION
* Each message is processed completely before any other message is processed.
* Whenever a function runs, it will run entirely before any other code.
* This differs from C, for instance, where if a function runs in a thread,
* it may be stopped at any point by the runtime system to run some other code
* in another thread.
*
* ADDING MESSAGES
* Messages are added anytime an event occurs and there is an event listener
* attached to it. If there is no listener, event is lost.
*
* NEVER BLOCKING
* Property of the event loop model, Javascript unlike a lot of other languages,
* never blocks.
* Handling I/O is typically performed via events and callbacks, so when the
* applications is waiting for an IndexedDB query to return or an XHR to return,
* it can still process other things like user input.
 */

// const s = new Date().getSeconds();
//
// setTimeout(function() {
// 	// prints out 2, meaning callback is not called immediately after 500 ms
// 	console.log('Ran after ' + (new Date().getSeconds() - s) + " seconds.");
// }, 500); // this is a minimum time
//
// while (true) {
// 	if (new Date().getSeconds() - s >= 2) {
// 		console.log("Good, looped for 2 seconds");
// 		break;
// 	}
// }

(function() {

	console.log('this is the start');

	setTimeout(function cb() {
		console.log('Callback 1: this is a msg from call back');
	}); // has a default time value of 0

	console.log('this is just a message');

	setTimeout(function cb1() {
		console.log('Callback 2: this is a msg from call back');
	}, 0);

	console.log('this is the end');

})();

/*
In this latest example, setTimeout with a minimum delay of 0 ms
doesn't execute the callback function after the given interval.
The execution depends on the number of waiting tasks in the queue.
Basically, setTimeout needs to wait for all code for queued messages to
complete even though you specified a particular time limit for it.
 */
