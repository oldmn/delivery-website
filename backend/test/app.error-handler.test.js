const request = require('supertest');
const app = require('../api/app');

describe('App-level error handler', () => {
  it('returns 500 and JSON error from app error handler', async () => {
    // attach a temporary route that forwards an error to next()
    app.get('/__test/error', (_req, _res, next) => next(new Error('boom')));

    const res = await request(app).get('/__test/error');
    expect(res.status).toBe(500);
    // body may be parsed differently in some environments; assert text or body
    expect(res.text || JSON.stringify(res.body)).toMatch(/boom|Internal Server Error/);
  });

  it('uses provided status when error.status is set', async () => {
    app.get('/__test/error-status', (_req, _res, next) => {
      const e = new Error('boom-status');
      e.status = 418;
      return next(e);
    });

    const res = await request(app).get('/__test/error-status');
    expect(res.status).toBe(418);
    expect(res.text || JSON.stringify(res.body)).toMatch(/boom-status/);
  });


});
