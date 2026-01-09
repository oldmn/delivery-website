const request = require('supertest');
const app = require('../api/app');

// MongoDB connection is handled by jest.setup.js

describe('Error Handler Tests', () => {
  test('GET / should return API running message', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.text).toBe('Delivery API running');
  });

  test('GET /nonexistent should return 404', async () => {
    const response = await request(app).get('/nonexistent');

    expect(response.status).toBe(404);
  });

  test('GET /api/nonexistent should return 404', async () => {
    const response = await request(app).get('/api/nonexistent');

    expect(response.status).toBe(404);
  });

  test('POST to invalid route should return 404', async () => {
    const response = await request(app).post('/api/invalid').send({ test: 'data' });

    expect(response.status).toBe(404);
  });
});
