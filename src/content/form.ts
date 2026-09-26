// Options des menus déroulants du formulaire « Parlons-en ».
// Les libellés affichés sont dans messages/*.json (form.zoneOptions / form.sectorOptions).
export const zones = ["france", "international", "both"] as const;

export const sectors = [
  "fashion",
  "jewellery",
  "hospitality",
  "restaurant",
  "beauty",
  "design",
  "other",
] as const;
