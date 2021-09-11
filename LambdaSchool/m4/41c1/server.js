const express = require('express'); // importing a CommonJS module

const Hubs = require('./hubs-model');
const Messages = require('../messages/messages-model');
const hubsRouter = require('./hubs/hubs-router.js');

const router = express.Router();

server.use(express.json());
// server.use(morgan('dev'));
server.use(helmet());

server.use('/api/hubs', hubsRouter);

// write a gatekeeper middleware that reads a password from req.headers
function gatekeeper(req, res, next) {
	// if the password is "mellon" let the request continue
	const password = req.headers.password;
	if (password && password.toLowerCase() === 'mellon') {
		next();
	}
	// if the password is not "mellon" send a 400 status code and a message to the client
	else {
		res.status(400).json('incorrect password!');
	}
}

function fetchHubs() {
	const endpoint = 'https://lotr.com/hubs';
	const options = {
		headers: {
			password: 'mellon'
		}
	};
	// axios.get(endpoint, options).then().catch();
}

server.get('/', (req, res) => {
	const nameInsert = req.name ? ` ${req.name}` : '';

	res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

module.exports = server;
