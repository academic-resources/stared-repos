const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/data', { useMongoClient: true });

const Food = require('./food');

describe('Food', () => {
  beforeEach(done => {
    sinon.stub(Food, 'find');
    done();
  });

  afterEach(done => {
    Food.find.restore();
    done();
  });

  describe('getName()', () => {
    it('should return the name of the food item', done => {
      const food = new Food({ name: 'Minestrone' });
      expect(food.getName()).to.equal('Minestrone');
      done();
    });
  });

  describe('getFoods()', () => {
    it('should return all the foods', done => {
      Food.find.yields(null, [{ name: 'Fettuccine Alfredo' }]);
      Food.getFoods(foods => {
        expect(foods.length).to.equal(1);
        expect(foods[0].name).to.equal('Fettuccine Alfredo');
        done();
      });
    });
  });
});
