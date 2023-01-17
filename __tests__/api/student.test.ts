import request from 'supertest';
import { connectDB, dropDB } from '../../__mocks__/mongooseMock';
import { Student } from '../../src/api/models/Student';
import app from '../../src/api/app';

describe('student', () => {
  beforeAll(async () => {
    await connectDB();
    await Student.create({
      completeName: 'John Doe',
      email: 'johnDoe@email.com',
      age: 144,
      password: '123123',
    });
  });
  afterAll(async () => {
    await dropDB();
  });

  it('should return array of students', async () => {
    const res = await request(app).get('/students/');
    expect(res.body).toEqual({
      students: [
        {
          _id: expect.any(String),
          completeName: 'John Doe',
          email: 'johnDoe@email.com',
          age: 144,
          photos: [],
        },
      ],
    });
  });
});
