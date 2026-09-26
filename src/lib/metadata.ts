import type { Metadata } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing, type AppPathname, type Locale } from "@/i18n/routing";

/** Métadonnées d'une page : titre, description, URL canonique et versions FR/EN */
export function pageMetadata({
  locale,
  pathname,
  title,
  description,
}: {
  locale: Locale;
  pathname: AppPathname;
  title?: string;
  description: string;
}): Metadata {
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, getPathname({ locale: l, href: pathname })]),
  );

  return {
    title,
    description,
    alternates: {
      canonical: languages[locale],
      languages: { ...languages, "x-default": languages[routing.defaultLocale] },
    },
    openGraph: {
      title: title ? `${title} — Eleven Stories` : undefined,
      description,
      url: languages[locale],
      locale: locale === "fr" ? "fr_FR" : "en_GB",
    },
  };
}
