import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { localizeHref, normalizeLanguage } from "@/lib/i18n6";
import { staffLoginCopy } from "@/lib/auth-i18n";
import { LanguageMenu } from "@/components/language-menu";

async function signIn(formData: FormData) {
  "use server";
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const language = normalizeLanguage(String(formData.get("language") ?? "en"));
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) redirect(`/login?lang=${language}&error=${encodeURIComponent(error.message)}`);
  redirect(`/dashboard?lang=${language}`);
}

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string; lang?: string }> }) {
  const { error, lang } = await searchParams;
  const language = normalizeLanguage(lang);
  const copy = staffLoginCopy[language];
  return (
    <main dir={language === "ar" ? "rtl" : "ltr"} lang={language} style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24 }}>
      <section className="card" style={{ width: "100%", maxWidth: 440 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: 16 }}>
          <div><div className="eyebrow">LIFEWS GreenSkills</div><h1>{copy.title}</h1></div>
          <LanguageMenu currentLanguage={language} />
        </div>
        <p className="subtitle">{copy.intro}</p>
        {error ? <p style={{ color: "var(--danger)", fontWeight: 700 }}>{error}</p> : null}
        <form action={signIn} style={{ display: "grid", gap: 14, marginTop: 22 }}>
          <input type="hidden" name="language" value={language} />
          <label><span style={{ display: "block", marginBottom: 6, fontWeight: 700 }}>{copy.email}</span><input name="email" type="email" required autoComplete="email" style={{ width: "100%", padding: 12, borderRadius: 10, border: "1px solid var(--border)" }} /></label>
          <label><span style={{ display: "block", marginBottom: 6, fontWeight: 700 }}>{copy.password}</span><input name="password" type="password" required autoComplete="current-password" style={{ width: "100%", padding: 12, borderRadius: 10, border: "1px solid var(--border)" }} /></label>
          <button type="submit" style={{ padding: 12, borderRadius: 10, border: 0, background: "var(--green)", color: "white", fontWeight: 800, cursor: "pointer" }}>{copy.signIn}</button>
        </form>
        <p style={{ marginTop: 18, color: "var(--muted)", fontSize: ".86rem" }}>{copy.access}</p>
        <Link href={localizeHref("/", language)} className="text-link" style={{ display: "inline-block", marginTop: 16 }}>← {copy.back}</Link>
      </section>
    </main>
  );
}
