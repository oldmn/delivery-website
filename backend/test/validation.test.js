const request = require('supertest');
const app = require('../api/app');
const mongoose = require('mongoose');

describe('Validation & Edge-case tests', () => {
  test('POST /api/users -> missing fields should return 400', async () => {
    await request(app).post('/api/users').send({}).expect(400);
  });

  test('POST /api/users -> duplicate email should return 400', async () => {
    const u = { name: 'Dup', email: 'dup@example.com' };
    const r1 = await request(app).post('/api/users').send(u).expect(201);
    expect(r1.body.email).toBe(u.email);

    await request(app).post('/api/users').send(u).expect(400);
  });

  test('POST /api/products -> negative price should return 400', async () => {
    await request(app).post('/api/products').send({ name: 'Bad', price: -1 }).expect(400);
  });

  test('POST /api/products -> missing name/price should return 400', async () => {
    await request(app).post('/api/products').send({}).expect(400);
  });

  test('GET /api/users/:id -> bad ObjectId format returns 400', async () => {
    await request(app).get('/api/users/not-a-valid-id').expect(400);
  });

  test('GET non-existing resource returns 404', async () => {
    const id = new mongoose.Types.ObjectId();
    await request(app).get(`/api/products/${id}`).expect(404);
  });

  test('POST /api/deliveries -> invalid product/user id formats return 400', async () => {
    await request(app).post('/api/deliveries').send({ product: 'bad', user: 'bad' }).expect(400);
  });

  test('POST /api/deliveries -> non-existing refs return 400', async () => {
    const p = new mongoose.Types.ObjectId();
    const u = new mongoose.Types.ObjectId();
    await request(app).post('/api/deliveries').send({ product: p, user: u }).expect(400);
  });

  test('PUT /api/deliveries/:id -> invalid enum value returns 400', async () => {
    // create user & product
    const ru = await request(app)
      .post('/api/users')
      .send({ name: 'E', email: 'e@example.com' })
      .expect(201);
    const rp = await request(app).post('/api/products').send({ name: 'EE', price: 1 }).expect(201);
    const rd = await request(app)
      .post('/api/deliveries')
      .send({ product: rp.body._id, user: ru.body._id })
      .expect(201);

    await request(app)
      .put(`/api/deliveries/${rd.body._id}`)
      .send({ status: 'NotAStatus' })
      .expect(400);
  });

  test('POST /api/deliveries -> duplicate trackingId should return 400', async () => {
    const ru = await request(app)
      .post('/api/users')
      .send({ name: 'T1', email: 't1@example.com' })
      .expect(201);
    const rp = await request(app).post('/api/products').send({ name: 'T2', price: 2 }).expect(201);
    const payload = { product: rp.body._id, user: ru.body._id, trackingId: 'TRACK-123' };
    await request(app).post('/api/deliveries').send(payload).expect(201);
    await request(app).post('/api/deliveries').send(payload).expect(400);
  });
});
