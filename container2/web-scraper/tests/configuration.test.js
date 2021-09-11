const expect  = require('expect');
const request = require('supertest');

const Configuration = require('../configuration');

const config = new Configuration();

describe('Tests configuration class', () => {

    it ('should set a variable in the config', (done) => {

        var key = 'mayank'; var value = 'amencherla';

        expect(config.contains(key)).toEqual(false);

        expect(config.get(key)).toEqual(undefined);

        config.set(key, value);

        expect(config.contains(key)).toEqual(true);

        expect(config.get(key)).toEqual(value);

        done();
    });
});
