import { Request, Response } from 'express';
import { Error } from 'mongoose';
import { Student } from '../models/Student';

class StudentController {
  static async create(req: Request, res: Response) {
    try {
      const newStudent = await Student.create(req.body);
      const { id, completeName, email, age } = newStudent;
      res.json({ id, completeName, email, age });
    } catch (err) {
      if (err instanceof Error.ValidationError) {
        res.status(400).json(err.message);
      } else {
        res.status(400).json(err);
      }
    }
  }

  static async index(req: Request, res: Response) {
    try {
      Student.find()
        .select('id completeName email age photos')
        .populate({
          path: 'photos',
          select: ['url', 'originalname', 'filename'],
          options: { sort: { created_at: 'desc' } },
        })
        .exec((err, photos) => {
          return res.json(photos);
        });
    } catch (err) {
      return res.status(500).json('Something is wrong');
    }
  }

  static async show(req: Request, res: Response) {
    try {
      const student = await Student.findById(req.params.id);
      if (!student) return res.status(401).json('Student does not exist');
      const { id, completeName, email, age, photos } = student;
      return res.json({ id, completeName, email, age, photos });
    } catch (err) {
      return res.status(400).json('Student not found');
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!student) return res.status(401).json('Student does not exist');
      const { id, completeName, email, age } = student;
      return res.json({ id, completeName, email, age });
    } catch (err) {
      if (err instanceof Error.ValidationError) {
        return res.status(400).json(err.message);
      } else {
        return res.status(400).json(err);
      }
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const student = await Student.findByIdAndDelete(req.params.id);
      if (!student) return res.status(401).json('Student does not exist');
      return res.json('Student deleted successfully');
    } catch (err) {
      return res.status(400).json('Student not found');
    }
  }
}

export default StudentController;
