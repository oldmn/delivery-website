const request = require('supertest');
const app = require('../api/app');

describe('Users API', () => {
  let created;

  test('POST /api/users -> create user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ name: 'Alice', email: 'alice@example.com' })
      .expect(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.email).toBe('alice@example.com');
    created = res.body;
  });

  test('GET /api/users -> list includes created user', async () => {
    const res = await request(app).get('/api/users').expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.find(u => u._id === created._id)).toBeTruthy();
  });

  test('GET /api/users/:id -> returns user', async () => {
    const res = await request(app).get(`/api/users/${created._id}`).expect(200);
    expect(res.body.email).toBe('alice@example.com');
  });

  test('PUT /api/users/:id -> updates user', async () => {
    const res = await request(app).put(`/api/users/${created._id}`).send({ name: 'Alice2' }).expect(200);
    expect(res.body.name).toBe('Alice2');
  });

  test('DELETE /api/users/:id -> deletes user', async () => {
    await request(app).delete(`/api/users/${created._id}`).expect(204);
    await request(app).get(`/api/users/${created._id}`).expect(404);
  });
});
