import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { images } from "@/content/images";
import type { Locale } from "@/i18n/routing";
import { em } from "@/lib/utils";
import { pageMetadata } from "@/lib/metadata";
import { Reveal } from "@/components/Reveal";
import { ArrowLink, ButtonLink } from "@/components/ButtonLink";
import { HeroTitle } from "@/components/HeroTitle";

type Expertise = { title: string; text: string };

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({
    locale: locale as Locale,
    pathname: "/",
    homeTitle: t("siteTitle"),
    description: t("siteDescription"),
  });
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const te = await getTranslations("expertise");
  const expertises = te.raw("items") as Expertise[];
  const sectors = t.raw("sectors") as string[];

  return (
    <>
      {/* ——— Hero ——— */}
      {/* Photo pleine largeur (visage hors cadre), titre centré par-dessus */}
      <section className="relative flex h-svh min-h-[600px] items-center justify-center overflow-hidden bg-ink text-paper">
        <Image
          src={images.hero}
          alt={t("heroAlt")}
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          className="object-cover object-center"
        />
        <div aria-hidden className="absolute inset-0 bg-ink/50" />
        <div aria-hidden className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/50 to-transparent" />

        <div className="relative mx-auto w-full max-w-[1600px] px-6 pt-16 md:px-10">
          <HeroTitle eyebrow={t("eyebrow")} cta={t("ctaButton")}>
            {t.rich("title", { em })}
          </HeroTitle>
        </div>

        <a
          href="#intro"
          className="eyebrow absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-4 text-paper/80 transition-colors hover:text-paper"
        >
          <span className="hidden sm:inline">{t("discover")}</span>
          <span className="sr-only sm:hidden">{t("discover")}</span>
          <span aria-hidden className="relative h-12 w-px overflow-hidden bg-paper/25">
            <span className="animate-scroll-line absolute inset-0 bg-paper" />
          </span>
        </a>
      </section>

      {/* ——— L'agence ——— */}
      <section id="intro" className="mx-auto max-w-[1600px] scroll-mt-16 px-6 py-24 md:px-10 md:py-40">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-3">
            <p className="eyebrow flex items-center gap-4 text-taupe">
              <span aria-hidden className="h-px w-10 bg-current" />
              {t("introEyebrow")}
            </p>
          </Reveal>
          <div className="lg:col-span-9">
            <Reveal>
              <p className="display text-[2rem] leading-[1.15] sm:text-4xl md:text-5xl lg:text-[3.5rem]">
                {t("introLead")}
              </p>
            </Reveal>
            <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-2 md:gap-16">
              <Reveal delay={0.1}>
                <p className="text-lg leading-relaxed text-muted">{t("introBody")}</p>
              </Reveal>
              <Reveal delay={0.2} className="flex flex-col justify-between gap-10">
                <p className="display text-2xl italic md:text-3xl">{t("introClosing")}</p>
                <ArrowLink href="/l-histoire">{t("introLink")}</ArrowLink>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ——— Manifeste + secteurs ——— */}
      <section className="overflow-hidden bg-ecru pb-10 pt-24 md:pb-14 md:pt-36">
        <Reveal className="px-6 text-center">
          <p className="display serif-accent text-[3.25rem] sm:text-7xl lg:text-8xl xl:text-[9rem]">
            {t.rich("manifesto", { em })}
          </p>
        </Reveal>
        <p className="sr-only">{sectors.join(", ")}</p>
        <div className="mt-16 border-y border-line py-5 md:mt-24">
          <div className="animate-marquee flex w-max" aria-hidden>
            {[0, 1].map((copy) => (
              <ul key={copy} className="flex shrink-0">
                {[...sectors, ...sectors].map((s, i) => (
                  <li key={i} className="eyebrow flex items-center whitespace-nowrap text-muted">
                    <span className="px-8">{s}</span>
                    <span className="text-taupe">✦</span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Expertises ——— */}
      <section className="mx-auto max-w-[1600px] px-6 py-24 md:px-10 md:py-40">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <p className="eyebrow flex items-center gap-4 text-taupe">
                  <span aria-hidden className="h-px w-10 bg-current" />
                  {t("expertiseEyebrow")}
                </p>
                <h2 className="display mt-8 text-5xl md:text-7xl">{t.rich("expertiseTitle", { em })}</h2>
              </Reveal>
              <Reveal delay={0.1} className="relative mt-12 hidden aspect-[4/5] max-w-md overflow-hidden lg:block">
                <Image
                  src={images.expertise01}
                  alt={`${expertises[0].title} — Eleven Stories`}
                  fill
                  sizes="(min-width: 1024px) 28rem, 100vw"
                  placeholder="blur"
                  className="object-cover"
                />
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ol className="border-t border-line">
              {expertises.map((item, i) => (
                <li key={item.title} className="border-b border-line">
                  <Reveal delay={i * 0.05} className="grid grid-cols-[auto_1fr] gap-6 py-10 md:gap-10 md:py-12">
                    <span className="display self-start border-b border-ink pb-2 text-4xl md:text-5xl">0{i + 1}</span>
                    <div className="border-l border-line pl-6 md:pl-10">
                      <h3 className="eyebrow !text-xs !font-normal text-ink">{item.title}</h3>
                      <p className="mt-4 leading-relaxed text-muted">{item.text}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
            <Reveal className="mt-12">
              <ArrowLink href="/nos-expertises">{t("expertiseLink")}</ArrowLink>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ——— Citation Leah ——— */}
      <section className="bg-sand/60">
        <div className="mx-auto grid max-w-[1600px] items-center gap-12 px-6 py-24 md:grid-cols-12 md:px-10 md:py-32">
          <Reveal className="relative aspect-[4/5] overflow-hidden md:col-span-5">
            <Image
              src={images.leahPortrait}
              alt="Leah Colomer, fondatrice d'Eleven Stories"
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              placeholder="blur"
              className="object-cover"
            />
          </Reveal>
          <Reveal delay={0.15} className="md:col-span-6 md:col-start-7">
            <span aria-hidden className="display block h-16 text-[8rem] leading-none md:h-24 md:text-[11rem]">
              &rdquo;
            </span>
            <blockquote className="display serif-accent mt-6 text-4xl leading-[1.1] md:text-5xl lg:text-6xl">
              {t.rich("quote", { em })}
            </blockquote>
            <div className="mt-10">
              <p className="eyebrow !font-normal text-ink">{t("quoteAuthor")}</p>
              <p className="eyebrow mt-1 text-taupe">{t("quoteRole")}</p>
            </div>
            <ArrowLink href="/l-histoire" className="mt-12">
              {t("quoteLink")}
            </ArrowLink>
          </Reveal>
        </div>
      </section>

      {/* ——— Parlons-en ——— */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <Image
          src={images.voyage}
          alt=""
          fill
          sizes="100vw"
          placeholder="blur"
          className="object-cover opacity-45"
        />
        <div className="relative mx-auto max-w-[1600px] px-6 py-32 text-center md:px-10 md:py-48">
          <Reveal>
            <p className="eyebrow text-paper/70">{t("ctaEyebrow")}</p>
            <h2 className="display mx-auto mt-8 max-w-4xl text-4xl md:text-6xl lg:text-7xl">
              {t.rich("ctaTitle", { em })}
            </h2>
            <ButtonLink href="/parlons-en" variant="light" className="mt-14">
              {t("ctaButton")}
            </ButtonLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
