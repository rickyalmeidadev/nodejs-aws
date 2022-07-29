import { Advertisement } from './model.js';
import { BusinessError } from '../../errors/business.js';

export async function create({ title, description, price, image_url }) {
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

  const advertisement = new Advertisement({ title, description, price, image_url });
  await advertisement.save();

  return advertisement;
}
