import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";

type Section = { title: string; text: string };

export async function generateMetadata({ params }: PageProps<"/[locale]/confidentialite">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    ...pageMetadata({
      locale: locale as Locale,
      pathname: "/confidentialite",
      title: t("privacy"),
      description: t("privacy"),
    }),
    robots: { index: false },
  };
}

export default async function PrivacyPage({ params }: PageProps<"/[locale]/confidentialite">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("privacy");
  const sections = t.raw("sections") as Section[];

  return (
    <article className="mx-auto max-w-3xl px-6 pb-24 pt-36 md:pb-32 md:pt-48">
      <h1 className="display text-5xl md:text-7xl">{t("title")}</h1>
      <p className="eyebrow mt-6 text-taupe">{t("updated")}</p>

      <div className="mt-16 space-y-12">
        {sections.map((s) => (
          <section key={s.title}>
            <h2 className="eyebrow mb-4 !font-normal text-ink">{s.title}</h2>
            <p className="leading-relaxed text-muted">{s.text}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
