import { useId } from "react";

import { PRODUCT_NAME } from "./config";

/** The mark: a lowercase "k" whose diagonal is cut by a horizontal notch (the gate). One color, `currentColor`. */
export function LogoMark({ size = 24 }: { size?: number }) {
  const mask = useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="butt"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <mask id={mask} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
          <rect width="24" height="24" fill="white" />
          <rect x="9" y="15" width="15" height="1.8" fill="black" />
        </mask>
      </defs>
      <g mask={`url(#${mask})`}>
        <path d="M6.5 2.5v19" />
        <path d="M18.6 4.4 7.4 13.4" />
        <path d="M10.2 11.4 19.4 21" />
      </g>
    </svg>
  );
}

/** Mark plus the wordmark: lowercase, display face, weight 600. */
export function Logo({ size = 24 }: { size?: number }) {
  return (
    <span className="logo">
      <LogoMark size={size} />
      <span className="logo-word">{PRODUCT_NAME}</span>
    </span>
  );
}
