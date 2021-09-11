const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const authRouter = require('../auth/authRouter.js');
const usersRouter = require('../users/usersRouter.js');
const restricted = require('../auth/restrictedMW.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/', authRouter);
server.use('/api/users', restricted, checkRole('user'), usersRouter);

server.get('/', (req, res) => {
	res.send("It's alive!");
});

module.exports = server;

function checkRole(role) {
	return (req, res, next) => {
		if (req.decodedToken && req.decodedToken.role && req.decodedToken.role.toLowerCase() === role) {
			next();
		} else {
			res.status(403).json({ you: 'shall not pass!' });
		}
	};
}
