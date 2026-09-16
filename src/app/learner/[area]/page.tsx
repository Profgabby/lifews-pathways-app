import Link from "next/link";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { Award, BookOpen, BrainCircuit, BriefcaseBusiness, CheckCircle2, ChevronRight, ClipboardCheck, Compass, Database, FileCheck2, Leaf, LockKeyhole, ShieldCheck, Sparkles, Target, Trophy, Users, Wrench } from "lucide-react";
import { LanguageMenu } from "@/components/language-menu";
import { learnerCopy, localizeHref, normalizeLanguage } from "@/lib/i18n6";
import type { AppLanguage } from "@/lib/i18n6";
import { getCommonCopy, localizedCompetencyDomains } from "@/lib/greenskills-i18n";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const learnerAreas = ["learning", "growmeal", "food-discovery", "passport", "challenges", "future"] as const;
type LearnerArea = (typeof learnerAreas)[number];
type LearnerAreaPageProps = { params: Promise<{ area: string }>; searchParams?: Promise<{ lang?: string }> };
type PassportSummary = {
  passport_code: string | null;
  knowledge_score: number | string | null;
  practical_score: number | string | null;
  data_digital_score: number | string | null;
  safety_score: number | string | null;
  enterprise_employability_score: number | string | null;
  leadership_score: number | string | null;
  verified_field_hours: number | string | null;
  passport_status: string | null;
  verified_modules: number | null;
  submitted_modules: number | null;
  remediation_modules: number | null;
  passport_updated_at: string | null;
};

const areaMeta: Record<LearnerArea, { icon: typeof BookOpen; kicker: string; focus: string[] }> = {
  learning: { icon: BookOpen, kicker: "Learning journey", focus: ["Continue a module", "Complete knowledge checks", "Move into practical work"] },
  growmeal: { icon: Leaf, kicker: "GrowMeal learning", focus: ["Observe living systems", "Record practical learning", "Connect food, water and care"] },
  "food-discovery": { icon: Sparkles, kicker: "Food discovery", focus: ["Explore ingredients", "Trace food to source", "Build safe food knowledge"] },
  passport: { icon: Trophy, kicker: "Verified competence", focus: ["Build evidence", "Receive facilitator verification", "Grow your Skills Passport"] },
  challenges: { icon: Target, kicker: "Applied challenges", focus: ["Solve a real task", "Show your method", "Submit useful evidence"] },
  future: { icon: Compass, kicker: "Next steps", focus: ["Recognize strengths", "Explore pathways", "Prepare for transition"] },
};

function isLearnerArea(value: string): value is LearnerArea { return learnerAreas.includes(value as LearnerArea); }
function score(value: number | string | null | undefined) { const parsed = Number(value ?? 0); return Number.isFinite(parsed) ? Math.max(0, Math.min(100, parsed)) : 0; }

async function getPassportSummary(): Promise<{ signedIn: boolean; summary: PassportSummary | null }> {
  const token = (await cookies()).get("lifews-learner-session")?.value;
  if (!token) return { signedIn: false, summary: null };
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.rpc("get_learner_passport_summary", { p_session_token: token });
  if (error) return { signedIn: true, summary: null };
  const row = Array.isArray(data) ? data[0] : data;
  return { signedIn: true, summary: row && typeof row === "object" ? row as PassportSummary : null };
}

export default async function LearnerAreaPage({ params, searchParams }: LearnerAreaPageProps) {
  const { area } = await params;
  const query: { lang?: string } = searchParams ? await searchParams : {};
  if (!isLearnerArea(area)) notFound();

  const language = normalizeLanguage(query.lang);
  const copy = learnerCopy[language];
  const common = getCommonCopy(language);
  const index = learnerAreas.indexOf(area);
  const [title, description] = copy.areas[index];
  const rtl = language === "ar";
  const meta = areaMeta[area];
  const Icon = meta.icon;
  const passport = area === "passport" ? await getPassportSummary() : null;

  return (
    <main className="learner-page learner-area-shell" dir={rtl ? "rtl" : "ltr"} lang={language}>
      <header className="learner-header learner-area-header">
        <Link className="learner-brand" href={localizeHref("/learner", language)}>
          <img src="/lifews-logo.png" alt="LIFEWS logo" />
          <div><strong>LIFEWS GreenSkills</strong><span>{common.learnerSpace}</span></div>
        </Link>
        <div className="learner-header-actions"><LanguageMenu currentLanguage={language} /><Link className="text-link" href={localizeHref("/learner", language)}>{common.learnerSpace}</Link></div>
      </header>

      <section className="learner-area-hero"><div className="learner-area-icon"><Icon size={34} /></div><div><div className="eyebrow">{String(index + 1).padStart(2, "0")} / 06 · {meta.kicker}</div><h1>{title}</h1><p>{description}</p></div></section>

      {area === "passport" ? <PassportExperience language={language} privacy={copy.privacy} domains={localizedCompetencyDomains(language)} signedIn={passport?.signedIn ?? false} summary={passport?.summary ?? null} /> : <GenericAreaExperience area={area} language={language} title={title} description={description} focus={meta.focus} privacy={copy.privacy} />}
    </main>
  );
}

function PassportExperience({ language, privacy, domains, signedIn, summary }: { language: AppLanguage; privacy: string; domains: ReadonlyArray<readonly [string, string]>; signedIn: boolean; summary: PassportSummary | null }) {
  const domainIcons = [BookOpen, Wrench, Database, ShieldCheck, BriefcaseBusiness, Users];
  const scores = summary ? [score(summary.knowledge_score), score(summary.practical_score), score(summary.data_digital_score), score(summary.safety_score), score(summary.enterprise_employability_score), score(summary.leadership_score)] : null;
  return <>
    <section className="passport-command-card"><div className="passport-command-copy"><div className="passport-command-badge"><Award size={20} /> LIFEWS Skills Passport</div><h2>Evidence of what you can actually do.</h2><p>Your Skills Passport records demonstrated competence from learning, practical tasks, challenges and FieldWorks. Competencies are verified from evidence—not attendance alone.</p><div className="passport-command-actions"><Link className="primary-action" href={localizeHref("/learner/learning", language)}>Continue learning <ChevronRight size={17} /></Link><Link className="passport-secondary-action" href={localizeHref("/learner/challenges", language)}>Open challenges</Link></div></div><div className="passport-seal"><Trophy size={46} /><span>Skills</span><strong>Passport</strong><small>{summary?.passport_code ?? "Verified competence"}</small></div></section>

    {!signedIn && <section className="passport-session-card"><LockKeyhole size={25}/><div><strong>Sign in to see your verified Skills Passport.</strong><p>Your public learning pages remain available, but personal scores, evidence status and verified FieldWorks hours require your learner code.</p></div><Link className="primary-action" href={localizeHref("/learner/access", language)}>Learner sign in</Link></section>}
    {signedIn && !summary && <section className="passport-session-card"><ShieldCheck size={25}/><div><strong>Your learner session is active.</strong><p>No Skills Passport record is available yet. Verified progress will appear here after enrollment and assessment records are created.</p></div></section>}

    <section className="passport-status-strip"><div><FileCheck2 size={21} /><span><strong>{summary ? `${summary.verified_modules ?? 0} verified modules` : "Evidence-led"}</strong><small>{summary ? `${summary.submitted_modules ?? 0} awaiting review` : "Photos, records, outputs and demonstrations"}</small></span></div><div><ClipboardCheck size={21} /><span><strong>{summary ? `${summary.verified_field_hours ?? 0} verified FieldWorks hours` : "Facilitator verified"}</strong><small>{summary ? `${summary.remediation_modules ?? 0} requiring remediation` : "Evidence is reviewed before competency is confirmed"}</small></span></div><div><LockKeyhole size={21} /><span><strong>Privacy protected</strong><small>{privacy}</small></span></div></section>

    <section className="passport-section"><div className="passport-section-heading"><div><div className="eyebrow">Competency framework</div><h2>Your six development domains</h2></div><p>Each module can contribute evidence across one or more domains. Scores below appear only from the secure learner-specific Skills Passport record.</p></div><div className="passport-domain-grid">{domains.map(([code, name], index) => { const DomainIcon = domainIcons[index] ?? CheckCircle2; const domainScore = scores?.[index]; return <article key={code}><div className="passport-domain-code"><DomainIcon size={22} /><span>{code}</span></div><h3>{name}</h3>{domainScore === undefined ? <><p>Verified module evidence will appear here as competencies are demonstrated.</p><div className="passport-awaiting"><span /> Awaiting verified evidence</div></> : <><div className="passport-score-row"><strong>{Math.round(domainScore)}%</strong><span>verified score</span></div><div className="passport-score-track"><i style={{width:`${domainScore}%`}} /></div></>}</article>; })}</div></section>

    <section className="passport-evidence-flow"><div><div className="eyebrow">How evidence becomes competence</div><h2>Learn → Do → Show → Verify → Record</h2></div><div className="passport-flow-grid">{[["01","Learn","Complete the learning stages and understand the task."],["02","Do","Carry out the practical activity or FieldWorks task."],["03","Show","Prepare the required evidence from your work."],["04","Verify","A facilitator reviews the evidence against the competency."],["05","Record","Verified competence is added to your Skills Passport."]].map(([number,label,body])=><article key={number}><span>{number}</span><strong>{label}</strong><p>{body}</p></article>)}</div></section>

    <section className="passport-storage-note"><BrainCircuit size={24} /><div><strong>{summary ? "Connected to your secure Skills Passport record." : "Secure learner data stays behind learner access."}</strong><p>{summary ? "This view reads verified scores and review counts through your opaque learner session. It does not expose participant IDs or safeguarding information." : "The interface does not invent personal progress. Sign in with a valid learner code when your program has created your learner record."}</p></div></section>
  </>;
}

function GenericAreaExperience({ area, language, title, description, focus, privacy }: { area: LearnerArea; language: AppLanguage; title: string; description: string; focus: string[]; privacy: string }) {
  const destination = area === "learning" ? "/pathways" : area === "future" ? "/learner/passport" : "/learner/challenges";
  return <><section className="learner-area-workspace"><article className="learner-area-primary-card"><div className="eyebrow">Your workspace</div><h2>{title}</h2><p>{description}</p><div className="learner-area-focus-list">{focus.map((item,index)=><div key={item}><span>{index+1}</span><strong>{item}</strong></div>)}</div><Link className="primary-action" href={localizeHref(destination,language)}>Continue <ChevronRight size={17}/></Link></article><aside className="learner-area-side-card"><ShieldCheck size={26}/><h3>Safe learner experience</h3><p>{privacy}</p><small>Personal progress and evidence should only appear after a secure learner session is validated.</small></aside></section><section className="learner-area-next-row"><article><CheckCircle2 size={22}/><div><strong>Clear next action</strong><p>Use one focused step at a time instead of navigating a dense curriculum catalogue.</p></div></article><article><FileCheck2 size={22}/><div><strong>Evidence-ready</strong><p>Practical work can feed directly into the Skills Passport through verified learner records.</p></div></article></section></>;
}
