"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const authorizedRoles = new Set(["SUPER_ADMIN", "SAFEGUARDING_LEAD"]);

const incidentSchema = z.object({
  siteId: z.string().uuid(),
  participantId: z.string().uuid().optional(),
  occurredAt: z.string().optional(),
  factualAccount: z.string().trim().min(10).max(12000),
  immediateAction: z.string().trim().max(6000).optional(),
});

const actionSchema = z.object({
  incidentId: z.string().uuid(),
  actionType: z.enum([
    "IMMEDIATE_SAFETY",
    "REFERRAL",
    "FOLLOW_UP",
    "CASE_REVIEW",
    "CLOSURE_NOTE",
  ]),
  actionNote: z.string().trim().min(3).max(8000),
  receivingService: z.string().trim().max(500).optional(),
  followUpDate: z.string().optional(),
});

const statusSchema = z.object({
  incidentId: z.string().uuid(),
  caseStatus: z.enum(["OPEN", "REFERRED", "MONITORING", "CLOSED"]),
  referralStatus: z.string().trim().max(500).optional(),
});

async function requireSafeguardingUser() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("id, role, site_id, active")
    .eq("id", user.id)
    .single();

  if (error || !profile?.active || !authorizedRoles.has(profile.role)) {
    throw new Error("You are not authorized to access safeguarding case records.");
  }

  return { supabase, profile };
}

function optionalText(value: FormDataEntryValue | null) {
  const text = typeof value === "string" ? value.trim() : "";
  return text.length ? text : undefined;
}

export async function createSafeguardingIncident(formData: FormData) {
  const parsed = incidentSchema.safeParse({
    siteId: formData.get("siteId"),
    participantId: optionalText(formData.get("participantId")),
    occurredAt: optionalText(formData.get("occurredAt")),
    factualAccount: formData.get("factualAccount"),
    immediateAction: optionalText(formData.get("immediateAction")),
  });

  if (!parsed.success) throw new Error("Invalid safeguarding incident data.");

  const { supabase, profile } = await requireSafeguardingUser();
  const incidentReference = `SG-${new Date().getUTCFullYear()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;

  const { data, error } = await supabase
    .from("safeguarding_incidents")
    .insert({
      incident_reference: incidentReference,
      participant_id: parsed.data.participantId ?? null,
      site_id: parsed.data.siteId,
      occurred_at: parsed.data.occurredAt || null,
      factual_account: parsed.data.factualAccount,
      immediate_action: parsed.data.immediateAction || null,
      reported_by: profile.id,
    })
    .select("id")
    .single();

  if (error) throw new Error(error.message);

  const { error: auditError } = await supabase.rpc("log_safeguarding_audit", {
    p_incident_id: data.id,
    p_action: "INCIDENT_CREATED",
    p_detail: "Safeguarding incident record created.",
  });

  if (auditError) throw new Error(auditError.message);

  revalidatePath("/dashboard/safeguarding");
  redirect(`/dashboard/safeguarding/${data.id}`);
}

export async function addSafeguardingAction(formData: FormData) {
  const parsed = actionSchema.safeParse({
    incidentId: formData.get("incidentId"),
    actionType: formData.get("actionType"),
    actionNote: formData.get("actionNote"),
    receivingService: optionalText(formData.get("receivingService")),
    followUpDate: optionalText(formData.get("followUpDate")),
  });

  if (!parsed.success) throw new Error("Invalid safeguarding action data.");

  const { supabase, profile } = await requireSafeguardingUser();

  const { error } = await supabase.from("safeguarding_actions").insert({
    incident_id: parsed.data.incidentId,
    action_type: parsed.data.actionType,
    action_note: parsed.data.actionNote,
    receiving_service: parsed.data.receivingService || null,
    follow_up_date: parsed.data.followUpDate || null,
    created_by: profile.id,
  });

  if (error) throw new Error(error.message);

  const { error: auditError } = await supabase.rpc("log_safeguarding_audit", {
    p_incident_id: parsed.data.incidentId,
    p_action: `ACTION_${parsed.data.actionType}`,
    p_detail: "Authorized safeguarding action recorded.",
  });

  if (auditError) throw new Error(auditError.message);

  revalidatePath(`/dashboard/safeguarding/${parsed.data.incidentId}`);
  revalidatePath("/dashboard/safeguarding");
}

export async function updateSafeguardingStatus(formData: FormData) {
  const parsed = statusSchema.safeParse({
    incidentId: formData.get("incidentId"),
    caseStatus: formData.get("caseStatus"),
    referralStatus: optionalText(formData.get("referralStatus")),
  });

  if (!parsed.success) throw new Error("Invalid safeguarding case status.");

  const { supabase } = await requireSafeguardingUser();

  const { error } = await supabase
    .from("safeguarding_incidents")
    .update({
      case_status: parsed.data.caseStatus,
      referral_status: parsed.data.referralStatus || null,
    })
    .eq("id", parsed.data.incidentId);

  if (error) throw new Error(error.message);

  const { error: auditError } = await supabase.rpc("log_safeguarding_audit", {
    p_incident_id: parsed.data.incidentId,
    p_action: "CASE_STATUS_UPDATED",
    p_detail: `Case status changed to ${parsed.data.caseStatus}.`,
  });

  if (auditError) throw new Error(auditError.message);

  revalidatePath(`/dashboard/safeguarding/${parsed.data.incidentId}`);
  revalidatePath("/dashboard/safeguarding");
}
