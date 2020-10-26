import http from "http";
import express from "express";
import bodyParser from "body-parser";
import expressRequestId from "express-request-id";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import {
  asValue,
  createContainer,
  Lifetime,
  InjectionMode,
  asClass,
} from "awilix";
import { scopePerRequest } from "awilix-express";
import checkTraffic from "./middleware/checkTraffic";
import requestLogger from "./lib/requestLogger";
import config from "./config";
import { connectDB } from "./config/db";
import errorHandler from "./middleware/errorHandler";
import error404 from "./middleware/notFound";
import routes from "./routes";
import httpClient from "./lib/httpClient";

const { bodyLimit, allowedOrigins, logFormat } = config;

const app = express();
app.use(helmet());
const server = http.createServer(app);

app.use(expressRequestId());

// Parse application/json
app.use(
  bodyParser.json({
    limit: bodyLimit,
  }),
);

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true, limit: bodyLimit }));

// setup dependency injection
const container = createContainer({
  injectionMode: InjectionMode.PROXY,
});

container.register({
  httpClient: asValue(httpClient),
});

// Load all repositories
container.loadModules(
  [
    [
      "./repositories/*.js",
      {
        lifetime: Lifetime.SCOPED,
        register: asClass,
      },
    ],
  ],
  {
    // we want `AuthRepository` to be registered as `authRepository`.
    formatName: "camelCase",
    resolverOptions: {},
    cwd: __dirname,
  },
);

// Load all models
container.loadModules(
  [
    [
      "./models/*.js",
      {
        lifetime: Lifetime.SCOPED,
        register: asValue,
      },
    ],
  ],
  {
    cwd: __dirname,
  },
);

// Middleware to create a scope per request.
app.use(scopePerRequest(container));

app.use(requestLogger);

app.use(morgan(logFormat));

app.use((req, res, next) => {
  process.env.CLIENT_URL = req.headers.referer;
  next();
});

// Enable CORS
app.use(
  cors({
    origin: (origin, cb) => {
      if (allowedOrigins.trim() === "*") {
        cb(null, true);
      } else {
        const origins = allowedOrigins.split(",");
        if (origins.indexOf(origin) !== -1 || !origin) {
          cb(null, true);
        } else {
          cb(new Error(`Origin('${origin}') not allowed`, false));
        }
      }
    },
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  }),
);

// remove some headers here - Nginx will set them
app.use((req, res, next) => {
  res.removeHeader("Vary");
  res.removeHeader("Strict-Transport-Security");
  next();
});

// Prevents the server from crashing when experiencing too much traffic
app.use(checkTraffic);

// Mount API routes
app.use("/", routes);

// Handle 404's
app.use(error404);

// Error handling middleware
app.use(errorHandler);

server.on("close", () => container.dispose());

// Connect to database
connectDB(10, true);

export default server;
