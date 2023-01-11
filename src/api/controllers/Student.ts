import { Request, Response } from 'express';
import { Error } from 'mongoose';
import { Student } from '../models/Student';

class StudentController {
  static async create(req: Request, res: Response) {
    try {
      const newStudent = await Student.create(req.body);
      res.json(newStudent);
    } catch (err) {
      if (err instanceof Error.ValidationError) {
        res.status(400).json(err.message);
      } else {
        res.status(400).json(err);
      }
    }
  }
}

export default StudentController;
