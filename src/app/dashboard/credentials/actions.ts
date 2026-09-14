"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function issueCredentialAction(formData: FormData) {
  const participantId = String(formData.get("participant_id") ?? "");
  const subprogramId = String(formData.get("subprogram_id") ?? "");
  const credentialType = String(formData.get("credential_type") ?? "CERTIFICATE");
  const title = String(formData.get("title") ?? "").trim() || null;
  if (!participantId || !subprogramId) throw new Error("Participant and subprogram are required");

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.rpc("issue_greenskills_credential", {
    p_participant_id: participantId,
    p_subprogram_id: subprogramId,
    p_credential_type: credentialType,
    p_title: title,
  });
  if (error) throw new Error(error.message);

  revalidatePath("/dashboard/credentials");
  return data as string;
}
