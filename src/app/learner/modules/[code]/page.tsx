import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, BrainCircuit, BriefcaseBusiness, CheckCircle2, ChevronLeft, ChevronRight, ClipboardCheck, FileCheck2, Hammer, Lightbulb, ShieldCheck, Sparkles, Target, Trophy, UploadCloud } from "lucide-react";
import { LanguageMenu } from "@/components/language-menu";
import { localizeHref, normalizeLanguage } from "@/lib/i18n6";
import { getFullCurriculumModule } from "@/lib/modules";

type PageProps = { params: Promise<{ code: string }>; searchParams?: Promise<{ lang?: string; step?: string }> };

function moduleStepHref(code: string, language: string, step: number) { return `/learner/modules/${code}?lang=${language}&step=${step}`; }
function moduleProgram(code: string) {
  const prefix = code.toUpperCase().split("-")[0];
  if (["KS", "KW", "KE"].includes(prefix)) return { label: "Kadara", href: "/kadara", brand: "LIFEWS Kadara" };
  if (["GF", "GT2", "GA"].includes(prefix)) return { label: "GreenTech", href: "/greentech", brand: "LIFEWS GreenTech" };
  return { label: "Pathways", href: "/pathways", brand: "LIFEWS Pathways" };
}

export default async function ModulePage({ params, searchParams }: PageProps) {
  const { code } = await params;
  const query = searchParams ? await searchParams : {};
  const language = normalizeLanguage(query.lang);
  const module = getFullCurriculumModule(code, language);
  if (!module) notFound();

  const requestedStep = Number.parseInt(query.step ?? "1", 10);
  const step = Number.isFinite(requestedStep) ? Math.min(7, Math.max(1, requestedStep)) : 1;
  const rtl = language === "ar";
  const program = moduleProgram(module.code);
  const sectionGroups = [module.lessons.slice(0, 1), module.lessons.slice(1, 2), module.lessons.slice(2, 3), module.lessons.slice(3, 4), module.lessons.slice(4)];
  const sectionLabels = sectionGroups.map((group, index) => `Learn ${index + 1}${group[0]?.title ? ` · ${group[0].title}` : ""}`);
  const navItems = [...sectionLabels.map((label, index) => ({ step: index + 1, label })), { step: 6, label: "Assessment" }, { step: 7, label: "Practical & Passport" }];
  const progress = Math.round((step / 7) * 100);

  return <main className="learner-page module-slide-page module-player" dir={rtl ? "rtl" : "ltr"} lang={language}>
    <header className="learner-header module-header">
      <Link className="learner-brand" href={localizeHref(program.href, language)}><img src="/lifews-mark.svg" alt="LIFEWS logo"/><div><strong>{program.brand}</strong><span>{module.level}</span></div></Link>
      <div className="learner-header-actions module-header-actions"><LanguageMenu currentLanguage={language}/><Link className="text-link" href={localizeHref(program.href, language)}>{program.label}</Link><Link className="text-link" href={localizeHref("/learner", language)}>Learner Space</Link></div>
    </header>

    <section className="module-player-hero">
      <div className="module-player-copy"><div className="eyebrow">{module.code} · {module.level}</div><h1>{module.title}</h1><p>{module.bigQuestion}</p><div className="module-meta-row"><span><BookOpen size={16}/> 7 stages</span><span><Target size={16}/> {module.duration}</span><span><Hammer size={16}/> {module.fieldworkHours}h FieldWorks</span></div></div>
      <aside className="module-progress-card"><div className="module-progress-ring" style={{ "--progress": `${progress}%` } as React.CSSProperties}><strong>{progress}%</strong></div><div><span>Module progress</span><strong>Stage {step} of 7</strong><small>Keep moving—your evidence builds your Skills Passport.</small></div></aside>
    </section>

    <nav className="module-step-nav module-player-nav" aria-label={`${module.code} module navigation`}>
      {navItems.map(item => <Link key={item.step} href={moduleStepHref(module.code, language, item.step)} className={step === item.step ? "module-step-link active" : item.step < step ? "module-step-link complete" : "module-step-link"} aria-current={step === item.step ? "page" : undefined}><span>{item.step < step ? <CheckCircle2 size={19}/> : String(item.step).padStart(2, "0")}</span><strong>{item.label}</strong></Link>)}
    </nav>

    {step <= 5 && <section className="module-slide-card module-learning-stage">
      <div className="module-slide-topline"><div><div className="eyebrow">Learning stage {step} of 5</div><h2>{sectionGroups[step - 1]?.length === 1 ? sectionGroups[step - 1][0]?.title : "Apply, connect and consolidate"}</h2></div><div className="module-stage-icon"><BookOpen size={32}/></div></div>
      {step === 1 && <div className="module-intro-grid module-orientation-grid"><article><Target size={21}/><h3>Why this matters</h3><p>{module.whyItMatters}</p></article><article><Trophy size={21}/><h3>What you will achieve</h3><ul>{module.outcomes.map(x => <li key={x}>{x}</li>)}</ul></article><article><Lightbulb size={21}/><h3>Key vocabulary</h3><div className="module-chip-list">{module.vocabulary.map(x => <span key={x}>{x}</span>)}</div></article><article><ShieldCheck size={21}/><h3>Materials & safety</h3><ul>{[...module.materials, ...module.safety].map(x => <li key={x}>{x}</li>)}</ul></article></div>}
      <div className="module-section-lessons">{sectionGroups[step - 1]?.map((lesson, lessonIndex) => <article className="module-lesson-panel" key={lesson.id}><div className="module-lesson-heading"><div><div className="eyebrow">{lesson.id}{sectionGroups[step - 1].length > 1 ? ` · Part ${lessonIndex + 1}` : ""}</div><h2>{lesson.title}</h2></div><span className="module-status-badge">Learning</span></div><p className="module-objective"><Target size={18}/><span><strong>Objective</strong>{lesson.objective}</span></p><div className="module-content-block"><h3><BookOpen size={19}/> Learn</h3><ul>{lesson.teaching.map(x => <li key={x}>{x}</li>)}</ul></div><div className="module-callout module-activity-card"><Sparkles size={21}/><div><strong>Try it</strong><p>{lesson.activity}</p></div></div><div className="module-two-column"><div className="module-ai-card"><BrainCircuit size={21}/><strong>AI & digital skill</strong><p>{lesson.aiLayer}</p></div><div className="module-enterprise-card"><BriefcaseBusiness size={21}/><strong>Enterprise connection</strong><p>{lesson.enterprise}</p></div></div></article>)}</div>
    </section>}

    {step === 6 && <section className="module-slide-card module-assessment-stage"><div className="module-slide-topline"><div><div className="eyebrow">Stage 6 of 7</div><h2>Knowledge & Application Check</h2><p className="module-slide-lead">Show what you understand before moving into the practical evidence stage.</p></div><div className="module-stage-icon"><ClipboardCheck size={32}/></div></div><div className="module-assessment-banner"><CheckCircle2 size={22}/><div><strong>Assessment structure</strong><span>8 multiple-choice questions · 5 application questions · practical assessment follows</span></div></div><h3>Multiple-choice questions</h3><div className="module-question-list">{module.finalAssessment.mcq.map((q, i) => <article key={q.question} className="module-question-card"><span className="question-number">{String(i + 1).padStart(2, "0")}</span><strong>{q.question}</strong><ol type="A">{q.options.map(option => <li key={option}>{option}</li>)}</ol></article>)}</div><h3>Application questions</h3><ol className="module-theory-list">{module.finalAssessment.theory.map(q => <li key={q}>{q}</li>)}</ol></section>}

    {step === 7 && <section className="module-slide-card module-practical-stage"><div className="module-slide-topline"><div><div className="eyebrow">Stage 7 of 7</div><h2>Practical Evidence & Skills Passport</h2><p className="module-slide-lead">Turn what you learned into evidence of competence. Your facilitator can review the evidence before it becomes part of your Skills Passport.</p></div><div className="module-stage-icon"><FileCheck2 size={32}/></div></div><div className="module-practical-layout"><div className="module-practical-main"><article className="module-practical-hero-card"><Hammer size={24}/><div><span>Final practical assessment</span><h3>{module.finalAssessment.practical}</h3></div></article><article className="module-evidence-workspace"><div className="module-workspace-title"><div><UploadCloud size={23}/><div><span className="eyebrow">Evidence workspace</span><h3>Prepare your submission</h3></div></div><span className="module-status-badge">Facilitator review</span></div><p>Use this checklist to prepare the evidence required for this module. Secure learner evidence storage will be connected to this workspace separately.</p><div className="module-evidence-list">{module.evidence.map((x, i) => <div key={x}><span>{i + 1}</span><p>{x}</p><small>Required evidence</small></div>)}</div><div className="module-upload-placeholder"><UploadCloud size={26}/><div><strong>Evidence upload area</strong><span>Submission controls will activate when secure learner evidence storage is connected.</span></div></div></article></div><aside className="module-passport-panel"><div className="module-passport-head"><Trophy size={25}/><div><span>Skills Passport</span><strong>Competencies earned</strong></div></div><div className="module-passport-list">{module.passport.map(x => <div key={x}><CheckCircle2 size={18}/><span>{x}</span></div>)}</div><div className="module-passport-note"><ShieldCheck size={18}/><span>Competencies should be verified from demonstrated evidence, not attendance alone.</span></div></aside></div><details className="module-diy-drawer"><summary><Hammer size={19}/> DIY tasks from all learning stages</summary><ol>{module.lessons.map(lesson => <li key={lesson.id}><strong>{lesson.title}:</strong> {lesson.diy}</li>)}</ol></details><details className="module-trainer-notes"><summary>Trainer / facilitator guidance</summary><ul>{module.trainerNotes.map(x => <li key={x}>{x}</li>)}</ul><p><strong>Remediation:</strong> {module.remediation}</p><p><strong>Extension:</strong> {module.extension}</p></details></section>}

    <div className="module-bottom-navigation"><div>{step > 1 && <Link className="module-nav-button secondary" href={moduleStepHref(module.code, language, step - 1)}><ChevronLeft size={18}/> Previous</Link>}</div><div className="module-progress-label"><span>{step} / 7</span><div><i style={{ width: `${progress}%` }}/></div></div><div>{step < 7 && <Link className="module-nav-button" href={moduleStepHref(module.code, language, step + 1)}>Continue <ChevronRight size={18}/></Link>}</div></div>
    <footer className="module-footer-links"><Link href={localizeHref(program.href, language)}>Back to {program.label}</Link><Link href={localizeHref("/learner", language)}>Learner Space</Link></footer>
  </main>;
}
