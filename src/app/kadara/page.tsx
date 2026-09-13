import Link from "next/link";
import { ArrowRight, BookOpen, Briefcase, CheckCircle2, Rocket, Wrench } from "lucide-react";
import { LanguageMenu } from "@/components/language-menu";
import { programsByArm } from "@/lib/curriculum";
import { localizeHref, normalizeLanguage } from "@/lib/i18n6";
import { getCommonCopy, getGreenSkillsHomeCopy, getProgramPageCopy, localizedCompetencyDomains } from "@/lib/greenskills-i18n";
import { localizeCurriculum } from "@/lib/curriculum-localizer";
import { getLocalizedStandards } from "@/lib/greenskills-shared-i18n";

type PageProps = { searchParams?: Promise<{ lang?: string }> };

const trackMeta = [
  { icon: Wrench, tone: "starter", label: "Build your foundation" },
  { icon: Briefcase, tone: "workforce", label: "Prepare for the workplace" },
  { icon: Rocket, tone: "enterprise", label: "Build an enterprise" },
] as const;

export default async function KadaraPage({ searchParams }: PageProps) {
  const params = searchParams ? await searchParams : {};
  const language = normalizeLanguage(params.lang);
  const copy = getProgramPageCopy(language, "kadara");
  const common = getCommonCopy(language);
  const home = getGreenSkillsHomeCopy(language);
  const programs = localizeCurriculum(programsByArm("kadara"), language);
  const domains = localizedCompetencyDomains(language);
  const standards = getLocalizedStandards(language);
  const rtl = language === "ar";

  return <div className="program-page-shell kadara-experience" dir={rtl ? "rtl" : "ltr"} lang={language}>
    <header className="program-topbar kadara-topbar">
      <Link href={localizeHref("/", language)} className="program-brand-link"><img src="/lifews-mark.svg" alt="LIFEWS"/><div><strong>LIFEWS GreenSkills</strong><span>{home.tagline}</span></div></Link>
      <div className="kadara-top-actions"><Link href={localizeHref("/learner", language)} className="kadara-learner-link"><BookOpen size={16}/> Learner Space</Link><LanguageMenu currentLanguage={language}/></div>
    </header>
    <main>
      <section className="program-detail-hero kadara-hero kadara-premium-hero">
        <div className="kadara-hero-orb"><span>02</span></div>
        <div><div className="gs-eyebrow">{copy.eyebrow}</div><h1>LIFEWS Kadara</h1><h2>{copy.tagline}</h2><p>{copy.intro}</p><div className="kadara-hero-stats"><span><strong>3</strong> learning tracks</span><span><strong>36</strong> complete modules</span><span><strong>6</strong> competency domains</span></div><div className="program-detail-actions"><a href="#programs">Explore your track <ArrowRight size={17}/></a><Link href={localizeHref("/", language)}>{common.backToGreenSkills}</Link></div></div>
      </section>

      <section className="program-stage-band kadara-journey">{copy.journey.map((step,i,arr)=><div key={step}><span className="journey-index">{String(i+1).padStart(2,"0")}</span><span>{step}</span>{i<arr.length-1&&<b>→</b>}</div>)}</section>

      <section className="program-content-section kadara-tracks" id="programs">
        <div className="gs-section-heading"><div><div className="gs-eyebrow">{copy.programsEyebrow}</div><h2>{copy.programsTitle}</h2></div><p>{copy.programsBody}</p></div>
        <div className="kadara-track-grid">{programs.map((program,index)=>{const meta=trackMeta[index] ?? trackMeta[0]; const Icon=meta.icon; return <article className={`kadara-track-card ${meta.tone}`} key={program.code}>
          <div className="kadara-track-top"><div className="kadara-track-icon"><Icon size={24}/></div><span className="kadara-track-code">{program.code}</span></div>
          <div className="kadara-track-kicker">{meta.label}</div><h3>{program.title}</h3><p>{program.purpose}</p>
          <div className="kadara-track-meta"><span><BookOpen size={15}/> {program.lessons.length} modules</span><span><CheckCircle2 size={15}/> Practical evidence</span></div>
          <a className="kadara-track-cta" href={`#track-${program.code}`}>View modules <ArrowRight size={17}/></a>
        </article>})}</div>
      </section>

      <section className="kadara-module-catalogue">{programs.map((program,index)=>{const meta=trackMeta[index] ?? trackMeta[0]; return <div className="kadara-track-section" id={`track-${program.code}`} key={program.code}>
        <div className="kadara-track-section-head"><div><span>{program.code} · {program.age}</span><h2>{program.title}</h2></div><p>{program.purpose}</p></div>
        <div className="kadara-module-grid">{program.lessons.map((lesson,moduleIndex)=><Link className="kadara-module-card" href={moduleHref(lesson.code, language)} key={lesson.code}>
          <div className="kadara-module-card-top"><span className="module-order">{String(moduleIndex+1).padStart(2,"0")}</span><span className="module-code">{lesson.code}</span></div>
          <h3>{lesson.title}</h3><p>{lesson.competency}</p>
          <div className="kadara-module-footer"><span>{common.diy}: {lesson.diy}</span><ArrowRight size={18}/></div>
        </Link>)}</div>
        <a className="kadara-back-top" href="#programs">Back to tracks ↑</a>
      </div>})}</section>

      <section className="competency-framework kadara-framework"><div><div className="gs-eyebrow">{common.commonFramework}</div><h2>{common.domainsPassport}</h2><p>Every Kadara module builds evidence across a shared competency framework so learning is visible, practical and portable.</p></div><div className="competency-domain-grid">{domains.map(([code,name])=><article key={code}><span>{code}</span><strong>{name}</strong></article>)}</div></section>
      <section className="fieldworks-callout kadara-fieldworks"><div><div className="gs-eyebrow">{common.competenceNotAttendance}</div><h2>Assessment + FieldWorks + {common.skillsPassport}</h2><p>{standards.assessment}</p><p>{standards.evidence}</p><p>{standards.delivery}</p></div><div className="fieldworks-metrics">{common.metrics.map(item=><span key={item}>{item}</span>)}</div></section>
    </main>
  </div>;
}

function moduleHref(code: string, language: string) {
  return `/learner/modules/${code}?lang=${language}&step=1`;
}
