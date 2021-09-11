const chai = require('chai');
const { expect } = chai;
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/data', { useMongoClient: true });

const Food = require('./food');
const server = require('./server');

describe('/food', () => {
  let id;

  beforeEach(done => {
    new Food({ name: 'Bruschetta' }).save((err, savedFood) => {
      if (err) {
        console.log(err);
        return done();
      }
      id = savedFood.id;
      done();
    });
  });

  afterEach(done => {
    Food.remove({}, err => {
      if (err) console.log(err);
      done();
    });
  });

  describe('GET /food', () => {
    it('should get all of the food', done => {
      chai
        .request(server)
        .get('/food')
        .end((err, res) => {
          if (err) console.log(err);
          expect(res.status).to.equal(200);
          expect(Array.isArray(res.body)).to.equal(true);
          expect(res.body.length).to.equal(1);
          done();
        });
    });
  });

  describe('POST /food', () => {
    it('should add a new food', done => {
      chai
        .request(server)
        .post('/food')
        .send({ name: 'Pizza' })
        .end((err, res) => {
          if (err) return console.log(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('Pizza');
          done();
        });
    });
  });

  describe('PUT /food/:id', () => {
    it('should update the food document', done => {
      chai
        .request(server)
        .put(`/food/${id}`)
        .send({ name: 'Gnocchi' })
        .end((err, res) => {
          if (err) return console.log(err);
          expect(res.body.name).to.equal('Gnocchi');
          done();
        });
    });
  });

  describe('DELETE /food/:id', () => {
    it('should remove the food document', done => {
      chai
        .request(server)
        .delete(`/food/${id}`)
        .end((err, res) => {
          if (err) return console.log(err);
          expect(res.body).to.have.property('Success', 'Food removed');
          Food.findById(id, (err, deletedFood) => {
            if (err) return console.log(err);
            expect(deletedFood).to.equal(null);
            done();
          });
        });
    });
  });
});
