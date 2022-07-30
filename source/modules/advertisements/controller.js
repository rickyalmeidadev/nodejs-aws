import { BadRequestError } from '../../errors/http.js';
import { createPaginationArguments, createSortArguments } from '../../utils/query.js';
import * as AdvertisementsService from './service.js';

export async function index(request, response) {
  const { limit, skip } = createPaginationArguments({
    page: request.query.page,
    per_page: request.query.per_page,
  });

  const { sort } = createSortArguments({ sort_by: request.query.sort_by });

  const { advertisements, total } = await AdvertisementsService.index({ limit, skip, sort });

  return response.set('X-Total-Count', total).status(200).json(advertisements);
}

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
  if (!request.file) {
    throw new BadRequestError('image is required');
  }

  const extension = request.file.mimetype.split('/').at(1);

  if (['jpg', 'jpeg', 'png', 'webp', 'avif', 'gif', 'svg'].includes(extension) === false) {
    throw new BadRequestError('invalid file type');
  }

  const url = await AdvertisementsService.image(request.file);

  return response.status(201).json({ image_url: url });
}
