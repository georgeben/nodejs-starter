/**
 * Configures a logger for recording all requests made to the server
 */
/* eslint-disable security/detect-non-literal-fs-filename */

import morgan from "morgan";
import fs from "fs";
import mkdirp from "mkdirp";
import FileStreamRotator from "file-stream-rotator";

const logDirectory = "./logs/access";
const logsDirectoryExists = fs.existsSync(logDirectory);

if (!logsDirectoryExists) {
  mkdirp.sync(logDirectory);
}

const accessLogStream = FileStreamRotator.getStream({
  date_format: "YYYYMMDD",
  filename: `${logDirectory}/access-%DATE%.log`,
  frequency: "daily",
  verbose: false,
});

// eslint-disable-next-line max-len
const format = ":requestId :remote-addr - :remote-user [:date[clf]] \":method :url HTTP/:http-version\" :status :res[content-length] \":referrer\" \":user-agent\"";
morgan.token("requestId", (request) => request.id);

export default morgan(format, {
  stream: accessLogStream,
});
