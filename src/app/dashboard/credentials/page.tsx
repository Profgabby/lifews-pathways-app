import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function CredentialsWorkspace() {
  const supabase = await createSupabaseServerClient();
  const [{ data: credentials }, { data: participants }, { data: programs }, { data: subprograms }, { data: eligibility }] = await Promise.all([
    supabase.from("greenskills_credentials").select("id,participant_id,program_id,subprogram_id,credential_type,title,credential_code,qr_payload,issued_at,expires_at,file_url,verification_status").order("issued_at", { ascending: false }).limit(200),
    supabase.from("participants").select("id,participant_code,preferred_name").limit(300),
    supabase.from("greenskills_programs").select("id,name"),
    supabase.from("greenskills_subprograms").select("id,code,name"),
    supabase.from("greenskills_credential_eligibility").select("id,participant_id,subprogram_id,required_lessons,verified_lessons,eligible,eligibility_basis,last_verified_at,updated_at").order("updated_at", { ascending: false }).limit(300),
  ]);

  const participantById = new Map((participants ?? []).map((p) => [p.id, p]));
  const programById = new Map((programs ?? []).map((p) => [p.id, p.name]));
  const subprogramById = new Map((subprograms ?? []).map((p) => [p.id, `${p.code} · ${p.name}`]));
  const valid = (credentials ?? []).filter((c) => c.verification_status === "VALID").length;
  const certificates = (credentials ?? []).filter((c) => c.credential_type === "CERTIFICATE").length;
  const eligibleCount = (eligibility ?? []).filter((e) => e.eligible).length;

  return <main className="main">
    <div className="topbar"><div><div className="eyebrow">GreenSkills Core Operations</div><h1>Credentials</h1><p className="subtitle">Evidence-backed GreenSkills credential eligibility and issued badges, certificates and awards.</p></div><Link className="status-pill" href="/dashboard">Dashboard</Link></div>
    <section className="grid metrics">
      <div className="card"><div className="metric-label">Issued credentials</div><div className="metric-value">{(credentials ?? []).length}</div></div>
      <div className="card"><div className="metric-label">Valid</div><div className="metric-value">{valid}</div></div>
      <div className="card"><div className="metric-label">Certificates</div><div className="metric-value">{certificates}</div></div>
      <div className="card"><div className="metric-label">Currently eligible</div><div className="metric-value">{eligibleCount}</div></div>
    </section>

    <section className="card" style={{ marginTop: 20 }}><div className="eyebrow">Eligibility queue</div><h2>Verified curriculum completion</h2><p className="subtitle">Eligibility is reached when every active lesson in the enrolled subprogram has a VERIFIED lesson assessment. This does not automatically issue a credential or waive any additional FieldWorks/program requirements.</p>
      <div style={{ overflowX:"auto" }}><table><thead><tr><th>Participant</th><th>Subprogram</th><th>Verified modules</th><th>Eligibility</th><th>Last verified</th></tr></thead><tbody>
        {(eligibility ?? []).map((e) => { const person=participantById.get(e.participant_id); return <tr key={e.id}><td>{person?.preferred_name ?? e.participant_id}<div className="subtitle">{person?.participant_code ?? ""}</div></td><td>{subprogramById.get(e.subprogram_id) ?? "—"}</td><td>{e.verified_lessons} / {e.required_lessons}</td><td><strong>{e.eligible ? "ELIGIBLE" : "IN PROGRESS"}</strong></td><td>{e.last_verified_at ? new Date(e.last_verified_at).toLocaleDateString() : "—"}</td></tr>; })}
      </tbody></table></div>
      {(eligibility ?? []).length === 0 ? <p className="subtitle">No credential eligibility records are available yet.</p> : null}
    </section>

    <section className="card" style={{ marginTop: 20 }}><div className="eyebrow">Credential register</div><h2>Issued GreenSkills credentials</h2>
      <div style={{ overflowX: "auto" }}><table><thead><tr><th>Participant</th><th>Credential</th><th>Program</th><th>Subprogram</th><th>Code</th><th>Issued</th><th>Expires</th><th>Status</th></tr></thead><tbody>
        {(credentials ?? []).map((c) => { const person = participantById.get(c.participant_id); return <tr key={c.id}><td>{person?.preferred_name ?? c.participant_id}<div className="subtitle">{person?.participant_code ?? ""}</div></td><td><strong>{c.title}</strong><div className="subtitle">{c.credential_type}</div></td><td>{c.program_id ? programById.get(c.program_id) ?? "—" : "—"}</td><td>{c.subprogram_id ? subprogramById.get(c.subprogram_id) ?? "—" : "—"}</td><td>{c.credential_code}</td><td>{c.issued_at}</td><td>{c.expires_at ?? "—"}</td><td>{c.verification_status}</td></tr>; })}
      </tbody></table></div>
      {(credentials ?? []).length === 0 ? <p className="subtitle">No GreenSkills credentials have been issued yet.</p> : null}
    </section>
    <div className="card" style={{ marginTop: 16 }}><strong>Credential integrity</strong><p className="subtitle">Automatic eligibility is intentionally separate from credential issuance. Staff should confirm any required FieldWorks hours, program-specific thresholds and final authorization before issuing a certificate, badge or award.</p></div>
  </main>;
}
