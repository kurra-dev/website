import { isHomePath } from "./paths";
import { HomePage } from "./routes";
import { NotFoundPage } from "./routes/not-found";

export function App({ pathname }: { pathname: string }) {
  return isHomePath(pathname) ? <HomePage /> : <NotFoundPage />;
}
