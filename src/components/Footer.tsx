import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { site } from "@/content/site";
import { Logo } from "./Logo";

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  return (
    <footer className="bg-ink text-ecru">
      <div className="mx-auto max-w-[1600px] px-6 pb-10 pt-20 md:px-10 md:pt-28">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-12 lg:col-span-5">
            <Link href="/" aria-label="Eleven Stories">
              <Logo className="text-[2.2rem] md:text-[2.8rem]" />
            </Link>
            <p className="display mt-10 text-3xl italic text-ecru/80 md:text-4xl">
              {nav("tagline")}
            </p>
          </div>

          <nav className="md:col-span-6 lg:col-span-3 lg:col-start-7" aria-label="Footer">
            <ul className="space-y-3 text-sm">
              <li><Link className="link-hover" href="/l-histoire">{nav("history")}</Link></li>
              <li><Link className="link-hover" href="/nos-expertises">{nav("expertise")}</Link></li>
              <li><Link className="link-hover" href="/ils-ecrivent-l-histoire">{nav("clients")}</Link></li>
              <li><Link className="link-hover" href="/contact">{nav("contact")}</Link></li>
              <li><Link className="link-hover" href="/parlons-en">{nav("talk")}</Link></li>
            </ul>
          </nav>

          <div className="min-w-0 space-y-5 text-sm md:col-span-6 lg:col-span-3">
            <div>
              <p className="eyebrow text-ecru/60">{t("line1")}</p>
              <p className="eyebrow mt-1 text-ecru/60">{t("line2")}</p>
            </div>
            <div className="space-y-2">
              <a className="link-hover block w-fit" href={`mailto:${site.email}`}>{site.email}</a>
              <a className="link-hover block w-fit" href={site.phone.href}>{site.phone.display}</a>
              {site.instagram && (
                <a className="link-hover block w-fit" href={site.instagram} target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              )}
              <p className="text-ecru/60">{t("based")}</p>
            </div>
          </div>
        </div>

        <div className="eyebrow mt-20 flex flex-col gap-4 border-t border-ecru/15 pt-8 text-ecru/60 md:flex-row md:items-center md:justify-between">
          <p>{t("copyright", { year: 2026 })}</p>
          <div className="flex gap-8">
            <Link className="transition-colors hover:text-ecru" href="/mentions-legales">{t("legal")}</Link>
            <Link className="transition-colors hover:text-ecru" href="/confidentialite">{t("privacy")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
