import type { StaticImageData } from "next/image";

// Projets affichés sur la page « Ils écrivent l'histoire avec nous ».
// Tant que la liste est vide, la page affiche un message d'attente.
//
// Pour ajouter un projet :
//   1. déposer la photo dans public/images/projets/ (ex. maison-x.jpg)
//   2. l'importer ci-dessous et ajouter une entrée dans `projects`
//
// Exemple :
//   import maisonX from "../../public/images/projets/maison-x.jpg";
//   {
//     client: "Maison X",
//     category: { fr: "Joaillerie", en: "Fine jewellery" },
//     location: "Paris",
//     year: "2026",
//     description: {
//       fr: "Lancement de la collection printemps auprès de la presse mode.",
//       en: "Spring collection launch with the fashion press.",
//     },
//     image: maisonX,
//   },

export type Project = {
  client: string;
  category: { fr: string; en: string };
  location?: string;
  year?: string;
  description: { fr: string; en: string };
  image: StaticImageData;
};

export const projects: Project[] = [];
