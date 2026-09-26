import { site } from "@/content/site";

/**
 * Fiche d'identité de l'agence pour Google (schema.org) : aide Google à
 * comprendre qui est Eleven Stories, où elle est basée et ce qu'elle fait.
 */
export function agencyJsonLd(locale: "fr" | "en", description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}/#agency`,
    name: site.name,
    alternateName: "Eleven Stories — Relations presse",
    description,
    url: locale === "fr" ? site.url : `${site.url}/en`,
    logo: `${site.url}/icon.png`,
    image: `${site.url}/og.jpg`,
    email: site.email,
    telephone: "+33648263311",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Toulouse",
      addressRegion: "Occitanie",
      addressCountry: "FR",
    },
    areaServed: [
      { "@type": "Country", name: "France" },
      { "@type": "Place", name: "International" },
    ],
    founder: { "@type": "Person", name: site.founder, jobTitle: "Attachée de presse, fondatrice" },
    knowsLanguage: ["fr", "en"],
    knowsAbout: [
      "Relations presse",
      "Relations presse internationales",
      "Stratégie de marque",
      "Lancements et événements presse",
      "Mode",
      "Joaillerie",
      "Beauté",
      "Hôtellerie",
      "Restauration",
      "Design",
      "Art de vivre",
    ],
    ...(site.instagram ? { sameAs: [site.instagram] } : {}),
  };
}
