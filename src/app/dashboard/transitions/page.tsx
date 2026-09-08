import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  createAdultEnterpriseReferral,
  createTransitionPlan,
  recordVerifiedTransition,
} from "./actions";

export const dynamic = "force-dynamic";

type Participant = {
  id: string;
  participant_code: string;
  preferred_name: string;
  band: string;
  date_of_birth: string | null;
  estimated_age_years: number | null;
};

type Plan = { participant_id: string };
type Verified = { participant_id: string; destination: string; verified_at: string };
type Referral = { participant_id: string; pathway: string; referred_at: string };

const readableRoles = new Set([
  "SUPER_ADMIN",
  "PROGRAM_ADMIN",
  "SITE_COORDINATOR",
  "TRANSITION_OFFICER",
  "M_AND_E_OFFICER",
]);

function isAdult(participant: Participant) {
  if (participant.date_of_birth) {
    const birth = new Date(`${participant.date_of_birth}T00:00:00Z`);
    const threshold = new Date();
    threshold.setUTCFullYear(threshold.getUTCFullYear() - 18);
    return birth <= threshold;
  }
  return (participant.estimated_age_years ?? 0) >= 18;
}

const destinationOptions = [
  ["FORMAL_EDUCATION", "Formal education"],
  ["ALTERNATIVE_EDUCATION", "Alternative education"],
  ["VOCATIONAL_TRAINING", "Vocational training"],
  ["APPRENTICESHIP", "Apprenticeship"],
  ["HIGHER_EDUCATION", "Higher education"],
  ["AGRICULTURE", "Agriculture"],
  ["EMPLOYMENT", "Employment"],
  ["ADULT_ENTERPRISE", "Adult enterprise"],
] as const;

export default async function TransitionsPage() {
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

  if (!profile?.active || !readableRoles.has(profile.role)) {
    redirect("/dashboard?error=Transition%20workspace%20access%20is%20restricted");
  }

  const [{ data: participantData }, { data: planData }, { data: verifiedData }, { data: referralData }] = await Promise.all([
    supabase
      .from("participants")
      .select("id, participant_code, preferred_name, band, date_of_birth, estimated_age_years")
      .eq("active", true)
      .order("preferred_name")
      .limit(1000),
    supabase.from("transition_plans").select("participant_id").limit(2000),
    supabase
      .from("verified_transitions")
      .select("participant_id, destination, verified_at")
      .order("verified_at", { ascending: false })
      .limit(500),
    supabase
      .from("adult_enterprise_referrals")
      .select("participant_id, pathway, referred_at")
      .order("referred_at", { ascending: false })
      .limit(500),
  ]);

  const participants = (participantData ?? []) as Participant[];
  const plans = (planData ?? []) as Plan[];
  const verified = (verifiedData ?? []) as Verified[];
  const referrals = (referralData ?? []) as Referral[];
  const adults = participants.filter(isAdult);
  const plannedParticipants = new Set(plans.map((item) => item.participant_id)).size;

  const canPlan = ["SUPER_ADMIN", "PROGRAM_ADMIN", "SITE_COORDINATOR", "TRANSITION_OFFICER"].includes(profile.role);
  const canVerify = ["SUPER_ADMIN", "PROGRAM_ADMIN", "TRANSITION_OFFICER", "M_AND_E_OFFICER"].includes(profile.role);
  const canReferAdults = ["SUPER_ADMIN", "PROGRAM_ADMIN", "TRANSITION_OFFICER"].includes(profile.role);

  return (
    <main className="main">
      <div className="topbar">
        <div>
          <div className="eyebrow">LIFEWS Pathways™ transition management</div>
          <h1>From learning to verified next steps</h1>
          <p className="subtitle">Plan, verify and follow participant transitions into education, training, agriculture, employment and voluntary adult enterprise.</p>
        </div>
        <div className="status-pill">{profile.role.replaceAll("_", " ")}</div>
      </div>

      <section className="grid metrics">
        <div className="card"><div className="metric-label">Active participants</div><div className="metric-value">{participants.length}</div></div>
        <div className="card"><div className="metric-label">With transition plans</div><div className="metric-value">{plannedParticipants}</div></div>
        <div className="card"><div className="metric-label">Verified transitions</div><div className="metric-value">{verified.length}</div></div>
        <div className="card"><div className="metric-label">Adult enterprise referrals</div><div className="metric-value">{referrals.length}</div></div>
      </section>

      <div className="grid section-grid" style={{ marginTop: 16 }}>
        {canPlan ? (
          <section className="card">
            <h2>My Next Pathway Plan</h2>
            <form action={createTransitionPlan} style={{ display: "grid", gap: 12, marginTop: 12 }}>
              <label>
                Participant
                <select name="participantId" required defaultValue="">
                  <option value="" disabled>Select participant</option>
                  {participants.map((participant) => (
                    <option key={participant.id} value={participant.id}>{participant.participant_code} — {participant.preferred_name} · {participant.band}</option>
                  ))}
                </select>
              </label>
              <label>Interests<textarea name="interests" rows={3} /></label>
              <label>Current strengths<textarea name="currentStrengths" rows={3} /></label>
              <label>Next skill needed<input name="nextSkillNeeded" /></label>
              <label>
                Intended destination
                <select name="intendedDestination" required defaultValue="">
                  <option value="" disabled>Select destination</option>
                  {destinationOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </select>
              </label>
              <label>Next 30-day action<textarea name="next30DayAction" required minLength={3} rows={3} /></label>
              <label>Support person<input name="supportPerson" /></label>
              <button type="submit">Save transition plan</button>
            </form>
          </section>
        ) : null}

        {canVerify ? (
          <section className="card">
            <h2>Verify a positive transition</h2>
            <p className="subtitle">Record a transition only when there is a credible verification method.</p>
            <form action={recordVerifiedTransition} style={{ display: "grid", gap: 12, marginTop: 12 }}>
              <label>
                Participant
                <select name="participantId" required defaultValue="">
                  <option value="" disabled>Select participant</option>
                  {participants.map((participant) => <option key={participant.id} value={participant.id}>{participant.participant_code} — {participant.preferred_name}</option>)}
                </select>
              </label>
              <label>
                Destination
                <select name="destination" required defaultValue="">
                  <option value="" disabled>Select destination</option>
                  {destinationOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </select>
              </label>
              <label>Destination name<input name="destinationName" /></label>
              <label>Start date<input name="startDate" type="date" /></label>
              <label>Verification method<textarea name="verificationMethod" required minLength={3} rows={3} placeholder="Partner confirmation, enrollment record, employer confirmation, participant plus destination confirmation, etc." /></label>
              <button type="submit">Record verified transition</button>
            </form>
          </section>
        ) : null}
      </div>

      {canReferAdults ? (
        <section className="card" style={{ marginTop: 16, borderLeft: "4px solid var(--green)" }}>
          <h2>Adult enterprise bridge — 18+ only</h2>
          <p className="subtitle">This pathway is voluntary. LIFEWS participation is never conditional on joining AgriRoots™, AgriNext™, AgriAble™, ZARIKS™ or any other commercial opportunity.</p>
          <form action={createAdultEnterpriseReferral} style={{ display: "grid", gap: 12, marginTop: 12 }}>
            <label>
              Eligible adult participant
              <select name="participantId" required defaultValue="">
                <option value="" disabled>Select adult participant</option>
                {adults.map((participant) => <option key={participant.id} value={participant.id}>{participant.participant_code} — {participant.preferred_name}</option>)}
              </select>
            </label>
            <label>
              Pathway
              <select name="pathway" required defaultValue="">
                <option value="" disabled>Select adult pathway</option>
                <option value="AGRIROOTS">LIFEWS AgriRoots™</option>
                <option value="AGRINEXT">LIFEWS AgriNext™</option>
                <option value="AGRIABLE">LIFEWS AgriAble™</option>
                <option value="ZARIKS">ZARIKS™ adult enterprise opportunity</option>
                <option value="OTHER">Other approved adult opportunity</option>
              </select>
            </label>
            <label><input name="voluntaryInterestConfirmed" type="checkbox" required /> Explicit voluntary interest confirmed</label>
            <label><input name="eligibilityConfirmed" type="checkbox" /> Eligibility confirmed</label>
            <label><input name="readinessAssessed" type="checkbox" /> Enterprise readiness assessed</label>
            <label>Notes<textarea name="notes" rows={3} /></label>
            <button type="submit">Create adult referral</button>
          </form>
        </section>
      ) : null}

      <section className="card" style={{ marginTop: 16 }}>
        <h2>Recent verified transitions</h2>
        {verified.length ? verified.slice(0, 12).map((item, index) => (
          <div key={`${item.participant_id}-${item.verified_at}-${index}`} style={{ padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
            <strong>{item.destination.replaceAll("_", " ")}</strong>
            <div className="subtitle">Verified {new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(item.verified_at))}</div>
          </div>
        )) : <p className="subtitle">No verified transitions recorded yet.</p>}
      </section>
    </main>
  );
}
