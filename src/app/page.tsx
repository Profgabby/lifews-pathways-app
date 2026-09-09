import Link from "next/link";

const audiences = [
  "Almajiri learners",
  "Out-of-school children",
  "Out-of-school girls",
  "Underserved adolescents",
  "Transitioning young adults",
];

const navItems = [
  ["Home", "/"],
  ["Learner space", "/learner"],
  ["Staff workspace", "/login"],
  ["Program overview", "#overview"],
];

export default function HomePage() {
  return (
    <div className="shell public-shell">
      <aside className="sidebar compact-sidebar">
        <div className="brand-lockup">
          <img className="brand-logo" src="/lifews-mark.svg" alt="LIFEWS logo" />
          <div className="brand">
            LIFEWS Pathways
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

        <div className="sidebar-note">Learning • Skills • Agriculture • Transition</div>
      </aside>

      <main className="main public-main">
        <header className="hero-simple">
          <div className="eyebrow">A program developed by LIFEWS</div>
          <h1>LIFEWS Pathways</h1>
          <p className="hero-line">Learning • Skills • Agriculture • Enterprise • Transition</p>
          <p className="subtitle hero-copy">
            A practical learning and transition program for Almajiri learners, out-of-school
            children and girls, underserved adolescents and transitioning young adults.
          </p>
          <div className="hero-actions">
            <Link className="primary-action" href="/learner">Enter learner space</Link>
            <Link className="gold-action" href="/login">Staff sign in</Link>
          </div>
        </header>

        <section className="gold-strip" aria-label="LIFEWS pathway">
          <span>REACH</span><b>→</b><span>ASSESS</span><b>→</b><span>LEARN</span><b>→</b><span>GROW</span><b>→</b><span>BUILD</span><b>→</b><span>TRANSITION</span><b>→</b><span>THRIVE</span>
        </section>

        <section className="entry-grid" id="overview">
          <article className="entry-card learner-entry">
            <div className="entry-kicker">For learners</div>
            <h2>Learn, grow and build your Pathways Passport</h2>
            <p>Use age-appropriate learning activities, GrowMeal tasks, food discovery, projects, challenges and progress milestones.</p>
            <Link href="/learner">Open learner space →</Link>
          </article>

          <article className="entry-card staff-entry">
            <div className="entry-kicker">For educators and program staff</div>
            <h2>Manage learning, attendance and verified transitions</h2>
            <p>Authorized staff can enroll learners, record evidence, manage safeguarding, support transitions and review program performance.</p>
            <Link href="/login">Open staff workspace →</Link>
          </article>
        </section>

        <section className="simple-section">
          <div>
            <div className="eyebrow">Who the program serves</div>
            <h2>Inclusive pathways into learning and opportunity</h2>
          </div>
          <div className="audience-pills">
            {audiences.map((audience) => <span key={audience}>{audience}</span>)}
          </div>
        </section>

        <section className="program-summary-grid">
          <article>
            <div className="gold-rule" />
            <h3>Almajiri Learning & Livelihood Pathway</h3>
            <p>Education, practical skills, agriculture and transition support.</p>
          </article>
          <article>
            <div className="gold-rule" />
            <h3>Girls Learning & Enterprise Pathway</h3>
            <p>Learning, safeguarding, practical skills and future opportunity.</p>
          </article>
          <article>
            <div className="gold-rule" />
            <h3>General Out-of-School Pathway</h3>
            <p>Flexible re-entry, competency building and positive transition planning.</p>
          </article>
        </section>

        <footer className="program-footer simplified-footer">
          <img src="/lifews-mark.svg" alt="LIFEWS logo" />
          <div><strong>LIFEWS Pathways</strong><span>Developed by LIFEWS.</span></div>
        </footer>
      </main>
    </div>
  );
}
