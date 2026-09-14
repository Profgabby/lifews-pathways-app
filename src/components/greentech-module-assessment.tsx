"use client";

import { useMemo, useState } from "react";
import { getGreenTechAssessment } from "@/lib/greentech-assessments";
import type { GreenTechModule } from "@/lib/greentech";

type Props = {
  module: GreenTechModule;
  onSubmit: (payload: {
    assessment_version: string;
    module_code: string;
    mcq_answers: Record<number, string>;
    theory_answers: Record<number, string>;
    mcq_score: number;
    theory_status: string;
  }) => void | Promise<void>;
};

export function GreenTechModuleAssessment({ module, onSubmit }: Props) {
  const bank = useMemo(() => getGreenTechAssessment(module), [module]);
  const [mcq, setMcq] = useState<Record<number, string>>({});
  const [theory, setTheory] = useState<Record<number, string>>({});
  const answered = Object.keys(mcq).length;
  const theoryDone = Object.values(theory).filter(value => value.trim().length >= 20).length;

  return <section style={{ background: "white", border: "1px solid #dce7df", borderRadius: 18, padding: 22 }}>
    <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: ".08em", color: "#006b3c" }}>{module.code} • QUESTIONS & ASSESSMENT</div>
    <h2>Module-specific knowledge and application check</h2>
    <p>Complete all 8 MCQs and 5 application responses for <strong>{module.title}</strong>. MCQs are self-checked; theory responses and final competency ratings require staff verification.</p>

    {bank.mcqs.map((item, i) => <div key={item.q} style={{ margin: "18px 0", paddingBottom: 12, borderBottom: "1px solid #edf2ee" }}>
      <strong>{i + 1}. {item.q}</strong>
      {item.o.map((choice, j) => <label key={choice} style={{ display: "block", marginTop: 7 }}>
        <input type="radio" name={`${module.code}-q${i}`} checked={mcq[i] === String(j)} onChange={() => setMcq(current => ({ ...current, [i]: String(j) }))} /> {choice}
      </label>)}
    </div>)}

    {bank.theory.map((prompt, i) => <div key={prompt} style={{ margin: "14px 0" }}>
      <strong>Application {i + 1}.</strong><p>{prompt}</p>
      <textarea rows={4} style={{ width: "100%", boxSizing: "border-box", padding: "10px 12px", border: "1px solid #b9c9bf", borderRadius: 9, margin: "6px 0 12px", resize: "vertical" }} value={theory[i + 1] || ""} onChange={e => setTheory(current => ({ ...current, [i + 1]: e.target.value }))} />
    </div>)}

    <button style={{ background: "#006b3c", color: "white", border: 0, borderRadius: 9, padding: "11px 16px", fontWeight: 700, cursor: "pointer" }} disabled={answered < 8 || theoryDone < 5} onClick={() => {
      const correct = bank.mcqs.reduce((sum, question, i) => sum + (Number(mcq[i]) === question.a ? 1 : 0), 0);
      void onSubmit({ assessment_version: "module-specific-v1", module_code: module.code, mcq_answers: mcq, theory_answers: theory, mcq_score: Math.round(correct / bank.mcqs.length * 100), theory_status: "AWAITING_STAFF_MARKING" });
    }}>Submit assessment for review</button>
  </section>;
}
