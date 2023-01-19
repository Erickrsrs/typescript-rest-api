import request from 'supertest';
import { connectDB, dropDB } from '../../__mocks__/mongooseMock';
import generateTokenByEmail from '../../__mocks__/generateTokenMock';
import { User } from '../../src/api/models/User';
import app from '../../src/api/app';

const userPayload = {
  completeName: 'John Doe',
  email: 'johnDoe@email.com',
  password: '123123',
};

const userVerify = {
  _id: expect.any(String),
  completeName: 'John Doe',
  email: 'johnDoe@email.com',
};

const userUpdated = {
  id: expect.any(String),
  completeName: 'John Doe updated',
  email: 'emailToUpdateTest@email.com',
};

describe('user', () => {
  beforeAll(async () => {
    await connectDB();
  });
  afterAll(async () => {
    await dropDB();
  });

  it('should return a message and create a user', async () => {
    const res = await request(app).post('/users/').send(userPayload);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'User created successfully');
  });

  it('should return array of users', async () => {
    const res = await request(app).get('/users/');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      users: [userVerify],
    });
  });

  it('should return a user by id', async () => {
    const user = await User.find();
    const { id } = user[0];
    const res = await request(app).get(`/users/${id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      user: userVerify,
    });
  });

  it('should return a updated user', async () => {
    const token = await generateTokenByEmail('emailToUpdateTest@email.com');
    const res = await request(app)
      .put(`/users/`)
      .send({
        completeName: 'John Doe updated',
      })
      .set('Authorization', `Bearer ${token.body.token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      user: userUpdated,
    });
  });

  it('should delete and return a message and a user deleted', async () => {
    const token = await generateTokenByEmail('emailToDeleteTest@email.com');
    const res = await request(app)
      .delete(`/users/`)
      .set('Authorization', `Bearer ${token.body.token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'User deleted successfully');
  });
});
