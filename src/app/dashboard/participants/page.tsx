import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type ParticipantRow = {
  id: string;
  participant_code: string;
  preferred_name: string;
  track: string;
  band: string;
  primary_language: string | null;
  enrolled_at: string;
  active: boolean;
};

export default async function ParticipantsPage() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("participants")
    .select("id, participant_code, preferred_name, track, band, primary_language, enrolled_at, active")
    .order("created_at", { ascending: false })
    .limit(250);

  const participants = (data ?? []) as ParticipantRow[];

  return (
    <main className="main">
      <div className="topbar">
        <div>
          <div className="eyebrow">Enrollment & Placement</div>
          <h1>Participant Register</h1>
          <p className="subtitle">Site-scoped learner register. Routine views use participant codes and avoid sensitive safeguarding information.</p>
        </div>
        <Link className="status-pill" href="/dashboard/enrollment">+ Enroll participant</Link>
      </div>

      {error ? (
        <div className="card"><strong>Unable to load participants.</strong><p>{error.message}</p></div>
      ) : (
        <div className="card" style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "left", borderBottom: "1px solid var(--border)" }}>
                <th style={{ padding: "12px 8px" }}>Participant</th>
                <th style={{ padding: "12px 8px" }}>Track</th>
                <th style={{ padding: "12px 8px" }}>Band</th>
                <th style={{ padding: "12px 8px" }}>Language</th>
                <th style={{ padding: "12px 8px" }}>Enrolled</th>
                <th style={{ padding: "12px 8px" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {participants.map((participant) => (
                <tr key={participant.id} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: "12px 8px" }}>
                    <Link href={`/dashboard/participants/${participant.id}`} style={{ fontWeight: 800, color: "var(--green-deep)" }}>
                      {participant.preferred_name}
                    </Link>
                    <div style={{ color: "var(--muted)", fontSize: ".8rem" }}>{participant.participant_code}</div>
                  </td>
                  <td style={{ padding: "12px 8px" }}>{participant.track}</td>
                  <td style={{ padding: "12px 8px" }}>{participant.band}</td>
                  <td style={{ padding: "12px 8px" }}>{participant.primary_language || "—"}</td>
                  <td style={{ padding: "12px 8px" }}>{participant.enrolled_at}</td>
                  <td style={{ padding: "12px 8px" }}>{participant.active ? "Active" : "Inactive"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {participants.length === 0 && <p className="subtitle" style={{ marginTop: 16 }}>No participants are visible for your assigned site yet.</p>}
        </div>
      )}
    </main>
  );
}
