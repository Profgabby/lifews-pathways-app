import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function OpportunitiesWorkspace() {
  const supabase = await createSupabaseServerClient();
  const [{ data: opportunities }, { data: applications }, { data: participants }] = await Promise.all([
    supabase.from("greenskills_opportunities").select("id,opportunity_type,title,organization,location,description,requirements,minimum_age,commercial_activity,active,closes_at,created_at").order("created_at", { ascending: false }).limit(200),
    supabase.from("greenskills_opportunity_applications").select("id,opportunity_id,participant_id,status,applied_at").order("applied_at", { ascending: false }).limit(300),
    supabase.from("participants").select("id,participant_code,preferred_name").limit(300),
  ]);

  const participantById = new Map((participants ?? []).map((p) => [p.id, p]));
  const applicationsByOpportunity = new Map<string, number>();
  (applications ?? []).forEach((a) => applicationsByOpportunity.set(a.opportunity_id, (applicationsByOpportunity.get(a.opportunity_id) ?? 0) + 1));
  const active = (opportunities ?? []).filter((o) => o.active).length;
  const commercial = (opportunities ?? []).filter((o) => o.commercial_activity).length;

  return <main className="main">
    <div className="topbar"><div><div className="eyebrow">GreenSkills Core Operations</div><h1>Opportunities</h1><p className="subtitle">Apprenticeships, internships, jobs, cooperatives, enterprise, community service and advanced training.</p></div><Link className="status-pill" href="/dashboard">Dashboard</Link></div>
    <section className="grid metrics">
      <div className="card"><div className="metric-label">Opportunities</div><div className="metric-value">{(opportunities ?? []).length}</div></div>
      <div className="card"><div className="metric-label">Active</div><div className="metric-value">{active}</div></div>
      <div className="card"><div className="metric-label">Applications</div><div className="metric-value">{(applications ?? []).length}</div></div>
      <div className="card"><div className="metric-label">Commercial opportunities</div><div className="metric-value">{commercial}</div></div>
    </section>

    <section className="grid section-grid" style={{ marginTop: 20 }}>
      {(opportunities ?? []).map((o) => <article className="card" key={o.id} style={{ borderLeft: o.active ? "4px solid var(--green)" : undefined }}><div className="eyebrow">{o.opportunity_type}</div><h2>{o.title}</h2><p className="subtitle">{o.organization ?? "LIFEWS / partner"}{o.location ? ` · ${o.location}` : ""}</p>{o.description ? <p>{o.description}</p> : null}<div className="subtitle">Minimum age: {o.minimum_age ?? "Not specified"} · {o.commercial_activity ? "Commercial · 18+ enforced" : "Non-commercial / training"} · Applications: {applicationsByOpportunity.get(o.id) ?? 0}</div>{o.closes_at ? <p className="subtitle">Closes: {String(o.closes_at).slice(0, 10)}</p> : null}</article>)}
      {(opportunities ?? []).length === 0 ? <div className="card"><p className="subtitle">No GreenSkills opportunities have been published yet.</p></div> : null}
    </section>

    <section className="card" style={{ marginTop: 20 }}><div className="eyebrow">Application register</div><h2>Recent applications</h2>
      <div style={{ overflowX: "auto" }}><table><thead><tr><th>Participant</th><th>Opportunity</th><th>Status</th><th>Applied</th></tr></thead><tbody>
        {(applications ?? []).map((a) => { const person = participantById.get(a.participant_id); const opportunity = (opportunities ?? []).find((o) => o.id === a.opportunity_id); return <tr key={a.id}><td>{person?.preferred_name ?? a.participant_id}<div className="subtitle">{person?.participant_code ?? ""}</div></td><td>{opportunity?.title ?? a.opportunity_id}</td><td>{a.status}</td><td>{String(a.applied_at).slice(0, 10)}</td></tr>; })}
      </tbody></table></div>
    </section>

    <div className="card" style={{ marginTop: 16 }}><strong>Safeguarding boundary</strong><p className="subtitle">Commercial opportunity applications are blocked for participants under 18 at the database layer. Younger learners may still access supervised learning, community service and age-appropriate transition opportunities.</p></div>
  </main>;
}
