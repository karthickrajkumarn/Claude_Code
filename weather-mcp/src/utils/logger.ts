/**
 * Pino logger configuration
 */

import pino from 'pino';
import { config } from '../config.js';

const isDevelopment = process.env.NODE_ENV !== 'production';

export const logger = pino({
  level: config.LOG_LEVEL,
  transport: isDevelopment
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname',
        },
      }
    : undefined,
  name: 'weather-mcp',
  formatters: {
    level: (label) => {
      return { level: label };
    },
  },
});
