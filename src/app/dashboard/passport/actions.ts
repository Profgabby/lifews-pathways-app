"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const goalSchema = z.object({
  participantId: z.string().uuid(),
  goalText: z.string().min(3).max(300),
  goalArea: z.enum(["LITERACY", "NUMERACY", "GROWMEAL", "FOOD", "DIGITAL", "PRACTICAL", "CAREER", "OTHER"]),
  targetDate: z.string().optional(),
});

const projectSchema = z.object({
  participantId: z.string().uuid(),
  title: z.string().min(3).max(160),
  projectType: z.enum(["LEARNING", "GROWMEAL", "FOOD_DISCOVERY", "DIGITAL", "SKILLSBRIDGE", "COMMUNITY", "OTHER"]),
  description: z.string().max(1200).optional(),
  status: z.enum(["PLANNED", "IN_PROGRESS", "COMPLETED"]),
});

const badgeSchema = z.object({
  participantId: z.string().uuid(),
  badgeId: z.string().uuid(),
  evidenceNote: z.string().min(5).max(800),
});

async function requireUser() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  return { supabase, user };
}

export async function addPassportGoal(formData: FormData) {
  const parsed = goalSchema.safeParse({
    participantId: formData.get("participantId"),
    goalText: formData.get("goalText"),
    goalArea: formData.get("goalArea"),
    targetDate: formData.get("targetDate") || undefined,
  });
  if (!parsed.success) throw new Error("Invalid Pathways Passport goal.");

  const { supabase, user } = await requireUser();
  const { error } = await supabase.from("passport_goals").insert({
    participant_id: parsed.data.participantId,
    goal_text: parsed.data.goalText,
    goal_area: parsed.data.goalArea,
    target_date: parsed.data.targetDate || null,
    created_by: user.id,
  });
  if (error) throw new Error(error.message);

  revalidatePath(`/dashboard/passport/${parsed.data.participantId}`);
}

export async function addLearnerProject(formData: FormData) {
  const parsed = projectSchema.safeParse({
    participantId: formData.get("participantId"),
    title: formData.get("title"),
    projectType: formData.get("projectType"),
    description: formData.get("description") || undefined,
    status: formData.get("status"),
  });
  if (!parsed.success) throw new Error("Invalid learner project.");

  const { supabase, user } = await requireUser();
  const { error } = await supabase.from("learner_projects").insert({
    participant_id: parsed.data.participantId,
    title: parsed.data.title,
    project_type: parsed.data.projectType,
    description: parsed.data.description || null,
    status: parsed.data.status,
    created_by: user.id,
    started_at: parsed.data.status === "PLANNED" ? null : new Date().toISOString().slice(0, 10),
    completed_at: parsed.data.status === "COMPLETED" ? new Date().toISOString().slice(0, 10) : null,
  });
  if (error) throw new Error(error.message);

  revalidatePath(`/dashboard/passport/${parsed.data.participantId}`);
}

export async function awardEvidenceBackedBadge(formData: FormData) {
  const parsed = badgeSchema.safeParse({
    participantId: formData.get("participantId"),
    badgeId: formData.get("badgeId"),
    evidenceNote: formData.get("evidenceNote"),
  });
  if (!parsed.success) throw new Error("Badge award requires valid evidence.");

  const { supabase, user } = await requireUser();
  const { error } = await supabase.from("participant_badges").insert({
    participant_id: parsed.data.participantId,
    badge_id: parsed.data.badgeId,
    awarded_by: user.id,
    evidence_note: parsed.data.evidenceNote,
  });
  if (error) throw new Error(error.message);

  revalidatePath(`/dashboard/passport/${parsed.data.participantId}`);
  revalidatePath(`/dashboard/participants/${parsed.data.participantId}`);
}
