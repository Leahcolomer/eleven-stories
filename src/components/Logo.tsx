import { cx } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** Affiche « RELATIONS PRESSE » sous le nom */
  tagline?: boolean;
};

/**
 * Logo Eleven Stories recréé en typographie (reste net à toutes les tailles
 * et prend la couleur du texte courant). La taille se règle via font-size.
 */
export function Logo({ className, tagline = true }: LogoProps) {
  return (
    <span
      className={cx("inline-flex flex-col items-center leading-none", className)}
      role="img"
      aria-label="Eleven Stories — Relations presse"
    >
      <span className="whitespace-nowrap" aria-hidden>
        <span className="font-sans font-normal tracking-[-0.035em]">eleven</span>
        <span className="font-logo font-bold italic tracking-[-0.01em]">
          {" "}
          stories
        </span>
      </span>
      {tagline && (
        <span
          aria-hidden
          className="font-label mt-[0.62em] pl-[0.42em] text-[0.21em] font-normal uppercase tracking-[0.42em]"
        >
          Relations presse
        </span>
      )}
    </span>
  );
}
