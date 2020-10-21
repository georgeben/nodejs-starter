/**
 * Error handling middleware
 */
import util from "util";
import fs from "fs";
import HttpStatus from "http-status-codes";
import ResponseManager from "../helpers/response";
import logger from "../lib/logger";

// eslint-disable-next-line security/detect-non-literal-fs-filename
const unlink = util.promisify(fs.unlink);

// eslint-disable-next-line no-unused-vars
export default async (err, req, res, next) => {
  if (err.status && err.status >= 500) {
    // TODO Report to Sentry
    logger.error("---------------START OF ERROR(S)---------------------");
    logger.error(`An error occurred for request ${req.id}`, err);
    logger.error("---------------END OF ERROR(S)-----------------------");
  }
  const { file } = req;
  if (file) {
    const { path } = file;
    if (file.path) {
      await unlink(path);
    }
  }

  if (err.name || err.error) {
    if (err.name === "ValidationError" || (err.error && err.error.name === "ValidationError")) {
      return ResponseManager.getResponseHandler(res).onError(
        err.name || err.error.name,
        HttpStatus.BAD_REQUEST,
        err.message || err.error.toString(),
        err.errors || err.error.details,
      );
    }
    return ResponseManager.getResponseHandler(res).onError(
      err.name,
      err.status,
      err.message,
      err.data,
    );
  }
  const errorMessage = process.env.NODE_ENV === "production"
    ? "Something bad happened!"
    : err.message;
  const errorData = process.env.NODE_ENV === "production" ? {} : err.data;
  return ResponseManager.getResponseHandler(res).onError(
    "InternalServerError",
    err.status || HttpStatus.INTERNAL_SERVER_ERROR,
    errorMessage,
    errorData,
  );
};
