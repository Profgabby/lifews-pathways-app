"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function issueCredentialAction(formData: FormData): Promise<void> {
  const participantId = String(formData.get("participant_id") ?? "");
  const subprogramId = String(formData.get("subprogram_id") ?? "");
  const credentialType = String(formData.get("credential_type") ?? "CERTIFICATE");
  const title = String(formData.get("title") ?? "").trim() || null;
  if (!participantId || !subprogramId) throw new Error("Participant and subprogram are required");

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.rpc("issue_greenskills_credential", {
    p_participant_id: participantId,
    p_subprogram_id: subprogramId,
    p_credential_type: credentialType,
    p_title: title,
  });
  if (error) throw new Error(error.message);
  revalidatePath("/dashboard/credentials");
}

export async function revokeCredentialAction(formData: FormData): Promise<void> {
  const credentialId = String(formData.get("credential_id") ?? "");
  const reason = String(formData.get("reason") ?? "").trim();
  if (!credentialId || !reason) throw new Error("Credential and revocation reason are required");
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.rpc("revoke_greenskills_credential", { p_credential_id: credentialId, p_reason: reason });
  if (error) throw new Error(error.message);
  revalidatePath("/dashboard/credentials");
}

export async function reissueCredentialAction(formData: FormData): Promise<void> {
  const credentialId = String(formData.get("credential_id") ?? "");
  const reason = String(formData.get("reason") ?? "").trim() || null;
  if (!credentialId) throw new Error("Credential is required");
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.rpc("reissue_greenskills_credential", { p_credential_id: credentialId, p_reason: reason });
  if (error) throw new Error(error.message);
  revalidatePath("/dashboard/credentials");
}
