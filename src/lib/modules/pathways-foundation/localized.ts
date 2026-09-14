import type { AppLanguage } from "@/lib/i18n6";
import type { PF01Module } from "./pf-01";
import { pf01Ar } from "./pf-01-ar";
import { pf01Fr } from "./pf-01-fr";
import { pf01Ha } from "./pf-01-ha";
import { pf01Ig } from "./pf-01-ig";
import { pf01Yo } from "./pf-01-yo";
import { pf02Ar } from "./pf-02-ar";
import { pf02Fr } from "./pf-02-fr";
import { pf02Ha } from "./pf-02-ha";
import { pf02Ig } from "./pf-02-ig";
import { pf02Yo } from "./pf-02-yo";
import { pf03Ar } from "./pf-03-ar";
import { pf03Fr } from "./pf-03-fr";
import { pf03Ha } from "./pf-03-ha";
import { pf03Ig } from "./pf-03-ig";
import { pf03Yo } from "./pf-03-yo";
import { pf04Ar } from "./pf-04-ar";
import { pf04Fr } from "./pf-04-fr";
import { pf04Ha } from "./pf-04-ha";
import { pf04Ig } from "./pf-04-ig";
import { pf04Yo } from "./pf-04-yo";
import { pf05Ar } from "./pf-05-ar";
import { pf05Fr } from "./pf-05-fr";
import { pf05Ha } from "./pf-05-ha";
import { pf05Ig } from "./pf-05-ig";
import { pf05Yo } from "./pf-05-yo";
import { pf06Ar } from "./pf-06-ar";
import { pf06Fr } from "./pf-06-fr";
import { pf06Ha } from "./pf-06-ha";
import { pf06Ig } from "./pf-06-ig";
import { pf06Yo } from "./pf-06-yo";
import { pf07Ar } from "./pf-07-ar";
import { pf07Fr } from "./pf-07-fr";
import { pf07Ha } from "./pf-07-ha";
import { pf07Ig } from "./pf-07-ig";
import { pf07Yo } from "./pf-07-yo";
import { pf08Ar } from "./pf-08-ar";
import { pf08Fr } from "./pf-08-fr";
import { pf08Ha } from "./pf-08-ha";
import { pf08Ig } from "./pf-08-ig";
import { pf08Yo } from "./pf-08-yo";

export type AnyFoundationModule = PF01Module | (Omit<PF01Module,"code"> & { code:string });
type LocalizedSet = Partial<Record<AppLanguage,AnyFoundationModule>>;

const localizedByCode: Record<string,LocalizedSet> = {
  "PF-01": { ar:pf01Ar, fr:pf01Fr, ha:pf01Ha, ig:pf01Ig, yo:pf01Yo },
  "PF-02": { ar:pf02Ar, fr:pf02Fr, ha:pf02Ha, ig:pf02Ig, yo:pf02Yo },
  "PF-03": { ar:pf03Ar, fr:pf03Fr, ha:pf03Ha, ig:pf03Ig, yo:pf03Yo },
  "PF-04": { ar:pf04Ar, fr:pf04Fr, ha:pf04Ha, ig:pf04Ig, yo:pf04Yo },
  "PF-05": { ar:pf05Ar, fr:pf05Fr, ha:pf05Ha, ig:pf05Ig, yo:pf05Yo },
  "PF-06": { ar:pf06Ar, fr:pf06Fr, ha:pf06Ha, ig:pf06Ig, yo:pf06Yo },
  "PF-07": { ar:pf07Ar, fr:pf07Fr, ha:pf07Ha, ig:pf07Ig, yo:pf07Yo },
  "PF-08": { ar:pf08Ar, fr:pf08Fr, ha:pf08Ha, ig:pf08Ig, yo:pf08Yo },
};

export function getFoundationLocalizedModule(code:string, language:AppLanguage):AnyFoundationModule|null {
  return localizedByCode[code.toUpperCase()]?.[language] ?? null;
}
