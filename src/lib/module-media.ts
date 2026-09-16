export type ModuleMedia = {
  asset: string;
  alt: string;
  role: "hero" | "context";
};

/**
 * Central curriculum-media resolver.
 * Assets live under /public/curriculum-media once the approved LIFEWS image pack
 * is installed. Keeping the mapping here prevents decorative image repetition
 * and lets one technically relevant photograph support related modules.
 */
const media: Record<string, ModuleMedia> = {
  // Pathways: human-centred, foundational and transition imagery.
  "PF-01": { asset: "/curriculum-media/pathways-almajiri-learning.webp", alt: "Learners taking part in a supervised foundational learning session", role: "hero" },
  "PF-04": { asset: "/curriculum-media/pathways-garden-learning.webp", alt: "Learners observing plants in a supervised learning garden", role: "context" },
  "PF-06": { asset: "/curriculum-media/pathways-garden-learning.webp", alt: "Learners exploring water use in a productive learning garden", role: "context" },
  "PE-01": { asset: "/curriculum-media/pathways-garden-learning.webp", alt: "Learners exploring food production in a supervised garden", role: "hero" },
  "PE-04": { asset: "/curriculum-media/greentech-water-irrigation.webp", alt: "Water storage, pumping and irrigation equipment at a training site", role: "context" },
  "PT-04": { asset: "/curriculum-media/pathways-girls-digital-learning.webp", alt: "Young women taking part in supervised digital learning", role: "context" },
  "PT-12": { asset: "/curriculum-media/pathways-kadara-transition.webp", alt: "Learners progressing from foundational learning to practical skills", role: "hero" },

  // Kadara: skills, work-readiness and practical application.
  "KS-01": { asset: "/curriculum-media/kadara-skills-workshop.webp", alt: "Kadara learners developing practical skills under supervision", role: "hero" },
  "KS-02": { asset: "/curriculum-media/kadara-skills-workshop.webp", alt: "Learners using hand tools safely in a supervised workshop", role: "context" },
  "KS-04": { asset: "/curriculum-media/greentech-water-irrigation.webp", alt: "Learners examining a water storage, pumping and irrigation system", role: "context" },
  "KS-05": { asset: "/curriculum-media/food-processing-hygiene.webp", alt: "Learners practising safe food processing and hygiene", role: "context" },
  "KW-01": { asset: "/curriculum-media/kadara-workforce-few.webp", alt: "Kadara learners developing food, energy, water and digital work skills", role: "hero" },
  "KW-03": { asset: "/curriculum-media/greentech-water-irrigation.webp", alt: "Technicians examining irrigation flow and water-system equipment", role: "context" },
  "KW-04": { asset: "/curriculum-media/food-processing-hygiene.webp", alt: "Supervised food-processing operations in a clean training environment", role: "context" },
  "KW-05": { asset: "/curriculum-media/greentech-agrivoltaics.webp", alt: "Photovoltaic energy equipment supporting agricultural operations", role: "context" },
  "KW-06": { asset: "/curriculum-media/greentech-tools-maintenance.webp", alt: "Learners carrying out supervised technical maintenance", role: "context" },
  "KW-07": { asset: "/curriculum-media/greentech-sensors-data.webp", alt: "Learners collecting and reviewing digital field measurements", role: "context" },

  // GreenTech Foundation Technician.
  "GF-01": { asset: "/curriculum-media/greentech-integrated-few.webp", alt: "Integrated food, energy and water training system", role: "hero" },
  "GF-02": { asset: "/curriculum-media/greentech-fieldwork.webp", alt: "Technical learners completing supervised fieldwork with appropriate PPE", role: "context" },
  "GF-03": { asset: "/curriculum-media/greentech-tools-maintenance.webp", alt: "Technical measurement and maintenance tools arranged for supervised training", role: "context" },
  "GF-04": { asset: "/curriculum-media/greentech-electrical-measurement.webp", alt: "Safe electrical measurement on protected training equipment", role: "context" },
  "GF-05": { asset: "/curriculum-media/greentech-agrivoltaics.webp", alt: "Photovoltaic and agrivoltaic equipment at an agricultural training site", role: "context" },
  "GF-06": { asset: "/curriculum-media/greentech-water-irrigation.webp", alt: "Water storage, pumping and irrigation system used for technician training", role: "context" },
  "GF-07": { asset: "/curriculum-media/greentech-crop-observation.webp", alt: "Learners measuring soil and crop conditions in the field", role: "context" },
  "GF-08": { asset: "/curriculum-media/greentech-sensors-data.webp", alt: "Agricultural sensors and digital data collection in the field", role: "context" },
  "GF-09": { asset: "/curriculum-media/greentech-tools-maintenance.webp", alt: "Supervised fabrication and maintenance practice", role: "context" },
  "GF-10": { asset: "/curriculum-media/food-processing-hygiene.webp", alt: "Clean food-processing and hygiene training", role: "context" },
  "GF-11": { asset: "/curriculum-media/greentech-fieldwork.webp", alt: "Technical learners documenting practical field evidence", role: "context" },
  "GF-12": { asset: "/curriculum-media/greentech-integrated-few.webp", alt: "Integrated food, energy and water system used for practical assessment", role: "hero" },

  // FEW Systems Technician: site evidence, integration and commissioning.
  "GT2-01": { asset: "/curriculum-media/greentech-fieldwork.webp", alt: "Technicians conducting a supervised site assessment", role: "hero" },
  "GT2-02": { asset: "/curriculum-media/greentech-integrated-few.webp", alt: "Integrated food, energy and water infrastructure for technical design", role: "context" },
  "GT2-03": { asset: "/curriculum-media/greentech-water-irrigation.webp", alt: "Pump, storage and irrigation infrastructure used for hydraulic assessment", role: "context" },
  "GT2-04": { asset: "/curriculum-media/greentech-agrivoltaics.webp", alt: "Photovoltaic generation integrated with agricultural operations", role: "context" },
  "GT2-05": { asset: "/curriculum-media/greentech-electrical-measurement.webp", alt: "Protected electrical measurement during technician training", role: "context" },
  "GT2-06": { asset: "/curriculum-media/greentech-sensors-data.webp", alt: "Field sensors connected to digital monitoring and data collection", role: "context" },
  "GT2-07": { asset: "/curriculum-media/greentech-integrated-few.webp", alt: "Connected food, energy and water subsystems at a training site", role: "context" },
  "GT2-08": { asset: "/curriculum-media/greentech-tools-maintenance.webp", alt: "Technicians inspecting and maintaining system components", role: "context" },
  "GT2-09": { asset: "/curriculum-media/greentech-sensors-data.webp", alt: "Technicians reviewing measured system data", role: "context" },
  "GT2-10": { asset: "/curriculum-media/greentech-fieldwork.webp", alt: "Supervised technicians verifying system operation in the field", role: "context" },
  "GT2-11": { asset: "/curriculum-media/greentech-integrated-few.webp", alt: "Integrated FEW system prepared for commissioning and verification", role: "context" },
  "GT2-12": { asset: "/curriculum-media/greentech-fieldwork.webp", alt: "Technicians completing a supervised integrated field assessment", role: "hero" },

  // Advanced Systems: integrated control, evidence and optimisation.
  "GA-01": { asset: "/curriculum-media/greentech-integrated-few.webp", alt: "Advanced integrated food, energy and water system", role: "hero" },
  "GA-02": { asset: "/curriculum-media/greentech-sensors-data.webp", alt: "Advanced sensor monitoring and digital data collection", role: "context" },
  "GA-03": { asset: "/curriculum-media/greentech-water-irrigation.webp", alt: "Water storage and pumping infrastructure for advanced system analysis", role: "context" },
  "GA-04": { asset: "/curriculum-media/greentech-agrivoltaics.webp", alt: "Agrivoltaic generation integrated with agricultural loads", role: "context" },
  "GA-05": { asset: "/curriculum-media/greentech-electrical-measurement.webp", alt: "Advanced electrical measurements on protected equipment", role: "context" },
  "GA-06": { asset: "/curriculum-media/greentech-sensors-data.webp", alt: "Sensor evidence supporting advanced system control", role: "context" },
  "GA-07": { asset: "/curriculum-media/greentech-integrated-few.webp", alt: "Integrated FEW infrastructure supporting coordinated control", role: "context" },
  "GA-08": { asset: "/curriculum-media/greentech-fieldwork.webp", alt: "Advanced technicians verifying system behaviour in the field", role: "context" },
  "GA-09": { asset: "/curriculum-media/greentech-tools-maintenance.webp", alt: "Technical troubleshooting and maintenance practice", role: "context" },
  "GA-10": { asset: "/curriculum-media/greentech-sensors-data.webp", alt: "Digital measurements used for performance analysis", role: "context" },
  "GA-11": { asset: "/curriculum-media/greentech-integrated-few.webp", alt: "Integrated system used for optimisation and technical review", role: "context" },
  "GA-12": { asset: "/curriculum-media/greentech-fieldwork.webp", alt: "Advanced technicians completing a supervised capstone field assessment", role: "hero" },
};

export function getModuleMedia(code: string): ModuleMedia | null {
  return media[code.toUpperCase()] ?? null;
}
