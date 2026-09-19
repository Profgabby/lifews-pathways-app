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
  "GF-01": { asset: "/curriculum-media/greentech-integrated-food-energy-water-systems-hero.webp", alt: "Integrated food, energy and water system for GreenTech training", role: "hero" },
  "GF-02": { asset: "/curriculum-media/greentech-pre-task-technical-safety-briefing.webp", alt: "GreenTech learners receiving a technical safety briefing", role: "hero" },
  "GF-03": { asset: "/curriculum-media/greentech-electrical-measurement-with-multimeter.webp", alt: "GreenTech learners using a multimeter for protected technical measurement", role: "context" },
  "GF-04": { asset: "/curriculum-media/greentech-safe-pv-electrical-measurement.webp", alt: "Safe photovoltaic electrical measurement during GreenTech training", role: "context" },
  "GF-05": { asset: "/curriculum-media/greentech-photovoltaic-system-components-hero.webp", alt: "Photovoltaic system components arranged for technician learning", role: "hero" },
  "GF-06": { asset: "/curriculum-media/greentech-pumping-water-storage-system.webp", alt: "Pumping and water storage system used for GreenTech training", role: "hero" },
  "GF-07": { asset: "/curriculum-media/greentech-drip-emitter-performance-testing.webp", alt: "GreenTech learners testing drip emitter performance", role: "context" },
  "GF-08": { asset: "/curriculum-media/greentech-water-productivity-crop-monitoring.webp", alt: "GreenTech learners monitoring water productivity and crops", role: "context" },
  "GF-09": { asset: "/curriculum-media/greentech-field-sensor-network.webp", alt: "Field sensor network supporting GreenTech monitoring", role: "context" },
  "GF-10": { asset: "/curriculum-media/greentech-filter-valve-irrigation-maintenance.webp", alt: "GreenTech learners maintaining filters, valves and irrigation components", role: "context" },
  "GF-11": { asset: "/curriculum-media/greentech-calibration-technical-documentation.webp", alt: "Technical calibration and documentation during GreenTech training", role: "context" },
  "GF-12": { asset: "/curriculum-media/greentech-completed-small-few-demonstration-system.webp", alt: "Completed small food-energy-water demonstration system", role: "hero" },

  // FEW Systems Technician: site evidence, integration and commissioning.
  "GT2-01": { asset: "/curriculum-media/greentech-mapping-few-system-components.webp", alt: "Technicians mapping food-energy-water system components", role: "hero" },
  "GT2-02": { asset: "/curriculum-media/greentech-flow-measurement-pipework-testing.webp", alt: "Technicians measuring flow and testing pipework", role: "context" },
  "GT2-03": { asset: "/curriculum-media/greentech-photovoltaic-system-components-hero.webp", alt: "Photovoltaic components for training array configuration", role: "hero" },
  "GT2-04": { asset: "/curriculum-media/greentech-battery-charge-controller-inspection.webp", alt: "Technicians inspecting a battery and charge controller", role: "context" },
  "GT2-05": { asset: "/curriculum-media/greentech-pumping-water-storage-system.webp", alt: "Pump and water storage equipment for FEW system installation", role: "context" },
  "GT2-06": { asset: "/curriculum-media/greentech-pumping-water-storage-system.webp", alt: "Technicians assessing water storage and distribution equipment", role: "context" },
  "GT2-07": { asset: "/curriculum-media/greentech-drip-emitter-performance-testing.webp", alt: "Technicians testing drip irrigation emitter performance", role: "context" },
  "GT2-08": { asset: "/curriculum-media/greentech-agrivoltaic-microclimate-observation.webp", alt: "Technicians observing crop and microclimate conditions under agrivoltaics", role: "hero" },
  "GT2-09": { asset: "/curriculum-media/greentech-field-sensor-network.webp", alt: "Technicians installing a field sensor network", role: "context" },
  "GT2-10": { asset: "/curriculum-media/greentech-digital-dashboard-telemetry-review.webp", alt: "Technicians reviewing a digital telemetry dashboard", role: "context" },
  "GT2-11": { asset: "/curriculum-media/greentech-system-commissioning-verification.webp", alt: "Technicians commissioning and verifying an integrated system", role: "hero" },
  "GT2-12": { asset: "/curriculum-media/greentech-completed-small-few-demonstration-system.webp", alt: "Completed FEW system prepared for technician assessment", role: "hero" },

  // Advanced Systems: integrated control, evidence and optimisation.
  "GA-01": { asset: "/curriculum-media/greentech-integrated-food-energy-water-systems-hero.webp", alt: "Advanced integrated food-energy-water system architecture", role: "hero" },
  "GA-02": { asset: "/curriculum-media/greentech-photovoltaic-system-components-hero.webp", alt: "Technicians reviewing photovoltaic equipment for integrated system design", role: "hero" },
  "GA-03": { asset: "/curriculum-media/greentech-pumping-water-storage-system.webp", alt: "Pumping and storage infrastructure for integrated water-energy design", role: "context" },
  "GA-04": { asset: "/curriculum-media/greentech-agrivoltaic-crop-system-hero.webp", alt: "Technicians reviewing an agrivoltaic crop system for design and operation", role: "hero" },
  "GA-05": { asset: "/curriculum-media/greentech-sensor-evidence-data-validation.webp", alt: "Advanced sensor evidence and data validation", role: "context" },
  "GA-06": { asset: "/curriculum-media/greentech-troubleshooting-control-logic.webp", alt: "Advanced technicians troubleshooting control logic", role: "context" },
  "GA-07": { asset: "/curriculum-media/greentech-sensor-evidence-data-validation.webp", alt: "Technicians validating evidence for system performance analysis", role: "context" },
  "GA-08": { asset: "/curriculum-media/greentech-troubleshooting-control-logic.webp", alt: "Advanced technicians diagnosing faults and reliability issues", role: "context" },
  "GA-09": { asset: "/curriculum-media/greentech-filter-valve-irrigation-maintenance.webp", alt: "Technicians reviewing irrigation components for maintenance planning", role: "context" },
  "GA-11": { asset: "/curriculum-media/greentech-chatgpt-image-sep-17-2026-04-43-26-pm.webp", alt: "A technical supervisor guiding a team through photovoltaic equipment measurement", role: "context" },
  "GA-12": { asset: "/curriculum-media/greentech-advanced-capstone-design-performance-evidence.webp", alt: "Advanced technicians presenting capstone design, performance and evidence", role: "hero" },
};

// Supporting safety photographs are shown within the learning sequence.
const sectionMedia: Record<string, ModuleMedia> = {
  "GF-02:2": { asset: "/curriculum-media/greentech-ppe-inspection-before-technical-work.webp", alt: "Instructor checking learners' personal protective equipment before technical work", role: "context" },
  "GF-02:3": { asset: "/curriculum-media/greentech-hazard-identification-walkthrough.webp", alt: "GreenTech team identifying site hazards during a supervised walkthrough", role: "context" },
};

export function getModuleMedia(code: string, step = 1): ModuleMedia | null {
  const normalizedCode = code.toUpperCase();
  return step === 1 ? media[normalizedCode] ?? null : sectionMedia[`${normalizedCode}:${step}`] ?? null;
}
