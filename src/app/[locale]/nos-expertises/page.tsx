import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { images } from "@/content/images";
import type { Locale } from "@/i18n/routing";
import { cx, em } from "@/lib/utils";
import { pageMetadata } from "@/lib/metadata";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { ButtonLink } from "@/components/ButtonLink";

type Expertise = { title: string; text: string };

const pictures = [images.expertise01, images.expertise02, images.expertise03, images.expertise04];

export async function generateMetadata({ params }: PageProps<"/[locale]/nos-expertises">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({
    locale: locale as Locale,
    pathname: "/nos-expertises",
    title: t("expertise"),
    description: t("expertiseDescription"),
  });
}

export default async function ExpertisePage({ params }: PageProps<"/[locale]/nos-expertises">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("expertise");
  const items = t.raw("items") as Expertise[];

  return (
    <>
      <PageIntro eyebrow={t("eyebrow")} title={t.rich("title", { em })}>
        <p>{t("intro")}</p>
      </PageIntro>

      <section className="mx-auto max-w-[1600px] px-6 pb-24 md:px-10 md:pb-40">
        <ol className="space-y-24 md:space-y-40">
          {items.map((item, i) => {
            const reversed = i % 2 === 1;
            return (
              <li key={item.title} className="grid items-center gap-10 md:grid-cols-12 md:gap-10">
                <Reveal
                  className={cx(
                    "relative aspect-[4/5] overflow-hidden md:col-span-5",
                    reversed && "md:order-2 md:col-start-8",
                  )}
                >
                  <Image
                    src={pictures[i]}
                    alt={`${item.title} — Eleven Stories`}
                    fill
                    sizes="(min-width: 768px) 40vw, 100vw"
                    placeholder="blur"
                    className="object-cover"
                  />
                </Reveal>

                <Reveal
                  delay={0.1}
                  className={cx(
                    "md:col-span-6",
                    reversed ? "md:order-1 md:col-start-1" : "md:col-start-7",
                  )}
                >
                  <div className="flex items-start gap-8 md:gap-12">
                    <span className="display shrink-0 border-b border-ink pb-3 text-6xl md:text-8xl">
                      0{i + 1}
                    </span>
                    <div className="border-l border-line pl-8 pt-2 md:pl-12">
                      <h2 className="eyebrow !text-xs !font-normal text-ink md:!text-sm">{item.title}</h2>
                      <p className="mt-6 text-lg leading-relaxed text-muted">{item.text}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="bg-ecru">
        <div className="mx-auto max-w-[1600px] px-6 py-28 text-center md:px-10 md:py-36">
          <Reveal>
            <h2 className="display mx-auto max-w-3xl text-4xl md:text-6xl">{t.rich("ctaTitle", { em })}</h2>
            <ButtonLink href="/parlons-en" className="mt-12">
              {t("ctaButton")}
            </ButtonLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
