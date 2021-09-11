import request from 'supertest'

import app from '../config/express'

describe('Test the welcome endpoint', () => {
  test('It should respond to GET request', async () => {
    const response = await request(app).get('/api/welcome')
    expect(response.statusCode).toBe(200)
  })
})
