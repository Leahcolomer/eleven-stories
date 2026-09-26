import type { ReactNode } from "react";
import { cx } from "@/lib/utils";
import { Reveal } from "./Reveal";

type PageIntroProps = {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  className?: string;
};

/** En-tête des pages intérieures : libellé, grand titre éditorial, chapô */
export function PageIntro({ eyebrow, title, children, className }: PageIntroProps) {
  return (
    <header className={cx("mx-auto max-w-[1600px] px-6 pb-16 pt-36 md:px-10 md:pb-24 md:pt-48", className)}>
      <Reveal immediate>
        <p className="eyebrow flex items-center gap-4 text-taupe">
          <span aria-hidden className="h-px w-10 bg-current" />
          {eyebrow}
        </p>
        <h1 className="display mt-8 max-w-5xl text-[2.75rem] sm:text-6xl md:text-7xl xl:text-8xl">
          {title}
        </h1>
      </Reveal>
      {children && (
        <Reveal immediate delay={0.15} className="mt-10 max-w-2xl text-lg leading-relaxed text-muted md:ml-[33%] md:mt-14">
          {children}
        </Reveal>
      )}
    </header>
  );
}
