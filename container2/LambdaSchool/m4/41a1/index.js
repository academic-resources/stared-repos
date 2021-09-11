// import express from 'express'; //es2015 Modules

const express = require('express'); // CommonJS Modules

const Hubs = require('./data/hubs-model.js');
const server = express();

// middleware way to teach express how to do other things that it can't
// out of the box

server.use(express.json());

server.get('/', (req, res) => {
	res.json({ hello: 'Web26' });
	res.status(200);
});

// view list of hubs
server.get('/api/hubs', (req, res) => {
	Hubs.find()
		.then(hubs => {
			console.log(hubs);
			res.status(200).json(hubs);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ errorMessage: 'oops' });
		});
});

// add hub
server.post('/api/hubs', (req, res) => {
	//axios post
	const hubInfo = req.body;
	Hubs.add(hubInfo)
		.then(hub => {
			res.status(201).json(hub);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ errorMessage: 'oops' });
		});
});

// delete hub
server.delete(`/api/hubs/:id`, (req, res) => {
	Hubs.remove(req.params.id)
		.then(removed => {
			res.status(200).json(removed);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ errorMessage: 'oops' });
		});
});

const port = 5000;

server.listen(port, () => console.log(`\n** API on port 5000 ${port} \n`));

// npm i express
