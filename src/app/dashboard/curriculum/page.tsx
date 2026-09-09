import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const domainOrder = [
  "Literacy & Communication",
  "Numeracy",
  "Science & Discovery",
  "Agriculture",
  "Food Literacy",
  "Hygiene & Sanitation",
  "Environment & Resources",
  "Digital Literacy",
  "Life Skills",
  "Vocational Exploration",
  "Enterprise & Financial Literacy",
  "Transition & Career Planning",
];

export default async function CurriculumPage() {
  const supabase = await createSupabaseServerClient();
  const { data: modules } = await supabase
    .from("curriculum_modules")
    .select("id,code,title,domain,band,module_type,learning_objectives,active")
    .eq("active", true)
    .order("code");

  const grouped = domainOrder.map((domain) => ({
    domain,
    modules: (modules ?? []).filter((item) => item.domain === domain),
  }));

  return (
    <main className="main">
      <div className="topbar">
        <div>
          <div className="eyebrow">Learning System</div>
          <h1>Pathways Curriculum</h1>
          <p className="subtitle">
            Twelve connected learning domains spanning Discover™, Explore™, Build™, Transition™ and Enterprise™.
          </p>
        </div>
        <Link className="status-pill" href="/dashboard/growmeal">Open GrowMeal™</Link>
      </div>

      <div className="grid" style={{ gap: 18 }}>
        {grouped.map(({ domain, modules: domainModules }, index) => (
          <section className="card" key={domain}>
            <div className="eyebrow">Domain {String(index + 1).padStart(2, "0")}</div>
            <h2 style={{ marginBottom: 12 }}>{domain}</h2>
            {domainModules.length === 0 ? (
              <p className="subtitle">No active modules have been published in this domain yet.</p>
            ) : (
              <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))" }}>
                {domainModules.map((module) => (
                  <article key={module.id} style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                      <strong>{module.code}</strong>
                      <span className="status-pill">{module.band}</span>
                    </div>
                    <h3>{module.title}</h3>
                    <p className="metric-label">{module.module_type}</p>
                    <ul>
                      {Array.isArray(module.learning_objectives)
                        ? module.learning_objectives.map((objective: string) => <li key={objective}>{objective}</li>)
                        : null}
                    </ul>
                    <Link href={`/dashboard/curriculum/${module.id}`}>Open module →</Link>
                  </article>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </main>
  );
}
