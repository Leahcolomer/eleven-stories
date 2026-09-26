import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { images } from "@/content/images";
import { projects } from "@/content/projects";
import type { Locale } from "@/i18n/routing";
import { cx, em } from "@/lib/utils";
import { pageMetadata } from "@/lib/metadata";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { ButtonLink } from "@/components/ButtonLink";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/ils-ecrivent-l-histoire">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({
    locale: locale as Locale,
    pathname: "/ils-ecrivent-l-histoire",
    title: t("clients"),
    description: t("clientsDescription"),
  });
}

export default async function ClientsPage({ params }: PageProps<"/[locale]/ils-ecrivent-l-histoire">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const lang = locale as Locale;
  const t = await getTranslations("clients");

  return (
    <>
      <PageIntro eyebrow={t("eyebrow")} title={t.rich("title", { em })} />

      {projects.length === 0 ? (
        /* ——— En attendant les premiers projets ——— */
        <section className="mx-auto max-w-[1600px] px-6 pb-28 md:px-10 md:pb-40">
          <div className="grid items-end gap-12 border-t border-line pt-16 md:grid-cols-12 md:pt-24">
            <Reveal className="relative aspect-[4/5] overflow-hidden md:col-span-4">
              <Image
                src={images.leahMagazine}
                alt=""
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                placeholder="blur"
                className="object-cover"
              />
            </Reveal>
            <Reveal delay={0.1} className="md:col-span-6 md:col-start-6 md:pb-8">
              <h2 className="display text-4xl md:text-6xl">{t.rich("emptyTitle", { em })}</h2>
              <p className="mt-8 max-w-lg text-lg leading-relaxed text-muted">{t("emptyText")}</p>
              <ButtonLink href="/parlons-en" variant="outline" className="mt-12">
                {t("emptyButton")}
              </ButtonLink>
            </Reveal>
          </div>
        </section>
      ) : (
        /* ——— Projets, mise en page éditoriale alternée ——— */
        <section className="mx-auto max-w-[1600px] px-6 pb-28 md:px-10 md:pb-40">
          <ol className="space-y-28 md:space-y-44">
            {projects.map((project, i) => {
              const reversed = i % 2 === 1;
              return (
                <li key={project.client} className="grid items-center gap-10 md:grid-cols-12">
                  <Reveal
                    className={cx(
                      "relative aspect-[4/5] overflow-hidden md:col-span-6",
                      reversed && "md:order-2 md:col-start-7",
                    )}
                  >
                    <Image
                      src={project.image}
                      alt={project.client}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      placeholder="blur"
                      className="object-cover"
                    />
                  </Reveal>
                  <Reveal
                    delay={0.1}
                    className={cx("md:col-span-5", reversed ? "md:order-1 md:col-start-1" : "md:col-start-8")}
                  >
                    <p className="eyebrow text-taupe">
                      {String(i + 1).padStart(2, "0")} — {project.category[lang]}
                      {project.location && ` · ${project.location}`}
                      {project.year && ` · ${project.year}`}
                    </p>
                    <h2 className="display mt-6 text-5xl italic md:text-7xl">{project.client}</h2>
                    <p className="mt-8 text-lg leading-relaxed text-muted">{project.description[lang]}</p>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </section>
      )}
    </>
  );
}
