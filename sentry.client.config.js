// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';
import { BrowserTracing } from "@sentry/tracing";

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn: SENTRY_DSN || 'https://df2bcdbf136041488e34d10e3a53a650@o1188525.ingest.sentry.io/6308592',
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 0.25,
  beforeBreadcrumb(breadcrumb, hint) {
    if (breadcrumb.category === 'console') {
      return null
    }
    return breadcrumb
  },
  // integrations: [
  //   new BrowserTracing({
  //     tracingOrigins: ["http://localhost:1337/graphql"],
  //   }),
  // ],
  // ...
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});
