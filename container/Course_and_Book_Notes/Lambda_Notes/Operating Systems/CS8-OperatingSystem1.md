## Operating Systems:

- interface with hardware so that the rest of your computer can access the hardware through the abstraction that the OS provides.
- handles scheduling and processes/process abstraction
- memory management
- etc...

## Scheduling:

What is the ordering/prioritizing on what processes get execution time on a CPU

Network card on your machine is what sends off the data packets:

- Writing code that interfaces with the abstraction the OS provides for the network card

## Web Servers:

- Working with the primary abstraction the OS provides to interface with the network card/hardware (socket)

Should be able to:

- open up a terminal
- curl to your server once you start it
- open up a browser that will access that port and make a request to your server from the browser and get the response back from the server when it's running

## Network Protocols:

- Stack of layers: - Ethernet (layer that sits right above the networking hardware) - IP header that implements the internet protocol - The TCP header that deals with data integrity and ensures the data is in a certain format that can be sent - HTTP (deals with the web data) - Body (what gets served up)
  (Don't need to memorize that.)

### Protocols:

#### UDP:

- Faster than TCP.
- Doesn't do the verification (doesn't care that the data is sent, doesn't wait before sending the next piece of data)
- Streaming video/multiplayer gaming are some use cases
- When you're doing multiplayer gaming, there's no time for that verification step and if a little bit gets lost, it's not a big deal

#### TCP:

- Verifies (when you use TCP Protocol to send data, the sender will wait for a response from the recipient back to acknowledge they received the data )
- Data integrity
- Whenever you make a request from your browser, it goes through the TCP protocols

Can you do the error checking client-side?

- If you were to do that with the protocol, the server would have to take more time out of its flow to resend the data - that would hurt the performance aspect of it.
- With UDP, if some data gets lost, we just don't care

File transfers would use TCP, not UDP because it's sent in one chunk.

If you care about getting the whole file versus dropping bits, I'm curious if client side checking plus UDP would be an improvement over TCP:
Not sure if UDP can accomodate verification, so you'd have to finagle that so it would be able to receive a response.

#### IP Layer:

- What deals with the routing
- Deals with the actual routing and the protocol that knows how to take your data that you want to send to an address and get it there through the network that is the internet

#### Ethernet protocol:

- Sits on top of network card and interfaces with the hardware

In order to work with this networking in code, need abstraction of socket.

### Similar to when we did piping:

- With piping, we created read and write ends of a pipe and we wrote data to one end and it came out the other end.
- In many ways, that's similar to a socket, it's just that sockets have additional overhead on top of pipes because they have to deal with the protocol stuff, so they're more optimized for working with that in particular.

### In Mac and Linux:

- Socket API, which is is baked into your C runtime supports UDP and TCP as well as IPv4 and IPv6 internet protocols.
- Sockets provide additional functionality in order to make better sense of that
- For the most part, very similar to pipes

Server will receive requests

- Request is of a given format (HTTP header)
- Server needs to figure out what endpoint the user is trying to access and send the appropriate response in resposne to that request
- Need to adhere to format closely because otherwise the browser won't be able to process it
- Content length is the amount of bytes in HTML response
- Content type is going to be html/text

### Endpoints on server:

/ - root - <h1>Hello, World</h1>
/d20 - returns a random number between 1 and 20 inclusive as text/plain data.
/date - prints the current date and time in GMT as text/plain data

More an exercise in reading a bunch of code than implementing a bunch of code

- Practice being dropped into a codebase where there's already a bunch of stuff in place and having to change the software without breaking anything else
- Biggest C codebase you've worked with unless you worked in C outside Lambda
- Most C code you'll have seen in one file
- Most of the networking stack has been implemented for you
- What you'll be doing will be parsing the responses and sending out the appropriate responses in turn
- The stuff that has to do with receiving the responses and sending them back out has pretty much already been implemented

### Most important thing:

- Read as much as you can, both the code and the comments, and try to make enough sense of it that you know what you need to implment, how to do it, and where it should go (IMPLEMENT ME)
- On an actual job, you won't have those IMPLEMENT ME comments, nor would the empty code declarations, and the code wouldn't be nearly as commented (unless you're really lucky)
- Lean on comments (i.e., "This is only necessary if we've implemented a multiprocessed version using fork()" - only need for stretch goal)
