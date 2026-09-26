import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { images } from "@/content/images";
import { site } from "@/content/site";
import type { Locale } from "@/i18n/routing";
import { em } from "@/lib/utils";
import { pageMetadata } from "@/lib/metadata";
import { Reveal } from "@/components/Reveal";
import { ButtonLink } from "@/components/ButtonLink";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({
    locale: locale as Locale,
    pathname: "/contact",
    title: t("contact"),
    description: t("contactDescription"),
  });
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  const details = [
    { label: t("phone"), value: site.phone.display, href: site.phone.href },
    { label: t("email"), value: site.email, href: `mailto:${site.email}` },
    {
      label: t("instagram"),
      value: site.instagram ? site.instagram.replace(/^https?:\/\/(www\.)?instagram\.com\//, "@").replace(/\/$/, "") : t("instagramSoon"),
      href: site.instagram ?? undefined,
      external: true,
      muted: !site.instagram,
    },
    { label: t("location"), value: t("locationValue") },
  ];

  return (
    <section className="mx-auto max-w-[1600px] px-6 pb-24 pt-36 md:px-10 md:pb-40 md:pt-48">
      <div className="grid gap-16 md:grid-cols-12 md:gap-10">
        <Reveal immediate className="relative aspect-[4/5] overflow-hidden md:order-2 md:col-span-5 md:col-start-8">
          <Image
            src={images.contact}
            alt={t("imageAlt")}
            fill
            priority
            sizes="(min-width: 768px) 40vw, 100vw"
            placeholder="blur"
            className="object-cover"
          />
        </Reveal>

        <div className="md:order-1 md:col-span-6">
          <Reveal immediate>
            <p className="eyebrow flex items-center gap-4 text-taupe">
              <span aria-hidden className="h-px w-10 bg-current" />
              {t("eyebrow")}
            </p>
            <h1 className="display mt-8 text-5xl md:text-7xl">{t.rich("title", { em })}</h1>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-muted">{t("intro")}</p>
          </Reveal>

          <Reveal immediate delay={0.15}>
            <dl className="mt-14 border-t border-line">
              {details.map((d) => (
                <div key={d.label} className="grid gap-2 border-b border-line py-6 sm:grid-cols-[10rem_1fr] sm:gap-6">
                  <dt className="eyebrow pt-1 text-taupe">{d.label}</dt>
                  <dd className="display text-2xl md:text-3xl">
                    {d.href ? (
                      <a
                        href={d.href}
                        className="link-underline"
                        {...(d.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {d.value}
                      </a>
                    ) : (
                      <span className={d.muted ? "italic text-taupe" : undefined}>
                        {d.value}
                      </span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.15} className="mt-14 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-10">
            <p className="text-muted">{t("ctaText")}</p>
            <ButtonLink href="/parlons-en" className="shrink-0">
              {t("ctaButton")}
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
