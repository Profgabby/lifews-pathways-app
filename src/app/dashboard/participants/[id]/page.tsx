import Link from "next/link";
import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function ParticipantProfilePage({ params }: Props) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();

  const [{ data: participant }, { data: baseline }, { data: guardian }, { data: badges }, { data: transitions }] = await Promise.all([
    supabase.from("participants").select("*").eq("id", id).single(),
    supabase.from("baseline_assessments").select("*").eq("participant_id", id).order("assessed_at", { ascending: false }).limit(1).maybeSingle(),
    supabase.from("guardian_contacts").select("name, relationship, phone, authorized_pickup").eq("participant_id", id).order("created_at", { ascending: true }).limit(1).maybeSingle(),
    supabase.from("participant_badges").select("awarded_at, evidence_note, badges(name, code)").eq("participant_id", id).order("awarded_at", { ascending: false }).limit(12),
    supabase.from("verified_transitions").select("destination, destination_name, start_date, verified_at").eq("participant_id", id).order("verified_at", { ascending: false }).limit(5),
  ]);

  if (!participant) notFound();

  const age = participant.date_of_birth
    ? Math.max(0, new Date().getFullYear() - new Date(participant.date_of_birth).getFullYear())
    : participant.estimated_age_years;

  return (
    <main className="main">
      <div className="topbar">
        <div>
          <div className="eyebrow">Pathways Passport™</div>
          <h1>{participant.preferred_name}</h1>
          <p className="subtitle">{participant.participant_code} · {participant.track} · {participant.band}</p>
        </div>
        <Link className="status-pill" href="/dashboard/participants">← Participant register</Link>
      </div>

      <div className="grid metrics">
        <div className="card"><div className="metric-label">Age / estimate</div><div className="metric-value">{age ?? "—"}</div></div>
        <div className="card"><div className="metric-label">Primary language</div><div className="metric-value" style={{ fontSize: "1.25rem" }}>{participant.primary_language || "—"}</div></div>
        <div className="card"><div className="metric-label">Enrolled</div><div className="metric-value" style={{ fontSize: "1.25rem" }}>{participant.enrolled_at}</div></div>
        <div className="card"><div className="metric-label">Status</div><div className="metric-value" style={{ fontSize: "1.25rem" }}>{participant.active ? "Active" : "Inactive"}</div></div>
      </div>

      <div className="grid section-grid" style={{ marginTop: 16 }}>
        <section className="card">
          <h2>Baseline & placement</h2>
          {baseline ? (
            <>
              <p><strong>Literacy:</strong> {baseline.literacy_level ?? "—"}/5</p>
              <p><strong>Numeracy:</strong> {baseline.numeracy_level ?? "—"}/5</p>
              <p><strong>Digital:</strong> {baseline.digital_level ?? "—"}/5</p>
              <p><strong>Applied skills:</strong> {baseline.applied_skills_level ?? "—"}/5</p>
              <p><strong>Recommended band:</strong> {baseline.recommended_band || "—"}</p>
              <p><strong>Strengths:</strong> {baseline.strengths || "—"}</p>
              <p><strong>Priority needs:</strong> {baseline.priority_needs || "—"}</p>
            </>
          ) : <p className="subtitle">No baseline assessment recorded yet.</p>}
        </section>

        <section className="card">
          <h2>Guardian / authorized contact</h2>
          {guardian ? (
            <>
              <p><strong>Name:</strong> {guardian.name}</p>
              <p><strong>Relationship:</strong> {guardian.relationship || "—"}</p>
              <p><strong>Phone:</strong> {guardian.phone || "—"}</p>
              <p><strong>Authorized pickup:</strong> {guardian.authorized_pickup ? "Yes" : "No"}</p>
            </>
          ) : <p className="subtitle">No guardian/contact record visible.</p>}
        </section>
      </div>

      <div className="grid section-grid" style={{ marginTop: 16 }}>
        <section className="card">
          <h2>Badges</h2>
          {badges?.length ? badges.map((item: any) => (
            <div key={`${item.badges?.code}-${item.awarded_at}`} style={{ padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
              <strong>{item.badges?.name || "Badge"}</strong>
              <div className="subtitle">{item.evidence_note || "Evidence recorded"}</div>
            </div>
          )) : <p className="subtitle">No badges awarded yet.</p>}
        </section>

        <section className="card">
          <h2>Verified transitions</h2>
          {transitions?.length ? transitions.map((item: any) => (
            <div key={`${item.destination}-${item.verified_at}`} style={{ padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
              <strong>{item.destination}</strong>
              <div className="subtitle">{item.destination_name || "Destination recorded"} {item.start_date ? `· ${item.start_date}` : ""}</div>
            </div>
          )) : <p className="subtitle">No verified transition recorded yet.</p>}
        </section>
      </div>

      <div className="card" style={{ marginTop: 16, borderLeft: "4px solid var(--green)" }}>
        <strong>Safeguarding privacy rule</strong>
        <p className="subtitle">Safeguarding case details are intentionally excluded from this learner profile. They are available only inside the restricted safeguarding workspace to authorized roles.</p>
      </div>
    </main>
  );
}
