import aws from 'aws-sdk';

export class S3Storage {
  #client = new aws.S3({
    region: process.env.AWS_REGION_NAME,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  constructor(bucket = process.env.AWS_STORAGE_BUCKET_NAME) {
    this.bucket = bucket;
  }

  async save({ key, body, contentType }) {
    const params = {
      Bucket: this.bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
    };

    const response = await this.#client.upload(params).promise();

    return response.Location;
  }
}
