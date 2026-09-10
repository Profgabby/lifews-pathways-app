"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type AppLanguage, supportedLanguages } from "@/lib/i18n6";
import { getCommonCopy } from "@/lib/greenskills-i18n";

export function LanguageMenu({ currentLanguage }: { currentLanguage: AppLanguage }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const copy = getCommonCopy(currentLanguage);

  function changeLanguage(language: AppLanguage) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    window.localStorage.setItem("lifews-language", language);
    document.cookie = `lifews-language=${language}; path=/; max-age=31536000; samesite=lax`;
    router.push(`${pathname}?${params.toString()}`);
    router.refresh();
  }

  return (
    <label className="language-menu" style={{ display: "grid", gap: 6, marginTop: 18, maxWidth: 220, fontSize: ".78rem", fontWeight: 800 }}>
      <span style={{ color: "#fdb515", letterSpacing: ".06em", textTransform: "uppercase" }}>{copy.language}</span>
      <select
        aria-label={copy.language}
        value={currentLanguage}
        onChange={(event) => changeLanguage(event.target.value as AppLanguage)}
        style={{ width: "100%", minHeight: 40, borderRadius: 9, border: "1px solid #d9e3dc", padding: "8px 10px", background: "#fffdf7", color: "#242a27", fontWeight: 700 }}
      >
        {supportedLanguages.map((language) => <option value={language.code} key={language.code}>{language.nativeLabel}</option>)}
      </select>
    </label>
  );
}
