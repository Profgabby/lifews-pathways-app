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
  const transitionVisible = ["SUPER_ADMIN","PROGRAM_ADMIN","SITE_COORDINATOR","TRANSITION_OFFICER","M_AND_E_OFFICER"].includes(profile.role);
  const analyticsVisible = ["SUPER_ADMIN","PROGRAM_ADMIN","SITE_COORDINATOR","M_AND_E_OFFICER"].includes(profile.role);

  const [{ count: programCount }, { count: enrollmentCount }, { count: passportCount }, { count: placementCount }] = await Promise.all([
    supabase.from("greenskills_programs").select("id", { count: "exact", head: true }).eq("active", true),
    supabase.from("greenskills_enrollments").select("id", { count: "exact", head: true }),
    supabase.from("skills_passports").select("id", { count: "exact", head: true }),
    supabase.from("fieldwork_placements").select("id", { count: "exact", head: true }),
  ]);

  const greenSkillsModules = [
    { href: "/dashboard/programs", title: "Programs & Enrollment", description: "Manage Pathways, Kadara and GreenTech program placement, subprogram progression and enrollment history." },
    { href: "/dashboard/skills-passport", title: "Skills Passport", description: "View cross-program competency scores, verified FieldWorks hours and participant passport records." },
    { href: "/dashboard/assessments", title: "Assessments", description: "Review lesson-level knowledge, practical, digital, safety, enterprise and leadership evidence." },
    { href: "/dashboard/fieldworks", title: "FieldWorks", description: "Track placements, supervisors, verified hours and evidence from real or simulated work settings." },
    { href: "/dashboard/credentials", title: "Credentials", description: "Review evidence-backed badges, certificates and awards issued across GreenSkills." },
    { href: "/dashboard/opportunities", title: "Opportunities", description: "Manage apprenticeships, internships, jobs, cooperatives, enterprise and advanced-training opportunities." },
  ];

  const legacyModules = [
    { href: "/dashboard/enrollment", title: "Legacy Pathways enrollment & baseline", description: "Existing Pathways learner registration, guardians and baseline competency workflow." },
    { href: "/dashboard/participants", title: "Participant register", description: "Existing participant profiles, placement, progress and legacy Pathways records." },
    { href: "/dashboard/attendance", title: "Attendance & re-engagement", description: "Existing session attendance and supportive absence follow-up." },
    { href: "/dashboard/curriculum", title: "Legacy Pathways curriculum", description: "Existing 12-domain Pathways curriculum and developmental-band modules." },
    { href: "/dashboard/learning", title: "Legacy learning evidence", description: "Existing Pathways assessments, knowledge checks and competency evidence." },
    { href: "/dashboard/growmeal", title: "GrowMeal", description: "Existing practical garden learning laboratory." },
    { href: "/dashboard/food-discovery", title: "Food Discovery Lab", description: "Existing supervised ingredient, label and food-system learning activities." },
    { href: "/dashboard/offline", title: "Offline & sync", description: "Existing field-record synchronization workspace." },
  ];

  return (
    <main className="main">
      <div className="topbar">
        <div>
          <div className="eyebrow">LIFEWS GreenSkills</div>
          <h1>Operations workspace</h1>
          <p className="subtitle">One authenticated workspace for Pathways, Kadara and GreenTech delivery, evidence, FieldWorks, credentials and transitions.</p>
        </div>
        <div className="status-pill">{profile.role.replaceAll("_", " ")}</div>
      </div>

      <section className="grid metrics">
        <div className="card"><div className="metric-label">Active programs</div><div className="metric-value">{programCount ?? 0}</div></div>
        <div className="card"><div className="metric-label">GreenSkills enrollments</div><div className="metric-value">{enrollmentCount ?? 0}</div></div>
        <div className="card"><div className="metric-label">Skills Passports</div><div className="metric-value">{passportCount ?? 0}</div></div>
        <div className="card"><div className="metric-label">FieldWorks placements</div><div className="metric-value">{placementCount ?? 0}</div></div>
      </section>

      <section style={{ marginTop: 20 }}>
        <div className="eyebrow">GreenSkills core operations</div>
        <div className="grid section-grid" style={{ marginTop: 12 }}>
          {greenSkillsModules.map((module) => <Link key={module.href} href={module.href} className="card" style={{ display: "block", borderLeft: "4px solid var(--green)" }}><h2>{module.title}</h2><p className="subtitle">{module.description}</p></Link>)}
        </div>
      </section>

      <section style={{ marginTop: 24 }}>
        <div className="eyebrow">Existing Pathways modules — preserved</div>
        <p className="subtitle">These workflows remain available while GreenSkills operations are layered on top of the original Pathways system.</p>
        <div className="grid section-grid" style={{ marginTop: 12 }}>
          {legacyModules.map((module) => <Link key={module.href} href={module.href} className="card" style={{ display: "block" }}><h2>{module.title}</h2><p className="subtitle">{module.description}</p></Link>)}

          {analyticsVisible ? <Link href="/dashboard/analytics" className="card" style={{ display: "block" }}><h2>Program analytics & KPIs</h2><p className="subtitle">Existing analytics for participation, learning, GrowMeal, badges and verified transitions.</p></Link> : null}
          {transitionVisible ? <Link href="/dashboard/transitions" className="card" style={{ display: "block" }}><h2>Transition management</h2><p className="subtitle">Existing next-step planning and verification into education, training, employment and adult enterprise.</p></Link> : null}
          {safeguardingVisible ? <Link href="/dashboard/safeguarding" className="card" style={{ display: "block", borderLeft: "4px solid var(--gold)" }}><h2>Restricted safeguarding</h2><p className="subtitle">Confidential incident intake, actions, referrals, monitoring and audit trail for authorized roles only.</p></Link> : null}
        </div>
      </section>

      <div className="card" style={{ marginTop: 20 }}><strong>Signed in as {profile.full_name}</strong><p className="subtitle">{profile.site_id ? "Site-scoped access" : "Program-wide access"} · RLS protected · commercial opportunity boundary remains 18+.</p></div>
    </main>
  );
}
