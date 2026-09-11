import Link from "next/link";
import { notFound } from "next/navigation";
import { LanguageMenu } from "@/components/language-menu";
import { aiLayers, commonAssessment, competencyDomains, getGreenTechModule, greenTechTiers } from "@/lib/greentech";
import { localizeHref, normalizeLanguage } from "@/lib/i18n6";

type PageProps = { params: Promise<{ program: string; module: string }>; searchParams?: Promise<{ lang?: string }> };

export function generateStaticParams() {
  return greenTechTiers.flatMap((tier) => tier.modules.map((module) => ({ program: tier.slug, module: module.code })));
}

export default async function GreenTechModulePage({ params, searchParams }: PageProps) {
  const { program, module: moduleCode } = await params;
  const query = searchParams ? await searchParams : {};
  const language = normalizeLanguage(query.lang);
  const result = getGreenTechModule(program, moduleCode);
  if (!result) notFound();
  const { tier, module } = result;

  const assessmentItems = [
    `${commonAssessment.mcqs} MCQs`,
    `${commonAssessment.applicationQuestions} theory/application questions`,
    "Practical assessment",
    "AI competency assessment",
    "Entrepreneurship assessment",
    "0–5 competency rating",
    "FieldWorks evidence",
    "Skills Passport update",
  ];

  return <div className="program-page-shell" lang={language} dir={language === "ar" ? "rtl" : "ltr"}>
    <header className="program-topbar">
      <Link href={localizeHref(`/greentech/${tier.slug}`, language)} className="program-brand-link"><img src="/lifews-mark.svg" alt="LIFEWS"/><div><strong>{module.code}</strong><span>{tier.title}</span></div></Link>
      <LanguageMenu currentLanguage={language}/>
    </header>
    <main>
      <section className="program-detail-hero greentech-hero"><div className="program-detail-number">{module.code}</div><div><div className="gs-eyebrow">INTEGRATED MODULE WORKSPACE</div><h1>{module.title}</h1><h2>{module.competency}</h2><p><strong>Mandatory DIY / practical:</strong> {module.diy}</p><div className="program-detail-actions"><Link href={localizeHref(`/greentech/${tier.slug}`, language)}>← Back to {tier.code}</Link><Link href={localizeHref("/greentech", language)}>GreenTech home</Link></div></div></section>

      <section className="program-content-section"><div className="gs-section-heading"><div><div className="gs-eyebrow">TECHNICAL DELIVERY</div><h2>Learn → demonstrate → practice → verify.</h2></div><p>Trainer delivery should establish the Big Question, measurable objectives, technical concepts, vocabulary, tools/materials, safety controls, demonstration, mandatory practical, expected result and troubleshooting before summative assessment.</p></div>
        <div className="curriculum-program-grid">
          <article className="curriculum-program-card"><div className="curriculum-card-head"><span>DIY</span><small>MANDATORY</small></div><h3>Practical task</h3><p>{module.diy}</p><p><strong>Field focus:</strong> {module.fieldFocus}</p><p>Evidence must show what the learner actually measured, built, tested, analyzed or documented.</p></article>
          <article className="curriculum-program-card"><div className="curriculum-card-head"><span>SAFE</span><small>STOP-WORK RULE</small></div><h3>Safety gate</h3><p>Identify hazards, PPE, isolation/safe-state requirements and escalation conditions before work begins.</p><p>Safety-critical failure can require immediate remediation regardless of academic performance.</p></article>
          <article className="curriculum-program-card"><div className="curriculum-card-head"><span>DATA</span><small>VERIFY</small></div><h3>Measurements & records</h3><p>Record inputs, units, assumptions, observations, calculations and acceptance checks. Generated or estimated values must never be presented as field measurements.</p></article>
        </div>
      </section>

      <section className="program-content-section"><div className="gs-section-heading"><div><div className="gs-eyebrow">FIVE AI LAYERS</div><h2>{tier.aiStage}</h2></div><p>{module.aiFocus}</p></div><div className="competency-domain-grid">{aiLayers.map((layer,index)=><article key={layer}><span>{index+1}</span><strong>{layer}</strong></article>)}</div><div className="fieldworks-callout"><div><div className="gs-eyebrow">AI WORK LOG</div><h2>Task → Input → AI use → Output → Verification → Correction → Final decision</h2><p>No AI-generated instruction overrides LIFEWS safety procedures, trainer instructions, manufacturer requirements, applicable technical standards or competent professional judgment.</p></div></div></section>

      <section className="program-content-section"><div className="gs-section-heading"><div><div className="gs-eyebrow">ENTREPRENEURSHIP</div><h2>{tier.enterpriseStage}</h2></div><p>Every technical competency is connected to customer value without expanding the learner's authorized scope.</p></div><div className="curriculum-program-grid">
        <article className="curriculum-program-card"><h3>Service opportunity</h3><p>{module.enterpriseFocus}</p><p>Define customer → problem → technical scope → evidence → cost → price → handover → after-service.</p></article>
        <article className="curriculum-program-card"><h3>Costing</h3><p>Materials + Consumables + Transport + Labor + Tool/Equipment Allowance + Overhead + Contingency = Cost of Service.</p><p>Cost of Service + Sustainable Margin = Customer Price.</p></article>
        <article className="curriculum-program-card"><h3>Enterprise evidence</h3><p>Customer problem statement, service scope, cost sheet, quotation/proposal, QA evidence, limitations/exclusions and after-service plan.</p></article>
      </div></section>

      <section className="program-content-section"><div className="gs-section-heading"><div><div className="gs-eyebrow">PRACTICAL ASSESSMENT</div><h2>Competence must be observable and defensible.</h2></div><p>{commonAssessment.rule}</p></div><div className="fieldworks-metrics">{assessmentItems.map(item=><span key={item}>{item}</span>)}</div><div className="curriculum-program-grid">
        <article className="curriculum-program-card"><h3>Assessor sequence</h3><p>Scope → Safety gate → Preparation → Technical execution → Measurement → Acceptance test → Fault diagnosis → Corrective action → Retest → Documentation → Handover.</p></article>
        <article className="curriculum-program-card"><h3>Practical observation</h3><p>{commonAssessment.practicalStatuses.join(" • ")}</p></article>
        <article className="curriculum-program-card"><h3>Competency scale</h3>{commonAssessment.competencyScale.map(item=><p key={item}>{item}</p>)}</article>
      </div></section>

      <section className="competency-framework"><div><div className="gs-eyebrow">SKILLS PASSPORT</div><h2>Record six verified domains.</h2><p>Transfer ratings only after the required evidence has been reviewed and the module decision is complete.</p></div><div className="competency-domain-grid">{competencyDomains.map(([code,name])=><article key={code}><span>{code}</span><strong>{name}</strong></article>)}</div></section>

      <section className="fieldworks-callout"><div><div className="gs-eyebrow">FIELDWORKS & PORTFOLIO</div><h2>Evidence required for this module</h2><p>FieldWorks hours count only when the learner has a meaningful technical role and produces verifiable evidence.</p></div><div className="fieldworks-metrics">{module.evidence.map(item=><span key={item}>{item}</span>)}</div></section>
    </main>
  </div>;
}
