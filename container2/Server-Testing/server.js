const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Food = require('./food');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/data', { useMongoClient: true }, () => {
  console.log('Connected to MongoDB');
});

const server = express();

server.use(bodyParser.json());

// (Replaces try/catch) Catches async/await errors and Promise rejections → passes to middleware
const catchErrors = fn => (req, res, next) => {
  const promise = fn(req, res, next);
  if (promise.catch) promise.catch(err => next(err));
};

const handleErrors = (err, req, res, next) => {
  err.stack = err.stack || '';
  const errorDetails = {
    status: err.status,
    message: err.message,
    stack: err.stack
  };
  res.status(err.status || 500).json(errorDetails);
};

const getFoods = async (req, res, next) => {
  const foods = await Food.find({});
  res.json(foods);
};

const postFood = async (req, res, next) => {
  const { name } = req.body;
  const newFood = await new Food({ name });
  await newFood.save();
  res.json(newFood);
};

const putFood = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  await Food.findByIdAndUpdate(id, { name });
  const food = await Food.findById(id);
  res.json(food);
};

const deleteFood = async (req, res) => {
  const { id } = req.params;
  await Food.findByIdAndRemove(id);
  res.json({ Success: 'Food removed' });
};

server
  .route('/food')
  .get(catchErrors(getFoods))
  .post(catchErrors(postFood))

server
  .route('/food/:id')
  .put(catchErrors(putFood))
  .delete(catchErrors(deleteFood));

server.use(handleErrors);

server.listen(3030, () => console.log('Express running → PORT 3030'));

module.exports = server;
