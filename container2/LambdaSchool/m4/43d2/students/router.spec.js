const request = require('supertest');

const server = require('../api/server.js');

describe('students router', function() {
	it('should run the tests', function() {
		expect(true).toBe(true);
	});

	describe('GET /api/students', function() {
		it('should return 200 OK', function() {
			return request(server)
				.get('/api/students')
				.then(res => {
					expect(res.status).toBe(200);
				});
		});

		it('should return students as the router value', function() {
			return request(server)
				.get('/api/students')
				.then(res => {
					expect(Array.isArray(res.body)).toBe(true);
				});
		});

		it('should return JSON formatted body', function() {
			return request(server)
				.get('/api/students')
				.then(res => {
					expect(res.type).toMatch(/json/);
				});
		});

		it('should return an array of students (async version)', async function() {
			const res = await request(server).get('/api/students');

			expect(Array.isArray(res.body)).toBe(true);
		});
	});

	describe('POST /api/students', function() {
		let testStudent = { name: 'test123', cohortsid: '3' };
		it('should return 200 OK', function() {
			return request(server)
				.post('/api/students', testStudent)
				.then(res => {
					expect(res.status).toBe(200);
				});
		});

		it('should return students as the router value', function() {
			return request(server)
				.post('/api/students', testStudent)
				.then(res => {
					expect(Array.isArray(res.body)).toBe(true);
				});
		});

		it('should return JSON formatted body', function() {
			return request(server)
				.post('/api/students', testStudent)
				.then(res => {
					expect(res.type).toMatch(/json/);
				});
		});

		it('should return an array of students (async version)', async function() {
			const res = await request(server).post('/api/students', testStudent);

			expect(Array.isArray(res.body)).toBe(true);
		});
	});

	describe('PUT /api/students', function() {
		let testStudent = { name: 'test123456', cohortsid: '5' };
		it('should return 200 OK', function() {
			return request(server)
				.put('/api/students', testStudent)
				.then(res => {
					expect(res.status).toBe(200);
				});
		});

		it('should return students as the router value', function() {
			return request(server)
				.put('/api/students', testStudent)
				.then(res => {
					expect(Array.isArray(res.body)).toBe(true);
				});
		});

		it('should return JSON formatted body', function() {
			return request(server)
				.put('/api/students', testStudent)
				.then(res => {
					expect(res.type).toMatch(/json/);
				});
		});

		it('should return an array of students (async version)', async function() {
			const res = await request(server).put('/api/students', testStudent);

			expect(Array.isArray(res.body)).toBe(true);
		});
	});

	describe('DELETE /api/students', function() {
		let testStudent = { studentsid: 6 };
		it('should return 200 OK', function() {
			return request(server)
				.delete('/api/students', testStudent)
				.then(res => {
					expect(res.status).toBe(200);
				});
		});

		it('should return students as the router value', function() {
			return request(server)
				.delete('/api/students', { studentsid: 5 })
				.then(res => {
					expect(Array.isArray(res.body)).toBe(true);
				});
		});

		it('should return JSON formatted body', function() {
			return request(server)
				.delete('/api/students', { studentsid: 4 })
				.then(res => {
					expect(res.type).toMatch(/json/);
				});
		});

		it('should return an array of students (async version)', async function() {
			const res = await request(server).delete('/api/students', { studentsid: 3 });

			expect(Array.isArray(res.body)).toBe(true);
		});
	});
});
