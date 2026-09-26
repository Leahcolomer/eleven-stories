import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { site } from "@/content/site";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]/mentions-legales">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    ...pageMetadata({
      locale: locale as Locale,
      pathname: "/mentions-legales",
      title: t("legal"),
      description: t("legal"),
    }),
    robots: { index: false },
  };
}

export default async function LegalPage({ params }: PageProps<"/[locale]/mentions-legales">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("legal");

  return (
    <article className="mx-auto max-w-3xl px-6 pb-24 pt-36 md:pb-32 md:pt-48">
      <h1 className="display text-5xl md:text-7xl">{t("title")}</h1>

      <div className="mt-16 space-y-14 text-muted">
        <LegalSection title={t("publisherTitle")}>
          <p className="text-ink">Eleven Stories</p>
          <p>{t("publisherBy", { name: site.founderLegal })}</p>
          <p>
            {t("siren")} : {site.siren ?? t("sirenPending")}
          </p>
          <p>
            {t("email")} :{" "}
            <a className="link-underline text-ink" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </p>
          <p>
            {t("phone")} :{" "}
            <a className="link-underline text-ink" href={site.phone.href}>
              {site.phone.display}
            </a>
          </p>
        </LegalSection>

        <LegalSection title={t("hostTitle")}>
          <p>
            {t("hostName")} : {site.host.name}
          </p>
          <p>
            {t("hostAddress")} : {site.host.address}
          </p>
          <p>
            {t("hostWebsite")} :{" "}
            <a className="link-underline text-ink" href={site.host.website} target="_blank" rel="noopener noreferrer">
              vercel.com
            </a>
          </p>
        </LegalSection>

        <LegalSection title={t("ipTitle")}>
          <p>{t("ip")}</p>
        </LegalSection>

        <LegalSection title={t("liabilityTitle")}>
          <p>{t("liability")}</p>
        </LegalSection>

        <LegalSection title={t("dataTitle")}>
          <p>
            {t.rich("data", {
              link: (chunks) => (
                <Link href="/confidentialite" className="link-underline text-ink">
                  {chunks}
                </Link>
              ),
            })}
          </p>
        </LegalSection>
      </div>
    </article>
  );
}

function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="eyebrow mb-5 !font-normal text-ink">{title}</h2>
      <div className="space-y-1.5 leading-relaxed">{children}</div>
    </section>
  );
}
