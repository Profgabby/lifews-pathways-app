"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const destinationValues = [
  "FORMAL_EDUCATION",
  "ALTERNATIVE_EDUCATION",
  "VOCATIONAL_TRAINING",
  "APPRENTICESHIP",
  "HIGHER_EDUCATION",
  "AGRICULTURE",
  "EMPLOYMENT",
  "ADULT_ENTERPRISE",
] as const;

const planSchema = z.object({
  participantId: z.string().uuid(),
  interests: z.string().trim().max(4000).optional(),
  currentStrengths: z.string().trim().max(4000).optional(),
  nextSkillNeeded: z.string().trim().max(2000).optional(),
  intendedDestination: z.enum(destinationValues),
  next30DayAction: z.string().trim().min(3).max(3000),
  supportPerson: z.string().trim().max(500).optional(),
});

const verifiedTransitionSchema = z.object({
  participantId: z.string().uuid(),
  destination: z.enum(destinationValues),
  destinationName: z.string().trim().max(1000).optional(),
  startDate: z.string().optional(),
  verificationMethod: z.string().trim().min(3).max(2000),
});

const adultReferralSchema = z.object({
  participantId: z.string().uuid(),
  pathway: z.enum(["AGRIROOTS", "AGRINEXT", "AGRIABLE", "ZARIKS", "OTHER"]),
  voluntaryInterestConfirmed: z.boolean(),
  eligibilityConfirmed: z.boolean(),
  readinessAssessed: z.boolean(),
  notes: z.string().trim().max(4000).optional(),
});

function optionalText(value: FormDataEntryValue | null) {
  const text = typeof value === "string" ? value.trim() : "";
  return text.length ? text : undefined;
}

async function requireTransitionUser(allowedRoles: readonly string[]) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("id, role, active")
    .eq("id", user.id)
    .single();

  if (error || !profile?.active || !allowedRoles.includes(profile.role)) {
    throw new Error("You are not authorized to manage this transition record.");
  }

  return { supabase, profile };
}

export async function createTransitionPlan(formData: FormData) {
  const parsed = planSchema.safeParse({
    participantId: formData.get("participantId"),
    interests: optionalText(formData.get("interests")),
    currentStrengths: optionalText(formData.get("currentStrengths")),
    nextSkillNeeded: optionalText(formData.get("nextSkillNeeded")),
    intendedDestination: formData.get("intendedDestination"),
    next30DayAction: formData.get("next30DayAction"),
    supportPerson: optionalText(formData.get("supportPerson")),
  });

  if (!parsed.success) throw new Error("Invalid transition plan data.");

  const { supabase, profile } = await requireTransitionUser([
    "SUPER_ADMIN",
    "PROGRAM_ADMIN",
    "SITE_COORDINATOR",
    "TRANSITION_OFFICER",
  ]);

  const { error } = await supabase.from("transition_plans").insert({
    participant_id: parsed.data.participantId,
    interests: parsed.data.interests || null,
    current_strengths: parsed.data.currentStrengths || null,
    next_skill_needed: parsed.data.nextSkillNeeded || null,
    intended_destination: parsed.data.intendedDestination,
    next_30_day_action: parsed.data.next30DayAction,
    support_person: parsed.data.supportPerson || null,
    prepared_by: profile.id,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/dashboard/transitions");
  revalidatePath(`/dashboard/participants/${parsed.data.participantId}`);
}

export async function recordVerifiedTransition(formData: FormData) {
  const parsed = verifiedTransitionSchema.safeParse({
    participantId: formData.get("participantId"),
    destination: formData.get("destination"),
    destinationName: optionalText(formData.get("destinationName")),
    startDate: optionalText(formData.get("startDate")),
    verificationMethod: formData.get("verificationMethod"),
  });

  if (!parsed.success) throw new Error("Invalid verified transition data.");

  const { supabase, profile } = await requireTransitionUser([
    "SUPER_ADMIN",
    "PROGRAM_ADMIN",
    "TRANSITION_OFFICER",
    "M_AND_E_OFFICER",
  ]);

  const { error } = await supabase.from("verified_transitions").insert({
    participant_id: parsed.data.participantId,
    destination: parsed.data.destination,
    destination_name: parsed.data.destinationName || null,
    start_date: parsed.data.startDate || null,
    verification_method: parsed.data.verificationMethod,
    verified_by: profile.id,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/dashboard/transitions");
  revalidatePath(`/dashboard/participants/${parsed.data.participantId}`);
}

export async function createAdultEnterpriseReferral(formData: FormData) {
  const parsed = adultReferralSchema.safeParse({
    participantId: formData.get("participantId"),
    pathway: formData.get("pathway"),
    voluntaryInterestConfirmed: formData.get("voluntaryInterestConfirmed") === "on",
    eligibilityConfirmed: formData.get("eligibilityConfirmed") === "on",
    readinessAssessed: formData.get("readinessAssessed") === "on",
    notes: optionalText(formData.get("notes")),
  });

  if (!parsed.success || !parsed.data.voluntaryInterestConfirmed) {
    throw new Error("Adult enterprise referrals require explicit voluntary interest.");
  }

  const { supabase, profile } = await requireTransitionUser([
    "SUPER_ADMIN",
    "PROGRAM_ADMIN",
    "TRANSITION_OFFICER",
  ]);

  const { error } = await supabase.from("adult_enterprise_referrals").insert({
    participant_id: parsed.data.participantId,
    pathway: parsed.data.pathway,
    voluntary_interest_confirmed: true,
    eligibility_confirmed: parsed.data.eligibilityConfirmed,
    readiness_assessed: parsed.data.readinessAssessed,
    referred_by: profile.id,
    notes: parsed.data.notes || null,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/dashboard/transitions");
  revalidatePath(`/dashboard/participants/${parsed.data.participantId}`);
}
