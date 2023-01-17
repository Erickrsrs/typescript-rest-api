import request from 'supertest';
import app from '../../src/api/app';

describe('index', () => {
  it('should return true', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ healthCheck: true });
  });
});
