import { Client } from 'minio';
import $env from '@cfg/config.js';

const endPoint = $env('MINIO_HOST');
const port = Number($env('MINIO_PORT'));
const accessKey = $env('MINIO_ACCESS_KEY');
const secretKey = $env('MINIO_SECRET_KEY');
const region = $env('MINIO_REGION');
const project = $env('PROJECT');

const minioClient = new Client({
  endPoint,
  port,
  accessKey,
  secretKey,
  region,
  useSSL: false,
});

const policy = {
  Version: '2012-10-17',
  Statement: [
    {
      Effect: 'Allow',
      Action: ['s3:GetObject'],
      Resource: [`arn:aws:s3:::${project}/*`],
      Principal: '*',
    },
  ],
};

const init = async () => {
  // check if bucket exists
  const bucketExists = await minioClient.bucketExists(project);
  if (bucketExists) {
    return;
  }

  await minioClient.makeBucket(project, region);
  await minioClient.setBucketPolicy(project, JSON.stringify(policy));
};

const upload = async (file: Buffer, uuid: string, category: string) => {
  await minioClient.putObject(project, `${category}/${uuid}`, file);
};

const get = async (uuid: string, category: string) => {
  return await minioClient.getObject(project, `${category}/${uuid}`);
};

const url = (uuid: string, category: string, expiry?: number) => {
  return minioClient.presignedUrl('GET', project, `${category}/${uuid}`, expiry);
};

const $minio = {
  init,
  upload,
  get,
  url,
};

export default $minio;
