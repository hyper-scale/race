// @ts-check
"use strict";

import logger from "./utils/logger";

/**
 * Set up datadog tracing. This should be called first, so Datadog can hook
 * all the other dependencies like `http`.
 */
function setUpDatadogTracing() {
  const { tracer: Tracer } = require("dd-trace");
  const tracer = Tracer.init({
    // Your options here.
    runtimeMetrics: true,
    logInjection: true,
  });
}

/**
 * Set up logging. Monkey patches a bunch of stuff.
 */
function setUpLogging() {
  function getLoggingFunction(/** @type {string} */ levelName) {
    const baseLogFn = (logger[levelName] || logger.info).bind(logger);
    return function patchedLog(/** @type {any[]} */ ...parts) {
      /** @type {object | undefined} */
      let data = undefined;
      /** @type {object | undefined} */
      let error = undefined;

      /** @type {object | undefined} */
      const nativeError = parts.find(
        (it) => (it && it instanceof Error) || (it && typeof it === "object" && "name" in it && "message" in it)
      );

      if (nativeError) {
        error = cleanObjectForSerialization(nativeError);
        // If you use Sentry, Rollbar, etc, you could capture the error here.
        // ErrorThingy.report(nativeError)
      }

      // If next is trying to log funky stuff, put it into the data object.
      if (parts.length > 1) {
        data = data || {};
        data.parts = parts.map((part) => cleanObjectForSerialization(part));
      }

      const messages = nativeError && parts.length === 1 ? [nativeError.toString()] : parts;

      baseLogFn({ data, error, type: levelName }, ...messages);
    };
  }

  // Monkey-patch Next.js logger.
  // See https://github.com/atkinchris/next-logger/blob/main/index.js
  // See https://github.com/vercel/next.js/blob/canary/packages/next/build/output/log.ts
  const nextBuiltInLogger = require("next/dist/build/output/log");
  for (const [property, value] of Object.entries(nextBuiltInLogger)) {
    if (typeof value !== "function") {
      continue;
    }

    nextBuiltInLogger[property] = getLoggingFunction(property);
  }

  /**
   * Monkey-patch global console.log logger. Yes. Sigh.
   * @type {Array<keyof typeof console>}
   */
  const loggingProperties = ["log", "debug", "info", "warn", "error"];
  for (const property of loggingProperties) {
    console[property] = getLoggingFunction(property);
  }

  // Add general error logging.
  process.on("unhandledRejection", (error, promise) => {
    logger.error(
      {
        type: "unhandledRejection",
        error: cleanObjectForSerialization(error),
        data: { promise: cleanObjectForSerialization(promise) },
      },
      `${error}`
    );
  });

  process.on("uncaughtException", (error) => {
    logger.error({ type: "uncaughtException", error: cleanObjectForSerialization(error) }, `${error}`);
  });
}

function cleanObjectForSerialization(value) {
  const klona = require("klona/json").klona;
  const retval = klona(value);
  const seen = new WeakSet();

  function recusivelyRemoveCircularReferences(obj) {
    seen.add(obj);
    for (let [k, v] of Object.entries(obj)) {
      if (typeof v !== "object") continue;
      if (seen.has(v)) delete obj[k];
      else recusivelyRemoveCircularReferences(v);
    }
  }
  recusivelyRemoveCircularReferences(retval);
  return retval;
}

setUpDatadogTracing();
setUpLogging();
