import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";

import "@/styles.css";
import { I18nProvider } from "@/lib/i18n";

import { App } from "./app";

const container = document.getElementById("root");
if (!container) throw new Error("The page has no root element.");

const app = (
  <StrictMode>
    <I18nProvider>
      <App pathname={window.location.pathname} />
    </I18nProvider>
  </StrictMode>
);

// The built pages are prerendered, so they hydrate. `npm run dev` serves an empty root and renders from scratch.
if (container.firstElementChild) hydrateRoot(container, app);
else createRoot(container).render(app);
