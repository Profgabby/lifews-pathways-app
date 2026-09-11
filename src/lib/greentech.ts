export type GreenTechTierCode = "GF" | "GT2" | "GA";

export type GreenTechModule = {
  code: string;
  title: string;
  competency: string;
  diy: string;
  fieldFocus: string;
  enterpriseFocus: string;
  aiFocus: string;
  evidence: string[];
};

export type GreenTechTier = {
  code: GreenTechTierCode;
  slug: string;
  title: string;
  entry: string;
  technicalRole: string;
  aiStage: string;
  enterpriseStage: string;
  progression: string;
  modules: GreenTechModule[];
};

export const competencyDomains = [
  ["K", "Knowledge"],
  ["P", "Practical Skills"],
  ["D", "Data & Digital"],
  ["S", "Safety"],
  ["E", "Enterprise & Employability"],
  ["L", "Leadership & Life Skills"],
] as const;

export const aiLayers = [
  "AI Foundations / Understand",
  "AI-Assisted Technical Work / Apply",
  "AI + Data / Analyze",
  "AI + Automation / CHIPU",
  "Responsible AI & Innovation",
] as const;

export const commonAssessment = {
  mcqs: 8,
  applicationQuestions: 5,
  competencyScale: [
    "0 — Not Demonstrated",
    "1 — Awareness",
    "2 — Developing",
    "3 — Competent",
    "4 — Proficient",
    "5 — Advanced",
  ],
  practicalStatuses: ["ND — Not Demonstrated", "A — Assisted", "C — Competent", "I — Independent"],
  rule: "Competence, not attendance. Safety-critical failure can require reassessment regardless of numerical score.",
};

const gf: GreenTechModule[] = [
  ["GF-01","FEW Systems Engineering Fundamentals","Understand system blocks and connections.","Draw a complete food-energy-water system block diagram.","System mapping and interfaces","FEW system mapping and basic advisory","Use AI to explain system blocks, then verify every connection against the physical or documented system."],
  ["GF-02","Technical Safety and PPE","Apply hazard identification and safe work practices.","Perform a job hazard assessment for a training task.","Hazard identification and controls","Basic worksite safety check and PPE readiness support","Compare an AI-generated hazard list with a trainer-approved job hazard analysis and identify omissions."],
  ["GF-03","Technical Tools and Measurement","Use basic electrical, hydraulic and dimensional tools.","Complete a technician measurement sheet.","Measurement accuracy and tool selection","Measurement and basic technical survey support","Use AI to organize measurement records; never substitute generated values for measurements."],
  ["GF-04","Basic Electrical Principles","Understand voltage, current, polarity and protection.","Construct a protected low-voltage DC circuit.","Protected low-voltage DC work","Protected low-voltage inspection and basic DC support","Use AI to check a circuit explanation, then verify polarity, ratings and protection independently."],
  ["GF-05","Photovoltaic Fundamentals","Understand photovoltaic modules, wiring and basic generation.","Measure voltage/current from a supervised training photovoltaic module.","Photovoltaic measurement and observation","Photovoltaic cleaning and basic performance-check support","Compare measured photovoltaic output with an AI-assisted expectation and explain differences."],
  ["GF-06","Water Pumping Fundamentals","Understand pump types, flow, head and basic selection.","Measure flow and estimate pumping head on a training rig.","Flow, head and pump operation","Basic pump-flow observation and maintenance support","Use AI to explain pump curves while basing decisions on measured flow/head and manufacturer data."],
  ["GF-07","Irrigation Fundamentals","Understand pressure, flow, filters, pipes and emitters.","Assemble and test a small drip-irrigation system.","Drip assembly, flushing and simple faults","Small drip-system assembly and inspection support","Use AI to help structure a troubleshooting checklist, then test the system physically."],
  ["GF-08","Food-Production Integration","Understand how energy and water support productive growing systems.","Map energy and water inputs for a small food-production system.","Food-water-energy input mapping","Food-water-energy input mapping service","Use AI to organize production inputs and identify assumptions requiring field verification."],
  ["GF-09","Sensors and Monitoring","Understand basic sensing, measurement and field records.","Collect and record a small set of sensor or manual measurements.","Sensor placement, records and plausibility","Basic field measurement and monitoring log service","Use AI to flag anomalous values but confirm them against placement, calibration and independent observations."],
  ["GF-10","Preventive Maintenance","Apply inspection, cleaning, tightening and fault-reporting practices.","Complete a preventive-maintenance checklist on a training system.","Inspection and preventive maintenance","Routine inspection and preventive-maintenance checklist service","Use AI to draft maintenance records while ensuring all observations are human-verified."],
  ["GF-11","Technical Documentation","Read and create basic diagrams, labels and field records.","Create an as-built sketch and equipment record.","As-built records and equipment documentation","Equipment register and as-built record support","Use AI to improve document clarity but not to invent equipment, measurements or site conditions."],
  ["GF-12","Foundation Technician Practical","Integrate safety, measurement, assembly and documentation.","Complete a supervised integrated technician practical.","Integrated foundation practical","Integrated foundation technical-support package","Use AI only as a bounded assistant; demonstrate the core practical independently."],
].map(([code,title,competency,diy,fieldFocus,enterpriseFocus,aiFocus]) => ({code,title,competency,diy,fieldFocus,enterpriseFocus,aiFocus,evidence:["practical observation","measurement or calculation record","photo/drawing/worksheet","trainer verification"]}));

const gt2: GreenTechModule[] = [
  ["GT2-01","Site Assessment","Conduct a structured FEW site assessment and identify constraints.","Complete a documented FEW site survey.","Site survey, constraints and client requirements","FEW site assessment and technical survey","Use AI to organize site notes and questions; verify every site constraint directly."],
  ["GT2-02","Load and Demand Assessment","Quantify energy and water demand for system decisions.","Build daily energy and water demand profiles.","Demand profiling and assumptions","Energy and water demand audit","Use AI to check arithmetic and scenarios while preserving traceable inputs and units."],
  ["GT2-03","Photovoltaic Array Configuration","Configure photovoltaic arrays within component limits.","Design and wire a protected training photovoltaic array.","Series/parallel configuration and limits","Photovoltaic configuration and inspection support","Use AI to compare configurations, then verify voltage/current limits against manufacturer data."],
  ["GT2-04","Battery and Control Systems","Configure protected storage and basic control systems.","Configure a protected battery/control training system.","Storage, protection and controls","Battery/control inspection and maintenance service","Use AI to interpret logs/settings but never override protection requirements."],
  ["GT2-05","Pump Selection and Installation","Select and install a pump for a defined duty point.","Select, install and test a training pump system.","Duty point, selection and installation","Pump duty assessment, selection and supervised installation","Use AI to compare pump options while validating curves and actual duty requirements."],
  ["GT2-06","Water Storage and Distribution","Install and test storage/distribution components.","Assemble and test a training storage and distribution system.","Storage, piping, valves and distribution","Tank, piping and distribution installation/inspection","Use AI to organize design checks and maintenance tasks; verify hydraulic behavior physically."],
  ["GT2-07","Drip Irrigation Installation","Install, test and troubleshoot a drip-irrigation zone.","Install and pressure-test a drip-irrigation training zone.","Installation, pressure and uniformity","Drip-irrigation installation and maintenance service","Use AI to interpret uniformity data while confirming field measurements and clogging conditions."],
  ["GT2-08","Agrivoltaic System Fundamentals","Integrate crop, access, irrigation and photovoltaic constraints.","Prepare an agrivoltaic site-layout exercise.","Agrivoltaic layout and operations","Agrivoltaic site-support and operations service","Use AI to compare layouts while retaining human judgment on farm access, safety and crop needs."],
  ["GT2-09","Sensors and Field Monitoring","Install, document and validate field monitoring points.","Install and log a supervised monitoring point.","Sensor installation, metadata and QA","Sensor installation, logging and field monitoring","Use AI for anomaly detection only after validating timestamps, placement and sensor quality."],
  ["GT2-10","CHIPU Controls Fundamentals","Create safe sensor-rule-output logic with fallback states.","Map and test sensor inputs and control outputs.","Thresholds, hysteresis, alarms and fail-safe logic","Basic control-logic mapping and monitoring support","Build the Sensor → Data → Rule/Model → Decision → Control → Actuator → Result → Feedback chain."],
  ["GT2-11","Commissioning and Troubleshooting","Commission a system and diagnose faults systematically.","Commission a training system and resolve a planted fault.","Commissioning, baselines and fault isolation","Commissioning, fault diagnosis and corrective-action service","Use AI to generate hypotheses, then test one hypothesis at a time with real evidence."],
  ["GT2-12","FEW Systems Technician Assessment","Integrate installation, monitoring, commissioning and handover.","Complete an integrated FEW technician assessment.","Integrated technician delivery","Integrated FEW technician service package","Demonstrate independent reasoning and use AI only where outputs are transparently verified."],
].map(([code,title,competency,diy,fieldFocus,enterpriseFocus,aiFocus]) => ({code,title,competency,diy,fieldFocus,enterpriseFocus,aiFocus,evidence:["job/site record","measurement/calculation sheet","commissioning or troubleshooting record","customer/technical handover","assessor verification"]}));

const ga: GreenTechModule[] = [
  ["GA-01","Advanced FEW System Architecture","Develop traceable integrated FEW architectures and interfaces.","Develop and defend a complete system architecture for a defined use case.","Requirements, architecture and interfaces","Integrated FEW architecture and advisory","Use AI to explore alternatives, then trace every design decision to requirements and evidence."],
  ["GA-02","Advanced Photovoltaic Design","Design photovoltaic subsystems with protection, margins and energy balance.","Complete a photovoltaic design with sensitivity checks.","Advanced photovoltaic sizing and design","Photovoltaic design, audit and optimization","Use AI for scenario generation while independently verifying engineering calculations and constraints."],
  ["GA-03","Advanced Water-Energy Design","Integrate pumping, storage and energy dispatch.","Design and defend a water-energy operating strategy.","Water-energy optimization","Water-energy design and optimization","Use AI for scenario analysis while verifying dispatch feasibility and resource limits."],
  ["GA-04","Agrivoltaic Design and Operations","Design agrivoltaic systems around crop, access, water and energy requirements.","Prepare an agrivoltaic design and operations plan.","Agrivoltaic co-design and operations","Agrivoltaic design and operations advisory","Use AI to test layout alternatives while retaining agronomic, structural and operational human review."],
  ["GA-05","Sensors, Telemetry and Data Quality","Design monitoring architecture and data-quality controls.","Build a sensor/telemetry plan with validation checks.","Telemetry, metadata and QA/QC","Monitoring architecture, telemetry and data-quality service","Use AI for anomaly detection and data triage with explicit provenance, validation and uncertainty."],
  ["GA-06","CHIPU Control Architecture","Design safe multi-state FEW control logic and fallback behavior.","Create and test CHIPU control logic for a FEW scenario.","States, interlocks, priorities and fail-safe control","Smart FEW controls and decision-support integration","Use AI/model outputs as advisory inputs bounded by interlocks, safe states, manual override and audit logs."],
  ["GA-07","System Performance Analysis","Analyze FEW performance using defensible KPIs and normalization.","Analyze a FEW performance dataset and report decision-ready KPIs.","KPI analysis and performance diagnosis","FEW performance analytics and optimization","Use AI to assist analysis while preventing unsupported causality and preserving data provenance."],
  ["GA-08","Fault Diagnosis and Reliability","Use reliability methods to identify root causes and critical failures.","Complete fault-tree/FMEA and corrective-action analysis.","Reliability, FMEA and root-cause analysis","Reliability engineering and root-cause diagnostic service","Use AI to broaden hypotheses while ranking them with physical evidence and reliability logic."],
  ["GA-09","Operations and Maintenance Planning","Develop risk-based O&M and asset-management plans.","Prepare an O&M plan and maintenance schedule.","Asset criticality and maintenance strategy","O&M planning and asset-management service","Use AI to organize maintenance knowledge while grounding intervals in asset condition, risk and manufacturer guidance."],
  ["GA-10","Technical Economics","Evaluate FEW investments using lifecycle economics and sensitivity.","Complete a preliminary technical-economic assessment.","CAPEX, OPEX, lifecycle economics and sensitivity","Technical-economic assessment and investment support","Use AI to generate scenarios, not fabricated costs; document assumptions and sensitivity explicitly."],
  ["GA-11","Technical Leadership and Documentation","Lead technical review, change control and handover.","Prepare and deliver a controlled technical handover package.","QA/QC, revision control and operator training","Technical supervision, QA/QC and documentation","Use AI for drafting and synthesis while preserving accountable human approval and revision history."],
  ["GA-12","Advanced Systems Capstone","Integrate architecture, controls, reliability, economics and operations.","Complete and defend an advanced FEW systems capstone.","Integrated advanced FEW solution","Integrated FEW engineering enterprise proposal","Use AI transparently across the design cycle, with independent verification of all consequential decisions."],
].map(([code,title,competency,diy,fieldFocus,enterpriseFocus,aiFocus]) => ({code,title,competency,diy,fieldFocus,enterpriseFocus,aiFocus,evidence:["design/analysis artifact","assumptions and calculations","AI work log","technical-economic or reliability evidence","technical defense and assessor verification"]}));

export const greenTechTiers: GreenTechTier[] = [
  {code:"GF",slug:"foundation",title:"GreenTech Foundation Technician",entry:"16+ supervised technical training",technicalRole:"Understand & assist",aiStage:"AI Explorer",enterpriseStage:"Enterprise Explorer",progression:"Understand → Work Safely → Measure → Assemble → Operate → Monitor → Maintain → Document → Demonstrate Competence",modules:gf},
  {code:"GT2",slug:"technician",title:"GreenTech FEW Systems Technician",entry:"18+ or verified prerequisite competence",technicalRole:"Install & operate",aiStage:"AI Practitioner",enterpriseStage:"Technical Service Provider",progression:"Assess → Quantify Demand → Configure → Install → Integrate → Instrument → Control → Commission → Troubleshoot → Handover",modules:gt2},
  {code:"GA",slug:"advanced",title:"GreenTech Advanced Systems",entry:"Advanced technician / graduate / operator level",technicalRole:"Design & lead",aiStage:"AI Systems Innovator",enterpriseStage:"Green Enterprise Developer",progression:"Architect → Design → Optimize → Automate → Analyze → Diagnose → Manage → Evaluate Economics → Lead → Defend",modules:ga},
];

export function getGreenTechTier(slugOrCode: string) {
  const q = slugOrCode.toLowerCase();
  return greenTechTiers.find((tier) => tier.slug === q || tier.code.toLowerCase() === q);
}

export function getGreenTechModule(program: string, moduleCode: string) {
  const tier = getGreenTechTier(program);
  if (!tier) return undefined;
  const normalized = decodeURIComponent(moduleCode).toUpperCase();
  const module = tier.modules.find((item) => item.code.toUpperCase() === normalized);
  return module ? { tier, module } : undefined;
}

export const greenTechOperatingModel = [
  "Learning",
  "Practice",
  "Demonstration",
  "Measurement",
  "Assessment",
  "Evidence",
  "Verification",
  "Skills Passport",
  "Certification",
] as const;
