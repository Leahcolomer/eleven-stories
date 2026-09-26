"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import type { AppPathname } from "@/i18n/routing";
import { images } from "@/content/images";
import { site } from "@/content/site";
import { cx } from "@/lib/utils";
import { LangSwitch } from "./LangSwitch";

const items: { href: AppPathname; key: "history" | "expertise" | "clients" | "contact" }[] = [
  { href: "/l-histoire", key: "history" },
  { href: "/nos-expertises", key: "expertise" },
  { href: "/ils-ecrivent-l-histoire", key: "clients" },
  { href: "/contact", key: "contact" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function MenuOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label={t("menu")}
          className="fixed inset-0 z-40 overflow-y-auto bg-ecru text-ink"
          initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
          animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
          exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.8, ease }}
        >
          <div className="mx-auto grid min-h-full max-w-[1600px] grid-cols-1 gap-12 px-6 pb-10 pt-32 md:grid-cols-12 md:px-10 md:pt-36">
            <nav className="md:col-span-8" aria-label={t("menu")}>
              <ul className="space-y-2 md:space-y-4">
                {items.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={reduce ? false : { opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.25 + i * 0.08, ease }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      aria-current={pathname === item.href ? "page" : undefined}
                      className="group flex items-baseline gap-5 py-2 md:gap-8"
                    >
                      <span className="eyebrow w-6 shrink-0 text-taupe">0{i + 1}</span>
                      <span
                        className={cx(
                          "display text-[2.35rem] transition-[font-style,color] duration-500 sm:text-5xl md:text-6xl xl:text-7xl",
                          pathname === item.href ? "italic" : "group-hover:italic",
                        )}
                      >
                        {t(item.key)}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <motion.aside
              className="flex flex-col justify-between gap-10 md:col-span-4 md:border-l md:border-line md:pl-10"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.55 }}
            >
              <div className="relative hidden aspect-[4/5] w-full max-w-xs overflow-hidden md:block">
                <Image
                  src={images.leahPortrait}
                  alt=""
                  fill
                  sizes="320px"
                  className="object-cover"
                  placeholder="blur"
                />
              </div>

              <div className="space-y-6">
                <p className="display text-3xl italic">{t("tagline")}</p>
                <div className="space-y-2 text-sm text-muted">
                  <a className="link-hover block w-fit" href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                  <a className="link-hover block w-fit" href={site.phone.href}>
                    {site.phone.display}
                  </a>
                  {site.instagram && (
                    <a
                      className="link-hover block w-fit"
                      href={site.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Instagram
                    </a>
                  )}
                </div>
                <LangSwitch />
              </div>
            </motion.aside>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
