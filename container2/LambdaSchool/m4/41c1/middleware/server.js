const express = require("express"); // importing a CommonJS module
const morgan = require("morgan");
const helmet = require("helmet");

const hubsRouter = require("./hubs/hubs-router.js");

const server = express();

// the three amigas: rachel, rita and nancy

// global middleware
server.use(express.json()); // built-in middleware
// server.use(morgan("dev"));
server.use(helmet());
// server.use(logger);

// routes - endpoints
server.use("/api/hubs", logger, gatekeeper("mellon"), hubsRouter);

server.get("/", logger, greeter, gatekeeper("notto"), (req, res) => {
  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome ${req.cohort} to the Lambda Hubs API</p>
    `);
});

module.exports = server;

function greeter(req, res, next) {
  req.cohort = "Web 26";

  next();
}

function logger(req, res, next) {
  console.log(`${req.method} Request to ${req.originalUrl} `);

  next();
}

function gatekeeper(guess) {
  return function(req, res, nancy) {
    const password = req.headers.password;

    console.log("gk headers", req.headers);

    if (password && password.toLowerCase() === guess) {
      nancy();
    } else {
      res.status(401).json({ you: "shall not pass!" });
    }
  };
}

// function fetchHubs() {
//   const endpoint = 'https://lotr.com/hubs';
//   const options = {
//     headers: {
//       password: 'mellon'
//     }
//   }
//   axios.get(endpoint, options).then().catch()
// }
