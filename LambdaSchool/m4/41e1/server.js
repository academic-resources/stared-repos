const express = require('express');
var cors = require('cors');

const server = express();
server.use(cors());
const projectRouter = require('./routers/projectRouter');
const actionRouter = require('./routers/actionRouter');
server.use('/projects', projectRouter);
server.use('/actions', actionRouter);

server.use(express.json());
server.get('/', (req, res) => {
	res.send(`<h2>Let's write some code!</h2>`);
});

/*
server.use('/projects', projectRouter);
server.use('/actions', actionRouter);
*/

module.exports = server;
