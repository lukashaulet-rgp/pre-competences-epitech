// Données de démo : tout est inventé pour le hackathon.

// Mêmes couleurs que la légende du "Graphe de validation" de l'intra
export const LEVELS = [
  { label: "NIVEAU 0", short: "0", color: "#e5595b" },
  { label: "NIVEAU 1", short: "1", color: "#ef6b3f" },
  { label: "NIVEAU 2", short: "2", color: "#e6b93d" },
  { label: "NIVEAU 3", short: "3", color: "#8d9df6" },
  { label: "NIVEAU 4", short: "4", color: "#5fcf91" },
  { label: "NIVEAU MAX", short: "5", color: "#c565e6" },
];

// ex(titre, niveau validé par l'exo, échecs, réussites, minutes passées, date de réussite)
const ex = (title, level, fails, successes, minutes, successDate = null) => ({
  title, level, fails, successes, minutes, successDate,
});
// course(titre, type, durée, déjà vu ?)
const course = (title, type, duration, done = false) => ({ title, type, duration, done });

export const PROJECTS = [
  {
    id: "etodo", name: "my_e-todo", module: "Fondamentaux du développement web", credits: 7, deadline: "J-2",
    skills: [
      {
        name: "Modéliser les données d'une application avec des types et des contraintes",
        official: 1, required: 3,
        courses: [
          course("Les types de données en SQL", "VIDÉO", "12 min", true),
          course("Clés primaires, étrangères et contraintes", "ARTICLE", "8 min", true),
          course("Normaliser une base de données", "VIDÉO", "18 min"),
        ],
        exercises: [
          ex("Créer la table user", 1, 0, 2, 25, "12/11"),
          ex("Relier user et todo", 2, 3, 1, 70, "19/11"),
          ex("Contraintes NOT NULL et UNIQUE", 3, 2, 0, 40),
          ex("Schéma complet d'une app de tâches", 4, 0, 0, 0),
        ],
      },
      {
        name: "Concevoir une API REST et ses routes",
        official: 2, required: 3,
        courses: [
          course("Qu'est-ce qu'une API REST ?", "VIDÉO", "10 min", true),
          course("Express : routes et middlewares", "TP", "45 min", true),
        ],
        exercises: [
          ex("Route GET /todos", 1, 0, 1, 15, "10/11"),
          ex("CRUD complet", 2, 1, 1, 55, "14/11"),
          ex("Codes HTTP et erreurs", 3, 2, 1, 50, "21/11"),
          ex("Pagination et filtres", 4, 0, 0, 0),
        ],
      },
      {
        name: "Sécuriser une authentification (hash, JWT)",
        official: 0, required: 3,
        courses: [
          course("Hasher un mot de passe avec bcrypt", "ARTICLE", "6 min", true),
          course("Comprendre les JWT", "VIDÉO", "14 min"),
        ],
        exercises: [
          ex("Inscription avec mot de passe hashé", 1, 1, 1, 30, "17/11"),
          ex("Connexion et token JWT", 2, 2, 1, 65, "22/11"),
          ex("Protéger les routes privées", 3, 1, 0, 20),
        ],
      },
      {
        name: "Écrire des requêtes SQL fiables",
        official: 3, required: 2,
        courses: [course("SELECT, JOIN et sous-requêtes", "VIDÉO", "20 min", true)],
        exercises: [
          ex("SELECT avec filtres", 1, 0, 1, 10, "05/11"),
          ex("Jointures", 2, 1, 1, 35, "08/11"),
          ex("Requêtes préparées", 3, 0, 1, 25, "13/11"),
          ex("Transactions", 4, 1, 1, 45, "20/11"),
        ],
      },
    ],
  },
  {
    id: "dashboard", name: "Dashboard", module: "Fondamentaux du développement web", credits: 7, deadline: "J-9",
    skills: [
      {
        name: "Consommer une API externe", official: 2, required: 3,
        courses: [course("fetch et async/await", "VIDÉO", "15 min", true)],
        exercises: [
          ex("Appeler une API météo", 1, 0, 1, 20, "15/11"),
          ex("Gérer les erreurs réseau", 2, 1, 1, 30, "18/11"),
          ex("Mettre en cache les réponses", 3, 0, 1, 40, "23/11"),
        ],
      },
      {
        name: "Gérer l'état d'une application front-end", official: 1, required: 3,
        courses: [course("L'état en React", "TP", "40 min")],
        exercises: [
          ex("Compteur avec useState", 1, 0, 1, 10, "16/11"),
          ex("Formulaire contrôlé", 2, 2, 0, 35),
        ],
      },
    ],
  },
  {
    id: "resume", name: "Digital resume", module: "Fondamentaux du développement web", credits: 7, deadline: "Rendu",
    skills: [
      {
        name: "Écrire un HTML sémantique et accessible", official: 4, required: 3,
        courses: [course("Les balises sémantiques", "ARTICLE", "7 min", true)],
        exercises: [
          ex("Structure d'une page", 1, 0, 1, 10, "02/10"),
          ex("Formulaire accessible", 2, 0, 1, 20, "04/10"),
          ex("Navigation au clavier", 3, 1, 1, 30, "06/10"),
          ex("Audit Lighthouse à 100", 4, 0, 1, 45, "08/10"),
        ],
      },
    ],
  },
  {
    id: "fullstack", name: "First fullstack website", module: "Fondamentaux du développement web", credits: 7, deadline: "J-16",
    skills: [
      {
        name: "Relier un front-end et un back-end", official: 0, required: 3,
        courses: [course("CORS expliqué simplement", "VIDÉO", "9 min")],
        exercises: [
          ex("Afficher des données du back", 1, 1, 1, 30, "20/11"),
          ex("Envoyer un formulaire au back", 2, 1, 0, 25),
        ],
      },
      {
        name: "Déployer une application web", official: 0, required: 2,
        courses: [course("Déployer sur un serveur", "TP", "50 min")],
        exercises: [ex("Premier déploiement", 1, 0, 0, 0)],
      },
    ],
  },
];

/* ---------- Tournois ---------- */

export const ME = { login: "lukas.haulet", promo: "BACHELOR 1", credits: 7 };
export const CREDITS_FOR_CERTIF = 20;

// Un tournoi par promo et par semaine
export const WEEK = 48;
export const WEEKLY = [
  {
    promo: "BACHELOR 1", project: "Organized", endsIn: "2j 14h", players: 52,
    board: [
      { login: "ines.martin", score: 98, time: "1h42" },
      { login: "lukas.haulet", score: 96, time: "1h55" },
      { login: "yanis.benali", score: 91, time: "2h10" },
      { login: "chloe.durand", score: 87, time: "2h31" },
      { login: "hugo.petit", score: 80, time: "2h48" },
    ],
  },
  { promo: "BACHELOR 2", project: "AREA", endsIn: "2j 14h", players: 41 },
  { promo: "PGE 1", project: "Bistro-matic", endsIn: "2j 14h", players: 126 },
  { promo: "PGE 2", project: "Raytracer", endsIn: "2j 14h", players: 98 },
];

export const HISTORY = [
  { week: 47, project: "my_e-todo", rank: 1, players: 48 },
  { week: 46, project: "Digital resume", rank: 1, players: 50 },
  { week: 45, project: "Web Dev Pool Day02", rank: 4, players: 55 },
  { week: 44, project: "Web Dev Pool Day01", rank: 1, players: 55 },
  { week: 43, project: "CPool Day10", rank: 2, players: 57 },
];

// Paliers de récompenses : utiles, mais sans toucher aux notes ni aux crédits ECTS
export const REWARDS = [
  { at: 3, title: "Badge profil", text: "Un badge « Champion » sur ton profil intra." },
  { at: 5, title: "Goodies Epitech", text: "Un sweat ou un mug de l'école." },
  { at: 10, title: "Créneau de défense", text: "Tu choisis ton créneau de défense en premier." },
  { at: 15, title: "Mentorat", text: "30 min avec un ancien ou une entreprise partenaire." },
  { at: 20, title: "-50 % certification", text: "La moitié du prix d'une certification au choix." },
];

export const CERTIFS = [
  { id: "aws", name: "AWS Cloud Practitioner", org: "Amazon Web Services", tag: "CLOUD" },
  { id: "ai900", name: "Azure AI Fundamentals", org: "Microsoft", tag: "IA" },
  { id: "toeic", name: "TOEIC Listening & Reading", org: "ETS", tag: "ANGLAIS" },
  { id: "pix", name: "Certification Pix", org: "Pix", tag: "NUMÉRIQUE" },
];

/* ---------- Calculs ---------- */

// La pré-compétence = le plus haut niveau d'exercice réussi
export const preLevel = (skill) =>
  Math.max(0, ...skill.exercises.filter((e) => e.successes > 0).map((e) => e.level));

export function skillStats(skill) {
  const minutes = skill.exercises.reduce((sum, e) => sum + e.minutes, 0);
  const fails = skill.exercises.reduce((sum, e) => sum + e.fails, 0);
  const successes = skill.exercises.reduce((sum, e) => sum + e.successes, 0);
  // shortcut: dates "jj/mm" de la même année, suffisant pour la démo
  const sortable = (d) => d.split("/").reverse().join("/");
  const dates = skill.exercises.filter((e) => e.successDate).map((e) => e.successDate);
  const last = dates.sort((a, b) => sortable(a).localeCompare(sortable(b))).pop();
  return { minutes, fails, successes, attempts: fails + successes, last: last || "—" };
}

export const formatTime = (minutes) =>
  minutes < 60 ? `${minutes} min` : `${Math.floor(minutes / 60)}h${String(minutes % 60).padStart(2, "0")}`;

export const readiness = (project) =>
  Math.round((project.skills.filter((s) => preLevel(s) >= s.required).length / project.skills.length) * 100);

// Même légende "Projets" que le graphe de validation
export function readinessColor(pct) {
  if (pct === 100) return "#5fcf91";
  if (pct >= 75) return "#8d9df6";
  if (pct >= 50) return "#e6b93d";
  if (pct >= 25) return "#ef6b3f";
  return "#e5595b";
}
