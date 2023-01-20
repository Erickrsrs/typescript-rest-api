import * as dotenv from 'dotenv';
dotenv.config();
import request from 'supertest';
import { connectDB, dropDB } from '../../__mocks__/mongooseMock';
import { User } from '../../src/api/models/User';
import app from '../../src/api/app';

const userPayload = {
  completeName: 'user',
  email: 'emailTest@email.com',
  password: '123456',
};

describe('index', () => {
  beforeAll(async () => {
    await connectDB();
    await User.create(userPayload);
  });
  afterAll(async () => {
    await dropDB();
  });

  it('should return a jwt token', async () => {
    const user = await User.findOne({ email: userPayload.email });
    const res = await request(app)
      .post('/token/')
      .send({ email: user?.email, password: userPayload.password });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ token: expect.any(String) });
  });

  it('should return a "Invalid credentials" error', async () => {
    const user = await User.findOne({ email: userPayload.email });
    const res = await request(app).post('/token/').send({ email: user?.email });
    expect(res.statusCode).toBe(401);
    expect(res.body).toEqual({ Error: 'Invalid credentials' });
  });

  it('should return a "User does not exist" error', async () => {
    const res = await request(app)
      .post('/token/')
      .send({ email: 'invalidEmail@email.com', password: 'invalidPassword' });
    expect(res.statusCode).toBe(401);
    expect(res.body).toEqual({ Error: 'User does not exist' });
  });

  it('should return a "Invalid password" error', async () => {
    const user = await User.findOne({ email: userPayload.email });
    const res = await request(app)
      .post('/token/')
      .send({ email: user?.email, password: 'invalidPassword' });
    expect(res.statusCode).toBe(401);
    expect(res.body).toEqual({ Error: 'Invalid password' });
  });
});
