const request = require('supertest');
const app = require('../api/app');

describe('Products API', () => {
  let created;

  test('POST /api/products -> create product', async () => {
    const res = await request(app)
      .post('/api/products')
      .send({ name: 'Widget', price: 9.99 })
      .expect(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.name).toBe('Widget');
    created = res.body;
  });

  test('GET /api/products -> list includes created product', async () => {
    const res = await request(app).get('/api/products').expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.find(p => p._id === created._id)).toBeTruthy();
  });

  test('GET /api/products/:id -> returns product', async () => {
    const res = await request(app).get(`/api/products/${created._id}`).expect(200);
    expect(res.body.name).toBe('Widget');
  });

  test('PUT /api/products/:id -> updates product', async () => {
    const res = await request(app).put(`/api/products/${created._id}`).send({ price: 12.5 }).expect(200);
    expect(res.body.price).toBe(12.5);
  });

  test('DELETE /api/products/:id -> deletes product', async () => {
    await request(app).delete(`/api/products/${created._id}`).expect(204);
    await request(app).get(`/api/products/${created._id}`).expect(404);
  });
});
