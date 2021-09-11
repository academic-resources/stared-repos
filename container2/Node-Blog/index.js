const express = require('express');
const userDb = require('./data/helpers/userDb');
const postDb = require('./data/helpers/postDb');

const customMiddleware = require('./Custom_Middleware');
const userRouter = require('./routers/user_requests');
const postRouter = require('./routers/post_routes');

const server = express();
const PORT = 4100;

//middleware
server.use(
    express.json()
);


//route handlers

//GET

server.use('/users', userRouter);

server.use('/posts', postRouter);


//listening
server.listen(PORT, ()=> {
    console.log(`Server is alive at ${PORT}`);
});