import { startPrisma } from '@db/prisma.js';
import { $logger } from '@helpers/logger.js';
import $minio from '@helpers/storage.js';
import { startHono } from '@routes/index.js';

export const startServer = async () => {
  try {
    await $minio.init();
    // await startNeo4j();
    await startPrisma();
    await startHono();
  } catch (e) {
    $logger.error(e, 'server stopped');
  }
};
