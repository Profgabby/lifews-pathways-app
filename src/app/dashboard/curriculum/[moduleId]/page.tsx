import Link from "next/link";
import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function ModulePage({ params }: { params: Promise<{ moduleId: string }> }) {
  const { moduleId } = await params;
  const supabase = await createSupabaseServerClient();

  const { data: module } = await supabase
    .from("curriculum_modules")
    .select("id,code,title,domain,band,module_type,learning_objectives")
    .eq("id", moduleId)
    .maybeSingle();

  if (!module) notFound();

  const [{ data: activities }, { data: checks }] = await Promise.all([
    supabase.from("learning_activities").select("id,code,title,activity_type,objective,safety_notes,assessment_method").eq("module_id", moduleId).eq("active", true).order("code"),
    supabase.from("knowledge_checks").select("id,title,passing_score").eq("module_id", moduleId).eq("active", true),
  ]);

  return (
    <main className="main">
      <div className="topbar">
        <div>
          <div className="eyebrow">{module.domain} • {module.band}</div>
          <h1>{module.title}</h1>
          <p className="subtitle">{module.code} • {module.module_type}</p>
        </div>
        <Link className="status-pill" href="/dashboard/curriculum">Back to curriculum</Link>
      </div>

      <section className="card">
        <h2>Learning objectives</h2>
        <ul>
          {Array.isArray(module.learning_objectives)
            ? module.learning_objectives.map((objective: string) => <li key={objective}>{objective}</li>)
            : null}
        </ul>
      </section>

      <section className="card" style={{ marginTop: 18 }}>
        <h2>Lessons & practical activities</h2>
        {(activities ?? []).length === 0 ? (
          <p className="subtitle">No activities published yet.</p>
        ) : (
          <div className="grid">
            {(activities ?? []).map((activity) => (
              <article key={activity.id} style={{ borderBottom: "1px solid var(--border)", paddingBottom: 14 }}>
                <div className="eyebrow">{activity.code} • {activity.activity_type}</div>
                <h3>{activity.title}</h3>
                <p>{activity.objective}</p>
                {activity.safety_notes ? <p><strong>Safety:</strong> {activity.safety_notes}</p> : null}
                {activity.assessment_method ? <p><strong>Assessment:</strong> {activity.assessment_method}</p> : null}
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="card" style={{ marginTop: 18 }}>
        <h2>Knowledge checks</h2>
        {(checks ?? []).length === 0 ? (
          <p className="subtitle">No knowledge check published yet.</p>
        ) : (
          <ul>{(checks ?? []).map((check) => <li key={check.id}>{check.title} — pass mark {check.passing_score}%</li>)}</ul>
        )}
      </section>
    </main>
  );
}
