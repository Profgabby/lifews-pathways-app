import type { GreenTechModule, GreenTechTier } from "@/lib/greentech";
import { getGreenTechLearningSections } from "@/lib/greentech-learning";

export function GreenTechDevelopedLearning({tier,module}:{tier:GreenTechTier;module:GreenTechModule}){
  const sections=getGreenTechLearningSections(tier,module);
  return <section className="program-content-section">
    <div className="gs-section-heading">
      <div><div className="gs-eyebrow">DEVELOPED LEARNING CONTENT</div><h2>Five guided learning sections before assessment and practical work.</h2></div>
      <p>Each section moves from understanding to technical relationships, measurement, AI-assisted work and real field/enterprise application.</p>
    </div>
    <div style={{display:"grid",gap:18}}>
      {sections.map((section,index)=><article key={section.title} className="curriculum-program-card" style={{padding:22}}>
        <div className="curriculum-card-head"><span>{index+1}</span><small>LEARNING SECTION</small></div>
        <h3>{section.title}</h3>
        <p><strong>Learning objective:</strong> {section.objective}</p>
        {section.teaching.map((paragraph,i)=><p key={i}>{paragraph}</p>)}
        <div style={{background:"#f5f8f6",borderRadius:12,padding:14,marginTop:14}}>
          <strong>Key points</strong>
          <ul style={{marginBottom:0}}>{section.keyPoints.map(point=><li key={point}>{point}</li>)}</ul>
        </div>
        <div style={{background:"#fff8df",border:"1px solid #ecd78a",borderRadius:12,padding:14,marginTop:14}}>
          <strong>Learner response prompt</strong>
          <p style={{marginBottom:0}}>{section.learnerPrompt}</p>
        </div>
      </article>)}
    </div>
  </section>;
}
