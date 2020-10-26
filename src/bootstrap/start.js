import toobusy from "toobusy-js";
import server from "../app";
import config from "../config";
import logger from "../lib/logger";

const { port, applicationName, applicationVersion } = config;

server.listen(port, () => {
  logger.info(
    `${applicationName} v${applicationVersion} is now running on port ${port} in ${process.env.NODE_ENV} mode`,
  );
});

function gracefulShutdown() {
  // Prevent the server from receiving any more requests
  server.close((error) => {
    logger.info("Shutting down server");
    toobusy.shutdown();
    process.exit(error ? 1 : 0);
  });
}

process.on("SIGINT", gracefulShutdown);

process.on("SIGTERM", gracefulShutdown);
