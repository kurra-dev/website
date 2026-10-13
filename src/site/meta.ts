import { i18n } from "@lingui/core";
import { msg } from "@lingui/core/macro";

const TITLE = msg`Kurra: a caching gateway for package registries`;
const DESCRIPTION = msg`Point your package managers at Kurra. Every package is Allowed or Blocked, and the reason is recorded.`;
const FEATURES_TITLE = msg`Kurra features`;
const FEATURES_DESCRIPTION = msg`See what the open source version of Kurra includes and what Enterprise adds, from package policy to identity and audit.`;
const NOT_FOUND_TITLE = msg`Page not found`;

/** Title and description of the home page in the active language. */
export function homeMeta() {
  return { title: i18n._(TITLE), description: i18n._(DESCRIPTION) };
}

/** Title and description of the features page. */
export function featuresMeta() {
  return { title: i18n._(FEATURES_TITLE), description: i18n._(FEATURES_DESCRIPTION) };
}

/** Title of the not-found page in the active language. */
export function notFoundMeta() {
  return { title: i18n._(NOT_FOUND_TITLE) };
}
