// Toutes les photos du site.
// Pour remplacer une photo après le shooting : écraser le fichier dans public/images/
// en gardant le même nom (dimensions et flou de chargement sont recalculés au build).
import hero from "../../public/images/hero.jpg";
import leahJournal from "../../public/images/leah-journal.jpg";
import leahPortrait from "../../public/images/leah-portrait.jpg";
import leahBureau from "../../public/images/leah-bureau.jpg";
import leahLecture from "../../public/images/leah-lecture.jpg";
import leahMagazine from "../../public/images/leah-magazine.jpg";
import expertise01 from "../../public/images/expertise-01.jpg";
import expertise02 from "../../public/images/expertise-02.jpg";
import expertise03 from "../../public/images/expertise-03.jpg";
import expertise04 from "../../public/images/expertise-04.jpg";
import voyage from "../../public/images/voyage.jpg";
import parlonsEn from "../../public/images/parlons-en.jpg";
import contact from "../../public/images/contact.jpg";
import diner from "../../public/images/diner.jpg";
import mode from "../../public/images/mode.jpg";

export const images = {
  /** Accueil — grand visuel : photo HORIZONTALE, visage hors cadre (buste, mains, magazine / café), sujet centré */
  hero,
  /** L'histoire — Leah avec un journal ou un magazine à la main */
  leahJournal,
  /** Accueil — portrait de Leah (bloc citation) */
  leahPortrait,
  /** L'histoire — mosaïque (Leah au bureau, magazines étalés) */
  leahBureau,
  /** L'histoire — mosaïque */
  leahLecture,
  /** L'histoire — mosaïque */
  leahMagazine,
  /** Expertises 01 à 04 */
  expertise01,
  expertise02,
  expertise03,
  expertise04,
  /** Accueil — bandeau final « Parlons-en » */
  voyage,
  /** Page Parlons-en */
  parlonsEn,
  /** Page Contact */
  contact,
  /** Réserve */
  diner,
  mode,
};
