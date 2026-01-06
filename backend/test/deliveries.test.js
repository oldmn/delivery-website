const request = require('supertest');
const app = require('../api/app');

describe('Deliveries API', () => {
  let user;
  let product;
  let delivery;

  test('setup - create user & product', async () => {
    const ru = await request(app).post('/api/users').send({ name: 'Bob', email: 'bob@example.com' }).expect(201);
    user = ru.body;
    const rp = await request(app).post('/api/products').send({ name: 'Gadget', price: 5.5 }).expect(201);
    product = rp.body;
  });

  test('POST /api/deliveries -> create delivery', async () => {
    const res = await request(app)
      .post('/api/deliveries')
      .send({ product: product._id, user: user._id })
      .expect(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('trackingId');
    expect(res.body.product._id).toBe(product._id);
    expect(res.body.user._id).toBe(user._id);
    delivery = res.body;
  });

  test('GET /api/deliveries/:id -> returns delivery', async () => {
    const res = await request(app).get(`/api/deliveries/${delivery._id}`).expect(200);
    expect(res.body.trackingId).toBe(delivery.trackingId);
  });

  test('PUT /api/deliveries/:id -> updates status', async () => {
    const res = await request(app).put(`/api/deliveries/${delivery._id}`).send({ status: 'Delivered' }).expect(200);
    expect(res.body.status).toBe('Delivered');
  });

  test('DELETE /api/deliveries/:id -> deletes delivery', async () => {
    await request(app).delete(`/api/deliveries/${delivery._id}`).expect(204);
    await request(app).get(`/api/deliveries/${delivery._id}`).expect(404);
  });
});
