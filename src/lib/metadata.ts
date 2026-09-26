import type { Metadata } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing, type AppPathname, type Locale } from "@/i18n/routing";

/**
 * Métadonnées d'une page : titre, description, URL canonique et versions FR/EN.
 * Next remplace (et ne fusionne pas) l'objet openGraph du layout : on y remet
 * donc l'image de partage et le nom du site.
 */
export function pageMetadata({
  locale,
  pathname,
  title,
  homeTitle,
  description,
}: {
  locale: Locale;
  pathname: AppPathname;
  /** Absent pour l'accueil, qui garde le titre complet du layout */
  title?: string;
  /** Accueil : titre complet utilisé pour le partage sur les réseaux */
  homeTitle?: string;
  description: string;
}): Metadata {
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, getPathname({ locale: l, href: pathname })]),
  );

  return {
    ...(title ? { title } : {}),
    description,
    alternates: {
      canonical: languages[locale],
      languages: { ...languages, "x-default": languages[routing.defaultLocale] },
    },
    openGraph: {
      type: "website",
      siteName: "Eleven Stories",
      title: title ? `${title} — Eleven Stories` : homeTitle,
      description,
      url: languages[locale],
      locale: locale === "fr" ? "fr_FR" : "en_GB",
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Eleven Stories — Relations presse" }],
    },
  };
}
