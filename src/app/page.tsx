import Link from "next/link";
import { LanguageMenu } from "@/components/language-menu";
import { homeCopy, localizeHref, normalizeLanguage } from "@/lib/i18n6";

type HomePageProps = {
  searchParams?: Promise<{ lang?: string }>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = searchParams ? await searchParams : {};
  const language = normalizeLanguage(params.lang);
  const copy = homeCopy[language];
  const rtl = language === "ar";

  const navItems = [
    [copy.nav[0], localizeHref("/", language)],
    [copy.nav[1], localizeHref("/learner", language)],
    [copy.nav[2], localizeHref("/login", language)],
    [copy.nav[3], "#overview"],
  ];

  return (
    <div className="shell public-shell" dir={rtl ? "rtl" : "ltr"}>
      <aside className="sidebar compact-sidebar">
        <div className="brand-lockup">
          <img className="brand-logo" src="/lifews-mark.svg" alt="LIFEWS logo" />
          <div className="brand">
            LIFEWS Pathways
            <small>{copy.tagline}</small>
          </div>
        </div>

        <LanguageMenu currentLanguage={language} />

        <nav className="nav" aria-label="Primary navigation">
          {navItems.map(([label, href], index) => (
            <Link className={index === 0 ? "active" : undefined} href={href} key={href}>
              {label}
            </Link>
          ))}
        </nav>

        <div className="sidebar-note">{copy.pillars.replace(" • Enterprise", "")}</div>
      </aside>

      <main className="main public-main">
        <header className="hero-simple">
          <div className="eyebrow">{copy.developed}</div>
          <h1>{copy.title}</h1>
          <p className="hero-line">{copy.pillars}</p>
          <p className="subtitle hero-copy">{copy.intro}</p>
          <div className="hero-actions">
            <Link className="primary-action" href={localizeHref("/learner", language)}>{copy.learnerButton}</Link>
            <Link className="gold-action" href={localizeHref("/login", language)}>{copy.staffButton}</Link>
          </div>
        </header>

        <section className="gold-strip" aria-label="LIFEWS pathway">
          <span>REACH</span><b>→</b><span>ASSESS</span><b>→</b><span>LEARN</span><b>→</b><span>GROW</span><b>→</b><span>BUILD</span><b>→</b><span>TRANSITION</span><b>→</b><span>THRIVE</span>
        </section>

        <section className="entry-grid" id="overview">
          <article className="entry-card learner-entry">
            <div className="entry-kicker">{copy.learnerKicker}</div>
            <h2>{copy.learnerTitle}</h2>
            <p>{copy.learnerBody}</p>
            <Link href={localizeHref("/learner", language)}>{copy.learnerLink}</Link>
          </article>

          <article className="entry-card staff-entry">
            <div className="entry-kicker">{copy.staffKicker}</div>
            <h2>{copy.staffTitle}</h2>
            <p>{copy.staffBody}</p>
            <Link href={localizeHref("/login", language)}>{copy.staffLink}</Link>
          </article>
        </section>

        <section className="simple-section">
          <div>
            <div className="eyebrow">{copy.servesKicker}</div>
            <h2>{copy.servesTitle}</h2>
          </div>
          <div className="audience-pills">
            {copy.audiences.map((audience) => <span key={audience}>{audience}</span>)}
          </div>
        </section>

        <section className="program-summary-grid">
          {copy.tracks.map(([title, body]) => (
            <article key={title}>
              <div className="gold-rule" />
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </section>

        <footer className="program-footer simplified-footer">
          <img src="/lifews-mark.svg" alt="LIFEWS logo" />
          <div><strong>LIFEWS Pathways</strong><span>{copy.footer}</span></div>
        </footer>
      </main>
    </div>
  );
}
