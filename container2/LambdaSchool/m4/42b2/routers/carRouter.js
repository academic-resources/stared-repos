const express = require('express');

const router = express.Router();
const knex = require('knex');
const config = require('../knexfile.js');
const db = knex(config.development);
// export for use in codebase

router.get('/', (req, res) => {
	db('cars')
		.then(fruits => {
			res.json(fruits);
		})
		.catch(err => {
			res.status(500).json({ message: 'Failed to retrieve cars' });
		});
});

router.get('/:id', (req, res) => {
	const { id } = req.params;

	db('cars')
		.where({ id })
		.first()
		.then(fruit => {
			res.json(fruit);
		})
		.catch(err => {
			res.status(500).json({ message: 'Failed to retrieve car' });
		});
});

router.post('/', (req, res) => {
	const fruitData = req.body;
	db('cars')
		.insert(fruitData)
		.then(ids => {
			db('cars')
				.where({ id: ids[0] })
				.then(newFruitEntry => {
					res.status(201).json(newFruitEntry);
				});
		})
		.catch(err => {
			console.log('POST error', err);
			res.status(500).json({ message: 'Failed to store car' });
		});
});

// update one car

router.put('/:id', (req, res) => {
	const carID = req.params.id;
	const car = req.body;
	const carVIN = req.body.VIN;
	const carMake = req.body.make;
	const carModel = req.body.model;
	const carTransmissionType = req.body.transmissionType;
	const carTitleStatus = req.body.titleStatus;
	const carMileage = req.body.mileage;
	db('cars')
		.where({ id: carID })
		.update(carID, {
			VIN: carVIN,
			make: carMake,
			model: carModel,
			transmissionType: carTransmissionType,
			titleStatus: carTitleStatus,
			mileage: carMileage
		})
		.then(car => {
			if (car) {
				res.status(200).json(car);
			} else {
				res.status(404).json({ errorMessage: 'No car found with that I.D.' });
			}
		})
		.catch(error => {
			res.status(500).json({ errorMessage: 'car not updated.', error });
		});
});

// delete one car

router.delete('/:id', (req, res) => {
	const carID = req.params.id;
	db('cars')
		.delete(carID)
		.where({ id: carID })
		.then(car => {
			if (carID) {
				res.status(200).json({ message: `car ${carID} was deleted` });
			} else {
				res.status(404).json({ errorMessage: 'No car found with that I.D.' });
			}
		})
		.catch(error => {
			res.status(500).json({ errorMessage: `car ${carID} not deleted.`, error });
		});
});
module.exports = router;
