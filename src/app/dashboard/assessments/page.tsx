import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AssessmentsWorkspace() {
  const supabase = await createSupabaseServerClient();
  const [{ data: assessments }, { data: participants }, { data: lessons }] = await Promise.all([
    supabase.from("greenskills_lesson_assessments").select("id,participant_id,lesson_id,knowledge_score,practical_rating,data_digital_rating,safety_rating,enterprise_employability_rating,leadership_rating,theory_score,mcq_score,evidence_note,evidence_url,status,assessed_at").order("assessed_at", { ascending: false }).limit(200),
    supabase.from("participants").select("id,participant_code,preferred_name").limit(300),
    supabase.from("greenskills_lessons").select("id,lesson_code,title,subprogram_id").order("lesson_code"),
  ]);

  const participantById = new Map((participants ?? []).map((p) => [p.id, p]));
  const lessonById = new Map((lessons ?? []).map((l) => [l.id, l]));
  const verified = (assessments ?? []).filter((a) => a.status === "VERIFIED").length;
  const remediation = (assessments ?? []).filter((a) => a.status === "REQUIRES_REMEDIATION").length;

  return <main className="main">
    <div className="topbar"><div><div className="eyebrow">GreenSkills Core Operations</div><h1>Assessments</h1><p className="subtitle">Lesson-level evidence across Knowledge, Practical Skills, Data & Digital, Safety, Enterprise & Employability, and Leadership & Life Skills.</p></div><Link className="status-pill" href="/dashboard">Dashboard</Link></div>
    <section className="grid metrics">
      <div className="card"><div className="metric-label">Assessment records</div><div className="metric-value">{(assessments ?? []).length}</div></div>
      <div className="card"><div className="metric-label">Verified</div><div className="metric-value">{verified}</div></div>
      <div className="card"><div className="metric-label">Requires remediation</div><div className="metric-value">{remediation}</div></div>
      <div className="card"><div className="metric-label">Competency scale</div><div className="metric-value" style={{ fontSize: "1.05rem" }}>0–5 practical ratings</div></div>
    </section>
    <section className="card" style={{ marginTop: 20 }}><div className="eyebrow">Evidence register</div><h2>GreenSkills lesson assessments</h2>
      <div style={{ overflowX: "auto" }}><table><thead><tr><th>Participant</th><th>Lesson</th><th>MCQ</th><th>Theory</th><th>K</th><th>P</th><th>D</th><th>S</th><th>E</th><th>L</th><th>Status</th></tr></thead><tbody>
        {(assessments ?? []).map((a) => { const person = participantById.get(a.participant_id); const lesson = lessonById.get(a.lesson_id); return <tr key={a.id}><td>{person?.preferred_name ?? a.participant_id}<div className="subtitle">{person?.participant_code ?? ""}</div></td><td><strong>{lesson?.lesson_code ?? "—"}</strong><div className="subtitle">{lesson?.title ?? ""}</div></td><td>{a.mcq_score ?? "—"}</td><td>{a.theory_score ?? "—"}</td><td>{a.knowledge_score ?? "—"}</td><td>{a.practical_rating ?? "—"}</td><td>{a.data_digital_rating ?? "—"}</td><td>{a.safety_rating ?? "—"}</td><td>{a.enterprise_employability_rating ?? "—"}</td><td>{a.leadership_rating ?? "—"}</td><td>{a.status}</td></tr>; })}
      </tbody></table></div>
      {(assessments ?? []).length === 0 ? <p className="subtitle">No GreenSkills lesson assessments have been recorded yet.</p> : null}
    </section>
    <div className="card" style={{ marginTop: 16 }}><strong>Assessment standard</strong><p className="subtitle">The new GreenSkills layer supports 8 MCQs, 5 theory/comprehension questions, practical evidence and six-domain competency ratings. Existing Pathways learning evidence remains available in the legacy Learning Evidence module.</p><Link href="/dashboard/learning">Open legacy learning evidence →</Link></div>
  </main>;
}
