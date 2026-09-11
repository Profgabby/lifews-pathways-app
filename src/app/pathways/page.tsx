import Link from "next/link";
import { LanguageMenu } from "@/components/language-menu";
import { programsByArm } from "@/lib/curriculum";
import { localizeHref, normalizeLanguage } from "@/lib/i18n6";
import { getCommonCopy, getProgramPageCopy, localizedCompetencyDomains } from "@/lib/greenskills-i18n";
import { localizeCurriculum } from "@/lib/curriculum-localizer";
import { getLocalizedStandards } from "@/lib/greenskills-shared-i18n";

type PageProps = { searchParams?: Promise<{ lang?: string }> };
type PathwaysCopy = {
  eyebrow: string; tagline: string; intro: string; primary: string; journey: readonly string[];
  serves: string; servesTitle: string; audiences: readonly string[];
  programsEyebrow: string; programsTitle: string; programsBody: string;
};

export default async function PathwaysPage({ searchParams }: PageProps) {
  const params = searchParams ? await searchParams : {};
  const language = normalizeLanguage(params.lang);
  const rtl = language === "ar";
  const copy = getProgramPageCopy(language, "pathways") as PathwaysCopy;
  const common = getCommonCopy(language);
  const programs = localizeCurriculum(programsByArm("pathways"), language);
  const domains = localizedCompetencyDomains(language);
  const standards = getLocalizedStandards(language);

  return <div className="shell public-shell" dir={rtl?"rtl":"ltr"} lang={language}><aside className="sidebar compact-sidebar"><Link href={localizeHref("/",language)} className="brand-lockup"><img className="brand-logo" src="/lifews-mark.svg" alt="LIFEWS logo"/><div className="brand">LIFEWS Pathways<small>{copy.eyebrow}</small></div></Link><LanguageMenu currentLanguage={language}/><nav className="nav"><Link href={localizeHref("/",language)}>GreenSkills</Link><Link className="active" href={localizeHref("/pathways",language)}>Pathways</Link><Link href={localizeHref("/learner",language)}>{common.learnerSpace}</Link><Link href={localizeHref("/login",language)}>{common.staffWorkspace}</Link><a href="#curriculum">{common.curriculum}</a></nav><div className="sidebar-note">{copy.tagline}</div></aside><main className="main public-main">
    <header className="hero-simple"><div className="eyebrow">{copy.eyebrow}</div><h1>LIFEWS Pathways</h1><p className="hero-line">{copy.tagline}</p><p className="subtitle hero-copy">{copy.intro}</p><div className="hero-actions"><Link className="primary-action" href={localizeHref("/learner",language)}>{copy.primary}</Link><Link className="gold-action" href={localizeHref("/login",language)}>{common.staffSignIn}</Link></div></header>
    <section className="gold-strip">{copy.journey.map((step,i,arr)=><span key={step}>{step}{i<arr.length-1&&<b> → </b>}</span>)}</section>
    <section className="simple-section"><div><div className="eyebrow">{copy.serves}</div><h2>{copy.servesTitle}</h2></div><div className="audience-pills">{copy.audiences.map((audience: string)=><span key={audience}>{audience}</span>)}</div></section>
    <section className="program-content-section" id="curriculum"><div className="gs-section-heading"><div><div className="gs-eyebrow">{copy.programsEyebrow}</div><h2>{copy.programsTitle}</h2></div><p>{copy.programsBody}</p></div><div className="curriculum-program-grid">{programs.map(program=><article className="curriculum-program-card" key={program.code}><div className="curriculum-card-head"><span>{program.code}</span><small>{program.age}</small></div><h3>{program.title}</h3><p>{program.purpose}</p><div className="lesson-stack">{program.lessons.map(lesson=><details key={lesson.code}><summary><b>{lesson.code}</b> {lesson.title}</summary><p><strong>{common.competency}:</strong> {lesson.competency}</p><p><strong>{common.diy}:</strong> {lesson.diy}</p><p><Link className="primary-action" href={moduleHref(lesson.code, language)}>Open module →</Link></p></details>)}</div></article>)}</div></section>
    <section className="competency-framework"><div><div className="gs-eyebrow">{common.commonFramework}</div><h2>{common.domainsFollow}</h2></div><div className="competency-domain-grid">{domains.map(([code,name])=><article key={code}><span>{code}</span><strong>{name}</strong></article>)}</div></section>
    <section className="fieldworks-callout"><div><div className="gs-eyebrow">{common.assessmentEvidence}</div><h2>{common.assessmentTitle}</h2><p>{standards.assessment}</p><p>{standards.evidence}</p><p>{standards.delivery}</p></div><div className="fieldworks-metrics">{common.metrics.map(item=><span key={item}>{item}</span>)}</div></section>
  </main></div>;
}

function moduleHref(code: string, language: string) {
  return `/learner/modules/${code}?lang=${language}&step=1`;
}
