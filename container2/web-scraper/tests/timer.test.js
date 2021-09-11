const expect  = require('expect');
const request = require('supertest');

const Timer = require('../request-queue/timer');

describe('Tests the Timer class', () => {

    it ('Tests that timeout is false within timeout window', (done) => {

        const t = Timer.Build(500);

        t.start();

        expect(t.shouldTimeout()).toEqual(false);

        done();
    });

    it ('Tests that timeout is true after timeout window', (done) => {

        const t = Timer.Build(500);

        t.start();

        var start = Date.now();

        var now = Date.now();

        while (now - start < 700) now = Date.now();

        expect(t.shouldTimeout()).toEqual(true);

        done();
    });
});
