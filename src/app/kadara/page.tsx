import Link from "next/link";
import { LanguageMenu } from "@/components/language-menu";
import { localizeHref, normalizeLanguage } from "@/lib/i18n6";

type PageProps = { searchParams?: Promise<{ lang?: string }> };

const tracks = [
  ["Agriculture", "Crop production, nursery systems, practical farm operations and production planning."],
  ["Food Processing", "Hygiene, handling, processing, preservation, packaging and production workflow."],
  ["Energy", "Foundational energy-system skills and practical applications for livelihood contexts."],
  ["Water", "Water management, pumping, irrigation fundamentals and efficient use."],
  ["Fabrication & Maintenance", "Tools, basic fabrication, repair, maintenance and practical workshop competence."],
  ["Digital", "Workplace digital skills, recordkeeping, digital productivity and technology-enabled livelihoods."],
  ["Enterprise", "Business models, costing, records, cooperatives, market readiness and microenterprise."],
] as const;

export default async function KadaraPage({ searchParams }: PageProps) {
  const params = searchParams ? await searchParams : {};
  const language = normalizeLanguage(params.lang);
  return (
    <div className="program-page-shell">
      <header className="program-topbar">
        <Link href={localizeHref("/", language)} className="program-brand-link"><img src="/lifews-mark.svg" alt="LIFEWS"/><div><strong>LIFEWS GreenSkills™</strong><span>Skills for Food • Energy • Water • Livelihoods</span></div></Link>
        <LanguageMenu currentLanguage={language}/>
      </header>
      <main>
        <section className="program-detail-hero kadara-hero">
          <div className="program-detail-number">02</div>
          <div><div className="gs-eyebrow">A LIFEWS GREENSKILLS™ PROGRAM</div><h1>LIFEWS Kadara™</h1><h2>Learn. Build. Earn.</h2><p>A practical skills, employability and enterprise program for older adolescents and young adults progressing toward work, self-employment, cooperatives and sustainable livelihoods.</p><div className="program-detail-actions"><a href="#tracks">Explore Kadara tracks</a><Link href={localizeHref("/", language)}>Back to GreenSkills</Link></div></div>
        </section>
        <section className="program-stage-band">{["DISCOVER","LEARN","PRACTICE","BUILD","EARN","LEAD"].map((step, i, arr) => <div key={step}><span>{step}</span>{i < arr.length - 1 && <b>→</b>}</div>)}</section>
        <section className="program-content-section" id="tracks">
          <div className="gs-section-heading"><div><div className="gs-eyebrow">KADARA TRACKS</div><h2>Skills connected to livelihood.</h2></div><p>Kadara houses LIFEWS agriculture-enterprise programming. Agriculture, processing, entrepreneurship, cooperatives and market-readiness are curriculum tracks inside Kadara rather than a separate top-level GreenSkills program.</p></div>
          <div className="track-card-grid">{tracks.map(([title, body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div>
        </section>
        <section className="fieldworks-callout"><div><div className="gs-eyebrow">LEARN BY DOING</div><h2>FieldWorks™</h2><p>Kadara participants build verified practical evidence through supervised assignments, AgriHub activities, workshops, processing centres, partner businesses, farms and community projects.</p></div><div className="fieldworks-metrics">{["Practical tasks","Field hours","Supervisor verification","Portfolio evidence","Work readiness"].map((item) => <span key={item}>{item}</span>)}</div></section>
      </main>
    </div>
  );
}
