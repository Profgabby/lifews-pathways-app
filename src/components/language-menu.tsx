"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type AppLanguage, supportedLanguages } from "@/lib/i18n";

export function LanguageMenu({ currentLanguage }: { currentLanguage: AppLanguage }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function changeLanguage(language: AppLanguage) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    window.localStorage.setItem("lifews-language", language);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <label className="language-menu">
      <span>Language</span>
      <select
        aria-label="Choose language"
        value={currentLanguage}
        onChange={(event) => changeLanguage(event.target.value as AppLanguage)}
      >
        {supportedLanguages.map((language) => (
          <option value={language.code} key={language.code}>
            {language.nativeLabel}
          </option>
        ))}
      </select>
    </label>
  );
}
