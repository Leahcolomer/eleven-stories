"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cx } from "@/lib/utils";
import { Logo } from "./Logo";
import { LangSwitch } from "./LangSwitch";
import { MenuOverlay } from "./MenuOverlay";

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sur l'accueil, le header est transparent (texte blanc) au-dessus du grand visuel
  const overlay = pathname === "/" && !scrolled && !open;
  const solid = scrolled && !open;

  return (
    <>
      <a
        href="#main"
        className="eyebrow sr-only z-[60] bg-ink px-4 py-3 text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {t("skip")}
      </a>

      <header
        className={cx(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,color,border-color,height] duration-500",
          overlay ? "text-paper" : "text-ink",
          solid
            ? "border-b border-line/70 bg-paper/90 backdrop-blur-md"
            : "border-b border-transparent",
        )}
      >
        <div
          className={cx(
            "mx-auto grid max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 transition-[height] duration-500 sm:px-6 lg:px-10",
            solid ? "h-16 md:h-20" : "h-20 md:h-24",
          )}
        >
          {/* Menu (3 traits) */}
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? t("close") : t("open")}
              className="group flex items-center gap-4 py-2"
            >
              <span className="relative block h-3 w-7" aria-hidden>
                <span
                  className={cx(
                    "absolute left-0 h-px w-full bg-current transition-transform duration-500",
                    open ? "top-1/2 rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cx(
                    "absolute left-0 top-1/2 h-px bg-current transition-all duration-500",
                    open ? "w-0 opacity-0" : "w-2/3 group-hover:w-full",
                  )}
                />
                <span
                  className={cx(
                    "absolute left-0 h-px w-full bg-current transition-transform duration-500",
                    open ? "top-1/2 -rotate-45" : "top-full",
                  )}
                />
              </span>
              <span className="eyebrow hidden md:inline">{open ? t("close") : t("menu")}</span>
            </button>
          </div>

          {/* Logo */}
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="justify-self-center"
            aria-label="Eleven Stories"
          >
            <Logo
              tagline={!solid}
              className={cx(
                "transition-[font-size] duration-500",
                solid ? "text-[1.15rem] sm:text-[1.35rem] md:text-[1.6rem]" : "text-[1.2rem] sm:text-[1.45rem] md:text-[1.9rem]",
              )}
            />
          </Link>

          {/* Langue + Parlons-en */}
          <div className="flex items-center justify-end gap-5 lg:gap-8">
            <LangSwitch className="hidden md:flex" />
            <Link
              href="/parlons-en"
              onClick={() => setOpen(false)}
              className={cx(
                "eyebrow whitespace-nowrap rounded-full border px-3.5 py-2 !text-[0.625rem] !font-normal !tracking-[0.16em] transition-colors duration-500 sm:px-4 sm:py-2.5 md:px-6 md:py-3 md:!text-[0.6875rem] md:!tracking-[0.22em]",
                overlay
                  ? "border-paper/80 hover:bg-paper hover:text-ink"
                  : "border-ink bg-ink text-paper hover:bg-transparent hover:text-ink",
              )}
            >
              {t("talk")}
            </Link>
          </div>
        </div>
      </header>

      <MenuOverlay open={open} onClose={() => setOpen(false)} />
    </>
  );
}
