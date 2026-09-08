import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role, site_id, active")
    .eq("id", user.id)
    .single();

  if (!profile?.active) redirect("/login?error=Account%20is%20not%20active");

  return (
    <main className="main">
      <div className="topbar">
        <div>
          <div className="eyebrow">LIFEWS Pathways™</div>
          <h1>Operational dashboard</h1>
          <p className="subtitle">Authenticated workspace for learning, safeguarding, transition and program management.</p>
        </div>
        <div className="status-pill">{profile.role.replaceAll("_", " ")}</div>
      </div>

      <section className="grid metrics">
        <div className="card"><div className="metric-label">Signed in as</div><div className="metric-value" style={{ fontSize: "1.15rem" }}>{profile.full_name}</div></div>
        <div className="card"><div className="metric-label">Site assignment</div><div className="metric-value" style={{ fontSize: "1.15rem" }}>{profile.site_id ? "Assigned" : "Program-wide"}</div></div>
        <div className="card"><div className="metric-label">Security</div><div className="metric-value" style={{ fontSize: "1.15rem" }}>RLS protected</div></div>
        <div className="card"><div className="metric-label">Commercial boundary</div><div className="metric-value" style={{ fontSize: "1.15rem" }}>18+ only</div></div>
      </section>
    </main>
  );
}
