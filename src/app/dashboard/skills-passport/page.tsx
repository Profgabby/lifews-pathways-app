import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function SkillsPassportWorkspace() {
  const supabase = await createSupabaseServerClient();
  const [{ data: passports }, { data: participants }, { data: enrollments }, { data: programs }, { data: subprograms }] = await Promise.all([
    supabase.from("skills_passports").select("id,participant_id,passport_code,knowledge_score,practical_score,data_digital_score,safety_score,enterprise_employability_score,leadership_score,verified_field_hours,status,issued_at,updated_at").order("updated_at", { ascending: false }).limit(200),
    supabase.from("participants").select("id,participant_code,preferred_name,band,active").order("preferred_name").limit(300),
    supabase.from("greenskills_enrollments").select("participant_id,program_id,subprogram_id,status,started_at").in("status", ["APPLIED","ACTIVE","PAUSED"]),
    supabase.from("greenskills_programs").select("id,name"),
    supabase.from("greenskills_subprograms").select("id,code,name"),
  ]);

  const participantById = new Map((participants ?? []).map((p) => [p.id, p]));
  const programById = new Map((programs ?? []).map((p) => [p.id, p.name]));
  const subprogramById = new Map((subprograms ?? []).map((p) => [p.id, `${p.code} · ${p.name}`]));
  const enrollmentByParticipant = new Map((enrollments ?? []).map((e) => [e.participant_id, e]));

  return <main className="main">
    <div className="topbar"><div><div className="eyebrow">GreenSkills Core Operations</div><h1>Skills Passport</h1><p className="subtitle">A cross-program record of competence, verified FieldWorks hours and progression evidence.</p></div><Link className="status-pill" href="/dashboard">Dashboard</Link></div>

    <section className="grid metrics">
      <div className="card"><div className="metric-label">Passports</div><div className="metric-value">{(passports ?? []).length}</div></div>
      <div className="card"><div className="metric-label">Active enrollments represented</div><div className="metric-value">{new Set((passports ?? []).map((p) => enrollmentByParticipant.has(p.participant_id) ? p.participant_id : null).filter(Boolean)).size}</div></div>
      <div className="card"><div className="metric-label">Verified field hours</div><div className="metric-value">{(passports ?? []).reduce((sum, p) => sum + Number(p.verified_field_hours ?? 0), 0).toFixed(1)}</div></div>
      <div className="card"><div className="metric-label">Status model</div><div className="metric-value" style={{ fontSize: "1.05rem" }}>ACTIVE / PAUSED / ARCHIVED</div></div>
    </section>

    <section className="card" style={{ marginTop: 20 }}><div className="eyebrow">Unified passport register</div><h2>Participant competency profiles</h2>
      <div style={{ overflowX: "auto" }}><table><thead><tr><th>Participant</th><th>Program</th><th>Subprogram</th><th>K</th><th>P</th><th>D</th><th>S</th><th>E</th><th>L</th><th>Field hours</th><th>Status</th></tr></thead><tbody>
        {(passports ?? []).map((p) => { const person = participantById.get(p.participant_id); const enrollment = enrollmentByParticipant.get(p.participant_id); return <tr key={p.id}><td><strong>{person?.preferred_name ?? p.passport_code}</strong><div className="subtitle">{p.passport_code}{person?.participant_code ? ` · ${person.participant_code}` : ""}</div></td><td>{enrollment ? programById.get(enrollment.program_id) ?? "—" : "—"}</td><td>{enrollment?.subprogram_id ? subprogramById.get(enrollment.subprogram_id) ?? "—" : "—"}</td><td>{Number(p.knowledge_score).toFixed(0)}</td><td>{Number(p.practical_score).toFixed(0)}</td><td>{Number(p.data_digital_score).toFixed(0)}</td><td>{Number(p.safety_score).toFixed(0)}</td><td>{Number(p.enterprise_employability_score).toFixed(0)}</td><td>{Number(p.leadership_score).toFixed(0)}</td><td>{Number(p.verified_field_hours).toFixed(1)}</td><td>{p.status}</td></tr>; })}
      </tbody></table></div>
      {(passports ?? []).length === 0 ? <p className="subtitle">No unified Skills Passports have been issued yet. A passport is created automatically when a participant receives a GreenSkills enrollment.</p> : null}
    </section>

    <div className="card" style={{ marginTop: 16 }}><strong>Legacy continuity</strong><p className="subtitle">Existing Pathways goals, projects, badges and competency evidence remain available from participant profiles. This GreenSkills Passport is the cross-program summary layer rather than a destructive replacement.</p><Link href="/dashboard/participants">Open participant register →</Link></div>
  </main>;
}
