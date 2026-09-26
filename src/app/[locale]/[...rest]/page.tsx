import { notFound } from "next/navigation";

// Toute URL inconnue affiche la page 404 localisée
export default function CatchAll() {
  notFound();
}
