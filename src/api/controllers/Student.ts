import { Request, Response } from 'express';
import { Error } from 'mongoose';
import { Student } from '../models/Student';
import { Photo } from '../models/Photo';

class StudentController {
  static async create(req: Request, res: Response) {
    try {
      const student = await Student.create(req.body);
      const { id, completeName, email, age } = student;
      return res.json({
        message: 'Student created successfully',
        student: { id, completeName, email, age },
      });
    } catch (err) {
      if (err instanceof Error.ValidationError) {
        return res.status(400).json({ Error: err.message });
      } else {
        return res.status(400).json({ Error: err });
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
        .exec((err, students) => {
          return res.json({ students });
        });
    } catch (err) {
      return res.status(500).json({ Error: 'Something went wrong' });
    }
  }

  static async show(req: Request, res: Response) {
    try {
      Student.findById(req.params.id)
        .select('id completeName email age photos')
        .populate({
          path: 'photos',
          select: ['url', 'originalname', 'filename'],
          options: { sort: { created_at: 'desc' } },
        })
        .exec((err, student) => {
          return res.json({ student });
        });
    } catch (err) {
      return res.status(400).json({ Error: 'Student not found' });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      if (req.body.id && req.body.id !== req.userId) {
        return res.status(400).json({ Error: 'You cannot change your id' });
      }
      const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!student)
        return res.status(400).json({ Error: 'Student does not exist' });
      const { id, completeName, email, age } = student;
      return res.json({ student: { id, completeName, email, age } });
    } catch (err) {
      if (err instanceof Error.ValidationError) {
        return res.status(400).json({ Error: err.message });
      } else {
        return res.status(400).json({
          Error:
            'You can change the following parameters: completeName, email and age',
        });
      }
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const student = await Student.findByIdAndDelete(req.params.id);
      if (!student)
        return res.status(400).json({ Error: 'Student does not exist' });
      const { id, completeName, email, age } = student;
      await Photo.deleteMany({ studentId: req.params.id });
      return res.json({
        message: 'User deleted successfully',
        student: { id, completeName, email, age },
      });
    } catch (err) {
      return res.status(500).json({ Error: 'Something went wrong' });
    }
  }
}

export default StudentController;
