"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /**
   * Contenu visible dès l'arrivée sur la page (haut de page) : animation CSS
   * lancée au premier affichage, sans attendre le chargement du JavaScript.
   */
  immediate?: boolean;
};

/** Apparition douce au scroll (désactivée si l'utilisateur limite les animations) */
export function Reveal({ children, className, delay = 0, y = 28, immediate }: RevealProps) {
  const reduce = useReducedMotion();

  if (immediate) {
    return (
      <div
        className={className ? `animate-rise ${className}` : "animate-rise"}
        style={{ animationDelay: `${delay + 0.1}s` }}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
