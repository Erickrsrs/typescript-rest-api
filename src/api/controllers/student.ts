import { Request, Response } from 'express';
import { Student } from '../models/Student';

class StudentController {
  static async addStudent(req: Request, res: Response) {
    const newStudent = await Student.create({
      name: 'john',
      lastName: 'doe',
      email: 'johnDoe@email.com',
      age: 144,
    });
    res.json(newStudent);
  }
}

export default StudentController;
