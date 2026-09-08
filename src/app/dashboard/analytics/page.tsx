import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const allowedRoles = new Set([
  "SUPER_ADMIN",
  "PROGRAM_ADMIN",
  "SITE_COORDINATOR",
  "M_AND_E_OFFICER",
]);

type Participant = { id: string; band: string; site_id: string };
type Baseline = { participant_id: string; literacy_level: number | null; numeracy_level: number | null };
type Progress = { participant_id: string; literacy_level: number | null; numeracy_level: number | null; assessed_at: string };
type Attendance = { participant_id: string; status: string };
type Attempt = { participant_id: string; status: string };
type GrowMeal = { participant_id: string };
type Badge = { participant_id: string };
type Plan = { participant_id: string };
type Transition = {
  participant_id: string;
  destination: string;
  retention_3m: boolean | null;
  retention_6m: boolean | null;
  retention_12m: boolean | null;
};
type Referral = { participant_id: string; pathway: string };

function percentage(numerator: number, denominator: number) {
  if (!denominator) return "—";
  return `${Math.round((numerator / denominator) * 100)}%`;
}

function average(values: number[]) {
  if (!values.length) return null;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function formatDelta(value: number | null) {
  if (value === null) return "—";
  const rounded = Math.round(value * 100) / 100;
  return `${rounded > 0 ? "+" : ""}${rounded}`;
}

function retentionRate(records: Transition[], field: "retention_3m" | "retention_6m" | "retention_12m") {
  const observed = records.filter((record) => record[field] !== null);
  const retained = observed.filter((record) => record[field] === true).length;
  return { retained, observed: observed.length, rate: percentage(retained, observed.length) };
}

export default async function AnalyticsPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role, active")
    .eq("id", user.id)
    .single();

  if (!profile?.active || !allowedRoles.has(profile.role)) {
    redirect("/dashboard?error=Analytics%20workspace%20access%20is%20restricted");
  }

  const [
    { data: participantData },
    { data: baselineData },
    { data: progressData },
    { data: attendanceData },
    { data: attemptData },
    { data: growMealData },
    { data: badgeData },
    { data: planData },
    { data: transitionData },
    { data: referralData },
  ] = await Promise.all([
    supabase.from("participants").select("id, band, site_id").eq("active", true).limit(5000),
    supabase.from("baseline_assessments").select("participant_id, literacy_level, numeracy_level").limit(5000),
    supabase.from("progress_assessments").select("participant_id, literacy_level, numeracy_level, assessed_at").order("assessed_at", { ascending: false }).limit(10000),
    supabase.from("attendance_records").select("participant_id, status").limit(10000),
    supabase.from("learning_attempts").select("participant_id, status").limit(10000),
    supabase.from("growmeal_observations").select("participant_id").limit(10000),
    supabase.from("participant_badges").select("participant_id").limit(10000),
    supabase.from("transition_plans").select("participant_id").limit(5000),
    supabase.from("verified_transitions").select("participant_id, destination, retention_3m, retention_6m, retention_12m").limit(5000),
    supabase.from("adult_enterprise_referrals").select("participant_id, pathway").limit(5000),
  ]);

  const participants = (participantData ?? []) as Participant[];
  const baselines = (baselineData ?? []) as Baseline[];
  const progress = (progressData ?? []) as Progress[];
  const attendance = (attendanceData ?? []) as Attendance[];
  const attempts = (attemptData ?? []) as Attempt[];
  const growMeal = (growMealData ?? []) as GrowMeal[];
  const badges = (badgeData ?? []) as Badge[];
  const plans = (planData ?? []) as Plan[];
  const transitions = (transitionData ?? []) as Transition[];
  const referrals = (referralData ?? []) as Referral[];

  const participantIds = new Set(participants.map((participant) => participant.id));
  const baselineByParticipant = new Map(baselines.map((assessment) => [assessment.participant_id, assessment]));
  const latestProgressByParticipant = new Map<string, Progress>();
  for (const assessment of progress) {
    if (!latestProgressByParticipant.has(assessment.participant_id)) {
      latestProgressByParticipant.set(assessment.participant_id, assessment);
    }
  }

  const literacyDeltas: number[] = [];
  const numeracyDeltas: number[] = [];
  let literacyImproved = 0;
  let numeracyImproved = 0;
  let literacyCompared = 0;
  let numeracyCompared = 0;

  for (const [participantId, latest] of latestProgressByParticipant) {
    const baseline = baselineByParticipant.get(participantId);
    if (!baseline) continue;
    if (baseline.literacy_level !== null && latest.literacy_level !== null) {
      const delta = latest.literacy_level - baseline.literacy_level;
      literacyDeltas.push(delta);
      literacyCompared += 1;
      if (delta > 0) literacyImproved += 1;
    }
    if (baseline.numeracy_level !== null && latest.numeracy_level !== null) {
      const delta = latest.numeracy_level - baseline.numeracy_level;
      numeracyDeltas.push(delta);
      numeracyCompared += 1;
      if (delta > 0) numeracyImproved += 1;
    }
  }

  const activeAttendanceParticipants = new Set(
    attendance
      .filter((record) => participantIds.has(record.participant_id) && ["PRESENT", "LATE"].includes(record.status))
      .map((record) => record.participant_id),
  );
  const completedAttempts = attempts.filter((attempt) => attempt.status === "COMPLETED").length;
  const growMealParticipants = new Set(growMeal.map((record) => record.participant_id));
  const badgeParticipants = new Set(badges.map((record) => record.participant_id));
  const plannedParticipants = new Set(plans.map((plan) => plan.participant_id));
  const transitionEligible = participants.filter((participant) => ["TRANSITION", "ENTERPRISE"].includes(participant.band));
  const verifiedParticipantIds = new Set(transitions.map((transition) => transition.participant_id));
  const verifiedEligible = transitionEligible.filter((participant) => verifiedParticipantIds.has(participant.id)).length;

  const retention3 = retentionRate(transitions, "retention_3m");
  const retention6 = retentionRate(transitions, "retention_6m");
  const retention12 = retentionRate(transitions, "retention_12m");

  const destinations = new Map<string, number>();
  for (const transition of transitions) {
    destinations.set(transition.destination, (destinations.get(transition.destination) ?? 0) + 1);
  }
  const pathways = new Map<string, number>();
  for (const referral of referrals) {
    pathways.set(referral.pathway, (pathways.get(referral.pathway) ?? 0) + 1);
  }

  return (
    <main className="main">
      <div className="topbar">
        <div>
          <div className="eyebrow">LIFEWS Pathways™ intelligence</div>
          <h1>Program analytics & KPI dashboard</h1>
          <p className="subtitle">Operational indicators for access, learning, participation, practical engagement, transition and adult pathways. Metrics respect current Row Level Security and site scope.</p>
        </div>
        <div className="status-pill">{profile.role.replaceAll("_", " ")}</div>
      </div>

      <section className="grid metrics">
        <div className="card"><div className="metric-label">Active participants</div><div className="metric-value">{participants.length}</div></div>
        <div className="card"><div className="metric-label">Baseline coverage</div><div className="metric-value">{percentage(baselineByParticipant.size, participants.length)}</div></div>
        <div className="card"><div className="metric-label">Recorded attendance participation</div><div className="metric-value">{percentage(activeAttendanceParticipants.size, participants.length)}</div></div>
        <div className="card"><div className="metric-label">Transition plans</div><div className="metric-value">{percentage(plannedParticipants.size, participants.length)}</div></div>
      </section>

      <div className="grid section-grid" style={{ marginTop: 16 }}>
        <section className="card">
          <h2>Learning progression</h2>
          <p className="subtitle">Progress compares each learner's latest recorded progress assessment with the original enrollment baseline.</p>
          <div style={{ display: "grid", gap: 12, marginTop: 14 }}>
            <div><strong>Literacy improved:</strong> {percentage(literacyImproved, literacyCompared)} <span className="subtitle">({literacyImproved}/{literacyCompared} comparable learners)</span></div>
            <div><strong>Average literacy level change:</strong> {formatDelta(average(literacyDeltas))}</div>
            <div><strong>Numeracy improved:</strong> {percentage(numeracyImproved, numeracyCompared)} <span className="subtitle">({numeracyImproved}/{numeracyCompared} comparable learners)</span></div>
            <div><strong>Average numeracy level change:</strong> {formatDelta(average(numeracyDeltas))}</div>
          </div>
        </section>

        <section className="card">
          <h2>Applied learning</h2>
          <div style={{ display: "grid", gap: 12, marginTop: 14 }}>
            <div><strong>Learning attempts completed:</strong> {percentage(completedAttempts, attempts.length)} <span className="subtitle">({completedAttempts}/{attempts.length})</span></div>
            <div><strong>GrowMeal™ participation coverage:</strong> {percentage(growMealParticipants.size, participants.length)}</div>
            <div><strong>Participants earning ≥1 badge:</strong> {percentage(badgeParticipants.size, participants.length)}</div>
            <div><strong>Total badges awarded:</strong> {badges.length}</div>
          </div>
        </section>
      </div>

      <section className="card" style={{ marginTop: 16, borderLeft: "4px solid var(--green)" }}>
        <h2>LIFEWS Pathways™ Verified Transition Rate</h2>
        <div className="metric-value" style={{ marginTop: 8 }}>{percentage(verifiedEligible, transitionEligible.length)}</div>
        <p className="subtitle">Verified positive transitions among active participants currently in the Transition™ or Enterprise™ bands. Current denominator: {transitionEligible.length}; verified participants: {verifiedEligible}.</p>
      </section>

      <div className="grid section-grid" style={{ marginTop: 16 }}>
        <section className="card">
          <h2>Transition retention</h2>
          <div style={{ display: "grid", gap: 12, marginTop: 14 }}>
            <div><strong>3-month retention:</strong> {retention3.rate} <span className="subtitle">({retention3.retained}/{retention3.observed} followed up)</span></div>
            <div><strong>6-month retention:</strong> {retention6.rate} <span className="subtitle">({retention6.retained}/{retention6.observed} followed up)</span></div>
            <div><strong>12-month retention:</strong> {retention12.rate} <span className="subtitle">({retention12.retained}/{retention12.observed} followed up)</span></div>
          </div>
        </section>

        <section className="card">
          <h2>Verified destinations</h2>
          {destinations.size ? Array.from(destinations.entries()).sort((a, b) => b[1] - a[1]).map(([destination, count]) => (
            <div key={destination} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--border)" }}>
              <span>{destination.replaceAll("_", " ")}</span><strong>{count}</strong>
            </div>
          )) : <p className="subtitle">No verified transitions recorded yet.</p>}
        </section>
      </div>

      <div className="grid section-grid" style={{ marginTop: 16 }}>
        <section className="card">
          <h2>Adult enterprise pathways</h2>
          <p className="subtitle">Counts reflect voluntary 18+ referrals only.</p>
          {pathways.size ? Array.from(pathways.entries()).sort((a, b) => b[1] - a[1]).map(([pathway, count]) => (
            <div key={pathway} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--border)" }}>
              <span>{pathway}</span><strong>{count}</strong>
            </div>
          )) : <p className="subtitle">No adult enterprise referrals recorded yet.</p>}
        </section>

        <section className="card">
          <h2>Safeguarding & data integrity</h2>
          <p className="subtitle">This general analytics workspace intentionally does not expose safeguarding case records, factual accounts, referrals or identities.</p>
          <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
            <div><strong>Safeguarding case data:</strong> restricted workspace only</div>
            <div><strong>Analytics scope:</strong> site-scoped through RLS</div>
            <div><strong>Progression rule:</strong> no improvement is inferred without a recorded follow-up assessment</div>
            <div><strong>Transition rule:</strong> only verified destinations are counted as positive transitions</div>
          </div>
        </section>
      </div>
    </main>
  );
}
