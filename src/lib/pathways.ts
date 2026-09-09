export type DevelopmentalBand =
  | "DISCOVER"
  | "EXPLORE"
  | "BUILD"
  | "TRANSITION"
  | "ENTERPRISE";

export type ProgramTrack = "ALMAJIRI" | "GIRLS" | "GENERAL";

export type UserRole =
  | "SUPER_ADMIN"
  | "PROGRAM_ADMIN"
  | "SITE_COORDINATOR"
  | "EDUCATOR"
  | "GROWMEAL_FACILITATOR"
  | "SAFEGUARDING_LEAD"
  | "TRANSITION_OFFICER"
  | "M_AND_E_OFFICER"
  | "COMMUNITY_LIAISON"
  | "PARTNER_VIEWER"
  | "ADULT_PARTICIPANT";

export type TransitionDestination =
  | "FORMAL_EDUCATION"
  | "ALTERNATIVE_EDUCATION"
  | "VOCATIONAL_TRAINING"
  | "APPRENTICESHIP"
  | "HIGHER_EDUCATION"
  | "AGRICULTURE"
  | "EMPLOYMENT"
  | "ADULT_ENTERPRISE";

export interface LearnerSummary {
  id: string;
  participantCode: string;
  preferredName: string;
  ageYears?: number;
  band: DevelopmentalBand;
  track: ProgramTrack;
  siteId: string;
  active: boolean;
}

export const BAND_RULES: Record<DevelopmentalBand, { label: string; ageGuide: string; enterpriseAllowed: boolean }> = {
  DISCOVER: { label: "Discover™", ageGuide: "Approx. 6–9", enterpriseAllowed: false },
  EXPLORE: { label: "Explore™", ageGuide: "Approx. 10–12", enterpriseAllowed: false },
  BUILD: { label: "Build™", ageGuide: "Approx. 13–15", enterpriseAllowed: false },
  TRANSITION: { label: "Transition™", ageGuide: "Approx. 16–17", enterpriseAllowed: false },
  ENTERPRISE: { label: "Enterprise™", ageGuide: "18+", enterpriseAllowed: true },
};

export function canEnterCommercialPathway(ageYears: number | undefined, band: DevelopmentalBand) {
  return Boolean(ageYears !== undefined && ageYears >= 18 && BAND_RULES[band].enterpriseAllowed);
}
