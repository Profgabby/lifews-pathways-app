"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const sessionSchema = z.object({
  siteId: z.string().uuid(),
  sessionDate: z.string().min(1),
  sessionName: z.string().min(2).max(120),
});

const attendanceSchema = z.object({
  sessionId: z.string().uuid(),
  participantId: z.string().uuid(),
  status: z.enum(["PRESENT", "ABSENT", "LATE", "EXCUSED"]),
  followUpRequired: z.boolean(),
});

export async function createAttendanceSession(formData: FormData) {
  const parsed = sessionSchema.safeParse({
    siteId: formData.get("siteId"),
    sessionDate: formData.get("sessionDate"),
    sessionName: formData.get("sessionName"),
  });

  if (!parsed.success) throw new Error("Invalid attendance session data.");

  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase.from("profiles").select("id").eq("id", user.id).single();
  if (!profile) throw new Error("Staff profile not found.");

  const { data, error } = await supabase
    .from("attendance_sessions")
    .insert({
      site_id: parsed.data.siteId,
      session_date: parsed.data.sessionDate,
      session_name: parsed.data.sessionName,
      created_by: profile.id,
    })
    .select("id")
    .single();

  if (error) throw new Error(error.message);
  revalidatePath("/dashboard/attendance");
  redirect(`/dashboard/attendance?session=${data.id}`);
}

export async function markAttendance(formData: FormData) {
  const parsed = attendanceSchema.safeParse({
    sessionId: formData.get("sessionId"),
    participantId: formData.get("participantId"),
    status: formData.get("status"),
    followUpRequired: formData.get("followUpRequired") === "on",
  });

  if (!parsed.success) throw new Error("Invalid attendance record.");

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("attendance_records").upsert(
    {
      session_id: parsed.data.sessionId,
      participant_id: parsed.data.participantId,
      status: parsed.data.status,
      follow_up_required: parsed.data.followUpRequired,
    },
    { onConflict: "session_id,participant_id" },
  );

  if (error) throw new Error(error.message);
  revalidatePath("/dashboard/attendance");
}
