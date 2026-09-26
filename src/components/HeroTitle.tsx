import type { ReactNode } from "react";
import { ButtonLink } from "./ButtonLink";

/**
 * Titre centré du grand visuel d'accueil. Animé en CSS pur pour s'afficher
 * immédiatement (c'est l'élément principal mesuré par Google).
 */
export function HeroTitle({
  eyebrow,
  cta,
  children,
}: {
  eyebrow: string;
  cta: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-5xl text-center">
      <p className="eyebrow animate-rise text-paper/85" style={{ animationDelay: "0.1s" }}>
        {eyebrow}
      </p>
      <h1
        className="display animate-rise mt-8 text-[3.25rem] leading-[0.98] sm:text-7xl md:text-8xl xl:text-[8rem]"
        style={{ animationDelay: "0.2s" }}
      >
        {children}
      </h1>
      <div className="animate-rise mt-12" style={{ animationDelay: "0.5s" }}>
        <ButtonLink href="/parlons-en" variant="light">
          {cta}
        </ButtonLink>
      </div>
    </div>
  );
}
