const request = require('supertest');
const app = require('../api/app');

// MongoDB connection is handled by jest.setup.js

describe('Health Endpoint Tests', () => {
  test('GET /api/health should return 200 OK with health status', async () => {
    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'ok');
    expect(response.body).toHaveProperty('timestamp');
    expect(response.body).toHaveProperty('version');
    expect(response.body).toHaveProperty('environment');
    expect(response.body).toHaveProperty('mongodb');
    expect(response.body.mongodb).toHaveProperty('connected', true);
    expect(response.body.mongodb).toHaveProperty('state', 1);
    expect(response.body).toHaveProperty('uptime');
  });

  test('GET /api/health should include timestamp in ISO format', async () => {
    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
    const timestamp = new Date(response.body.timestamp);
    expect(timestamp instanceof Date && !isNaN(timestamp)).toBe(true);
  });

  test('GET /api/health should have positive uptime', async () => {
    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body.uptime).toBeGreaterThan(0);
  });

  test('GET /api/health should include npm version from package.json', async () => {
    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body.version).toBeDefined();
    expect(typeof response.body.version).toBe('string');
  });

  test('GET /api/health should report environment correctly', async () => {
    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body.environment).toBeDefined();
    expect(['development', 'production', 'test']).toContain(response.body.environment);
  });

  test('GET /api/health should confirm database connection state', async () => {
    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body.mongodb.connected).toBe(true);
    expect([0, 1, 2, 3]).toContain(response.body.mongodb.state);
  });

  test('GET /api/health response times should be reasonable', async () => {
    const start = Date.now();
    const response = await request(app).get('/api/health');
    const elapsed = Date.now() - start;

    expect(response.status).toBe(200);
    expect(elapsed).toBeLessThan(1000);
  });

  test('GET /api/health should have all required fields', async () => {
    const response = await request(app).get('/api/health');
    const requiredFields = ['status', 'timestamp', 'version', 'environment', 'mongodb', 'uptime'];

    requiredFields.forEach(field => {
      expect(response.body).toHaveProperty(field);
    });
  });
});
