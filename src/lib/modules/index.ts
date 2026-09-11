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
import { getPT07 } from "@/lib/modules/pathways-transition/pt-07";
import { getPT08 } from "@/lib/modules/pathways-transition/pt-08";
import { getPT09 } from "@/lib/modules/pathways-transition/pt-09";
import { getPT10 } from "@/lib/modules/pathways-transition/pt-10";
import { getPT11 } from "@/lib/modules/pathways-transition/pt-11";
import { getPT12 } from "@/lib/modules/pathways-transition/pt-12";
import { getKS01 } from "@/lib/modules/kadara-skills-starter/ks-01";
import { getKS02 } from "@/lib/modules/kadara-skills-starter/ks-02";
import { getKS03 } from "@/lib/modules/kadara-skills-starter/ks-03";
import { getKS04 } from "@/lib/modules/kadara-skills-starter/ks-04";
import { getKS05 } from "@/lib/modules/kadara-skills-starter/ks-05";
import { getKS06 } from "@/lib/modules/kadara-skills-starter/ks-06";
import { getKS07 } from "@/lib/modules/kadara-skills-starter/ks-07";
import { getKS08 } from "@/lib/modules/kadara-skills-starter/ks-08";
import { getKS09 } from "@/lib/modules/kadara-skills-starter/ks-09";
import { getKS10 } from "@/lib/modules/kadara-skills-starter/ks-10";
import { getKS11 } from "@/lib/modules/kadara-skills-starter/ks-11";
import { getKS12 } from "@/lib/modules/kadara-skills-starter/ks-12";
import { getKW01 } from "@/lib/modules/kadara-workforce/kw-01";
import { getKW02 } from "@/lib/modules/kadara-workforce/kw-02";
import { getKW03 } from "@/lib/modules/kadara-workforce/kw-03";
import { generateFullModule } from "@/lib/modules/generated-module";
export type FullCurriculumModule=PF01Module|(Omit<PF01Module,"code">&{code:string});
const authoredModuleGetters:Record<string,(language:AppLanguage)=>FullCurriculumModule>={
"PF-01":getPF01,"PF-02":getPF02,"PF-03":getPF03,"PF-04":getPF04,"PF-05":getPF05,"PF-06":getPF06,"PF-07":getPF07,"PF-08":getPF08,"PF-09":getPF09,"PF-10":getPF10,"PF-11":getPF11,"PF-12":getPF12,
"PE-01":getPE01,"PE-02":getPE02,"PE-03":getPE03,"PE-04":getPE04,"PE-05":getPE05,"PE-06":getPE06,"PE-07":getPE07,"PE-08":getPE08,"PE-09":getPE09,"PE-10":getPE10,"PE-11":getPE11,"PE-12":getPE12,
"PT-01":getPT01,"PT-02":getPT02,"PT-03":getPT03,"PT-04":getPT04,"PT-05":getPT05,"PT-06":getPT06,"PT-07":getPT07,"PT-08":getPT08,"PT-09":getPT09,"PT-10":getPT10,"PT-11":getPT11,"PT-12":getPT12,
"KS-01":getKS01,"KS-02":getKS02,"KS-03":getKS03,"KS-04":getKS04,"KS-05":getKS05,"KS-06":getKS06,"KS-07":getKS07,"KS-08":getKS08,"KS-09":getKS09,"KS-10":getKS10,"KS-11":getKS11,"KS-12":getKS12,
"KW-01":getKW01,"KW-02":getKW02,"KW-03":getKW03};
export const developedModuleCodes=Object.freeze(curriculumPrograms.flatMap(program=>program.lessons.map(lesson=>lesson.code)));
export function getFullCurriculumModule(code:string,language:AppLanguage):FullCurriculumModule|null{const normalized=code.toUpperCase();return authoredModuleGetters[normalized]?.(language)??generateFullModule(normalized,language);}
