import type { MetadataRoute } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing, type AppPathname } from "@/i18n/routing";
import { site } from "@/content/site";

const pages: AppPathname[] = [
  "/",
  "/l-histoire",
  "/nos-expertises",
  "/ils-ecrivent-l-histoire",
  "/contact",
  "/parlons-en",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (locale: (typeof routing.locales)[number], href: AppPathname) =>
    site.url + getPathname({ locale, href }).replace(/\/$/, "");

  return pages.flatMap((href) =>
    routing.locales.map((locale) => ({
      url: url(locale, href) || site.url,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: href === "/" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(routing.locales.map((l) => [l, url(l, href) || site.url])),
      },
    })),
  );
}
