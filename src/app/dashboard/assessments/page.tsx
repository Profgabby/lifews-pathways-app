import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { reviewLearnerEvidence } from "./actions";

export const dynamic = "force-dynamic";

export default async function AssessmentsWorkspace() {
  const supabase = await createSupabaseServerClient();
  const [{ data: assessments }, { data: participants }, { data: lessons }, { data: submissions }] = await Promise.all([
    supabase.from("greenskills_lesson_assessments").select("id,participant_id,lesson_id,knowledge_score,practical_rating,data_digital_rating,safety_rating,enterprise_employability_rating,leadership_rating,theory_score,mcq_score,evidence_note,evidence_url,status,assessed_at").order("assessed_at", { ascending: false }).limit(200),
    supabase.from("participants").select("id,participant_code,preferred_name").limit(300),
    supabase.from("greenskills_lessons").select("id,lesson_code,title,subprogram_id").order("lesson_code"),
    supabase.from("learner_evidence_submissions").select("id,participant_id,lesson_id,learner_note,status,file_count,submitted_at,reviewed_at,review_note").order("submitted_at", { ascending: false }).limit(100),
  ]);

  const submissionIds = (submissions ?? []).map(s => s.id);
  const { data: evidenceFiles } = submissionIds.length
    ? await supabase.from("learner_evidence_files").select("id,submission_id,storage_path,original_name,mime_type,byte_size").in("submission_id", submissionIds)
    : { data: [] as { id:string; submission_id:string; storage_path:string; original_name:string; mime_type:string; byte_size:number }[] };

  const admin = createSupabaseAdminClient();
  const signedUrlByFile = new Map<string,string>();
  await Promise.all((evidenceFiles ?? []).map(async file => {
    const { data } = await admin.storage.from("learner-evidence").createSignedUrl(file.storage_path, 60 * 30);
    if (data?.signedUrl) signedUrlByFile.set(file.id, data.signedUrl);
  }));

  const participantById = new Map((participants ?? []).map((p) => [p.id, p]));
  const lessonById = new Map((lessons ?? []).map((l) => [l.id, l]));
  const filesBySubmission = new Map<string, typeof evidenceFiles>();
  for (const file of evidenceFiles ?? []) {
    const existing = filesBySubmission.get(file.submission_id) ?? [];
    existing.push(file);
    filesBySubmission.set(file.submission_id, existing);
  }

  const verified = (assessments ?? []).filter((a) => a.status === "VERIFIED").length;
  const remediation = (assessments ?? []).filter((a) => a.status === "REQUIRES_REMEDIATION").length;
  const pendingEvidence = (submissions ?? []).filter(s => s.status === "PENDING");

  return <main className="main">
    <div className="topbar"><div><div className="eyebrow">GreenSkills Core Operations</div><h1>Assessments</h1><p className="subtitle">Review learner evidence, apply the 0–5 competency scale, and verify lesson competence into the Skills Passport.</p></div><Link className="status-pill" href="/dashboard">Dashboard</Link></div>
    <section className="grid metrics">
      <div className="card"><div className="metric-label">Assessment records</div><div className="metric-value">{(assessments ?? []).length}</div></div>
      <div className="card"><div className="metric-label">Pending evidence</div><div className="metric-value">{pendingEvidence.length}</div></div>
      <div className="card"><div className="metric-label">Verified</div><div className="metric-value">{verified}</div></div>
      <div className="card"><div className="metric-label">Requires remediation</div><div className="metric-value">{remediation}</div></div>
    </section>

    <section className="card" style={{ marginTop: 20 }}>
      <div className="eyebrow">Facilitator queue</div><h2>Practical evidence awaiting review</h2>
      <p className="subtitle">Rating scale: 0 not attempted · 1 full assistance · 2 substantial guidance · 3 limited guidance · 4 independent to standard · 5 independent and able to explain/assist.</p>
      <div style={{ display:"grid", gap:16, marginTop:16 }}>
        {pendingEvidence.map(submission => {
          const person = participantById.get(submission.participant_id);
          const lesson = lessonById.get(submission.lesson_id);
          const files = filesBySubmission.get(submission.id) ?? [];
          return <article key={submission.id} style={{ border:"1px solid var(--border)", borderRadius:14, padding:18 }}>
            <div style={{ display:"flex", justifyContent:"space-between", gap:16, flexWrap:"wrap" }}><div><strong>{person?.preferred_name ?? submission.participant_id}</strong><div className="subtitle">{person?.participant_code ?? ""}</div></div><div><strong>{lesson?.lesson_code ?? "—"} · {lesson?.title ?? ""}</strong><div className="subtitle">{submission.file_count} evidence file{submission.file_count === 1 ? "" : "s"}</div></div></div>
            {submission.learner_note ? <p><strong>Learner note:</strong> {submission.learner_note}</p> : null}
            <div style={{ display:"flex", flexWrap:"wrap", gap:8, margin:"12px 0" }}>{files.map(file => { const url=signedUrlByFile.get(file.id); return url ? <a key={file.id} className="status-pill" href={url} target="_blank" rel="noreferrer">{file.original_name}</a> : <span key={file.id} className="status-pill">{file.original_name}</span>; })}</div>
            <form action={reviewLearnerEvidence} style={{ display:"grid", gap:12 }}>
              <input type="hidden" name="submission_id" value={submission.id}/>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))", gap:10 }}>
                <label>Knowledge %<input name="knowledge_score" type="number" min="0" max="100" step="1" style={{ width:"100%" }}/></label>
                <label>Practical 0–5<input name="practical_rating" type="number" min="0" max="5" step="1" style={{ width:"100%" }}/></label>
                <label>Data & Digital 0–5<input name="data_digital_rating" type="number" min="0" max="5" step="1" style={{ width:"100%" }}/></label>
                <label>Safety 0–5<input name="safety_rating" type="number" min="0" max="5" step="1" style={{ width:"100%" }}/></label>
                <label>Enterprise 0–5<input name="enterprise_rating" type="number" min="0" max="5" step="1" style={{ width:"100%" }}/></label>
                <label>Leadership 0–5<input name="leadership_rating" type="number" min="0" max="5" step="1" style={{ width:"100%" }}/></label>
              </div>
              <label>Facilitator note<textarea name="review_note" rows={3} style={{ width:"100%" }} placeholder="Record strengths, evidence gaps, remediation or verification notes."/></label>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                <button className="primary-action" name="decision" value="VERIFIED" type="submit">Verify competence</button>
                <button className="status-pill" name="decision" value="REQUIRES_REMEDIATION" type="submit">Require remediation</button>
                <button className="status-pill" name="decision" value="REJECTED" type="submit">Reject evidence</button>
              </div>
            </form>
          </article>;
        })}
        {pendingEvidence.length === 0 ? <p className="subtitle">No learner practical evidence is currently awaiting review.</p> : null}
      </div>
    </section>

    <section className="card" style={{ marginTop: 20 }}><div className="eyebrow">Evidence register</div><h2>GreenSkills lesson assessments</h2>
      <div style={{ overflowX: "auto" }}><table><thead><tr><th>Participant</th><th>Lesson</th><th>MCQ</th><th>Theory</th><th>K</th><th>P</th><th>D</th><th>S</th><th>E</th><th>L</th><th>Status</th></tr></thead><tbody>
        {(assessments ?? []).map((a) => { const person = participantById.get(a.participant_id); const lesson = lessonById.get(a.lesson_id); return <tr key={a.id}><td>{person?.preferred_name ?? a.participant_id}<div className="subtitle">{person?.participant_code ?? ""}</div></td><td><strong>{lesson?.lesson_code ?? "—"}</strong><div className="subtitle">{lesson?.title ?? ""}</div></td><td>{a.mcq_score ?? "—"}</td><td>{a.theory_score ?? "—"}</td><td>{a.knowledge_score ?? "—"}</td><td>{a.practical_rating ?? "—"}</td><td>{a.data_digital_rating ?? "—"}</td><td>{a.safety_rating ?? "—"}</td><td>{a.enterprise_employability_rating ?? "—"}</td><td>{a.leadership_rating ?? "—"}</td><td>{a.status}</td></tr>; })}
      </tbody></table></div>
      {(assessments ?? []).length === 0 ? <p className="subtitle">No GreenSkills lesson assessments have been recorded yet.</p> : null}
    </section>
    <div className="card" style={{ marginTop: 16 }}><strong>Completion rule</strong><p className="subtitle">Opening all seven stages does not complete a module. A module becomes COMPLETED only when facilitator-reviewed practical evidence is VERIFIED. Credential eligibility is calculated separately after all active lessons in the learner’s subprogram are verified; credentials are not auto-issued.</p><Link href="/dashboard/credentials">Open credentials workspace →</Link></div>
  </main>;
}
