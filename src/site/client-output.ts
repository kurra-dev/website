// What a package client prints when kurra refuses a package. It is server output, so it stays in English like any
// other raw client text. The wording follows the refusal template in the glossary.
export const REFUSED_COMMAND = "npm install lodash@4.17.20";
export const REFUSAL_OUTCOME =
  "Access is denied: lodash 4.17.20 is blocked by kurra policy because of advisory GHSA-35jh-r3h4-6jhm (critical).";
export const REFUSAL_NEXT_STEP =
  "Use 4.17.21 or later, or ask an administrator to review this decision.";
