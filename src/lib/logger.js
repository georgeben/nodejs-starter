/**
 * @module lib/logger
 * @description Configures a custom logger for logging errors, and results of certain operations.
 */

import winston, { format } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

/**
 * Stores all the log messages emitted by the server
 */
const serverLogTransport = new DailyRotateFile({
  filename: "server-%DATE%.log",
  maxFiles: "30d",
  dirname: "./logs/server",
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.json(),
  ),
});

/**
 * Stores all the error log messages emitted by the server
 * i.e log messages with level set to error
 */
const errorLogTransport = new DailyRotateFile({
  level: "error",
  filename: "error-%DATE%.log",
  maxFiles: "30d",
  dirname: "./logs/errors",
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.json(),
  ),
});

const logger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.Console({
      format: format.combine(
        winston.format.colorize(),
        format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss",
        }),
        format.simple(),
      ),
    }),
    serverLogTransport,
    errorLogTransport,
  ],
  // Stores all uncaught exceptions
  exceptionHandlers: [
    new winston.transports.File({
      filename: "exceptions.log",
      dirname: "./logs",
    }),
  ],
});

export default logger;
