const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const db = require("../config/keys").MONGO_URI;
const expressGraphQL = require("express-graphql");
const models = require('./models'); // must import before schema
const schema = require("./schema/schema");

const app = express();

if (!db) {
  throw new Error("You must provide a string to connect to MongoDB Atlas");
}

mongoose
  // The configuration object we pass into connect()
  // prevents an error being thrown by the latest release of MongoDB's driver
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true
  })
);

// We use body-parser in order to be able to parse
// incoming requests in middleware before they are handled
app.use(bodyParser.json());

module.exports = app;

