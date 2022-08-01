import { Router } from 'express';
import { adapt } from '../../libraries/express.js';
import { upload } from '../../libraries/multer.js';
import { S3Storage } from '../../libraries/s3.js';
import { AdvertisementsController } from './controller.js';
import { Advertisement } from './model.js';
import { AdvertisementsService } from './service.js';

export const router = new Router();

const model = Advertisement;
const storage = new S3Storage();
const service = new AdvertisementsService(model, storage);
const controller = new AdvertisementsController(service);

router.get('/', adapt({ controller, method: 'index' }));
router.get('/:id', adapt({ controller, method: 'show' }));
router.post('/', adapt({ controller, method: 'create' }));
router.post('/image', upload.single('image'), adapt({ controller, method: 'uploadImage' }));
