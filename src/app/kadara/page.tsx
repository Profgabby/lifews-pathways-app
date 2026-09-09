import Link from "next/link";
import { LanguageMenu } from "@/components/language-menu";
import { programsByArm, assessmentStandard, competencyDomains, deliveryStandard, evidenceStandard } from "@/lib/curriculum";
import { localizeHref, normalizeLanguage } from "@/lib/i18n6";

type PageProps = { searchParams?: Promise<{ lang?: string }> };

export default async function KadaraPage({ searchParams }: PageProps) {
  const params = searchParams ? await searchParams : {};
  const language = normalizeLanguage(params.lang);
  const programs = programsByArm("kadara");
  return <div className="program-page-shell"><header className="program-topbar"><Link href={localizeHref("/", language)} className="program-brand-link"><img src="/lifews-mark.svg" alt="LIFEWS"/><div><strong>LIFEWS GreenSkills</strong><span>Skills for Food • Energy • Water • Livelihoods</span></div></Link><LanguageMenu currentLanguage={language}/></header><main>
    <section className="program-detail-hero kadara-hero"><div className="program-detail-number">02</div><div><div className="gs-eyebrow">SKILLS, WORK & ENTERPRISE</div><h1>LIFEWS Kadara</h1><h2>Learn. Build. Earn.</h2><p>Kadara develops practical competence, employability, enterprise capability and sustainable livelihoods through three progressive programs. Agriculture and AgriEnterprise content are housed here rather than treated as a separate top-level GreenSkills arm.</p><div className="program-detail-actions"><a href="#programs">Explore Kadara programs</a><Link href={localizeHref("/", language)}>Back to GreenSkills</Link></div></div></section>
    <section className="program-stage-band">{["DISCOVER","LEARN","PRACTICE","BUILD","EARN","LEAD"].map((step,i,arr)=><div key={step}><span>{step}</span>{i<arr.length-1&&<b>→</b>}</div>)}</section>
    <section className="program-content-section" id="programs"><div className="gs-section-heading"><div><div className="gs-eyebrow">THREE KADARA PROGRAMS</div><h2>Progressive skills from starter level to enterprise.</h2></div><p>Placement is based on age, diagnostic assessment, prior experience, safety requirements and demonstrated competence. Participants may enter at the appropriate level rather than repeating mastered content.</p></div><div className="curriculum-program-grid">{programs.map(program=><article className="curriculum-program-card" key={program.code}><div className="curriculum-card-head"><span>{program.code}</span><small>{program.age}</small></div><h3>{program.title}</h3><p>{program.purpose}</p><div className="lesson-stack">{program.lessons.map(lesson=><details key={lesson.code}><summary><b>{lesson.code}</b> {lesson.title}</summary><p><strong>Competency:</strong> {lesson.competency}</p><p><strong>DIY / practical:</strong> {lesson.diy}</p></details>)}</div></article>)}</div></section>
    <section className="competency-framework"><div><div className="gs-eyebrow">COMMON COMPETENCY FRAMEWORK</div><h2>Six domains recorded in the Skills Passport.</h2></div><div className="competency-domain-grid">{competencyDomains.map(([code,name])=><article key={code}><span>{code}</span><strong>{name}</strong></article>)}</div></section>
    <section className="fieldworks-callout"><div><div className="gs-eyebrow">COMPETENCE, NOT ATTENDANCE</div><h2>Assessment + FieldWorks + Skills Passport</h2><p>{assessmentStandard}</p><p>{evidenceStandard}</p><p>{deliveryStandard}</p></div><div className="fieldworks-metrics">{["8 MCQs","5 theory questions","DIY evidence","0–5 practical rating","Verified field hours","Trainer verification","Skills Passport update"].map(item=><span key={item}>{item}</span>)}</div></section>
  </main></div>;
}
