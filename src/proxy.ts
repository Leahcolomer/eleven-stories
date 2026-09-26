import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Toutes les pages, sauf les fichiers statiques et les routes internes
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
