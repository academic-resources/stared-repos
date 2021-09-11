## What is DevOps/Deployment?

DevOps and Deployment is almost a subfield of computer science.

## Deployment

Taking your code that you have written in some environment for some purpose and making it available for others to use.

- Usually means deploying to the web
- Could also mean deploying firmware code that you have written to a piece of hardware that can run that code and no other hardware can use it.
- Could refer to internally deploying a toolset or library to the rest of your team so they can make it available in their own work.

###### Deployment is always taking something you've written that is private and local to your computer and deploying it to others so that they can use it.

##### Worst case of deployment:

- Take the work you've made, put it on the floppy disk, and give it to someone and they can use it.
  Flaws:
- Person receiving the disk can't reproduce it themselves
  - if it goes wrong, if it wasn't what they thought it was or wasn't what you thought it was, rebuilding the disk is a great labor

Goal in deployment:

- Make it automated such that when you create a new piece of code that you think another person can use, they can use it.

## DevOps:

Deploying websites in a professional environment on the web.

- It is very, very complicated
- Networking: Deep field with a lot of theory and research

  - Software engineers generally don't specialize in networking. You can and you'll be a great resource wherever you are working in networking, but most of it has been abstracted away so you don't need to learn it as much.

- You getting your code to the internet somehow is DevOps
- The internet and how your code is on the internet is the use of servers is part of DevOps
- The delivery of your code from those servers on the internet to the customer is DevOps.

#### DevOps has to involve delivering a software project across a network line to a client/machine somewhere.

### Steps of Simple DevOps:

- Configure an operating system on a computer
- Connect a computer to the internet
- Write software that opens a socket and listens for connections

  - Your code
    - Customize code for a specific business, entertainment, or hobby-related task
    - Make software failure tolerant (ensure that all the important programs your server depends on can't crash and stay crashed - automatic restarting)
    - Make software data consistent (if two users send similar data at the same time, it won't break, won't destroy data, and won't bring down other servers)

- Usually when you make a web server for the internet, it's not actually your code that connects to the customer.
  - One of the most popular is ngnx (used to be Apache)
  - nginx is really listening for connections (not trivial to master)

##### Nginx is fundamentally a load-balancing automating caching webserver.

1. Accepts multiple connections by listening as a web server on a specific port. On a public web server, that's almost always port 80.

- The trick is that your OS only has one port 8 (why you have to use nginx)
- When you open up Express, it can only accept as many connections on that port as your OS can finish traffic on that port.
- It depends on your operating system, your connection, etc. how many that is, but it definitely can't handle 2,000 connections per second (most likely far fewer)
- If your website takes one second to do the job you designed it to do, nobody can connect to your server for a minute until the job is finished.

##### Nginx spawns processes as each connection comes in.

- A connection comes in to your OS.
- Your OS hands the connection to nginx.
- It spawns a completely new process and runs your webserver or makes a connection to your webserver inside of that process. - Then it renames the socket (frees up port 80 again) and it gives the socket a different port ID.
- Has 50,000 sockets to choose from.
- When it's finished, nginx is finished and starts listening for traffic again.

2. Caching - it's keeping a list of all the files it has read and a copy of them.

- If a client asks for static content (something that has a cache policy that makes it legal to cache the data), nginix will simply copy the file and stick it in its memory.
- It doesn't run your server or ask the server for the file, it already has it.

3. Connects to the internet

###### As a part of basic hosting, even if all you want to do is this, you have to know about domain names.

#### What's a domain name?

Google.com is a domain name.  
But that's not how you get to google.com.

The internet works via IP addresses.  
When I ping Google.com in my terminal, it says Google.com's IP address is 216.58.194.142.  
That's for one specific computer somewhere in the world that's going to get that traffic when you try to contact Google.  
Google has hundreds of thousands of servers.  
When you type in Google.com, before it even tries to figure out what the IP of the address is, it looks to see what kind of traffic it's receiving.  
This is an HTTP request and that's on port 80.

The domain name, Google.com is just an entry in a table somewhere that says that Google.com goes to 216.58.194, etc.

The machine that keeps that table is called a domain name server which is a very complicated network protocol with a huge request for comments that specifies exactly how it works and it's recursive.

When I type in Google.com, my web browser asks a domain name server what the IP address of Google.com is.  
And the first domain name server to ansewr is my router on the wall.  
And if my router has that domain name, it gives it to my browser and doesn't talk to anyone else.  
But if it has never been to Google.com or if the domain name has timed out (and should be uncached), my router will ask my ISP's domain name server what's the IP address.  
And it will recursively walk up a step of domain name servers through tiers of ISPs all the way up to ICANN - Internet Corporation for Assigned Names and Number

When you buy a domain name, you're buying it from ICANN.

After you purchase a domain name, you have to set its A record to point to your IP address of your server that's in the basic DevOps model.

Where you buy your domain name is a matter of fad and popularity and marketing.
Namecheap is/was hot.

.com is one of the most expensive top-level domains

Have to register your website every year and tell it who you are because on ICANN's whois page, we can find out who owns a website - they're legally required to give that information.

#### HTTPS - secure hypertext transfer protocol

##### TLS - transport level security

- Similar to public private key pair encryption except the private key is controlled at a central register and when you make a connection to a website over the HTTPS scheme, that tells your browser to connect to 443, not 80.
- A complicated HTTP handshake occurs where your webiste says "I'm trying to make a connection to Google.com" and 443 says "I am Google.com, here is my certiifcate, here is an encrypted packet that proves I'm Google.com.
- Then your browser takes the packet and compares it against nationally recognized HTTPS security providers like Verisign and confirms that it's Google.
- You can then formally make the connection at that port and they will encrypt all of your traffic that you can encrypt using the key they just gave you.

Where you get HTTPS certificates is also a matter of fad and popularity
SSL - secure sockets layer.
HTTPS, TLS, and SSL are similar things.

##### digicert - $140 a year for secure traffic

- You buy a certiciate from digicert, you create a public/private key pair that you share with them which they add to the national registry so anyone that wants to connect to you can validate your key pairs.
- Then you take your private key from the key generation and you have to upload it to your web server and your web server uses that key to encrypt traffic and perform the HTTP handshake at the beginning.

#### Self-signed HTTPS certificates:

- You don't have to do anything.
- You tell your web server when you configure HTTPS that the certificate is self-signing.
- Means when the protocol handshake begins, your web server says "I'm giving you a HTTP certificate. I signed it. It is what I said it is and no one else can validate it for you."
- Insecure
- Don't authenticate with a central authority, which means it's easy to **man in the middle** traffic

**Man in the middle** means someone in the middle between the data that the server's sending to the customer gets the data, takes off the HTTPS certificate that came with it, puts its own on, and can change the data and do whatever it wants with it.

When you use a central cert authority, not theoretically possible to take the HTTPS wrapper off the data because only the central authority knows how to do that and if anyone else does it, it'll show and it will no longer be valid.

##### Self-signed:

Use for development, can't deploy with it.

##### Verisign:

Can't use for development because your server that you want to host that's validated with Verisgn is the only one that Verisign will validate and if you try to do it locally, it will say you're not actually the server and it won't validate you at all.

### ngrok

- Allows you to do devOps off your own machine.
- Generally all of us are behind a firewall
  - If you tell somebody your private IP address, they can't get there, they can't go to your computer and read port 80 off your computer without complicated rigamorole.
    - Obvious way to do it is to buy a static IP address from your ISP which means that you'll take your machine and put its IP address on the public internet which is really risky and why your OS has a firewall
  - Once your IP address is accessible to another machine, it turns out there are lots of ports being used by your computer - by your OS and other applications.
  - Most essential form of security penetration is to programmatically tickle ports on IP addresses on the internet and find out if they'll let you log in and write data to them.
  - No safe way to host a website on your personal computer (except with ngrok)

##### ngrok will create a tunnel

- Run ngrok on your local machine and tell you where your web server is located based on its port
- Ngrok runs, opens a connection with your local web server and then creates a tunnel to their web server located at ngrok.com
  - Tunnel can be any form of connection - simplest tunnel would be websocket connection
- Ngrok opens websocket connection over HTTPS with their server and whenever their server gets traffic with a specific domain name, it's going to forward the traffic through the ngrok tunnel down to your server which will respond to your ngrok application and will send the traffic back up the tunnel

- Can run a web server on your local machine and can share whatever you want.
- Free tier
