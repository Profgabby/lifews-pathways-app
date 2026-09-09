import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function FoodDiscoveryPage() {
  const supabase = await createSupabaseServerClient();
  const [{ data: activities }, { count }] = await Promise.all([
    supabase
      .from("learning_activities")
      .select("id,code,title,objective,safety_notes,assessment_method")
      .eq("activity_type", "FOOD_DISCOVERY")
      .eq("active", true)
      .order("code"),
    supabase.from("food_discovery_records").select("id", { count: "exact", head: true }),
  ]);

  return (
    <main className="main">
      <div className="topbar">
        <div>
          <div className="eyebrow">Food & Ingredient Learning</div>
          <h1>Food Discovery Lab™</h1>
          <p className="subtitle">
            Safe, supervised exploration of ingredients, food systems, packaging, labels and food-processing concepts.
          </p>
        </div>
        <Link className="status-pill" href="/dashboard/curriculum">Curriculum</Link>
      </div>

      <div className="grid metrics">
        <div className="card"><div className="metric-label">Published activities</div><div className="metric-value">{activities?.length ?? 0}</div></div>
        <div className="card"><div className="metric-label">Completed records</div><div className="metric-value">{count ?? 0}</div></div>
        <div className="card"><div className="metric-label">Tasting rule</div><div style={{ marginTop: 10, fontWeight: 800 }}>Never compulsory</div></div>
        <div className="card"><div className="metric-label">Safety rule</div><div style={{ marginTop: 10, fontWeight: 800 }}>Hygiene + allergy checks</div></div>
      </div>

      <section className="card" style={{ marginTop: 18 }}>
        <h2>Activity families</h2>
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))" }}>
          {["Meet the Ingredient","Root, Stem, Leaf or Fruit?","Color & Texture","Water in Food","Drying & Preservation","Packaging Purpose","Read the Label","Farm-to-Food Journey"].map((item) => (
            <div key={item} style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 14 }}><strong>{item}</strong></div>
          ))}
        </div>
      </section>

      <section className="card" style={{ marginTop: 18 }}>
        <h2>Published Food Discovery activities</h2>
        {(activities ?? []).length === 0 ? <p className="subtitle">No activities published yet.</p> : (
          <div className="grid">
            {(activities ?? []).map((activity) => (
              <article key={activity.id} style={{ borderBottom: "1px solid var(--border)", paddingBottom: 14 }}>
                <div className="eyebrow">{activity.code}</div>
                <h3>{activity.title}</h3>
                <p>{activity.objective}</p>
                {activity.safety_notes ? <p><strong>Safety:</strong> {activity.safety_notes}</p> : null}
                {activity.assessment_method ? <p><strong>Evidence:</strong> {activity.assessment_method}</p> : null}
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
