import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function FieldWorksWorkspace() {
  const supabase = await createSupabaseServerClient();
  const [{ data: placements }, { data: evidence }, { data: participants }, { data: programs }, { data: subprograms }] = await Promise.all([
    supabase.from("fieldwork_placements").select("id,participant_id,program_id,subprogram_id,site_type,site_name,supervisor_name,start_date,end_date,required_hours,verified_hours,status,created_at").order("created_at", { ascending: false }).limit(200),
    supabase.from("fieldwork_evidence").select("id,placement_id,participant_id,lesson_id,evidence_type,title,description,file_url,verification_status,verified_at,created_at").order("created_at", { ascending: false }).limit(200),
    supabase.from("participants").select("id,participant_code,preferred_name").limit(300),
    supabase.from("greenskills_programs").select("id,name"),
    supabase.from("greenskills_subprograms").select("id,code,name"),
  ]);

  const participantById = new Map((participants ?? []).map((p) => [p.id, p]));
  const programById = new Map((programs ?? []).map((p) => [p.id, p.name]));
  const subprogramById = new Map((subprograms ?? []).map((p) => [p.id, `${p.code} · ${p.name}`]));
  const totalVerifiedHours = (placements ?? []).reduce((sum, p) => sum + Number(p.verified_hours ?? 0), 0);
  const activePlacements = (placements ?? []).filter((p) => p.status === "ACTIVE").length;
  const verifiedEvidence = (evidence ?? []).filter((e) => e.verification_status === "VERIFIED").length;

  return <main className="main">
    <div className="topbar"><div><div className="eyebrow">GreenSkills Core Operations</div><h1>FieldWorks</h1><p className="subtitle">Shared practical-learning layer for placements, supervision, verified hours and portfolio evidence.</p></div><Link className="status-pill" href="/dashboard">Dashboard</Link></div>
    <section className="grid metrics">
      <div className="card"><div className="metric-label">Placements</div><div className="metric-value">{(placements ?? []).length}</div></div>
      <div className="card"><div className="metric-label">Active placements</div><div className="metric-value">{activePlacements}</div></div>
      <div className="card"><div className="metric-label">Verified hours</div><div className="metric-value">{totalVerifiedHours.toFixed(1)}</div></div>
      <div className="card"><div className="metric-label">Verified evidence</div><div className="metric-value">{verifiedEvidence}</div></div>
    </section>

    <section className="card" style={{ marginTop: 20 }}><div className="eyebrow">Placement register</div><h2>Participant FieldWorks placements</h2>
      <div style={{ overflowX: "auto" }}><table><thead><tr><th>Participant</th><th>Program</th><th>Subprogram</th><th>Site</th><th>Supervisor</th><th>Dates</th><th>Hours</th><th>Status</th></tr></thead><tbody>
        {(placements ?? []).map((p) => { const person = participantById.get(p.participant_id); return <tr key={p.id}><td>{person?.preferred_name ?? p.participant_id}<div className="subtitle">{person?.participant_code ?? ""}</div></td><td>{p.program_id ? programById.get(p.program_id) ?? "—" : "—"}</td><td>{p.subprogram_id ? subprogramById.get(p.subprogram_id) ?? "—" : "—"}</td><td><strong>{p.site_name}</strong><div className="subtitle">{p.site_type}</div></td><td>{p.supervisor_name ?? "—"}</td><td>{p.start_date ?? "—"} → {p.end_date ?? "—"}</td><td>{Number(p.verified_hours).toFixed(1)} / {Number(p.required_hours).toFixed(1)}</td><td>{p.status}</td></tr>; })}
      </tbody></table></div>
      {(placements ?? []).length === 0 ? <p className="subtitle">No FieldWorks placements have been recorded yet.</p> : null}
    </section>

    <section className="card" style={{ marginTop: 16 }}><div className="eyebrow">Evidence queue</div><h2>Recent FieldWorks evidence</h2>
      {(evidence ?? []).map((e) => { const person = participantById.get(e.participant_id); return <div key={e.id} style={{ padding: "12px 0", borderTop: "1px solid var(--border)" }}><strong>{e.title}</strong><div className="subtitle">{person?.preferred_name ?? e.participant_id} · {e.evidence_type} · {e.verification_status}</div>{e.description ? <p>{e.description}</p> : null}</div>; })}
      {(evidence ?? []).length === 0 ? <p className="subtitle">No FieldWorks evidence has been submitted yet.</p> : null}
    </section>
  </main>;
}
