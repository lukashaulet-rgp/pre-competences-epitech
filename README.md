# Pré-compétences & Tournois — concept pour l'intranet Epitech

> **Concept étudiant, non officiel.** Maquette d'interface proposée lors d'un hackathon Epitech. Toutes les données sont fictives.

**Démo en ligne :** https://lukashaulet-rgp.github.io/pre-competences-epitech/

## L'idée

À Epitech, une compétence est validée à la **défense** (avec un AER) ou par la **moulinette IA**. Mais avant ce moment, l'étudiant ne sait pas vraiment où il en est.

Ce projet ajoute deux onglets à l'intranet :

### 1. Pré-compétences
Un nouvel onglet entre « Détails académiques » et « Planning ».

- Pour chaque projet, chaque compétence a un niveau de **0 à 5**.
- Des **exercices** valident chaque niveau : réussir l'exercice de niveau 3 donne la pré-compétence de niveau 3.
- Des **cours** (vidéos, articles, TP) sont disponibles pour chaque compétence.
- On compare le **niveau actuel** (défense / moulinette) au **niveau de pré-compétence** (exercices).
- Pour chaque exercice, on voit le **nombre d'essais**, les réussites et les échecs, le temps passé et la date de réussite.
- Le **graphe de validation** (projets → compétences → module) montre ce que deviendraient tes résultats si tu passais la défense maintenant.

### 2. Tournois
- **Un tournoi par semaine et par promo**, sur un de ses projets (ex. : Bachelor 1 sur *Organized*).
- **Finir 1er = 1 crédit tournoi.**
- Des récompenses par paliers, sans toucher aux notes ni aux crédits ECTS :

| Crédits | Récompense |
|---|---|
| 3 | Badge « Champion » sur le profil |
| 5 | Goodies Epitech |
| 10 | Choix du créneau de défense en premier |
| 15 | 30 min de mentorat (ancien ou entreprise partenaire) |
| 20 | **-50 % sur une certification au choix** |

## Lancer le projet

Il faut [Node.js](https://nodejs.org) (version 20 ou plus).

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:5173/pre-competences-epitech/

## Technologies

- [React](https://react.dev) + [Vite](https://vite.dev)
- [Tailwind CSS](https://tailwindcss.com) v4
- [Lucide](https://lucide.dev) pour les icônes
- Polices : Anton, IBM Plex Sans, IBM Plex Mono (Google Fonts)

## Organisation du code

```
src/
├── App.jsx              # Passe d'une page à l'autre
├── ui.jsx               # Éléments communs : en-tête, menu, bandeau, panneau latéral
├── SkillsPage.jsx       # Page Pré-compétences
├── ValidationGraph.jsx  # Graphe de validation
├── TournamentsPage.jsx  # Page Tournois
├── data.js              # Données de démo et calculs
└── index.css            # Couleurs et polices du thème Epitech
```

Pour changer les projets, les exercices, les tournois ou les récompenses, il suffit de modifier `src/data.js`.

## Mise en ligne

Chaque `git push` sur `main` reconstruit et publie le site sur GitHub Pages (voir `.github/workflows/pages.yml`).

## Limites

- Interface seulement : pas de serveur, pas de vraies données.
- Pensée pour un écran d'ordinateur, pas pour le téléphone.
