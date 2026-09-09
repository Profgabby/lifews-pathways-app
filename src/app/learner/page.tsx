import Link from "next/link";

const learnerAreas = [
  ["My Learning", "Literacy, numeracy, science, digital and life-skills activities."],
  ["GrowMeal", "Garden missions, observation tasks and practical food-production learning."],
  ["Food Discovery", "Ingredients, hygiene, labels and food-system activities."],
  ["My Passport", "Projects, badges, competencies and progress milestones."],
  ["Challenges", "Short missions that turn learning into practical problem solving."],
  ["My Future", "Explore education, training, agriculture, apprenticeships and careers."],
];

export default function LearnerPage() {
  return (
    <main className="learner-page">
      <header className="learner-header">
        <Link className="learner-brand" href="/">
          <img src="/lifews-mark.svg" alt="LIFEWS logo" />
          <div><strong>LIFEWS Pathways</strong><span>Learner Space</span></div>
        </Link>
        <Link className="text-link" href="/">Back to home</Link>
      </header>

      <section className="learner-hero">
        <div className="eyebrow">Your learning journey</div>
        <h1>Learn. Grow. Build. Move forward.</h1>
        <p>Use this space for learning activities, practical missions, projects and your Pathways Passport.</p>
        <div className="learner-mode-note">Personal progress will use a secure learner access code. No public page exposes a learner&apos;s private record.</div>
      </section>

      <section className="learner-grid">
        {learnerAreas.map(([title, description], index) => (
          <article className={index % 3 === 1 ? "learner-tile gold-tile" : "learner-tile"} key={title}>
            <span className="tile-number">{String(index + 1).padStart(2, "0")}</span>
            <h2>{title}</h2>
            <p>{description}</p>
            <span className="tile-action">Explore →</span>
          </article>
        ))}
      </section>

      <section className="learner-bottom-card">
        <div>
          <div className="eyebrow">For younger learners</div>
          <h2>Teacher-assisted and group learning are supported.</h2>
          <p>Educators can guide activities on a shared device, while older learners can progressively use their own secure learner access.</p>
        </div>
        <Link className="primary-action" href="/login">Educator sign in</Link>
      </section>
    </main>
  );
}
