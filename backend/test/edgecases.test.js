const request = require('supertest');
const app = require('../api/app');
const mongoose = require('mongoose');
const User = require('../api/models/user');
// Product model not used in these tests

describe('Edge cases and validation tests', () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('POST /api/users missing email returns 400', async () => {
    const res = await request(app).post('/api/users').send({ name: 'No Email' });
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/email/i);
  });

  test('POST /api/products invalid price returns 400', async () => {
    const res = await request(app).post('/api/products').send({ name: 'Bad Price', price: -10 });
    expect(res.status).toBe(400);
  });

  test('Creating deliveries with missing product/user returns 400', async () => {
    const res = await request(app)
      .post('/api/deliveries')
      .send({ product: new mongoose.Types.ObjectId(), user: new mongoose.Types.ObjectId() });
    expect(res.status).toBe(400);
  });

  test('Duplicate email prevented', async () => {
    const u = new User({ name: 'D', email: 'dup@example.com' });
    await u.save();
    const res = await request(app)
      .post('/api/users')
      .send({ name: 'Dup', email: 'dup@example.com' });
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/exists/);
  });

  test('GET /api/users/:id invalid id returns 400', async () => {
    const res = await request(app).get('/api/users/invalid-id');
    expect(res.status).toBe(400);
  });
});
