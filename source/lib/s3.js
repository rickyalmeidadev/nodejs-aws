import aws from 'aws-sdk';

export const s3 = new aws.S3({
  region: process.env.AWS_REGION_NAME,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
