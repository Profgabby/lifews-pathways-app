import Link from "next/link";
import { LanguageMenu } from "@/components/language-menu";
import { programsByArm, assessmentStandard, deliveryStandard, evidenceStandard } from "@/lib/curriculum";
import { localizeHref, normalizeLanguage } from "@/lib/i18n6";
import { getCommonCopy, getGreenSkillsHomeCopy, getProgramPageCopy, localizeCurriculumPrograms, localizedCompetencyDomains } from "@/lib/greenskills-i18n";

type PageProps = { searchParams?: Promise<{ lang?: string }> };

export default async function GreenTechPage({ searchParams }: PageProps) {
  const params = searchParams ? await searchParams : {};
  const language = normalizeLanguage(params.lang);
  const copy = getProgramPageCopy(language, "greentech");
  const common = getCommonCopy(language);
  const home = getGreenSkillsHomeCopy(language);
  const programs = localizeCurriculumPrograms(programsByArm("greentech"), language);
  const domains = localizedCompetencyDomains(language);
  const rtl = language === "ar";

  return <div className="program-page-shell" dir={rtl ? "rtl" : "ltr"} lang={language}><header className="program-topbar"><Link href={localizeHref("/", language)} className="program-brand-link"><img src="/lifews-mark.svg" alt="LIFEWS"/><div><strong>LIFEWS GreenSkills</strong><span>{home.tagline}</span></div></Link><LanguageMenu currentLanguage={language}/></header><main>
    <section className="program-detail-hero greentech-hero"><div className="program-detail-number">03</div><div><div className="gs-eyebrow">{copy.eyebrow}</div><h1>LIFEWS GreenTech</h1><h2>{copy.tagline}</h2><p>{copy.intro}</p><div className="program-detail-actions"><a href="#programs">{copy.primary}</a><Link href={localizeHref("/", language)}>{common.backToGreenSkills}</Link></div></div></section>
    <section className="program-stage-band">{copy.journey.map((step,i,arr)=><div key={step}><span>{step}</span>{i<arr.length-1&&<b>→</b>}</div>)}</section>
    <section className="program-content-section" id="programs"><div className="gs-section-heading"><div><div className="gs-eyebrow">{copy.programsEyebrow}</div><h2>{copy.programsTitle}</h2></div><p>{copy.programsBody}</p></div><div className="curriculum-program-grid">{programs.map(program=><article className="curriculum-program-card" key={program.code}><div className="curriculum-card-head"><span>{program.code}</span><small>{program.age}</small></div><h3>{program.title}</h3><p>{program.purpose}</p><div className="lesson-stack">{program.lessons.map(lesson=><details key={lesson.code}><summary><b>{lesson.code}</b> {lesson.title}</summary><p><strong>{common.competency}:</strong> {lesson.competency}</p><p><strong>{common.diy}:</strong> {lesson.diy}</p></details>)}</div></article>)}</div></section>
    <section className="competency-framework"><div><div className="gs-eyebrow">{common.commonFramework}</div><h2>{common.domainsPassport}</h2></div><div className="competency-domain-grid">{domains.map(([code,name])=><article key={code}><span>{code}</span><strong>{name}</strong></article>)}</div></section>
    <section className="fieldworks-callout"><div><div className="gs-eyebrow">{common.competenceNotAttendance}</div><h2>{common.certificationTitle}</h2><p>{assessmentStandard}</p><p>{evidenceStandard}</p><p>{deliveryStandard}</p></div><div className="fieldworks-metrics">{common.metrics.map(item=><span key={item}>{item}</span>)}</div></section>
  </main></div>;
}
