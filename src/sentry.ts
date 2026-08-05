import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://0799c83f2e95df351bf0eba90c70e47d@o4511859020267520.ingest.us.sentry.io/4511859071844352",
  dataCollection: {
    // To disable sending user data and HTTP bodies, uncomment the lines below. For more info visit:
    // https://docs.sentry.io/platforms/javascript/guides/react/configuration/options/#dataCollection
    // userInfo: false,
    // httpBodies: []
  }
});