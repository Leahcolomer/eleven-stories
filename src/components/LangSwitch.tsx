"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cx } from "@/lib/utils";

export function LangSwitch({ className }: { className?: string }) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <nav aria-label={t("language")} className={cx("eyebrow flex items-center gap-2", className)}>
      {routing.locales.map((l, i) => (
        <span key={l} className="flex items-center gap-2">
          {i > 0 && <span aria-hidden className="opacity-40">·</span>}
          <Link
            href={pathname}
            locale={l}
            aria-current={l === locale ? "true" : undefined}
            className={cx(
              "transition-opacity",
              l === locale ? "opacity-100" : "opacity-50 hover:opacity-100",
            )}
          >
            {l.toUpperCase()}
          </Link>
        </span>
      ))}
    </nav>
  );
}
