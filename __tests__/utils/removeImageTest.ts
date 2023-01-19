import fs from 'fs';
import path, { resolve } from 'path';

export default function (fileName: string) {
  const filePath = resolve(`${path.resolve('uploads', 'images', fileName)}`);
  try {
    fs.unlinkSync(filePath);
  } catch (err) {
    console.error({ Error: err });
  }
}
