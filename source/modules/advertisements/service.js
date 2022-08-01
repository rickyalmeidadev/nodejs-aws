import crypto from 'node:crypto';
import { BusinessError } from '../../utils/business.js';

export class AdvertisementsService {
  #model;
  #storage;

  constructor(model, storage) {
    this.#model = model;
    this.#storage = storage;
  }

  async find({ limit, skip, sort }) {
    const [advertisements, total] = await Promise.all([
      this.#model.find({}).sort(sort).skip(skip).limit(limit).lean(),
      this.#model.countDocuments(),
    ]);

    return { advertisements, total };
  }

  async findById(id) {
    const advertisement = await this.#model.findById(id).lean();

    return advertisement;
  }

  async create({ title, description, price, image_url }) {
    if (title.length > 80) {
      throw new BusinessError('title must be less than 80 characters');
    }

    if (description.length > 255) {
      throw new BusinessError('description must be less than 255 characters');
    }

    if (price <= 0) {
      throw new BusinessError('price must be greater than 0');
    }

    if (/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(image_url) === false) {
      throw new BusinessError('image_url must be a valid image URL');
    }

    const advertisement = new this.#model({ title, description, price, image_url });
    await advertisement.save();

    return advertisement;
  }

  async uploadImageToS3(file) {
    const FIVE_MEGABYTES = 5242880;

    if (file.size > FIVE_MEGABYTES) {
      throw new BusinessError('image must be less than 5MB');
    }

    const id = crypto.randomUUID();
    const extension = file.mimetype.split('/').at(1);
    const filename = `${id}.${extension}`;

    const url = await this.#storage.save({
      key: filename,
      body: file.buffer,
      contentType: file.mimetype,
    });

    return url;
  }
}
