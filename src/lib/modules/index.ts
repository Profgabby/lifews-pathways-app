import type { AppLanguage } from "@/lib/i18n6";
import { curriculumPrograms } from "@/lib/curriculum";
import type { PF01Module } from "@/lib/modules/pathways-foundation/pf-01";
import { getPF01 } from "@/lib/modules/pathways-foundation/pf-01";
import { getPF02 } from "@/lib/modules/pathways-foundation/pf-02";
import { getPF03 } from "@/lib/modules/pathways-foundation/pf-03";
import { getPF04 } from "@/lib/modules/pathways-foundation/pf-04";
import { getPF05 } from "@/lib/modules/pathways-foundation/pf-05";
import { getPF06 } from "@/lib/modules/pathways-foundation/pf-06";
import { getPF07 } from "@/lib/modules/pathways-foundation/pf-07";
import { getPF08 } from "@/lib/modules/pathways-foundation/pf-08";
import { getPF09 } from "@/lib/modules/pathways-foundation/pf-09";
import { getPF10 } from "@/lib/modules/pathways-foundation/pf-10";
import { getPF11 } from "@/lib/modules/pathways-foundation/pf-11";
import { getPF12 } from "@/lib/modules/pathways-foundation/pf-12";
import { getPE01 } from "@/lib/modules/pathways-explorer/pe-01";
import { getPE02 } from "@/lib/modules/pathways-explorer/pe-02";
import { generateFullModule } from "@/lib/modules/generated-module";

export type FullCurriculumModule = PF01Module | (Omit<PF01Module,"code"> & { code:string });

const authoredModuleGetters: Record<string,(language:AppLanguage)=>FullCurriculumModule> = {
  "PF-01": getPF01,
  "PF-02": getPF02,
  "PF-03": getPF03,
  "PF-04": getPF04,
  "PF-05": getPF05,
  "PF-06": getPF06,
  "PF-07": getPF07,
  "PF-08": getPF08,
  "PF-09": getPF09,
  "PF-10": getPF10,
  "PF-11": getPF11,
  "PF-12": getPF12,
  "PE-01": getPE01,
  "PE-02": getPE02,
};

export const developedModuleCodes = Object.freeze(curriculumPrograms.flatMap(program=>program.lessons.map(lesson=>lesson.code)));

export function getFullCurriculumModule(code:string, language:AppLanguage): FullCurriculumModule | null {
  const normalized=code.toUpperCase();
  return authoredModuleGetters[normalized]?.(language) ?? generateFullModule(normalized,language);
}
