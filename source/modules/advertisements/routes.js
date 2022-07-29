import { Router } from 'express';
import { upload } from '../../lib/multer.js';
import * as AdvertisementsController from './controller.js';

export const router = new Router();

router.post('/', AdvertisementsController.create);
router.post('/image', upload.single('image'), AdvertisementsController.image);