import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { images } from "@/content/images";
import type { Locale } from "@/i18n/routing";
import { em } from "@/lib/utils";
import { pageMetadata } from "@/lib/metadata";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { ButtonLink } from "@/components/ButtonLink";

export async function generateMetadata({ params }: PageProps<"/[locale]/l-histoire">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({
    locale: locale as Locale,
    pathname: "/l-histoire",
    title: t("history"),
    description: t("historyDescription"),
  });
}

export default async function HistoryPage({ params }: PageProps<"/[locale]/l-histoire">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("history");
  const nav = await getTranslations("nav");
  const intro = t.raw("intro") as string[];
  const vision = t.raw("vision") as string[];
  const world = t.raw("world") as string[];
  const values = t.raw("values") as string[];

  return (
    <>
      <PageIntro eyebrow={t("eyebrow")} title={t.rich("title", { em })} />

      {/* ——— Portrait + présentation ——— */}
      <section className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid gap-14 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <Reveal immediate delay={0.1} className="md:sticky md:top-28">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={images.leahJournal}
                  alt="Leah Colomer, fondatrice d'Eleven Stories"
                  fill
                  priority
                  sizes="(min-width: 768px) 40vw, 100vw"
                  placeholder="blur"
                  className="object-cover"
                />
              </div>
              <p className="eyebrow mt-5 text-taupe">Leah Colomer — {nav("tagline")}</p>
            </Reveal>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <Reveal immediate delay={0.2}>
              <span aria-hidden className="display block h-20 text-[9rem] leading-none md:h-28 md:text-[12rem]">
                &rdquo;
              </span>
              <p className="display mt-4 text-3xl leading-[1.2] md:text-4xl">{intro[0]}</p>
            </Reveal>
            <Reveal delay={0.1} className="prose-editorial mt-12">
              {intro.slice(1).map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ——— Exergue ——— */}
      <section className="mx-auto max-w-[1600px] px-6 py-28 md:px-10 md:py-40">
        <Reveal>
          <p className="display serif-accent mx-auto max-w-5xl text-center text-4xl leading-[1.12] md:text-6xl lg:text-7xl">
            {t.rich("pull", { em })}
          </p>
        </Reveal>
      </section>

      {/* ——— La vision ——— */}
      <section className="bg-ecru">
        <div className="mx-auto grid max-w-[1600px] gap-14 px-6 py-24 md:grid-cols-12 md:px-10 md:py-32">
          <Reveal className="md:col-span-4">
            <p className="eyebrow flex items-center gap-4 text-taupe">
              <span aria-hidden className="h-px w-10 bg-current" />
              {t("visionEyebrow")}
            </p>
          </Reveal>
          <Reveal delay={0.1} className="prose-editorial md:col-span-7 md:col-start-6">
            {vision.map((p, i) => (
              <p key={p} className={i === 0 ? "display !text-3xl !leading-[1.25] !text-ink md:!text-4xl" : ""}>
                {p}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ——— Mosaïque ——— */}
      <section className="mx-auto max-w-[1600px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-12 md:gap-6">
          <Reveal className="relative col-span-2 aspect-[4/3] overflow-hidden md:col-span-7 md:aspect-auto md:h-full">
            <Image
              src={images.leahBureau}
              alt=""
              fill
              sizes="(min-width: 768px) 58vw, 100vw"
              placeholder="blur"
              className="object-cover"
            />
          </Reveal>
          <Reveal delay={0.1} className="relative aspect-[3/4] overflow-hidden md:col-span-5">
            <Image
              src={images.leahMagazine}
              alt=""
              fill
              sizes="(min-width: 768px) 42vw, 50vw"
              placeholder="blur"
              className="object-cover"
            />
          </Reveal>
          <Reveal delay={0.15} className="relative aspect-[3/4] overflow-hidden md:hidden">
            <Image src={images.leahLecture} alt="" fill sizes="50vw" placeholder="blur" className="object-cover" />
          </Reveal>
        </div>
      </section>

      {/* ——— Ici & ailleurs ——— */}
      <section className="mx-auto max-w-[1600px] px-6 pb-24 md:px-10 md:pb-40">
        <div className="grid gap-14 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <p className="eyebrow flex items-center gap-4 text-taupe">
              <span aria-hidden className="h-px w-10 bg-current" />
              {t("worldEyebrow")}
            </p>
            <div className="relative mt-12 hidden aspect-[3/4] overflow-hidden md:block">
              <Image
                src={images.leahLecture}
                alt=""
                fill
                sizes="30vw"
                placeholder="blur"
                className="object-cover"
              />
            </div>
          </Reveal>
          <div className="md:col-span-7 md:col-start-6">
            <Reveal className="prose-editorial md:columns-2 md:gap-12 [&>p]:break-inside-avoid">
              {world.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Reveal>

            <Reveal delay={0.1} className="mt-16 border-t border-line pt-12">
              <p className="text-lg leading-relaxed text-ink">{t("closing")}</p>
              <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
                {values.map((v) => (
                  <li key={v} className="eyebrow text-taupe">
                    {v}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ——— Signature ——— */}
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-[1600px] px-6 py-28 text-center md:px-10 md:py-40">
          <Reveal>
            <blockquote className="display serif-accent mx-auto max-w-4xl text-4xl leading-[1.12] md:text-6xl">
              {t.rich("signature", { em })}
            </blockquote>
            <p className="eyebrow mt-10 text-paper/60">{t("signatureAuthor")}</p>
            <ButtonLink href="/parlons-en" variant="light" className="mt-14">
              {nav("talk")}
            </ButtonLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
