require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const path = require("path");
const bearerToken = require("express-bearer-token");
const followRouter = require("./routes/follows");
const commentRouter = require("./routes/comments");
const articleRouter = require("./routes/articles");
const userRouter = require("./routes/users");
const indexRouter = require("./routes/index");

app.use(bearerToken());
app.use(morgan("dev"));
app.use(express.json());
app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/articles", articleRouter);
app.use("/comments", commentRouter);
app.use("/users", followRouter);

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "pug");

// Catch unhandled requests and forward to error handler.
app.use((req, res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.log("I'm here");
  console.log(err);
  res.status(err.status || 500);
  const errMsg = err.errors;

  res.json({
    title: err.title,
    errors: errMsg,
  });
  console.log(errMsg);
});

module.exports = app;
