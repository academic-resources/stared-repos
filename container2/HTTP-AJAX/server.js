const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const friends = [
	{
		name: 'Ben Jerry',
		friends: 30,
		email: 'ben@lambdaschool.com',
		photo: 'https://imgur.com/2BQa0fh.png'
	},
	{
		name: 'Austen Tex',
		friends: 45,
		email: 'austen@lambdaschool.com',
		photo: 'https://imgur.com/he24byJ.jpg'
	},
	{
		name: 'Ryan Hambergersøn',
		friends: 15,
		email: 'ryan@lambdaschool.com',
		photo: 'https://imgur.com/k54xZJ7.png'
	},
	{
		name: 'Sean Connery',
		friends: 35,
		email: 'sean@lambdaschool.com',
		photo: 'https://imgur.com/DUFQH6s.png'
	},
	{
		name: 'Audrey Michelle ',
		friends: 67,
		email: 'michelle@gmail.com',
		photo: 'https://imgur.com/8R4vPLC.jpg'
	},
];

app.use(bodyParser.json());

app.use(cors());

app.get('/friends', (req, res) => {
	res.send(friends);
});

app.post('/new-friend', (req, res) => {
	friends.push(req.body);
	res.send(friends);
});

app.put('/update-friend', (req, res) => {
	const index = req.body.index;
	friends[index] = req.body.update;
	res.send(friends);
});

app.delete('/delete-friend', (req, res) => {
	const index = req.body.index;
	friends.splice(index, 1);
	res.send(friends);
});

app.listen(5000, () => {
	console.log('server listening on port 5000');
});