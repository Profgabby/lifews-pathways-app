"use client";

import { useMemo, useState } from "react";
import type { GreenTechModule } from "@/lib/greentech";
import { getGreenTechPracticalBlueprint } from "@/lib/greentech-practicals";

type Props = {
  module: GreenTechModule;
  submitSection: (n:number,type:string,payload:any)=>Promise<boolean>;
  submitRecord: (type:string,payload:any)=>Promise<boolean>;
};

export function GreenTechModulePractical({module,submitSection,submitRecord}:Props){
  const blueprint = useMemo(()=>getGreenTechPracticalBlueprint(module.code),[module.code]);
  const [safety,setSafety]=useState<Record<number,boolean>>({});
  const [procedure,setProcedure]=useState("");
  const [measurements,setMeasurements]=useState<Record<number,string>>({});
  const [acceptance,setAcceptance]=useState<Record<number,boolean>>({});
  const [evidenceLink,setEvidenceLink]=useState("");
  const [evidenceNote,setEvidenceNote]=useState("");
  const [ai,setAi]=useState({task:"",input_summary:"",ai_use:"",output_summary:"",verification_method:"",errors_or_limitations:"",correction:"",final_decision:""});
  const [enterprise,setEnterprise]=useState({customer_problem:"",service_scope:"",materials_cost:"",labor_cost:"",transport_cost:"",overhead_cost:"",contingency_cost:"",customer_price:"",after_service:""});
  const [busy,setBusy]=useState(false);

  if(!blueprint) return <section style={card}><h2>{module.diy}</h2><p>Practical blueprint is being prepared for this module.</p></section>;

  const safetyReady=blueprint.safety.every((_,i)=>safety[i]);
  const measurementsReady=blueprint.measurements.every((_,i)=>(measurements[i]||"").trim().length>0);
  const acceptanceReady=blueprint.acceptance.every((_,i)=>acceptance[i]);
  const ready=safetyReady&&measurementsReady&&acceptanceReady&&procedure.trim().length>=30;

  async function submit(){
    if(!ready||busy)return;
    setBusy(true);
    try{
      const measurementRows=blueprint.measurements.map((label,i)=>({label,value:measurements[i]}));
      const payload={
        blueprint_version:"2026.09",
        objective:blueprint.objective,
        procedure,
        safety_checks:blueprint.safety.map((label,i)=>({label,confirmed:Boolean(safety[i])})),
        measurements:measurementRows,
        acceptance_checks:blueprint.acceptance.map((label,i)=>({label,confirmed:Boolean(acceptance[i])})),
        evidence_link:evidenceLink||null,
        evidence_note:evidenceNote,
        required_evidence:blueprint.evidence,
      };
      const ok=await submitSection(7,"DIY_RESPONSE",payload);
      if(!ok)return;
      if(evidenceLink){
        await submitRecord("FIELDWORK",{evidence_type:"PRACTICAL",title:`${module.code} practical evidence`,description:`${blueprint.objective}\n\n${procedure}\n\nEvidence note: ${evidenceNote}\n\nMeasurements: ${measurementRows.map(x=>`${x.label}: ${x.value}`).join("; ")}`,file_url:evidenceLink});
      }
      if(ai.task.trim()&&ai.final_decision.trim()){
        await submitRecord("AI_LOG",{...ai,ai_layer:4,privacy_check:true,independent_reasoning_verified:true});
      }
      if(enterprise.customer_problem.trim()&&enterprise.service_scope.trim()){
        await submitRecord("ENTERPRISE",enterprise);
      }
    } finally { setBusy(false); }
  }

  return <section style={card}>
    <div style={eyebrow}>DIY • PRACTICAL • FIELD EVIDENCE</div>
    <h2>{module.diy}</h2>
    <p><strong>Technical objective:</strong> {blueprint.objective}</p>

    <div style={grid}>
      <div><h3>Tools & materials</h3><ul>{blueprint.tools.map(x=><li key={x}>{x}</li>)}</ul></div>
      <div><h3>Evidence required</h3><ul>{blueprint.evidence.map(x=><li key={x}>{x}</li>)}</ul></div>
    </div>

    <h3>1. Safety gate</h3>
    <p>Confirm every control before beginning. A safety-critical failure can stop the practical regardless of other scores.</p>
    {blueprint.safety.map((x,i)=><label key={x} style={check}><input type="checkbox" checked={Boolean(safety[i])} onChange={e=>setSafety(v=>({...v,[i]:e.target.checked}))}/> {x}</label>)}

    <h3>2. Practical sequence</h3>
    <ol>{blueprint.steps.map(x=><li key={x}>{x}</li>)}</ol>
    <label><strong>Procedure / work actually completed</strong><textarea rows={6} style={textarea} value={procedure} onChange={e=>setProcedure(e.target.value)} placeholder="Describe what you actually did, including deviations, faults and corrective actions."/></label>

    <h3>3. Measurements & calculations</h3>
    <p>Enter actual values with units. Where a value is estimated, label it clearly as an estimate.</p>
    {blueprint.measurements.map((x,i)=><label key={x} style={{display:"block"}}><strong>{x}</strong><input style={input} value={measurements[i]||""} onChange={e=>setMeasurements(v=>({...v,[i]:e.target.value}))} placeholder="Value + unit / calculation"/></label>)}

    <h3>4. Acceptance criteria</h3>
    {blueprint.acceptance.map((x,i)=><label key={x} style={check}><input type="checkbox" checked={Boolean(acceptance[i])} onChange={e=>setAcceptance(v=>({...v,[i]:e.target.checked}))}/> {x}</label>)}

    <h3>5. Evidence package</h3>
    <label><strong>HTTPS evidence link</strong><input style={input} value={evidenceLink} onChange={e=>setEvidenceLink(e.target.value)} placeholder="https://..."/></label>
    <label><strong>Evidence note</strong><textarea rows={4} style={textarea} value={evidenceNote} onChange={e=>setEvidenceNote(e.target.value)} placeholder="Identify photo, drawing, worksheet, video, dataset or other submitted evidence."/></label>

    <h3>6. Module-specific AI Work Log</h3>
    <p>{blueprint.aiTask}</p>
    {Object.keys(ai).map(key=><label key={key} style={{display:"block"}}><strong>{key.replaceAll("_"," ")}</strong><textarea rows={2} style={textarea} value={(ai as any)[key]} onChange={e=>setAi(v=>({...v,[key]:e.target.value}))}/></label>)}
    <p><strong>Rule:</strong> AI output is supporting evidence only. It does not override LIFEWS safety procedures, trainer instructions, manufacturer requirements, applicable standards or competent professional judgment.</p>

    <h3>7. Enterprise task</h3>
    <p><strong>Required enterprise deliverable:</strong> {blueprint.enterpriseDeliverable}</p>
    <label><strong>Customer/community problem</strong><textarea rows={3} style={textarea} value={enterprise.customer_problem} onChange={e=>setEnterprise(v=>({...v,customer_problem:e.target.value}))}/></label>
    <label><strong>Technical service scope</strong><textarea rows={3} style={textarea} value={enterprise.service_scope} onChange={e=>setEnterprise(v=>({...v,service_scope:e.target.value}))}/></label>
    <div style={grid}>{["materials_cost","labor_cost","transport_cost","overhead_cost","contingency_cost","customer_price"].map(key=><label key={key}><strong>{key.replaceAll("_"," ")}</strong><input type="number" min="0" style={input} value={(enterprise as any)[key]} onChange={e=>setEnterprise(v=>({...v,[key]:e.target.value}))}/></label>)}</div>
    <label><strong>After-service / handover plan</strong><textarea rows={3} style={textarea} value={enterprise.after_service} onChange={e=>setEnterprise(v=>({...v,after_service:e.target.value}))}/></label>

    <div style={{background:"#f5f8f6",borderRadius:12,padding:14,margin:"16px 0"}}><strong>Submission readiness:</strong> Safety {safetyReady?"✓":"—"} • Measurements {measurementsReady?"✓":"—"} • Acceptance {acceptanceReady?"✓":"—"} • Procedure {procedure.trim().length>=30?"✓":"—"}</div>
    <button style={primary} disabled={!ready||busy} onClick={submit}>{busy?"Submitting…":"Submit complete practical package"}</button>
  </section>;
}

const card:React.CSSProperties={background:"white",border:"1px solid #dce7df",borderRadius:18,padding:22};
const input:React.CSSProperties={width:"100%",boxSizing:"border-box",padding:"10px 12px",border:"1px solid #b9c9bf",borderRadius:9,margin:"6px 0 12px"};
const textarea:React.CSSProperties={...input,resize:"vertical"};
const primary:React.CSSProperties={background:"#006b3c",color:"white",border:0,borderRadius:9,padding:"11px 16px",fontWeight:700,cursor:"pointer"};
const eyebrow:React.CSSProperties={fontSize:12,fontWeight:800,letterSpacing:".08em",color:"#006b3c"};
const grid:React.CSSProperties={display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:16};
const check:React.CSSProperties={display:"block",padding:"9px 0",lineHeight:1.45};
