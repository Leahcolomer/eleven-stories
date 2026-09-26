# Eleven Stories — site vitrine

Site de l'agence de relations presse **Eleven Stories** (Leah Colomer).
Next.js 16 · React 19 · Tailwind CSS 4 · next-intl (FR/EN) · Resend · hébergé sur Vercel.

## Lancer en local

```bash
npm install
cp .env.example .env.local   # puis renseigner RESEND_API_KEY
npm run dev                  # http://localhost:3000
```

`npm run build` vérifie que tout compile avant une mise en ligne.

## Où modifier quoi

| Je veux…                                      | Fichier                                         |
| --------------------------------------------- | ----------------------------------------------- |
| Changer un texte (FR ou EN)                   | `messages/fr.json`, `messages/en.json`          |
| Changer email, téléphone, Instagram, SIREN    | `src/content/site.ts`                           |
| Remplacer une photo                           | `public/images/` (voir ci-dessous)              |
| Ajouter un projet « Ils écrivent l'histoire » | `src/content/projects.ts`                       |
| Couleurs, typos                               | `src/app/globals.css` (bloc `@theme`)           |
| Options du formulaire (secteurs, zones)       | `src/content/form.ts` + libellés dans messages  |

Dans les textes, `<em>…</em>` affiche le passage en italique serif (les accents éditoriaux).

### Remplacer les photos (après le shooting)

Les photos actuelles sont provisoires (Unsplash). Il suffit d'**écraser le fichier dans `public/images/` en gardant le même nom** :

| Fichier                                         | Emplacement                                        |
| ----------------------------------------------- | -------------------------------------------------- |
| `hero.jpg`                                      | Accueil, grand visuel : photo horizontale, visage hors cadre (buste + mains avec magazine, café…), sujet centré car le titre est posé au milieu |
| `leah-journal.jpg`                              | L'histoire, photo principale (Leah + journal)      |
| `leah-portrait.jpg`                             | Accueil (bloc citation) + menu                     |
| `leah-bureau.jpg`, `leah-magazine.jpg`, `leah-lecture.jpg` | L'histoire, mosaïque                    |
| `expertise-01.jpg` … `expertise-04.jpg`         | Page Nos expertises (+ 01 sur l'accueil)           |
| `voyage.jpg`                                    | Accueil, bandeau final « Parlons-en »              |
| `parlons-en.jpg`, `contact.jpg`                 | Pages Parlons-en et Contact                        |

Idéalement : JPG noir & blanc, ~2000 px de large maximum, < 500 Ko.
Si la photo est sensible, on peut aussi changer l'image utilisée dans `src/content/images.ts`.

### Ajouter un projet

1. Déposer la photo dans `public/images/projets/` ;
2. Suivre l'exemple commenté dans `src/content/projects.ts`.

Tant que la liste est vide, la page affiche « Les premières histoires s'écrivent en ce moment… ».

## Mise en ligne

1. **GitHub** : pousser ce dossier sur un dépôt du compte de Leah.
2. **Vercel** : *Add New → Project* → importer le dépôt (framework détecté automatiquement).
   Dans *Settings → Environment Variables*, ajouter `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`.
   Activer *Analytics* dans l'onglet du projet (mesure d'audience sans cookies).
3. **Domaine** : Vercel → *Settings → Domains* → ajouter `elevenstories.fr` et `www.elevenstories.fr`.
   Dans Hostinger → *DNS / Nameservers* du domaine, créer les enregistrements indiqués par Vercel
   (en général `A @ → 76.76.21.21` et `CNAME www → cname.vercel-dns.com`) et supprimer les anciens enregistrements A/CNAME par défaut de Hostinger.
4. **Resend** : *Domains → Add domain* → `elevenstories.fr`, puis copier les enregistrements DKIM / SPF (TXT et MX) dans le DNS Hostinger.
   Une fois le domaine vérifié, passer `CONTACT_FROM_EMAIL` à `Eleven Stories <contact@elevenstories.fr>` dans Vercel et redéployer.

## À compléter

- [ ] SIREN → `src/content/site.ts` (`siren`)
- [ ] Lien Instagram → `src/content/site.ts` (`instagram`)
- [ ] Photos du shooting du 3 octobre
- [ ] Relecture des textes anglais par Leah
