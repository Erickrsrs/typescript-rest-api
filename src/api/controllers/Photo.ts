import { Request, Response } from 'express';
import { Error } from 'mongoose';
import multer from 'multer';
import multerConfig from '../../config/multerConfig';
import { Photo } from '../models/Photo';
import { Student } from '../models/Student';

const upload = multer(multerConfig).single('photo');

class PhotoController {
  static create(req: Request, res: Response) {
    return upload(req, res, async err => {
      if (err) return res.status(400).json({ Error: err.field });
      if (!req.file) return res.status(400).json({ Error: 'File not found' });
      try {
        const { originalname, filename } = req.file;
        const { studentId } = req.body;
        const photo = await Photo.create({ originalname, filename, studentId });
        const student = await Student.findById(studentId);

        student?.photos.push(photo);
        await student?.save();

        return res.json({
          message: 'Photo created successfully',
          photo: photo,
        });
      } catch (err) {
        if (err instanceof Error.ValidationError) {
          return res.status(400).json({ Error: err.message });
        } else {
          return res.status(400).json({ Error: err });
        }
      }
    });
  }

  static async index(req: Request, res: Response) {
    try {
      const photos = await Photo.find()
        .select('id originalname filename studentId')
        .sort({ created_at: 'desc' });
      return res.json({ photos });
    } catch (err) {
      return res.status(500).json({ Error: 'Something went wrong' });
    }
  }
}

export default PhotoController;
