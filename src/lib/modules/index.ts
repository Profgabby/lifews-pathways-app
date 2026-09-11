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
import { getPE03 } from "@/lib/modules/pathways-explorer/pe-03";
import { getPE04 } from "@/lib/modules/pathways-explorer/pe-04";
import { getPE05 } from "@/lib/modules/pathways-explorer/pe-05";
import { getPE06 } from "@/lib/modules/pathways-explorer/pe-06";
import { getPE07 } from "@/lib/modules/pathways-explorer/pe-07";
import { getPE08 } from "@/lib/modules/pathways-explorer/pe-08";
import { getPE09 } from "@/lib/modules/pathways-explorer/pe-09";
import { getPE10 } from "@/lib/modules/pathways-explorer/pe-10";
import { getPE11 } from "@/lib/modules/pathways-explorer/pe-11";
import { getPE12 } from "@/lib/modules/pathways-explorer/pe-12";
import { getPT01 } from "@/lib/modules/pathways-transition/pt-01";
import { getPT02 } from "@/lib/modules/pathways-transition/pt-02";
import { getPT03 } from "@/lib/modules/pathways-transition/pt-03";
import { getPT04 } from "@/lib/modules/pathways-transition/pt-04";
import { getPT05 } from "@/lib/modules/pathways-transition/pt-05";
import { getPT06 } from "@/lib/modules/pathways-transition/pt-06";
import { generateFullModule } from "@/lib/modules/generated-module";

export type FullCurriculumModule = PF01Module | (Omit<PF01Module,"code"> & { code:string });

const authoredModuleGetters: Record<string,(language:AppLanguage)=>FullCurriculumModule> = {
  "PF-01": getPF01, "PF-02": getPF02, "PF-03": getPF03, "PF-04": getPF04,
  "PF-05": getPF05, "PF-06": getPF06, "PF-07": getPF07, "PF-08": getPF08,
  "PF-09": getPF09, "PF-10": getPF10, "PF-11": getPF11, "PF-12": getPF12,
  "PE-01": getPE01, "PE-02": getPE02, "PE-03": getPE03, "PE-04": getPE04,
  "PE-05": getPE05, "PE-06": getPE06, "PE-07": getPE07, "PE-08": getPE08,
  "PE-09": getPE09, "PE-10": getPE10, "PE-11": getPE11, "PE-12": getPE12,
  "PT-01": getPT01, "PT-02": getPT02, "PT-03": getPT03, "PT-04": getPT04,
  "PT-05": getPT05, "PT-06": getPT06,
};

export const developedModuleCodes = Object.freeze(curriculumPrograms.flatMap(program=>program.lessons.map(lesson=>lesson.code)));

export function getFullCurriculumModule(code:string, language:AppLanguage): FullCurriculumModule | null {
  const normalized=code.toUpperCase();
  return authoredModuleGetters[normalized]?.(language) ?? generateFullModule(normalized,language);
}
