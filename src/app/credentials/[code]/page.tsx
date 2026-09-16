import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, ShieldAlert, ShieldCheck } from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
type PageProps = { params: Promise<{ code: string }> };
type VerifiedCredential = { credential_code:string; credential_type:string; title:string; holder_name:string; participant_code:string; program_name:string|null; subprogram_code:string|null; subprogram_name:string|null; issued_at:string; expires_at:string|null; verification_status:string; };

export default async function CredentialPage({ params }: PageProps) {
  const { code } = await params;
  const normalized = decodeURIComponent(code).trim().toUpperCase();
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.rpc("verify_greenskills_credential", { p_credential_code: normalized });
  if (error || !Array.isArray(data) || data.length === 0) notFound();
  const credential = data[0] as VerifiedCredential;
  const expiredByDate = Boolean(credential.expires_at && new Date(credential.expires_at) < new Date());
  const valid = credential.verification_status === "VALID" && !expiredByDate;
  const publicStatus = valid ? "VALID" : expiredByDate && credential.verification_status === "VALID" ? "EXPIRED" : credential.verification_status;

  return <main className="main" style={{ maxWidth:1050,margin:"0 auto",padding:"32px 20px 64px" }}>
    <div className="topbar" style={{ marginBottom:24 }}><Link className="learner-brand" href="/"><img src="/lifews-logo.png" alt="LIFEWS logo"/><div><strong>LIFEWS GreenSkills</strong><span>Credential Verification</span></div></Link><span className="status-pill">{valid ? "VERIFIED" : publicStatus}</span></div>
    {!valid ? <section className="card" style={{ marginBottom:18,border:"2px solid currentColor" }}><div style={{ display:"flex",gap:12,alignItems:"center" }}><ShieldAlert size={28}/><div><strong>This credential is not currently valid.</strong><p className="subtitle" style={{ margin:0 }}>Status: {publicStatus}. This page is retained as an official historical verification record; it must not be represented as a current LIFEWS credential.</p></div></div></section> : null}
    <section className="card" style={{ padding:40,textAlign:"center",border:"2px solid var(--border)" }}>
      <div className="eyebrow">LIFEWS FOUNDATION · GREENSKILLS</div><h1 style={{ fontSize:"clamp(2rem,5vw,4rem)",marginBottom:8 }}>Certificate of Achievement</h1><p className="subtitle">Evidence-backed competency credential</p>
      <div style={{ width:90,height:2,background:"currentColor",opacity:.18,margin:"28px auto" }}/><p className="subtitle" style={{ marginBottom:4 }}>This certifies that</p><h2 style={{ fontSize:"clamp(1.8rem,4vw,3rem)",margin:"4px 0 18px" }}>{credential.holder_name}</h2>
      <p style={{ fontSize:"1.08rem",maxWidth:760,margin:"0 auto" }}>has satisfied the verified curriculum and FieldWorks requirements for</p><h3 style={{ fontSize:"1.5rem",margin:"16px 0 4px" }}>{credential.title}</h3><p className="subtitle">{credential.program_name ?? "LIFEWS GreenSkills"}{credential.subprogram_code ? ` · ${credential.subprogram_code}` : ""}{credential.subprogram_name ? ` · ${credential.subprogram_name}` : ""}</p>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:16,marginTop:32,textAlign:"left" }}><div className="card"><div className="metric-label">Credential code</div><strong>{credential.credential_code}</strong></div><div className="card"><div className="metric-label">Issued</div><strong>{new Date(credential.issued_at).toLocaleDateString()}</strong></div><div className="card"><div className="metric-label">Participant</div><strong>{credential.participant_code}</strong></div><div className="card"><div className="metric-label">Status</div><strong>{publicStatus}</strong></div></div>
      <div style={{ display:"flex",justifyContent:"center",alignItems:"center",gap:28,flexWrap:"wrap",marginTop:34 }}><img src={`/api/credentials/${encodeURIComponent(credential.credential_code)}/qr`} alt="Credential verification QR code" width={180} height={180}/><div style={{ textAlign:"left",maxWidth:420 }}><div style={{ display:"flex",gap:8,alignItems:"center",marginBottom:8 }}><ShieldCheck size={22}/><strong>Public verification</strong></div><p className="subtitle">Scan the QR code to return to this official LIFEWS GreenSkills verification record. Status is read from the current credential record.</p>{valid ? <p style={{ display:"flex",gap:8,alignItems:"center",fontWeight:800 }}><CheckCircle2 size={20}/> Credential verified</p> : <p style={{ fontWeight:800 }}>Credential status: {publicStatus}</p>}</div></div>
    </section>
    <p className="subtitle" style={{ textAlign:"center",marginTop:18 }}>Use your browser’s Print command to save or print the certificate. Verification remains tied to the credential code and current database status.</p>
  </main>;
}
