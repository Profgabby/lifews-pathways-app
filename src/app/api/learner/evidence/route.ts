import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

const allowedTypes = new Set(["image/jpeg", "image/png", "application/pdf"]);
const maxBytes = 10 * 1024 * 1024;
const maxFiles = 12;

function safeName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 120) || "evidence";
}

export async function GET(request: NextRequest) {
  const lessonCode = request.nextUrl.searchParams.get("lessonCode")?.trim();
  if (!lessonCode) return NextResponse.json({ error: "lessonCode is required" }, { status: 400 });

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("lifews-learner-session")?.value;
  if (!sessionToken) return NextResponse.json({ error: "Learner session required" }, { status: 401 });

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.rpc("get_learner_evidence_status", {
    p_session_token: sessionToken,
    p_lesson_code: lessonCode,
  });
  if (error) return NextResponse.json({ error: "Unable to load evidence status" }, { status: 500 });
  return NextResponse.json({ evidence: Array.isArray(data) ? data[0] ?? null : data ?? null });
}

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("lifews-learner-session")?.value;
  if (!sessionToken) return NextResponse.json({ error: "Learner session required" }, { status: 401 });

  const form = await request.formData();
  const lessonCode = String(form.get("lessonCode") ?? "").trim();
  const learnerNote = String(form.get("learnerNote") ?? "").trim();
  const files = form.getAll("files").filter((value): value is File => value instanceof File && value.size > 0);

  if (!lessonCode) return NextResponse.json({ error: "lessonCode is required" }, { status: 400 });
  if (learnerNote.length > 4000) return NextResponse.json({ error: "Learner note is too long" }, { status: 400 });
  if (files.length === 0) return NextResponse.json({ error: "Add at least one evidence file" }, { status: 400 });
  if (files.length > maxFiles) return NextResponse.json({ error: `A maximum of ${maxFiles} files is allowed` }, { status: 400 });
  for (const file of files) {
    if (!allowedTypes.has(file.type)) return NextResponse.json({ error: "Only JPG, PNG and PDF files are allowed" }, { status: 400 });
    if (file.size > maxBytes) return NextResponse.json({ error: `${file.name} exceeds the 10 MB limit` }, { status: 400 });
  }

  const supabase = await createSupabaseServerClient();
  const { data: submissionId, error: submissionError } = await supabase.rpc("create_learner_evidence_submission", {
    p_session_token: sessionToken,
    p_lesson_code: lessonCode,
    p_learner_note: learnerNote || null,
  });
  if (submissionError || typeof submissionId !== "string") {
    return NextResponse.json({ error: submissionError?.message ?? "Unable to create evidence submission" }, { status: 400 });
  }

  const admin = createSupabaseAdminClient();
  const uploadedPaths: string[] = [];
  try {
    for (const [index, file] of files.entries()) {
      const path = `${submissionId}/${String(index + 1).padStart(2, "0")}-${crypto.randomUUID()}-${safeName(file.name)}`;
      const bytes = new Uint8Array(await file.arrayBuffer());
      const { error: uploadError } = await admin.storage.from("learner-evidence").upload(path, bytes, {
        contentType: file.type,
        upsert: false,
      });
      if (uploadError) throw new Error(uploadError.message);
      uploadedPaths.push(path);

      const { data: registered, error: registerError } = await supabase.rpc("register_learner_evidence_file", {
        p_session_token: sessionToken,
        p_submission_id: submissionId,
        p_storage_path: path,
        p_original_name: file.name,
        p_mime_type: file.type,
        p_byte_size: file.size,
      });
      if (registerError || registered !== true) throw new Error(registerError?.message ?? "Evidence registration failed");
    }
  } catch (error) {
    if (uploadedPaths.length) await admin.storage.from("learner-evidence").remove(uploadedPaths);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Evidence upload failed" }, { status: 500 });
  }

  const { data: statusData } = await supabase.rpc("get_learner_evidence_status", {
    p_session_token: sessionToken,
    p_lesson_code: lessonCode,
  });
  return NextResponse.json({ submissionId, evidence: Array.isArray(statusData) ? statusData[0] ?? null : statusData ?? null });
}
