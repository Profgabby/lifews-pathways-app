import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createAttendanceSession, markAttendance } from "./actions";

export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ session?: string }> };

type Participant = { id: string; participant_code: string; preferred_name: string; band: string; track: string };
type RecordRow = { participant_id: string; status: string; follow_up_required: boolean };

export default async function AttendancePage({ searchParams }: Props) {
  const { session } = await searchParams;
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = user
    ? await supabase.from("profiles").select("site_id, role, full_name").eq("id", user.id).single()
    : { data: null };

  const siteId = profile?.site_id as string | null;
  const [{ data: sessions }, { data: participants }, { data: records }] = await Promise.all([
    siteId
      ? supabase.from("attendance_sessions").select("id, session_name, session_date").eq("site_id", siteId).order("session_date", { ascending: false }).limit(20)
      : Promise.resolve({ data: [] }),
    siteId
      ? supabase.from("participants").select("id, participant_code, preferred_name, band, track").eq("site_id", siteId).eq("active", true).order("preferred_name")
      : Promise.resolve({ data: [] }),
    session
      ? supabase.from("attendance_records").select("participant_id, status, follow_up_required").eq("session_id", session)
      : Promise.resolve({ data: [] }),
  ]);

  const recordMap = new Map<string, RecordRow>((records ?? []).map((row: any) => [row.participant_id, row]));
  const selectedSession = (sessions ?? []).find((s: any) => s.id === session);
  const followUps = ((participants ?? []) as Participant[]).filter((p) => recordMap.get(p.id)?.follow_up_required);

  return (
    <main className="main">
      <div className="topbar">
        <div>
          <div className="eyebrow">Participation & Re-engagement</div>
          <h1>Attendance</h1>
          <p className="subtitle">Capture attendance, identify unexplained absence patterns, and flag supportive follow-up without punitive labeling.</p>
        </div>
        <div className="status-pill">{profile?.full_name || "Staff"}</div>
      </div>

      {!siteId ? (
        <div className="card"><strong>No site assignment found.</strong><p className="subtitle">A staff site assignment is required before attendance can be recorded.</p></div>
      ) : (
        <>
          <div className="grid section-grid">
            <section className="card">
              <h2>Create session</h2>
              <form action={createAttendanceSession} className="grid" style={{ gap: 12 }}>
                <input type="hidden" name="siteId" value={siteId} />
                <label>Session name<input name="sessionName" required placeholder="e.g. Tuesday Foundation Learning" style={{ width: "100%", marginTop: 6, padding: 10 }} /></label>
                <label>Date<input name="sessionDate" required type="date" defaultValue={new Date().toISOString().slice(0, 10)} style={{ width: "100%", marginTop: 6, padding: 10 }} /></label>
                <button type="submit" style={{ padding: 11, background: "var(--green)", color: "white", border: 0, borderRadius: 10, fontWeight: 800 }}>Create attendance session</button>
              </form>
            </section>

            <section className="card">
              <h2>Recent sessions</h2>
              {(sessions ?? []).length ? (sessions ?? []).map((s: any) => (
                <a key={s.id} href={`/dashboard/attendance?session=${s.id}`} style={{ display: "block", padding: "10px 0", borderBottom: "1px solid var(--border)", fontWeight: s.id === session ? 800 : 500 }}>
                  {s.session_date} · {s.session_name}
                </a>
              )) : <p className="subtitle">No attendance sessions yet.</p>}
            </section>
          </div>

          {selectedSession && (
            <section className="card" style={{ marginTop: 16 }}>
              <h2>{selectedSession.session_name}</h2>
              <p className="subtitle">{selectedSession.session_date} · {participants?.length || 0} active participants</p>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead><tr style={{ textAlign: "left", borderBottom: "1px solid var(--border)" }}><th style={{ padding: 8 }}>Participant</th><th style={{ padding: 8 }}>Status</th><th style={{ padding: 8 }}>Follow-up</th><th style={{ padding: 8 }}>Action</th></tr></thead>
                  <tbody>
                    {((participants ?? []) as Participant[]).map((participant) => {
                      const current = recordMap.get(participant.id);
                      return (
                        <tr key={participant.id} style={{ borderBottom: "1px solid var(--border)" }}>
                          <td style={{ padding: 8 }}><strong>{participant.preferred_name}</strong><div className="subtitle">{participant.participant_code} · {participant.band}</div></td>
                          <td style={{ padding: 8 }}>{current?.status || "Not marked"}</td>
                          <td style={{ padding: 8 }}>{current?.follow_up_required ? "Required" : "—"}</td>
                          <td style={{ padding: 8 }}>
                            <form action={markAttendance} style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                              <input type="hidden" name="sessionId" value={session} />
                              <input type="hidden" name="participantId" value={participant.id} />
                              <select name="status" defaultValue={current?.status || "PRESENT"} style={{ padding: 8 }}>
                                <option value="PRESENT">Present</option><option value="ABSENT">Absent</option><option value="LATE">Late</option><option value="EXCUSED">Excused</option>
                              </select>
                              <label style={{ fontSize: ".85rem" }}><input type="checkbox" name="followUpRequired" defaultChecked={current?.follow_up_required || false} /> Follow-up</label>
                              <button type="submit" style={{ padding: "8px 10px", borderRadius: 8, border: "1px solid var(--border)", background: "white", fontWeight: 700 }}>Save</button>
                            </form>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          <section className="card" style={{ marginTop: 16, borderLeft: "4px solid var(--gold)" }}>
            <h2>Re-engagement queue</h2>
            {followUps.length ? followUps.map((p) => <p key={p.id}><strong>{p.preferred_name}</strong> <span className="subtitle">· {p.participant_code} · supportive follow-up required</span></p>) : <p className="subtitle">No participants are currently flagged for attendance follow-up in the selected session.</p>}
            <p className="subtitle">Follow-up is supportive rather than punitive. Staff should explore barriers and safe re-engagement options using approved communication channels.</p>
          </section>
        </>
      )}
    </main>
  );
}
