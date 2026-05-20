import * as Sentry from "@sentry/react";

export const initSentry = () => {
  if (import.meta.env.MODE === "development") return;
  if (!import.meta.env.VITE_SENTRY_DSN) return;

  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    environment: import.meta.env.MODE,
    release: import.meta.env.VITE_RELEASE,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: true,
        maskAllInputs: true,
        blockAllMedia: true,
        networkDetailAllowUrls: [],
      }),
    ],
    // Performance monitoring — capture 10% of transactions
    tracesSampleRate: 0.1,
    // Session replay — capture 5% of sessions, 100% of sessions with errors
    replaysSessionSampleRate: 0.05,
    replaysOnErrorSampleRate: 1.0,
  });
};
