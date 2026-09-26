import { useTranslations } from "next-intl";
import { em } from "@/lib/utils";
import { ButtonLink } from "@/components/ButtonLink";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <section className="mx-auto flex min-h-[70svh] max-w-[1600px] flex-col items-center justify-center px-6 pb-24 pt-40 text-center">
      <p className="eyebrow text-taupe">404</p>
      <h1 className="display mt-8 text-5xl md:text-7xl">{t.rich("title", { em })}</h1>
      <p className="mt-6 text-lg text-muted">{t("text")}</p>
      <ButtonLink href="/" variant="outline" className="mt-12">
        {t("back")}
      </ButtonLink>
    </section>
  );
}
