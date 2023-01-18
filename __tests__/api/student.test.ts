import request from 'supertest';
import { connectDB, dropDB } from '../../__mocks__/mongooseMock';
import loginRequiredMock from '../../__mocks__/loginRequiredMock';
import { Student } from '../../src/api/models/Student';
loginRequiredMock(); // set middleware mock before app instance
import app from '../../src/api/app';

describe('student', () => {
  beforeAll(async () => {
    await connectDB();
  });
  afterAll(async () => {
    await dropDB();
  });

  it('should return a message and create a student', async () => {
    const res = await request(app).post('/students/').send({
      completeName: 'John Doe',
      email: 'johnDoe@email.com',
      age: 144,
      password: '123123',
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Student created successfully');
  });

  it('should return array of students', async () => {
    const res = await request(app).get('/students/');
    expect(res.statusCode).toBe(200);
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

  it('should return a student by id', async () => {
    const student = await Student.find();
    const { id } = student[0];
    const res = await request(app).get(`/students/${id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      student: {
        _id: expect.any(String),
        completeName: 'John Doe',
        email: 'johnDoe@email.com',
        age: 144,
        photos: [],
      },
    });
  });

  it('should return a updated student', async () => {
    const student = await Student.find();
    const { id } = student[0];
    const res = await request(app).put(`/students/${id}`).send({
      completeName: 'John Doe updated',
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      student: {
        id: expect.any(String),
        completeName: 'John Doe updated',
        email: 'johnDoe@email.com',
        age: 144,
      },
    });
  });

  it('should delete and return a message and a student deleted', async () => {
    const student = await Student.find();
    const { id } = student[0];
    const res = await request(app).delete(`/students/${id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Student deleted successfully');
  });
});
