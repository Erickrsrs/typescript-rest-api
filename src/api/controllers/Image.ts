import { Request, Response } from 'express';
import multer from 'multer';
import multerConfig from '../../config/multerConfig';

const upload = multer(multerConfig).single('photo');

class ImageController {
  static async create(req: Request, res: Response) {
    return upload(req, res, err => {
      if (err) return res.status(400).json(err.field);
      return res.json(req.file);
    });
  }
}

export default ImageController;
