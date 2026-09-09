import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { enrollmentSchema } from "@/lib/validation/enrollment";

async function enrollParticipant(formData: FormData) {
  "use server";

  const parsed = enrollmentSchema.safeParse({
    preferredName: formData.get("preferredName"),
    dateOfBirth: formData.get("dateOfBirth"),
    estimatedAgeYears: formData.get("estimatedAgeYears") || undefined,
    track: formData.get("track"),
    band: formData.get("band"),
    primaryLanguage: formData.get("primaryLanguage"),
    guardianName: formData.get("guardianName"),
    guardianRelationship: formData.get("guardianRelationship"),
    guardianPhone: formData.get("guardianPhone"),
    literacyLevel: formData.get("literacyLevel"),
    numeracyLevel: formData.get("numeracyLevel"),
    digitalLevel: formData.get("digitalLevel"),
    appliedSkillsLevel: formData.get("appliedSkillsLevel"),
    strengths: formData.get("strengths"),
    priorityNeeds: formData.get("priorityNeeds"),
  });

  if (!parsed.success) {
    redirect(`/dashboard/enrollment?error=${encodeURIComponent("Please review the enrollment fields.")}`);
  }

  const input = parsed.data;
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const participantCode = `LP-${new Date().getFullYear()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;

  const { error } = await supabase.rpc("enroll_pathways_participant", {
    p_participant_code: participantCode,
    p_preferred_name: input.preferredName,
    p_date_of_birth: input.dateOfBirth,
    p_estimated_age_years: input.estimatedAgeYears ?? null,
    p_track: input.track,
    p_band: input.band,
    p_primary_language: input.primaryLanguage ?? "",
    p_guardian_name: input.guardianName ?? "",
    p_guardian_relationship: input.guardianRelationship ?? "",
    p_guardian_phone: input.guardianPhone ?? "",
    p_literacy_level: input.literacyLevel,
    p_numeracy_level: input.numeracyLevel,
    p_digital_level: input.digitalLevel,
    p_applied_skills_level: input.appliedSkillsLevel,
    p_strengths: input.strengths ?? "",
    p_priority_needs: input.priorityNeeds ?? "",
  });

  if (error) {
    redirect(`/dashboard/enrollment?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/dashboard/enrollment");
  redirect(`/dashboard/enrollment?success=${encodeURIComponent(participantCode)}`);
}

const fieldStyle = {
  width: "100%",
  padding: 11,
  borderRadius: 10,
  border: "1px solid var(--border)",
} as const;

export default async function EnrollmentPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; success?: string }>;
}) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { error, success } = await searchParams;

  return (
    <main className="main">
      <div className="topbar">
        <div>
          <div className="eyebrow">Enrollment & Baseline</div>
          <h1>Enroll a Pathways participant</h1>
          <p className="subtitle">Create a participant record, capture guardian details where appropriate, and record the initial learning baseline.</p>
        </div>
        <div className="status-pill">Age + competency + need + context</div>
      </div>

      {error ? <div className="card" style={{ color: "var(--danger)", marginBottom: 16, fontWeight: 700 }}>{error}</div> : null}
      {success ? <div className="card" style={{ color: "var(--green-deep)", marginBottom: 16, fontWeight: 700 }}>Enrollment complete. Participant code: {success}</div> : null}

      <form action={enrollParticipant} className="card" style={{ display: "grid", gap: 22 }}>
        <section>
          <h2>1. Participant profile</h2>
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))" }}>
            <label>Preferred name<input name="preferredName" required style={fieldStyle} /></label>
            <label>Date of birth<input name="dateOfBirth" type="date" style={fieldStyle} /></label>
            <label>Estimated age<input name="estimatedAgeYears" type="number" min="0" max="120" style={fieldStyle} /></label>
            <label>Program track<select name="track" defaultValue="GENERAL" style={fieldStyle}><option value="GENERAL">General</option><option value="ALMAJIRI">Almajiri</option><option value="GIRLS">Girls</option></select></label>
            <label>Developmental band<select name="band" defaultValue="DISCOVER" style={fieldStyle}><option value="DISCOVER">Discover™</option><option value="EXPLORE">Explore™</option><option value="BUILD">Build™</option><option value="TRANSITION">Transition™</option><option value="ENTERPRISE">Enterprise™ (18+)</option></select></label>
            <label>Primary language<input name="primaryLanguage" placeholder="e.g. Hausa" style={fieldStyle} /></label>
          </div>
        </section>

        <section>
          <h2>2. Guardian or authorized contact</h2>
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))" }}>
            <label>Name<input name="guardianName" style={fieldStyle} /></label>
            <label>Relationship<input name="guardianRelationship" style={fieldStyle} /></label>
            <label>Phone<input name="guardianPhone" style={fieldStyle} /></label>
          </div>
        </section>

        <section>
          <h2>3. Initial baseline</h2>
          <p className="subtitle" style={{ marginBottom: 14 }}>Use 0–5 internal placement levels. These are support indicators, not labels of ability.</p>
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))" }}>
            <label>Literacy level<input name="literacyLevel" type="number" min="0" max="5" defaultValue="0" required style={fieldStyle} /></label>
            <label>Numeracy level<input name="numeracyLevel" type="number" min="0" max="5" defaultValue="0" required style={fieldStyle} /></label>
            <label>Digital level<input name="digitalLevel" type="number" min="0" max="5" defaultValue="0" required style={fieldStyle} /></label>
            <label>Applied skills level<input name="appliedSkillsLevel" type="number" min="0" max="5" defaultValue="0" required style={fieldStyle} /></label>
          </div>
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", marginTop: 14 }}>
            <label>Strengths<textarea name="strengths" rows={4} style={fieldStyle} /></label>
            <label>Priority learning needs<textarea name="priorityNeeds" rows={4} style={fieldStyle} /></label>
          </div>
        </section>

        <div className="card" style={{ background: "var(--sage)", boxShadow: "none" }}>
          <strong>Safeguarding and commercial boundary:</strong> enrollment does not create any commercial obligation. Enterprise-band and adult-enterprise functions are restricted to eligible adults.
        </div>

        <button type="submit" style={{ padding: 13, borderRadius: 10, border: 0, background: "var(--green)", color: "white", fontWeight: 800, cursor: "pointer" }}>Save enrollment and baseline</button>
      </form>
    </main>
  );
}
