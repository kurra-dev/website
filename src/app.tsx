import { isFeaturesPath, isHomePath } from "./paths";
import { HomePage } from "./routes";
import { FeaturesPage } from "./routes/features";
import { NotFoundPage } from "./routes/not-found";

export function App({ pathname }: { pathname: string }) {
  if (isHomePath(pathname)) return <HomePage />;
  if (isFeaturesPath(pathname)) return <FeaturesPage />;
  return <NotFoundPage />;
}
