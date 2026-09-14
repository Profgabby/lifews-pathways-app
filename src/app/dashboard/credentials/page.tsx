import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { issueCredentialAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function CredentialsWorkspace() {
  const supabase = await createSupabaseServerClient();
  const [{ data: credentials }, { data: participants }, { data: programs }, { data: subprograms }, { data: eligibility }] = await Promise.all([
    supabase.from("greenskills_credentials").select("id,participant_id,program_id,subprogram_id,credential_type,title,credential_code,qr_payload,issued_at,expires_at,file_url,verification_status").order("issued_at", { ascending: false }).limit(200),
    supabase.from("participants").select("id,participant_code,preferred_name").limit(300),
    supabase.from("greenskills_programs").select("id,name"),
    supabase.from("greenskills_subprograms").select("id,code,name"),
    supabase.from("greenskills_credential_eligibility").select("id,participant_id,subprogram_id,required_lessons,verified_lessons,eligible,eligibility_basis,last_verified_at,updated_at,curriculum_complete,fieldwork_required,required_field_hours,verified_field_hours,completed_placements,fieldwork_complete").order("updated_at", { ascending: false }).limit(300),
  ]);

  const participantById = new Map((participants ?? []).map((p) => [p.id, p]));
  const programById = new Map((programs ?? []).map((p) => [p.id, p.name]));
  const subprogramById = new Map((subprograms ?? []).map((p) => [p.id, `${p.code} · ${p.name}`]));
  const valid = (credentials ?? []).filter((c) => c.verification_status === "VALID").length;
  const certificates = (credentials ?? []).filter((c) => c.credential_type === "CERTIFICATE").length;
  const eligibleCount = (eligibility ?? []).filter((e) => e.eligible).length;
  const validKey = new Set((credentials ?? []).filter(c=>c.verification_status==="VALID").map(c=>`${c.participant_id}:${c.subprogram_id}:${c.credential_type}`));

  return <main className="main">
    <div className="topbar"><div><div className="eyebrow">GreenSkills Core Operations</div><h1>Credentials</h1><p className="subtitle">Evidence-backed eligibility, FieldWorks completion, controlled issuance and public QR verification.</p></div><Link className="status-pill" href="/dashboard">Dashboard</Link></div>
    <section className="grid metrics">
      <div className="card"><div className="metric-label">Issued credentials</div><div className="metric-value">{(credentials ?? []).length}</div></div>
      <div className="card"><div className="metric-label">Valid</div><div className="metric-value">{valid}</div></div>
      <div className="card"><div className="metric-label">Certificates</div><div className="metric-value">{certificates}</div></div>
      <div className="card"><div className="metric-label">Ready to issue</div><div className="metric-value">{eligibleCount}</div></div>
    </section>

    <section className="card" style={{ marginTop: 20 }}><div className="eyebrow">Eligibility queue</div><h2>Curriculum + FieldWorks verification</h2><p className="subtitle">A learner becomes eligible only when the active curriculum requirement and the configured FieldWorks requirement are both satisfied. FieldWorks uses the required hours assigned to the learner’s non-cancelled placements, plus any configured minimum.</p>
      <div style={{ overflowX:"auto" }}><table><thead><tr><th>Participant</th><th>Subprogram</th><th>Modules</th><th>FieldWorks</th><th>Completed placements</th><th>Status</th><th>Issue</th></tr></thead><tbody>
        {(eligibility ?? []).map((e) => { const person=participantById.get(e.participant_id); const alreadyIssued=validKey.has(`${e.participant_id}:${e.subprogram_id}:CERTIFICATE`); return <tr key={e.id}>
          <td>{person?.preferred_name ?? e.participant_id}<div className="subtitle">{person?.participant_code ?? ""}</div></td>
          <td>{subprogramById.get(e.subprogram_id) ?? "—"}</td>
          <td><strong>{e.verified_lessons} / {e.required_lessons}</strong><div className="subtitle">{e.curriculum_complete ? "Complete" : "In progress"}</div></td>
          <td><strong>{Number(e.verified_field_hours ?? 0).toFixed(1)} / {Number(e.required_field_hours ?? 0).toFixed(1)} h</strong><div className="subtitle">{e.fieldwork_required ? (e.fieldwork_complete ? "Complete" : "Required") : "Not required"}</div></td>
          <td>{e.completed_placements ?? 0}</td>
          <td><strong>{e.eligible ? "ELIGIBLE" : "IN PROGRESS"}</strong></td>
          <td>{alreadyIssued ? <span className="status-pill">ISSUED</span> : e.eligible ? <form action={issueCredentialAction}><input type="hidden" name="participant_id" value={e.participant_id}/><input type="hidden" name="subprogram_id" value={e.subprogram_id}/><input type="hidden" name="credential_type" value="CERTIFICATE"/><button className="primary-action" type="submit" style={{ border:0,cursor:"pointer" }}>Issue certificate</button></form> : "—"}</td>
        </tr>; })}
      </tbody></table></div>
      {(eligibility ?? []).length === 0 ? <p className="subtitle">No credential eligibility records are available yet.</p> : null}
    </section>

    <section className="card" style={{ marginTop: 20 }}><div className="eyebrow">Credential register</div><h2>Issued GreenSkills credentials</h2>
      <div style={{ overflowX: "auto" }}><table><thead><tr><th>Participant</th><th>Credential</th><th>Program</th><th>Subprogram</th><th>Code</th><th>Issued</th><th>Status</th><th>Certificate</th></tr></thead><tbody>
        {(credentials ?? []).map((c) => { const person = participantById.get(c.participant_id); return <tr key={c.id}><td>{person?.preferred_name ?? c.participant_id}<div className="subtitle">{person?.participant_code ?? ""}</div></td><td><strong>{c.title}</strong><div className="subtitle">{c.credential_type}</div></td><td>{c.program_id ? programById.get(c.program_id) ?? "—" : "—"}</td><td>{c.subprogram_id ? subprogramById.get(c.subprogram_id) ?? "—" : "—"}</td><td>{c.credential_code}</td><td>{c.issued_at}</td><td>{c.verification_status}</td><td><Link href={`/credentials/${encodeURIComponent(c.credential_code)}`} target="_blank">Open / verify →</Link></td></tr>; })}
      </tbody></table></div>
      {(credentials ?? []).length === 0 ? <p className="subtitle">No GreenSkills credentials have been issued yet.</p> : null}
    </section>
    <div className="card" style={{ marginTop: 16 }}><strong>Credential integrity</strong><p className="subtitle">Issuance is staff-controlled. A valid certificate cannot be created until the database confirms curriculum completion and FieldWorks completion. Each issued code resolves to a public verification record with a QR code; revocation or expiry is reflected by the same verification page.</p></div>
  </main>;
}
