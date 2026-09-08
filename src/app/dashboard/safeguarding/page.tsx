import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSafeguardingIncident } from "./actions";

export const dynamic = "force-dynamic";

type Site = {
  id: string;
  name: string;
  community: string | null;
};

type Participant = {
  id: string;
  participant_code: string;
  preferred_name: string;
  site_id: string;
};

type Incident = {
  id: string;
  incident_reference: string;
  case_status: "OPEN" | "REFERRED" | "MONITORING" | "CLOSED";
  referral_status: string | null;
  reported_at: string;
  occurred_at: string | null;
  site_id: string;
};

const allowedRoles = new Set(["SUPER_ADMIN", "SAFEGUARDING_LEAD"]);

export default async function SafeguardingPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role, site_id, active")
    .eq("id", user.id)
    .single();

  if (!profile?.active || !allowedRoles.has(profile.role)) {
    redirect("/dashboard?error=Safeguarding%20workspace%20access%20is%20restricted");
  }

  const [{ data: siteData }, { data: participantData }, { data: incidentData }] = await Promise.all([
    supabase.from("sites").select("id, name, community").eq("active", true).order("name"),
    supabase
      .from("participants")
      .select("id, participant_code, preferred_name, site_id")
      .eq("active", true)
      .order("preferred_name")
      .limit(500),
    supabase
      .from("safeguarding_incidents")
      .select("id, incident_reference, case_status, referral_status, reported_at, occurred_at, site_id")
      .order("reported_at", { ascending: false })
      .limit(100),
  ]);

  const sites = (siteData ?? []) as Site[];
  const participants = (participantData ?? []) as Participant[];
  const incidents = (incidentData ?? []) as Incident[];

  const counts = {
    open: incidents.filter((item) => item.case_status === "OPEN").length,
    referred: incidents.filter((item) => item.case_status === "REFERRED").length,
    monitoring: incidents.filter((item) => item.case_status === "MONITORING").length,
    closed: incidents.filter((item) => item.case_status === "CLOSED").length,
  };

  return (
    <main className="main">
      <div className="topbar">
        <div>
          <div className="eyebrow">Restricted safeguarding workspace</div>
          <h1>Safeguarding case management</h1>
          <p className="subtitle">
            Confidential incident intake, immediate safety actions, referrals, follow-up and case review.
          </p>
        </div>
        <div className="status-pill">{profile.role.replaceAll("_", " ")}</div>
      </div>

      <section className="grid metrics">
        <div className="card"><div className="metric-label">Open</div><div className="metric-value">{counts.open}</div></div>
        <div className="card"><div className="metric-label">Referred</div><div className="metric-value">{counts.referred}</div></div>
        <div className="card"><div className="metric-label">Monitoring</div><div className="metric-value">{counts.monitoring}</div></div>
        <div className="card"><div className="metric-label">Closed</div><div className="metric-value">{counts.closed}</div></div>
      </section>

      <div className="grid section-grid" style={{ marginTop: 16 }}>
        <section className="card">
          <h2>New incident record</h2>
          <p className="subtitle">
            Record factual information only. Do not conduct an informal investigation or add speculation.
          </p>

          <form action={createSafeguardingIncident} style={{ display: "grid", gap: 12, marginTop: 16 }}>
            <label>
              Site
              <select name="siteId" required defaultValue={profile.site_id ?? ""}>
                <option value="" disabled>Select site</option>
                {sites.map((site) => (
                  <option key={site.id} value={site.id}>
                    {site.name}{site.community ? ` — ${site.community}` : ""}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Participant (optional)
              <select name="participantId" defaultValue="">
                <option value="">No participant linked</option>
                {participants.map((participant) => (
                  <option key={participant.id} value={participant.id}>
                    {participant.participant_code} — {participant.preferred_name}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Occurred at (if known)
              <input name="occurredAt" type="datetime-local" />
            </label>

            <label>
              Factual account
              <textarea
                name="factualAccount"
                required
                minLength={10}
                rows={7}
                placeholder="Record what was reported or directly observed. Avoid interpretation or leading language."
              />
            </label>

            <label>
              Immediate safety action
              <textarea
                name="immediateAction"
                rows={4}
                placeholder="Record immediate steps already taken to protect safety, if any."
              />
            </label>

            <button type="submit">Create restricted incident record</button>
          </form>
        </section>

        <section className="card">
          <h2>Recent cases</h2>
          <p className="subtitle">Only authorized safeguarding roles can view these records.</p>

          <div style={{ marginTop: 12 }}>
            {incidents.length ? incidents.map((incident) => (
              <Link
                key={incident.id}
                href={`/dashboard/safeguarding/${incident.id}`}
                style={{ display: "block", padding: "12px 0", borderBottom: "1px solid var(--border)" }}
              >
                <strong>{incident.incident_reference}</strong>
                <div className="subtitle">
                  {incident.case_status} · Reported {new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(incident.reported_at))}
                </div>
              </Link>
            )) : <p className="subtitle">No safeguarding cases are visible for your authorized scope.</p>}
          </div>
        </section>
      </div>

      <section className="card" style={{ marginTop: 16, borderLeft: "4px solid var(--gold)" }}>
        <strong>Confidentiality and response rule</strong>
        <p className="subtitle">
          Immediate safety takes priority. Staff should listen, record facts, preserve confidentiality, avoid repeated questioning and follow approved referral procedures. This workspace supports LIFEWS procedures and does not replace statutory reporting obligations or professional child-protection case management.
        </p>
      </section>
    </main>
  );
}
