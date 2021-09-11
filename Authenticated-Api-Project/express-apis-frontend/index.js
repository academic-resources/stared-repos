const express = require("express");
const path = require("path");

// Create the Express app.
const app = express();

// Set the pug view engine.
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

// Define a route.
app.get("/", (req, res) => {
  res.render("index");
});

// Route to Sign Up Page
app.get("/sign-up", (req, res) => {
  res.render("sign-up");
});

// Route to Log In Page
app.get("/log-in", (req, res) => {
  res.render("log-in");
});

// Route to Create a Tweet
app.get("/create", (req, res) => {
  res.render("create");
});

// Route to Profile
app.get("/profile", (req, res) => {
  res.render("profile");
});
// Define a port and start listening for connections.
const port = 4000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
