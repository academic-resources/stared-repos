const express = require('express');
const Users = require('./data/db.js');
const server = express();

server.use(express.json());

/*
	When the client makes a GET request to /api/users:
		• If there's an error in retrieving the users from the database:
			○ respond with HTTP status code 500.
			○ return the following JSON object: { errorMessage: "The users information could not be retrieved." }.
*/
// get
server.get('/api/users', (req, res) => {
	Users.find()
		.then(users => {
			res.status(200).json(users);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ errorMessage: 'The users information could not be retrieved.' });
		});
});
/*
	When the client makes a GET request to /api/users/:id:
		• If the user with the specified id is not found:
			○ respond with HTTP status code 404 (Not Found).
			○ return the following JSON object: { message: "The user with the specified ID does not exist." }.
		• If there's an error in retrieving the user from the database:
			○ respond with HTTP status code 500.
			○ return the following JSON object: { errorMessage: "The user information could not be retrieved." }.
*/

// get
server.get('/api/users/:id', (req, res) => {
	Users.findById(req.params.id)
		.then(user => {
			console.log(user);
			if (user) {
				res.status(200).json(user);
			} else {
				res.status(404).json({ errorMessage: 'The user with the specified ID does not exist.' });
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ errorMessage: 'The user information could not be retrieved.' });
		});
});
// post
/*
	When the client makes a POST request to /api/users:
		• If the request body is missing the name or bio property:
			○ respond with HTTP status code 400 (Bad Request).
			○ return the following JSON response: { errorMessage: "Please provide name and bio for the user." }.
		• If the information about the user is valid:
			○ save the new user the the database.
			○ respond with HTTP status code 201 (Created).
			○ return the newly created user document.
		• If there's an error while saving the user:
			○ respond with HTTP status code 500 (Server Error).
			○ return the following JSON object: { errorMessage: "There was an error while saving the user to the database" }.
*/
server.post('/api/users', (req, res) => {
	//axios post
	const userInfo = req.body;
	Users.insert(userInfo)
		.then(user => {
			if (user) {
				res.status(201).json(user);
			} else {
				res.status(400).json({ errorMessage: 'Please provide name and bio for the user.' });
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ errorMessage: 'There was an error while saving the user to the database.' });
		});
});
// delete
/*
	When the client makes a DELETE request to /api/users/:id:
		• If the user with the specified id is not found:
			○ respond with HTTP status code 404 (Not Found).
			○ return the following JSON object: { message: "The user with the specified ID does not exist." }.
		• If there's an error in removing the user from the database:
			○ respond with HTTP status code 500.
			○ return the following JSON object: { errorMessage: "The user could not be removed" }.
*/
server.delete(`/api/users/:id`, (req, res) => {
	Users.remove(req.params.id)
		.then(removed => {
			if (removed) {
				res.status(200).json(removed);
			} else {
				res.status(404).json({ errorMessage: 'The user with the specified ID does not exist.' });
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ errorMessage: 'The user could not be removed.' });
		});
});
/*
	When the client makes a PUT request to /api/users/:id:
		• If the user with the specified id is not found:
			○ respond with HTTP status code 404 (Not Found).
			○ return the following JSON object: { message: "The user with the specified ID does not exist." }.
		• If the request body is missing the name or bio property:
			○ respond with HTTP status code 400 (Bad Request).
			○ return the following JSON response: { errorMessage: "Please provide name and bio for the user." }.
		• If there's an error when updating the user:
			○ respond with HTTP status code 500.
			○ return the following JSON object: { errorMessage: "The user information could not be modified." }.
		• If the user is found and the new information is valid:
			○ update the user document in the database using the new information sent in the request body.
			○ respond with HTTP status code 200 (OK).
			○ return the newly updated user document.


*/

server.put(`/api/users/:id`, (req, res) => {
	let userInfoChanges = req.body;
	Users.update(req.params.id, userInfoChanges)
		.then(updated => {
			if (updated) {
				res.status(200).json(updated);
			} else if (!userInfoChanges.name || !userInfoChanges.bio) {
				res.status(400).json({ errorMessage: 'Please provide name and bio for the user.' });
			} else {
				res.status(404).json({ errorMessage: 'The user with the specified ID does not exist.' });
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ errorMessage: 'The user information could not be modified.' });
		});
});

const port = 5000;
server.listen(port, () => console.log(`\n** API on port 5000 ${port} \n`));
