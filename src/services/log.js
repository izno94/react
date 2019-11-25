import * as Sentry from "@sentry/browser";

function init() {
  Sentry.init({
    dsn: "xxxxxxxxxxxxxxxxxxxxxxx-creer-projet-sur-sentry.io",
    release: "1.0.0"
  });
}

function log(messageErreur) {
  Sentry.withScope(scope => {
    scope.setExtra("formation", "React");
    Sentry.captureMessage(messageErreur);
  });
}

export default {
  init,
  log
};
