const express = require('express');

const Hubs = require('./hubs-model.js');

const router = express.Router();

router.get('/', (req, res) => {
	const pagination = req.query;
	console.log('pagination', pagination);
	B;
	Hubs.find(pagination)
		.then(hubs => {
			res.status(200).json(hubs);
		})
		.catch(error => {
			console.log(error);
		});
});

router.put('/:id/messages', (req, res) => {
	res.status(200).json({ url: '/:id/messages', operation: 'PUT' });
});

router.delete('/:id/messages', (req, res) => {
	res.status(204);
});

router.post('/:id/messages', (req, res) => {
	const { id } = req.params;
	// req.body.hub_id = req.params.id;
	const message = { ...req.body, hub_id: id };

	Hubs.addMessage(req.body)
		.then(inserted => {
			res.status(201).json(inserted);
		})
		.catch(error => {
			console.log(error);
			res.status(500).json({ errorMessage: 'Failure' });
		});
});

module.exports = router;
