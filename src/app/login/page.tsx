import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { localizeHref, normalizeLanguage } from "@/lib/i18n6";

async function signIn(formData: FormData) {
  "use server";
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) redirect(`/login?error=${encodeURIComponent(error.message)}`);
  redirect("/dashboard");
}

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string; lang?: string }> }) {
  const { error, lang } = await searchParams;
  const language = normalizeLanguage(lang);
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24 }}>
      <section className="card" style={{ width: "100%", maxWidth: 440 }}>
        <div className="eyebrow">LIFEWS GreenSkills</div>
        <h1>Staff workspace</h1>
        <p className="subtitle">Secure sign in for authorized staff and approved adult participants.</p>
        {error ? <p style={{ color: "var(--danger)", fontWeight: 700 }}>{error}</p> : null}
        <form action={signIn} style={{ display: "grid", gap: 14, marginTop: 22 }}>
          <label><span style={{ display: "block", marginBottom: 6, fontWeight: 700 }}>Email</span><input name="email" type="email" required autoComplete="email" style={{ width: "100%", padding: 12, borderRadius: 10, border: "1px solid var(--border)" }} /></label>
          <label><span style={{ display: "block", marginBottom: 6, fontWeight: 700 }}>Password</span><input name="password" type="password" required autoComplete="current-password" style={{ width: "100%", padding: 12, borderRadius: 10, border: "1px solid var(--border)" }} /></label>
          <button type="submit" style={{ padding: 12, borderRadius: 10, border: 0, background: "var(--green)", color: "white", fontWeight: 800, cursor: "pointer" }}>Sign in</button>
        </form>
        <p style={{ marginTop: 18, color: "var(--muted)", fontSize: ".86rem" }}>Access is role-based. Safeguarding case data is restricted to explicitly authorized safeguarding personnel.</p>
        <Link href={localizeHref("/", language)} className="text-link" style={{ display: "inline-block", marginTop: 16 }}>← Back to GreenSkills</Link>
      </section>
    </main>
  );
}
