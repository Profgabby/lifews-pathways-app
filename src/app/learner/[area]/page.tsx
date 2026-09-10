import Link from "next/link";
import { notFound } from "next/navigation";
import { LanguageMenu } from "@/components/language-menu";
import { learnerCopy, localizeHref, normalizeLanguage } from "@/lib/i18n6";
import { getCommonCopy } from "@/lib/greenskills-i18n";

const learnerAreas = [
  "learning",
  "growmeal",
  "food-discovery",
  "passport",
  "challenges",
  "future",
] as const;

type LearnerArea = (typeof learnerAreas)[number];

type LearnerAreaPageProps = {
  params: Promise<{ area: string }>;
  searchParams?: Promise<{ lang?: string }>;
};

function isLearnerArea(value: string): value is LearnerArea {
  return learnerAreas.includes(value as LearnerArea);
}

export default async function LearnerAreaPage({ params, searchParams }: LearnerAreaPageProps) {
  const [{ area }, query] = await Promise.all([
    params,
    searchParams ?? Promise.resolve({}),
  ]);

  if (!isLearnerArea(area)) notFound();

  const language = normalizeLanguage(query.lang);
  const copy = learnerCopy[language];
  const common = getCommonCopy(language);
  const index = learnerAreas.indexOf(area);
  const [title, description] = copy.areas[index];
  const rtl = language === "ar";

  return (
    <main className="learner-page" dir={rtl ? "rtl" : "ltr"} lang={language}>
      <header className="learner-header">
        <Link className="learner-brand" href={localizeHref("/learner", language)}>
          <img src="/lifews-mark.svg" alt="LIFEWS logo" />
          <div><strong>LIFEWS Pathways</strong><span>{common.learnerSpace}</span></div>
        </Link>
        <div className="learner-header-actions">
          <LanguageMenu currentLanguage={language} />
          <Link className="text-link" href={localizeHref("/learner", language)}>{common.learnerSpace}</Link>
        </div>
      </header>

      <section className="learner-hero">
        <div className="eyebrow">{String(index + 1).padStart(2, "0")} / 06</div>
        <h1>{title}</h1>
        <p>{description}</p>
        <div className="learner-mode-note">{copy.privacy}</div>
      </section>

      <section className="learner-bottom-card">
        <div>
          <div className="eyebrow">{copy.journey}</div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <Link className="primary-action" href={localizeHref("/learner", language)}>{common.learnerSpace}</Link>
      </section>
    </main>
  );
}
