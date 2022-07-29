import mongoose from 'mongoose';

export const Advertisement = mongoose.model(
  'Advertisement',
  new mongoose.Schema(
    {
      title: String,
      description: String,
      price: Number,
      image_url: String,
    },
    {
      timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      },
    }
  )
);
