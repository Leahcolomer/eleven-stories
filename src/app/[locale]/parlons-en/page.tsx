import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { images } from "@/content/images";
import { site } from "@/content/site";
import type { Locale } from "@/i18n/routing";
import { em } from "@/lib/utils";
import { pageMetadata } from "@/lib/metadata";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";

export async function generateMetadata({ params }: PageProps<"/[locale]/parlons-en">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({
    locale: locale as Locale,
    pathname: "/parlons-en",
    title: t("talk"),
    description: t("talkDescription"),
  });
}

export default async function TalkPage({ params }: PageProps<"/[locale]/parlons-en">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("talk");

  return (
    <section className="mx-auto max-w-[1600px] px-6 pb-24 pt-36 md:px-10 md:pb-40 md:pt-48">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
        {/* Accroche */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <p className="eyebrow flex items-center gap-4 text-taupe">
                <span aria-hidden className="h-px w-10 bg-current" />
                {t("eyebrow")}
              </p>
              <h1 className="display mt-8 text-[2.6rem] leading-[1.05] md:text-6xl">
                {t.rich("title", { em })}
              </h1>
              <p className="mt-10 text-lg leading-relaxed text-muted">{t("intro")}</p>
            </Reveal>

            <Reveal delay={0.1} className="mt-12 hidden gap-8 lg:flex">
              <div className="relative aspect-[4/5] w-44 shrink-0 overflow-hidden">
                <Image
                  src={images.parlonsEn}
                  alt=""
                  fill
                  sizes="11rem"
                  placeholder="blur"
                  className="object-cover"
                />
              </div>
              <div className="self-end text-sm text-muted">
                <p className="eyebrow mb-4 text-taupe">{t("direct")}</p>
                <a className="link-underline block w-fit" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
                <a className="link-underline mt-2 block w-fit" href={site.phone.href}>
                  {site.phone.display}
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Formulaire */}
        <Reveal delay={0.15} className="relative lg:col-span-6 lg:col-start-7">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
