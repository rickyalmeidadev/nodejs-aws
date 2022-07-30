import multer from 'multer';
import { BadRequestError } from '../utils/http.js';

const storage = multer.memoryStorage();

export const upload = multer({ storage });
