const request = require('supertest');

const server = require('../api/server.js');

describe('jokes router', function() {
	it('should run the tests', function() {
		expect(true).toBe(true);
	});

	describe('GET /api/jokes', function() {
		it('should return JSON formatted body', function() {
			return request(server)
				.get('/api/jokes')
				.then(res => {
					expect(res.type).toMatch(/json/);
				});
		});
	});
});
