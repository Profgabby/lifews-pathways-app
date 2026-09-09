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
    <label
      className="language-menu"
      style={{
        display: "grid",
        gap: 6,
        marginTop: 18,
        maxWidth: 220,
        fontSize: ".78rem",
        fontWeight: 800,
      }}
    >
      <span style={{ color: "#fdb515", letterSpacing: ".06em", textTransform: "uppercase" }}>
        Language
      </span>
      <select
        aria-label="Choose language"
        value={currentLanguage}
        onChange={(event) => changeLanguage(event.target.value as AppLanguage)}
        style={{
          width: "100%",
          minHeight: 40,
          borderRadius: 9,
          border: "1px solid #d9e3dc",
          padding: "8px 10px",
          background: "#fffdf7",
          color: "#242a27",
          fontWeight: 700,
        }}
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
