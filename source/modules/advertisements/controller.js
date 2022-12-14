import { BadRequestError, CreatedResponse, NotFoundError, OkResponse } from '../../utils/http.js';
import { createPaginationArguments, createSortArguments } from '../../utils/query.js';

export class AdvertisementsController {
  #service;

  constructor(service) {
    this.#service = service;
  }

  async index(request) {
    const { limit, skip } = createPaginationArguments({
      page: request.query.page,
      per_page: request.query.per_page,
    });

    const { sort } = createSortArguments({ sort_by: request.query.sort_by });

    const { advertisements, total } = await this.#service.find({ limit, skip, sort });

    return new OkResponse(advertisements, { 'X-Total-Count': total });
  }

  async show(request) {
    const advertisement = await this.#service.findById(request.params.id);

    if (advertisement === null) {
      throw new NotFoundError('advertisement not found');
    }

    return new OkResponse(advertisement);
  }

  async create(request) {
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

    const advertisement = await this.#service.create({
      title: request.body.title,
      description: request.body.description,
      price: request.body.price,
      image_url: request.body.image_url,
    });

    return new CreatedResponse(advertisement);
  }

  async uploadImage(request) {
    if (!request.file) {
      throw new BadRequestError('image is required');
    }

    const extension = request.file.mimetype.split('/').at(1);

    if (['jpg', 'jpeg', 'png', 'webp', 'avif', 'gif', 'svg'].includes(extension) === false) {
      throw new BadRequestError('invalid file type');
    }

    const url = await this.#service.uploadImageToS3(request.file);

    return new CreatedResponse({ image_url: url });
  }
}
