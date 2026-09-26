import type { ReactNode } from "react";

export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** Balise <em> pour les accents italiques des textes traduits (t.rich) */
export const em = (chunks: ReactNode) => <em>{chunks}</em>;
