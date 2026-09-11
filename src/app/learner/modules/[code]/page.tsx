import Link from "next/link";
import { notFound } from "next/navigation";
import { LanguageMenu } from "@/components/language-menu";
import { localizeHref, normalizeLanguage } from "@/lib/i18n6";
import { getFullCurriculumModule } from "@/lib/modules";

type PageProps = {
  params: Promise<{ code: string }>;
  searchParams?: Promise<{ lang?: string; step?: string }>;
};

function moduleStepHref(code: string, language: string, step: number) {
  return `/learner/modules/${code}?lang=${language}&step=${step}`;
}

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

  // Standard learner flow: five learning sections, one assessment section and one DIY/practical section.
  // Existing authored modules contain six guided lessons. To preserve every authored lesson without
  // creating an eighth slide, lessons 5 and 6 are presented together in Learning Section 5.
  const sectionGroups = [
    module.lessons.slice(0, 1),
    module.lessons.slice(1, 2),
    module.lessons.slice(2, 3),
    module.lessons.slice(3, 4),
    module.lessons.slice(4),
  ];

  const sectionLabels = sectionGroups.map((group, index) => {
    const title = group.length === 1 ? group[0]?.title : group.map(item => item.title).join(" + ");
    return `Section ${index + 1}${title ? ` · ${title}` : ""}`;
  });

  const navItems = [
    ...sectionLabels.map((label, index) => ({ step: index + 1, label })),
    { step: 6, label: "Questions & Assessment" },
    { step: 7, label: "DIY & Practical Task" },
  ];

  return <main className="learner-page module-slide-page" dir={rtl ? "rtl" : "ltr"} lang={language}>
    <header className="learner-header module-header">
      <Link className="learner-brand" href={localizeHref(program.href, language)}>
        <img src="/lifews-mark.svg" alt="LIFEWS logo"/>
        <div><strong>{program.brand}</strong><span>{module.level}</span></div>
      </Link>
      <div className="learner-header-actions module-header-actions">
        <LanguageMenu currentLanguage={language}/>
        <Link className="text-link" href={localizeHref("/", language)}>GreenSkills Home</Link>
        <Link className="text-link" href={localizeHref(program.href, language)}>{program.label}</Link>
        <Link className="text-link" href={localizeHref("/learner", language)}>Learner Space</Link>
      </div>
    </header>

    <section className="learner-hero module-hero">
      <div className="eyebrow">{module.code} · {module.level}</div>
      <h1>{module.title}</h1>
      <p>{module.bigQuestion}</p>
      <div className="learner-mode-note">{module.age} · {module.duration} · FieldWorks: {module.fieldworkHours} hours</div>
    </section>

    <nav className="module-step-nav" aria-label={`${module.code} module navigation`}>
      {navItems.map(item => <Link
        key={item.step}
        href={moduleStepHref(module.code, language, item.step)}
        className={step === item.step ? "module-step-link active" : "module-step-link"}
        aria-current={step === item.step ? "page" : undefined}
      >
        <span>{String(item.step).padStart(2, "0")}</span>
        <strong>{item.label}</strong>
      </Link>)}
    </nav>

    {step <= 5 && <section className="module-slide-card">
      <div className="module-slide-topline">
        <div>
          <div className="eyebrow">Learning Section {step} of 5</div>
          <h2>{sectionGroups[step - 1]?.length === 1 ? sectionGroups[step - 1][0]?.title : "Apply, connect and consolidate"}</h2>
        </div>
        <div className="module-avatar-placeholder" aria-label={`Visual placeholder for section ${step}`}>{step}</div>
      </div>

      {step === 1 && <div className="module-intro-grid">
        <article><h3>Why this matters</h3><p>{module.whyItMatters}</p></article>
        <article><h3>Learning outcomes</h3><ul>{module.outcomes.map(x => <li key={x}>{x}</li>)}</ul></article>
        <article><h3>Vocabulary</h3><p>{module.vocabulary.join(" · ")}</p></article>
        <article><h3>Materials & safety</h3><ul>{[...module.materials, ...module.safety].map(x => <li key={x}>{x}</li>)}</ul></article>
      </div>}

      <div className="module-section-lessons">
        {sectionGroups[step - 1]?.map((lesson, lessonIndex) => <article className="module-lesson-panel" key={lesson.id}>
          <div className="eyebrow">{lesson.id}{sectionGroups[step - 1].length > 1 ? ` · Part ${lessonIndex + 1}` : ""}</div>
          <h2>{lesson.title}</h2>
          <p className="module-objective"><strong>Objective:</strong> {lesson.objective}</p>
          <h3>Learn</h3>
          <ul>{lesson.teaching.map(x => <li key={x}>{x}</li>)}</ul>
          <div className="module-callout"><strong>Activity</strong><p>{lesson.activity}</p></div>
          <div className="module-two-column">
            <div><strong>AI learning layer</strong><p>{lesson.aiLayer}</p></div>
            <div><strong>Enterprise connection</strong><p>{lesson.enterprise}</p></div>
          </div>
        </article>)}
      </div>
    </section>}

    {step === 6 && <section className="module-slide-card">
      <div className="module-slide-topline">
        <div><div className="eyebrow">Section 6 of 7</div><h2>Questions & Assessment</h2></div>
        <div className="module-avatar-placeholder">Q</div>
      </div>
      <p className="module-slide-lead">Complete the knowledge questions first, then answer the application questions using examples from the module.</p>
      <h3>8 multiple-choice questions</h3>
      <div className="module-question-list">{module.finalAssessment.mcq.map((q, i) => <article key={q.question} className="module-question-card"><strong>{i + 1}. {q.question}</strong><ol type="A">{q.options.map(option => <li key={option}>{option}</li>)}</ol></article>)}</div>
      <h3>5 theory / application questions</h3>
      <ol className="module-theory-list">{module.finalAssessment.theory.map(q => <li key={q}>{q}</li>)}</ol>
    </section>}

    {step === 7 && <section className="module-slide-card">
      <div className="module-slide-topline">
        <div><div className="eyebrow">Section 7 of 7</div><h2>DIY & Practical Task</h2></div>
        <div className="module-avatar-placeholder">DIY</div>
      </div>
      <p className="module-slide-lead">This section converts the module into practical evidence for the learner's Skills Passport.</p>
      <div className="module-diy-grid">
        <article><h3>DIY tasks from the learning sections</h3><ol>{module.lessons.map(lesson => <li key={lesson.id}><strong>{lesson.title}:</strong> {lesson.diy}</li>)}</ol></article>
        <article><h3>Final practical assessment</h3><p>{module.finalAssessment.practical}</p></article>
        <article><h3>Evidence to submit</h3><ul>{module.evidence.map(x => <li key={x}>{x}</li>)}</ul></article>
        <article><h3>Skills Passport mapping</h3><ul>{module.passport.map(x => <li key={x}>{x}</li>)}</ul></article>
      </div>
      <details className="module-trainer-notes"><summary>Trainer / facilitator notes</summary><ul>{module.trainerNotes.map(x => <li key={x}>{x}</li>)}</ul><p><strong>Remediation:</strong> {module.remediation}</p><p><strong>Extension:</strong> {module.extension}</p></details>
    </section>}

    <div className="module-bottom-navigation">
      <div>{step > 1 && <Link className="module-nav-button secondary" href={moduleStepHref(module.code, language, step - 1)}>← Previous section</Link>}</div>
      <div className="module-progress-label">{step} / 7</div>
      <div>{step < 7 && <Link className="module-nav-button" href={moduleStepHref(module.code, language, step + 1)}>Next section →</Link>}</div>
    </div>

    <footer className="module-footer-links">
      <Link href={localizeHref("/", language)}>GreenSkills Home</Link>
      <Link href={localizeHref(program.href, language)}>Back to {program.label} curriculum</Link>
      <Link href={localizeHref("/learner", language)}>Learner Space</Link>
    </footer>
  </main>;
}
