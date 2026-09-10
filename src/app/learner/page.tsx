import Link from "next/link";
import { LanguageMenu } from "@/components/language-menu";
import { learnerCopy, localizeHref, normalizeLanguage } from "@/lib/i18n6";

const learnerAreas = [
  "learning",
  "growmeal",
  "food-discovery",
  "passport",
  "challenges",
  "future",
] as const;

type LearnerPageProps = {
  searchParams?: Promise<{ lang?: string }>;
};

export default async function LearnerPage({ searchParams }: LearnerPageProps) {
  const params = searchParams ? await searchParams : {};
  const language = normalizeLanguage(params.lang);
  const copy = learnerCopy[language];
  const rtl = language === "ar";

  return (
    <main className="learner-page" dir={rtl ? "rtl" : "ltr"} lang={language}>
      <header className="learner-header">
        <Link className="learner-brand" href={localizeHref("/", language)}>
          <img src="/lifews-mark.svg" alt="LIFEWS logo" />
          <div><strong>LIFEWS Pathways</strong><span>Learner Space</span></div>
        </Link>
        <div className="learner-header-actions">
          <LanguageMenu currentLanguage={language} />
          <Link className="text-link" href={localizeHref("/", language)}>{copy.back}</Link>
        </div>
      </header>

      <section className="learner-hero">
        <div className="eyebrow">{copy.journey}</div>
        <h1>{copy.title}</h1>
        <p>{copy.intro}</p>
        <div className="learner-mode-note">{copy.privacy}</div>
      </section>

      <section className="learner-grid">
        {copy.areas.map(([title, description], index) => (
          <Link
            className={index % 3 === 1 ? "learner-tile gold-tile" : "learner-tile"}
            href={localizeHref(`/learner/${learnerAreas[index]}`, language)}
            key={title}
          >
            <span className="tile-number">{String(index + 1).padStart(2, "0")}</span>
            <h2>{title}</h2>
            <p>{description}</p>
            <span className="tile-action">{copy.explore}</span>
          </Link>
        ))}
      </section>

      <section className="learner-bottom-card">
        <div>
          <div className="eyebrow">{copy.younger}</div>
          <h2>{copy.assistedTitle}</h2>
          <p>{copy.assistedBody}</p>
        </div>
        <Link className="primary-action" href={localizeHref("/login", language)}>{copy.educator}</Link>
      </section>
    </main>
  );
}
