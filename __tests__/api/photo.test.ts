import request from 'supertest';
import path from 'path';
import { connectDB, dropDB } from '../../__mocks__/mongooseMock';
import loginRequiredMock from '../../__mocks__/loginRequiredMock';
import removeImageTest from '../utils/removeImageTest';
import { Student } from '../../src/api/models/Student';
import { Photo } from '../../src/api/models/Photo';
loginRequiredMock(); // set middleware mock before app instance
import app from '../../src/api/app';

const photoVerify = {
  _id: expect.any(String),
  originalname: 'image-test.jpg',
  filename: expect.any(String),
  studentId: expect.any(String),
  url: expect.any(String),
};

const studentPayload = {
  completeName: 'John Doe',
  email: 'johnDoe@email.com',
  age: 144,
  password: '123123',
};

describe('photo', () => {
  beforeAll(async () => {
    await connectDB();
  });
  afterAll(async () => {
    await dropDB();
    const photo = await Photo.find();
    removeImageTest(photo[0].filename);
  });

  it('should return a message and create a photo', async () => {
    const student = await Student.create(studentPayload);
    const res = await request(app)
      .post('/photo/')
      .field('studentId', student.id)
      .attach(
        'photo',
        `${path.resolve('__tests__', 'utils', 'image-test.jpg')}`,
      );
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Photo created successfully');
  });

  it('should return array of photos', async () => {
    const res = await request(app).get('/photo/');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      photos: [photoVerify],
    });
  });
});
