const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

// Middleware
const authenticate = require("../middleware/authenticate-middleware");

// Routers
const authRouter = require("../auth/auth-router.js");
const todosRouter = require("../todos/todos-router.js");
const adminRouter = require("../admin/admin-router.js");
const volunteerRouter = require("../volunteer/volunteer-router");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/todos", authenticate, todosRouter);
server.use("/api/admin", authenticate, adminRouter);
server.use("/api/volunteer", authenticate, volunteerRouter);

server.get("/", (req, res, next) => {
  res.json({
    message: "Welcome to School in the Cloud API"
  });
});

function errorHandler(error, req, res, next) {
  console.log("error: ", error);
  res.status(400).json({ message: error });
}

server.use(errorHandler);

module.exports = server;
