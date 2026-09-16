import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, BrainCircuit, BriefcaseBusiness, CheckCircle2, ChevronLeft, ChevronRight, ClipboardCheck, FileCheck2, Hammer, Lightbulb, ShieldCheck, Sparkles, Target, Trophy } from "lucide-react";
import { LanguageMenu } from "@/components/language-menu";
import { LearnerEvidencePanel } from "@/components/learner-evidence-panel";
import { ModuleAssessmentPlayer } from "@/components/module-assessment-player";
import { ModuleProgressTracker } from "@/components/module-progress-tracker";
import { ModuleContextMedia } from "@/components/module-context-media";
import { SectionQuiz } from "@/components/section-quiz";
import { GreenTechMajorQuiz } from "@/components/greentech-major-quiz";
import { localizeHref, normalizeLanguage } from "@/lib/i18n6";
import { modulePlayerCopy } from "@/lib/module-player-i18n";
import { getFullCurriculumModule } from "@/lib/modules";
import { curriculumPrograms } from "@/lib/curriculum";
import { getModuleMedia } from "@/lib/module-media";

type PageProps = { params: Promise<{ code: string }>; searchParams?: Promise<{ lang?: string; step?: string }> };

function moduleStepHref(code: string, language: string, step: number) { return `/learner/modules/${code}?lang=${language}&step=${step}`; }
function moduleProgram(code: string) {
  const prefix = code.toUpperCase().split("-")[0];
  if (["KS", "KW", "KE"].includes(prefix)) return { label: "Kadara", href: "/kadara", brand: "LIFEWS Kadara" };
  if (["GF", "GT2", "GA"].includes(prefix)) return { label: "GreenTech", href: "/greentech", brand: "LIFEWS GreenTech" };
  return { label: "Pathways", href: "/pathways", brand: "LIFEWS Pathways" };
}
function nextModuleCode(code: string) {
  const all = curriculumPrograms.filter((program) => program.arm === "greentech").flatMap((program) => program.lessons.map((lesson) => lesson.code));
  const index = all.indexOf(code.toUpperCase());
  return index >= 0 ? all[index + 1] : undefined;
}

function sectionQuestions(lesson: any, moduleTitle: string) {
  const base = lesson.quiz ?? [];
  const generated = [
    [`What is the strongest evidence of learning in ${moduleTitle}?`, ["A dated, observable practical record", "A guess", "An unverified claim", "A copied answer"]],
    ["What should happen before practical work begins?", ["Review the method and safety controls", "Skip the briefing", "Energize unknown equipment", "Remove protective equipment"]],
    ["When results differ from expectations, what is the best response?", ["Check evidence, identify causes and improve", "Hide the result", "Blame the learner", "Repeat without checking"]],
    ["How should a learner use an AI suggestion?", ["Verify it against evidence and trusted guidance", "Treat it as the only authority", "Use it to bypass practice", "Follow it if it sounds confident"]],
    ["Which habit strengthens technical work?", ["Plan, perform, check and record", "Work from memory only", "Ignore measurements", "Avoid documentation"]],
    ["What makes a GreenTech solution responsible?", ["It considers safety, users, resources and quality", "It promises guaranteed income", "It hides limitations", "It ignores maintenance"]],
    ["What should be done with an unsafe condition?", ["Stop and report it through the approved process", "Continue quickly", "Photograph it and ignore it", "Ask an untrained person to fix it"]],
    ["Why are measurements useful?", ["They make decisions and comparisons more reliable", "They replace supervision", "They guarantee success", "They are only for reports"]],
  ];
  return Array.from({ length: 10 }, (_, index) => {
    const source = base[index] ?? { question: generated[index - base.length][0], options: generated[index - base.length][1], answer: 0 };
    return { question: source.question, options: source.options.length === 4 ? source.options : [...source.options, "None of these", "Not applicable"].slice(0, 4), answer: source.answer ?? 0 };
  });
}

export default async function ModulePage({ params, searchParams }: PageProps) {
  const { code } = await params;
  const query = searchParams ? await searchParams : {};
  const language = normalizeLanguage(query.lang);
  const copy = modulePlayerCopy[language];
  const module = getFullCurriculumModule(code, language);
  if (!module) notFound();

  const requestedStep = Number.parseInt(query.step ?? "1", 10);
  const step = Number.isFinite(requestedStep) ? Math.min(7, Math.max(1, requestedStep)) : 1;
  const rtl = language === "ar";
  const program = moduleProgram(module.code);
  const media = getModuleMedia(module.code);
  const nextCode = nextModuleCode(module.code);
  const finalSection = { id: `${module.code}-S6`, title: "Integrate, reflect and prepare for the field", objective: `Integrate the learning from ${module.title} into a safe, evidence-based plan.`, teaching: ["Connect the concepts, practical steps and evidence from the previous sections.", "Review the safety controls, quality checks and documentation needed for transfer to a real setting.", "Prepare to explain the work clearly to a facilitator, teammate or community user."], activity: `Create a one-page readiness plan for ${module.title}: what you will do, how you will stay safe, what you will measure and how you will know it worked.`, diy: module.lessons.at(-1)?.diy ?? "Complete a supervised practical project.", aiLayer: "Use digital tools only to organize and clarify your plan; verify every technical claim with supervision and evidence.", enterprise: `Translate ${module.title.toLowerCase()} into a responsible service, job capability or community solution.`, quiz: [] };
  const sectionGroups = [...module.lessons.slice(0, 5).map((lesson) => [lesson]), [finalSection]];
  const sectionLabels = sectionGroups.map((group, index) => `${copy.learn} ${index + 1}${group[0]?.title ? ` · ${group[0].title}` : ""}`);
  const navItems = [...sectionLabels.map((label, index) => ({ step: index + 1, label })), { step: 6, label: copy.assessment }, { step: 7, label: copy.practicalPassport }];
  const progress = Math.round((step / 7) * 100);

  return <main className="learner-page module-slide-page module-player" dir={rtl ? "rtl" : "ltr"} lang={language}>
    <ModuleProgressTracker code={module.code} stage={step}/>
    <header className="learner-header module-header">
      <Link className="learner-brand" href={localizeHref(program.href, language)}><img src="/lifews-logo.png" alt="LIFEWS logo"/><div><strong>{program.brand}</strong><span>{module.level}</span></div></Link>
      <div className="learner-header-actions module-header-actions"><LanguageMenu currentLanguage={language}/><Link className="text-link" href={localizeHref(program.href, language)}>{program.label}</Link><Link className="text-link" href={localizeHref("/learner", language)}>{copy.learnerSpace}</Link></div>
    </header>

    <section className="module-player-hero">
      <div className="module-player-copy"><div className="eyebrow">{module.code} · {module.level}</div><h1>{module.title}</h1><p>{module.bigQuestion}</p><div className="module-meta-row"><span><BookOpen size={16}/> 6 learning sections + DIY</span><span><Target size={16}/> {module.duration}</span><span><Hammer size={16}/> {module.fieldworkHours}h {copy.fieldworks}</span></div></div>
      {media && <div className="module-avatar"><img src={media.asset} alt={media.alt}/><span>Field-ready learning</span></div>}
      <aside className="module-progress-card"><div className="module-progress-ring" style={{ "--progress": `${progress}%` } as React.CSSProperties}><strong>{progress}%</strong></div><div><span>{copy.moduleProgress}</span><strong>{copy.stageOf(step)}</strong><small>{copy.progressHint}</small></div></aside>
    </section>

    <nav className="module-step-nav module-player-nav" aria-label={`${module.code} module navigation`}>
      {navItems.map(item => <Link key={item.step} href={moduleStepHref(module.code, language, item.step)} className={step === item.step ? "module-step-link active" : item.step < step ? "module-step-link complete" : "module-step-link"} aria-current={step === item.step ? "page" : undefined}><span>{item.step < step ? <CheckCircle2 size={19}/> : String(item.step).padStart(2, "0")}</span><strong>{item.label}</strong></Link>)}
    </nav>

    {step <= 5 && <section className="module-slide-card module-learning-stage">
      {step === 1 && <ModuleContextMedia code={module.code} priority />}
      <div className="module-slide-topline"><div><div className="eyebrow">{copy.learningStage(step)}</div><h2>{sectionGroups[step - 1]?.length === 1 ? sectionGroups[step - 1][0]?.title : copy.applyConnect}</h2></div><div className="module-stage-icon"><BookOpen size={32}/></div></div>
      {step === 1 && <div className="module-intro-grid module-orientation-grid"><article><Target size={21}/><h3>{copy.whyMatters}</h3><p>{module.whyItMatters}</p></article><article><Trophy size={21}/><h3>{copy.achieve}</h3><ul>{module.outcomes.map(x => <li key={x}>{x}</li>)}</ul></article><article><Lightbulb size={21}/><h3>{copy.vocabulary}</h3><div className="module-chip-list">{module.vocabulary.map(x => <span key={x}>{x}</span>)}</div></article><article><ShieldCheck size={21}/><h3>{copy.materialsSafety}</h3><ul>{[...module.materials, ...module.safety].map(x => <li key={x}>{x}</li>)}</ul></article></div>}
      <div className="module-section-lessons">{sectionGroups[step - 1]?.map((lesson, lessonIndex) => <article className="module-lesson-panel" key={lesson.id}><div className="module-lesson-heading"><div><div className="eyebrow">{lesson.id}{sectionGroups[step - 1].length > 1 ? ` · ${lessonIndex + 1}` : ""}</div><h2>{lesson.title}</h2></div><span className="module-status-badge">{copy.learning}</span></div><p className="module-objective"><Target size={18}/><span><strong>{copy.objective}</strong>{lesson.objective}</span></p><div className="module-content-block"><h3><BookOpen size={19}/> {copy.learn}</h3><ul>{lesson.teaching.map(x => <li key={x}>{x}</li>)}</ul></div><div className="module-callout module-activity-card"><Sparkles size={21}/><div><strong>{copy.tryIt}</strong><p>{lesson.activity}</p></div></div><div className="module-two-column"><div className="module-ai-card"><BrainCircuit size={21}/><strong>{copy.aiDigital}</strong><p>{lesson.aiLayer}</p></div><div className="module-enterprise-card"><BriefcaseBusiness size={21}/><strong>{copy.enterprise}</strong><p>{lesson.enterprise}</p></div></div><SectionQuiz questions={sectionQuestions(lesson, module.title)}/></article>)}</div>
    </section>}

    {step === 6 && <section className="module-slide-card module-assessment-stage"><div className="module-slide-topline"><div><div className="eyebrow">{copy.stageOf(6)}</div><h2>{copy.knowledgeApplication}</h2><p className="module-slide-lead">{copy.assessmentLead}</p></div><div className="module-stage-icon"><ClipboardCheck size={32}/></div></div><div className="module-assessment-banner"><CheckCircle2 size={22}/><div><strong>{copy.assessmentStructure}</strong><span>{copy.assessmentSummary}</span></div></div><h3>{copy.mcq}</h3><ModuleAssessmentPlayer code={module.code} language={language} mcq={module.finalAssessment.mcq.map(q=>({question:q.question,options:q.options}))} theory={module.finalAssessment.theory}/></section>}

    {step === 7 && <section className="module-slide-card module-practical-stage">{module.code === "GF-03" && <GreenTechMajorQuiz nextCode="GF-04" language={language}/>}<div className="module-slide-topline"><div><div className="eyebrow">{copy.stageOf(7)}</div><h2>{copy.practicalEvidence}</h2><p className="module-slide-lead">{copy.practicalLead}</p></div><div className="module-stage-icon"><FileCheck2 size={32}/></div></div><div className="module-practical-layout"><div className="module-practical-main"><article className="module-practical-hero-card"><Hammer size={24}/><div><span>{copy.finalPractical}</span><h3>{module.finalAssessment.practical}</h3></div></article><LearnerEvidencePanel lessonCode={module.code} requiredEvidence={module.evidence}/></div><aside className="module-passport-panel"><div className="module-passport-head"><Trophy size={25}/><div><span>{copy.skillsPassport}</span><strong>{copy.competenciesEarned}</strong></div></div><div className="module-passport-list">{module.passport.map(x => <div key={x}><CheckCircle2 size={18}/><span>{x}</span></div>)}</div><div className="module-passport-note"><ShieldCheck size={18}/><span>{copy.passportNote}</span></div></aside></div><details className="module-diy-drawer"><summary><Hammer size={19}/> {copy.diyTasks}</summary><ol>{module.lessons.map(lesson => <li key={lesson.id}><strong>{lesson.title}:</strong> {lesson.diy}</li>)}</ol></details><details className="module-trainer-notes"><summary>{copy.trainerGuidance}</summary><ul>{module.trainerNotes.map(x => <li key={x}>{x}</li>)}</ul><p><strong>{copy.remediation}:</strong> {module.remediation}</p><p><strong>{copy.extension}:</strong> {module.extension}</p></details></section>}

    <div className="module-bottom-navigation"><div>{step > 1 && <Link className="module-nav-button secondary" href={moduleStepHref(module.code, language, step - 1)}><ChevronLeft size={18}/> {copy.previous}</Link>}</div><div className="module-progress-label"><span>{step} / 7</span><div><i style={{ width: `${progress}%` }}/></div></div><div>{step < 7 ? <Link className="module-nav-button" href={moduleStepHref(module.code, language, step + 1)}>{copy.continue} <ChevronRight size={18}/></Link> : nextCode && module.code !== "GF-03" ? <Link className="module-nav-button" href={moduleStepHref(nextCode, language, 1)}>Next module <ChevronRight size={18}/></Link> : <Link className="module-nav-button" href={localizeHref(program.href, language)}>Back to GreenTech</Link>}</div></div>
    <footer className="module-footer-links"><Link href={localizeHref(program.href, language)}>{copy.backTo} {program.label}</Link><Link href={localizeHref("/learner", language)}>{copy.learnerSpace}</Link></footer>
  </main>;
}
