"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const progressAssessmentSchema = z.object({
  participantId: z.string().uuid(),
  assessmentType: z.enum(["MIDLINE", "ENDLINE", "FOLLOW_UP"]),
  literacyLevel: z.coerce.number().int().min(0).max(5).optional(),
  numeracyLevel: z.coerce.number().int().min(0).max(5).optional(),
  digitalLevel: z.coerce.number().int().min(0).max(5).optional(),
  appliedSkillsLevel: z.coerce.number().int().min(0).max(5).optional(),
  evidenceNote: z.string().trim().max(3000).optional(),
}).refine((value) => [
  value.literacyLevel,
  value.numeracyLevel,
  value.digitalLevel,
  value.appliedSkillsLevel,
].some((level) => level !== undefined), {
  message: "Record at least one progress level.",
});

function optionalLevel(value: FormDataEntryValue | null) {
  if (typeof value !== "string" || value.trim() === "") return undefined;
  return value;
}

function optionalText(value: FormDataEntryValue | null) {
  const text = typeof value === "string" ? value.trim() : "";
  return text.length ? text : undefined;
}

export async function recordProgressAssessment(formData: FormData) {
  const parsed = progressAssessmentSchema.safeParse({
    participantId: formData.get("participantId"),
    assessmentType: formData.get("assessmentType"),
    literacyLevel: optionalLevel(formData.get("literacyLevel")),
    numeracyLevel: optionalLevel(formData.get("numeracyLevel")),
    digitalLevel: optionalLevel(formData.get("digitalLevel")),
    appliedSkillsLevel: optionalLevel(formData.get("appliedSkillsLevel")),
    evidenceNote: optionalText(formData.get("evidenceNote")),
  });

  if (!parsed.success) throw new Error("Invalid progress assessment data.");

  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, role, active")
    .eq("id", user.id)
    .single();

  const allowedRoles = ["SUPER_ADMIN", "PROGRAM_ADMIN", "SITE_COORDINATOR", "EDUCATOR", "M_AND_E_OFFICER"];
  if (profileError || !profile?.active || !allowedRoles.includes(profile.role)) {
    throw new Error("You are not authorized to record progress assessments.");
  }

  const { error } = await supabase.from("progress_assessments").insert({
    participant_id: parsed.data.participantId,
    assessment_type: parsed.data.assessmentType,
    literacy_level: parsed.data.literacyLevel ?? null,
    numeracy_level: parsed.data.numeracyLevel ?? null,
    digital_level: parsed.data.digitalLevel ?? null,
    applied_skills_level: parsed.data.appliedSkillsLevel ?? null,
    evidence_note: parsed.data.evidenceNote || null,
    assessed_by: profile.id,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/dashboard/analytics");
  revalidatePath(`/dashboard/participants/${parsed.data.participantId}`);
}
