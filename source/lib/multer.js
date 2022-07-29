import multer from 'multer';
import multerS3 from 'multer-s3';
import crypto from 'node:crypto';
import { BadRequestError } from '../errors/http.js';
import { s3 } from './s3.js';

export const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_STORAGE_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (request, file, callback) => {
      const extention = file.mimetype.split('/').at(1);
      const filename = crypto.randomUUID();

      callback(null, `${filename}.${extention}`);
    },
  }),
  fileFilter: (request, file, callback) => {
    const extention = file.mimetype.split('/').at(1);

    if (['jpg', 'jpeg', 'png', 'webp', 'avif', 'gif', 'svg'].includes(extention) === false) {
      return callback(new BadRequestError('invalid file type'));
    }

    callback(null, true);
  },
});
