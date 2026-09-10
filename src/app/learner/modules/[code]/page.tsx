import Link from "next/link";
import { notFound } from "next/navigation";
import { LanguageMenu } from "@/components/language-menu";
import { localizeHref, normalizeLanguage } from "@/lib/i18n6";
import { getPF01 } from "@/lib/modules/pathways-foundation/pf-01";
import { getPF02 } from "@/lib/modules/pathways-foundation/pf-02";
import { getPF03 } from "@/lib/modules/pathways-foundation/pf-03";

export default async function ModulePage({ params, searchParams }: { params: Promise<{ code: string }>; searchParams?: Promise<{ lang?: string }> }) {
 const { code }=await params; const query=searchParams?await searchParams:{}; const language=normalizeLanguage(query.lang); const key=code.toUpperCase();
 const module=key==="PF-01"?getPF01(language):key==="PF-02"?getPF02(language):key==="PF-03"?getPF03(language):null; if(!module) notFound(); const rtl=language==="ar";
 return <main className="learner-page" dir={rtl?"rtl":"ltr"} lang={language}>
  <header className="learner-header"><Link className="learner-brand" href={localizeHref("/pathways",language)}><img src="/lifews-mark.svg" alt="LIFEWS logo"/><div><strong>LIFEWS Pathways</strong><span>{module.level}</span></div></Link><div className="learner-header-actions"><LanguageMenu currentLanguage={language}/><Link className="text-link" href={localizeHref("/learner",language)}>Learner space</Link></div></header>
  <section className="learner-hero"><div className="eyebrow">{module.code} · {module.level}</div><h1>{module.title}</h1><p>{module.bigQuestion}</p><div className="learner-mode-note">{module.age} · {module.duration} · FieldWorks: {module.fieldworkHours} hours</div></section>
  <section className="card" style={{marginBottom:24}}><div className="eyebrow">Why this matters</div><p>{module.whyItMatters}</p><h2>Learning outcomes</h2><ul>{module.outcomes.map(x=><li key={x}>{x}</li>)}</ul><h3>Vocabulary</h3><p>{module.vocabulary.join(" · ")}</p><h3>Materials</h3><ul>{module.materials.map(x=><li key={x}>{x}</li>)}</ul><h3>Safety and inclusion</h3><ul>{module.safety.map(x=><li key={x}>{x}</li>)}</ul></section>
  <section><div className="eyebrow">Guided lessons</div><h2>{module.lessons.length} lessons with practical work, AI literacy and enterprise foundations</h2><div style={{display:"grid",gap:18}}>{module.lessons.map((lesson,index)=><article className="card" key={lesson.id}><div className="eyebrow">Lesson {index+1} · {lesson.id}</div><h2>{lesson.title}</h2><p><strong>Objective:</strong> {lesson.objective}</p><h3>Learn</h3><ul>{lesson.teaching.map(x=><li key={x}>{x}</li>)}</ul><p><strong>Activity:</strong> {lesson.activity}</p><p><strong>DIY / practical:</strong> {lesson.diy}</p><p><strong>AI:</strong> {lesson.aiLayer}</p><p><strong>Entrepreneurship:</strong> {lesson.enterprise}</p><h3>Lesson quiz</h3>{lesson.quiz.map((q,qi)=><div key={q.question} style={{marginBottom:12}}><strong>{qi+1}. {q.question}</strong><ol type="A">{q.options.map(o=><li key={o}>{o}</li>)}</ol></div>)}</article>)}</div></section>
  <section className="card" style={{marginTop:24}}><div className="eyebrow">End-of-module assessment</div><h2>Knowledge, application and practical evidence</h2><h3>8 MCQs</h3>{module.finalAssessment.mcq.map((q,i)=><div key={q.question} style={{marginBottom:12}}><strong>{i+1}. {q.question}</strong><ol type="A">{q.options.map(o=><li key={o}>{o}</li>)}</ol></div>)}<h3>5 theory / application questions</h3><ol>{module.finalAssessment.theory.map(q=><li key={q}>{q}</li>)}</ol><h3>Practical assessment</h3><p>{module.finalAssessment.practical}</p></section>
  <section className="card" style={{marginTop:24}}><h2>Evidence & Skills Passport</h2><h3>Required evidence</h3><ul>{module.evidence.map(x=><li key={x}>{x}</li>)}</ul><h3>K / P / D / S / E / L mapping</h3><ul>{module.passport.map(x=><li key={x}>{x}</li>)}</ul><h3>Trainer notes</h3><ul>{module.trainerNotes.map(x=><li key={x}>{x}</li>)}</ul><p><strong>Remediation:</strong> {module.remediation}</p><p><strong>Extension:</strong> {module.extension}</p></section>
  <section className="card" style={{marginTop:24}}><h2>Image / illustration prompts</h2><ol>{module.imagePrompts.map(x=><li key={x}>{x}</li>)}</ol></section>
 </main>;
}
