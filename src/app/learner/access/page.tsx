import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LanguageMenu } from "@/components/language-menu";
import { localizeHref, normalizeLanguage, type AppLanguage } from "@/lib/i18n6";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const accessCopy: Record<AppLanguage, {
  eyebrow: string;
  title: string;
  intro: string;
  label: string;
  placeholder: string;
  submit: string;
  error: string;
  privacy: string;
  back: string;
}> = {
  en: { eyebrow: "LEARNER ACCESS", title: "Enter your learner code", intro: "Use the code provided by your educator or program coordinator.", label: "Learner access code", placeholder: "12-character code", submit: "Continue", error: "That code is invalid or has expired. Ask your educator for a current code.", privacy: "Your learner session is private to this device and expires automatically.", back: "Back to Learner Space" },
  ha: { eyebrow: "SHIGAR ƊALIBI", title: "Shigar da lambar ɗalibi", intro: "Yi amfani da lambar da malami ko mai kula da shiri ya ba ka.", label: "Lambar shiga ta ɗalibi", placeholder: "Lamba mai haruffa 12", submit: "Ci gaba", error: "Lambar ba ta aiki ko ta ƙare. Nemi sabuwar lamba daga malaminka.", privacy: "Zaman ɗalibinka na wannan na'ura ne kawai kuma zai ƙare da kansa.", back: "Koma Wurin Ɗalibi" },
  ar: { eyebrow: "دخول المتعلم", title: "أدخل رمز المتعلم", intro: "استخدم الرمز الذي قدمه لك المعلم أو منسق البرنامج.", label: "رمز دخول المتعلم", placeholder: "رمز من 12 خانة", submit: "متابعة", error: "الرمز غير صالح أو انتهت صلاحيته. اطلب رمزاً سارياً من معلمك.", privacy: "جلسة المتعلم خاصة بهذا الجهاز وتنتهي تلقائياً.", back: "العودة إلى مساحة المتعلم" },
  yo: { eyebrow: "ÌWỌLÉ AKẸ́KỌ̀Ọ́", title: "Tẹ kóòdù akẹ́kọ̀ọ́ rẹ", intro: "Lo kóòdù tí olùkọ́ tàbí alákóso ètò fún ọ.", label: "Kóòdù ìwọlé akẹ́kọ̀ọ́", placeholder: "Kóòdù àmì 12", submit: "Tẹ̀síwájú", error: "Kóòdù yẹn kò ṣiṣẹ́ tàbí ó ti parí. Béèrè kóòdù tuntun lọ́wọ́ olùkọ́ rẹ.", privacy: "Ìpàdé akẹ́kọ̀ọ́ rẹ jẹ́ ti ẹ̀rọ yìí nìkan, yóò sì parí fúnra rẹ.", back: "Padà sí Àyè Akẹ́kọ̀ọ́" },
  ig: { eyebrow: "NBANYE ONYE MMỤTA", title: "Tinye koodu onye mmụta gị", intro: "Jiri koodu onye nkuzi ma ọ bụ onye nhazi mmemme nyere gị.", label: "Koodu nbanye onye mmụta", placeholder: "Koodu mkpụrụ 12", submit: "Gaa n'ihu", error: "Koodu ahụ adịghị irè ma ọ bụ agwụla. Rịọ onye nkuzi gị maka koodu ọhụrụ.", privacy: "Oge onye mmụta gị bụ naanị maka ngwaọrụ a ma ga-agwụ n'onwe ya.", back: "Laghachi Ebe Onye Mmụta" },
  fr: { eyebrow: "ACCÈS APPRENANT", title: "Saisissez votre code apprenant", intro: "Utilisez le code fourni par votre enseignant ou coordinateur de programme.", label: "Code d’accès apprenant", placeholder: "Code à 12 caractères", submit: "Continuer", error: "Ce code est invalide ou a expiré. Demandez un code valide à votre enseignant.", privacy: "Votre session apprenant est privée sur cet appareil et expire automatiquement.", back: "Retour à l’Espace apprenant" },
};

async function startLearnerAccess(formData: FormData) {
  "use server";

  const language = normalizeLanguage(String(formData.get("language") ?? "en"));
  const accessCode = String(formData.get("access_code") ?? "").trim();
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.rpc("start_learner_session", { p_access_code: accessCode });

  if (error || typeof data !== "string" || data.length !== 64) {
    redirect(`/learner/access?lang=${language}&error=invalid`);
  }

  const cookieStore = await cookies();
  cookieStore.set("lifews-learner-session", data, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/learner",
    maxAge: 60 * 60 * 8,
  });

  redirect(`/learner?lang=${language}`);
}

type PageProps = { searchParams?: Promise<{ lang?: string; error?: string }> };

export default async function LearnerAccessPage({ searchParams }: PageProps) {
  const query = searchParams ? await searchParams : {};
  const language = normalizeLanguage(query.lang);
  const copy = accessCopy[language];
  const rtl = language === "ar";

  return (
    <main className="learner-page" dir={rtl ? "rtl" : "ltr"} lang={language}>
      <header className="learner-header">
        <Link className="learner-brand" href={localizeHref("/learner", language)}>
          <img src="/lifews-mark.svg" alt="LIFEWS logo" />
          <div><strong>LIFEWS GreenSkills</strong><span>{copy.eyebrow}</span></div>
        </Link>
        <div className="learner-header-actions">
          <LanguageMenu currentLanguage={language} />
          <Link className="text-link" href={localizeHref("/learner", language)}>{copy.back}</Link>
        </div>
      </header>

      <section className="learner-hero" style={{ maxWidth: 680 }}>
        <div className="eyebrow">{copy.eyebrow}</div>
        <h1>{copy.title}</h1>
        <p>{copy.intro}</p>
        {query.error === "invalid" ? <p role="alert" style={{ color: "var(--danger)", fontWeight: 700 }}>{copy.error}</p> : null}
        <form action={startLearnerAccess} style={{ display: "grid", gap: 14, marginTop: 24, maxWidth: 460 }}>
          <input type="hidden" name="language" value={language} />
          <label>
            <span style={{ display: "block", marginBottom: 6, fontWeight: 800 }}>{copy.label}</span>
            <input
              name="access_code"
              required
              inputMode="text"
              autoCapitalize="characters"
              autoComplete="off"
              maxLength={20}
              placeholder={copy.placeholder}
              style={{ width: "100%", padding: 14, borderRadius: 10, border: "1px solid var(--border)", fontSize: "1.05rem", letterSpacing: ".08em" }}
            />
          </label>
          <button className="primary-action" type="submit" style={{ border: 0, cursor: "pointer" }}>{copy.submit}</button>
        </form>
        <div className="learner-mode-note" style={{ marginTop: 18 }}>{copy.privacy}</div>
      </section>
    </main>
  );
}
