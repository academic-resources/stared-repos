const express = require('express');
const helmet = require('helmet');

const carRouter = require('../routers/carRouter.js');

const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/cars', carRouter);

module.exports = server;
