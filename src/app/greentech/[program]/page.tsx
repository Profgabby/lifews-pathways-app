import Link from "next/link";
import { notFound } from "next/navigation";
import { LanguageMenu } from "@/components/language-menu";
import { commonAssessment, getGreenTechTier } from "@/lib/greentech";
import { localizeHref, normalizeLanguage } from "@/lib/i18n6";

type PageProps = { params: Promise<{ program: string }>; searchParams?: Promise<{ lang?: string }> };

export default async function GreenTechProgramPage({ params, searchParams }: PageProps) {
  const { program } = await params;
  const query = searchParams ? await searchParams : {};
  const language = normalizeLanguage(query.lang);
  const tier = getGreenTechTier(program);
  if (!tier) notFound();

  return <div className="program-page-shell">
    <header className="program-topbar">
      <Link href={localizeHref("/greentech", language)} className="program-brand-link"><img src="/lifews-mark.svg" alt="LIFEWS"/><div><strong>LIFEWS GreenTech</strong><span>{tier.title}</span></div></Link>
      <LanguageMenu currentLanguage={language}/>
    </header>
    <main>
      <section className="program-detail-hero greentech-hero"><div className="program-detail-number">{tier.code}</div><div><div className="gs-eyebrow">GREENTECH PROGRAM WORKSPACE</div><h1>{tier.title}</h1><h2>{tier.technicalRole} • {tier.aiStage} • {tier.enterpriseStage}</h2><p><strong>Entry:</strong> {tier.entry}</p><p>{tier.progression}</p><div className="program-detail-actions"><Link href={localizeHref("/greentech", language)}>← GreenTech home</Link></div></div></section>

      <section className="program-content-section"><div className="gs-section-heading"><div><div className="gs-eyebrow">12 MODULES</div><h2>Open a module to use the integrated technical, AI, enterprise, assessment and evidence workspace.</h2></div><p>{commonAssessment.rule}</p></div>
        <div className="curriculum-program-grid">{tier.modules.map(module=><article className="curriculum-program-card" key={module.code}><div className="curriculum-card-head"><span>{module.code}</span><small>{tier.aiStage}</small></div><h3>{module.title}</h3><p>{module.competency}</p><p><strong>Mandatory DIY:</strong> {module.diy}</p><p><strong>Field focus:</strong> {module.fieldFocus}</p><p><strong>Enterprise:</strong> {module.enterpriseFocus}</p><div className="program-detail-actions"><Link href={localizeHref(`/greentech/${tier.slug}/${module.code}`, language)}>Open module workspace →</Link></div></article>)}</div>
      </section>
    </main>
  </div>;
}
