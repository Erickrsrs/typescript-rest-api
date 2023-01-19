import * as dotenv from 'dotenv';
dotenv.config();
import request from 'supertest';
import app from '../src/api/app';
import { User } from '../src/api/models/User';

export default async (email: string) => {
  await User.create({
    completeName: 'user',
    email,
    password: '123456',
  });
  return await request(app).post('/token/').send({ email, password: '123456' });
};
