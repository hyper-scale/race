import pino from "pino";

const logLevel = process.env.LOG_LEVEL ?? "debug";

// pino is a simple JSON logger with Datadog integration.
// By default it logs to STDOUT.
const logger = pino({
  browser: {
    transmit: {
      level: "info",
    },
  },
  level: logLevel,
  base: {
    env: process.env.NODE_ENV,
    revision: process.env.VERCEL_GITHUB_COMMIT_SHA,
  },
});

export default logger;
