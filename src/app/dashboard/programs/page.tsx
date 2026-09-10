import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function ProgramsWorkspace() {
  const supabase = await createSupabaseServerClient();
  const [{ data: programs }, { data: subprograms }, { data: enrollments }, { data: participants }] = await Promise.all([
    supabase.from("greenskills_programs").select("id,slug,name,tagline,description,active").order("name"),
    supabase.from("greenskills_subprograms").select("id,program_id,slug,code,name,target_age_level,purpose,sequence_no,active").order("sequence_no"),
    supabase.from("greenskills_enrollments").select("id,participant_id,program_id,subprogram_id,cohort_label,status,started_at,completed_at,transition_destination").order("created_at", { ascending: false }).limit(100),
    supabase.from("participants").select("id,participant_code,preferred_name,band,active").order("preferred_name").limit(300),
  ]);

  const participantById = new Map((participants ?? []).map((p) => [p.id, p]));
  const programById = new Map((programs ?? []).map((p) => [p.id, p]));
  const subprogramById = new Map((subprograms ?? []).map((p) => [p.id, p]));

  return <main className="main">
    <div className="topbar"><div><div className="eyebrow">GreenSkills Core Operations</div><h1>Programs & Enrollment</h1><p className="subtitle">Cross-program placement and progression across Pathways, Kadara and GreenTech.</p></div><Link className="status-pill" href="/dashboard">Dashboard</Link></div>

    <div className="grid section-grid">
      {(programs ?? []).map((program) => <section className="card" key={program.id} style={{ borderLeft: "4px solid var(--green)" }}>
        <div className="eyebrow">{program.slug.toUpperCase()}</div><h2>{program.name}</h2><p>{program.tagline}</p><p className="subtitle">{program.description}</p>
        {(subprograms ?? []).filter((s) => s.program_id === program.id).map((s) => <div key={s.id} style={{ padding: "10px 0", borderTop: "1px solid var(--border)" }}><strong>{s.code} · {s.name}</strong><div className="subtitle">{s.target_age_level}</div><p>{s.purpose}</p></div>)}
      </section>)}
    </div>

    <section className="card" style={{ marginTop: 20 }}><div className="eyebrow">Recent enrollments</div><h2>Program membership & progression</h2>
      <div style={{ overflowX: "auto" }}><table><thead><tr><th>Participant</th><th>Program</th><th>Subprogram</th><th>Status</th><th>Started</th><th>Transition</th></tr></thead><tbody>
        {(enrollments ?? []).map((e) => { const person = participantById.get(e.participant_id); const program = programById.get(e.program_id); const sub = e.subprogram_id ? subprogramById.get(e.subprogram_id) : undefined; return <tr key={e.id}><td>{person?.preferred_name ?? e.participant_id}<div className="subtitle">{person?.participant_code ?? ""}</div></td><td>{program?.name ?? "—"}</td><td>{sub ? `${sub.code} · ${sub.name}` : "—"}</td><td>{e.status}</td><td>{e.started_at}</td><td>{e.transition_destination ?? "—"}</td></tr>; })}
      </tbody></table></div>
      {(enrollments ?? []).length === 0 ? <p className="subtitle">No GreenSkills enrollments have been recorded yet. Existing Pathways registrations remain preserved in the legacy enrollment workflow.</p> : null}
    </section>
  </main>;
}
