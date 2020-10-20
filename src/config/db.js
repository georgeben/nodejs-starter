/**
 * @module config/db
 * @description Configures connection to MongoDB
 */
import mongoose from "mongoose";
import beautifyUnique from "mongoose-beautiful-unique-validation";
import mongoosePaginate from "mongoose-paginate-v2";
import config from ".";
import logger from "../lib/logger";

const {
  dbName,
  mongooseDebugMode,
  connectionString,
  connectionPoolSize,
  dbUser,
  dbPassword,
} = config;

mongoose.Promise = global.Promise;
mongoose.plugin(beautifyUnique);
mongoose.plugin(mongoosePaginate);
mongoose.set("debug", mongooseDebugMode);

/**
 * Connects to MongoDB
 * @param {Number} poolSize - Number of connection pools
 * @param {Boolean} [autoIndex=true] - Enables automatic creating of indexes
 */
export function connectDB(poolSize = connectionPoolSize, autoIndex = true, maxARetryAttempts = 5) {
  const options = {
    poolSize, // Amount of concurrent socket connections,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    autoIndex,
    ssl: ["staging", "production"].indexOf(process.env.NODE_ENV) !== -1,
    dbName,
  };

  if (
    process.env.MONGO_DB_AUTH === "true"
    && ["staging", "production"].indexOf(process.env.NODE_ENV) !== -1
  ) {
    options.user = dbUser;
    options.pass = dbPassword;
  }
  // eslint-disable-next-line no-unused-vars
  return new Promise((resolve, reject) => {
    let attempts = 1;
    const connectWithRetry = (databaseUri, connectionOptions) => {
      logger.info("Attempting to connect to MongoDB");
      return mongoose
        .connect(databaseUri, connectionOptions)
        .then((conn) => {
          logger.info("Successfully connected to MongoDB");
          resolve(conn);
        })
        .catch((err) => {
          logger.error(
            "Error: The server was not able to connect to MongoDB.",
            {
              error: err,
            },
          );
          attempts += 1;
          if (attempts > maxARetryAttempts) {
            logger.error("Exhausted max retries for database connection");
            process.exit(1);
          }
          logger.info(
            `Retrying to connect to MongoDB. Retry count: ${attempts}`,
          );
          setTimeout(
            () => connectWithRetry(databaseUri, connectionOptions),
            attempts * 1000,
          );
        });
    };
    return connectWithRetry(connectionString, options);
  });
}
