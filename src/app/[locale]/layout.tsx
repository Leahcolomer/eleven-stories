import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DM_Sans, Cormorant_Garamond, Montserrat, Playfair_Display } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Analytics } from "@vercel/analytics/next";
import { routing } from "@/i18n/routing";
import { site } from "@/content/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "../globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-montserrat",
});

// Uniquement pour le « stories » du logo
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
  style: ["italic"],
  variable: "--font-playfair",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(site.url),
    title: { default: t("siteTitle"), template: "%s — Eleven Stories" },
    description: t("siteDescription"),
    applicationName: "Eleven Stories",
    openGraph: {
      type: "website",
      siteName: "Eleven Stories",
      title: t("siteTitle"),
      description: t("siteDescription"),
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Eleven Stories — Relations presse" }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${dmSans.variable} ${cormorant.variable} ${montserrat.variable} ${playfair.variable}`}
    >
      <body className="flex min-h-svh flex-col">
        <NextIntlClientProvider>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
