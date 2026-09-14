import Link from "next/link";
import { notFound } from "next/navigation";
import { Award, BookOpen, BrainCircuit, BriefcaseBusiness, CheckCircle2, ChevronRight, ClipboardCheck, Compass, Database, FileCheck2, Leaf, LockKeyhole, ShieldCheck, Sparkles, Target, Trophy, Users, Wrench } from "lucide-react";
import { LanguageMenu } from "@/components/language-menu";
import { learnerCopy, localizeHref, normalizeLanguage } from "@/lib/i18n6";
import { getCommonCopy, localizedCompetencyDomains } from "@/lib/greenskills-i18n";

const learnerAreas = ["learning", "growmeal", "food-discovery", "passport", "challenges", "future"] as const;
type LearnerArea = (typeof learnerAreas)[number];
type LearnerAreaPageProps = { params: Promise<{ area: string }>; searchParams?: Promise<{ lang?: string }> };

const areaMeta: Record<LearnerArea, { icon: typeof BookOpen; kicker: string; focus: string[] }> = {
  learning: { icon: BookOpen, kicker: "Learning journey", focus: ["Continue a module", "Complete knowledge checks", "Move into practical work"] },
  growmeal: { icon: Leaf, kicker: "GrowMeal learning", focus: ["Observe living systems", "Record practical learning", "Connect food, water and care"] },
  "food-discovery": { icon: Sparkles, kicker: "Food discovery", focus: ["Explore ingredients", "Trace food to source", "Build safe food knowledge"] },
  passport: { icon: Trophy, kicker: "Verified competence", focus: ["Build evidence", "Receive facilitator verification", "Grow your Skills Passport"] },
  challenges: { icon: Target, kicker: "Applied challenges", focus: ["Solve a real task", "Show your method", "Submit useful evidence"] },
  future: { icon: Compass, kicker: "Next steps", focus: ["Recognize strengths", "Explore pathways", "Prepare for transition"] },
};

function isLearnerArea(value: string): value is LearnerArea { return learnerAreas.includes(value as LearnerArea); }

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

  return (
    <main className="learner-page learner-area-shell" dir={rtl ? "rtl" : "ltr"} lang={language}>
      <header className="learner-header learner-area-header">
        <Link className="learner-brand" href={localizeHref("/learner", language)}>
          <img src="/lifews-mark.svg" alt="LIFEWS logo" />
          <div><strong>LIFEWS GreenSkills</strong><span>{common.learnerSpace}</span></div>
        </Link>
        <div className="learner-header-actions">
          <LanguageMenu currentLanguage={language} />
          <Link className="text-link" href={localizeHref("/learner", language)}>{common.learnerSpace}</Link>
        </div>
      </header>

      <section className="learner-area-hero">
        <div className="learner-area-icon"><Icon size={34} /></div>
        <div>
          <div className="eyebrow">{String(index + 1).padStart(2, "0")} / 06 · {meta.kicker}</div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </section>

      {area === "passport" ? (
        <PassportExperience language={language} privacy={copy.privacy} domains={localizedCompetencyDomains(language)} />
      ) : (
        <GenericAreaExperience area={area} language={language} title={title} description={description} focus={meta.focus} privacy={copy.privacy} />
      )}
    </main>
  );
}

function PassportExperience({ language, privacy, domains }: { language: string; privacy: string; domains: [string, string][] }) {
  const domainIcons = [BookOpen, Wrench, Database, ShieldCheck, BriefcaseBusiness, Users];
  return <>
    <section className="passport-command-card">
      <div className="passport-command-copy">
        <div className="passport-command-badge"><Award size={20} /> LIFEWS Skills Passport</div>
        <h2>Evidence of what you can actually do.</h2>
        <p>Your Skills Passport is designed to record demonstrated competence from learning, practical tasks, challenges and FieldWorks. Competencies should be verified from evidence—not attendance alone.</p>
        <div className="passport-command-actions">
          <Link className="primary-action" href={localizeHref("/learner/learning", language)}>Continue learning <ChevronRight size={17} /></Link>
          <Link className="passport-secondary-action" href={localizeHref("/learner/challenges", language)}>Open challenges</Link>
        </div>
      </div>
      <div className="passport-seal"><Trophy size={46} /><span>Skills</span><strong>Passport</strong><small>Verified competence</small></div>
    </section>

    <section className="passport-status-strip">
      <div><FileCheck2 size={21} /><span><strong>Evidence-led</strong><small>Photos, records, outputs and demonstrations</small></span></div>
      <div><ClipboardCheck size={21} /><span><strong>Facilitator verified</strong><small>Evidence is reviewed before competency is confirmed</small></span></div>
      <div><LockKeyhole size={21} /><span><strong>Privacy protected</strong><small>{privacy}</small></span></div>
    </section>

    <section className="passport-section">
      <div className="passport-section-heading"><div><div className="eyebrow">Competency framework</div><h2>Your six development domains</h2></div><p>Each module can contribute evidence across one or more domains. Your passport becomes stronger as verified evidence accumulates.</p></div>
      <div className="passport-domain-grid">{domains.map(([code, name], index) => {
        const DomainIcon = domainIcons[index] ?? CheckCircle2;
        return <article key={code}><div className="passport-domain-code"><DomainIcon size={22} /><span>{code}</span></div><h3>{name}</h3><p>Verified module evidence will appear here as competencies are demonstrated.</p><div className="passport-awaiting"><span /> Awaiting verified evidence</div></article>;
      })}</div>
    </section>

    <section className="passport-evidence-flow">
      <div><div className="eyebrow">How evidence becomes competence</div><h2>Learn → Do → Show → Verify → Record</h2></div>
      <div className="passport-flow-grid">
        {[ ["01", "Learn", "Complete the learning stages and understand the task."], ["02", "Do", "Carry out the practical activity or FieldWorks task."], ["03", "Show", "Prepare the required evidence from your work."], ["04", "Verify", "A facilitator reviews the evidence against the competency."], ["05", "Record", "Verified competence is added to your Skills Passport."] ].map(([number, label, body]) => <article key={number}><span>{number}</span><strong>{label}</strong><p>{body}</p></article>)}
      </div>
    </section>

    <section className="passport-storage-note"><BrainCircuit size={24} /><div><strong>Secure evidence storage is the next connection.</strong><p>This interface is ready for learner evidence, verification status and competency records. It does not display invented progress while secure learner-specific evidence storage is still being connected.</p></div></section>
  </>;
}

function GenericAreaExperience({ area, language, title, description, focus, privacy }: { area: LearnerArea; language: string; title: string; description: string; focus: string[]; privacy: string }) {
  const destination = area === "learning" ? "/pathways" : area === "future" ? "/learner/passport" : "/learner/challenges";
  return <>
    <section className="learner-area-workspace">
      <article className="learner-area-primary-card"><div className="eyebrow">Your workspace</div><h2>{title}</h2><p>{description}</p><div className="learner-area-focus-list">{focus.map((item, index) => <div key={item}><span>{index + 1}</span><strong>{item}</strong></div>)}</div><Link className="primary-action" href={localizeHref(destination, language)}>Continue <ChevronRight size={17} /></Link></article>
      <aside className="learner-area-side-card"><ShieldCheck size={26} /><h3>Safe learner experience</h3><p>{privacy}</p><small>Personal progress and evidence should only appear after a secure learner session is validated.</small></aside>
    </section>
    <section className="learner-area-next-row"><article><CheckCircle2 size={22} /><div><strong>Clear next action</strong><p>Use one focused step at a time instead of navigating a dense curriculum catalogue.</p></div></article><article><FileCheck2 size={22} /><div><strong>Evidence-ready</strong><p>Practical work can feed directly into the Skills Passport once secure evidence storage is connected.</p></div></article></section>
  </>;
}
