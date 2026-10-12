import { Trans } from "@lingui/react/macro";

export function NotFoundPage() {
  return (
    <main className="notice" data-theme="dark">
      <div className="notice-box">
        <p className="notice-code mono">404</p>
        <h1 className="h2">
          <Trans>Page not found</Trans>
        </h1>
        <p className="body">
          <Trans>That page can’t be found. It may have moved.</Trans>
        </p>
        <a href="/" className="btn btn-primary">
          <Trans>Go to the home page</Trans>
        </a>
      </div>
    </main>
  );
}
