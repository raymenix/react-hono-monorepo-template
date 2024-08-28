import { $logger } from '@helpers/logger.js';
import { PrismaClient } from '@prisma/client';

export const $prisma = new PrismaClient();

export default $prisma;

export const startPrisma = async () => {
  await $prisma.$connect();

  $logger.info('connected prisma client');
};

export const stopPrisma = async () => {
  await $prisma.$disconnect();

  $logger.warn('disconnected prisma client');
};
