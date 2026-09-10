import Link from "next/link";
import { LanguageMenu } from "@/components/language-menu";
import { greenSkillsPrograms, sharedGreenSkillsSystems } from "@/lib/greenskills";
import { localizeHref, normalizeLanguage } from "@/lib/i18n6";
import { getGreenSkillsHomeCopy, localizeGreenSkillsPrograms } from "@/lib/greenskills-i18n";

type HomePageProps = { searchParams?: Promise<{ lang?: string }> };

export default async function GreenSkillsHome({ searchParams }: HomePageProps) {
  const params = searchParams ? await searchParams : {};
  const language = normalizeLanguage(params.lang);
  const copy = getGreenSkillsHomeCopy(language);
  const programs = localizeGreenSkillsPrograms(greenSkillsPrograms, language);
  const rtl = language === "ar";

  return <div className="gs-shell" dir={rtl ? "rtl" : "ltr"} lang={language}>
    <aside className="gs-sidebar">
      <Link href={localizeHref("/",language)} className="gs-brand"><img src="/lifews-mark.svg" alt="LIFEWS" className="gs-brand-mark"/><div><strong>LIFEWS</strong><span>GreenSkills</span><small>{copy.tagline}</small></div></Link>
      <LanguageMenu currentLanguage={language}/>
      <nav className="gs-nav"><Link className="active" href={localizeHref("/",language)}>{copy.nav.greenSkillsHome}</Link><Link href={localizeHref("/pathways",language)}>{copy.nav.pathways}</Link><Link href={localizeHref("/kadara",language)}>{copy.nav.kadara}</Link><Link href={localizeHref("/greentech",language)}>{copy.nav.greenTech}</Link><a href="#shared-systems">{copy.nav.skillsPassport}</a><a href="#shared-systems">{copy.nav.fieldWorks}</a></nav>
      <div className="gs-sidebar-footer">{copy.sidebarFooter.map((item,index)=><span key={`${item}-${index}`}>{index ? `• ${item}` : item}</span>)}</div>
    </aside>
    <main className="gs-main">
      <header className="gs-hero"><div className="gs-eyebrow">{copy.eyebrow}</div><h1>{copy.hero1}<br/><span>{copy.hero2}</span></h1><p className="gs-hero-tagline">{copy.tagline}</p><p className="gs-hero-copy">{copy.intro}</p><div className="gs-hero-actions"><a className="gs-button gs-button-primary" href="#programs">{copy.explore}</a><Link className="gs-button gs-button-secondary" href={localizeHref("/login",language)}>{copy.nav.staffSignIn}</Link></div></header>
      <section className="gs-journey">{copy.journey.map((step,index)=><div className="gs-journey-item" key={step}><span>{step}</span>{index<copy.journey.length-1&&<b>→</b>}</div>)}</section>
      <section id="programs" className="gs-section"><div className="gs-section-heading"><div><div className="gs-eyebrow">{copy.programsEyebrow}</div><h2>{copy.programsTitle}</h2></div><p>{copy.programsBody}</p></div><div className="gs-program-grid">{programs.map(program=><article className={`gs-program-card gs-program-${program.id}`} key={program.id}><div className="gs-program-top"><span className="gs-program-number">{program.number}</span><span className="gs-program-eyebrow">{program.eyebrow}</span></div><h3>{program.shortName}</h3><strong className="gs-program-tagline">{program.tagline}</strong><p>{program.purpose}</p><div className="gs-theme-list">{program.themes.slice(0,6).map(theme=><span key={theme}>{theme}</span>)}</div><Link className="gs-program-link" href={localizeHref(program.href,language)}>{program.action} →</Link></article>)}</div></section>
      <section className="gs-progression-section"><div className="gs-eyebrow">{copy.flexible}</div><h2>{copy.routesTitle}</h2><div className="gs-route-grid">{copy.routes.map(([label,title,body])=><article key={label}><span>{label}</span><strong>{title}</strong><p>{body}</p></article>)}</div></section>
      <section id="shared-systems" className="gs-shared-section"><div className="gs-section-heading"><div><div className="gs-eyebrow">{copy.sharedEyebrow}</div><h2>{copy.sharedTitle}</h2></div><p>{copy.sharedBody}</p></div><div className="gs-shared-grid">{sharedGreenSkillsSystems.map(system=><article key={system.name}><h3>{system.name}</h3><p>{system.description}</p></article>)}</div></section>
      <section className="gs-passport-band"><div><div className="gs-eyebrow">{copy.passportEyebrow}</div><h2>{copy.passportTitle}</h2><p>{copy.passportBody}</p></div><div className="gs-passport-fields">{copy.passportFields.map(item=><span key={item}>{item}</span>)}</div></section>
      <footer className="gs-footer"><img src="/lifews-mark.svg" alt="LIFEWS"/><div><strong>LIFEWS GreenSkills</strong><span>{copy.tagline}</span></div></footer>
    </main>
  </div>;
}
