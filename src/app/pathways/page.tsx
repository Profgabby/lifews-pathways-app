import Link from "next/link";
import { LanguageMenu } from "@/components/language-menu";
import { localizeHref, normalizeLanguage } from "@/lib/i18n6";

type PageProps = { searchParams?: Promise<{ lang?: string }> };

const audiences = ["Almajiri learners", "Never-enrolled children", "Out-of-school children", "Out-of-school girls", "School dropouts", "Over-age learners", "Underserved adolescents", "Transitioning youth"];
const learningAreas = [
  ["Foundational Learning", "Flexible literacy, numeracy, science, digital and life-skills learning adapted to the learner's assessed starting point."],
  ["GrowMeal™ Practical Learning", "Age-appropriate food-growing activities connecting learning with observation, responsibility and practical problem solving."],
  ["Food Literacy", "Ingredient discovery, hygiene, food systems, preparation and informed everyday food choices."],
  ["Projects & Challenges", "Structured activities that turn foundational knowledge into practical application and evidence of progress."],
  ["Digital Foundations", "Progressive digital literacy and responsible technology use appropriate to age, access and learning readiness."],
  ["Transition Planning", "Verified progression into school, continuing education, Kadara, apprenticeships or other age-appropriate next destinations."],
] as const;

export default async function PathwaysPage({ searchParams }: PageProps) {
  const params = searchParams ? await searchParams : {};
  const language = normalizeLanguage(params.lang);
  const rtl = language === "ar";

  return (
    <div className="shell public-shell" dir={rtl ? "rtl" : "ltr"}>
      <aside className="sidebar compact-sidebar">
        <Link href={localizeHref("/", language)} className="brand-lockup">
          <img className="brand-logo" src="/lifews-mark.svg" alt="LIFEWS logo" />
          <div className="brand">LIFEWS Pathways™<small>A GreenSkills™ Program</small></div>
        </Link>
        <LanguageMenu currentLanguage={language} />
        <nav className="nav" aria-label="Pathways navigation">
          <Link href={localizeHref("/", language)}>GreenSkills</Link>
          <Link className="active" href={localizeHref("/pathways", language)}>Pathways Home</Link>
          <Link href={localizeHref("/learner", language)}>Learner space</Link>
          <Link href={localizeHref("/login", language)}>Staff workspace</Link>
          <a href="#overview">Program overview</a>
        </nav>
        <div className="sidebar-note">Learning • Skills • Opportunity • Transition</div>
      </aside>

      <main className="main public-main">
        <header className="hero-simple">
          <div className="eyebrow">A LIFEWS GREENSKILLS™ PROGRAM</div>
          <h1>LIFEWS Pathways™</h1>
          <p className="hero-line">Learning • Skills • Opportunity • Transition</p>
          <p className="subtitle hero-copy">An inclusive learning and transition program for Almajiri learners, out-of-school children and girls, never-enrolled learners, school dropouts, over-age learners, underserved adolescents and transitioning youth.</p>
          <div className="hero-actions">
            <Link className="primary-action" href={localizeHref("/learner", language)}>Enter learner space</Link>
            <Link className="gold-action" href={localizeHref("/login", language)}>Staff sign in</Link>
          </div>
        </header>

        <section className="gold-strip" aria-label="Pathways journey">
          {['REACH','ASSESS','LEARN','GROW','BUILD','TRANSITION','THRIVE'].map((step, i, arr) => <span key={step}>{step}{i < arr.length - 1 && <b> → </b>}</span>)}
        </section>

        <section className="entry-grid" id="overview">
          <article className="entry-card learner-entry"><div className="entry-kicker">FOR LEARNERS</div><h2>Learn, grow and build your Skills Passport</h2><p>Use age-appropriate learning, GrowMeal activities, food discovery, projects, challenges and progress milestones.</p><Link href={localizeHref("/learner", language)}>Open learner space →</Link></article>
          <article className="entry-card staff-entry"><div className="entry-kicker">FOR EDUCATORS & PROGRAM STAFF</div><h2>Manage learning and verified transitions</h2><p>Authorized staff can enroll learners, record evidence, manage safeguarding, support education re-entry and verify transitions.</p><Link href={localizeHref("/login", language)}>Open staff workspace →</Link></article>
        </section>

        <section className="simple-section"><div><div className="eyebrow">WHO PATHWAYS SERVES</div><h2>Flexible routes back into learning and opportunity</h2></div><div className="audience-pills">{audiences.map((audience) => <span key={audience}>{audience}</span>)}</div></section>

        <section className="program-summary-grid">{learningAreas.map(([title, body]) => <article key={title}><div className="gold-rule"/><h3>{title}</h3><p>{body}</p></article>)}</section>

        <section className="pathways-transition-panel">
          <div className="eyebrow">TRANSITION IS THE OUTCOME</div><h2>Pathways does not force every learner into the same destination.</h2>
          <div className="transition-route-grid">
            <article><span>CHILD / YOUNGER LEARNER</span><strong>Pathways → Education</strong><p>Formal-school re-entry, approved alternative education or continuing learning.</p></article>
            <article><span>OLDER ADOLESCENT</span><strong>Pathways → Kadara</strong><p>Vocational skills, livelihood preparation and employability.</p></article>
            <article><span>ADVANCING PARTICIPANT</span><strong>Kadara → GreenTech</strong><p>Advanced technical FEW-system competence and certification.</p></article>
          </div>
        </section>

        <footer className="program-footer simplified-footer"><img src="/lifews-mark.svg" alt="LIFEWS logo"/><div><strong>LIFEWS Pathways™</strong><span>A LIFEWS GreenSkills™ Program</span></div></footer>
      </main>
    </div>
  );
}
