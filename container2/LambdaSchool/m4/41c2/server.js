const express = 'express';

const server = express();
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');

server.use(express.json());
server.use(logger);
server.use('/api/user', userRouter);
server.use('/api/post', postRouter);

server.get('/', (req, res) => {
	res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
	const { loggerMethod, reqURL } = req;
	console.log(`Method ${loggerMethod} to URL ${reqURL} at date ${new Date()}`);
	next();
}

module.exports = server;
