import Link from "next/link";
import { LanguageMenu } from "@/components/language-menu";
import { programsByArm, assessmentStandard, competencyDomains, deliveryStandard, evidenceStandard } from "@/lib/curriculum";
import { localizeHref, normalizeLanguage } from "@/lib/i18n6";

type PageProps = { searchParams?: Promise<{ lang?: string }> };

export default async function GreenTechPage({ searchParams }: PageProps) {
  const params = searchParams ? await searchParams : {};
  const language = normalizeLanguage(params.lang);
  const programs = programsByArm("greentech");
  return <div className="program-page-shell"><header className="program-topbar"><Link href={localizeHref("/", language)} className="program-brand-link"><img src="/lifews-mark.svg" alt="LIFEWS"/><div><strong>LIFEWS GreenSkills</strong><span>Skills for Food • Energy • Water • Livelihoods</span></div></Link><LanguageMenu currentLanguage={language}/></header><main>
    <section className="program-detail-hero greentech-hero"><div className="program-detail-number">03</div><div><div className="gs-eyebrow">TECHNICAL TRAINING & CERTIFICATION</div><h1>LIFEWS GreenTech</h1><h2>Train. Certify. Deploy.</h2><p>GreenTech develops competency-based technical capability for people who install, operate, maintain and monitor integrated food-energy-water systems through three progressive technician levels.</p><div className="program-detail-actions"><a href="#programs">Explore GreenTech programs</a><Link href={localizeHref("/", language)}>Back to GreenSkills</Link></div></div></section>
    <section className="program-stage-band">{["ORIENT","TRAIN","PRACTICE","ASSESS","CERTIFY","DEPLOY"].map((step,i,arr)=><div key={step}><span>{step}</span>{i<arr.length-1&&<b>→</b>}</div>)}</section>
    <section className="program-content-section" id="programs"><div className="gs-section-heading"><div><div className="gs-eyebrow">THREE GREENTECH PROGRAMS</div><h2>Progressive technical competence from foundations to advanced systems.</h2></div><p>Placement considers age, education, diagnostic assessment, prerequisite competence and safety requirements. Technical certification requires demonstrated competence rather than attendance alone.</p></div><div className="curriculum-program-grid">{programs.map(program=><article className="curriculum-program-card" key={program.code}><div className="curriculum-card-head"><span>{program.code}</span><small>{program.age}</small></div><h3>{program.title}</h3><p>{program.purpose}</p><div className="lesson-stack">{program.lessons.map(lesson=><details key={lesson.code}><summary><b>{lesson.code}</b> {lesson.title}</summary><p><strong>Competency:</strong> {lesson.competency}</p><p><strong>DIY / practical:</strong> {lesson.diy}</p></details>)}</div></article>)}</div></section>
    <section className="competency-framework"><div><div className="gs-eyebrow">COMMON COMPETENCY FRAMEWORK</div><h2>Six domains recorded in the Skills Passport.</h2></div><div className="competency-domain-grid">{competencyDomains.map(([code,name])=><article key={code}><span>{code}</span><strong>{name}</strong></article>)}</div></section>
    <section className="fieldworks-callout"><div><div className="gs-eyebrow">COMPETENCE, NOT ATTENDANCE</div><h2>Certification requires verified evidence.</h2><p>{assessmentStandard}</p><p>{evidenceStandard}</p><p>{deliveryStandard}</p></div><div className="fieldworks-metrics">{["8 MCQs","5 theory questions","Practical assessment","0–5 competency rating","FieldWorks hours","Portfolio evidence","Certification status"].map(item=><span key={item}>{item}</span>)}</div></section>
  </main></div>;
}
