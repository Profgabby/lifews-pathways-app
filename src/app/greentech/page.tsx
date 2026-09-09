import Link from "next/link";
import { LanguageMenu } from "@/components/language-menu";
import { localizeHref, normalizeLanguage } from "@/lib/i18n6";

type PageProps = { searchParams?: Promise<{ lang?: string }> };

const courses = [
  ["GT-101", "Photovoltaic Fundamentals"],
  ["GT-102", "PV Installation & Safety"],
  ["GT-201", "Water Pumping Systems"],
  ["GT-202", "Drip Irrigation Installation"],
  ["GT-301", "Agrivoltaic Systems Technician"],
  ["GT-302", "Integrated FEW Systems Installation"],
  ["GT-401", "Sensors & Field Monitoring"],
  ["GT-402", "CHIPU Controls Technician"],
  ["GT-501", "Operations & Maintenance"],
] as const;

export default async function GreenTechPage({ searchParams }: PageProps) {
  const params = searchParams ? await searchParams : {};
  const language = normalizeLanguage(params.lang);
  return (
    <div className="program-page-shell">
      <header className="program-topbar">
        <Link href={localizeHref("/", language)} className="program-brand-link"><img src="/lifews-mark.svg" alt="LIFEWS"/><div><strong>LIFEWS GreenSkills™</strong><span>Skills for Food • Energy • Water • Livelihoods</span></div></Link>
        <LanguageMenu currentLanguage={language}/>
      </header>
      <main>
        <section className="program-detail-hero greentech-hero">
          <div className="program-detail-number">03</div>
          <div><div className="gs-eyebrow">TECHNICAL TRAINING & CERTIFICATION</div><h1>LIFEWS GreenTech™</h1><h2>Train. Certify. Deploy.</h2><p>Competency-based technical preparation for people who install, operate, monitor and maintain integrated food-energy-water systems.</p><div className="program-detail-actions"><a href="#courses">View technical pathways</a><Link href={localizeHref("/", language)}>Back to GreenSkills</Link></div></div>
        </section>
        <section className="program-stage-band">{["ORIENT","TRAIN","PRACTICE","ASSESS","CERTIFY","DEPLOY"].map((step, i, arr) => <div key={step}><span>{step}</span>{i < arr.length - 1 && <b>→</b>}</div>)}</section>
        <section className="program-content-section" id="courses">
          <div className="gs-section-heading"><div><div className="gs-eyebrow">TECHNICAL PATHWAYS</div><h2>Training built around real systems.</h2></div><p>GreenTech progressively connects training and assessment to LIFEWS AgriHubs™, Grow Systems™, FEW™ products and CHIPU™ controls.</p></div>
          <div className="technical-course-grid">{courses.map(([code, title]) => <article key={code}><span>{code}</span><h3>{title}</h3></article>)}</div>
        </section>
        <section className="fieldworks-callout"><div><div className="gs-eyebrow">COMPETENCE, NOT ATTENDANCE</div><h2>Certification requires evidence.</h2><p>Course completion alone should not establish GreenTech competence. Certification can combine knowledge assessment, practical assessment, verified FieldWorks hours, supervisor evidence and portfolio demonstrations.</p></div><div className="fieldworks-metrics">{["Knowledge assessment","Practical assessment","FieldWorks hours","Portfolio evidence","Trainer verification","Certification status"].map((item) => <span key={item}>{item}</span>)}</div></section>
      </main>
    </div>
  );
}
