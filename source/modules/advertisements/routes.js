import { Router } from 'express';
import { adapt } from '../../lib/express.js';
import { upload } from '../../lib/multer.js';
import { AdvertisementsController } from './controller.js';
import { Advertisement } from './model.js';
import { AdvertisementsService } from './service.js';

export const router = new Router();

const model = Advertisement;
const service = new AdvertisementsService(model);
const controller = new AdvertisementsController(service);

router.get('/', adapt({ controller, method: 'index' }));
router.get('/:id', adapt({ controller, method: 'show' }));
router.post('/', adapt({ controller, method: 'create' }));
router.post('/image', upload.single('image'), adapt({ controller, method: 'uploadImage' }));
