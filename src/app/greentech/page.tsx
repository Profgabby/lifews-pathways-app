import Link from "next/link";
import { LanguageMenu } from "@/components/language-menu";
import { aiLayers, commonAssessment, competencyDomains, greenTechOperatingModel, greenTechTiers } from "@/lib/greentech";
import { localizeHref, normalizeLanguage } from "@/lib/i18n6";

type PageProps = { searchParams?: Promise<{ lang?: string }> };

export default async function GreenTechPage({ searchParams }: PageProps) {
  const params = searchParams ? await searchParams : {};
  const language = normalizeLanguage(params.lang);

  return <div className="program-page-shell" lang={language} dir={language === "ar" ? "rtl" : "ltr"}>
    <header className="program-topbar">
      <Link href={localizeHref("/", language)} className="program-brand-link">
        <img src="/lifews-mark.svg" alt="LIFEWS"/>
        <div><strong>LIFEWS GreenSkills</strong><span>Skills for Food • Energy • Water • Livelihoods</span></div>
      </Link>
      <LanguageMenu currentLanguage={language}/>
    </header>
    <main>
      <section className="program-detail-hero greentech-hero">
        <div className="program-detail-number">03</div>
        <div>
          <div className="gs-eyebrow">TECHNICAL TRAINING • AI • ENTERPRISE • CERTIFICATION</div>
          <h1>LIFEWS GreenTech</h1>
          <h2>Train. Certify. Deploy.</h2>
          <p>GreenTech is a competency-based technical pathway for integrated food-energy-water systems. Every module combines technical learning, practical work, data and AI, entrepreneurship, FieldWorks evidence and Skills Passport verification.</p>
          <div className="program-detail-actions"><a href="#programs">Explore the 36 modules</a><Link href={localizeHref("/", language)}>Back to GreenSkills</Link></div>
        </div>
      </section>

      <section className="program-stage-band">{greenTechOperatingModel.map((step,i,arr)=><div key={step}><span>{step.toUpperCase()}</span>{i<arr.length-1&&<b>→</b>}</div>)}</section>

      <section className="program-content-section" id="programs">
        <div className="gs-section-heading"><div><div className="gs-eyebrow">THREE PROGRAMS • 36 MODULES</div><h2>Progressive technical competence from foundations to advanced systems.</h2></div><p>Placement considers age, prior learning, diagnostic assessment, prerequisite competence and safety. Learners do not have to start at GF when equivalent competence can be verified.</p></div>
        <div className="curriculum-program-grid">{greenTechTiers.map(tier=><article className="curriculum-program-card" key={tier.code}>
          <div className="curriculum-card-head"><span>{tier.code}</span><small>{tier.entry}</small></div>
          <h3>{tier.title}</h3>
          <p><strong>Technical:</strong> {tier.technicalRole}</p>
          <p><strong>AI:</strong> {tier.aiStage}</p>
          <p><strong>Enterprise:</strong> {tier.enterpriseStage}</p>
          <p>{tier.progression}</p>
          <div className="lesson-stack">{tier.modules.map(module=><details key={module.code}><summary><b>{module.code}</b> {module.title}</summary><p><strong>Competency:</strong> {module.competency}</p><p><strong>DIY / practical:</strong> {module.diy}</p><Link href={localizeHref(`/greentech/${tier.slug}/${module.code}`, language)}>Open full module workspace →</Link></details>)}</div>
          <div className="program-detail-actions"><Link href={localizeHref(`/greentech/${tier.slug}`, language)}>Open {tier.code} program →</Link></div>
        </article>)}</div>
      </section>

      <section className="competency-framework"><div><div className="gs-eyebrow">SKILLS PASSPORT</div><h2>Six competency domains are verified in every module.</h2><p>{commonAssessment.rule}</p></div><div className="competency-domain-grid">{competencyDomains.map(([code,name])=><article key={code}><span>{code}</span><strong>{name}</strong></article>)}</div></section>

      <section className="program-content-section"><div className="gs-section-heading"><div><div className="gs-eyebrow">FIVE AI LAYERS</div><h2>AI advances with technical competence.</h2></div><p>No AI-generated instruction overrides LIFEWS safety procedures, trainer instructions, manufacturer requirements, applicable standards or competent professional judgment.</p></div><div className="competency-domain-grid">{aiLayers.map((layer,index)=><article key={layer}><span>{index+1}</span><strong>{layer}</strong></article>)}</div></section>

      <section className="fieldworks-callout"><div><div className="gs-eyebrow">ASSESSMENT & CERTIFICATION</div><h2>Certification requires verified evidence.</h2><p>Each module connects knowledge, application, practical performance, AI competence, enterprise competence, FieldWorks, portfolio evidence and trainer/assessor verification.</p></div><div className="fieldworks-metrics">{[`${commonAssessment.mcqs} MCQs`,`${commonAssessment.applicationQuestions} theory/application questions`,`Practical assessment`,`0–5 competency rating`,`AI Work Log`,`Enterprise task`,`FieldWorks hours`,`Portfolio evidence`,`Skills Passport update`,`Certification status`].map(item=><span key={item}>{item}</span>)}</div></section>
    </main>
  </div>;
}
