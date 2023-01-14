import { Request, Response } from 'express';
import multer from 'multer';
import multerConfig from '../../config/multerConfig';
import { Photo } from '../models/Photo';

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

        return res.json(photo);
      } catch (err) {
        return res.status(400).json('Student not found');
      }
    });
  }
}

export default PhotoController;
