import Link from "next/link";
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

  const safeguardingVisible = ["SUPER_ADMIN", "SAFEGUARDING_LEAD"].includes(profile.role);
  const transitionVisible = [
    "SUPER_ADMIN",
    "PROGRAM_ADMIN",
    "SITE_COORDINATOR",
    "TRANSITION_OFFICER",
    "M_AND_E_OFFICER",
  ].includes(profile.role);
  const analyticsVisible = [
    "SUPER_ADMIN",
    "PROGRAM_ADMIN",
    "SITE_COORDINATOR",
    "M_AND_E_OFFICER",
  ].includes(profile.role);

  const modules = [
    { href: "/dashboard/enrollment", title: "Enrollment & baseline", description: "Register learners, guardians and starting competency levels." },
    { href: "/dashboard/participants", title: "Participant register", description: "Find learner profiles, placement, progress and Pathways Passport™ records." },
    { href: "/dashboard/attendance", title: "Attendance & re-engagement", description: "Record sessions, attendance and supportive absence follow-up." },
    { href: "/dashboard/curriculum", title: "Curriculum", description: "Browse the 12 learning domains and developmental-band modules." },
    { href: "/dashboard/learning", title: "Learning evidence", description: "Record assessments, knowledge checks and competency evidence." },
    { href: "/dashboard/growmeal", title: "GrowMeal™", description: "Use the 12-station garden as a practical learning laboratory." },
    { href: "/dashboard/food-discovery", title: "Food Discovery Lab™", description: "Run supervised ingredient, label and food-system learning activities." },
    { href: "/dashboard/passport", title: "Pathways Passport™", description: "Manage goals, projects, badges and demonstrated competencies." },
  ];

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

      <section style={{ marginTop: 20 }}>
        <div className="eyebrow">Program workspaces</div>
        <div className="grid section-grid" style={{ marginTop: 12 }}>
          {modules.map((module) => (
            <Link key={module.href} href={module.href} className="card" style={{ display: "block" }}>
              <h2>{module.title}</h2>
              <p className="subtitle">{module.description}</p>
            </Link>
          ))}

          {analyticsVisible ? (
            <Link href="/dashboard/analytics" className="card" style={{ display: "block", borderLeft: "4px solid var(--green)" }}>
              <h2>Program analytics & KPIs</h2>
              <p className="subtitle">Track participation, learning progression, GrowMeal™, badges, verified transitions and 3/6/12-month retention.</p>
            </Link>
          ) : null}

          {transitionVisible ? (
            <Link href="/dashboard/transitions" className="card" style={{ display: "block", borderLeft: "4px solid var(--green)" }}>
              <h2>Transition management</h2>
              <p className="subtitle">Plan and verify next steps into education, training, agriculture, employment and voluntary adult enterprise.</p>
            </Link>
          ) : null}

          {safeguardingVisible ? (
            <Link href="/dashboard/safeguarding" className="card" style={{ display: "block", borderLeft: "4px solid var(--gold)" }}>
              <h2>Restricted safeguarding</h2>
              <p className="subtitle">Confidential incident intake, actions, referrals, monitoring and audit trail for authorized roles only.</p>
            </Link>
          ) : null}
        </div>
      </section>
    </main>
  );
}
