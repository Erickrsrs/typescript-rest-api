import { Request, Response } from 'express';
import multer from 'multer';
import multerConfig from '../../config/multerConfig';
import { Photo } from '../models/Photo';
import { Student } from '../models/Student';

const upload = multer(multerConfig).single('photo');

class PhotoController {
  static create(req: Request, res: Response) {
    return upload(req, res, async err => {
      if (err) return res.status(400).json(err.field);
      if (!req.file) return res.status(400).json('File not found');
      try {
        const { originalname, filename } = req.file;
        const { studentId } = req.body;
        const photo = await Photo.create({ originalname, filename, studentId });
        const student = await Student.findById(studentId);

        student?.photos.push(photo);
        await student?.save();

        return res.json(photo);
      } catch (err) {
        return res.status(400).json(err);
      }
    });
  }

  static async index(req: Request, res: Response) {
    try {
      const photos = await Photo.find().sort({ created_at: 'desc' });
      return res.json(photos);
    } catch (err) {
      return res.status(500).json('Something is wrong');
    }
  }
}

export default PhotoController;
