import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const stations = [
  ["SEED_DISCOVERY", "Seed Discovery"],
  ["SOIL_LEARNING", "Soil Learning"],
  ["WATER_IRRIGATION", "Water & Irrigation"],
  ["ROOT_OBSERVATION", "Root Observation"],
  ["PLANT_GROWTH", "Plant Growth"],
  ["VEGETABLE_PRODUCTION", "Vegetable Production"],
  ["HERBS_SPICES", "Herbs & Spices"],
  ["FOOD_NUTRITION", "Food & Nutrition"],
  ["COMPOST", "Compost"],
  ["HARVEST", "Harvest"],
  ["POSTHARVEST", "Postharvest"],
  ["MARKET_FOOD_SYSTEMS", "Market & Food Systems"],
] as const;

export default async function GrowMealPage() {
  const supabase = await createSupabaseServerClient();
  const { data: activities } = await supabase
    .from("learning_activities")
    .select("id,code,title,objective,safety_notes,assessment_method,module_id")
    .eq("activity_type", "GROWMEAL")
    .eq("active", true)
    .order("code");

  const { count } = await supabase
    .from("growmeal_observations")
    .select("id", { count: "exact", head: true });

  return (
    <main className="main">
      <div className="topbar">
        <div>
          <div className="eyebrow">Practical Learning Laboratory</div>
          <h1>GrowMeal™ Learning Garden</h1>
          <p className="subtitle">
            Garden-based learning for observation, measurement, agriculture, food systems and practical competence.
          </p>
        </div>
        <Link className="status-pill" href="/dashboard/curriculum">Curriculum</Link>
      </div>

      <div className="grid metrics">
        <div className="card"><div className="metric-label">Learning stations</div><div className="metric-value">12</div></div>
        <div className="card"><div className="metric-label">Published activities</div><div className="metric-value">{activities?.length ?? 0}</div></div>
        <div className="card"><div className="metric-label">Recorded observations</div><div className="metric-value">{count ?? 0}</div></div>
        <div className="card"><div className="metric-label">Learning principle</div><div style={{ marginTop: 10, fontWeight: 800 }}>Observe → Measure → Record</div></div>
      </div>

      <section className="card" style={{ marginTop: 18 }}>
        <h2>12 learning stations</h2>
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))" }}>
          {stations.map(([code, label], index) => (
            <div key={code} style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 14 }}>
              <div className="eyebrow">Station {String(index + 1).padStart(2, "0")}</div>
              <strong>{label}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="card" style={{ marginTop: 18 }}>
        <h2>Published GrowMeal™ activities</h2>
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
