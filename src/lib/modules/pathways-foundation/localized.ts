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

export type AnyFoundationModule = PF01Module | (Omit<PF01Module,"code"> & { code:string });

type LocalizedSet = Partial<Record<AppLanguage,AnyFoundationModule>>;

const localizedByCode: Record<string,LocalizedSet> = {
  "PF-01": { ar:pf01Ar, fr:pf01Fr, ha:pf01Ha, ig:pf01Ig, yo:pf01Yo },
  "PF-02": { ar:pf02Ar, fr:pf02Fr, ha:pf02Ha, ig:pf02Ig, yo:pf02Yo },
  "PF-03": { ar:pf03Ar, fr:pf03Fr, ha:pf03Ha, ig:pf03Ig, yo:pf03Yo },
  "PF-04": { ar:pf04Ar, fr:pf04Fr, ha:pf04Ha, ig:pf04Ig, yo:pf04Yo },
};

export function getFoundationLocalizedModule(code:string, language:AppLanguage):AnyFoundationModule|null {
  return localizedByCode[code.toUpperCase()]?.[language] ?? null;
}
