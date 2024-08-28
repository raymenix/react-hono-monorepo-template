export interface EnvConfig {
  RUN_ENV: 'dev' | 'test' | 'prod';

  PROJECT: string;

  API_PORT: number;
  API_URL: string;
  API_SECRET: string;
  API_SALT: number;

  WEBAPP_PORT: number;
  WEBAPP_URL: string;

  DB_PORT: number;
  DB_NAME: string;
  DB_USER: string;
  DB_PASS: string;

  MINIO_HOST: string;
  MINIO_REGION: string;
  MINIO_USER: number;
  MINIO_PORT: string;
  MINIO_ACCESS_KEY: string;
  MINIO_SECRET_KEY: string;
}
