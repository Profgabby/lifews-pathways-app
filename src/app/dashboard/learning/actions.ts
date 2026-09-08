"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const learningAttemptSchema = z.object({
  participantId: z.string().uuid(),
  moduleId: z.string().uuid(),
  activityId: z.string().uuid().optional().or(z.literal("")),
  status: z.enum(["NOT_STARTED", "IN_PROGRESS", "COMPLETED"]),
  score: z.coerce.number().min(0).max(100).optional(),
  reflection: z.string().max(2000).optional(),
  evidenceNote: z.string().max(2000).optional(),
});

const growmealSchema = z.object({
  participantId: z.string().uuid(),
  activityId: z.string().uuid().optional().or(z.literal("")),
  station: z.enum([
    "SEED_DISCOVERY","SOIL_LEARNING","WATER_IRRIGATION","ROOT_OBSERVATION","PLANT_GROWTH",
    "VEGETABLE_PRODUCTION","HERBS_SPICES","FOOD_NUTRITION","COMPOST","HARVEST","POSTHARVEST","MARKET_FOOD_SYSTEMS",
  ]),
  observationText: z.string().min(2).max(3000),
  measurementLabel: z.string().max(120).optional(),
  measurementValue: z.coerce.number().optional(),
  measurementUnit: z.string().max(40).optional(),
});

const foodDiscoverySchema = z.object({
  participantId: z.string().uuid(),
  activityId: z.string().uuid().optional().or(z.literal("")),
  ingredientOrTopic: z.string().min(2).max(200),
  observationText: z.string().min(2).max(3000),
  hygieneCheckCompleted: z.boolean(),
  tastingInvolved: z.boolean(),
  allergyCheckCompleted: z.boolean(),
}).refine((value) => !value.tastingInvolved || value.allergyCheckCompleted, {
  message: "An allergy check is required before a tasting activity is recorded.",
});

export async function recordLearningAttempt(input: unknown) {
  const parsed = learningAttemptSchema.parse(input);
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Authentication required");

  const { error } = await supabase.from("learning_attempts").insert({
    participant_id: parsed.participantId,
    module_id: parsed.moduleId,
    activity_id: parsed.activityId || null,
    status: parsed.status,
    score: parsed.score ?? null,
    reflection: parsed.reflection || null,
    evidence_note: parsed.evidenceNote || null,
    completed_at: parsed.status === "COMPLETED" ? new Date().toISOString() : null,
    recorded_by: user.id,
  });
  if (error) throw error;
  revalidatePath(`/dashboard/participants/${parsed.participantId}`);
}

export async function recordGrowMealObservation(input: unknown) {
  const parsed = growmealSchema.parse(input);
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Authentication required");

  const { error } = await supabase.from("growmeal_observations").insert({
    participant_id: parsed.participantId,
    activity_id: parsed.activityId || null,
    station: parsed.station,
    observation_text: parsed.observationText,
    measurement_label: parsed.measurementLabel || null,
    measurement_value: parsed.measurementValue ?? null,
    measurement_unit: parsed.measurementUnit || null,
    recorded_by: user.id,
  });
  if (error) throw error;
  revalidatePath("/dashboard/growmeal");
  revalidatePath(`/dashboard/participants/${parsed.participantId}`);
}

export async function recordFoodDiscovery(input: unknown) {
  const parsed = foodDiscoverySchema.parse(input);
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Authentication required");

  const { error } = await supabase.from("food_discovery_records").insert({
    participant_id: parsed.participantId,
    activity_id: parsed.activityId || null,
    ingredient_or_topic: parsed.ingredientOrTopic,
    observation_text: parsed.observationText,
    hygiene_check_completed: parsed.hygieneCheckCompleted,
    tasting_involved: parsed.tastingInvolved,
    allergy_check_completed: parsed.allergyCheckCompleted,
    recorded_by: user.id,
  });
  if (error) throw error;
  revalidatePath("/dashboard/food-discovery");
  revalidatePath(`/dashboard/participants/${parsed.participantId}`);
}
