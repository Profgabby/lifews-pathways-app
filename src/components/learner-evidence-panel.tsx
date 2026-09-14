"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, FileText, Loader2, UploadCloud } from "lucide-react";

type EvidenceStatus = {
  submission_id: string;
  submission_status: "PENDING" | "VERIFIED" | "REQUIRES_REMEDIATION" | "REJECTED";
  learner_note: string | null;
  file_count: number;
  file_names: string[];
  submitted_at: string;
  reviewed_at: string | null;
  review_note: string | null;
};

type Props = { lessonCode: string; requiredEvidence: string[] };

export function LearnerEvidencePanel({ lessonCode, requiredEvidence }: Props) {
  const [status, setStatus] = useState<EvidenceStatus | null>(null);
  const [note, setNote] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function refresh() {
    const response = await fetch(`/api/learner/evidence?lessonCode=${encodeURIComponent(lessonCode)}`, { cache: "no-store" });
    if (!response.ok) return;
    const payload = await response.json();
    setStatus(payload.evidence ?? null);
  }

  useEffect(() => { void refresh(); }, [lessonCode]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    if (!files.length) { setMessage("Add at least one JPG, PNG or PDF evidence file."); return; }
    setBusy(true);
    try {
      const form = new FormData();
      form.set("lessonCode", lessonCode);
      form.set("learnerNote", note);
      files.forEach(file => form.append("files", file));
      const response = await fetch("/api/learner/evidence", { method: "POST", body: form });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error ?? "Evidence upload failed");
      setStatus(payload.evidence ?? null);
      setFiles([]);
      setNote("");
      setMessage("Evidence submitted for facilitator review.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Evidence upload failed");
    } finally { setBusy(false); }
  }

  const locked = status?.submission_status === "PENDING" || status?.submission_status === "VERIFIED";

  return <div className="module-evidence-submit-panel">
    <div className="module-workspace-title"><div><UploadCloud size={23}/><div><span className="eyebrow">Practical evidence</span><h3>Submit evidence for review</h3></div></div>{status ? <span className="module-status-badge">{status.submission_status.replaceAll("_", " ")}</span> : null}</div>
    <p>Accepted files: JPG, PNG and PDF. Maximum 10 MB per file, up to 12 files per submission.</p>

    <div className="module-evidence-list">{requiredEvidence.map((item, i) => <div key={item}><span>{i + 1}</span><p>{item}</p><small>Required evidence</small></div>)}</div>

    {status ? <div className="module-evidence-status-card">
      <strong>{status.submission_status === "VERIFIED" ? "Evidence verified" : status.submission_status === "PENDING" ? "Awaiting facilitator review" : "Review completed"}</strong>
      <span>{status.file_count} file{status.file_count === 1 ? "" : "s"} submitted</span>
      {status.file_names?.length ? <ul>{status.file_names.map(name => <li key={name}><FileText size={15}/> {name}</li>)}</ul> : null}
      {status.review_note ? <p><strong>Facilitator note:</strong> {status.review_note}</p> : null}
      {status.submission_status === "VERIFIED" ? <p><CheckCircle2 size={17}/> Verified practical evidence can now contribute to module completion and the Skills Passport.</p> : null}
    </div> : null}

    {!locked ? <form onSubmit={submit} className="module-evidence-form">
      <label><span>Evidence note</span><textarea value={note} onChange={e => setNote(e.target.value)} maxLength={4000} rows={4} placeholder="Explain what you completed and what the attached evidence shows."/></label>
      <label><span>Evidence files</span><input type="file" multiple accept="image/jpeg,image/png,application/pdf" onChange={e => setFiles(Array.from(e.target.files ?? []).slice(0, 12))}/></label>
      {files.length ? <small>{files.length} file{files.length === 1 ? "" : "s"} selected</small> : null}
      <button className="module-nav-button" type="submit" disabled={busy}>{busy ? <><Loader2 size={18}/> Uploading…</> : <><UploadCloud size={18}/> Submit evidence</>}</button>
    </form> : null}
    {message ? <p role="status" className="module-evidence-message">{message}</p> : null}
  </div>;
}
