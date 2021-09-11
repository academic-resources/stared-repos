const express = require("express");
const models = require("./models");
const expressGraphQL = require("express-graphql");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const db = require("../keys/secret.js").MONGO_URI;
const schema = require("./schema/schema");

const app = express();

if (!db) {
  throw new Error("You must provide a string to connect to Atlas");
}

mongoose
  // The configuration object we pass into connect() prevents an error being thrown by the latest release of MongoDB's driver
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

// Recall that we use body-parer in order to be able to parse incoming requests in middleware before they are handled
app.use(bodyParser.json());

app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true
  })
);

module.exports = app;
