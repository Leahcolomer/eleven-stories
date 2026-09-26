"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ButtonLink } from "./ButtonLink";

const ease = [0.22, 1, 0.36, 1] as const;

/** Titre centré du grand visuel d'accueil, révélé à l'arrivée sur la page */
export function HeroTitle({
  eyebrow,
  cta,
  children,
}: {
  eyebrow: string;
  cta: string;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();

  return (
    <div className="mx-auto max-w-5xl text-center">
      <motion.p
        className="eyebrow text-paper/85"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      >
        {eyebrow}
      </motion.p>
      <motion.h1
        className="display mt-8 text-[3.25rem] leading-[0.98] sm:text-7xl md:text-8xl xl:text-[8rem]"
        initial={reduce ? false : { opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 0.45, ease }}
      >
        {children}
      </motion.h1>
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.9, ease }}
        className="mt-12"
      >
        <ButtonLink href="/parlons-en" variant="light">
          {cta}
        </ButtonLink>
      </motion.div>
    </div>
  );
}
