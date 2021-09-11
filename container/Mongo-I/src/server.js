const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/users');
const posts = require('./routes/posts');

const server = express();

server.use(bodyParser.json());

server.use('/users', users);
server.use('/posts', posts);

/* eslint no-console: 0 */
mongoose.Promise = global.Promise;
const connect = mongoose.connect('mongodb://localhost/', {
  useMongoClient: true
});

connect.then(
  () => {
    const port = 5050;
    server.listen(port);
    console.log(`Server listening on ${port}`);
  },
  err => {
    console.log("Couldn't connect to MongoDB. Do you have it running?");
  }
);
