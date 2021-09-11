### DevOps and Deployment:

- Not CS, not software development, but it's a necessary byproduct of the two.

- Just like when creating any sort of product, you have to find a way to get that product to end users

### How is This Process Done?

- Depends on what you're trying to deploy
  - Static HTML that has no reliance on things like a Node server or a database can be handled by a myriad of hosting services out there.
  - If your application relies on a database or Node server or is dynamic, you can configure a virtual machine from DigitalOcean or a Docker instance or use a web services platform like AWS or Google Cloud Platform or Azure.

Code on your local machine
You're saving it to some version control

- Local host server running your front-end webpack create-react-app environment
- Local host server propping up your API and you're running CORS to manage to talk to the two
- Persisting Mongo instance

What has to happen in order for your end users to interface with your code?

## [Ngrok](https://ngrok.com/)

```
npm init -y
npm install --save express body-parser
touch server.js
```

```
const express = require('express')
const bodyParser = require('bodyparser')
const port = process.env.PORT || 3030

const server = express()


server.get('/', (req, res) => {
    res.send(`Hellow world from ${port}`)
})

server.listen(port, err => {
    if (err) console.log(err)
    console.log(`Magic happening on ${port}`)
})
```

process.env.PORT

- this says if there is no port I've given as a fallback port, if you can pull out an environment variable somewhere in my machine or assign one for me, use that port to hold up the server
  - could be used by Heroku/Netlify
- can have multiple variables and processes
  - example: this is a developer port, this is a live server port

We are hosting and ngrok takes our local host and exposes it to the WWW. If my server goes down, it goes down as well.

If you don't know what port your web server is listening on, it's probably on port 80 for the default for HTTP.

```
ngrok http 3030
```

Gives us a HTTP port and a HTTPS port

Demo:

```
- Created public Github repo
- git clone
- npm init
- touch server.js
- npm install --save express body-parser
```

server.js

```
const express = require('express')
const bodyParser = require('bodyparser')
const corst = require('cors')

const port = process.env.PORT || 3030

const server = express()
server.use(bodyParser.json())
server.use(cors())



server.get('/', (req, res) => {
    res.send(`Hellow world from ${port}`)
})

server.post('/payload, (req, res) => {
    console.log(req.body)
    res.send(req.body)
}

server.listen(port, err => {
    if (err) console.log(err)
    console.log(`Magic happening on ${port}`)
})
```

.gitignore
`/node_modules`

```
- git add .
- git commit -m "init"
- git push -u origin master
```

#### [Ryan's Repo](https://github.com/ryanhca/ngrok-webhooks)

### Steps:

- Create a repo
- Open settings
- Webhooks
  - Webhooks allow external services to be notified when certain events happen. When specified events happen, we'll send a POST request to each of the URLs you provide. Learn more in our [Webhooks Guide](https://developer.github.com/webhooks/).
    - Creating webhooks
      - Will guide you through how to get it started
  - Add webhooks

First thing you want to do is look at the payload URL

If you have ngroks set up, the URL from ngroks is the one you'll need.

- Want to set application/json as your content type
- If you have a secret, or need authentication on your ngrok, you can get an authentication, it will send that secret along with the resource request
- clicking add webhook pushes some information
- Let me select the individual events
  - Fork

If you want to test, you can send a test request

Since Ryan subscribed to the webhook to hit the URL on this post route of payload, any time someone interfaces with one of these events, it will send a request to that route.

- If this was just http://localhost ... there's no way Github could talk to the localhost without it being on the WWW.

ngrok is hosting this URL, but they're propping up/ piggybacking off of your local machine's port and builds it as a live URL.

```
Forwarding http//9146070a.ngrok.io -> localhost:3030
```

What this line is saying is:
Expose localhost:3030 to this internet URL

- It's a proxy

Proxy:

- Middleman
- Authority to represent someone else
  - Told ngrok it was allowed to represent my port

Where does this code currently live? Who is spinning up the code?

My code lives on my machine and my machine is spinning it on a local host and ngrok is exposing it to the world.

Webhooks exposes a couple of things:

- Sometimes you want services to request information to your server
- You can use that information to your benefit

They'll report it to the ngrok URL which is hosting and standing proxy for my local host.

The URL that you give to the Github webhook payload portion is the URL that needs to be live on the internet

- http://localhost:3030/payload
  - Could not connect to server
