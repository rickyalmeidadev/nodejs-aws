import { BadRequestError } from '../../errors/http.js';
import * as AdvertisementsService from './service.js';

export async function create(request, response) {
  for (const key of ['title', 'description', 'price', 'image_url']) {
    if (!request.body[key]) {
      throw new BadRequestError(`${key} is required`);
    }
  }

  for (const key of ['title', 'description', 'image_url']) {
    if (typeof request.body[key] !== 'string') {
      throw new BadRequestError(`${key} must be a string`);
    }
  }

  if (typeof request.body.price !== 'number') {
    throw new BadRequestError('price must be a number');
  }

  const advertisement = await AdvertisementsService.create({
    title: request.body.title,
    description: request.body.description,
    price: request.body.price,
    image_url: request.body.image_url,
  });

  return response.status(201).json(advertisement);
}

export async function image(request, response) {
  return response.status(201).json({ image_url: request.file.location });
}
