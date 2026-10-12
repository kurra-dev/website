import { i18n } from "@lingui/core";
import { msg } from "@lingui/core/macro";

const TITLE = msg`Kurra: a caching gateway for package registries`;
const DESCRIPTION = msg`Point your package managers at Kurra. Every package is Allowed or Blocked, and the reason is recorded.`;
const NOT_FOUND_TITLE = msg`Page not found`;

/** Title and description of the home page in the active language. */
export function homeMeta() {
  return { title: i18n._(TITLE), description: i18n._(DESCRIPTION) };
}

/** Title of the not-found page in the active language. */
export function notFoundMeta() {
  return { title: i18n._(NOT_FOUND_TITLE) };
}
