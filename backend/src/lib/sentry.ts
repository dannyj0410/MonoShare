import * as Sentry from "@sentry/node";

export const initSentry = () => {
  if (process.env.NODE_ENV !== "production") return;
  if (!process.env.SENTRY_DSN) {
    console.warn("SENTRY_DSN not set, Sentry disabled");
    return;
  }

  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: "production",
    tracesSampleRate: 0.1,
    // Ignore operational errors that aren't bugs
    ignoreErrors: ["AppError"],
  });
};

export { Sentry };
