import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import { extname, resolve } from 'path';
import fs from 'fs';

const randomNameComplement = () => Math.floor(Math.random() * 10000 + 10000);

const createUploadsDir = () => {
  const folderName = resolve(__dirname, '..', '..', 'uploads', 'images');
  try {
    fs.mkdirSync(folderName, { recursive: true });
  } catch (err) {
    return console.error(
      'Unable to create "uploads/images" directory, please create it so photos can be stored.',
      err,
    );
  }
};

export default {
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback,
  ) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg')
      return cb(
        new multer.MulterError(
          'LIMIT_UNEXPECTED_FILE',
          'Unsupported file type',
        ),
      );

    return cb(null, true);
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, '..', '..', 'uploads', 'images'));
    },
    filename: (req, file, cb) => {
      createUploadsDir(),
        cb(
          null,
          `${Date.now()}_${randomNameComplement()}${extname(
            file.originalname,
          )}`,
        );
    },
  }),
};
