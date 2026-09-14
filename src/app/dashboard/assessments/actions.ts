"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function optionalNumber(value: FormDataEntryValue | null) {
  const text = String(value ?? "").trim();
  if (!text) return null;
  const number = Number(text);
  return Number.isFinite(number) ? number : null;
}

export async function reviewLearnerEvidence(formData: FormData) {
  const submissionId = String(formData.get("submission_id") ?? "");
  const decision = String(formData.get("decision") ?? "");
  const reviewNote = String(formData.get("review_note") ?? "").trim();
  if (!submissionId || !["VERIFIED", "REQUIRES_REMEDIATION", "REJECTED"].includes(decision)) {
    throw new Error("Invalid evidence review request");
  }

  const practical = optionalNumber(formData.get("practical_rating"));
  const dataDigital = optionalNumber(formData.get("data_digital_rating"));
  const safety = optionalNumber(formData.get("safety_rating"));
  const enterprise = optionalNumber(formData.get("enterprise_rating"));
  const leadership = optionalNumber(formData.get("leadership_rating"));
  const knowledge = optionalNumber(formData.get("knowledge_score"));

  if (decision === "VERIFIED" && [practical, dataDigital, safety, enterprise, leadership].some(v => v === null)) {
    throw new Error("Verified evidence requires all five 0–5 practical-domain ratings");
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.rpc("review_learner_evidence", {
    p_submission_id: submissionId,
    p_decision: decision,
    p_review_note: reviewNote || null,
    p_knowledge_score: knowledge,
    p_practical_rating: practical,
    p_data_digital_rating: dataDigital,
    p_safety_rating: safety,
    p_enterprise_employability_rating: enterprise,
    p_leadership_rating: leadership,
  });

  if (error || data !== true) throw new Error(error?.message ?? "Evidence review failed");
  revalidatePath("/dashboard/assessments");
  revalidatePath("/dashboard/skills-passports");
  revalidatePath("/dashboard/credentials");
}
