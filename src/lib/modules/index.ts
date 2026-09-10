import type { AppLanguage } from "@/lib/i18n6";
import type { PF01Module } from "@/lib/modules/pathways-foundation/pf-01";
import { getPF01 } from "@/lib/modules/pathways-foundation/pf-01";
import { getPF02 } from "@/lib/modules/pathways-foundation/pf-02";
import { getPF03 } from "@/lib/modules/pathways-foundation/pf-03";
import { getPF04 } from "@/lib/modules/pathways-foundation/pf-04";

export type FullCurriculumModule = PF01Module | (Omit<PF01Module,"code"> & { code:string });

const moduleGetters: Record<string,(language:AppLanguage)=>FullCurriculumModule> = {
  "PF-01": getPF01,
  "PF-02": getPF02,
  "PF-03": getPF03,
  "PF-04": getPF04,
};

export const developedModuleCodes = Object.freeze(Object.keys(moduleGetters));

export function getFullCurriculumModule(code:string, language:AppLanguage): FullCurriculumModule | null {
  return moduleGetters[code.toUpperCase()]?.(language) ?? null;
}
