const metrics = [
  ["Active learners", "—"],
  ["Attendance today", "—"],
  ["Badges awarded", "—"],
  ["Verified transitions", "—"],
];

const stages = [
  ["Discover™", "Approx. 6–9"],
  ["Explore™", "Approx. 10–12"],
  ["Build™", "Approx. 13–15"],
  ["Transition™", "Approx. 16–17"],
  ["Enterprise™", "18+"],
];

export default function HomePage() {
  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand">
          LIFEWS Pathways™
          <small>From Learning to Opportunity</small>
        </div>
        <nav className="nav" aria-label="Primary navigation">
          <a className="active" href="#dashboard">Dashboard</a>
          <a href="#learners">Learners</a>
          <a href="#attendance">Attendance</a>
          <a href="#curriculum">Curriculum</a>
          <a href="#growmeal">GrowMeal™</a>
          <a href="#passport">Pathways Passport™</a>
          <a href="#safeguarding">Safeguarding</a>
          <a href="#transitions">Transitions</a>
          <a href="#reports">Reports</a>
        </nav>
      </aside>

      <main className="main" id="dashboard">
        <header className="topbar">
          <div>
            <div className="eyebrow">Program operations</div>
            <h1>Pathways Dashboard</h1>
            <p className="subtitle">
              A mobile-first operating system for learning, GrowMeal™ activities,
              safeguarding, competency evidence and verified transitions.
            </p>
          </div>
          <div className="status-pill">Foundation build • develop branch</div>
        </header>

        <section className="grid metrics" aria-label="Program metrics">
          {metrics.map(([label, value]) => (
            <article className="card" key={label}>
              <div className="metric-label">{label}</div>
              <div className="metric-value">{value}</div>
            </article>
          ))}
        </section>

        <section className="grid section-grid">
          <article className="card">
            <div className="section-title">
              <h2>Developmental pathway</h2>
              <span className="eyebrow">Age + competency + need + context</span>
            </div>
            <div className="pathway">
              {stages.map(([name, age]) => (
                <div className="stage" key={name}>
                  <b>{name}</b>
                  <span>{age}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="card" id="safeguarding">
            <div className="section-title"><h2>Safeguarding firewall</h2></div>
            <div className="alert safeguard">
              Children are learners first. No child participant may be assigned
              commercial sales targets or commission-based selling activities.
              Adult enterprise pathways are voluntary and separated from child programming.
            </div>
          </article>
        </section>

        <section className="grid section-grid">
          <article className="card" id="curriculum">
            <div className="section-title"><h2>Core program modules</h2></div>
            <div className="list">
              <div className="list-row"><div><strong>Learning & assessment</strong><small>Enrollment, baseline, literacy, numeracy and progression</small></div><span>Planned</span></div>
              <div className="list-row"><div><strong>GrowMeal™</strong><small>Garden stations, activities and competency evidence</small></div><span>Planned</span></div>
              <div className="list-row"><div><strong>Food Discovery Lab™</strong><small>Ingredient, label, hygiene and food-system learning</small></div><span>Planned</span></div>
              <div className="list-row"><div><strong>SkillsBridge™</strong><small>Practical skills exploration for older adolescents</small></div><span>Planned</span></div>
              <div className="list-row"><div><strong>Pathways Passport™</strong><small>Badges, projects, competencies and next-pathway planning</small></div><span>Planned</span></div>
            </div>
          </article>

          <article className="card" id="transitions">
            <div className="section-title"><h2>Positive transitions</h2></div>
            <div className="list">
              <div className="list-row"><strong>Education</strong><span>→</span></div>
              <div className="list-row"><strong>Vocational training</strong><span>→</span></div>
              <div className="list-row"><strong>Apprenticeship</strong><span>→</span></div>
              <div className="list-row"><strong>Agriculture / employment</strong><span>→</span></div>
              <div className="list-row"><strong>Adult enterprise</strong><span>18+</span></div>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}
