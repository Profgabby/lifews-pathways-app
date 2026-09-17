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
  "PF-01": { asset: "/curriculum-media/foundational-reading-picture-word-learning.webp", alt: "Pathways learners practising foundational reading with picture-word materials", role: "hero" },
  "PF-02": { asset: "/curriculum-media/numeracy-through-everyday-objects.webp", alt: "Pathways learners applying numeracy with everyday objects", role: "context" },
  "PF-03": { asset: "/curriculum-media/pathways-foundational-storytelling.webp", alt: "Pathways learners developing understanding through facilitated storytelling", role: "context" },
  "PF-04": { asset: "/curriculum-media/digital-documentation-of-learning.webp", alt: "Pathways learners documenting garden learning with a tablet", role: "hero" },
  "PF-05": { asset: "/curriculum-media/pathways-garden-planting.webp", alt: "Pathways learners planting and caring for a learning garden", role: "hero" },
  "PF-06": { asset: "/curriculum-media/safe-water-handwashing.webp", alt: "Pathways learners learning safe water and handwashing practices", role: "context" },
  "PF-07": { asset: "/curriculum-media/water-conservation-in-the-garden.webp", alt: "Pathways learners conserving water in a productive garden", role: "context" },
  "PF-08": { asset: "/curriculum-media/harvesting-food-discovery.webp", alt: "Pathways learners discovering food through supervised harvesting", role: "hero" },
  "PF-09": { asset: "/curriculum-media/creative-problem-solving-drawing.webp", alt: "Pathways learners developing ideas through creative problem solving", role: "context" },
  "PF-10": { asset: "/curriculum-media/digital-beginnings-with-tablets.webp", alt: "Pathways learners beginning responsible digital learning with tablets", role: "hero" },
  "PF-11": { asset: "/curriculum-media/out-of-school-girl-building-confidence.webp", alt: "A Pathways learner building confidence through supported participation", role: "context" },
  "PF-12": { asset: "/curriculum-media/pathways-kadara-future-transition.webp", alt: "Pathways learners preparing for transition into practical skills", role: "hero" },
  "PE-01": { asset: "/curriculum-media/first-introduction-to-practical-skills.webp", alt: "Pathways learners receiving their first introduction to practical skills", role: "hero" },
  "PE-04": { asset: "/curriculum-media/facilitator-supporting-diverse-learners.webp", alt: "A facilitator supporting diverse Pathways learners", role: "context" },
  "PE-09": { asset: "/curriculum-media/introduction-to-enterprise-through-garden-products.webp", alt: "Pathways learners exploring enterprise through garden products", role: "hero" },
  "PT-04": { asset: "/curriculum-media/recycling-environmental-stewardship.webp", alt: "Pathways learners practising recycling and environmental stewardship", role: "context" },
  "PT-12": { asset: "/curriculum-media/almajiri-boys-out-of-school-girls-learning-together.webp", alt: "Almajiri boys and out-of-school girls learning together in Pathways", role: "hero" },

  // Kadara: skills, work-readiness and practical application.
  "KS-01": { asset: "/curriculum-media/kadara-first-introduction-to-practical-skills.webp", alt: "Kadara learners receiving their first introduction to practical skills", role: "hero" },
  "KS-02": { asset: "/curriculum-media/kadara-hand-tools-tool-identification.webp", alt: "Kadara learners identifying and handling basic hand tools safely", role: "hero" },
  "KS-03": { asset: "/curriculum-media/kadara-planned-crop-production.webp", alt: "Kadara learners planning and managing productive crop production", role: "hero" },
  "KS-04": { asset: "/curriculum-media/kadara-irrigation-tank-water-distribution.webp", alt: "Kadara learners inspecting irrigation tanks and water distribution", role: "context" },
  "KS-05": { asset: "/curriculum-media/kadara-safe-food-processing-preparation.webp", alt: "Kadara learners preparing food safely in a supervised training space", role: "hero" },
  "KS-06": { asset: "/curriculum-media/kadara-low-voltage-energy-learning.webp", alt: "Kadara learners exploring a protected low-voltage energy system", role: "context" },
  "KS-07": { asset: "/curriculum-media/kadara-measurement-marking-simple-fabrication.webp", alt: "Kadara learners measuring, marking and carrying out simple fabrication", role: "context" },
  "KS-08": { asset: "/curriculum-media/kadara-supervised-repair-maintenance.webp", alt: "Kadara learners carrying out supervised repair and maintenance", role: "context" },
  "KW-01": { asset: "/curriculum-media/kadara-workplace-team-roles-ppe.webp", alt: "Kadara workforce learners practising workplace team roles and PPE", role: "hero" },
  "KW-02": { asset: "/curriculum-media/kadara-harvesting-yield-measurement.webp", alt: "Kadara workforce learners measuring harvest yield and recording evidence", role: "hero" },
  "KW-03": { asset: "/curriculum-media/kadara-irrigation-tank-water-distribution.webp", alt: "Kadara learners inspecting irrigation tanks and water distribution", role: "context" },
  "KW-04": { asset: "/curriculum-media/kadara-processing-measurement-quality-control.webp", alt: "Kadara learners measuring processing quality under supervision", role: "context" },
  "KW-05": { asset: "/curriculum-media/kadara-productive-use-food-water-energy-system.webp", alt: "Kadara learners working with a productive food-water-energy system", role: "hero" },
  "KW-06": { asset: "/curriculum-media/kadara-post-harvest-handling-small-farm-enterprise.webp", alt: "Kadara learners handling harvested produce for a small farm enterprise", role: "context" },
  "KW-12": { asset: "/curriculum-media/kadara-portfolio-evidence-transition-to-work.webp", alt: "Kadara learners presenting portfolio evidence for transition to work", role: "hero" },
  "KE-03": { asset: "/curriculum-media/kadara-product-planning-costing.webp", alt: "Kadara enterprise learners planning products and basic costing", role: "hero" },
  "KE-01": { asset: "/curriculum-media/kadara-post-harvest-handling-small-farm-enterprise.webp", alt: "Kadara learners connecting a real food-system problem to enterprise opportunity", role: "context" },
  "KE-07": { asset: "/curriculum-media/kadara-packaging-finished-product-inspection.webp", alt: "Kadara learners inspecting packaging and finished products", role: "context" },
  "KE-09": { asset: "/curriculum-media/kadara-presentation-customer-service-practice.webp", alt: "Kadara learners practising presentation and customer service", role: "context" },
  "KE-06": { asset: "/curriculum-media/kadara-recordkeeping-digital-enterprise-skills.webp", alt: "Kadara learners maintaining digital enterprise records", role: "context" },
  "KE-11": { asset: "/curriculum-media/kadara-supervisor-feedback-competency-verification.webp", alt: "A Kadara supervisor giving feedback and verifying learner competence", role: "hero" },

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
