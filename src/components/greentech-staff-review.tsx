"use client";

import { useEffect, useState } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { GreenTechModule } from "@/lib/greentech";

const statusOptions = ["ND", "A", "C", "I"];
const ratingNames = ["knowledge", "practical", "data_digital", "safety", "enterprise", "leadership"] as const;

type Props = {
  module: GreenTechModule;
  supabase: SupabaseClient;
  onNotice: (message: { kind: "ok" | "error"; text: string }) => void;
};

export function GreenTechStaffReview({ module, supabase, onNotice }: Props) {
  const [participants, setParticipants] = useState<{ id: string; preferred_name: string }[]>([]);
  const [participant, setParticipant] = useState("");
  const [data, setData] = useState<any>(null);
  const [ratings, setRatings] = useState<any>({ knowledge: 3, practical: 3, data_digital: 3, safety: 3, enterprise: 3, leadership: 3, mcq: 0, theory: 0, note: "" });
  const [pr, setPr] = useState<any>({ preparation: "C", safety: "C", tools: "C", measurement: "C", execution: "C", testing: "C", troubleshooting: "C", documentation: "C", communication: "C", rating: 3, decision: "COMPETENT", notes: "" });

  useEffect(() => {
    supabase.rpc("get_greentech_staff_participants").then(({ data }) => setParticipants((data || []) as any));
  }, [supabase]);

  useEffect(() => { if (participant) void refresh(); }, [participant]);

  async function refresh() {
    const { data: workspace, error } = await supabase.rpc("get_greentech_staff_workspace", { p_participant_id: participant, p_lesson_code: module.code });
    if (error) onNotice({ kind: "error", text: error.message }); else setData(workspace);
  }

  async function savePractical() {
    const { error } = await supabase.rpc("record_greentech_practical_assessment", {
      p_participant_id: participant, p_lesson_code: module.code,
      p_safety_gate_passed: pr.safety !== "ND", p_critical_safety_failure: false,
      p_preparation: pr.preparation, p_safety: pr.safety, p_tools: pr.tools,
      p_measurement: pr.measurement, p_execution: pr.execution, p_testing: pr.testing,
      p_troubleshooting: pr.troubleshooting, p_documentation: pr.documentation,
      p_communication: pr.communication, p_competency_rating: pr.rating,
      p_decision: pr.decision, p_assessor_notes: pr.notes,
    });
    onNotice(error ? { kind: "error", text: error.message } : { kind: "ok", text: "Practical assessment recorded." });
    if (!error) void refresh();
  }

  async function savePassport() {
    const { error } = await supabase.rpc("record_greentech_staff_assessment", {
      p_participant_id: participant, p_lesson_code: module.code,
      p_mcq_score: Number(ratings.mcq), p_theory_score: Number(ratings.theory),
      p_knowledge: ratings.knowledge, p_practical: ratings.practical,
      p_data_digital: ratings.data_digital, p_safety: ratings.safety,
      p_enterprise: ratings.enterprise, p_leadership: ratings.leadership,
      p_evidence_note: ratings.note, p_status: "VERIFIED",
    });
    onNotice(error ? { kind: "error", text: error.message } : { kind: "ok", text: "Assessment verified and Skills Passport updated." });
    if (!error) void refresh();
  }

  const assessment = data?.submissions?.find((x: any) => x.section_no === 6 && x.submission_type === "ASSESSMENT_RESPONSE");

  return <section style={{ background: "#f4f8f5", border: "1px solid #bdd0c3", borderRadius: 18, padding: 18 }}>
    <h2>Staff review & verification</h2>
    <p>Review learner submissions, practical evidence, FieldWorks records and module-specific assessment responses before updating the verified Skills Passport.</p>
    <select value={participant} onChange={e => setParticipant(e.target.value)} style={input}><option value="">Select learner</option>{participants.map(p => <option key={p.id} value={p.id}>{p.preferred_name}</option>)}</select>
    {!participant ? null : <>
      <p><strong>Progress:</strong> {data?.progress?.filter((x: any) => x.completed).length || 0}/7 stages • AI logs {data?.ai_logs?.length || 0} • Enterprise {data?.enterprise?.length || 0} • FieldWorks {data?.fieldwork?.length || 0}</p>
      {data?.submissions?.map((x: any) => <details key={x.id} style={{ margin: "8px 0" }}><summary>Section {x.section_no} — {x.submission_type} — {x.status}</summary><pre style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>{JSON.stringify(x.payload, null, 2)}</pre></details>)}
      {assessment?.payload?.mcq_score != null && <p><strong>{assessment.payload.module_code || module.code} MCQ self-check:</strong> {assessment.payload.mcq_score}% • theory awaiting staff marking.</p>}

      <h3>Practical competency</h3>
      <div style={grid}>{["preparation", "safety", "tools", "measurement", "execution", "testing", "troubleshooting", "documentation", "communication"].map(key => <label key={key}>{key}<select style={input} value={pr[key]} onChange={e => setPr((current: any) => ({ ...current, [key]: e.target.value }))}>{statusOptions.map(status => <option key={status}>{status}</option>)}</select></label>)}</div>
      <label>Competency rating 0–5<input type="number" min="0" max="5" style={input} value={pr.rating} onChange={e => setPr((current: any) => ({ ...current, rating: Number(e.target.value) }))} /></label>
      <label>Decision<select style={input} value={pr.decision} onChange={e => setPr((current: any) => ({ ...current, decision: e.target.value }))}><option>COMPETENT</option><option>REMEDIATION_REQUIRED</option><option>REASSESSMENT_REQUIRED</option><option>IN_PROGRESS</option></select></label>
      <textarea style={textarea} rows={3} placeholder="Assessor notes" value={pr.notes} onChange={e => setPr((current: any) => ({ ...current, notes: e.target.value }))} />
      <button style={primary} onClick={savePractical}>Record practical assessment</button>

      <h3>Skills Passport verification</h3>
      <div style={grid}>{ratingNames.map(key => <label key={key}>{key.replace("_", " ")} 0–5<input type="number" min="0" max="5" style={input} value={ratings[key]} onChange={e => setRatings((current: any) => ({ ...current, [key]: Number(e.target.value) }))} /></label>)}</div>
      <label>MCQ score %<input type="number" min="0" max="100" style={input} value={ratings.mcq} onChange={e => setRatings((current: any) => ({ ...current, mcq: e.target.value }))} /></label>
      <label>Theory score %<input type="number" min="0" max="100" style={input} value={ratings.theory} onChange={e => setRatings((current: any) => ({ ...current, theory: e.target.value }))} /></label>
      <textarea style={textarea} rows={3} placeholder="Verification note" value={ratings.note} onChange={e => setRatings((current: any) => ({ ...current, note: e.target.value }))} />
      <button style={primary} onClick={savePassport}>Verify & update Skills Passport</button>
      {data?.passport && <p><strong>Current passport:</strong> K {data.passport.knowledge_score}% • P {data.passport.practical_score}% • D {data.passport.data_digital_score}% • S {data.passport.safety_score}% • E {data.passport.enterprise_employability_score}% • L {data.passport.leadership_score}%</p>}
      {data?.fieldwork?.map((f: any) => <div key={f.id} style={{ borderTop: "1px solid #d5e0d8", paddingTop: 8, marginTop: 8 }}><strong>{f.title}</strong> — {f.verification_status} <button onClick={async () => { await supabase.rpc("verify_greentech_fieldwork", { p_evidence_id: f.id, p_verified: true }); void refresh(); }}>Verify evidence</button></div>)}
    </>}
  </section>;
}

const grid: React.CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 8 };
const input: React.CSSProperties = { width: "100%", boxSizing: "border-box", padding: "10px 12px", border: "1px solid #b9c9bf", borderRadius: 9, margin: "6px 0 12px" };
const textarea: React.CSSProperties = { ...input, resize: "vertical" };
const primary: React.CSSProperties = { background: "#006b3c", color: "white", border: 0, borderRadius: 9, padding: "11px 16px", fontWeight: 700, cursor: "pointer" };
