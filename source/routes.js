import { Router } from 'express';
import * as AdvertisementsRoutes from './modules/advertisements/routes.js';

export const router = new Router();

router.use('/advertisements', AdvertisementsRoutes.router);
