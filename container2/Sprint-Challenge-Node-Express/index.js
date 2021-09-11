const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const cors = require('cors');

const actionRouter = require('./routes/action_routes');
const projectRouter = require('./routes/project_routes');

const server = express();

server.use(
    express.json(),
    helmet(),
    logger('dev'),
    cors()
);

const PORT = process.env.PORT || 4310;



server.use('/projects', projectRouter);

server.use('/actions', actionRouter);



server.listen(PORT, ()=>{
    console.log("It's aliiiiive!");
})