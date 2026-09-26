import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "en"],
  defaultLocale: "fr",
  // Le français est servi à la racine (/), l'anglais sous /en
  localePrefix: "as-needed",
  localeDetection: false,
  pathnames: {
    "/": "/",
    "/l-histoire": { fr: "/l-histoire", en: "/our-story" },
    "/nos-expertises": { fr: "/nos-expertises", en: "/expertise" },
    "/ils-ecrivent-l-histoire": {
      fr: "/ils-ecrivent-l-histoire",
      en: "/clients",
    },
    "/contact": "/contact",
    "/parlons-en": { fr: "/parlons-en", en: "/lets-talk" },
    "/mentions-legales": { fr: "/mentions-legales", en: "/legal-notice" },
    "/confidentialite": { fr: "/confidentialite", en: "/privacy-policy" },
  },
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;
