import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export const s3Client = new S3Client({
  region: "us-east-1",
  endpoint: process.env.S3_ENDPOINT, // LocalStack
  credentials: {
    accessKeyId: "test",
    secretAccessKey: "test"
  },
  forcePathStyle: true
});

export const uploadReceiptToS3 = async (receipt, orderId) => {
  const key = `receipts/order_${orderId}.json`;

  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: key,
    Body: JSON.stringify(receipt, null, 2),
    ContentType: "application/json"
  });

  await s3Client.send(command);

  return key;
};
