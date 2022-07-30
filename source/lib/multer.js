import multer from 'multer';
import { BadRequestError } from '../errors/http.js';

const storage = multer.memoryStorage();

export const upload = multer({ storage });
