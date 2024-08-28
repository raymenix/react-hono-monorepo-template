import { $logger } from '@helpers/logger.js';
import { logger } from 'hono/logger';

export default logger((str, ...rest) => $logger.info(str, ...rest));
