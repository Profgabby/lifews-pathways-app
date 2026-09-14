"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { GreenTechModuleAssessment } from "@/components/greentech-module-assessment";
import { GreenTechStaffReview } from "@/components/greentech-staff-review";
import type { GreenTechModule, GreenTechTier } from "@/lib/greentech";

type Props = { tier: GreenTechTier; module: GreenTechModule };
type Notice = { kind: "ok" | "error"; text: string } | null;

const stages = ["Learning Section 1", "Learning Section 2", "Learning Section 3", "Learning Section 4", "Learning Section 5", "Questions & Assessment", "DIY & Practical Task"];

export function GreenTechModuleWorkspaceV2({ module }: Props) {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [stage, setStage] = useState(1);
  const [done, setDone] = useState<number[]>([]);
  const [notice, setNotice] = useState<Notice>(null);
  const [token, setToken] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [learnerName, setLearnerName] = useState("");
  const [staff, setStaff] = useState(false);
  const [responses, setResponses] = useState<Record<number, string>>({});

  useEffect(() => {
    const t = sessionStorage.getItem("lifews_learner_session") || "";
    setToken(t);
    supabase.auth.getUser().then(({ data }) => setStaff(Boolean(data.user)));
  }, [supabase]);
  useEffect(() => { if (token) void loadProgress(token); }, [token]);

  async function learnerLogin(e: FormEvent) {
    e.preventDefault();
    const { data, error } = await supabase.rpc("start_learner_session", { p_access_code: accessCode });
    if (error || !data) { setNotice({ kind: "error", text: "Access code was not accepted." }); return; }
    sessionStorage.setItem("lifews_learner_session", data);
    setToken(data); setAccessCode(""); setNotice({ kind: "ok", text: "Learner workspace unlocked." });
  }

  async function loadProgress(t = token) {
    const [{ data: progress }, { data: session }] = await Promise.all([
      supabase.rpc("get_greentech_learner_progress", { p_session_token: t, p_lesson_code: module.code }),
      supabase.rpc("get_learner_session", { p_session_token: t }),
    ]);
    setDone((progress || []).filter((x: any) => x.completed).map((x: any) => x.section_no));
    if (session?.[0]?.preferred_name) setLearnerName(session[0].preferred_name);
  }

  async function submitSection(n: number, type: string, payload: any) {
    if (!token) { setNotice({ kind: "error", text: "Enter your learner access code before submitting." }); return false; }
    const { error } = await supabase.rpc("submit_greentech_module_section", { p_session_token: token, p_lesson_code: module.code, p_section_no: n, p_submission_type: type, p_payload: payload });
    if (error) { setNotice({ kind: "error", text: error.message }); return false; }
    setDone(current => Array.from(new Set([...current, n])));
    setNotice({ kind: "ok", text: `${stages[n - 1]} submitted to LIFEWS.` });
    return true;
  }

  async function submitRecord(type: string, payload: any) {
    if (!token) { setNotice({ kind: "error", text: "Learner access is required." }); return false; }
    const { error } = await supabase.rpc("submit_greentech_learner_record", { p_session_token: token, p_lesson_code: module.code, p_record_type: type, p_payload: payload });
    if (error) { setNotice({ kind: "error", text: error.message }); return false; }
    return true;
  }

  const learning = [
    { title: "Understand the system", body: module.competency, prompt: `Explain the central technical idea in ${module.title} and its role in an integrated food-energy-water system.` },
    { title: "Explore relationships and safety", body: `Field focus: ${module.fieldFocus}. Identify components, interfaces, hazards and operating boundaries.`, prompt: "Describe one important relationship between components, one hazard and one control." },
    { title: "Apply, measure and calculate", body: "Use traceable observations, correct units, calculations and acceptance checks. Estimated values must be identified as estimates.", prompt: "List the measurements, units, calculation steps and acceptance checks you would use." },
    { title: "Data, digital and AI", body: module.aiFocus, prompt: "Describe how digital or AI tools can support this module, what must be independently verified, and what decision remains yours." },
    { title: "Enterprise, field and reflection", body: `Enterprise focus: ${module.enterpriseFocus}.`, prompt: "Define a customer/community problem, a service within your competence, evidence of quality and one ethical or professional requirement." },
  ];

  return <div style={{ display: "grid", gap: 20 }}>
    <section style={card}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>{stages.map((label, i) => <button key={label} onClick={() => setStage(i + 1)} style={{ border: "1px solid #c8d8cd", borderRadius: 999, padding: "9px 12px", cursor: "pointer", background: stage === i + 1 ? "#006b3c" : done.includes(i + 1) ? "#e7f4ec" : "#fff", color: stage === i + 1 ? "white" : "#173c2c" }}>{done.includes(i + 1) ? "✓ " : ""}{i + 1}. {label}</button>)}</div>
      <div style={{ height: 8, background: "#edf2ee", borderRadius: 9, overflow: "hidden" }}><div style={{ height: "100%", width: `${done.length / 7 * 100}%`, background: "#006b3c" }} /></div>
      <p style={{ marginBottom: 0 }}><strong>{done.length}/7 stages recorded</strong>{learnerName ? ` • ${learnerName}` : ""}</p>
    </section>

    {!token && <form onSubmit={learnerLogin} style={{ background: "#fff8df", border: "1px solid #ecd78a", borderRadius: 18, padding: 18 }}><h3>Learner submission access</h3><p>Use the LIFEWS learner access code issued by authorized staff.</p><input value={accessCode} onChange={e => setAccessCode(e.target.value)} required placeholder="Learner access code" style={input} /><button style={primary}>Unlock submissions</button></form>}
    {notice && <div style={{ padding: 12, borderRadius: 10, background: notice.kind === "ok" ? "#e7f4ec" : "#fde9e7" }}>{notice.text}</div>}

    {stage <= 5 && <section style={card}><div style={eyebrow}>LEARNING SECTION {stage}</div><h2>{learning[stage - 1].title}</h2><p>{learning[stage - 1].body}</p><strong>Learner response</strong><p>{learning[stage - 1].prompt}</p><textarea rows={7} style={textarea} value={responses[stage] || ""} onChange={e => setResponses(current => ({ ...current, [stage]: e.target.value }))} /><button style={primary} disabled={(responses[stage] || "").trim().length < 20} onClick={async () => { if (await submitSection(stage, "LEARNING_RESPONSE", { response: responses[stage] })) setStage(stage + 1); }}>Submit section & continue</button></section>}

    {stage === 6 && <GreenTechModuleAssessment module={module} onSubmit={async payload => { if (await submitSection(6, "ASSESSMENT_RESPONSE", payload)) { setNotice({ kind: "ok", text: `Assessment submitted. MCQ self-check: ${payload.mcq_score}%. Theory responses await staff marking.` }); setStage(7); } }} />}
    {stage === 7 && <Practical module={module} submitSection={submitSection} submitRecord={submitRecord} />}

    {staff && <GreenTechStaffReview module={module} supabase={supabase} onNotice={setNotice} />}
  </div>;
}

function Practical({ module, submitSection, submitRecord }: { module: GreenTechModule; submitSection: any; submitRecord: any }) {
  const [procedure, setProcedure] = useState("");
  const [measurements, setMeasurements] = useState("");
  const [evidence, setEvidence] = useState("");
  const [ai, setAi] = useState({ task: "", input_summary: "", ai_use: "", output_summary: "", verification_method: "", errors_or_limitations: "", correction: "", final_decision: "" });
  const [enterprise, setEnterprise] = useState({ customer_problem: "", service_scope: "", customer_price: "" });

  return <section style={card}><div style={eyebrow}>DIY • PRACTICAL • EVIDENCE</div><h2>{module.diy}</h2><p><strong>Safety gate:</strong> follow trainer instructions, manufacturer requirements and applicable procedures. AI never overrides safety controls.</p>
    <label>Procedure / work completed<textarea rows={5} style={textarea} value={procedure} onChange={e => setProcedure(e.target.value)} /></label>
    <label>Measurements, calculations and result<textarea rows={5} style={textarea} value={measurements} onChange={e => setMeasurements(e.target.value)} /></label>
    <label>HTTPS evidence link<input style={input} value={evidence} onChange={e => setEvidence(e.target.value)} /></label>
    <h3>AI Work Log</h3>{Object.keys(ai).map(key => <label key={key} style={{ display: "block", marginBottom: 8 }}>{key.replaceAll("_", " ")}<textarea rows={2} style={textarea} value={(ai as any)[key]} onChange={e => setAi(current => ({ ...current, [key]: e.target.value }))} /></label>)}
    <h3>Enterprise task</h3><label>Customer/community problem<textarea rows={3} style={textarea} value={enterprise.customer_problem} onChange={e => setEnterprise(current => ({ ...current, customer_problem: e.target.value }))} /></label><label>Technical service scope<textarea rows={3} style={textarea} value={enterprise.service_scope} onChange={e => setEnterprise(current => ({ ...current, service_scope: e.target.value }))} /></label><label>Proposed customer price<input type="number" min="0" style={input} value={enterprise.customer_price} onChange={e => setEnterprise(current => ({ ...current, customer_price: e.target.value }))} /></label>
    <button style={primary} disabled={procedure.length < 20 || measurements.length < 10} onClick={async () => { const ok = await submitSection(7, "DIY_RESPONSE", { procedure, measurements, evidence }); if (!ok) return; if (evidence) await submitRecord("FIELDWORK", { evidence_type: "PRACTICAL", title: `${module.code} practical evidence`, description: `${procedure}\n\nMeasurements: ${measurements}`, file_url: evidence }); if (ai.task && ai.final_decision) await submitRecord("AI_LOG", { ...ai, ai_layer: 4, privacy_check: true, independent_reasoning_verified: true }); if (enterprise.customer_problem && enterprise.service_scope) await submitRecord("ENTERPRISE", enterprise); }}>Submit practical package</button>
  </section>;
}

const card: React.CSSProperties = { background: "white", border: "1px solid #dce7df", borderRadius: 18, padding: 22 };
const input: React.CSSProperties = { width: "100%", boxSizing: "border-box", padding: "10px 12px", border: "1px solid #b9c9bf", borderRadius: 9, margin: "6px 0 12px" };
const textarea: React.CSSProperties = { ...input, resize: "vertical" };
const primary: React.CSSProperties = { background: "#006b3c", color: "white", border: 0, borderRadius: 9, padding: "11px 16px", fontWeight: 700, cursor: "pointer" };
const eyebrow: React.CSSProperties = { fontSize: 12, fontWeight: 800, letterSpacing: ".08em", color: "#006b3c" };
