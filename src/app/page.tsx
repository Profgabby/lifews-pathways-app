import Link from "next/link";

const metrics = [
  ["Learners reached", "—"],
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

const groups = [
  ["Almajiri learners", "Structured learning, practical agriculture, life skills and transition support."],
  ["Out-of-school children", "Flexible pathways back into learning, skills development and positive progression."],
  ["Out-of-school girls", "Learning, confidence, practical skills, safeguarding and age-appropriate transition planning."],
  ["Underserved adolescents", "Competency development, vocational exploration, agriculture and digital foundations."],
  ["Transitioning young adults", "Education, training, employment, agriculture and voluntary adult enterprise pathways."],
];

const navItems = [
  ["Dashboard", "/"],
  ["Enrollment", "/dashboard/enrollment"],
  ["Learners", "/dashboard/participants"],
  ["Attendance", "/dashboard/attendance"],
  ["Curriculum", "/dashboard/curriculum"],
  ["GrowMeal™", "/dashboard/growmeal"],
  ["Pathways Passport™", "/dashboard/passport"],
  ["Safeguarding", "/dashboard/safeguarding"],
  ["Transitions", "/dashboard/transitions"],
  ["Reports", "/dashboard/analytics"],
];

export default function HomePage() {
  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand-lockup">
          <img className="brand-logo" src="/lifews-logo.svg" alt="LIFEWS logo" />
          <div className="brand">
            LIFEWS Pathways™
            <small>From Learning to Opportunity</small>
          </div>
        </div>
        <nav className="nav" aria-label="Primary navigation">
          {navItems.map(([label, href], index) => (
            <Link className={index === 0 ? "active" : undefined} href={href} key={href}>
              {label}
            </Link>
          ))}
        </nav>
        <Link className="login-link" href="/login">Staff sign in →</Link>
      </aside>

      <main className="main" id="dashboard">
        <header className="topbar">
          <div>
            <div className="eyebrow">A program developed by LIFEWS</div>
            <h1>LIFEWS Pathways™</h1>
            <p className="hero-line">Learning • Skills • Agriculture • Enterprise • Transition</p>
            <p className="subtitle">
              A mobile-first program and operating system supporting Almajiri learners,
              out-of-school children and girls, underserved adolescents and transitioning
              young adults through structured learning, practical skills, agriculture,
              safeguarding and verified transitions.
            </p>
          </div>
          <div className="status-pill">Staging • develop branch</div>
        </header>

        <section className="intro-banner">
          <div>
            <div className="eyebrow">Core pathway</div>
            <strong>REACH → ASSESS → LEARN → GROW → BUILD → TRANSITION → THRIVE</strong>
          </div>
          <Link className="primary-action" href="/dashboard/enrollment">Open program workspace</Link>
        </section>

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
              <h2>Who LIFEWS Pathways™ serves</h2>
              <span className="eyebrow">Inclusive access</span>
            </div>
            <div className="audience-grid">
              {groups.map(([name, description]) => (
                <div className="audience-item" key={name}>
                  <strong>{name}</strong>
                  <span>{description}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="card">
            <div className="section-title"><h2>Program tracks</h2></div>
            <div className="list">
              <div className="list-row"><div><strong>Almajiri Learning & Livelihood Pathway</strong><small>Education, skills, agriculture and transition support.</small></div></div>
              <div className="list-row"><div><strong>Girls Learning & Enterprise Pathway</strong><small>Learning, safeguarding, skills and future opportunity.</small></div></div>
              <div className="list-row"><div><strong>General Out-of-School Pathway</strong><small>Flexible re-entry, competency building and transition planning.</small></div></div>
            </div>
          </article>
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
              <Link className="list-row" href="/dashboard/enrollment"><div><strong>Learning & assessment</strong><small>Enrollment, baseline, literacy, numeracy and progression</small></div><span>→</span></Link>
              <Link className="list-row" href="/dashboard/growmeal"><div><strong>GrowMeal™</strong><small>Garden stations, activities and competency evidence</small></div><span>→</span></Link>
              <Link className="list-row" href="/dashboard/food-discovery"><div><strong>Food Discovery Lab™</strong><small>Ingredient, label, hygiene and food-system learning</small></div><span>→</span></Link>
              <Link className="list-row" href="/dashboard/learning"><div><strong>SkillsBridge™</strong><small>Practical skills exploration for older adolescents</small></div><span>→</span></Link>
              <Link className="list-row" href="/dashboard/passport"><div><strong>Pathways Passport™</strong><small>Badges, projects, competencies and next-pathway planning</small></div><span>→</span></Link>
            </div>
          </article>

          <article className="card" id="transitions">
            <div className="section-title"><h2>Positive transitions</h2></div>
            <div className="list">
              <Link className="list-row" href="/dashboard/transitions"><strong>Formal / alternative education</strong><span>→</span></Link>
              <Link className="list-row" href="/dashboard/transitions"><strong>Vocational training</strong><span>→</span></Link>
              <Link className="list-row" href="/dashboard/transitions"><strong>Apprenticeship</strong><span>→</span></Link>
              <Link className="list-row" href="/dashboard/transitions"><strong>Agriculture / employment</strong><span>→</span></Link>
              <Link className="list-row" href="/dashboard/transitions"><strong>Voluntary adult enterprise</strong><span>18+</span></Link>
            </div>
          </article>
        </section>

        <footer className="program-footer">
          <img src="/lifews-logo.svg" alt="LIFEWS logo" />
          <div><strong>LIFEWS Pathways™</strong><span>Developed by LIFEWS to connect learning with practical capability and positive transition.</span></div>
        </footer>
      </main>
    </div>
  );
}
