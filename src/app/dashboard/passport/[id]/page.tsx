import Link from "next/link";
import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { addLearnerProject, addPassportGoal, awardEvidenceBackedBadge } from "../actions";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

type Goal = {
  id: string;
  goal_text: string;
  goal_area: string;
  target_date: string | null;
  status: string;
};

type Project = {
  id: string;
  title: string;
  project_type: string;
  description: string | null;
  status: string;
  completed_at: string | null;
};

type BadgeDefinition = {
  id: string;
  code: string;
  name: string;
  minimum_band: string;
  description: string;
};

type BadgeAward = {
  id: string;
  badge_id: string;
  awarded_at: string;
  evidence_note: string | null;
};

export default async function PassportPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();

  const [participantResult, goalsResult, projectsResult, badgeDefsResult, awardsResult, evidenceResult] = await Promise.all([
    supabase.from("participants").select("id, participant_code, preferred_name, track, band, primary_language, enrolled_at, active").eq("id", id).single(),
    supabase.from("passport_goals").select("id, goal_text, goal_area, target_date, status").eq("participant_id", id).order("created_at", { ascending: false }),
    supabase.from("learner_projects").select("id, title, project_type, description, status, completed_at").eq("participant_id", id).order("created_at", { ascending: false }),
    supabase.from("badges").select("id, code, name, minimum_band, description").eq("active", true).order("name"),
    supabase.from("participant_badges").select("id, badge_id, awarded_at, evidence_note").eq("participant_id", id).order("awarded_at", { ascending: false }),
    supabase.from("competency_evidence").select("id, competency_code, evidence_type, evidence_note, achieved, assessed_at").eq("participant_id", id).eq("achieved", true).order("assessed_at", { ascending: false }).limit(8),
  ]);

  const participant = participantResult.data;
  if (!participant) notFound();

  const goals = (goalsResult.data ?? []) as Goal[];
  const projects = (projectsResult.data ?? []) as Project[];
  const badgeDefinitions = (badgeDefsResult.data ?? []) as BadgeDefinition[];
  const awards = (awardsResult.data ?? []) as BadgeAward[];
  const awardedIds = new Set(awards.map((award) => award.badge_id));
  const availableBadges = badgeDefinitions.filter((badge) => !awardedIds.has(badge.id));
  const badgeById = new Map(badgeDefinitions.map((badge) => [badge.id, badge]));
  const achievedEvidence = evidenceResult.data ?? [];

  return (
    <main className="main">
      <div className="topbar">
        <div>
          <div className="eyebrow">Pathways Passport™</div>
          <h1>{participant.preferred_name}</h1>
          <p className="subtitle">{participant.participant_code} · {participant.track} · {participant.band}</p>
        </div>
        <Link className="status-pill" href={`/dashboard/participants/${id}`}>Learner profile →</Link>
      </div>

      <div className="grid metrics">
        <div className="card"><div className="metric-label">Active goals</div><div className="metric-value">{goals.filter((goal) => goal.status === "ACTIVE").length}</div></div>
        <div className="card"><div className="metric-label">Projects</div><div className="metric-value">{projects.length}</div></div>
        <div className="card"><div className="metric-label">Badges earned</div><div className="metric-value">{awards.length}</div></div>
        <div className="card"><div className="metric-label">Verified competencies</div><div className="metric-value">{achievedEvidence.length}</div></div>
      </div>

      <div className="grid section-grid" style={{ marginTop: 16 }}>
        <section className="card">
          <h2>My learning goals</h2>
          <form action={addPassportGoal} className="grid" style={{ gap: 10, marginBottom: 16 }}>
            <input type="hidden" name="participantId" value={id} />
            <input name="goalText" placeholder="Goal, e.g. read a short paragraph independently" required />
            <select name="goalArea" defaultValue="LITERACY">
              <option value="LITERACY">Literacy</option><option value="NUMERACY">Numeracy</option><option value="GROWMEAL">GrowMeal</option>
              <option value="FOOD">Food</option><option value="DIGITAL">Digital</option><option value="PRACTICAL">Practical</option>
              <option value="CAREER">Career</option><option value="OTHER">Other</option>
            </select>
            <input type="date" name="targetDate" />
            <button type="submit">Add goal</button>
          </form>
          {goals.length ? goals.map((goal) => (
            <div key={goal.id} style={{ padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
              <strong>{goal.goal_text}</strong>
              <div className="subtitle">{goal.goal_area} · {goal.status}{goal.target_date ? ` · target ${goal.target_date}` : ""}</div>
            </div>
          )) : <p className="subtitle">No Passport goals recorded yet.</p>}
        </section>

        <section className="card">
          <h2>Learner projects</h2>
          <form action={addLearnerProject} className="grid" style={{ gap: 10, marginBottom: 16 }}>
            <input type="hidden" name="participantId" value={id} />
            <input name="title" placeholder="Project title" required />
            <select name="projectType" defaultValue="LEARNING">
              <option value="LEARNING">Learning</option><option value="GROWMEAL">GrowMeal</option><option value="FOOD_DISCOVERY">Food Discovery</option>
              <option value="DIGITAL">Digital</option><option value="SKILLSBRIDGE">SkillsBridge</option><option value="COMMUNITY">Community</option><option value="OTHER">Other</option>
            </select>
            <textarea name="description" placeholder="What will the learner make, investigate or demonstrate?" rows={3} />
            <select name="status" defaultValue="IN_PROGRESS">
              <option value="PLANNED">Planned</option><option value="IN_PROGRESS">In progress</option><option value="COMPLETED">Completed</option>
            </select>
            <button type="submit">Add project</button>
          </form>
          {projects.length ? projects.map((project) => (
            <div key={project.id} style={{ padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
              <strong>{project.title}</strong>
              <div className="subtitle">{project.project_type} · {project.status}{project.completed_at ? ` · completed ${project.completed_at}` : ""}</div>
              {project.description ? <p>{project.description}</p> : null}
            </div>
          )) : <p className="subtitle">No projects recorded yet.</p>}
        </section>
      </div>

      <div className="grid section-grid" style={{ marginTop: 16 }}>
        <section className="card">
          <h2>Evidence-backed badges</h2>
          <form action={awardEvidenceBackedBadge} className="grid" style={{ gap: 10, marginBottom: 16 }}>
            <input type="hidden" name="participantId" value={id} />
            <select name="badgeId" required defaultValue="">
              <option value="" disabled>Select a badge</option>
              {availableBadges.map((badge) => <option key={badge.id} value={badge.id}>{badge.name} · {badge.minimum_band}</option>)}
            </select>
            <textarea name="evidenceNote" placeholder="Required: describe the demonstrated evidence for this badge" rows={3} required />
            <button type="submit" disabled={!availableBadges.length}>Award badge</button>
          </form>
          {awards.length ? awards.map((award) => {
            const badge = badgeById.get(award.badge_id);
            return (
              <div key={award.id} style={{ padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
                <strong>{badge?.name ?? "LIFEWS badge"}</strong>
                <div className="subtitle">Awarded {award.awarded_at.slice(0, 10)}</div>
                <p>{award.evidence_note ?? "Evidence recorded."}</p>
              </div>
            );
          }) : <p className="subtitle">No badges earned yet.</p>}
        </section>

        <section className="card">
          <h2>Recent competency evidence</h2>
          {achievedEvidence.length ? achievedEvidence.map((item) => (
            <div key={item.id} style={{ padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
              <strong>{item.competency_code}</strong>
              <div className="subtitle">{item.evidence_type} · {String(item.assessed_at).slice(0, 10)}</div>
              {item.evidence_note ? <p>{item.evidence_note}</p> : null}
            </div>
          )) : <p className="subtitle">No achieved competencies recorded yet.</p>}
        </section>
      </div>

      <div className="card" style={{ marginTop: 16, borderLeft: "4px solid var(--green)" }}>
        <strong>Credential integrity</strong>
        <p className="subtitle">A LIFEWS badge records demonstrated learning or competency. Attendance alone is not sufficient evidence for an award.</p>
      </div>
    </main>
  );
}
