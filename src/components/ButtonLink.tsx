import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";
import { cx } from "@/lib/utils";

type Variant = "solid" | "outline" | "light";

const variants: Record<Variant, string> = {
  solid: "bg-ink text-paper border-ink hover:bg-transparent hover:text-ink",
  outline: "border-ink text-ink hover:bg-ink hover:text-paper",
  light: "border-paper/80 text-paper hover:bg-paper hover:text-ink",
};

type ButtonLinkProps = ComponentProps<typeof Link> & { variant?: Variant };

export function ButtonLink({
  variant = "solid",
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      {...props}
      className={cx(
        "eyebrow inline-flex items-center justify-center gap-3 rounded-full border px-8 py-4 !font-normal transition-colors duration-500",
        variants[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}

/** Lien texte « → » en capitales espacées */
export function ArrowLink({
  className,
  children,
  ...props
}: ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      className={cx("eyebrow group inline-flex items-center gap-4 !font-normal", className)}
    >
      <span className="link-underline">{children}</span>
      <span
        aria-hidden
        className="transition-transform duration-500 ease-(--ease-editorial) group-hover:translate-x-1.5"
      >
        →
      </span>
    </Link>
  );
}
