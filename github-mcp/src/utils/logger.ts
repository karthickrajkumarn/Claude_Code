import pino from "pino";
import { config } from "../config.js";

export const createLogger = (name: string) => {
  return pino({
    level: config.LOG_LEVEL,
    name,
    ...(config.DEBUG && {
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "HH:MM:ss Z",
          ignore: "pid,hostname",
        },
      },
    }),
  });
};
