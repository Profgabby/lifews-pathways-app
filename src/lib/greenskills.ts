export type GreenSkillsProgramId = "pathways" | "kadara" | "greentech";

export type GreenSkillsProgram = {
  id: GreenSkillsProgramId;
  number: string;
  name: string;
  shortName: string;
  eyebrow: string;
  tagline: string;
  purpose: string;
  audience: string[];
  journey: string[];
  href: string;
  action: string;
  themes: string[];
};

export const GREEN_SKILLS_NAME = "LIFEWS GreenSkills™";
export const GREEN_SKILLS_TAGLINE = "Skills for Food • Energy • Water • Livelihoods";
export const GREEN_SKILLS_JOURNEY = ["LEARN", "PRACTICE", "CERTIFY", "WORK", "BUILD", "THRIVE"] as const;

export const greenSkillsPrograms: GreenSkillsProgram[] = [
  {
    id: "pathways",
    number: "01",
    name: "LIFEWS Pathways™",
    shortName: "PATHWAYS™",
    eyebrow: "LEARNING & TRANSITION",
    tagline: "From Learning to Opportunity",
    purpose: "An inclusive learning and transition program creating flexible routes back into education, skills and future opportunity.",
    audience: ["Almajiri learners", "Never-enrolled children", "Out-of-school children", "Out-of-school girls", "School dropouts", "Over-age learners", "Underserved adolescents", "Transitioning youth"],
    journey: ["REACH", "ASSESS", "LEARN", "GROW", "BUILD", "TRANSITION", "THRIVE"],
    href: "/pathways",
    action: "Explore Pathways",
    themes: ["Foundational learning", "Literacy & numeracy", "Life skills", "GrowMeal practical learning", "Food literacy", "Digital foundations", "Projects & challenges", "Education re-entry", "Transition planning"],
  },
  {
    id: "kadara",
    number: "02",
    name: "LIFEWS Kadara™",
    shortName: "KADARA™",
    eyebrow: "SKILLS, WORK & ENTERPRISE",
    tagline: "Learn. Build. Earn.",
    purpose: "A vocational, employability and enterprise pathway helping older adolescents and young adults build practical skills and sustainable livelihoods.",
    audience: ["Older adolescents", "Young adults", "Out-of-school youth", "Entry-level entrepreneurs", "Women entering livelihoods", "Youth transitioning from Pathways"],
    journey: ["DISCOVER", "LEARN", "PRACTICE", "BUILD", "EARN", "LEAD"],
    href: "/kadara",
    action: "Explore Kadara",
    themes: ["Agriculture", "Food production", "Food processing", "Packaging", "Energy", "Water", "Fabrication & maintenance", "Digital skills", "Enterprise", "Cooperatives", "Market readiness", "Microenterprise"],
  },
  {
    id: "greentech",
    number: "03",
    name: "LIFEWS GreenTech™",
    shortName: "GREENTECH™",
    eyebrow: "TECHNICAL TRAINING & CERTIFICATION",
    tagline: "Train. Certify. Deploy.",
    purpose: "Competency-based technical training for the installation, operation and maintenance of integrated food-energy-water systems.",
    audience: ["Youth", "Artisans", "Technicians", "Graduates", "NYSC participants", "Practitioners"],
    journey: ["ORIENT", "TRAIN", "PRACTICE", "ASSESS", "CERTIFY", "DEPLOY"],
    href: "/greentech",
    action: "Explore GreenTech",
    themes: ["Photovoltaic fundamentals", "PV installation & safety", "Water pumping", "Drip irrigation", "Agrivoltaic systems", "FEW systems installation", "Sensors & field monitoring", "CHIPU controls", "Operations & maintenance"],
  },
];

export const sharedGreenSkillsSystems = [
  { name: "LIFEWS Skills Passport™", description: "One lifelong record for courses, competencies, projects, badges, certificates, verified practice and transitions." },
  { name: "FieldWorks™", description: "Verified practical assignments, workplace learning, apprenticeships, field hours and supervisor evidence." },
  { name: "LIFEWS AgriHubs™", description: "Physical training, demonstration and community practice infrastructure." },
  { name: "Grow Systems™", description: "GrowMeal™, GrowFlow™, GrowFloat™, GrowAqua™, GrowFarm™ and GrowPower™ learning and production systems." },
  { name: "LIFEWS FEW™ Products", description: "Deployable engineered food-energy-water systems used for technical learning and field deployment." },
  { name: "CHIPU™", description: "Monitoring, controls and system-intelligence layer supporting practical FEW-system training." },
] as const;
