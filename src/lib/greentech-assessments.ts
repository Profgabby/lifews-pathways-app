import type { GreenTechModule } from "@/lib/greentech";

export type GreenTechMcq = { q: string; o: [string, string, string, string]; a: number };
export type GreenTechAssessmentBank = { mcqs: GreenTechMcq[]; theory: string[] };

function clip(value: string, max = 170) {
  const text = value.replace(/\s+/g, " ").trim();
  return text.length <= max ? text : `${text.slice(0, max - 1).trim()}…`;
}

export function getGreenTechAssessment(module: GreenTechModule): GreenTechAssessmentBank {
  const title = module.title;
  const competency = clip(module.competency, 150);
  const diy = clip(module.diy, 145);
  const field = clip(module.fieldFocus, 145);
  const ai = clip(module.aiFocus, 145);
  const enterprise = clip(module.enterpriseFocus, 145);
  const evidence = module.evidence.length ? module.evidence.map(item => clip(item, 70)).join("; ") : "documented measurements and verified practical evidence";

  const mcqs: GreenTechMcq[] = [
    {
      q: `${module.code}: Which statement best represents the competency expected in ${title}?`,
      o: [competency, "Attend the lesson without demonstrating the task", "Rely on undocumented estimates", "Replace practical verification with an AI-generated explanation"],
      a: 0,
    },
    {
      q: `${module.code}: Before carrying out “${diy}”, what is the strongest first technical action?`,
      o: ["Begin immediately to save time", "Identify hazards, required PPE, safe-state controls and trainer/manufacturer requirements", "Ask an AI system to authorize the work", "Record results before taking measurements"],
      a: 1,
    },
    {
      q: `${module.code}: Which evidence package is most defensible for this module?`,
      o: [evidence, "Attendance plus a verbal description only", "A copied online diagram with no field observations", "An AI-generated report with no independent verification"],
      a: 0,
    },
    {
      q: `${module.code}: Which approach best supports the field focus “${field}”?`,
      o: ["Use traceable observations, measurements, units and acceptance checks", "Use memory instead of records", "Treat estimated values as measured values", "Skip abnormal readings if they complicate the result"],
      a: 0,
    },
    {
      q: `${module.code}: The module's AI focus is “${ai}”. Which use of AI is acceptable?`,
      o: ["Use AI output as final authority", "Use AI as supporting analysis, then verify against measurements, procedures and professional judgment", "Allow AI to override safety controls", "Submit AI-generated material as proof of practical competence"],
      a: 1,
    },
    {
      q: `${module.code}: A result from the practical task does not meet the expected acceptance condition. What should the learner do?`,
      o: ["Change the recorded value to match expectations", "Document the result, diagnose likely causes, take corrective action within scope and retest", "Delete the failed attempt", "Ask another learner for a value to use"],
      a: 1,
    },
    {
      q: `${module.code}: Which statement best connects the technical skill to the enterprise focus “${enterprise}”?`,
      o: ["Define the customer problem, scope, evidence, cost, limitations, quality checks and after-service", "Promise any service a customer requests regardless of competence", "Set a price without calculating cost", "Avoid documenting exclusions or operating limits"],
      a: 0,
    },
    {
      q: `${module.code}: What best demonstrates readiness for staff competency verification?`,
      o: ["Completed learning responses, assessment evidence, practical evidence and a defensible explanation of decisions", "Only a high self-check score", "Only time spent in class", "Only an AI Work Log"],
      a: 0,
    },
  ];

  const theory = [
    `${module.code} — Explain the core technical principle behind ${title}. Use the module competency as a guide and describe how it connects to an integrated food-energy-water system.`,
    `${module.code} — Develop a safe work plan for the practical task “${diy}”. Identify hazards, PPE, safe-state or isolation requirements, measurements and stop-work conditions.`,
    `${module.code} — For the field focus “${field}”, identify the measurements or observations you would collect, their units where applicable, how you would validate them and what acceptance criteria you would use.`,
    `${module.code} — Apply the AI focus “${ai}” to a realistic technical decision. State what AI may assist with, what must be independently verified, one plausible AI error and your final human decision.`,
    `${module.code} — Convert the enterprise focus “${enterprise}” into a small service concept. Define the customer problem, technical scope, deliverables, exclusions, evidence of quality, cost categories, proposed price logic and after-service.`,
  ];

  return { mcqs, theory };
}
