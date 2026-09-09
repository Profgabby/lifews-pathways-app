import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { addSafeguardingAction, updateSafeguardingStatus } from "../actions";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

type Action = {
  id: string;
  action_type: string;
  action_note: string;
  receiving_service: string | null;
  follow_up_date: string | null;
  created_at: string;
};

type Audit = {
  id: string;
  action: string;
  detail: string | null;
  created_at: string;
};

const allowedRoles = new Set(["SUPER_ADMIN", "SAFEGUARDING_LEAD"]);

export default async function SafeguardingCasePage({ params }: Props) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role, active")
    .eq("id", user.id)
    .single();

  if (!profile?.active || !allowedRoles.has(profile.role)) {
    redirect("/dashboard?error=Safeguarding%20workspace%20access%20is%20restricted");
  }

  const { data: incident } = await supabase
    .from("safeguarding_incidents")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!incident) notFound();

  const participantPromise = incident.participant_id
    ? supabase
        .from("participants")
        .select("participant_code, preferred_name")
        .eq("id", incident.participant_id)
        .maybeSingle()
    : Promise.resolve({ data: null });

  const [{ data: participant }, { data: actionData }, { data: auditData }] = await Promise.all([
    participantPromise,
    supabase
      .from("safeguarding_actions")
      .select("id, action_type, action_note, receiving_service, follow_up_date, created_at")
      .eq("incident_id", id)
      .order("created_at", { ascending: false }),
    supabase
      .from("safeguarding_audit_log")
      .select("id, action, detail, created_at")
      .eq("incident_id", id)
      .order("created_at", { ascending: false })
      .limit(50),
  ]);

  const actions = (actionData ?? []) as Action[];
  const audits = (auditData ?? []) as Audit[];

  return (
    <main className="main">
      <div className="topbar">
        <div>
          <div className="eyebrow">Restricted safeguarding case</div>
          <h1>{incident.incident_reference}</h1>
          <p className="subtitle">
            {participant
              ? `${participant.participant_code} · ${participant.preferred_name}`
              : "No participant linked to this incident record"}
          </p>
        </div>
        <Link className="status-pill" href="/dashboard/safeguarding">← Safeguarding dashboard</Link>
      </div>

      <section className="grid metrics">
        <div className="card"><div className="metric-label">Case status</div><div className="metric-value" style={{ fontSize: "1.2rem" }}>{incident.case_status}</div></div>
        <div className="card"><div className="metric-label">Referral status</div><div className="metric-value" style={{ fontSize: "1.2rem" }}>{incident.referral_status || "Not recorded"}</div></div>
        <div className="card"><div className="metric-label">Reported</div><div className="metric-value" style={{ fontSize: "1.1rem" }}>{new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(incident.reported_at))}</div></div>
        <div className="card"><div className="metric-label">Occurred</div><div className="metric-value" style={{ fontSize: "1.1rem" }}>{incident.occurred_at ? new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(incident.occurred_at)) : "Unknown"}</div></div>
      </section>

      <div className="grid section-grid" style={{ marginTop: 16 }}>
        <section className="card">
          <h2>Factual account</h2>
          <p style={{ whiteSpace: "pre-wrap" }}>{incident.factual_account}</p>

          <h3 style={{ marginTop: 20 }}>Immediate action recorded at intake</h3>
          <p style={{ whiteSpace: "pre-wrap" }}>{incident.immediate_action || "No immediate action was recorded at intake."}</p>
        </section>

        <section className="card">
          <h2>Update case status</h2>
          <form action={updateSafeguardingStatus} style={{ display: "grid", gap: 12, marginTop: 12 }}>
            <input type="hidden" name="incidentId" value={incident.id} />
            <label>
              Case status
              <select name="caseStatus" required defaultValue={incident.case_status}>
                <option value="OPEN">Open</option>
                <option value="REFERRED">Referred</option>
                <option value="MONITORING">Monitoring</option>
                <option value="CLOSED">Closed</option>
              </select>
            </label>
            <label>
              Referral status
              <input name="referralStatus" defaultValue={incident.referral_status || ""} placeholder="e.g. Referral accepted; follow-up pending" />
            </label>
            <button type="submit">Update case status</button>
          </form>
        </section>
      </div>

      <div className="grid section-grid" style={{ marginTop: 16 }}>
        <section className="card">
          <h2>Add safeguarding action</h2>
          <form action={addSafeguardingAction} style={{ display: "grid", gap: 12, marginTop: 12 }}>
            <input type="hidden" name="incidentId" value={incident.id} />
            <label>
              Action type
              <select name="actionType" required defaultValue="FOLLOW_UP">
                <option value="IMMEDIATE_SAFETY">Immediate safety</option>
                <option value="REFERRAL">Referral</option>
                <option value="FOLLOW_UP">Follow-up</option>
                <option value="CASE_REVIEW">Case review</option>
                <option value="CLOSURE_NOTE">Closure note</option>
              </select>
            </label>
            <label>
              Action note
              <textarea name="actionNote" required minLength={3} rows={6} placeholder="Record factual action taken, response received or authorized follow-up." />
            </label>
            <label>
              Receiving service (if applicable)
              <input name="receivingService" placeholder="Organization, authority or service" />
            </label>
            <label>
              Follow-up date
              <input name="followUpDate" type="date" />
            </label>
            <button type="submit">Record safeguarding action</button>
          </form>
        </section>

        <section className="card">
          <h2>Action timeline</h2>
          {actions.length ? actions.map((action) => (
            <div key={action.id} style={{ padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
              <strong>{action.action_type.replaceAll("_", " ")}</strong>
              <div className="subtitle">{new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short" }).format(new Date(action.created_at))}</div>
              <p style={{ whiteSpace: "pre-wrap", marginBottom: 4 }}>{action.action_note}</p>
              {action.receiving_service ? <div className="subtitle">Receiving service: {action.receiving_service}</div> : null}
              {action.follow_up_date ? <div className="subtitle">Follow-up: {action.follow_up_date}</div> : null}
            </div>
          )) : <p className="subtitle">No follow-up actions have been recorded yet.</p>}
        </section>
      </div>

      <section className="card" style={{ marginTop: 16 }}>
        <h2>Audit trail</h2>
        <p className="subtitle">System-level case events for authorized review. Audit records are not displayed in the ordinary learner profile.</p>
        {audits.length ? audits.map((audit) => (
          <div key={audit.id} style={{ padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
            <strong>{audit.action.replaceAll("_", " ")}</strong>
            <div className="subtitle">{new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short" }).format(new Date(audit.created_at))}</div>
            {audit.detail ? <div>{audit.detail}</div> : null}
          </div>
        )) : <p className="subtitle">No audit entries visible.</p>}
      </section>

      <section className="card" style={{ marginTop: 16, borderLeft: "4px solid var(--gold)" }}>
        <strong>Safeguarding practice reminder</strong>
        <p className="subtitle">
          Do not promise secrecy, confront an alleged perpetrator, repeatedly question a child or circulate case details through informal communication channels. Use approved referral and statutory reporting procedures where applicable.
        </p>
      </section>
    </main>
  );
}
