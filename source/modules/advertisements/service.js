import crypto from 'node:crypto';
import { Advertisement } from './model.js';
import { BusinessError } from '../../errors/business.js';
import { s3 } from '../../lib/s3.js';

export async function index({ limit, skip, sort }) {
  const [advertisements, total] = await Promise.all([
    Advertisement.find().sort(sort).limit(limit).skip(skip),
    Advertisement.countDocuments(),
  ]);

  return { advertisements, total };
}

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

export async function image(file) {
  const FIVE_MEGABYTES = 5242880;

  if (file.size > FIVE_MEGABYTES) {
    throw new BusinessError('image must be less than 5MB');
  }

  const id = crypto.randomUUID();
  const extension = file.mimetype.split('/').at(1);
  const filename = `${id}.${extension}`;

  const params = {
    Bucket: process.env.AWS_STORAGE_BUCKET_NAME,
    Key: filename,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  const response = await s3.upload(params).promise();

  return response.Location;
}
