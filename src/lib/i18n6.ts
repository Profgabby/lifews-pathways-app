import { homeCopy as baseHomeCopy, learnerCopy as baseLearnerCopy } from "@/lib/i18n";

export type AppLanguage = "en" | "ha" | "ar" | "yo" | "ig" | "fr";

export const supportedLanguages: { code: AppLanguage; label: string; nativeLabel: string }[] = [
  { code: "en", label: "English", nativeLabel: "English" },
  { code: "ha", label: "Hausa", nativeLabel: "Hausa" },
  { code: "ar", label: "Arabic", nativeLabel: "العربية" },
  { code: "yo", label: "Yoruba", nativeLabel: "Yorùbá" },
  { code: "ig", label: "Igbo", nativeLabel: "Igbo" },
  { code: "fr", label: "French", nativeLabel: "Français" },
];

export function normalizeLanguage(value?: string): AppLanguage {
  return supportedLanguages.some((language) => language.code === value)
    ? (value as AppLanguage)
    : "en";
}

export function localizeHref(href: string, language: AppLanguage) {
  if (href.startsWith("#")) return href;
  const separator = href.includes("?") ? "&" : "?";
  return `${href}${separator}lang=${language}`;
}

const frenchHome = {
  tagline: "De l’apprentissage aux opportunités",
  nav: ["Accueil", "Espace apprenant", "Espace du personnel", "Aperçu du programme"],
  developed: "Un programme développé par LIFEWS",
  title: "LIFEWS Pathways",
  pillars: "Apprentissage • Compétences • Agriculture • Entrepreneuriat • Transition",
  intro: "Un programme pratique d’apprentissage et de transition destiné aux apprenants Almajiri, aux enfants et filles non scolarisés, aux adolescents défavorisés et aux jeunes adultes en transition.",
  learnerButton: "Entrer dans l’espace apprenant",
  staffButton: "Connexion du personnel",
  learnerKicker: "Pour les apprenants",
  learnerTitle: "Apprenez, progressez et construisez votre Pathways Passport",
  learnerBody: "Utilisez des activités adaptées à l’âge, les missions GrowMeal, la découverte des aliments, des projets, des défis et des étapes de progression.",
  learnerLink: "Ouvrir l’espace apprenant →",
  staffKicker: "Pour les éducateurs et le personnel du programme",
  staffTitle: "Gérer l’apprentissage, l’assiduité et les transitions vérifiées",
  staffBody: "Le personnel autorisé peut inscrire les apprenants, consigner les preuves, gérer la protection, soutenir les transitions et examiner les performances du programme.",
  staffLink: "Ouvrir l’espace du personnel →",
  servesKicker: "Publics desservis par le programme",
  servesTitle: "Des parcours inclusifs vers l’apprentissage et les opportunités",
  audiences: ["Apprenants Almajiri", "Enfants non scolarisés", "Filles non scolarisées", "Adolescents défavorisés", "Jeunes adultes en transition"],
  tracks: [
    ["Parcours d’apprentissage et de moyens de subsistance Almajiri", "Éducation, compétences pratiques, agriculture et soutien à la transition."],
    ["Parcours d’apprentissage et d’entrepreneuriat pour les filles", "Apprentissage, protection, compétences pratiques et possibilités d’avenir."],
    ["Parcours général pour les non-scolarisés", "Retour flexible à l’apprentissage, développement des compétences et planification d’une transition positive."],
  ],
  footer: "Développé par LIFEWS.",
} as const;

const frenchLearner = {
  journey: "Votre parcours d’apprentissage",
  title: "Apprendre. Grandir. Construire. Avancer.",
  intro: "Utilisez cet espace pour les activités d’apprentissage, les missions pratiques, les projets et votre Pathways Passport.",
  privacy: "Votre progression personnelle utilisera un code d’accès apprenant sécurisé. Aucune page publique n’expose les données privées d’un apprenant.",
  back: "Retour à l’accueil",
  explore: "Explorer →",
  younger: "Pour les plus jeunes apprenants",
  assistedTitle: "L’apprentissage accompagné par un enseignant et en groupe est pris en charge.",
  assistedBody: "Les éducateurs peuvent guider les activités sur un appareil partagé, tandis que les apprenants plus âgés peuvent progressivement utiliser leur propre accès sécurisé.",
  educator: "Connexion éducateur",
  areas: [
    ["Mon apprentissage", "Activités de lecture, calcul, sciences, numérique et compétences de vie."],
    ["GrowMeal", "Missions de jardinage, observations et apprentissage pratique de la production alimentaire."],
    ["Découverte des aliments", "Ingrédients, hygiène, étiquettes et activités sur les systèmes alimentaires."],
    ["Mon Passport", "Projets, badges, compétences et étapes de progression."],
    ["Défis", "Courtes missions qui transforment l’apprentissage en résolution pratique de problèmes."],
    ["Mon avenir", "Explorez l’éducation, la formation, l’agriculture, l’apprentissage professionnel et les carrières."],
  ],
} as const;

export const homeCopy = {
  ...baseHomeCopy,
  fr: frenchHome,
} as const;

export const learnerCopy = {
  ...baseLearnerCopy,
  fr: frenchLearner,
} as const;
