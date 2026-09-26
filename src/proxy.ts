import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const handleI18n = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const response = handleI18n(request);

  // Les adresses techniques *.vercel.app ne doivent pas être référencées :
  // seul elevenstories.fr doit apparaître dans Google (aucune action à prévoir
  // au branchement du domaine, la règle ne vise que vercel.app).
  if (request.headers.get("host")?.endsWith(".vercel.app")) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
}

export const config = {
  // Toutes les pages, sauf les fichiers statiques et les routes internes
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
