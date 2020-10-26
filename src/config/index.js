/**
 * @module config/index
 * @description Loads environment variables that would be used across the app
 */
import env from "dotenv-extended";
import fs from "fs";

let envFile;

// Load appropriate env file for the environment
switch (process.env.NODE_ENV) {
  case "development":
    envFile = ".env.local";
    break;
  case "test":
    envFile = ".env.test";
    break;
  case "production":
    envFile = ".env.production";
    break;
  default:
    throw new Error("Invalid NODE_ENV. Ensure the NODE_ENV environment variable is set");
}

const envOptions = {
  errorOnMissing: process.env.NODE_ENV === "production",
  includeProcessEnv: true,
};

// eslint-disable-next-line security/detect-non-literal-fs-filename
if (fs.existsSync(envFile)) {
  envOptions.path = envFile;
}

env.load(envOptions);

const packageJson = require("../../package.json");

const { name, version } = packageJson;

const commonConfig = {
  connectionPoolSize: 20,
  port: process.env.PORT || 3001,
  bodyLimit: process.env.BODY_LIMIT || "20kb",
  allowedOrigins: process.env.ALLOWED_ORIGINS || "*",
  applicationName: name,
  applicationVersion: version,
  jwtSecret: process.env.JWT_SECRET,
  jwtIssuer: process.env.JWT_ISSUER,
  jwtAudience: process.env.JWT_AUDIENCE,
  clientUrl: process.env.CLIENT_URL || "",
};

export default {
  development: {
    ...commonConfig,
    dbName: process.env.DATABASE_NAME,
    mongooseDebugMode: true,
    connectionString: process.env.DEV_DATABASE_URI,
    dbUser: encodeURIComponent(process.env.DATABASE_USER),
    dbPassword: encodeURIComponent(process.env.DATABASE_PASSWORD),
    dbHost: process.env.DATABASE_HOST || "127.0.0.1",
    dbPort: process.env.DATABASE_PORT || 27017,
    mongoAuth: process.env.MONGO_DB_AUTH,
    logFormat: "dev",
  },
  test: {
    ...commonConfig,
    dbName: process.env.TEST_DATABASE_NAME,
    mongooseDebugMode: false,
    connectionString: process.env.TEST_DATABASE_URI,
    dbUser: encodeURIComponent(process.env.TEST_DATABASE_USER),
    dbPassword: encodeURIComponent(process.env.TEST_DATABASE_PASSWORD),
    dbHost: process.env.DATABASE_HOST,
    dbPort: process.env.DATABASE_PORT || 27017,
    logFormat: "dev",
  },
  production: {
    ...commonConfig,
    dbName: process.env.DATABASE_NAME,
    mongooseDebugMode: false,
    dbUser: encodeURIComponent(process.env.DATABASE_USER),
    dbPassword: encodeURIComponent(process.env.DATABASE_PASSWORD),
    dbHost: process.env.DATABASE_HOST,
    dbPort: process.env.DATABASE_PORT || 27017,
    connectionString: `mongodb+srv://${encodeURIComponent(
      process.env.DATABASE_USER,
    )}:${encodeURIComponent(process.env.DATABASE_PASSWORD)}@${
      process.env.DATABASE_HOST
    }/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`,
    mongoAuth: process.env.MONGO_DB_AUTH,
    logFormat: "combined",
  },
}[process.env.NODE_ENV || "development"];
